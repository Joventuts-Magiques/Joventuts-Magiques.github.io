/**
 * Navigation Active State
 * Marks the current page's navigation link as active
 */

(function() {
  'use strict';

  function setActiveNavLink() {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.site-nav .nav-link');

    navLinks.forEach(link => {
      const linkPath = new URL(link.href).pathname;

      // Check if current path matches or starts with the link path
      if (currentPath === linkPath ||
          (linkPath !== '/' && currentPath.startsWith(linkPath))) {
        link.classList.add('active');
      } else if (currentPath === '/' && linkPath === '/') {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }

  // Initialize on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setActiveNavLink);
  } else {
    setActiveNavLink();
  }
})();
