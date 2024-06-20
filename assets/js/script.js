// Wait until the DOM is fully loaded
document.addEventListener("DOMContentLoaded", function() {
  
  // Add an event listener for form submission
  document.getElementById("contact-form").addEventListener("submit", function(event) {
    // Prevent the form from submitting normally
    event.preventDefault();
    
    // Get the values from the form fields
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;
    
    // Show an alert message to the user
    alert(`Thank you, ${name}! Your message has been sent.`);
    
    // Reset the form fields
    document.getElementById("contact-form").reset();
  });

  // Get the elements for the burger menu
  const menuToggle = document.getElementById("mobile-menu");
  const navList = document.querySelector(".nav-list");
  const header = document.querySelector("header");

  // Add an event listener for the burger menu click
  menuToggle.addEventListener("click", function() {
    // Toggle the active class for the navigation list
    navList.classList.toggle("active");
    // Toggle the open class for the menu toggle
    menuToggle.classList.toggle("open");
    // Set the header height to auto
    header.style.height = "auto";
  });

  // Get all the sections
  const sections = document.querySelectorAll(".section");
  // Define the options for the Intersection Observer
  const options = { threshold: 0.5 };

  // Create a new Intersection Observer
  const observer = new IntersectionObserver((entries, observer) => {
    // Loop through all the entries
    entries.forEach(entry => {
      // If the entry is intersecting the viewport
      if (entry.isIntersecting) {
        // Add the visible class to the entry target
        entry.target.classList.add("visible");
        // Stop observing the entry target
        observer.unobserve(entry.target);
      }
    });
  }, options);

  // Observe each section
  sections.forEach(section => {
    observer.observe(section);
  });
});

// Wait until the DOM is fully loaded
document.addEventListener("DOMContentLoaded", function() {
  // Get the button element
  const returnButton = document.getElementById("return");

  // Add an event listener for the click event
  returnButton.addEventListener("click", function(event) {
    // Prevent the default action
    event.preventDefault();
    // Scroll to the top of the page
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
});