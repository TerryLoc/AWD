/**
 * All Web Dev — Terry Loughran Portfolio
 * script.js
 * Place at: assets/js/script.js
 *
 * Handles:
 * - Custom cursor
 * - Sticky header on scroll
 * - Mobile menu toggle
 * - Scroll reveal (Intersection Observer)
 * - Return to top button
 * - Contact form via EmailJS
 * - Modal (success / error feedback)
 * - Dynamic copyright year
 */

'use strict';

document.addEventListener('DOMContentLoaded', function () {
  initCursor();
  initHeader();
  initMobileMenu();
  initScrollReveal();
  initReturnToTop();
  initModal();
  initContactForm();
  updateCopyrightYear();
});

/* ── Copyright year ─────────────────────────────────────────── */
function updateCopyrightYear() {
  const el = document.getElementById('copyright-year');
  if (el) el.textContent = new Date().getFullYear();
}

/* ── Custom cursor ───────────────────────────────────────────── */
function initCursor() {
  const dot = document.getElementById('cursorDot');
  const ring = document.getElementById('cursorRing');
  if (!dot || !ring) return;

  let mx = 0,
    my = 0,
    rx = 0,
    ry = 0;

  document.addEventListener('mousemove', function (e) {
    mx = e.clientX;
    my = e.clientY;
    dot.style.left = mx + 'px';
    dot.style.top = my + 'px';
  });

  (function animateRing() {
    rx += (mx - rx) * 0.12;
    ry += (my - ry) * 0.12;
    ring.style.left = rx + 'px';
    ring.style.top = ry + 'px';
    requestAnimationFrame(animateRing);
  })();

  document.querySelectorAll('a, button, .project-item').forEach(function (el) {
    el.addEventListener('mouseenter', function () {
      document.body.classList.add('cursor-hover');
    });
    el.addEventListener('mouseleave', function () {
      document.body.classList.remove('cursor-hover');
    });
  });
}

/* ── Sticky header ───────────────────────────────────────────── */
function initHeader() {
  const header = document.getElementById('site-header');
  const returnTop = document.getElementById('return-top');
  if (!header) return;

  window.addEventListener(
    'scroll',
    function () {
      header.classList.toggle('scrolled', window.scrollY > 50);
      if (returnTop)
        returnTop.classList.toggle('visible', window.scrollY > 400);
    },
    { passive: true },
  );
}

/* ── Return to top ───────────────────────────────────────────── */
function initReturnToTop() {
  const btn = document.getElementById('return-top');
  if (!btn) return;

  btn.addEventListener('click', function (e) {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ── Mobile menu ─────────────────────────────────────────────── */
function initMobileMenu() {
  const toggle = document.getElementById('menuToggle');
  const mobileNav = document.getElementById('mobileNav');
  if (!toggle || !mobileNav) return;

  function closeMenu() {
    mobileNav.classList.remove('open');
    toggle.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
  }

  toggle.addEventListener('click', function () {
    const isOpen = mobileNav.classList.toggle('open');
    toggle.classList.toggle('open', isOpen);
    toggle.setAttribute('aria-expanded', String(isOpen));
  });

  document.querySelectorAll('.mobile-nav-link').forEach(function (link) {
    link.addEventListener('click', closeMenu);
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeMenu();
  });

  document.addEventListener('click', function (e) {
    if (
      mobileNav.classList.contains('open') &&
      !mobileNav.contains(e.target) &&
      !toggle.contains(e.target)
    ) {
      closeMenu();
    }
  });
}

/* ── Scroll reveal ───────────────────────────────────────────── */
function initScrollReveal() {
  if (!('IntersectionObserver' in window)) {
    document.querySelectorAll('.reveal').forEach(function (el) {
      el.classList.add('visible');
    });
    return;
  }

  const observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 },
  );

  document.querySelectorAll('.reveal').forEach(function (el) {
    observer.observe(el);
  });
}

/* ── Modal ───────────────────────────────────────────────────── */
function initModal() {
  const modal = document.getElementById('modal');
  const closeBtn = document.getElementById('modal-close');
  if (!modal) return;

  closeBtn.addEventListener('click', closeModal);

  modal.addEventListener('click', function (e) {
    if (e.target === modal) closeModal();
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && modal.classList.contains('open')) closeModal();
  });
}

function showModal(message, success) {
  const modal = document.getElementById('modal');
  if (!modal) return;

  document.getElementById('modal-icon').textContent = success ? '✓' : '!';
  document.getElementById('modal-title').textContent = success
    ? 'Message Sent'
    : 'Oops';
  document.getElementById('modal-text').textContent = message;

  modal.classList.add('open');
  document.getElementById('modal-close').focus();
}

function closeModal() {
  const modal = document.getElementById('modal');
  if (modal) modal.classList.remove('open');
}

/* ── Contact form ─────────────────────────────────────────────── */
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const data = {
      from_name: document.getElementById('name').value.trim(),
      from_phone: document.getElementById('number').value.trim(),
      from_email: document.getElementById('email').value.trim(),
      message: document.getElementById('message').value.trim(),
    };

    if (!data.from_name || !data.from_email || !data.message) {
      showModal('Please fill in all required fields.', false);
      return;
    }

    emailjs.send('service_5z8tzjm', 'template_6wl8zfk', data).then(
      function () {
        showModal(
          'Thanks, ' + data.from_name + "! I'll be in touch shortly.",
          true,
        );
        form.reset();
      },
      function (err) {
        console.error('EmailJS error:', err);
        showModal('Sorry — something went wrong. Please try again.', false);
      },
    );
  });
}
