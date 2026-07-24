(function () {
  var root = document.documentElement;
  var toggle = document.getElementById('theme-toggle');

  function isDark() {
    var current = root.getAttribute('data-theme');
    if (current) return current === 'dark';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  }

  function syncLabel() {
    toggle.textContent = isDark() ? 'light' : 'dark';
  }

  var stored = localStorage.getItem('theme');
  if (stored) root.setAttribute('data-theme', stored);
  syncLabel();

  toggle.addEventListener('click', function () {
    var next = isDark() ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
    syncLabel();
  });

  document.getElementById('year').textContent = new Date().getFullYear();

  // Scroll reveal
  var revealEls = document.querySelectorAll('[data-reveal]');
  if ('IntersectionObserver' in window && revealEls.length) {
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    revealEls.forEach(function (el) { revealObserver.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('is-visible'); });
  }

  // Active nav link on scroll
  var navLinks = document.querySelectorAll('[data-nav]');
  var sections = Array.prototype.map.call(navLinks, function (link) {
    return document.querySelector(link.getAttribute('href'));
  }).filter(Boolean);

  if ('IntersectionObserver' in window && sections.length) {
    var navObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        var link = document.querySelector('[data-nav][href="#' + entry.target.id + '"]');
        if (!link) return;
        if (entry.isIntersecting) {
          navLinks.forEach(function (l) { l.classList.remove('active'); });
          link.classList.add('active');
        }
      });
    }, { rootMargin: '-45% 0px -45% 0px' });
    sections.forEach(function (section) { navObserver.observe(section); });
  }
})();
