/* Client-side search across markdown files using Lunr.
 * This avoids needing Jekyll plugins (GitHub Pages compatible).
 * Adjust fileList if new .md files are added.
 */
(function() {
  const searchBox = document.getElementById('search-box');
  const resultsEl = document.getElementById('search-results');
  const statusEl = document.getElementById('search-status');
  const indexUrl = window.SEARCH_INDEX_URL || 'assets/search-index.json';
  let index = null; // Lunr index
  let docs = [];    // Array of documents

  function setStatus(msg) { if (statusEl) statusEl.textContent = msg; }

  async function loadPrebuiltIndex() {
    if (index) return;
    setStatus('Laster indeks …');
    try {
      const res = await fetch(indexUrl, { cache: 'no-store' });
      if (!res.ok) throw new Error('HTTP ' + res.status);
      const json = await res.json();
      docs = json.docs || [];
      index = lunr(function() {
        if (this.use && lunr.no) this.use(lunr.no); // Norwegian stemming plugin
        this.ref('id');
        this.field('title', { boost: 2 });
        this.field('content');
        docs.forEach(d => this.add(d));
      });
      setStatus('Indeks klar. Skriv for å søke.');
    } catch (e) {
      console.error('Feil ved bygging av indeks', e);
      setStatus('Feil ved lasting av indeks');
    }
  }

  function highlight(text, terms) {
    if (!terms.length) return text;
    const escaped = terms.map(t => t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
    const re = new RegExp('(' + escaped.join('|') + ')', 'ig');
    return text.replace(re, '<mark>$1</mark>');
  }

  function search(q) {
    if (!index) return;
    const terms = q.trim().toLowerCase().split(/\s+/).filter(Boolean);
    const res = index.search(q + '*');
    resultsEl.innerHTML = '';
    if (!res.length) {
      resultsEl.innerHTML = '<li>Ingen treff.</li>';
      return;
    }
    res.slice(0, 50).forEach(r => {
      const doc = docs.find(d => d.id === r.ref);
      if (!doc) return;
      const lc = doc.content.toLowerCase();
      const firstPos = terms.reduce((acc, t) => {
        const p = lc.indexOf(t);
        if (p === -1) return acc;
        return acc === -1 || p < acc ? p : acc;
      }, -1);
      let snippet = doc.content;
      if (firstPos !== -1) {
        snippet = doc.content.substring(Math.max(0, firstPos - 80), firstPos + 160);
      } else {
        snippet = snippet.slice(0, 240);
      }
      snippet = highlight(snippet, terms);
      const li = document.createElement('li');
      li.className = 'search-hit';
      li.innerHTML = '<h3><a href="' + (doc.url || '#') + '">' + doc.title + '</a></h3>' + '<div class="snippet">… ' + snippet + ' …</div>';
      resultsEl.appendChild(li);
    });
  }

  function onInput(e) {
    const q = e.target.value;
    if (!index) {
      loadPrebuiltIndex().then(() => q && search(q));
      return;
    }
    if (!q.trim()) {
      resultsEl.innerHTML = '';
      return;
    }
    search(q);
  }

  document.addEventListener('DOMContentLoaded', () => {
    // Pre-load index immediately
    loadPrebuiltIndex();
    if (searchBox) searchBox.addEventListener('input', onInput);
  });
})();
