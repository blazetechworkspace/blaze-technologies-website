/* ═══════════════════════════════════════════════
   BLAZE TECHNOLOGIES INC — script.js
   Navbar scroll · Scroll reveal · Counters · Contact form
   ═══════════════════════════════════════════════ */

$(function () {

  /* ── Navbar: solid on scroll ── */
  var $nav = $('#mainNav');
  function onScroll() {
    if ($(window).scrollTop() > 30) { $nav.addClass('scrolled'); }
    else { $nav.removeClass('scrolled'); }
  }
  $(window).on('scroll', onScroll);
  onScroll();

  /* ── Close mobile menu after clicking a link ── */
  $('.navbar-nav .nav-link, .navbar-nav .btn').on('click', function () {
    var menu = document.getElementById('navMenu');
    if (menu && menu.classList.contains('show')) {
      bootstrap.Collapse.getOrCreateInstance(menu).hide();
    }
  });

  /* ── Scroll reveal ── */
  var revealObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('[data-reveal]').forEach(function (el) {
    // Stagger siblings within the same row/grid for a crisper cascade
    var siblings = el.parentElement
      ? Array.prototype.filter.call(el.parentElement.children, function (c) { return c.hasAttribute('data-reveal'); })
      : [el];
    var idx = siblings.indexOf(el);
    if (siblings.length > 1 && idx > 0) {
      el.style.setProperty('--reveal-delay', (Math.min(idx, 5) * 0.09) + 's');
    }
    revealObserver.observe(el);
  });

  /* ── Animated counters ── */
  function animateCounter(el) {
    var end = parseInt(el.getAttribute('data-count'), 10);
    var suffix = el.getAttribute('data-suffix') || '';
    var duration = 1600;
    var start = performance.now();
    function tick(now) {
      var p = Math.min((now - start) / duration, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(end * eased) + suffix;
      if (p < 1) { requestAnimationFrame(tick); }
    }
    requestAnimationFrame(tick);
  }
  var counterObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });
  document.querySelectorAll('[data-count]').forEach(function (el) {
    counterObserver.observe(el);
  });

  /* ── Active nav link highlight ── */
  var sections = $('section[id], header[id]');
  $(window).on('scroll', function () {
    var pos = $(window).scrollTop() + 120;
    sections.each(function () {
      var top = $(this).offset().top;
      if (pos >= top && pos < top + $(this).outerHeight()) {
        var id = $(this).attr('id');
        $('.nav-link').removeClass('active');
        $('.nav-link[href="#' + id + '"]').addClass('active');
      }
    });
  });

  /* ── Contact form ── */
  $('#contactForm').on('submit', function (e) {
    e.preventDefault();
    var form = this;
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    // TODO: connect to your backend / email service here.
    // Example: $.post('https://formspree.io/f/YOUR_ID', $(form).serialize());
    $(form).find('.row').addClass('d-none');
    $('#formSuccess').removeClass('d-none');
  });

});
