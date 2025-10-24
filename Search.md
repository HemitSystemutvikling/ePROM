---
layout: default
title: Søk i dokumentasjonen
permalink: /search/
---

# Søk i dokumentasjonen

Skriv inn ett eller flere søkeord. Indeksen er forhåndsbygget og lastes inn ved første søk. Norsk stemming (Lunr) er aktivert.

<input id="search-box" type="search" placeholder="Søk…" style="width:100%;padding:0.6rem;font-size:1rem;" autocomplete="off" />
<p id="search-status" style="font-size:0.9rem;color:#555;margin:.5rem 0 0 0;"></p>
<ol id="search-results" style="margin-top:1rem;padding-left:1.2rem;"></ol>

<script src="https://cdn.jsdelivr.net/npm/lunr/lunr.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/lunr-languages@1.4.0/lunr.stemmer.support.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/lunr-languages@1.4.0/lunr.no.min.js"></script>
<script>window.SEARCH_INDEX_URL = '{{ '/assets/search-index.json' | relative_url }}';</script>
<script src="{{ '/assets/js/search.js' | relative_url }}"></script>

<style>
#search-results li { margin-bottom:1rem; }
#search-results mark { background:#ffe89c; }
</style>
