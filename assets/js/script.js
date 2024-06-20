document.addEventListener('DOMContentLoaded', function () {
  setupContactForm();
  setupModal();
  setupMenuToggle();
  setupIntersectionObserver();
  setupReturnButton();
});

function setupContactForm() {
  document
    .getElementById('contact-form')
    .addEventListener('submit', function (event) {
      event.preventDefault();

      const name = document.getElementById('name').value;
      const phone = document.getElementById('number').value;
      const email = document.getElementById('email').value;
      const message = document.getElementById('message').value;

      emailjs
        .send('service_5z8tzjm', 'template_6wl8zfk', {
          from_name: name,
          from_phone: phone,
          from_email: email,
          message: message,
        })
        .then(
          function (response) {
            showModal(`Thank you, ${name}! Your message has been sent.`);
            document.getElementById('contact-form').reset();
          },
          function (error) {
            alert('FAILED...' + error);
          }
        );
    });
}

function setupModal() {
  const modal = document.getElementById('myModal');
  const span = document.getElementsByClassName('close')[0];

  span.onclick = function () {
    modal.style.display = 'none';
  };

  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = 'none';
    }
  };
}

function showModal(message) {
  document.getElementById('modal-text').innerText = message;
  document.getElementById('myModal').style.display = 'block';
}

function setupMenuToggle() {
  const menuToggle = document.getElementById('mobile-menu');
  const navList = document.querySelector('.nav-list');
  const header = document.querySelector('header');

  menuToggle.addEventListener('click', function () {
    navList.classList.toggle('active');
    menuToggle.classList.toggle('open');
    header.style.height = 'auto';
  });
}

function setupIntersectionObserver() {
  const sections = document.querySelectorAll('.section');
  const options = { threshold: 0.5 };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, options);

  sections.forEach((section) => {
    observer.observe(section);
  });
}

function setupReturnButton() {
  const returnButton = document.getElementById('return');

  returnButton.addEventListener('click', function (event) {
    event.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}
