/**
 * Image Optimizer Script
 * This script automatically optimizes images displayed on the page
 */

document.addEventListener('DOMContentLoaded', function() {
  // Find the profile image
  const profileImage = document.querySelector('.profile-image');
  
  if (profileImage) {
    // Apply optimization through CSS and attributes
    profileImage.style.maxWidth = '100%';
    profileImage.style.height = 'auto';
    profileImage.setAttribute('loading', 'lazy'); // Lazy loading
    
    // Add error handling
    profileImage.onerror = function() {
      console.error('Error loading profile image');
      // Replace with placeholder if image fails to load
      this.src = 'https://via.placeholder.com/300';
    };
    
    // Log success
    profileImage.onload = function() {
      console.log('Profile image loaded successfully');
    };
  }
});