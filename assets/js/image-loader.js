/**
 * Image Loader
 * Handles lazy loading and loading states for game images
 */

(function() {
  'use strict';

  // Mark images as loaded when they finish loading
  function handleImageLoad() {
    const images = document.querySelectorAll('.game-image img');

    images.forEach(img => {
      const container = img.closest('.game-image');

      // If image is already complete and loaded
      if (img.complete && img.naturalHeight !== 0) {
        // Add a small delay to ensure the shimmer effect is visible
        setTimeout(() => {
          markAsLoaded(img);
        }, 300);
      } else {
        // Wait for image to load
        img.addEventListener('load', function() {
          // Add a small delay to show the loading animation
          setTimeout(() => {
            markAsLoaded(this);
          }, 300);
        });
      }
    });
  }

  function markAsLoaded(img) {
    img.classList.add('loaded');
    const container = img.closest('.game-image');
    if (container) {
      container.classList.add('loaded');
    }
  }

  // Initialize on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', handleImageLoad);
  } else {
    handleImageLoad();
  }

  // Re-check images when language changes (for dynamic content)
  document.addEventListener('languageChanged', function() {
    // Remove loaded classes first
    const images = document.querySelectorAll('.game-image img');
    images.forEach(img => {
      img.classList.remove('loaded');
      const container = img.closest('.game-image');
      if (container) {
        container.classList.remove('loaded');
      }
    });

    // Then re-apply after a short delay
    setTimeout(handleImageLoad, 100);
  });
})();
