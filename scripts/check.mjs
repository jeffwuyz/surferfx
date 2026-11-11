import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';

const root = path.resolve('dist');
const origin = 'https://www.surferfx.com';
const files = fs.readdirSync(root, { recursive: true }).filter(f => f.endsWith('.html'));
const indexable = new Set();
const titles = new Set();
const descriptions = new Set();
const archive = JSON.parse(fs.readFileSync('src/goldarmor-archive/index.json','utf8'));
const originalRoutes = new Set(archive.map(item => 'research/' + item.id + '/'));
let links = 0;

for (const file of files) {
  const html = fs.readFileSync(path.join(root, file), 'utf8');
  for (const [, href] of html.matchAll(/(?:href|src)="(\/[^"]*)"/g)) {
    const target = decodeURI(href.split(/[?#]/)[0]);
    const dest = path.join(root, target, target.endsWith('/') ? 'index.html' : '');
    assert.ok(fs.existsSync(dest), file + ' missing ' + target);
    links++;
  }
  const match = /^(en|zh)\/(.*)index\.html$/.exec(file);
  if (!match) continue;
  const [, language, route] = match;
  const canonical = origin + '/' + language + '/' + route;
  indexable.add(canonical);
  assert.ok(html.includes('<html lang="' + (language === 'en' ? 'en' : 'zh-CN') + '">'), file);
  assert.equal([...html.matchAll(/<h1[ >]/g)].length, 1, file);
  assert.deepEqual([...html.matchAll(/<link rel="canonical" href="([^"]+)">/g)].map(m => m[1]), [canonical], file);
  assert.ok(!html.includes('noindex'), file);
  const alternatives = originalRoutes.has(route) ? [['zh-CN','zh'], ['x-default','zh']] : [['en','en'], ['zh-CN','zh'], ['x-default','zh']];
  if (originalRoutes.has(route)) {
    assert.equal(language, 'zh');
    assert.ok(html.includes('href="/en/research/#goldarmor"'), file);
    assert.ok(!/观摩密码|password/i.test(html), file);
  }
  for (const [code, prefix] of alternatives) {
    assert.ok(html.includes(`hreflang="${code}" href="${origin}/${prefix}/${route}"`), file);
    assert.ok(fs.existsSync(path.join(root, prefix, route, 'index.html')), file);
  }
  const title = /<title>([^<]+)<\/title>/.exec(html)?.[1];
  const description = /<meta name="description" content="([^"]+)">/.exec(html)?.[1];
  assert.ok(title && !titles.has(title), 'Missing or duplicate title in ' + file);
  assert.ok(description && !descriptions.has(description), 'Missing or duplicate description in ' + file);
  titles.add(title);
  descriptions.add(description);

  const data = JSON.parse(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/.exec(html)[1]);
  const graph = data['@graph'];
  assert.ok(graph.some(item => item.url === canonical && item.inLanguage === (language === 'en' ? 'en' : 'zh-CN')), file);
  if (route) {
    const trail = graph.find(item => item['@type'] === 'BreadcrumbList').itemListElement;
    assert.equal(trail.at(-1).item, canonical, file);
    for (const [i, crumb] of trail.entries()) {
      assert.equal(crumb.position, i + 1, file);
      assert.ok(fs.existsSync(path.join(root, new URL(crumb.item).pathname, 'index.html')), file);
    }
  }
  if (route === 'faq/') {
    const faq = graph.find(item => item['@type'] === 'FAQPage');
    assert.ok(faq?.mainEntity.length, 'Missing FAQ content: ' + file);
    const main = html.split('<main id="main">')[1].split('</main>')[0];
    for (const q of faq.mainEntity) {
      assert.ok(main.includes('id="' + new URL(q['@id']).hash.slice(1) + '"'), file);
      assert.ok(main.includes('<h2>' + q.name + '</h2>'), file);
      assert.ok(main.includes('<p>' + q.acceptedAnswer.text + '</p>'), file);
    }
  }
  if (route.startsWith('research/') && route !== 'research/') assert.ok(graph.some(item => item['@type'] === 'Article' && item.headline), file);
}

const sitemap = fs.readFileSync(path.join(root, 'sitemap.xml'), 'utf8');
const listed = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1]);
assert.deepEqual(listed.sort(), [...indexable].sort(), 'Sitemap must list each indexable URL exactly once');
assert.ok(fs.readFileSync(path.join(root, 'robots.txt'), 'utf8').includes('Sitemap: ' + origin + '/sitemap.xml'));
const directory = fs.readFileSync(path.join(root, 'llms.txt'), 'utf8');
const directoryUrls = [...directory.matchAll(/\]\((https:[^)]+)\)/g)].map(m => m[1]);
assert.ok(directoryUrls.includes(origin + '/zh/faq/') && directoryUrls.includes(origin + '/en/faq/'));
for (const address of directoryUrls) assert.ok(indexable.has(address), 'Directory URL missing from sitemap: ' + address);
new vm.Script(fs.readFileSync(path.join(root, 'assets/app.js'), 'utf8'));
console.log(JSON.stringify({ pages: files.length, indexable: indexable.size, localReferences: links, missingReferences: 0, clientSyntax: 'passed' }));
