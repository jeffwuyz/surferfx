(() => {
  const panel = document.querySelector('.publication-search');
  if (!panel) return;
  panel.hidden = false;
  const english = document.documentElement.lang === 'en';
  const input = panel.querySelector('input');
  const status = panel.querySelector('[role=status]');
  const list = panel.querySelector('ul');
  const normalize = text => text.normalize('NFKC').toLowerCase().replace(/\s+/g, ' ').trim();
  const contains = (text, term) => term === 'ea' ? /(?:^|[^a-z])ea(?:$|[^a-z])/.test(text) : text.includes(term);
  let loaded;
  let generation = 0;
  panel.querySelector('form').addEventListener('submit', async event => {
    event.preventDefault();
    const token = ++generation;
    const terms = normalize(input.value).split(/[\s，,、]+/).filter(Boolean);
    list.replaceChildren();
    if (!terms.length) { status.textContent = ''; return; }
    status.textContent = english ? 'Searching…' : '正在搜索…';
    try {
      loaded ??= fetch('/assets/search-' + (english ? 'en' : 'zh') + '.json').then(response => {
        if (!response.ok) throw new Error('index');
        return response.json();
      });
      const entries = await loaded;
      if (token !== generation) return;
      const results = [];
      for (const entry of entries) {
        const title = normalize(entry.title);
        const detail = normalize(entry.description + ' ' + entry.sections);
        const hits = terms.map(term => contains(title, term) ? 3 : contains(detail, term) ? 1 : 0);
        if (hits.every(Boolean)) results.push({entry, score:hits.reduce((a,b) => a + b, 0)});
      }
      results.sort((a,b) => b.score - a.score);
      status.textContent = results.length ? (english ? results.length + ' matching pages' : '找到 ' + results.length + ' 个相关页面')
        : (english ? 'No matches. Try a shorter term.' : '未找到相关页面，可以试试更短的关键词。');
      for (const {entry} of results) {
        const item = document.createElement('li');
        const link = document.createElement('a');
        link.href = entry.path;
        link.textContent = entry.title;
        item.append(link);
        list.append(item);
      }
    } catch {
      loaded = undefined;
      if (token === generation) status.textContent = english ? 'Search is unavailable. Please try again.' : '暂时无法载入目录，请重试。';
    }
  });
  input.addEventListener('input', () => {
    generation++;
    list.replaceChildren();
    status.textContent = '';
  });
})();
