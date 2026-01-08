/**
 * Language Manager
 * Handles language switching and preference storage across the site
 */
class LanguageManager {
  constructor() {
    this.supportedLangs = ['ca', 'es', 'en'];
    this.defaultLang = 'ca';
    this.storageKey = 'preferredLanguage';
    this.currentLang = this.determineLanguage();
    this.translations = window.siteTranslations || {};
  }

  /**
   * Determine the current language based on URL params and localStorage
   * @returns {string} Current language code
   */
  determineLanguage() {
    const urlParams = new URLSearchParams(window.location.search);
    const urlLang = urlParams.get('lang');
    const savedLang = this.loadPreference();

    // Priority: URL parameter > Saved preference > Default
    if (urlLang && this.supportedLangs.includes(urlLang)) {
      this.savePreference(urlLang);
      return urlLang;
    }

    if (savedLang && this.supportedLangs.includes(savedLang)) {
      return savedLang;
    }

    return this.defaultLang;
  }

  /**
   * Load language preference from localStorage with error handling
   * @returns {string|null} Saved language code or null
   */
  loadPreference() {
    try {
      return localStorage.getItem(this.storageKey);
    } catch (e) {
      console.warn('Failed to load language preference from localStorage:', e);
      return null;
    }
  }

  /**
   * Save language preference to localStorage with error handling
   * @param {string} lang Language code
   */
  savePreference(lang) {
    if (this.supportedLangs.includes(lang)) {
      try {
        localStorage.setItem(this.storageKey, lang);
        this.currentLang = lang;
      } catch (e) {
        console.warn('Failed to save language preference to localStorage:', e);
        // Fallback: just update current lang without persistence
        this.currentLang = lang;
      }
    }
  }

  /**
   * Update the language selector visual state
   */
  updateSelectorState() {
    const langLinks = document.querySelectorAll('.lang-link[data-lang]');

    langLinks.forEach(link => {
      const linkLang = link.getAttribute('data-lang');
      const isActive = linkLang === this.currentLang;

      link.classList.toggle('active', isActive);

      if (isActive) {
        link.setAttribute('aria-current', 'page');
      } else {
        link.removeAttribute('aria-current');
      }
    });
  }

  /**
   * Update homepage content with translations
   * @param {boolean} animate Whether to animate the transition
   */
  updateHomeContent(animate = false) {
    if (!this.translations[this.currentLang]) {
      console.warn(`No translations found for language: ${this.currentLang}`);
      return;
    }

    const t = this.translations[this.currentLang];

    // Update main text content
    const contentMap = {
      'hero-title': t.welcome,
      'hero-description': t.description,
      'games-title': t.all_games,
      'home-button-text': t.home
    };

    if (animate) {
      // Add fade transition to content
      const homeContent = document.querySelector('.home-content');
      if (homeContent) {
        homeContent.classList.add('content-transition', 'hidden');

        // Small delay to ensure transition is visible
        setTimeout(() => {
          Object.entries(contentMap).forEach(([id, text]) => {
            const element = document.getElementById(id);
            if (element && text) {
              element.textContent = text;
            }
          });

          // Update language-specific game content
          this.updateGameCards(animate);

          // Fade content back in
          homeContent.classList.remove('hidden');
          homeContent.classList.add('visible');
        }, 150);
      } else {
        // Fallback if home-content element doesn't exist
        Object.entries(contentMap).forEach(([id, text]) => {
          const element = document.getElementById(id);
          if (element && text) {
            element.textContent = text;
          }
        });

        this.updateGameCards(animate);
      }
    } else {
      // No animation on initial load
      Object.entries(contentMap).forEach(([id, text]) => {
        const element = document.getElementById(id);
        if (element && text) {
          element.textContent = text;
        }
      });

      this.updateGameCards(animate);
    }
  }

  /**
   * Update game cards to show content in current language
   * @param {boolean} animate Whether to animate the transition
   */
  updateGameCards(animate = false) {
    // Cache all language-specific elements
    const elementsCache = {
      ca: document.querySelectorAll('.lang-ca'),
      es: document.querySelectorAll('.lang-es'),
      en: document.querySelectorAll('.lang-en')
    };

    if (animate) {
      // Add fade transition to game cards
      const gameCards = document.querySelectorAll('.game-card');
      gameCards.forEach(card => {
        card.classList.add('content-transition', 'hidden');
      });

      // Small delay for transition
      setTimeout(() => {
        // Update visibility for all languages at once
        this.supportedLangs.forEach(lang => {
          const isActive = lang === this.currentLang;
          const display = isActive ? '' : 'none';

          elementsCache[lang].forEach(el => {
            el.style.display = display;
          });
        });

        // Update language indicators
        const indicators = document.querySelectorAll('.lang-indicator[data-lang]');
        indicators.forEach(indicator => {
          const indicatorLang = indicator.getAttribute('data-lang');
          indicator.classList.toggle('current', indicatorLang === this.currentLang);
        });

        // Fade cards back in
        gameCards.forEach(card => {
          card.classList.remove('hidden');
          card.classList.add('visible');
        });
      }, 150);
    } else {
      // No animation on initial load
      this.supportedLangs.forEach(lang => {
        const isActive = lang === this.currentLang;
        const display = isActive ? '' : 'none';

        elementsCache[lang].forEach(el => {
          el.style.display = display;
        });
      });

      // Update language indicators
      const indicators = document.querySelectorAll('.lang-indicator[data-lang]');
      indicators.forEach(indicator => {
        const indicatorLang = indicator.getAttribute('data-lang');
        indicator.classList.toggle('current', indicatorLang === this.currentLang);
      });
    }
  }

  /**
   * Clean URL parameters after processing
   */
  cleanUrl() {
    const urlParams = new URLSearchParams(window.location.search);

    if (urlParams.has('lang')) {
      const url = new URL(window.location);
      url.searchParams.delete('lang');
      window.history.replaceState({}, '', url.pathname);
    }
  }

  /**
   * Attach event listeners
   */
  attachEventListeners() {
    // Save preference when clicking language links
    const langLinks = document.querySelectorAll('.lang-link[hreflang]');

    langLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        const lang = link.getAttribute('hreflang');
        if (lang) {
          this.savePreference(lang);
        }
      });
    });

    // Listen for browser navigation events
    window.addEventListener('popstate', () => {
      this.currentLang = this.determineLanguage();
      this.initialize(true); // Animate on navigation
    });

    window.addEventListener('pageshow', () => {
      this.updateSelectorState();
    });
  }

  /**
   * Initialize image loading handlers
   */
  initializeImageLoading() {
    const images = document.querySelectorAll('.game-image img');

    images.forEach(img => {
      const container = img.closest('.game-image');

      // If image is already loaded (cached)
      if (img.complete && img.naturalHeight !== 0) {
        img.classList.add('loaded');
        if (container) {
          container.classList.add('loaded');
        }
      } else {
        // Add load event listener
        img.addEventListener('load', () => {
          img.classList.add('loaded');
          if (container) {
            container.classList.add('loaded');
          }
        });

        // Handle error case
        img.addEventListener('error', () => {
          if (container) {
            container.classList.add('loaded');
          }
        });
      }
    });
  }

  /**
   * Initialize the language manager
   * @param {boolean} animate Whether to animate transitions
   */
  initialize(animate = false) {
    this.updateSelectorState();

    // Only update home content if we're on the homepage
    if (document.querySelector('.home-content')) {
      this.updateHomeContent(animate);
      this.initializeImageLoading();
    }

    this.cleanUrl();
  }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    const langManager = new LanguageManager();
    langManager.attachEventListeners();
    langManager.initialize(false); // No animation on initial load
  });
} else {
  const langManager = new LanguageManager();
  langManager.attachEventListeners();
  langManager.initialize(false); // No animation on initial load
}
