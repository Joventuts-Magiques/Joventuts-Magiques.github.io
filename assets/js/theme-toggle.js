/**
 * Theme Toggle Manager
 * Handles dark/light mode switching with localStorage persistence
 */
class ThemeManager {
  constructor() {
    this.storageKey = 'preferredTheme';
    this.themes = ['light', 'dark'];
    this.currentTheme = this.determineTheme();
  }

  /**
   * Determine the current theme based on saved preference or system preference
   * @returns {string} Current theme ('light' or 'dark')
   */
  determineTheme() {
    const savedTheme = this.loadPreference();

    // Priority: Saved preference > System preference > Default (light)
    if (savedTheme && this.themes.includes(savedTheme)) {
      return savedTheme;
    }

    // Check system preference
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }

    return 'light';
  }

  /**
   * Load theme preference from localStorage with error handling
   * @returns {string|null} Saved theme or null
   */
  loadPreference() {
    try {
      return localStorage.getItem(this.storageKey);
    } catch (e) {
      console.warn('Failed to load theme preference from localStorage:', e);
      return null;
    }
  }

  /**
   * Save theme preference to localStorage with error handling
   * @param {string} theme Theme name ('light' or 'dark')
   */
  savePreference(theme) {
    if (this.themes.includes(theme)) {
      try {
        localStorage.setItem(this.storageKey, theme);
        this.currentTheme = theme;
      } catch (e) {
        console.warn('Failed to save theme preference to localStorage:', e);
        // Fallback: just update current theme without persistence
        this.currentTheme = theme;
      }
    }
  }

  /**
   * Apply theme to the document
   * @param {string} theme Theme name ('light' or 'dark')
   */
  applyTheme(theme) {
    if (!this.themes.includes(theme)) {
      console.warn(`Invalid theme: ${theme}`);
      return;
    }

    // Set data-theme attribute on document root
    document.documentElement.setAttribute('data-theme', theme);
    this.currentTheme = theme;

    // Update button icon visibility
    this.updateButtonIcon();
  }

  /**
   * Toggle between light and dark themes
   */
  toggleTheme() {
    const newTheme = this.currentTheme === 'light' ? 'dark' : 'light';
    this.applyTheme(newTheme);
    this.savePreference(newTheme);
  }

  /**
   * Update the theme toggle button icon
   */
  updateButtonIcon() {
    const lightIcon = document.querySelector('.theme-icon-light');
    const darkIcon = document.querySelector('.theme-icon-dark');

    if (lightIcon && darkIcon) {
      if (this.currentTheme === 'dark') {
        // Show sun icon (to switch to light)
        lightIcon.hidden = true;
        darkIcon.hidden = false;
      } else {
        // Show moon icon (to switch to dark)
        lightIcon.hidden = false;
        darkIcon.hidden = true;
      }
    }
  }

  /**
   * Attach event listeners
   */
  attachEventListeners() {
    const toggleButton = document.getElementById('theme-toggle');

    if (toggleButton) {
      toggleButton.addEventListener('click', () => {
        // Add rotation animation class
        toggleButton.classList.add('toggling');

        // Remove class after animation completes
        setTimeout(() => {
          toggleButton.classList.remove('toggling');
        }, 500);

        this.toggleTheme();
      });
    }

    // Listen for system theme changes (when user hasn't set a preference)
    if (window.matchMedia) {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

      // Only respond to system changes if user hasn't set a preference
      mediaQuery.addEventListener('change', (e) => {
        const savedTheme = this.loadPreference();
        if (!savedTheme) {
          const newTheme = e.matches ? 'dark' : 'light';
          this.applyTheme(newTheme);
        }
      });
    }
  }

  /**
   * Initialize the theme manager
   */
  initialize() {
    this.applyTheme(this.currentTheme);
  }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    const themeManager = new ThemeManager();
    themeManager.attachEventListeners();
    themeManager.initialize();
  });
} else {
  const themeManager = new ThemeManager();
  themeManager.attachEventListeners();
  themeManager.initialize();
}
