# Joventuts Magiques - Gaming Community

[![Build Status](https://github.com/andyce/andyce.github.io/workflows/Build/badge.svg)](https://github.com/andyce/andyce.github.io/actions)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

An open collection of rules, strategies and guides for board games and card games, available in Catalan, Spanish, and English.

## 🌐 Available Languages

- **Catalan** (primary language)
- **Spanish**
- **English**

## 🎯 Purpose

This project aims to create a comprehensive and accessible collection of gaming rules and strategies, maintaining quality and consistency across all supported languages.

## 🚀 Features

- ✅ **Multilingual**: Full support for 3 languages
- ✅ **Multiple Game Types**: Board games and card games
- ✅ **Responsive**: Adaptive design for all devices
- ✅ **Accessible**: WCAG 2.1 AA compliant
- ✅ **SEO Optimized**: Metadata and structured data
- ✅ **Open Source**: Contributions welcome
- ✅ **Automated Validation**: Translation quality control

## 📁 Project Structure

```text
├── _games/                 # Board games collection
│   └── monopoly/          # Game example
│       ├── monopoly.ca.md # Catalan version
│       ├── monopoly.es.md # Spanish version
│       ├── monopoly.en.md # English version
│       └── images/        # Game images
├── _card_games/           # Card games collection
│   └── magic-the-gathering/
│       ├── magic-the-gathering.ca.md
│       ├── magic-the-gathering.es.md
│       └── magic-the-gathering.en.md
├── _data/
│   └── i18n.yml          # UI translations
├── _includes/
│   └── language-selector.html # Language selector
├── _layouts/             # Jekyll templates
│   ├── landing.html      # Main landing page
│   ├── game.html         # Board game layout
│   └── card-game.html    # Card game layout
├── _templates/           # Content templates
│   ├── game-template.ca.md
│   └── card-game-template.ca.md
└── .kiro/
    └── steering/         # Project documentation
```

## 🛠️ Local Development

### Prerequisites

- Ruby 2.7+
- Jekyll 4.0+
- Node.js (optional for optimizations)

### Installation

```bash
# Clone repository
git clone https://github.com/andyce/andyce.github.io.git
cd andyce.github.io

# Install dependencies
bundle install

# Run local server
bundle exec jekyll serve

# Open in browser
# http://localhost:4000
```

### Pre-commit Hooks

```bash
# Install pre-commit
pip install pre-commit

# Setup hooks
pre-commit install

# Run validations
pre-commit run --all-files
```

## 📝 How to Contribute

### Adding a New Board Game

1. **Create game directory**:

   ```bash
   mkdir -p _games/game-name/images
   ```

2. **Create files for each language**:
   - `game-name.ca.md` (Catalan - required)
   - `game-name.es.md` (Spanish - required)
   - `game-name.en.md` (English - required)

3. **Use the template** from `_templates/game-template.ca.md`

### Adding a New Card Game

1. **Create game directory**:

   ```bash
   mkdir -p _card_games/game-name/images
   ```

2. **Create files for each language**:
   - `game-name.ca.md` (Catalan - required)
   - `game-name.es.md` (Spanish - required)
   - `game-name.en.md` (English - required)

3. **Use the template** from `_templates/card-game-template.ca.md`

4. **Card game specific fields**:

   ```yaml
   ---
   title: Game Name
   lang: ca
   players: 2+
   format: "Standard, Modern, Commander"
   difficulty: Medium
   age_range: 13+
   excerpt: "Brief game description"
   layout: card-game
   ---
   ```

### Required Content Schema

Each game must include:

- **Metadata**: players, duration, difficulty, age
- **Overview**: History and context
- **Components**: Detailed list with images
- **Setup**: Initialization steps
- **Gameplay**: Rules and mechanics
- **Winning**: Victory conditions
- **Strategy**: Tips and tactics
- **Variants**: Popular rule alternatives

### Translation Guidelines

- Maintain consistent terminology across languages
- Use gender-neutral language when possible
- Adapt cultural references appropriately
- Validate with native speakers when possible

### Review Process

1. Fork repository
2. Create feature branch
3. Implement changes
4. Run validations
5. Create Pull Request
6. Review by maintainers

## 🔧 Validation Scripts

### Validate Translations

```bash
python3 scripts/validate-translations.py
```

This script checks:

- Presence of all languages for each game
- Required fields in each translation
- Metadata consistency

## 📊 Project Status

### Available Games

#### Board Games

- [x] **Monopoly** - Complete in 3 languages
- [x] **7 Wonders** - Complete in 3 languages
- [x] **Catan** - Complete in 3 languages
- [x] **Ticket to Ride** - Complete in 3 languages

#### Card Games

- [x] **Magic: The Gathering** - Complete in 3 languages

### Planned Content

#### Board Games

- [ ] **Chess** - Planned
- [ ] **Scrabble** - Planned
- [ ] **Risk** - Planned

#### Card Games

- [ ] **Pokémon TCG** - Planned
- [ ] **Yu-Gi-Oh!** - Planned
- [ ] **Hearthstone** - Planned

### Planned Features

#### Phase 1 (Immediate)

- [x] Content restructuring
- [x] Proper multilingual URLs
- [x] SEO optimizations
- [x] Accessibility improvements

#### Phase 2 (Medium-term)

- [ ] Search functionality
- [ ] Rating system
- [ ] Printable rule sheets
- [ ] Recommendation engine

#### Phase 3 (Long-term)

- [ ] Interactive tutorials
- [ ] Video integration
- [ ] Mobile app companion
- [ ] Community translations

## 📄 License

This project is licensed under the MIT License. See [LICENSE](LICENSE) for details.

## 🤝 Acknowledgments

- **Joventuts Magiques** - Maintaining organization
- **Contributors** - Everyone who helped with translations and content
- **Jekyll Community** - For excellent tools and documentation

## 📞 Contact

- **Issues**: [GitHub Issues](https://github.com/andyce/andyce.github.io/issues)
- **Discussions**: [GitHub Discussions](https://github.com/andyce/andyce.github.io/discussions)
- **Email**: [contacte@joventutsmagiques.org](mailto:contacte@joventutsmagiques.org)

---

## Made with ❤️ by the board games community
