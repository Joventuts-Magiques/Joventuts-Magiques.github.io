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
    const savedLang = localStorage.getItem(this.storageKey);

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
   * Save language preference to localStorage
   * @param {string} lang Language code
   */
  savePreference(lang) {
    if (this.supportedLangs.includes(lang)) {
      localStorage.setItem(this.storageKey, lang);
      this.currentLang = lang;
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
   */
  updateHomeContent() {
    if (!this.translations[this.currentLang]) {
      console.warn(`No translations found for language: ${this.currentLang}`);
      return;
    }

    const t = this.translations[this.currentLang];

    // Update main text content
    const contentMap = {
      'hero-title': t.welcome,
      'hero-description': t.description,
      'games-title': t.all_games
    };

    Object.entries(contentMap).forEach(([id, text]) => {
      const element = document.getElementById(id);
      if (element && text) {
        element.textContent = text;
      }
    });

    // Update language-specific game content
    this.updateGameCards();
  }

  /**
   * Update game cards to show content in current language
   */
  updateGameCards() {
    // Cache all language-specific elements
    const elementsCache = {
      ca: document.querySelectorAll('.lang-ca'),
      es: document.querySelectorAll('.lang-es'),
      en: document.querySelectorAll('.lang-en')
    };

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
      this.initialize();
    });

    window.addEventListener('pageshow', () => {
      this.updateSelectorState();
    });
  }

  /**
   * Initialize the language manager
   */
  initialize() {
    this.updateSelectorState();

    // Only update home content if we're on the homepage
    if (document.querySelector('.home-content')) {
      this.updateHomeContent();
    }

    this.cleanUrl();
  }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    const langManager = new LanguageManager();
    langManager.attachEventListeners();
    langManager.initialize();
  });
} else {
  const langManager = new LanguageManager();
  langManager.attachEventListeners();
  langManager.initialize();
}
