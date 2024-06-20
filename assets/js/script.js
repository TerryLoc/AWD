// Wait until the DOM is fully loaded before executing the script
document.addEventListener('DOMContentLoaded', function () {
  setupContactForm(); // Set up the contact form submission
  setupModal(); // Set up the modal functionality
  setupMenuToggle(); // Set up the mobile menu toggle
  setupIntersectionObserver(); // Set up the intersection observer for section animations
  setupReturnButton(); // Set up the return-to-top button
});

// Function to set up the contact form submission
function setupContactForm() {
  document
    .getElementById('contact-form')
    .addEventListener('submit', function (event) {
      event.preventDefault(); // Prevent the default form submission behavior

      // Retrieve form values
      const name = document.getElementById('name').value;
      const phone = document.getElementById('number').value;
      const email = document.getElementById('email').value;
      const message = document.getElementById('message').value;

      // Use emailjs to send the form data via email
      emailjs
        .send('service_5z8tzjm', 'template_6wl8zfk', {
          from_name: name,
          from_phone: phone,
          from_email: email,
          message: message,
        })
        .then(
          function (response) {
            // Show a success modal and reset the form
            showModal(`Thank you, ${name}! Your message has been sent.`);
            document.getElementById('contact-form').reset();
          },
          function (error) {
            // Show an alert if the email fails to send
            alert('FAILED...' + error);
          }
        );
    });
}

// Function to set up the modal functionality
function setupModal() {
  const modal = document.getElementById('myModal'); // Get the modal element
  const span = document.getElementsByClassName('close')[0]; // Get the close button

  // Close the modal when the close button is clicked
  span.onclick = function () {
    modal.style.display = 'none';
  };

  // Close the modal when clicking outside of it
  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = 'none';
    }
  };
}

// Function to show the modal with a given message
function showModal(message) {
  document.getElementById('modal-text').innerText = message; // Set the modal message
  document.getElementById('myModal').style.display = 'block'; // Display the modal
}

// Function to set up the mobile menu toggle
function setupMenuToggle() {
  const menuToggle = document.getElementById('mobile-menu'); // Get the mobile menu toggle button
  const navList = document.querySelector('.nav-list'); // Get the navigation list
  const header = document.querySelector('header'); // Get the header element

  // Toggle the menu and adjust the header height when the menu toggle is clicked
  menuToggle.addEventListener('click', function () {
    navList.classList.toggle('active');
    menuToggle.classList.toggle('open');
    header.style.height = 'auto';
  });
}

// Function to set up the intersection observer for section animations
function setupIntersectionObserver() {
  // Check if IntersectionObserver is supported
  if (!('IntersectionObserver' in window)) {
    console.log('IntersectionObserver is not supported in your browser.');
    return;
  }

  const sections = document.querySelectorAll('.section'); // Get all sections to be observed

  // Check if there are sections to observe
  if (!sections.length) {
    console.log('No sections to observe.');
    return;
  }

  const options = { threshold: 0.2 }; // Define the observer options

  // Create a new intersection observer
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible'); // Add the visible class to the intersecting section
        observer.unobserve(entry.target); // Stop observing the section once it is visible
      }
    });
  }, options);

  // Observe each section
  sections.forEach((section) => {
    observer.observe(section);
  });
}

// Function to set up the return-to-top button
function setupReturnButton() {
  const returnButton = document.getElementById('return'); // Get the return button

  // Scroll to the top of the page when the return button is clicked
  returnButton.addEventListener('click', function (event) {
    event.preventDefault(); // Prevent the default anchor behavior
    window.scrollTo({ top: 0, behavior: 'smooth' }); // Smooth scroll to the top
  });
}
