/**
 * Scroll Behavior Manager
 * Handles scroll-to-top button, smooth scroll with offset, and scroll progress indicator
 */
class ScrollBehavior {
  constructor() {
    this.scrollToTopBtn = document.getElementById('scroll-to-top');
    this.scrollProgress = document.getElementById('scroll-progress');
    this.scrollThreshold = 300; // Show button after scrolling 300px
    this.headerOffset = 80; // Offset for sticky header

    this.init();
  }

  /**
   * Initialize scroll behavior
   */
  init() {
    if (!this.scrollToTopBtn) {
      console.warn('Scroll-to-top button not found');
    }

    if (!this.scrollProgress) {
      console.warn('Scroll progress indicator not found');
    }

    this.attachEventListeners();
    this.handleScroll(); // Check initial scroll position
  }

  /**
   * Handle scroll event to show/hide button and update progress
   */
  handleScroll() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    // Show/hide scroll-to-top button
    if (this.scrollToTopBtn) {
      if (scrollTop > this.scrollThreshold) {
        this.scrollToTopBtn.classList.add('visible');
      } else {
        this.scrollToTopBtn.classList.remove('visible');
      }
    }

    // Update scroll progress indicator
    if (this.scrollProgress) {
      this.updateScrollProgress();
    }
  }

  /**
   * Update scroll progress indicator
   */
  updateScrollProgress() {
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    // Calculate scroll percentage
    const scrollableHeight = documentHeight - windowHeight;
    const scrollPercentage = scrollableHeight > 0 ? (scrollTop / scrollableHeight) * 100 : 0;

    // Update progress bar width
    this.scrollProgress.style.width = `${scrollPercentage}%`;

    // Update ARIA attribute for accessibility
    this.scrollProgress.setAttribute('aria-valuenow', Math.round(scrollPercentage));
  }

  /**
   * Scroll to top smoothly
   */
  scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  /**
   * Smooth scroll to element with offset
   * @param {string} targetId - ID of target element
   */
  scrollToElement(targetId) {
    const target = document.getElementById(targetId);

    if (!target) {
      return;
    }

    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
    const offsetPosition = targetPosition - this.headerOffset;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  }

  /**
   * Attach event listeners
   */
  attachEventListeners() {
    // Scroll-to-top button click
    if (this.scrollToTopBtn) {
      this.scrollToTopBtn.addEventListener('click', () => {
        this.scrollToTop();
      });
    }

    // Show/hide button and update progress on scroll
    let scrollTimeout;
    window.addEventListener('scroll', () => {
      // Debounce scroll event for performance
      if (scrollTimeout) {
        window.cancelAnimationFrame(scrollTimeout);
      }

      scrollTimeout = window.requestAnimationFrame(() => {
        this.handleScroll();
      });
    }, { passive: true });

    // Handle anchor links with smooth scroll and offset
    document.addEventListener('click', (e) => {
      const anchor = e.target.closest('a[href^="#"]');

      if (!anchor) {
        return;
      }

      const href = anchor.getAttribute('href');

      // Skip if it's just "#" or empty
      if (!href || href === '#') {
        return;
      }

      const targetId = href.substring(1);
      const target = document.getElementById(targetId);

      if (target) {
        e.preventDefault();
        this.scrollToElement(targetId);

        // Update URL without jumping
        if (history.pushState) {
          history.pushState(null, null, href);
        }

        // Set focus to target for accessibility
        target.setAttribute('tabindex', '-1');
        target.focus();
      }
    });
  }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    new ScrollBehavior();
  });
} else {
  new ScrollBehavior();
}
