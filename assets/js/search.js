/* global lunr */
(function(){
  const input = document.getElementById('search-box');
  const results = document.getElementById('search-results');
  const status = document.getElementById('search-status');
  if(!input || !results){ return; }

  const INDEX_URL = window.SEARCH_INDEX_URL || '/assets/search-index.json';
  let idx = null;
  let docs = [];

  function escapeHtml(str){
    return (str||'').replace(/[&<>"']/g, c=>({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#39;"}[c]));
  }

  function highlight(text, terms){
    if(!terms.length) return escapeHtml(text.slice(0,260));
    const escaped = terms.map(t=>t.replace(/[.*+?^${}()|[\]\\]/g,'\\$&'));
    const re = new RegExp('(' + escaped.join('|') + ')','gi');
    const snippet = text.slice(0,800);
    return escapeHtml(snippet).replace(re,'<mark>$1</mark>');
  }

  function buildIndex(json){
    docs = json.docs;
    idx = lunr(function(){
      if(lunr.no){ this.use(lunr.no); }
      this.ref('id');
      this.field('title', { boost: 3 });
      this.field('content');
      docs.forEach(d=>this.add(d));
    });
  }

  function ensureIndex(){
    if(idx) return Promise.resolve();
    status.textContent = 'Laster indeks…';
    return fetch(INDEX_URL, { cache:'no-store' })
      .then(r=>r.json())
      .then(j=>{ buildIndex(j); status.textContent = j.doc_count + ' dokumenter'; })
      .catch(e=>{ status.textContent = 'Feil ved lasting av indeks'; console.error(e); });
  }

  function render(res, terms){
    results.innerHTML='';
    if(!res.length){ results.innerHTML='<li>Ingen treff</li>'; return; }
    const frag = document.createDocumentFragment();
    res.slice(0,30).forEach(hit=>{
      const d = docs.find(dd=>dd.id===hit.ref);
      if(!d) return;
      const li = document.createElement('li');
      li.innerHTML = '<a href="'+d.url+'"><strong>'+escapeHtml(d.title)+'</strong></a><br><small>'+highlight(d.content, terms)+'</small>';
      frag.appendChild(li);
    });
    results.appendChild(frag);
  }

  function onInput(){
    const q = input.value.trim();
    if(!q){ results.innerHTML=''; status.textContent=''; return; }
    ensureIndex().then(()=>{
      const terms = q.split(/\s+/).filter(Boolean);
      let res = [];
      try { res = idx.search(terms.map(t=>t+'*').join(' ')); } catch(err){ console.error(err); }
      status.textContent = res.length + ' treff';
      render(res, terms);
    });
  }

  input.addEventListener('input', onInput);
})();
