/* Diken Bros site behaviour: nav toggle, scroll reveals, hero video, contact form. */
(function () {
  document.documentElement.classList.add('js');
  if (/[?&]review=1/.test(location.search)) document.documentElement.classList.add('review');

  var toggle = document.querySelector('.navtoggle');
  var links = document.querySelector('.navlinks');
  if (toggle && links) {
    toggle.addEventListener('click', function () {
      var open = links.getAttribute('data-open') === 'true';
      links.setAttribute('data-open', String(!open));
      toggle.setAttribute('aria-expanded', String(!open));
      toggle.innerHTML = open ? '<i class="ph ph-list" aria-hidden="true"></i>' : '<i class="ph ph-x" aria-hidden="true"></i>';
      document.body.style.overflow = open ? '' : 'hidden';
    });
    links.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        links.setAttribute('data-open', 'false');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.innerHTML = '<i class="ph ph-list" aria-hidden="true"></i>';
        document.body.style.overflow = '';
      });
    });
  }

  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var targets = document.querySelectorAll('.reveal, .numbers');
  if (!reduce && 'IntersectionObserver' in window && targets.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.18, rootMargin: '0px 0px -8% 0px' });
    targets.forEach(function (t) { io.observe(t); });
  } else {
    targets.forEach(function (t) { t.classList.add('in'); });
  }

  var video = document.querySelector('.hero-media video');
  if (video) {
    var saveData = navigator.connection && navigator.connection.saveData;
    var narrow = window.matchMedia('(max-width: 1023px)').matches;
    if (reduce || saveData || narrow) {
      video.remove();
    } else {
      video.addEventListener('canplay', function () { video.classList.add('ready'); }, { once: true });
      video.play().catch(function () { video.remove(); });
    }
  }

  var form = document.querySelector('form.contact');
  if (form) {
    form.addEventListener('submit', function (ev) {
      var ok = true;
      form.querySelectorAll('[required]').forEach(function (f) {
        var bad = !f.value.trim() || (f.type === 'email' && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(f.value));
        f.setAttribute('aria-invalid', bad ? 'true' : 'false');
        if (bad) ok = false;
      });
      if (!ok) { ev.preventDefault(); form.querySelector('[aria-invalid="true"]').focus(); return; }
      if (form.getAttribute('data-mode') === 'demo') {
        ev.preventDefault();
        form.querySelector('.status').classList.add('ok');
        form.querySelector('.status').textContent = 'Thanks. This draft form is not wired to a backend yet, so nothing was sent. Email info@dikenbros.com in the meantime.';
      }
    });
  }
})();
