// ============================================
// Table of Contents Component
// ============================================

class TableOfContents {
  constructor() {
    this.toc = document.getElementById('toc');
    this.tocNav = document.getElementById('toc-nav');
    this.tocToggle = document.getElementById('toc-toggle');
    this.mobileTrigger = document.getElementById('toc-mobile-trigger');
    // Try multiple selectors for main content
    this.mainContent = document.querySelector('.game-content') ||
                       document.querySelector('article.game-page') ||
                       document.querySelector('main');
    this.sections = [];
    this.activeSection = null;
    this.isScrolling = false; // Flag to prevent scroll spy interference

    if (!this.toc || !this.tocNav || !this.mainContent) {
      console.warn('TOC: Required elements not found');
      return;
    }

    this.init();
  }

  init() {
    this.generateTOC();
    this.attachEventListeners();
    this.setupScrollSpy();
    this.createOverlay();
  }

  generateTOC() {
    // Create navigation list
    const ul = document.createElement('ul');
    let sectionIndex = 0;

    // Check if there's a video and add it first
    const videoContainer = document.querySelector('.video-container');
    if (videoContainer) {
      // Add ID to video container if it doesn't have one
      if (!videoContainer.id) {
        videoContainer.id = 'video-section';
      }

      // Store video section reference
      this.sections.push({
        id: videoContainer.id,
        element: videoContainer,
        link: null
      });

      // Create list item for video
      const li = document.createElement('li');
      const a = document.createElement('a');
      a.href = `#${videoContainer.id}`;

      // Set video text based on page language
      const pageLang = document.documentElement.lang || 'ca';
      let videoText = 'Vídeo'; // Default Catalan
      if (pageLang === 'es') {
        videoText = 'Video';
      } else if (pageLang === 'en') {
        videoText = 'Video';
      }
      a.textContent = videoText;
      a.dataset.sectionId = videoContainer.id;

      // Store link reference
      this.sections[sectionIndex].link = a;
      sectionIndex++;

      li.appendChild(a);
      ul.appendChild(li);
    }

    // Find all H2 headings in main content
    const headings = this.mainContent.querySelectorAll('h2');

    if (headings.length === 0 && !videoContainer) {
      console.warn('TOC: No H2 headings or video found');
      this.toc.style.display = 'none';
      if (this.mobileTrigger) this.mobileTrigger.style.display = 'none';
      return;
    }

    headings.forEach((heading, index) => {
      // Add ID to heading if it doesn't have one
      if (!heading.id) {
        heading.id = `section-${index + 1}`;
      }

      // Store section reference
      this.sections.push({
        id: heading.id,
        element: heading,
        link: null
      });

      // Create list item
      const li = document.createElement('li');
      const a = document.createElement('a');
      a.href = `#${heading.id}`;
      a.textContent = heading.textContent;
      a.dataset.sectionId = heading.id;

      // Store link reference
      this.sections[sectionIndex].link = a;
      sectionIndex++;

      li.appendChild(a);
      ul.appendChild(li);
    });

    // Clear and populate nav
    this.tocNav.innerHTML = '';
    this.tocNav.appendChild(ul);
  }

  attachEventListeners() {
    // Toggle button (collapse/expand on desktop, close on mobile)
    if (this.tocToggle) {
      this.tocToggle.addEventListener('click', () => {
        // On mobile, close the overlay
        if (window.innerWidth <= 768) {
          this.closeMobile();
        } else {
          // On desktop, collapse/expand
          this.tocNav.classList.toggle('collapsed');
          const icon = this.tocToggle.querySelector('.toc-toggle-icon');
          if (icon) {
            icon.textContent = this.tocNav.classList.contains('collapsed') ? '☰' : '×';
          }
        }
      });
    }

    // Mobile trigger button
    if (this.mobileTrigger) {
      this.mobileTrigger.addEventListener('click', () => {
        this.openMobile();
      });
    }

    // Smooth scroll on link click
    this.tocNav.addEventListener('click', (e) => {
      if (e.target.tagName === 'A') {
        e.preventDefault();
        const targetId = e.target.dataset.sectionId;
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
          // Set scrolling flag
          this.isScrolling = true;

          // Immediately set the clicked section as active
          this.setActiveSection(targetId);

          // Close mobile TOC if open
          if (window.innerWidth <= 768) {
            this.closeMobile();
          }

          // Smooth scroll to section
          // Get actual header height dynamically
          const header = document.querySelector('.site-header');
          const headerHeight = header ? header.offsetHeight : 80;
          const extraPadding = 20; // Extra breathing room
          const offset = headerHeight + extraPadding;

          const elementPosition = targetElement.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - offset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });

          // Reset scrolling flag after animation completes
          setTimeout(() => {
            this.isScrolling = false;
          }, 1000);
        }
      }
    });
  }

  setupScrollSpy() {
    // Use IntersectionObserver for active section highlighting
    const observerOptions = {
      root: null,
      rootMargin: '-100px 0px -66%',
      threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
      // Don't update active section during programmatic scrolling
      if (this.isScrolling) return;

      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.setActiveSection(entry.target.id);
        }
      });
    }, observerOptions);

    // Observe all sections
    this.sections.forEach(section => {
      observer.observe(section.element);
    });
  }

  setActiveSection(sectionId) {
    if (this.activeSection === sectionId) return;

    // Remove active class from all links
    this.sections.forEach(section => {
      if (section.link) {
        section.link.classList.remove('active');
      }
    });

    // Add active class to current section link
    const activeSection = this.sections.find(s => s.id === sectionId);
    if (activeSection && activeSection.link) {
      activeSection.link.classList.add('active');
      this.activeSection = sectionId;
    }
  }

  createOverlay() {
    // Create overlay for mobile
    if (window.innerWidth <= 768) {
      let overlay = document.querySelector('.toc-overlay');
      if (!overlay) {
        overlay = document.createElement('div');
        overlay.className = 'toc-overlay';
        document.body.appendChild(overlay);

        overlay.addEventListener('click', () => {
          this.closeMobile();
        });
      }
    }
  }

  openMobile() {
    this.toc.classList.add('mobile-open');
    const overlay = document.querySelector('.toc-overlay');
    if (overlay) {
      overlay.classList.add('active');
    }
    document.body.style.overflow = 'hidden';
  }

  closeMobile() {
    this.toc.classList.remove('mobile-open');
    const overlay = document.querySelector('.toc-overlay');
    if (overlay) {
      overlay.classList.remove('active');
    }
    document.body.style.overflow = '';
  }
}

// Initialize TOC when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    new TableOfContents();
  });
} else {
  new TableOfContents();
}
