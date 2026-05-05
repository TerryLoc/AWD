// ── Theme Toggle ────────────────────────────────────────────
const themeToggle = document.getElementById('themeToggle');
const currentTheme = localStorage.getItem('theme') || 'dark';

if (currentTheme === 'light') {
  document.documentElement.setAttribute('data-theme', 'light');
}

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    let theme = document.documentElement.getAttribute('data-theme');
    if (theme === 'light') {
      document.documentElement.removeAttribute('data-theme');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
      localStorage.setItem('theme', 'light');
    }
  });
}

// ── Cursor ──────────────────────────────────────────────────
const dot = document.getElementById('cursorDot');
const ring = document.getElementById('cursorRing');
let mx = 0,
  my = 0,
  rx = 0,
  ry = 0;

document.addEventListener('mousemove', (e) => {
  mx = e.clientX;
  my = e.clientY;
});

(function animCursor() {
  rx += (mx - rx) * 0.12;
  ry += (my - ry) * 0.12;
  dot.style.left = mx + 'px';
  dot.style.top = my + 'px';
  ring.style.left = rx + 'px';
  ring.style.top = ry + 'px';
  requestAnimationFrame(animCursor);
})();

document.querySelectorAll('a, button').forEach((el) => {
  el.addEventListener(
    'mouseenter',
    () => (ring.style.transform = 'translate(-50%,-50%) scale(1.5)'),
  );
  el.addEventListener(
    'mouseleave',
    () => (ring.style.transform = 'translate(-50%,-50%) scale(1)'),
  );
});

// ── Header scroll ────────────────────────────────────────────
const header = document.getElementById('site-header');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 60);
  document
    .getElementById('return-top')
    .classList.toggle('visible', window.scrollY > 400);
});

// ── Mobile nav ───────────────────────────────────────────────
const toggle = document.getElementById('menuToggle');
const mobileNav = document.getElementById('mobileNav');
toggle.addEventListener('click', () => {
  const open = toggle.classList.toggle('open');
  mobileNav.classList.toggle('open', open);
  toggle.setAttribute('aria-expanded', open);
  document.body.style.overflow = open ? 'hidden' : '';
});
document.querySelectorAll('.mobile-nav-link').forEach((l) => {
  l.addEventListener('click', () => {
    toggle.classList.remove('open');
    mobileNav.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  });
});

// ── Reveal on scroll ─────────────────────────────────────────
const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        observer.unobserve(e.target);
      }
    });
  },
  { threshold: 0.12 },
);
reveals.forEach((el) => observer.observe(el));

// ── Copyright year ────────────────────────────────────────────
document.getElementById('copyright-year').textContent =
  new Date().getFullYear();

// ── Contact form ─────────────────────────────────────────────
const form = document.getElementById('contact-form');
const modal = document.getElementById('modal');
const mIcon = document.getElementById('modal-icon');
const mTitle = document.getElementById('modal-title');
const mText = document.getElementById('modal-text');
const mClose = document.getElementById('modal-close');

form.addEventListener('submit', function (e) {
  e.preventDefault();
  const params = {
    name: form.name.value,
    email: form.email.value,
    number: form.number.value,
    service: form.service.value,
    message: form.message.value,
  };

  // Send BOTH the auto-reply to the client and the notification to Terry
  Promise.all([
    emailjs.send('service_rqxlod4', 'template_hdwppmj', params), // Client auto-reply
    emailjs.send('service_rqxlod4', 'template_kahq808', params), // Enquiry notification to Terry
  ])
    .then(() => {
      mIcon.textContent = '✓';
      mTitle.textContent = 'Message Sent';
      mText.textContent = "Thanks — I'll be in touch soon.";
      modal.classList.add('open');
      form.reset();
    })
    .catch(() => {
      mIcon.textContent = '✕';
      mTitle.textContent = 'Something went wrong';
      mText.textContent = 'Please try emailing me directly.';
      modal.classList.add('open');
    });
});

mClose.addEventListener('click', () => modal.classList.remove('open'));
modal.addEventListener('click', (e) => {
  if (e.target === modal) modal.classList.remove('open');
});
