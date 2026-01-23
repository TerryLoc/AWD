/**
 * All Web Dev - Terry Loughran Portfolio
 * Main JavaScript File
 *
 * Handles:
 * - Contact form submission via EmailJS
 * - Modal functionality
 * - Mobile menu toggle
 * - Section animations (Intersection Observer)
 * - Return to top button
 * - Dynamic copyright year
 */

'use strict';

// Wait until the DOM is fully loaded before executing the script
document.addEventListener('DOMContentLoaded', function () {
  initApp();
});

/**
 * Initialize all application features
 */
function initApp() {
  setupContactForm();
  setupModal();
  setupMenuToggle();
  setupIntersectionObserver();
  setupReturnButton();
  updateCopyrightYear();
}

/**
 * Update copyright year dynamically
 */
function updateCopyrightYear() {
  const yearElement = document.getElementById('copyright-year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
}

/**
 * Set up the contact form submission via EmailJS
 */
function setupContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', function (event) {
    event.preventDefault();

    // Get form data
    const formData = {
      from_name: document.getElementById('name').value.trim(),
      from_phone: document.getElementById('number').value.trim(),
      from_email: document.getElementById('email').value.trim(),
      message: document.getElementById('message').value.trim(),
    };

    // Validate form data
    if (!formData.from_name || !formData.from_email || !formData.message) {
      showModal('Please fill in all required fields.', false);
      return;
    }

    // Send via EmailJS
    emailjs.send('service_5z8tzjm', 'template_6wl8zfk', formData).then(
      function () {
        showModal(
          `Thank you, ${formData.from_name}! Your message has been sent successfully.`,
          true,
        );
        form.reset();
      },
      function (error) {
        console.error('EmailJS Error:', error);
        showModal(
          'Sorry, there was an error sending your message. Please try again.',
          false,
        );
      },
    );
  });
}

/**
 * Set up the modal functionality
 */
function setupModal() {
  const modal = document.getElementById('myModal');
  if (!modal) return;

  const closeBtn = modal.querySelector('.close');

  // Close modal on close button click
  if (closeBtn) {
    closeBtn.addEventListener('click', closeModal);
  }

  // Close modal when clicking outside
  modal.addEventListener('click', function (event) {
    if (event.target === modal) {
      closeModal();
    }
  });

  // Close modal on Escape key
  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' && modal.style.display === 'flex') {
      closeModal();
    }
  });
}

/**
 * Show modal with a message
 * @param {string} message - The message to display
 * @param {boolean} isSuccess - Whether this is a success message
 */
function showModal(message, isSuccess = true) {
  const modal = document.getElementById('myModal');
  const modalText = document.getElementById('modal-text');
  const modalIcon = modal?.querySelector('.modal-icon');
  const modalTitle = modal?.querySelector('h3');

  if (!modal || !modalText) return;

  modalText.textContent = message;

  if (modalIcon) {
    modalIcon.textContent = isSuccess ? '✓' : '!';
    modalIcon.style.background = isSuccess
      ? 'linear-gradient(135deg, #0077b6 0%, #00b4f8 50%, #49576c 100%)'
      : 'linear-gradient(135deg, #dc3545 0%, #ff6b6b 100%)';
  }

  if (modalTitle) {
    modalTitle.textContent = isSuccess ? 'Message Sent!' : 'Oops!';
  }

  modal.style.display = 'flex';

  // Focus trap for accessibility
  const closeBtn = modal.querySelector('.close');
  if (closeBtn) closeBtn.focus();
}

/**
 * Close the modal
 */
function closeModal() {
  const modal = document.getElementById('myModal');
  if (modal) {
    modal.style.display = 'none';
  }
}

/**
 * Set up the mobile menu toggle
 */
function setupMenuToggle() {
  const menuToggle = document.getElementById('mobile-menu');
  const navList = document.querySelector('.nav-list');

  if (!menuToggle || !navList) return;

  // Toggle menu on button click
  menuToggle.addEventListener('click', function () {
    const isOpen = navList.classList.toggle('active');
    menuToggle.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', isOpen);
  });

  // Close menu when clicking a nav link
  const navLinks = navList.querySelectorAll('a');
  navLinks.forEach((link) => {
    link.addEventListener('click', function () {
      if (window.innerWidth <= 768) {
        closeMenu();
      }
    });
  });

  // Close menu on Escape key
  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' && navList.classList.contains('active')) {
      closeMenu();
      menuToggle.focus();
    }
  });

  // Close menu when clicking outside
  document.addEventListener('click', function (event) {
    if (
      !navList.contains(event.target) &&
      !menuToggle.contains(event.target) &&
      navList.classList.contains('active')
    ) {
      closeMenu();
    }
  });

  function closeMenu() {
    navList.classList.remove('active');
    menuToggle.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
  }
}

/**
 * Set up Intersection Observer for section animations
 */
function setupIntersectionObserver() {
  if (!('IntersectionObserver' in window)) {
    // Fallback: show all sections immediately
    document.querySelectorAll('.section').forEach((section) => {
      section.classList.add('visible');
    });
    return;
  }

  const sections = document.querySelectorAll('.section');
  if (!sections.length) return;

  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15,
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  sections.forEach((section) => observer.observe(section));
}

/**
 * Set up the return-to-top button
 */
function setupReturnButton() {
  const returnButton = document.getElementById('return');
  if (!returnButton) return;

  returnButton.addEventListener('click', function (event) {
    event.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  });
}
