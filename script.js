/* ============================================
   XIENITY — Generation 24
   script.js
   ============================================ */

'use strict';

/* ── 1. Loading Screen ── */
(function initLoader() {
  const loader = document.getElementById('loader');
  if (!loader) return;

  // Hide loader after animation completes (~2.8s)
  setTimeout(() => {
    loader.classList.add('hidden');
    document.body.style.overflow = '';
  }, 2800);
})();

// Prevent scroll during load
document.body.style.overflow = 'hidden';


/* ── 2. Realtime Indonesian Clock ── */
(function initClock() {
  const timeEl = document.getElementById('clock-time');
  const dateEl = document.getElementById('clock-date');
  if (!timeEl) return;

  const days   = ['Minggu','Senin','Selasa','Rabu','Kamis','Jumat','Sabtu'];
  const months = ['Januari','Februari','Maret','April','Mei','Juni',
                  'Juli','Agustus','September','Oktober','November','Desember'];

  function pad(n) { return String(n).padStart(2, '0'); }

  function tick() {
    const now = new Date();
    const h   = pad(now.getHours());
    const m   = pad(now.getMinutes());
    const s   = pad(now.getSeconds());
    timeEl.textContent = `${h}:${m}:${s}`;
    if (dateEl) {
      const day  = days[now.getDay()];
      const date = now.getDate();
      const mon  = months[now.getMonth()];
      const yr   = now.getFullYear();
      dateEl.textContent = `${day}, ${date} ${mon} ${yr}`;
    }
  }

  tick();
  setInterval(tick, 1000);
})();


/* ── 3. Navbar Scroll Behavior ── */
(function initNavbar() {
  const nav = document.getElementById('navbar');
  if (!nav) return;

  function onScroll() {
    nav.classList.toggle('scrolled', window.scrollY > 20);
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();


/* ── 4. Mobile Sidebar ── */
(function initSidebar() {
  const hamburger = document.getElementById('hamburger');
  const sidebar   = document.getElementById('sidebar');
  const overlay   = document.getElementById('sidebar-overlay');
  if (!hamburger || !sidebar) return;

  function open() {
    hamburger.classList.add('open');
    sidebar.classList.add('open');
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function close() {
    hamburger.classList.remove('open');
    sidebar.classList.remove('open');
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  hamburger.addEventListener('click', () => {
    sidebar.classList.contains('open') ? close() : open();
  });

  overlay.addEventListener('click', close);

  // Close on sidebar link click
  sidebar.querySelectorAll('.sidebar-link').forEach(link => {
    link.addEventListener('click', close);
  });
})();


/* ── 5. Dark / Light Mode Toggle ── */
(function initTheme() {
  const toggle = document.getElementById('theme-toggle');
  if (!toggle) return;

  // Load saved preference
  const saved = localStorage.getItem('xienity-theme');
  if (saved === 'light') document.body.classList.add('light-mode');

  toggle.addEventListener('click', () => {
    document.body.classList.toggle('light-mode');
    const isLight = document.body.classList.contains('light-mode');
    localStorage.setItem('xienity-theme', isLight ? 'light' : 'dark');
  });
})();


/* ── 6. Scroll Reveal ── */
(function initReveal() {
  const els = document.querySelectorAll('.reveal');
  if (!els.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // Stagger children slightly
        const delay = (entry.target.dataset.delay || 0);
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, delay);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  els.forEach(el => observer.observe(el));
})();


/* ── 7. Schedule Tabs ── */
(function initSchedule() {
  const tabs = document.querySelectorAll('.tab-btn');
  const panels = document.querySelectorAll('.schedule-panel');
  if (!tabs.length) return;

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.tab;

      tabs.forEach(t => t.classList.remove('active'));
      panels.forEach(p => p.classList.remove('active'));

      tab.classList.add('active');
      const panel = document.getElementById(`tab-${target}`);
      if (panel) panel.classList.add('active');
    });
  });
})();


/* ── 8. Gallery Lightbox ── */
(function initLightbox() {
  const lightbox = document.getElementById('lightbox');
  const lbImg    = document.getElementById('lb-img');
  const lbClose  = document.getElementById('lb-close');
  const lbPrev   = document.getElementById('lb-prev');
  const lbNext   = document.getElementById('lb-next');
  const items    = document.querySelectorAll('.gallery-item');

  if (!lightbox || !items.length) return;

  let current = 0;
  const srcs  = Array.from(items).map(el => el.querySelector('img').src);
  const alts  = Array.from(items).map(el => el.querySelector('img').alt);

  function show(idx) {
    current = (idx + srcs.length) % srcs.length;
    lbImg.src = srcs[current];
    lbImg.alt = alts[current];
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function hide() {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
  }

  items.forEach((item, i) => item.addEventListener('click', () => show(i)));
  lbClose.addEventListener('click', hide);
  lbPrev.addEventListener('click', () => show(current - 1));
  lbNext.addEventListener('click', () => show(current + 1));

  lightbox.addEventListener('click', e => {
    if (e.target === lightbox) hide();
  });

  document.addEventListener('keydown', e => {
    if (!lightbox.classList.contains('open')) return;
    if (e.key === 'Escape') hide();
    if (e.key === 'ArrowLeft')  show(current - 1);
    if (e.key === 'ArrowRight') show(current + 1);
  });
})();


/* ── 9. Progress Bar Animation ── */
(function initProgress() {
  const fill = document.querySelector('.progress-fill');
  if (!fill) return;

  const target = parseInt(fill.dataset.target || '68', 10);

  const obs = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) {
      setTimeout(() => { fill.style.width = target + '%'; }, 300);
      obs.disconnect();
    }
  }, { threshold: 0.5 });

  obs.observe(fill);
})();


/* ── 10. Stagger reveal delays ── */
(function assignDelays() {
  document.querySelectorAll('.info-card, .piket-card, .member-card, .teacher-card').forEach((el, i) => {
    el.dataset.delay = (i % 6) * 70;
    el.classList.add('reveal');
  });
})();
