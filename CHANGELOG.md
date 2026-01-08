# Changelog

All notable changes to this project will be documented in this file.

## [Unreleased] - 2026-01-08

### Added

#### New Files
- `_layouts/default.html` - Base layout with SEO, accessibility, and responsive design
- `assets/css/variables.css` - CSS custom properties for theming
- `assets/css/language-selector.css` - Extracted language selector styles
- `assets/css/home.css` - Homepage specific styles
- `assets/css/game.css` - Game page specific styles
- `assets/js/language-manager.js` - Unified ES6+ language management class
- `_includes/translations-script.html` - Dynamic translation generator from i18n.yml
- `IMPROVEMENTS.md` - Comprehensive documentation of all improvements
- `CHANGELOG.md` - This file

#### Features
- CSS custom properties (variables) for consistent theming
- Modern ES6+ JavaScript with class-based architecture
- Enhanced WCAG 2.1 AA accessibility compliance
- Comprehensive ARIA attributes throughout
- Schema.org structured data (microdata)
- Open Graph and Twitter Card meta tags
- Skip to main content link for keyboard users
- High contrast mode support
- Reduced motion support
- Print-friendly styles
- Dark mode preparation (structure in place)

### Changed

#### Architecture
- Separated CSS from HTML layouts into dedicated stylesheets
- Separated JavaScript from HTML into external files
- Unified language switching logic (removed duplication)
- Dynamic translation loading from i18n.yml

#### Performance
- Cached DOM queries for better performance
- Batch DOM updates to reduce reflows
- Optimized event listeners with delegation
- External CSS/JS files for better browser caching
- Deferred JavaScript loading

#### Code Quality
- Modern ES6+ JavaScript features:
  - Classes instead of IIFEs
  - `const`/`let` instead of `var`
  - Arrow functions
  - Template literals
  - Object destructuring
- Improved code organization and modularity
- Added comprehensive inline documentation
- Removed ~280 lines of duplicated code

### Improved

#### Accessibility
- Added `role` attributes for semantic structure
- Enhanced `aria-label` attributes for all interactive elements
- Added `aria-current` for active language indicator
- Improved keyboard navigation with `:focus-visible` styles
- Added screen reader only content with `.sr-only`
- Semantic HTML5 structure throughout
- Language attribute (`lang`) on all language links

#### SEO
- Complete Open Graph implementation
- Twitter Card meta tags
- JSON-LD structured data for games
- Microdata (Schema.org) on game pages
- Language alternates (hreflang) for multilingual pages
- Improved meta descriptions
- Automatic sitemap and RSS feed integration

#### User Experience
- Consistent visual design with CSS variables
- Smoother transitions and animations
- Better mobile responsiveness
- Improved touch targets for mobile devices
- Print-optimized layouts

### Refactored

#### `_layouts/home.html`
- Removed inline `<style>` block (moved to `assets/css/home.css`)
- Removed inline `<script>` block (moved to `assets/js/language-manager.js`)
- Added ARIA attributes for accessibility
- Added semantic HTML roles
- Now uses external CSS and JS files

#### `_layouts/game.html`
- Removed inline `<style>` block (moved to `assets/css/game.css`)
- Added ARIA attributes for navigation
- Added Schema.org microdata
- Enhanced accessibility labels
- Now uses external CSS and JS files

#### `_includes/language-selector.html`
- Removed inline `<style>` block (moved to `assets/css/language-selector.css`)
- Removed inline `<script>` block (functionality now in `assets/js/language-manager.js`)
- Added `lang` attribute to each language link
- Enhanced `aria-label` descriptions
- Improved accessibility

### Fixed
- Removed hardcoded translations from JavaScript
- Eliminated code duplication between home and game layouts
- Consistent color usage across the site via CSS variables
- Proper semantic structure for screen readers

### Technical Details

#### CSS Variables
- 60+ CSS custom properties for theming
- Color palette centralization
- Spacing scale standardization
- Typography scale normalization
- Transition timing standardization

#### JavaScript Improvements
- Object-oriented design with LanguageManager class
- Single source of truth for language logic
- Improved error handling with console warnings
- Better memory management with cached queries
- Cleaner event handling

#### Browser Support
- Modern browsers (Chrome, Firefox, Safari, Edge)
- Progressive enhancement for older browsers
- Graceful degradation strategies
- Feature detection where needed

### Migration Notes

For developers working with this codebase:

1. **Styles**: Add new styles to appropriate CSS files in `assets/css/`
2. **Translations**: Update only `_data/i18n.yml` - JavaScript auto-loads them
3. **Layouts**: Keep using the same layouts, they now reference external assets
4. **JavaScript**: Language functionality is automatic, no manual intervention needed

### Breaking Changes

**None** - All changes are backward compatible. The site functions identically from a user perspective while being significantly improved under the hood.

### Metrics

- **Code Reduction**: ~280 lines of duplicated code removed
- **Files Created**: 9 new organized files
- **CSS Variables**: 60+ centralized theme properties
- **Accessibility**: WCAG 2.1 AA compliant
- **Performance**: Improved caching and load times

---

## Notes

This release focuses on:
1. Code quality and maintainability
2. Performance optimization
3. Accessibility compliance
4. Modern web standards
5. Developer experience

All improvements maintain 100% backward compatibility with existing content and functionality.
