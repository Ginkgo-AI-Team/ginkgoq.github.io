/* ui.js — GinkgoQ interactions
   Handles: routing, dark/light theme, search, reading progress,
            header scroll detection, code copy buttons, post data
*/
(function () {
  'use strict';

  /* ── Post / note data ─────────────────────────────────────────────────── */
  const POSTS = [
    {
      id: 'rag-domain-intelligence',
      date: 'May 4, 2026', cat: 'Research Note', read: '7 min',
      title: 'From RAG to Domain Intelligence',
      desc: 'Moving beyond retrieval: extraction, validation, reasoning, and workflow integration.',
      page: 'article-rag',
    },
    {
      id: 'ai-systems-models',
      date: 'May 12, 2026', cat: 'Research Note', read: '6 min',
      title: 'Why real-world AI systems need more than models',
      desc: 'On evaluation, reliability, and the gap between benchmarks and production.',
      page: 'article-rag',
    },
    {
      id: 'document-pipeline',
      date: 'May 8, 2026', cat: 'Engineering', read: '8 min',
      title: 'Building reliable AI pipelines for document understanding',
      desc: 'How extraction, validation, and confidence scoring make document AI production-ready.',
      page: 'article-rag',
    },
  ];

  /* ── Mobile nav hamburger ────────────────────────────────────────────── */
  const hamburger   = document.getElementById('btn-hamburger');
  const mobileNavEl = document.getElementById('mobile-nav');
  const iconMenu    = document.getElementById('icon-hamburger');
  const iconClose   = document.getElementById('icon-hamburger-close');

  function closeMobileNav() {
    if (!mobileNavEl) return;
    mobileNavEl.classList.remove('open');
    mobileNavEl.setAttribute('aria-hidden', 'true');
    if (hamburger)  hamburger.setAttribute('aria-expanded', 'false');
    if (iconMenu)   iconMenu.style.display  = '';
    if (iconClose)  iconClose.style.display = 'none';
  }

  if (hamburger && mobileNavEl) {
    hamburger.addEventListener('click', () => {
      const isOpen = mobileNavEl.classList.toggle('open');
      hamburger.setAttribute('aria-expanded', String(isOpen));
      hamburger.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
      mobileNavEl.setAttribute('aria-hidden', String(!isOpen));
      if (iconMenu)  iconMenu.style.display  = isOpen ? 'none' : '';
      if (iconClose) iconClose.style.display = isOpen ? '' : 'none';
    });
  }

  /* ── Router (updated to sync mobile nav active state) ────────────────── */
  let currentPage = 'home';

  function showPage(id) {
    if (id === currentPage) return;
    currentPage = id;

    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.querySelectorAll('.site-nav a').forEach(a => a.classList.remove('active'));
    document.querySelectorAll('.mobile-nav a').forEach(a => a.classList.remove('active-mobile'));

    const pg       = document.getElementById('page-' + id);
    const nav      = document.getElementById('nav-' + id);
    const mobileLink = document.getElementById('mnav-' + id);
    if (pg)         pg.classList.add('active');
    if (nav)        nav.classList.add('active');
    if (mobileLink) mobileLink.classList.add('active-mobile');

    window.scrollTo({ top: 0, behavior: 'instant' });
    history.replaceState(null, '', '#' + id);
    updateProgress();
    closeSearch();
    closeMobileNav();
  }

  // intercept all [data-page] clicks
  document.addEventListener('click', e => {
    const a = e.target.closest('[data-page]');
    if (!a) return;
    e.preventDefault();
    showPage(a.dataset.page);
  });

  window.addEventListener('hashchange', () => {
    const h = location.hash.slice(1);
    if (h) showPage(h);
  });

  /* ── Theme ────────────────────────────────────────────────────────────── */
  const html     = document.documentElement;
  const btnTheme = document.getElementById('btn-theme');

  function applyTheme(t) {
    html.setAttribute('data-theme', t);
    localStorage.setItem('gq-theme', t);
    if (btnTheme) btnTheme.setAttribute('aria-label', t === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
  }

  const savedTheme = localStorage.getItem('gq-theme') ||
    (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  applyTheme(savedTheme);

  if (btnTheme) {
    btnTheme.addEventListener('click', () => {
      applyTheme(html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
    });
  }

  /* ── Search ───────────────────────────────────────────────────────────── */
  const header        = document.getElementById('site-header');
  const btnSearchOpen = document.getElementById('btn-search-open');
  const btnSearchClose= document.getElementById('btn-search-close');
  const searchInput   = document.getElementById('search-input');
  const resultsPanel  = document.getElementById('search-results-panel');
  const resultsList   = document.getElementById('search-results-list');

  let focusedIdx = -1;

  function openSearch() {
    header.classList.add('search-open');
    resultsPanel.classList.add('open');
    resultsPanel.removeAttribute('hidden');
    if (searchInput) {
      searchInput.value = '';
      renderResults('');
      setTimeout(() => searchInput.focus(), 180);
    }
  }

  function closeSearch() {
    header.classList.remove('search-open');
    resultsPanel.classList.remove('open');
    focusedIdx = -1;
    setTimeout(() => {
      if (!header.classList.contains('search-open'))
        resultsPanel.setAttribute('hidden', '');
    }, 300);
    if (btnSearchOpen) btnSearchOpen.focus();
  }

  function renderResults(q) {
    const query = q.trim().toLowerCase();
    const items = query.length < 1
      ? POSTS
      : POSTS.filter(p =>
          p.title.toLowerCase().includes(query) ||
          p.desc.toLowerCase().includes(query) ||
          p.cat.toLowerCase().includes(query)
        );

    resultsList.innerHTML = '';
    focusedIdx = -1;

    if (!items.length) {
      resultsList.innerHTML = '<p class="search-no-results">No results found.</p>';
      return;
    }

    items.forEach((p, i) => {
      const li = document.createElement('li');
      li.className = 'search-result';
      li.setAttribute('role', 'option');
      li.id = 'sr-' + i;
      li.innerHTML =
        `<a href="#${p.page}" data-page="${p.page}" tabindex="-1">` +
          `<span class="sr-cat">${p.cat}</span>` +
          `<span class="sr-title">${p.title}</span>` +
          `<span class="sr-desc">${p.desc}</span>` +
        `</a>`;
      resultsList.appendChild(li);
    });
  }

  function moveFocus(dir) {
    const items = resultsList.querySelectorAll('.search-result');
    if (!items.length) return;
    items[Math.max(0, focusedIdx)]?.classList.remove('focused');
    focusedIdx = Math.max(0, Math.min(items.length - 1, focusedIdx + dir));
    items[focusedIdx].classList.add('focused');
    items[focusedIdx].querySelector('a').focus();
  }

  if (btnSearchOpen) btnSearchOpen.addEventListener('click', openSearch);
  if (btnSearchClose) btnSearchClose.addEventListener('click', closeSearch);
  if (searchInput) {
    searchInput.addEventListener('input', e => renderResults(e.target.value));
    searchInput.addEventListener('keydown', e => {
      if (e.key === 'ArrowDown') { e.preventDefault(); moveFocus(1); }
      if (e.key === 'ArrowUp')   { e.preventDefault(); moveFocus(-1); }
      if (e.key === 'Escape')    closeSearch();
    });
  }

  // Keyboard shortcut: Ctrl+K or /
  document.addEventListener('keydown', e => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') { e.preventDefault(); openSearch(); }
    if (e.key === '/' && document.activeElement === document.body) { e.preventDefault(); openSearch(); }
    if (e.key === 'Escape' && header.classList.contains('search-open')) closeSearch();
  });

  // Click outside closes search
  document.addEventListener('click', e => {
    if (header.classList.contains('search-open') &&
        !header.contains(e.target) && !resultsPanel.contains(e.target))
      closeSearch();
  });

  /* ── Header scroll shadow ─────────────────────────────────────────────── */
  const observer = new IntersectionObserver(
    ([entry]) => header.classList.toggle('scrolled', !entry.isIntersecting),
    { threshold: 1 }
  );
  const sentinel = document.getElementById('scroll-sentinel');
  if (sentinel) observer.observe(sentinel);

  /* ── Reading progress ─────────────────────────────────────────────────── */
  const progressBar = document.getElementById('reading-progress');

  function updateProgress() {
    if (!progressBar) return;
    const article = document.querySelector('.page.active .prose');
    if (!article) { progressBar.classList.remove('active'); progressBar.style.transform = 'scaleX(0)'; return; }
    const rect = article.getBoundingClientRect();
    const total = rect.height - window.innerHeight;
    if (total <= 0) { progressBar.classList.remove('active'); return; }
    const pct = Math.max(0, Math.min(1, -rect.top / total));
    progressBar.classList.add('active');
    progressBar.style.transform = `scaleX(${pct})`;
    progressBar.setAttribute('aria-valuenow', Math.round(pct * 100));
  }

  window.addEventListener('scroll', updateProgress, { passive: true });

  /* ── Code copy buttons ────────────────────────────────────────────────── */
  function initCodeBlocks() {
    document.querySelectorAll('.code-block').forEach(block => {
      const btn  = block.querySelector('.copy-btn');
      const code = block.querySelector('code');
      if (!btn || !code) return;
      btn.addEventListener('click', () => {
        navigator.clipboard.writeText(code.innerText).then(() => {
          btn.textContent = '✓ Copied';
          btn.classList.add('copied');
          setTimeout(() => { btn.textContent = 'Copy'; btn.classList.remove('copied'); }, 2000);
        }).catch(() => {
          btn.textContent = 'Failed';
          setTimeout(() => { btn.textContent = 'Copy'; }, 2000);
        });
      });
    });
  }

  /* ── Populate dynamic content ─────────────────────────────────────────── */
  function populateHomePosts() {
    const el = document.getElementById('home-posts');
    if (!el) return;
    POSTS.forEach(p => {
      el.insertAdjacentHTML('beforeend',
        `<article class="home-post-row" role="listitem">
          <div class="home-post-row-inner">
            <div class="post-meta"><time>${p.date}</time><span class="cat">${p.cat}</span></div>
            <h3>${p.title}</h3>
            <p class="desc">${p.desc}</p>
          </div>
          <span class="home-post-read">${p.read} read</span>
        </article>`
      );
    });
  }

  function populateBlogPosts() {
    const el = document.getElementById('blog-posts');
    if (!el) return;
    POSTS.slice(1).forEach(p => {
      el.insertAdjacentHTML('beforeend',
        `<article class="blog-post-row">
          <a href="#${p.page}" data-page="${p.page}">
            <div>
              <div class="post-meta"><time>${p.date}</time><span class="cat">${p.cat}</span></div>
              <h3>${p.title}</h3>
              <p class="desc">${p.desc}</p>
            </div>
            <div class="post-thumb" aria-hidden="true"></div>
          </a>
        </article>`
      );
    });
  }

  function populateResearchNotes() {
    const el = document.getElementById('rn-items');
    if (!el) return;
    POSTS.filter(p => p.cat === 'Research Note').forEach(p => {
      el.insertAdjacentHTML('beforeend',
        `<a class="rn-item" href="#${p.page}" data-page="${p.page}">
          <span class="eyebrow">${p.cat}</span>
          <h2>${p.title}</h2>
          <p>${p.desc}</p>
        </a>`
      );
    });
  }

  /* ── Back to top ─────────────────────────────────────────────────────── */
  const bttBtn = document.getElementById('back-to-top');
  if (bttBtn) {
    window.addEventListener('scroll', () => {
      bttBtn.classList.toggle('visible', window.scrollY > 400);
    }, { passive: true });
    bttBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  /* ── TOC active section (IntersectionObserver) ────────────────────────── */
  function initTOC() {
    const headings = document.querySelectorAll('.prose h2[id], .prose h3[id]');
    if (!headings.length) return;
    const links = document.querySelectorAll('.toc a');
    if (!links.length) return;

    const obs = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        const id  = entry.target.getAttribute('id');
        const lnk = document.querySelector(`.toc a[href="#${id}"]`);
        if (lnk) lnk.classList.toggle('active', entry.isIntersecting);
      });
    }, { rootMargin: '-10% 0% -82% 0%', threshold: 0 });

    headings.forEach(h => obs.observe(h));
  }

  /* ── Article share button ─────────────────────────────────────────────── */
  function initShare() {
    const shareBtn = document.getElementById('share-btn');
    if (!shareBtn) return;
    shareBtn.addEventListener('click', async () => {
      const title = document.querySelector('.article-header h1')?.textContent?.trim() || document.title;
      const url   = location.href;
      try {
        if (navigator.share) {
          await navigator.share({ title, url });
        } else {
          await navigator.clipboard.writeText(url);
          shareBtn.textContent = '✓ Link copied';
          shareBtn.classList.add('shared');
          setTimeout(() => { shareBtn.innerHTML = shareBtn.dataset.original; shareBtn.classList.remove('shared'); }, 2000);
        }
      } catch (_) { /* user cancelled */ }
    });
    shareBtn.dataset.original = shareBtn.innerHTML;
  }

  /* ── Boot ─────────────────────────────────────────────────────────────── */
  function boot() {
    populateHomePosts();
    populateBlogPosts();
    populateResearchNotes();
    initCodeBlocks();
    initTOC();
    initShare();

    // init from URL hash
    const hash = location.hash.slice(1);
    if (hash) showPage(hash);
    else {
      const pg = document.getElementById('page-home');
      if (pg) { pg.classList.add('active'); currentPage = 'home'; }
    }

    // Prism (if loaded)
    if (window.Prism) Prism.highlightAll();
  }

  if (document.readyState === 'loading')
    document.addEventListener('DOMContentLoaded', boot);
  else
    boot();
})();
