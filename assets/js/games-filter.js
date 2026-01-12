/**
 * Games Filter and Search
 * Handles filtering, searching, and sorting of games
 */

class GamesFilter {
  constructor() {
    this.searchInput = document.getElementById('game-search');
    this.difficultyFilter = document.getElementById('difficulty-filter');
    this.playersFilter = document.getElementById('players-filter');
    this.sortToggle = document.getElementById('sort-toggle');
    this.gamesGrid = document.getElementById('games-grid');
    this.noResults = document.getElementById('no-results');
    this.clearFiltersBtn = document.getElementById('clear-filters');
    this.visibleCount = document.getElementById('visible-count');
    this.totalCount = document.getElementById('total-count');

    this.gameCards = Array.from(document.querySelectorAll('.game-card'));
    this.sortAscending = true;

    this.init();
  }

  init() {
    if (!this.gamesGrid) return;

    // Detect current page language and show appropriate game card versions
    this.initializeLanguageDisplay();

    // Set initial counts
    this.updateCounts();

    // Attach event listeners
    if (this.searchInput) {
      this.searchInput.addEventListener('input', () => this.filterGames());
    }

    if (this.difficultyFilter) {
      this.difficultyFilter.addEventListener('change', () => this.filterGames());
    }

    if (this.playersFilter) {
      this.playersFilter.addEventListener('change', () => this.filterGames());
    }

    if (this.sortToggle) {
      this.sortToggle.addEventListener('click', () => this.toggleSort());
    }

    if (this.clearFiltersBtn) {
      this.clearFiltersBtn.addEventListener('click', () => this.clearFilters());
    }

    // Handle URL parameters for deep linking
    this.handleURLParams();
  }

  /**
   * Initialize language display based on current page language
   */
  initializeLanguageDisplay() {
    // Detect current language from HTML lang attribute or URL
    const htmlLang = document.documentElement.lang || 'ca';
    const currentLang = htmlLang.toLowerCase();

    // Show only the game cards matching the current language
    document.querySelectorAll('.game-card').forEach(card => {
      const caLink = card.querySelector('.game-card-link.lang-ca');
      const esLink = card.querySelector('.game-card-link.lang-es');
      const enLink = card.querySelector('.game-card-link.lang-en');

      // Hide all versions first
      if (caLink) caLink.style.display = 'none';
      if (esLink) esLink.style.display = 'none';
      if (enLink) enLink.style.display = 'none';

      // Show only the matching language version
      switch (currentLang) {
        case 'ca':
          if (caLink) caLink.style.display = '';
          break;
        case 'es':
          if (esLink) esLink.style.display = '';
          break;
        case 'en':
          if (enLink) enLink.style.display = '';
          break;
        default:
          // Fallback to Catalan
          if (caLink) caLink.style.display = '';
      }
    });
  }

  filterGames() {
    const searchTerm = this.searchInput ? this.searchInput.value.toLowerCase() : '';
    const difficultyValue = this.difficultyFilter ? this.difficultyFilter.value : 'all';
    const playersValue = this.playersFilter ? this.playersFilter.value : 'all';

    let visibleCount = 0;

    this.gameCards.forEach(card => {
      const title = card.dataset.title || '';
      const difficulty = card.dataset.difficulty || '';
      const players = card.dataset.players || '';

      // Search filter
      const matchesSearch = title.includes(searchTerm);

      // Difficulty filter
      const matchesDifficulty = difficultyValue === 'all' || difficulty === difficultyValue;

      // Players filter
      let matchesPlayers = true;
      if (playersValue !== 'all') {
        const playerCount = this.extractPlayerCount(players);
        matchesPlayers = this.matchesPlayerFilter(playerCount, playersValue);
      }

      // Show/hide card
      if (matchesSearch && matchesDifficulty && matchesPlayers) {
        card.style.display = '';
        visibleCount++;
      } else {
        card.style.display = 'none';
      }
    });

    // Update counts
    this.updateCounts(visibleCount);

    // Show/hide no results message
    if (this.noResults) {
      this.noResults.style.display = visibleCount === 0 ? 'block' : 'none';
    }

    // Update URL
    this.updateURL();
  }

  extractPlayerCount(playersString) {
    // Extract numeric values from strings like "2-4", "5+", "2"
    const match = playersString.match(/\d+/);
    return match ? parseInt(match[0]) : 0;
  }

  matchesPlayerFilter(playerCount, filter) {
    switch (filter) {
      case '2':
        return playerCount === 2;
      case '3-4':
        return playerCount >= 3 && playerCount <= 4;
      case '5+':
        return playerCount >= 5;
      default:
        return true;
    }
  }

  toggleSort() {
    this.sortAscending = !this.sortAscending;

    // Update icon
    const icon = this.sortToggle.querySelector('.sort-icon');
    if (icon) {
      icon.textContent = this.sortAscending ? '⬇️' : '⬆️';
    }

    // Sort cards
    this.gameCards.sort((a, b) => {
      const titleA = a.dataset.title || '';
      const titleB = b.dataset.title || '';

      if (this.sortAscending) {
        return titleA.localeCompare(titleB);
      } else {
        return titleB.localeCompare(titleA);
      }
    });

    // Re-append cards in new order
    this.gameCards.forEach(card => {
      this.gamesGrid.appendChild(card);
    });
  }

  clearFilters() {
    if (this.searchInput) this.searchInput.value = '';
    if (this.difficultyFilter) this.difficultyFilter.value = 'all';
    if (this.playersFilter) this.playersFilter.value = 'all';

    this.filterGames();
  }

  updateCounts(visible = null) {
    const total = this.gameCards.length;
    const visibleGames = visible !== null ? visible : this.gameCards.filter(card => card.style.display !== 'none').length;

    if (this.visibleCount) {
      this.visibleCount.textContent = visibleGames;
    }
    if (this.totalCount) {
      this.totalCount.textContent = total;
    }
  }

  handleURLParams() {
    const params = new URLSearchParams(window.location.search);

    const search = params.get('search');
    const difficulty = params.get('difficulty');
    const players = params.get('players');

    if (search && this.searchInput) {
      this.searchInput.value = search;
    }
    if (difficulty && this.difficultyFilter) {
      this.difficultyFilter.value = difficulty;
    }
    if (players && this.playersFilter) {
      this.playersFilter.value = players;
    }

    // Apply filters if any params were set
    if (search || difficulty || players) {
      this.filterGames();
    }
  }

  updateURL() {
    const params = new URLSearchParams();

    if (this.searchInput && this.searchInput.value) {
      params.set('search', this.searchInput.value);
    }
    if (this.difficultyFilter && this.difficultyFilter.value !== 'all') {
      params.set('difficulty', this.difficultyFilter.value);
    }
    if (this.playersFilter && this.playersFilter.value !== 'all') {
      params.set('players', this.playersFilter.value);
    }

    const newURL = params.toString() ? `?${params.toString()}` : window.location.pathname;
    window.history.replaceState({}, '', newURL);
  }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    new GamesFilter();
  });
} else {
  new GamesFilter();
}
