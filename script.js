// Wait for the DOM to load before executing any code
document.addEventListener("DOMContentLoaded", function() {
    // Show the disclaimer after 1 second
    setTimeout(function() {
      document.getElementById("disclaimer-popup").classList.add("show"); // Show the popup with fade-in
    }, 1000); // Delay in milliseconds (1000ms = 1 second)
  });
  
  // Function to close the disclaimer with fade-out effect
  function closeDisclaimer() {
    const popup = document.getElementById("disclaimer-popup");
    popup.classList.remove("show"); // Remove the 'show' class to trigger fade-out
    setTimeout(function() {
      popup.style.display = "none"; // Completely hide the popup after fade-out
    }, 500); // Wait for the fade-out transition to complete before hiding (500ms)
  }
  