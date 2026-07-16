document.addEventListener('DOMContentLoaded', function () {

  // ===== AOS =====
  if (typeof AOS !== 'undefined') {
    AOS.init({ duration: 800, once: true, offset: 60 });
  }

  // ===== SMOOTH SCROLL — navbar links =====
  document.querySelectorAll('a[href^="#"]').forEach(function(link) {
    link.addEventListener('click', function(e) {
      var href = this.getAttribute('href');
      if (!href || href === '#') return;
      var target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        var navH = document.getElementById('navbar').offsetHeight;
        var top  = target.getBoundingClientRect().top + window.pageYOffset - navH - 10;
        window.scrollTo({ top: top, behavior: 'smooth' });
        // close mobile menu
        document.querySelector('.nav-links').classList.remove('open');
      }
    });
  });

  // ===== ACTIVE NAV LINK on scroll =====
  var navbar   = document.getElementById('navbar');
  var backToTop = document.getElementById('backToTop');
  var sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', function () {
    // scrolled shadow
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
      if (backToTop) backToTop.classList.add('visible');
    } else {
      navbar.classList.remove('scrolled');
      if (backToTop) backToTop.classList.remove('visible');
    }
    // highlight active nav link
    var current = '';
    sections.forEach(function(sec) {
      if (window.scrollY >= sec.offsetTop - navbar.offsetHeight - 20) {
        current = sec.id;
      }
    });
    document.querySelectorAll('.nav-links a').forEach(function(a) {
      a.classList.toggle('active', a.getAttribute('href') === '#' + current);
    });
  });

  // ===== HAMBURGER =====
  document.getElementById('hamburger').addEventListener('click', function () {
    document.querySelector('.nav-links').classList.toggle('open');
  });

  // ===== DARK MODE =====
  var toggle = document.getElementById('darkModeToggle');
  var html   = document.documentElement;
  var saved  = localStorage.getItem('theme') || 'light';
  html.setAttribute('data-theme', saved);
  toggle.innerHTML = saved === 'dark' ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
  toggle.addEventListener('click', function () {
    var next = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
    toggle.innerHTML = next === 'dark' ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
  });

  // ===== TYPING EFFECT =====
  var roles = ['Aspiring Web Developer', 'Software Developer', 'Java & DSA Enthusiast', 'Problem Solver'];
  var ri = 0, ci = 0, deleting = false;
  var typedEl = document.getElementById('typed-text');
  function type() {
    if (!typedEl) return;
    var word = roles[ri];
    if (!deleting) {
      typedEl.textContent = word.slice(0, ci + 1);
      ci++;
      if (ci === word.length) { deleting = true; setTimeout(type, 1800); return; }
    } else {
      typedEl.textContent = word.slice(0, ci - 1);
      ci--;
      if (ci === 0) { deleting = false; ri = (ri + 1) % roles.length; }
    }
    setTimeout(type, deleting ? 60 : 100);
  }
  type();

  // ===== SKILL BARS — animate when visible =====
  var skillsSection = document.getElementById('skills');
  if (skillsSection) {
    var triggered = false;
    window.addEventListener('scroll', function () {
      if (triggered) return;
      var rect = skillsSection.getBoundingClientRect();
      if (rect.top < window.innerHeight - 100) {
        triggered = true;
        document.querySelectorAll('.skill-fill').forEach(function(bar) {
          bar.style.width = bar.dataset.width + '%';
        });
      }
    });
  }

  // ===== BACK TO TOP =====
  if (backToTop) {
    backToTop.addEventListener('click', function() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ===== CONTACT FORM =====
  var form   = document.getElementById('contactForm');
  var status = document.getElementById('form-status');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      status.textContent = 'Sending...';
      status.className = 'form-status';
      setTimeout(function() {
        status.textContent = 'Message sent! I will get back to you soon.';
        status.className = 'form-status success';
        form.reset();
      }, 1200);
    });
  }
});

// ===== ADD CERTIFICATE =====
function addCertificate() {
  var name  = document.getElementById('cert-name').value.trim();
  var desc  = document.getElementById('cert-desc').value.trim();
  var badge = document.getElementById('cert-badge-input').value.trim();
  var icon  = document.getElementById('cert-icon-select').value;

  if (!name || !desc || !badge) {
    alert('Please fill in all fields before adding a certificate.');
    return;
  }

  var grid         = document.getElementById('cert-grid');
  var countEl      = document.getElementById('cert-count');
  var aboutCountEl = document.getElementById('about-cert-count');

  var card = document.createElement('div');
  card.className = 'cert-pro-card';
  card.innerHTML =
    '<div class="cert-pro-left">' +
      '<div class="cert-pro-icon"><i class="' + icon + '"></i></div>' +
      '<div class="cert-pro-line"></div>' +
    '</div>' +
    '<div class="cert-pro-body">' +
      '<div class="cert-pro-header">' +
        '<div>' +
          '<span class="cert-pro-tag">✅ Completed</span>' +
          '<h3>' + name + '</h3>' +
        '</div>' +
        '<span class="cert-pro-badge">' + badge + '</span>' +
      '</div>' +
      '<p class="cert-pro-desc">' + desc + '</p>' +
      '<div class="cert-pro-meta">' +
        '<span><i class="fas fa-calendar-check"></i> 2025</span>' +
        '<span><i class="fas fa-award"></i> Certified</span>' +
      '</div>' +
    '</div>';
  grid.appendChild(card);

  var newCount = parseInt(countEl.textContent) + 1;
  countEl.textContent = newCount;
  if (aboutCountEl) aboutCountEl.textContent = newCount + '+';

  document.getElementById('cert-name').value = '';
  document.getElementById('cert-desc').value = '';
  document.getElementById('cert-badge-input').value = '';
  document.getElementById('cert-icon-select').selectedIndex = 0;
}
