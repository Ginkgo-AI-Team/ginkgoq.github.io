(function () {
  'use strict';

  const POSTS = [
    {
      href: '/research-notes/from-rag-to-domain-intelligence/',
      date: 'May 4, 2026',
      cat: 'Research Note',
      title: 'From RAG to Domain Intelligence',
      desc: 'Moving beyond retrieval: extraction, validation, reasoning, and workflow integration.',
    },
    {
      href: '/blog/why-real-world-ai-systems-need-more-than-models/',
      date: 'May 12, 2026',
      cat: 'Research Note',
      title: 'Why real-world AI systems need more than models',
      desc: 'On evaluation, reliability, and the gap between benchmarks and production.',
    },
    {
      href: '/blog/building-reliable-ai-pipelines-for-document-understanding/',
      date: 'May 8, 2026',
      cat: 'Engineering',
      title: 'Building reliable AI pipelines for document understanding',
      desc: 'How extraction, validation, and confidence scoring make document AI production-ready.',
    },
  ];

  const html = document.documentElement;
  const btnTheme = document.getElementById('btn-theme');
  const header = document.getElementById('site-header');
  const btnSearchOpen = document.getElementById('btn-search-open');
  const btnSearchClose = document.getElementById('btn-search-close');
  const searchInput = document.getElementById('search-input');
  const resultsPanel = document.getElementById('search-results-panel');
  const resultsList = document.getElementById('search-results-list');
  const hamburger = document.getElementById('btn-hamburger');
  const mobileNavEl = document.getElementById('mobile-nav');
  const iconMenu = document.getElementById('icon-hamburger');
  const iconClose = document.getElementById('icon-hamburger-close');
  let focusedIdx = -1;

  function applyTheme(theme) {
    html.setAttribute('data-theme', theme);
    localStorage.setItem('gq-theme', theme);
    btnTheme?.setAttribute('aria-label', theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
  }

  const storedTheme = localStorage.getItem('gq-theme');
  const initialTheme = storedTheme || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  applyTheme(initialTheme);

  btnTheme?.addEventListener('click', () => {
    const next = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    applyTheme(next);
  });

  function setActiveNavigation() {
    const path = window.location.pathname;
    const active = path.startsWith('/blog/') ? 'blog' : path.startsWith('/research-notes/') ? 'research-notes' : path.startsWith('/about/') ? 'about' : '';
    document.querySelectorAll('.site-nav a, .mobile-nav a').forEach((link) => {
      const id = link.id?.replace('mnav-', '').replace('nav-', '');
      link.classList.toggle('active', id === active && link.closest('.site-nav'));
      link.classList.toggle('active-mobile', id === active && link.closest('.mobile-nav'));
    });
  }

  function closeMobileNav() {
    mobileNavEl?.classList.remove('open');
    mobileNavEl?.setAttribute('aria-hidden', 'true');
    hamburger?.setAttribute('aria-expanded', 'false');
    if (iconMenu) iconMenu.style.display = '';
    if (iconClose) iconClose.style.display = 'none';
  }

  hamburger?.addEventListener('click', () => {
    const isOpen = mobileNavEl?.classList.toggle('open') ?? false;
    hamburger.setAttribute('aria-expanded', String(isOpen));
    hamburger.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
    mobileNavEl?.setAttribute('aria-hidden', String(!isOpen));
    if (iconMenu) iconMenu.style.display = isOpen ? 'none' : '';
    if (iconClose) iconClose.style.display = isOpen ? '' : 'none';
  });

  function renderResults(queryValue) {
    if (!resultsList) return;
    const query = queryValue.trim().toLowerCase();
    const items = query
      ? POSTS.filter((post) =>
          post.title.toLowerCase().includes(query) ||
          post.desc.toLowerCase().includes(query) ||
          post.cat.toLowerCase().includes(query)
        )
      : POSTS;

    resultsList.innerHTML = '';
    focusedIdx = -1;

    if (!items.length) {
      resultsList.innerHTML = '<li class="search-no-results">No results found.</li>';
      return;
    }

    items.forEach((post, index) => {
      const li = document.createElement('li');
      li.className = 'search-result';
      li.setAttribute('role', 'option');
      li.id = `sr-${index}`;
      li.innerHTML = `
        <a href="${post.href}" tabindex="-1">
          <span class="sr-cat">${post.cat}</span>
          <span class="sr-title">${post.title}</span>
          <span class="sr-desc">${post.desc}</span>
        </a>
      `;
      resultsList.appendChild(li);
    });
  }

  function openSearch() {
    header?.classList.add('search-open');
    resultsPanel?.classList.add('open');
    resultsPanel?.removeAttribute('hidden');
    btnSearchOpen?.setAttribute('aria-expanded', 'true');
    btnSearchClose?.removeAttribute('hidden');
    if (searchInput) {
      searchInput.value = '';
      renderResults('');
      setTimeout(() => searchInput.focus(), 120);
    }
  }

  function closeSearch() {
    header?.classList.remove('search-open');
    resultsPanel?.classList.remove('open');
    btnSearchOpen?.setAttribute('aria-expanded', 'false');
    btnSearchClose?.setAttribute('hidden', '');
    focusedIdx = -1;
    if (resultsPanel) {
      setTimeout(() => {
        if (!header?.classList.contains('search-open')) resultsPanel.setAttribute('hidden', '');
      }, 300);
    }
  }

  function moveFocus(dir) {
    if (!resultsList) return;
    const items = resultsList.querySelectorAll('.search-result');
    if (!items.length) return;
    if (focusedIdx >= 0) items[focusedIdx]?.classList.remove('focused');
    focusedIdx = Math.max(0, Math.min(items.length - 1, focusedIdx + dir));
    items[focusedIdx].classList.add('focused');
    items[focusedIdx].querySelector('a')?.focus();
  }

  btnSearchOpen?.addEventListener('click', openSearch);
  btnSearchClose?.addEventListener('click', closeSearch);

  searchInput?.addEventListener('input', (event) => renderResults(event.target.value));
  searchInput?.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowDown') { event.preventDefault(); moveFocus(1); }
    if (event.key === 'ArrowUp') { event.preventDefault(); moveFocus(-1); }
    if (event.key === 'Escape') closeSearch();
  });

  document.addEventListener('keydown', (event) => {
    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
      event.preventDefault();
      openSearch();
    }
    if (event.key === '/' && document.activeElement === document.body) {
      event.preventDefault();
      openSearch();
    }
    if (event.key === 'Escape') {
      if (header?.classList.contains('search-open')) closeSearch();
      closeMobileNav();
    }
  });

  document.addEventListener('click', (event) => {
    if (header?.classList.contains('search-open') && !header.contains(event.target) && !resultsPanel?.contains(event.target)) {
      closeSearch();
    }
    if (event.target.closest('.mobile-nav a')) closeMobileNav();
  });

  const sentinel = document.getElementById('scroll-sentinel');
  if (sentinel && header) {
    new IntersectionObserver(
      ([entry]) => header.classList.toggle('scrolled', !entry.isIntersecting),
      { threshold: 1 }
    ).observe(sentinel);
  }

  const progressBar = document.getElementById('reading-progress');
  function updateProgress() {
    if (!progressBar) return;
    const article = document.querySelector('.prose');
    if (!article) {
      progressBar.classList.remove('active');
      progressBar.style.transform = 'scaleX(0)';
      return;
    }
    const rect = article.getBoundingClientRect();
    const total = rect.height - window.innerHeight;
    if (total <= 0) {
      progressBar.classList.remove('active');
      return;
    }
    const pct = Math.max(0, Math.min(1, -rect.top / total));
    progressBar.classList.add('active');
    progressBar.style.transform = `scaleX(${pct})`;
    progressBar.setAttribute('aria-valuenow', String(Math.round(pct * 100)));
  }

  window.addEventListener('scroll', updateProgress, { passive: true });

  document.querySelectorAll('.code-block').forEach((block) => {
    const btn = block.querySelector('.copy-btn');
    const code = block.querySelector('code');
    if (!btn || !code) return;
    btn.addEventListener('click', () => {
      navigator.clipboard.writeText(code.innerText).then(() => {
        btn.textContent = 'Copied';
        btn.classList.add('copied');
        setTimeout(() => {
          btn.textContent = 'Copy';
          btn.classList.remove('copied');
        }, 1800);
      });
    });
  });

  const bttBtn = document.getElementById('back-to-top');
  if (bttBtn) {
    window.addEventListener('scroll', () => {
      bttBtn.classList.toggle('visible', window.scrollY > 400);
    }, { passive: true });
    bttBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  const tocLinks = document.querySelectorAll('.toc a');
  const headings = document.querySelectorAll('.prose h2[id], .prose h3[id]');
  if (tocLinks.length && headings.length) {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const link = document.querySelector(`.toc a[href="#${entry.target.id}"]`);
        link?.classList.toggle('active', entry.isIntersecting);
      });
    }, { rootMargin: '-10% 0% -82% 0%', threshold: 0 });
    headings.forEach((heading) => obs.observe(heading));
  }

  const shareBtn = document.getElementById('share-btn');
  if (shareBtn) {
    const original = shareBtn.innerHTML;
    shareBtn.addEventListener('click', async () => {
      const title = document.querySelector('.article-header h1')?.textContent?.trim() || document.title;
      const url = location.href;
      try {
        if (navigator.share) {
          await navigator.share({ title, url });
        } else {
          await navigator.clipboard.writeText(url);
          shareBtn.textContent = 'Link copied';
          setTimeout(() => { shareBtn.innerHTML = original; }, 1800);
        }
      } catch (_) {
        // User cancelled native share.
      }
    });
  }

  setActiveNavigation();
  updateProgress();
})();
