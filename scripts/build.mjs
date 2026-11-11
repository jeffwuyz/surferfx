import fs from 'node:fs';
import path from 'node:path';
import { questions, renameSource } from '../src/questions.mjs';
import { business, strategies, articles } from '../src/content.mjs';
import { readingPaths } from '../src/reading-paths.mjs';
const { pages: pageMetadata, imageSizes } = JSON.parse(fs.readFileSync('src/page-metadata.json', 'utf8'));
const archiveDirectory = 'src/goldarmor-archive';
const archive = JSON.parse(fs.readFileSync(path.join(archiveDirectory, 'index.json'), 'utf8'));
const archiveByRoute = new Map(archive.map(item => ['research/' + item.id, item]));
const root=path.resolve('dist');fs.mkdirSync(root,{recursive:true});
let lang='zh';const tr=x=>Array.isArray(x)?x[lang==='zh'?0:1]:x;
const esc=x=>String(x??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const url=p=>`/${lang}/${p?p+'/':''}`;
const arrow='<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 12h14m-6-6 6 6-6 6" stroke="currentColor" stroke-width="1.5"/></svg>';
const icons={wave:'M3 15c3-9 6 9 9 0s6 9 9-3M3 9c3-9 6 9 9 0s6 9 9-3',chart:'M4 3v17h17M7 14l4-5 4 3 6-8',signal:'M4 15a10 10 0 0 1 16 0M7 18a6 6 0 0 1 10 0M2 10a15 15 0 0 1 20 0M12 21h.01',grid:'M3 3h7v7H3zM14 3h7v7h-7zM3 14h7v7H3zM14 14h7v7h-7z'};
const icon=n=>`<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="${icons[n]||icons.wave}" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
const logoAsset='/assets/surferfx-logo-vector-v1.svg';
const footerLogoAsset='/assets/surferfx-footer-v1.png';
const shareAsset='/assets/surferfx-share-vector-v1.png';
fs.mkdirSync(path.join(root,'assets'),{recursive:true});
for(const asset of [logoAsset,footerLogoAsset,shareAsset])fs.copyFileSync(path.join('src/assets',path.basename(asset)),path.join(root,asset));
for (const folder of ['strategies','services','research','goldarmor-archive']) {
  fs.cpSync(path.join('src/assets',folder),path.join(root,'assets',folder),{recursive:true});
}
const brand=(placement)=>`<a class="brand" href="${url('')}" aria-label="${tr(['冲浪者量化首页','Surfer Quant home'])}"><img class="brand-logo" src="${placement==='footer'?footerLogoAsset:logoAsset}" alt="SurferFx.com" width="160" height="80" decoding="async">${placement==='header'?'<span class="brand-name" lang="zh-CN">冲浪者量化</span>':''}</a>`;
const btn=(label,href,cls='')=>`<a class="button ${cls}" href="${href}">${tr(label)}${arrow}</a>`;
const ext=(href,label,cls='text-link')=>`<a class="${cls}" href="${href}" target="_blank" rel="noopener noreferrer">${tr(label)}<span aria-hidden="true">↗</span></a>`;
const label=(n,text)=>`<div class="eyebrow">${n ? `<span>${n}</span>` : ''}${tr(text)}</div>`;
function header(route){
  const otherLanguage = lang === 'zh' ? 'en' : 'zh';
  const languageUrl = archiveByRoute.has(route) ? '/en/research/#goldarmor' : `/${otherLanguage}/${route ? route+'/' : ''}`;
  return `<a class="skip" href="#main">${tr(['跳至主要内容','Skip to content'])}</a><header class="site-header"><div class="header-inner">${brand('header')}<nav id="nav" aria-label="${tr(['主导航','Main navigation'])}">${[['strategies',['量化策略','Strategies']],['services',['业务与服务','Services']],['research',['研究洞察','Insights']],['about',['关于冲浪者','About']]].map(([p,t])=>`<a ${route.startsWith(p)?'aria-current="page"':''} href="${url(p)}">${tr(t)}</a>`).join('')}</nav><div class="header-actions"><a class="language" href="${languageUrl}" lang="${lang==='zh'?'en':'zh'}" aria-label="${tr(['Switch to English','切换为中文'])}">${lang==='zh'?'EN':'中文'}</a><a class="header-contact" href="${url('contact')}">${tr(['联系团队','Let’s talk'])}${arrow}</a><button class="menu-toggle" aria-controls="nav" aria-expanded="false" aria-label="${tr(['打开菜单','Open navigation'])}"><span></span><span></span></button></div></div></header>`}
function footer(){return `<section class="cta-band"><div class="wrap cta-inner"><div class="eyebrow">START A CONVERSATION</div><h2>${tr(['下一步，从一次交流开始。','The next step starts with a conversation.'])}</h2>${btn(['与我们交流','Talk to our team'],url('contact'),'light')}</div></section><footer class="footer"><div class="wrap"><div class="footer-top"><div>${brand('footer')}<p>${tr(['以量化技术连接全球市场。','Connecting global markets through quantitative technology.'])}</p><span class="domain">WWW.SURFERFX.COM</span></div><div><h3>${tr(['探索','Explore'])}</h3><a href="${url('strategies')}">${tr(['量化策略','Strategies'])}</a><a href="${url('performance')}">${tr(['实盘记录','Track records'])}</a><a href="${url('research')}">${tr(['研究洞察','Insights'])}</a><a href="${url('about')}">${tr(['全球网络','Global network'])}</a><a href="${url('faq')}">${tr(['品牌与策略问答','Brand and strategy FAQ'])}</a></div><div><h3>${tr(['业务平台','Our platforms'])}</h3>${ext('https://www.goldarmorai.com/','GoldArmor AI')}${ext('https://www.vismarkets.com/','VIS Markets')}${ext('https://www.fd-signal.com/','FD-Signal')}<a href="${url('services/infrastructure')}">${tr(['AI基础设施','AI infrastructure'])}</a></div><div><h3>${tr(['保持联系','Connect'])}</h3><a href="${url('contact')}">WhatsApp / ${tr(['微信','WeChat'])}</a><a href="${url('contact')}?service=institutions">${tr(['机构合作','Institutional enquiries'])}</a><a href="${url('legal')}">${tr(['风险与隐私','Risk & privacy'])}</a></div></div><div class="footer-bottom"><div class="footer-legal"><span>© ${new Date().getFullYear()} Surfer Quant. ${tr(['保留所有权利。','All rights reserved.'])}</span><a class="icp-link" href="https://beian.miit.gov.cn/" target="_blank" rel="noopener noreferrer">粤ICP备2025498270号-4</a></div><p>${tr(['交易存在风险，历史表现不代表未来结果。网站内容用于研究与服务介绍。','Trading involves risk. Past performance does not predict future results. Content is for research and service information.'])}</p></div></div></footer>`}
const origin = 'https://www.surferfx.com';
const sectionNames = {
  strategies: ['量化策略', 'Strategies'],
  services: ['业务与服务', 'Services'],
  research: ['研究洞察', 'Research insights']
};

const readingTitles = new Map([
  ['about', ['冲浪者AI量化与 SurferFX 团队','About Surfer Quant and SurferFX']],
  ['faq', ['冲浪者品牌与 EA 策略问答','SurferFX brand and EA questions']],
  ['strategies', ['比较黄金与外汇量化策略','Compare gold and forex strategies']],
  ['performance', ['黄金甲实盘快照的收益与回撤','Returns and drawdowns in GoldArmor account snapshots']],
  ...strategies.map(s => ['strategies/' + s.id, s.pageTitle]),
  ...business.map(b => ['services/' + b.id, b.pageTitle]),
  ...articles.map(a => ['research/' + a.id, a.title]),
  ...archive.map(item => ['research/' + item.id, item.title]),
]);
function furtherReading(route) {
  const guide = articles.find(a => route === 'research/' + a.id);
  const targets = readingPaths.filter(pair => pair.includes(route))
    .map(pair => pair.find(other => other !== route))
    .filter(other => (lang === 'zh' || !archiveByRoute.has(other)) && other !== guide?.related.route);
  if (!targets.length) return '';
  return `<nav class="wrap related-reading" aria-labelledby="reading-title"><h2 id="reading-title">${tr(['相关研究与资料','Related research and sources'])}</h2>
    <ul>${targets.map(other => `<li><a href="${url(other)}">${esc(tr(readingTitles.get(other)))}</a></li>`).join('')}</ul></nav>`;
}
function layout(route, title, description, body) {
  const canonical = origin + url(route);
  const suffix = route ? route + '/' : '';
  const locale = tr(['zh-CN', 'en']);
  const brandName = tr(['冲浪者量化', 'Surfer Quant']);
  const edition = archiveByRoute.get(route);
  const metadata = pageMetadata[url(route)] || {};
  const fullTitle = metadata.title ?? (edition ? `${title}（${edition.date}） | SurferFX` : route ? title + ' | ' + brandName : tr(['冲浪者AI量化 SurferFX', 'SurferFX (Surfer Quant)']) + ' | ' + title);
  const summary = metadata.description ?? description;
  const article = route.startsWith('research/');
  const crumbs = [{name: tr(['首页', 'Home']), item: origin + url('')}];
  const [section, child] = route.split('/');
  const previewImage = edition?.cover || (article ? researchCover(child) : shareAsset);
  const dimensions = imageSizes[previewImage];
  const imageSizeTags = dimensions ? `<meta property="og:image:width" content="${dimensions[0]}"><meta property="og:image:height" content="${dimensions[1]}">` : '';
  if (child) crumbs.push({name: tr(sectionNames[section]), item: origin + url(section)});
  if (route) crumbs.push({name: title, item: canonical});

  const siteId = origin + '/#website';
  const organizationId = origin + '/#organization';
  const page = {
    '@type': ({ about: 'AboutPage', contact: 'ContactPage', faq: 'FAQPage' })[route] ||
      (Object.hasOwn(sectionNames, route) ? 'CollectionPage' : 'WebPage'),
    '@id': canonical + '#page', url: canonical, name: title, description,
    inLanguage: locale, isPartOf: { '@id': siteId }
  };
  const graph = [page];
  if (!route || article || route === 'about' || route === 'faq') {
    graph.push({ '@type': 'Organization', '@id': organizationId, name: 'Surfer Quant',
      alternateName: ['冲浪者', '冲浪者量化', '冲浪者AI量化', 'SurferFX'], url: origin + '/', logo: origin + shareAsset });
  }
  if (!route) graph.push({ '@type': 'WebSite', '@id': siteId, name: 'SurferFX',
    alternateName: ['冲浪者量化', 'Surfer Quant'], url: origin + '/', inLanguage: ['zh-CN','en'],
    publisher: { '@id': organizationId } });
  if (route) {
    page.breadcrumb = { '@id': canonical + '#breadcrumbs' };
    graph.push({ '@type': 'BreadcrumbList', ...page.breadcrumb,
      itemListElement: crumbs.map(({name, item}, i) => ({ '@type': 'ListItem', position: i + 1, name, item })) });
  }
  if (route === 'about') page.mainEntity = { '@id': organizationId };
  if (route === 'faq') {
    page.publisher = { '@id': organizationId };
    page.mainEntity = questions.map(q => ({
      '@type': 'Question', '@id': canonical + '#' + q.id, name: tr(q.title),
      acceptedAnswer: { '@type': 'Answer', text: tr(q.answer) }
    }));
  }
  if (article) {
    const guide = articles.find(a => a.id === child);
    page.mainEntity = { '@id': canonical + '#article' };
    graph.push({ '@type': 'Article', ...page.mainEntity, headline: title, description, inLanguage: locale, image: origin + previewImage,
      mainEntityOfPage: { '@id': page['@id'] }, publisher: { '@id': organizationId },
      ...(guide ? { author: { '@id': organizationId }, articleSection: tr(guide.category) } : {}),
      ...(guide?.reference ? { citation: guide.reference.url } : {}),
      ...(edition ? { articleSection: '黄金甲市场观察', creditText: '来源：黄金甲量化', isPartOf: { '@type': 'CollectionPage', url: origin + '/zh/research/#goldarmor' } } : {}),
      ...(metadata.published ? { datePublished: metadata.published, dateModified: metadata.published } : {}),
      ...(edition ? { author: { '@type':'Organization', '@id':organizationId, name:'Surfer Quant' } } : {}) });
  }
  if (route === 'research') {
    const items = [
      ...archive.map(item => [origin + '/zh/research/' + item.id + '/', lang === 'zh' ? item.title : item.en]),
      ...articles.map(a => [origin + url('research/' + a.id), tr(a.title)]),
    ];
    page.mainEntity = { '@id': canonical + '#articles' };
    graph.push({ '@type': 'ItemList', ...page.mainEntity, numberOfItems: items.length,
      itemListElement: items.map(([url, name], i) => ({ '@type':'ListItem', position:i+1, url, name })) });
  }
  const breadcrumb = route ? `<nav class="breadcrumbs" aria-label="${tr(['当前位置','Breadcrumb'])}"><ol class="wrap">${crumbs.map(({name, item}, i) => i === crumbs.length - 1
    ? `<li aria-current="page">${esc(name)}</li>`
    : `<li><a href="${new URL(item).pathname}">${esc(name)}</a></li>`).join('')}</ol></nav>` : '';
  const alternatives = edition ? [['zh-CN','zh'], ['x-default','zh']] : [['zh-CN','zh'], ['en','en'], ['x-default','zh']];
  return `<!doctype html><html lang="${locale}"><head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
${!route && lang === 'zh' ? '<meta name="google-site-verification" content="KiG2KM9LIL5V2LiCvft2fJZqI_BCSlYSoX049RWC2dQ">' : ''}
<meta name="robots" content="index,follow,max-image-preview:large"><title>${esc(fullTitle)}</title><meta name="description" content="${esc(summary)}">
<meta name="theme-color" content="#0b202b"><link rel="canonical" href="${canonical}">
${alternatives.map(([code, prefix]) => `<link rel="alternate" hreflang="${code}" href="${origin}/${prefix}/${suffix}">`).join('\n')}
<meta property="og:title" content="${esc(fullTitle)}"><meta property="og:description" content="${esc(summary)}">
<meta property="og:url" content="${canonical}"><meta property="og:type" content="${article ? 'article' : 'website'}">
<meta property="og:site_name" content="SurferFX"><meta property="og:image" content="${origin}${previewImage}">${article ? imageSizeTags : ''}<meta name="twitter:card" content="summary_large_image"><meta name="twitter:title" content="${esc(fullTitle)}"><meta name="twitter:description" content="${esc(summary)}"><meta name="twitter:image" content="${origin}${previewImage}">${article ? '' : imageSizeTags}<meta property="og:locale" content="${tr(['zh_CN','en_US'])}"><meta property="og:locale:alternate" content="${tr(['en_US','zh_CN'])}">
<script type="application/ld+json">${JSON.stringify({'@context':'https://schema.org', '@graph': graph}).replace(/</g, '\\u003c')}</script>
<link rel="icon" type="image/svg+xml" href="/assets/favicon.svg"><link rel="stylesheet" href="/assets/style.css"><script src="/assets/app.js" defer></script></head>
<body>${header(route)}<main id="main">${breadcrumb}${body}${furtherReading(route)}</main>${footer()}<div class="toast" role="status" aria-live="polite"></div></body></html>`;
}
const intro=(kicker,title,desc,extra='')=>`<section class="page-intro"><div class="wrap">${label('SURFER QUANT',kicker)}<h1>${tr(title)}</h1><p>${tr(desc)}</p>${extra}</div></section>`;
const sectionHead=(n,k,title,desc,link='')=>`<div class="section-heading"><div>${label(n,k)}<h2>${tr(title)}</h2>${desc?`<p>${tr(desc)}</p>`:''}</div>${link}</div>`;
function serviceImage(service, featured = false) {
  const load = featured ? 'fetchpriority="high"' : 'loading="lazy"';
  return `<img class="service-image" src="/assets/services/${service.id}.webp" alt="${featured ? esc(tr(service.imageAlt)) : ''}" width="1080" height="720" ${load} decoding="async">`;
}
function strategyImage(s, card = false) {
  const loading = card ? 'loading="lazy"' : 'fetchpriority="high"';
  return `<div class="strategy-art art-${s.id}"><img src="/assets/strategies/${s.id}.webp" alt="${card ? '' : esc(tr(s.artAlt))}" ${loading} decoding="async"></div>`;
}
function strategyCard(s) {
  return `<a class="strategy-card" href="${url('strategies/'+s.id)}" data-category="${s.type}">
    ${strategyImage(s, true)}
    <div class="strategy-meta"><span>${tr(s.tag)}</span><span class="round-arrow" aria-hidden="true">↗</span></div>
    <h3>${tr(s.name)}</h3>${lang === 'zh' || s.en !== tr(s.name) ? `<span class="strategy-en">${s.en}</span>` : ''}
    <p>${tr(s.summary)}</p>
    <div class="strategy-activity"><span>${tr(dailyActivityLabel(s))}</span><strong>${tr(s.activity)}</strong></div>
    <div class="card-bottom"><span>${tr(s.origin)}</span><span>${tr(['了解策略','Explore'])} →</span></div></a>`;
}
function dailyActivityLabel(s) {
  return ['goldarmor','goldhunter','surfer'].includes(s.id)
    ? ['资料日成交量','Reported daily volume']
    : ['资料日交易笔数','Reported daily trade count'];
}
function strategyParameters(s) {
  const fields = [
    [['交易品种','Instruments'], s.markets],
    [dailyActivityLabel(s), s.activity],
    [['参考起始资金','Reference capital'], 'USD ' + s.capital],
    [['资料止损设置','Documented stop setting'], s.stop],
    [['资料账户类型','Account type in source'], 'ECN'],
    [['资料账户杠杆','Account leverage in source'], '500:1'],
  ];
  const source = s.id === 'goldarmor'
    ? ext(s.url, ['黄金甲官网引用的项目资料（2026 年 9 月 6 日）','Project figures cited by GoldArmor for September 6, 2026'])
    : tr(['《SurferFx 核心交易策略》','SurferFx Core Trading Strategies']);
  return `<section class="strategy-parameters"><h2>${tr(['资料中的运行参数','Operating parameters in the source'])}</h2>
    <dl>${fields.map(([label,value])=>`<div><dt>${tr(label)}</dt><dd>${tr(value)}</dd></div>`).join('')}</dl>
    <p class="parameter-source">${tr(['参数来源：','Figures from '])}${source}</p>
    <p class="parameter-note">${tr(['以上数值对应资料中的账户示例。实际账户条件因版本和平台而异，实际损失可能超过止损设置。','These figures describe the account example in the source. Terms vary by version and platform, and actual losses can exceed the stop setting.'])}</p></section>`;
}
function researchCover(id) { return `/assets/research/${id}.webp`; }
function articleCard(a){return `<a class="article-card" href="${url('research/'+a.id)}"><img class="article-art" src="${researchCover(a.id)}" alt="" width="1080" height="720" loading="lazy" decoding="async"><div class="article-meta">${tr(a.category)}<span>${tr(a.time)}</span></div><h3>${tr(a.title)}</h3><p>${tr(a.intro)}</p><span class="text-link">${tr(['阅读全文','Read the note'])}${arrow}</span></a>`}
function network(){const names=[['新加坡','Singapore'],['新西兰','New Zealand'],['迪拜','Dubai'],['马来西亚','Malaysia'],['中国','China']];return `<section class="network section"><div class="wrap network-grid"><div class="network-visual"><img src="/assets/network.svg" alt="${tr(['全球服务网络示意','Illustration of a global service network'])}" loading="lazy"></div><div>${label('04',['全球协作','GLOBAL NETWORK'])}<h2>${tr(['立足不同市场<br>连接共同的方向','Different markets.<br>A shared direction.'])}</h2><p class="lead">${tr(['机构与团队网络分布于新加坡、新西兰、迪拜、马来西亚和中国。以跨市场的研究视角，连接技术、策略与服务。','Our institutional and team network spans Singapore, New Zealand, Dubai, Malaysia and China, connecting technology, strategies and services through cross-market perspectives.'])}</p><div class="location-list">${names.map((n,i)=>`<span><i></i>${tr(n)}<small>0${i+1}</small></span>`).join('')}</div><a class="text-link" href="${url('about')}">${tr(['了解冲浪者','Meet Surfer Quant'])}${arrow}</a></div></div></section>`}
function home(){return `<section class="hero"><div class="hero-grid wrap"><div class="hero-copy">${label('',['冲浪者AI量化 · SurferFX','SurferFX · Surfer Quant'])}<h1>${tr(['黄金与外汇<br><span>量化交易研究</span>','Gold and forex<br><span>quantitative trading</span>'])}</h1><p>${tr(['冲浪者AI量化（SurferFX）研究黄金与外汇量化交易。黄金甲策略观察黄金价格突破，冲浪者 EA 管理多货币对组合。可按策略查看交易规则、运行条件与历史记录。','Explore how GoldArmor identifies gold breakouts and how Surfer EA combines currency pairs. Review each strategy’s trading rules, execution conditions and risks.'])}</p><div class="hero-buttons">${btn(['探索量化策略','Explore our strategies'],url('strategies'),'accent')}${btn(['了解集团业务','Discover our businesses'],url('services'),'ghost')}</div><div class="hero-proof"><div><strong>10<span>+</span></strong><small>${tr(['年量化探索','Years of exploration'])}</small></div><div><strong>04</strong><small>${tr(['大业务板块','Connected businesses'])}</small></div><div><strong>05</strong><small>${tr(['类资产市场','Asset markets'])}</small></div></div></div><div class="hero-visual"><img width="850" height="650" src="/assets/wave.svg" alt="${tr(['由数据线条构成的抽象海浪，象征市场变化与量化研究','Abstract wave of data lines representing markets and quantitative research'])}" fetchpriority="high"></div></div><div class="market-strip"><div class="wrap"><span>${tr(['多资产视野','A MULTI-ASSET PERSPECTIVE'])}</span>${[['外汇','FX'],['黄金','GOLD'],['期货','FUTURES'],['股票','EQUITIES'],['数字资产','DIGITAL ASSETS']].map(x=>`<span>${tr(x)}<small>${lang==='zh'?x[1]:''}</small></span>`).join('')}</div></div></section>
<section class="section ecosystem"><div class="wrap">${sectionHead('01',['集团业务','OUR ECOSYSTEM'],['四大业务，一个协作网络。','Four businesses. One connected ecosystem.'],['连接研究、信息与基础设施，让每一步交易研究都有所依托。','Connecting research, information and infrastructure to support each stage of the trading journey.'])}<div class="business-grid">${business.map(b=>`<a href="${url('services/'+b.id)}" class="business-card">${serviceImage(b)}<h3>${tr(b.name)}</h3><div class="business-brand">${b.brand}</div><p>${tr(b.body)}</p><span class="text-link">${tr(['探索业务','Explore business'])}${arrow}</span></a>`).join('')}</div></div></section>
<section class="section strategies-section"><div class="wrap">${sectionHead('02',['量化策略','STRATEGY EXPLORER'],['不同逻辑，应对不同市场。','Different logic. Different market conditions.'],['从交易逻辑、运行条件与风险特征，找到进一步研究的起点。','Start with trading logic, operating requirements and risk characteristics.'],`<a class="text-link" href="${url('strategies')}">${tr(['查看全部策略','View all strategies'])}${arrow}</a>`)}<div class="strategy-grid home-strategies">${[strategies[0],strategies[1],strategies[4]].map(strategyCard).join('')}</div><div class="section-note"><span>↳</span>${tr(['策略介绍不代表当前开放认购或适合所有投资者，具体服务条件请与团队确认。','Strategy information does not imply current availability or suitability for every investor. Confirm service conditions with the team.'])}</div></div></section>
<section class="principle section"><div class="wrap principle-grid"><div>${label('03',['研究方法','OUR APPROACH'])}<h2>${tr(['理解逻辑。<br>尊重数据。<br><em>始终看见风险。</em>','Understand the logic.<br>Respect the data.<br><em>Keep risk in view.</em>'])}</h2>${btn(['查看记录与方法','Records & methodology'],url('performance'),'outline')}</div><div class="principle-list">${[[['01','01'],['先理解，再评估','Understand before evaluating'],['从策略机制、版本和适用环境出发，了解收益来源与可能失效的情形。','Start with mechanics, versions and market conditions to understand return drivers and potential failure modes.']],[['02','02'],['记录需要可追溯','Records need traceability'],['区分实盘、模拟与回测，为历史记录保留日期、来源和计算口径。','Separate live, demo and backtested results; retain dates, sources and calculation methods.']],[['03','03'],['风险贯穿每一步','Risk is part of every step'],['将回撤、执行成本和运行条件与收益同时研究，持续观察变化。','Study drawdowns, execution costs and operating conditions alongside returns.']]].map(([n,t,d])=>`<div><span>${tr(n)}</span><section><h3>${tr(t)}</h3><p>${tr(d)}</p></section></div>`).join('')}</div></div></section>
${network()}<section class="section insights-section"><div class="wrap">${sectionHead('05',['研究洞察','INSIGHTS'],['从研究中，建立判断。','Build perspective through research.'],'',`<a class="text-link" href="${url('research')}">${tr(['进入研究中心','All insights'])}${arrow}</a>`)}<div class="article-grid">${articles.slice(0,3).map(articleCard).join('')}</div></div></section>`}
function strategyIndex(){return intro(['量化策略','STRATEGY EXPLORER'],['黄金与外汇量化策略','Gold and forex trading strategies'],['比较黄金甲策略的突破信号、冲浪者外汇 EA 的多货币对组合，以及黄金期货与现货的价差逻辑。每项策略都附有运行条件和风险说明。','Compare GoldArmor breakout signals, the Surfer forex EA portfolio and gold futures–spot spreads. Each profile covers operating conditions and risks.'])+`<section class="section compact"><div class="wrap"><div class="filter-bar" role="group" aria-label="${tr(['筛选策略','Filter strategies'])}">${[['all',['全部策略','All strategies']],['gold',['黄金策略','Gold']],['fx',['外汇策略','FX']],['spread',['价差策略','Spreads']]].map(([v,n])=>`<button class="filter ${v==='all'?'active':''}" data-filter="${v}" aria-pressed="${v==='all'}">${tr(n)}</button>`).join('')}<span class="filter-count" aria-live="polite">${strategies.length} ${tr(['项策略介绍','strategy profiles'])}</span></div><div class="strategy-grid">${strategies.map(strategyCard).join('')}</div><a class="text-link related-guide" href="${url('research/what-is-an-ea')}">${tr(['EA 是什么？了解黄金与外汇策略如何自动执行','What is an EA? Learn how gold and forex strategies execute trades'])}${arrow}</a><div class="notice"><h3>${tr(['让每一份记录，对应正确的策略版本。','Match every record to the right strategy version.'])}</h3><p>${tr(['海豚与大鲸等历史系列在不同阶段采用过不同交易机制。当前页面不将不同版本的历史曲线拼接展示，相关资料可向团队咨询。','Historical Dolphin and Bigwhale series used different mechanics across periods. We do not stitch different versions into a continuous performance curve. Contact the team for relevant materials.'])}</p><a class="text-link" href="${url('performance')}">${tr(['查看数据说明','Read our data methodology'])}${arrow}</a></div></div></section>`}
function strategyDetail(s){
  const history = ['goldarmor','goldhunter'].includes(s.id) ? `<section id="brand-history"><h2>${tr(['黄金猎人与黄金甲的名称沿革','From GoldHunter to GoldArmor AI'])}</h2>
    <p>${tr(['黄金甲官网记载，2026 年 9 月 5 日的品牌资料宣布黄金猎人更名为黄金甲量化。引用历史策略说明或账户数据时，请同时注明当时的名称、版本与记录区间。','GoldArmor reports that brand materials dated September 5, 2026 announced the renaming of GoldHunter to GoldArmor AI. When citing a historical strategy or account record, identify the name, version and reporting period used at the time.'])}</p>
    ${ext(renameSource,['查看黄金甲官网更名资料','GoldArmor’s published brand history (Chinese)'])}</section>` : '';
  return `<section class="page-intro strategy-lead"><div class="wrap">
    <div>${label('SURFER QUANT',s.tag)}<h1>${tr(s.pageTitle)}</h1><p>${tr(s.summary)}</p>
    <div class="intro-tags"><span>${s.en}</span><span>${tr(s.origin)}</span></div></div>
    <figure>${strategyImage(s)}<figcaption>${s.id==='goldarmor' ? tr(['黄金甲量化品牌标志','GoldArmor AI brand mark']) : tr(['《SurferFx 核心交易策略》原文配图','Original illustration from SurferFx Core Trading Strategies'])}</figcaption></figure>
    </div></section><section class="section compact"><div class="wrap detail-grid"><article class="prose">${[[['交易逻辑','Trading logic'],s.logic],[['风险与边界','Risks & boundaries'],s.risk],[['运行条件','Operating requirements'],s.env]].map(([h,p],i)=>`<section><span class="section-number">0${i+1}</span><h2>${tr(h)}</h2><p>${tr(p)}</p></section>`).join('')}${strategyParameters(s)}${history}<div class="source-note">${tr(['资料依据：','Source: '])}${tr(s.source)}${s.url?ext(s.url,['查看产品网站','Visit product website']):''}</div></article><aside class="detail-aside"><span class="eyebrow">EXPLORE FURTHER</span><h2>${tr(['先理解，再开始。','Understand before you begin.'])}</h2><p>${tr(['与团队确认当前版本、服务方式及运行要求。','Confirm the current version, service scope and operating requirements with the team.'])}</p>${btn(['咨询这项策略','Enquire about this strategy'],url('contact')+'?strategy='+s.id)}${s.record?ext(s.record,['查看来源网站记录','View source-site records'],'button outline'):btn(['了解记录口径','Understand record methodology'],url('performance'),'outline')}<small>${tr(['历史表现不代表未来结果。自动化交易不能消除市场风险。','Past performance does not predict future results. Automated trading does not eliminate market risk.'])}</small></aside></div></section><div class="wrap back-row"><a class="text-link" href="${url('strategies')}">← ${tr(['返回策略中心','Back to strategies'])}</a></div>`}
function services(){return intro(['业务与服务','OUR BUSINESSES'],['量化研究与技术服务','Quantitative research and technology services'],['四大业务协同，面向专业交易者、机构、策略供应商与量化研究团队。','Four connected businesses for professional traders, institutions, strategy providers and quantitative research teams.'])+`<section class="section compact"><div class="wrap service-list">${business.map(b=>`<a class="service-row" href="${url('services/'+b.id)}">${serviceImage(b)}<div class="service-name"><span class="service-num">${b.n}</span><h2>${tr(b.name)}</h2><small>${b.brand}</small></div><p>${tr(b.body)}</p><span class="round-arrow">↗</span></a>`).join('')}</div></section><section class="section pale"><div class="wrap">${sectionHead('WORK WITH US',['机构合作','INSTITUTIONAL COLLABORATION'],['从真实需求，形成服务方案。','From specific needs to a service plan.'],'')}<div class="steps">${[[['01','01'],['需求沟通','Discovery'],['确认市场、研究方向与交付目标。','Define markets, research priorities and objectives.']],[['02','02'],['方案与验证','Scope & validation'],['明确测试条件、数据与服务范围。','Agree testing conditions, data and service scope.']],[['03','03'],['交付与支持','Delivery & support'],['按约定完成交付与持续支持。','Deliver and support the agreed service.']]].map(([n,t,d])=>`<div><span>${tr(n)}</span><h3>${tr(t)}</h3><p>${tr(d)}</p></div>`).join('')}</div>${btn(['交流合作需求','Discuss a collaboration'],url('contact')+'?service=institutions')}</div></section>`}
function serviceDetail(b){
  const lead = `<section class="page-intro service-lead"><div class="wrap">
    <div>${label('SURFER QUANT',b.name)}<h1>${tr(b.pageTitle)}</h1><p>${tr(b.body)}</p></div>
    ${serviceImage(b,true)}
  </div></section>`;
  return lead+`<section class="section compact"><div class="wrap"><div class="service-detail-head"><span class="large-icon">${icon(b.icon)}</span><div><div class="eyebrow">${b.brand}</div><h2>${tr(['服务方向','Service areas'])}</h2></div></div><div class="feature-grid">${b.bullets.map((t,i)=>`<div><span>0${i+1}</span><h3>${tr(t)}</h3><p>${tr(b.details ? b.details[i] : b.id==='infrastructure'?[['根据研究任务沟通数据范围、字段、样本与使用方式。','Discuss coverage, fields, samples and usage for your research task.'],['根据工作负载沟通算力、存储、服务器及机房需求。','Discuss compute, storage, server and data-center requirements for your workload.'],['明确部署环境、状态监测与运行支持范围。','Define deployment conditions, monitoring and operational support.']][i]:[['从需求出发，明确研究对象与服务目标。','Define research scope and service objectives around your needs.'],['了解产品框架、使用条件与实际交付内容。','Understand the product framework, conditions and deliverables.'],['与对应业务团队沟通适用范围和合作方式。','Discuss applicability and collaboration with the relevant team.']][i])}</p></div>`).join('')}</div>${b.id==='infrastructure'?`<div class="infra-split"><section><span class="eyebrow">DATA SERVICES</span><h2>${tr(['数据服务','Data services'])}</h2><p>${tr(['从数据目录与样本开始，沟通市场覆盖、时间粒度、字段与更新方式，为回测、模型研究和市场分析提供支持。','Start with catalogs and samples. Discuss market coverage, granularity, fields and updates for backtesting, model research and market analysis.'])}</p></section><section><span class="eyebrow">COMPUTE & OPERATIONS</span><h2>${tr(['智算服务','Compute services'])}</h2><p>${tr(['根据研究与运行任务，沟通AI算力、服务器、机房、部署和运维需求。资源规格与支持范围按具体方案确认。','Discuss AI compute, servers, data centers, deployment and operations around research and production workloads. Specifications and support depend on the agreed plan.'])}</p></section></div>`:''}<div class="action-panel"><div><h2>${tr(['让需求更具体，让下一步更清楚。','Make the requirement specific. Make the next step clear.'])}</h2><p>${tr(['告诉我们你关注的市场、使用场景和服务需求。','Tell us about your markets, use case and service needs.'])}</p></div><div>${b.url?ext(b.url,['访问业务平台','Visit the platform'],'button outline'):''}${btn(['咨询服务','Enquire about services'],url('contact')+'?service='+b.id)}</div></div></div></section>`}
function performance(){return intro(['实盘记录与方法','RECORDS & METHODOLOGY'],['黄金甲历史实盘记录与回撤','GoldArmor historical trading records and drawdowns'],['把时间、版本与风险放回数据之中，才有进一步比较的基础。','Meaningful comparisons begin with context: time, version and risk.'])+`<section class="section compact"><div class="wrap"><div class="records-head"><div class="eyebrow">GOLDARMOR AI</div><h2>${tr(['黄金甲历史实盘摘要','GoldArmor historical account snapshots'])}</h2><p>${tr(['以下转述黄金甲官网标注为2026年9月6日的静态快照，不是实时行情或当前绩效。本页未重新核验第三方账户。','The following reproduces static snapshots dated September 6, 2026 on the GoldArmor website. These are not live or current results. Third-party accounts have not been independently reverified here.'])}</p></div><div class="records-grid">${[['STARTRADER','700001720','+369.87%','24.89%'],['TMGM','30000020','+216.86%','14.24%']].map(([platform,id,gain,dd])=>`<div class="record-card"><div class="record-header"><strong>${platform}</strong><span>${tr(['历史快照','Historical snapshot'])}</span></div><small>${tr(['来源账户','Source account'])} · ${id}</small><div class="record-metrics"><div><span>${tr(['累计收益','Cumulative gain'])}</span><strong>${gain}</strong></div><div><span>${tr(['最大回撤','Max. drawdown'])}</span><strong>${dd}</strong></div></div><p>${tr(['快照日期','Snapshot date'])} · 2026-09-06</p>${ext('https://www.goldarmorai.com/#performance',['查看来源与完整说明','View source & full context'])}</div>`).join('')}</div><div class="notice"><h3>${tr(['历史快照的边界','The limits of a historical snapshot'])}</h3><p>${tr(['来源页面同时提供第三方记录链接。累计收益的起算区间、费用处理、账户现金流与验证状态应以原始记录为准。两个账户不代表所有客户结果，也不构成收益预测。','The source page links to third-party records. Refer to original records for inception dates, fees, cash flows and verification status. Two accounts do not represent all customer outcomes or predict returns.'])}</p></div><div class="method-grid">${[[['01','01'],['实盘、模拟与回测分开','Separate live, demo and backtest'],['不同记录具有不同的环境与假设，不能混为同一类证据。','Each record type has different conditions and assumptions.']],[['02','02'],['收益与回撤同时研究','Study returns with drawdowns'],['明确净值与余额的区别，并了解入出金及费用口径。','Distinguish equity from balance and understand cash flows and fees.']],[['03','03'],['版本、时间与来源一致','Align version, period and source'],['策略变化应保留版本，静态记录应明确截至日期。','Preserve version history and disclose snapshot dates.']]].map(([n,t,d])=>`<div><span>${tr(n)}</span><h3>${tr(t)}</h3><p>${tr(d)}</p></div>`).join('')}</div></div></section>`}
function archiveList() {
  const cards = archive.map(item => `<a class="archive-card" href="/zh/research/${item.id}/">
    <img src="${item.cover}" width="320" height="200" alt="" loading="lazy" decoding="async">
    <div><time datetime="${item.date}">${item.date}</time><h3>${esc(lang === 'zh' ? item.title : item.en)}</h3></div>
  </a>`).join('');
  return `<section class="section compact archive-list" id="goldarmor"><div class="wrap"><h2>${tr(['黄金甲市场观察','GoldArmor market notes'])}</h2>
    <p>${tr(['按原文观摩日倒序收录市场评论、策略复盘与账户图表。','Market commentary, strategy reviews and account charts, ordered by observation date. The original articles are in Chinese.'])}</p>
    <div class="archive-grid">${cards}</div></div></section>`;
}
function research() {
  return intro(['研究洞察','INSIGHTS'],['研究洞察','Research insights'],
    ['阅读黄金甲市场观察与实盘复盘，或从研究指南了解策略逻辑、执行环境和风险。','Explore GoldArmor market notes and account reviews, alongside guides to strategy logic, execution and risk.'],
    `<div class="intro-tags"><a href="#goldarmor">${tr(['黄金甲市场观察','GoldArmor market notes'])}</a><a href="#guides">${tr(['研究指南','Research guides'])}</a></div>`)
    + `<section id="search" class="wrap publication-search" hidden><form role="search">
      <label for="site-query">${tr(['搜索本站文章与策略','Search articles and strategies'])}</label>
      <div><input id="site-query" type="search" maxlength="120" placeholder="${tr(['如：黄金甲策略、股票复权、外汇 EA','e.g. forex EA, stock split, GoldArmor'])}" required>
      <button class="button" type="submit">${tr(['搜索','Search'])}</button></div></form>
      <p role="status" aria-live="polite"></p><ul></ul></section>
      <script src="/assets/site-search.js" defer></script>`
    + archiveList()
    + `<section class="section compact" id="guides"><div class="wrap"><h2 class="guides-heading">${tr(['量化交易研究指南','Quantitative trading research guides'])}</h2><div class="article-grid">${articles.map(articleCard).join('')}</div></div></section>`;
}
function archiveArticle(item) {
  const story = fs.readFileSync(path.join(archiveDirectory, item.file), 'utf8');
  return `<section class="page-intro"><div class="wrap">${label('GOLDARMOR','黄金甲市场观察')}
    <h1>${esc(item.title)}</h1><p>原文观摩日 <time datetime="${item.date}">${item.date}</time> · 来源：黄金甲量化</p></div></section>
    <section class="section compact"><div class="wrap archive-story"><p class="archive-summary">${esc(item.description)}</p><p class="archive-dateline">以下为当期原文。文中市场判断、账户数据及图表均按原稿所列区间阅读。</p>
    <article>${story}</article><a class="text-link" href="/zh/research/#goldarmor">← 返回黄金甲市场观察</a></div></section>`;
}
function article(a){
  return `<section class="page-intro article-lead"><div class="wrap"><div>${label('SURFER QUANT',a.category)}
    <h1>${tr(a.title)}</h1><p>${tr(a.intro)}</p><div class="intro-tags"><span>${tr(['研究指南','Research guide'])}</span><span>${tr(a.time)}</span><a href="${url('about')}">${tr(['发布方：冲浪者量化','Published by Surfer Quant'])}</a></div></div>
    <figure><img class="research-hero" src="${researchCover(a.id)}" alt="${esc(tr(a.imageAlt))}" width="1080" height="720" decoding="async" fetchpriority="high">
    ${a.id==='records-and-drawdown' ? `<figcaption>${tr(['阴影标出净值从峰值跌到低谷的过程。曲线为教学示例。','The shaded area marks the fall from peak to trough on an illustrative equity curve.'])}</figcaption>` : ''}</figure></div></section><section class="section compact"><div class="wrap article-layout"><article class="prose">${a.parts.map(([t,p],i)=>`<section id="part-${i}"><span class="section-number">0${i+1}</span><h2>${tr(t)}</h2><p>${tr(p)}</p></section>`).join('')}<div class="source-note">${tr(['本文为策略评估与运行方法的一般性介绍，不构成个别投资建议。','This is a general guide to strategy evaluation and operations, not individualized investment advice.'])}</div>${a.reference ? ext(a.reference.url, a.reference.label, 'text-link related-guide') : ''}<a class="text-link related-guide" href="${url(a.related.route)}">${tr(a.related.label)}${arrow}</a></article><aside class="contents"><span class="eyebrow">${tr(['本文内容','IN THIS NOTE'])}</span>${a.parts.map(([t],i)=>`<a href="#part-${i}">0${i+1} &nbsp; ${tr(t)}</a>`).join('')}<a class="text-link" href="${url('research')}">← ${tr(['全部研究','All insights'])}</a></aside></div></section>`}
function faq() {
  const sections = questions.map(q => {
    const links = q.links.map(ref => ref.url
      ? ext(ref.url, ref.label)
      : `<a class="text-link" href="${url(ref.route)}">${esc(tr(ref.label))}${arrow}</a>`);
    return `<section id="${q.id}"><h2>${esc(tr(q.title))}</h2><p>${esc(tr(q.answer))}</p>
      <div class="answer-sources">${links.join('')}</div></section>`;
  });
  return intro(['常见问题','FAQ'], ['冲浪者量化品牌与策略问答','SurferFX brand and strategy FAQ'],
    ['查找品牌名称、EA 策略区别及历史账户快照的出处。','Find the sources for brand names, differences between EAs and dated account snapshots.']) +
    `<div class="section compact"><div class="wrap prose legal-prose">${sections.join('')}</div></div>`;
}
function about(){return intro(['关于冲浪者','ABOUT SURFER'],['关于冲浪者AI量化（SurferFX）与全球团队','About SurferFX, Surfer Quant and its global network'],['SurferFX 是冲浪者量化（冲浪者AI量化，Surfer Quant）的官方网站。团队的业务涵盖策略研发、全球行情、交易信号与 AI 基础设施。','SurferFX is the website of Surfer Quant, known in Chinese as 冲浪者量化 and 冲浪者AI量化. The team works across strategy research, global market information, trading signals and AI infrastructure.'])+`<section class="section compact"><div class="wrap about-statement"><span class="eyebrow">OUR PERSPECTIVE</span><h2>${tr(['市场持续变化，<br>研究也从未停止。','Markets keep changing.<br>Research never stands still.'])}</h2><div><p>${tr(['我们的业务视野覆盖外汇、黄金、期货、股票及数字资产。通过不同领域的研究与服务连接，为专业交易者、机构和技术合作伙伴提供交流与协作的入口。','Our business perspective spans FX, gold, futures, equities and digital assets. Research and services across these areas provide a gateway for professional traders, institutions and technology partners.'])}</p><p>${tr(['我们重视可解释的策略逻辑、可追溯的数据记录，以及对运行条件与风险的持续关注。','We value explainable strategy logic, traceable records and continued attention to operating conditions and risk.'])}</p></div></div></section>${network()}<section class="section pale"><div class="wrap">${sectionHead('OUR ECOSYSTEM',['业务协作','CONNECTED BUSINESSES'],['从一个问题，到一组专业服务。','From one question to connected expertise.'],'')}<div class="brand-links">${business.map(b=>`<a href="${url('services/'+b.id)}"><span>${b.n}</span><h3>${tr(b.name)}</h3><small>${b.brand}</small>${arrow}</a>`).join('')}</div></div></section>`}
function contact(){return intro(['联系团队','LET’S TALK'],['联系冲浪者量化团队','Contact the Surfer Quant team'],['无论是策略研究、机构合作，还是数据与算力需求，从一次具体的交流开始。','Whether it is strategy research, institutional collaboration, data or compute, start with a focused conversation.'])+`<section class="section compact"><div class="wrap contact-grid"><div class="contact-form-area"><h2>${tr(['整理咨询需求','Prepare your enquiry'])}</h2><p>${tr(['选择关注方向，生成并复制咨询内容，再通过右侧联系方式发送给团队。','Choose your interests, prepare and copy your enquiry, then send it to our team using the contact channels shown.'])}</p><form id="enquiry-form"><div class="field-pair"><label>${tr(['如何称呼你','Your name'])}<input name="name" autocomplete="name" maxlength="80" placeholder="${tr(['姓名或称呼','Name'])}" required></label><label>${tr(['所在国家或地区','Country or region'])}<input name="region" autocomplete="country-name" maxlength="80" placeholder="${tr(['例如：阿联酋','e.g. UAE'])}" required></label></div><label>${tr(['关注的服务','Service of interest'])}<select name="service"><option value="research">${tr(['策略研发与技术服务','Strategy research & technology'])}</option><option value="markets">${tr(['全球行情','Global markets'])}</option><option value="signals">${tr(['交易信号与供应商合作','Signals & provider collaboration'])}</option><option value="infrastructure">${tr(['AI基础设施','AI infrastructure'])}</option><option value="institutions">${tr(['机构合作','Institutional collaboration'])}</option></select></label><label>${tr(['需求说明','Your enquiry'])}<textarea name="message" required maxlength="2000" rows="5" placeholder="${tr(['你关注的市场、策略、使用场景或希望了解的问题……','Markets, strategies, use cases or questions you would like to discuss…'])}"></textarea></label><button class="button" type="submit">${tr(['生成咨询内容','Prepare enquiry'])}${arrow}</button><p class="form-note">${tr(['此步骤不会自动发送信息。请勿填写交易密码、账户密钥或证件信息。','This does not automatically send information. Do not include trading passwords, account keys or identity documents.'])}</p></form><div id="enquiry-result" hidden><h3>${tr(['咨询内容已整理','Your enquiry is ready'])}</h3><textarea id="enquiry-text" rows="7" readonly aria-label="${tr(['生成的咨询内容','Prepared enquiry'])}"></textarea><button class="button" id="copy-enquiry">${tr(['复制并联系团队','Copy and contact the team'])}${arrow}</button><p>${tr(['复制后，请扫码打开WhatsApp或微信并粘贴发送。','After copying, scan the WhatsApp or WeChat code and paste your message.'])}</p></div></div><aside class="contact-channels"><span class="eyebrow">DIRECT CONTACT</span><h2>${tr(['与团队直接交流','Connect with the team'])}</h2><div class="qr-grid"><figure><a href="/assets/whatsapp.png" target="_blank" aria-label="${tr(['放大WhatsApp二维码','Enlarge WhatsApp QR code'])}"><img src="/assets/whatsapp.png" alt="WhatsApp ${tr(['联系二维码','contact QR code'])}"></a><figcaption>WhatsApp<small>${tr(['使用WhatsApp扫码','Scan with WhatsApp'])}</small></figcaption></figure><figure><a href="/assets/wechat.jpg" target="_blank" aria-label="${tr(['放大微信二维码','Enlarge WeChat QR code'])}"><img src="/assets/wechat.jpg" alt="${tr(['微信联系二维码','WeChat contact QR code'])}"></a><figcaption>${tr(['微信 · 冲浪者','WeChat · Surfer'])}<small>${tr(['使用微信扫码','Scan with WeChat'])}</small></figcaption></figure></div><p>${tr(['手机访问时可点击二维码放大，保存图片后在对应应用中识别。','On mobile, tap a QR code to enlarge it. Save the image and scan it in the corresponding app.'])}</p><div class="contact-note"><h3>${tr(['让沟通更高效','Make the conversation useful'])}</h3><p>${tr(['策略咨询可注明产品名称与运行环境；机构合作可描述需求及交付目标；基础设施咨询可补充数据规模与工作负载。','For strategies, include the product and operating environment. For institutional work, describe objectives. For infrastructure, add data size and workload requirements.'])}</p></div></aside></div></section>`}
function legal(){return intro(['风险与隐私','RISK & PRIVACY'],['交易风险与咨询隐私说明','Trading risk and enquiry privacy'],['请在使用本站及第三方业务平台前，了解以下说明。','Please read the following before using this website and third-party platforms.'])+`<section class="section compact"><div class="wrap prose legal-prose">${[[['内容与服务范围','Content & service scope'],['本站用于集团业务、策略研究及相关服务介绍，不构成个别投资建议、收益承诺或交易委托。具体服务、费用、主体及适用地区以实际沟通和协议为准。','This website introduces group businesses, strategy research and related services. It does not constitute individualized advice, a return guarantee or a trading mandate. Specific services, fees, providers and regions are subject to actual discussions and agreements.']],[['交易风险','Trading risk'],['外汇、黄金及其他杠杆交易可能导致部分或全部本金损失。市场波动、流动性、滑点及系统故障均可能影响结果。自动化、对冲和止损机制不能消除损失风险。','FX, gold and other leveraged trading may result in loss of part or all of the capital invested. Volatility, liquidity, slippage and system failures affect outcomes. Automation, hedging and stops do not eliminate loss risk.']],[['历史数据与来源','Historical data & sources'],['历史表现不代表未来结果。本站展示的历史快照均注明日期和来源，具体区间、费用及验证项目应查阅原始记录。引用第三方不意味着其对本集团或产品提供背书。','Past performance does not predict future results. Historical snapshots identify their dates and sources. Consult original records for periods, fees and verification scope. A reference does not imply third-party endorsement.']],[['咨询信息与隐私','Enquiry information & privacy'],['咨询整理工具仅在当前页面生成内容，不会自动提交表单信息给团队；刷新或关闭页面会清除未保存内容。使用复制功能后，内容会进入设备剪贴板。通过WhatsApp、微信或第三方网站发送信息时，适用对应平台的隐私政策。网站托管服务可能记录访问所需的基础日志。本网站未部署广告追踪或用户分析脚本。','The enquiry tool prepares content in the current page and does not automatically submit it to the team. Refreshing or closing the page clears unsaved content. Copying places content on your device clipboard. Information sent through WhatsApp, WeChat or other sites is subject to their privacy policies. Hosting services may retain basic access logs. This site does not deploy advertising trackers or analytics scripts.']]].map(([h,p])=>`<section><h2>${tr(h)}</h2><p>${tr(p)}</p></section>`).join('')}</div></section>`}
const routes=[];
const directoryRoutes = ['', 'about', 'faq', 'strategies', 'strategies/goldarmor', 'strategies/goldhunter',
  'strategies/surfer', 'performance', 'services/markets', 'research', 'research/what-is-an-ea'];
const directory = {zh: [], en: []};
const searchEntries = {zh: [], en: []};
const searchAliases = {
  '': ['冲浪者 冲浪者AI量化 SurferFX Surfer Quant', 'SurferFX Surfer Quant 冲浪者AI量化'],
  'strategies/goldarmor': ['黄金甲 黄金甲AI 黄金甲策略 GoldArmor AI 黄金EA', 'GoldArmor AI gold EA XAUUSD 黄金甲'],
  'strategies/surfer': ['冲浪者EA 外汇EA Surfer EA', 'Surfer EA FX portfolio 冲浪者'],
  'research/stock-price-adjustments': ['股票复权 股票拆股 股票回测 复权价格', 'stock split equity adjusted close backtesting'],
  'research/futures-contract-roll': ['期货换月 期货移仓 连续合约 黄金期货', 'futures rollover continuous contract gold futures'],
};
function save(route, title, desc, body) {
  const dir = path.join(root, lang, route);
  fs.mkdirSync(dir, {recursive:true});
  fs.writeFileSync(path.join(dir, 'index.html'), layout(route, tr(title), tr(desc), body));
  const canonical = origin + url(route);
  routes.push(canonical);
  const guide = articles.find(a => route === 'research/' + a.id);
  const sections = guide ? guide.parts.map(([heading]) => tr(heading)).join(' ') : '';
  searchEntries[lang].push({ path: url(route), title: tr(title), description: tr(desc), sections: [sections, tr(searchAliases[route] || '')].join(' ').trim() });
  if (directoryRoutes.includes(route) || route.startsWith('research/')) {
    directory[lang].push(`- [${tr(title)}](${canonical}): ${tr(desc)}`);
  }
}
for (lang of ['zh','en']) {
  save('', ['黄金与外汇量化交易研究','Gold and forex quantitative trading research'],
    ['冲浪者AI量化（SurferFX）研究黄金与外汇量化交易。比较黄金甲策略与冲浪者外汇 EA 的交易逻辑、运行条件及历史回撤，了解团队的数据与算力服务。','Explore quantitative trading research from SurferFX. Compare GoldArmor’s gold breakout rules with Surfer forex EA, review historical drawdowns and explore research data and compute services.'], home());
  save('strategies', ['黄金与外汇量化策略','Gold and forex trading strategies'],
    ['按黄金突破、外汇多货币对组合和黄金期现价差比较五项量化策略，查看黄金甲AI、冲浪者 EA 等策略的交易逻辑、执行频率和风险。','Compare five gold and forex strategies by trading logic, market, execution requirements and risk, from trend breakouts to futures–spot spreads.'], strategyIndex());
  for (const s of strategies) save('strategies/' + s.id, s.pageTitle, s.summary, strategyDetail(s));
  save('services', ['量化研究与技术服务','Quantitative research and technology services'],
    ['了解冲浪者量化的策略研发、全球行情、交易信号和 AI 基础设施四项业务，以及机构合作的需求沟通、验证与交付流程。','Explore strategy research, global market coverage, trading signal evaluation and AI infrastructure, with a guide to institutional collaboration.'], services());
  for (const b of business) save('services/' + b.id, b.pageTitle, b.body, serviceDetail(b));
  save('performance', ['黄金甲历史实盘记录与回撤','GoldArmor historical trading records and drawdowns'],
    ['查看黄金甲标注日期为 2026 年 9 月 6 日的两份账户快照，对照累计收益、最大回撤与原始来源，了解历史数据的统计口径。','Review two GoldArmor account snapshots dated September 6, 2026, with cumulative gains, maximum drawdowns, sources and limits of comparison.'], performance());
  save('research', ['研究洞察：黄金甲市场观察与量化研究指南','Research insights: GoldArmor market notes and quantitative trading guides'],
    ['按日期阅读黄金甲策略市场观察与账户复盘，或查阅黄金与外汇 EA、股票复权、期货换月和量化回测的研究指南。','Browse dated GoldArmor market commentary and account reviews, alongside guides to gold and forex EAs, equity price adjustments and futures rolls.'], research());
  if (lang === 'zh') {
    for (const item of archive) save('research/' + item.id, item.title, item.date + ' 黄金甲市场观察。' + item.description, archiveArticle(item));
  }
  for (const a of articles) save('research/' + a.id, a.title, a.intro, article(a));
  save('about', ['关于冲浪者AI量化（SurferFX）与全球团队','About SurferFX, Surfer Quant and its global network'],
    ['了解冲浪者量化的研究方向，以及在新加坡、新西兰、迪拜、马来西亚和中国的机构与团队网络。','Learn about Surfer Quant’s research approach and its institutional and team network in Singapore, New Zealand, Dubai, Malaysia and China.'], about());
  save('faq', ['SurferFX 品牌与策略常见问题','SurferFX brand and strategy FAQ'],
    ['了解冲浪者AI量化、冲浪者 EA、黄金猎人及黄金甲的品牌关系，比较黄金与外汇策略，查阅历史账户快照的日期与来源。','Find sourced answers about SurferFX, Surfer EA, GoldHunter and GoldArmor AI, with strategy comparisons and dates for historical account snapshots.'], faq());
  save('contact', ['联系团队与机构合作','Contact and institutional enquiries'],
    ['通过微信或 WhatsApp 联系冲浪者量化团队，就策略研究、机构合作、市场数据或 AI 算力需求发起咨询。','Contact Surfer Quant via WeChat or WhatsApp about trading strategy research, institutional partnerships, market data or AI compute.'], contact());
  save('legal', ['交易风险与咨询隐私说明','Trading risk and enquiry privacy'],
    ['了解外汇与黄金交易风险、历史记录和第三方数据的使用范围，以及咨询表单、剪贴板和外部联系渠道如何处理信息。','Read about forex and gold trading risks, the scope of historical records and third-party data, and how the enquiry form and contact channels handle information.'], legal());
}
for (const item of archive) {
  searchEntries.en.push({path:'/zh/research/' + item.id + '/', title:item.en + ' (中文原文)', description:item.title, sections:'GoldArmor market notes'});
}
for (const language of ['zh','en']) {
  fs.writeFileSync(path.join(root,'assets','search-' + language + '.json'), JSON.stringify(searchEntries[language]));
}
fs.copyFileSync('src/site-search.js',path.join(root,'assets/site-search.js'));
fs.writeFileSync(path.join(root,'index.html'),'<!doctype html><html lang="zh-CN"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta http-equiv="refresh" content="0;url=/zh/"><meta name="robots" content="index,follow,max-image-preview:large"><title>冲浪者量化 · Surfer Quant</title><link rel="canonical" href="https://www.surferfx.com/zh/"></head><body><a href="/zh/">进入冲浪者量化</a> · <a href="/en/">Surfer Quant in English</a></body></html>');
fs.writeFileSync(path.join(root,'404.html'),'<!doctype html><html lang="zh-CN"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><link rel="stylesheet" href="/assets/style.css"><meta name="robots" content="noindex"><title>页面未找到 · Surfer Quant</title></head><body><main class="page-intro"><div class="wrap"><div class="eyebrow">404 / SURFER QUANT</div><h1>换个方向，继续探索。</h1><p>页面不存在或已移动。The page was not found.</p><a class="button" href="/zh/">返回首页 →</a></div></main></body></html>');
fs.writeFileSync(path.join(root,'sitemap.xml'),'<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'+routes.map(u => {
  const lastModified = pageMetadata[new URL(u).pathname]?.lastModified;
  return '<url><loc>' + u + '</loc>' + (lastModified ? '<lastmod>' + lastModified + '</lastmod>' : '') + '</url>';
}).join('')+'</urlset>');
fs.writeFileSync(path.join(root, 'llms.txt'), [
  '# SurferFX', '',
  '> 冲浪者量化（Surfer Quant）官网资料索引。Official Surfer Quant reference pages.', '',
  '## 中文资料', '', ...directory.zh, '', '## English references', '', ...directory.en, ''
].join('\n'));
const indexNowKey = fs.readFileSync('src/indexnow-key.txt', 'utf8').trim();
fs.writeFileSync(path.join(root, indexNowKey + '.txt'), indexNowKey);
fs.writeFileSync(path.join(root,'robots.txt'),'User-agent: *\nAllow: /\nSitemap: https://www.surferfx.com/sitemap.xml\n');
fs.copyFileSync('src/style.css',path.join(root,'assets/style.css'));fs.copyFileSync('src/app.js',path.join(root,'assets/app.js'));
console.log(`Built ${routes.length} bilingual pages.`);
