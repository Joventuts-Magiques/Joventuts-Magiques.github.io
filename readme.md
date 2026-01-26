# 🎲 Joventuts Màgiques - Board Games & Card Games Documentation

[![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-Live-success?logo=github)](https://Joventuts-Magiques.github.io)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Jekyll](https://img.shields.io/badge/Jekyll-4.3.4-red?logo=jekyll)](https://jekyllrb.com/)
[![Multilingual](https://img.shields.io/badge/Languages-CA%20|%20ES%20|%20EN-orange)](https://Joventuts-Magiques.github.io)

An open-source collection of comprehensive rules, strategies, and guides for board games and trading card games. Available in **Catalan**, **Spanish**, and **English**.

🌐 **Live Site**: [https://Joventuts-Magiques.github.io](https://Joventuts-Magiques.github.io)

---

## ✨ Features

- 🌍 **Multilingual** - Full support for Catalan (primary), Spanish, and English
- 🎮 **13 Games Documented** - 10 board games + 3 card games with 100% translation coverage
- 🌙 **Dark Mode** - System preference detection with manual toggle
- ♿ **Accessible** - WCAG 2.1 AA compliant with enhanced focus indicators
- 📱 **Responsive** - Mobile-first design with touch-friendly navigation
- 🔍 **SEO Optimized** - Structured data, hreflang tags, and proper metadata
- ⚡ **Fast** - Lazy loading, skeleton screens, and optimized assets
- 🎨 **Modern UI** - 3D card effects, smooth animations, and visual polish

---

## 📚 Available Games

### Board Games (10)

| Game               | Description                   | Players | Difficulty |
| ------------------ | ----------------------------- | ------- | ---------- |
| **Monopoly**       | Classic real estate trading   | 2-8     | Medium     |
| **7 Wonders**      | Card drafting civilization    | 2-7     | Medium     |
| **Catan**          | Resource trading and building | 3-4     | Medium     |
| **Ticket to Ride** | Train route building          | 2-5     | Easy       |
| **Codenames**      | Word association party game   | 4-8+    | Easy       |
| **Secret Hitler**  | Social deduction              | 5-10    | Medium     |
| **Mantis**         | Card collecting               | 2-6     | Easy       |
| **Pelusas**        | Quick card game               | 2-5     | Easy       |
| **Cathood**        | Cat-themed strategy           | 2-4     | Easy       |
| **Potion Crafter** | Potion brewing                | 2-4     | Medium     |

### Card Games (3)

| Game                     | Format    | Players | Difficulty |
| ------------------------ | --------- | ------- | ---------- |
| **Magic: The Gathering** | Standard  | 2       | Hard       |
| **Magic: The Gathering** | Commander | 3-6     | Hard       |
| **Pokémon TCG**          | Standard  | 2       | Medium     |

---

## 🚀 Quick Start

### Prerequisites

- [Docker](https://www.docker.com/) (recommended) OR
- Ruby 3.x + Bundler

### Local Development with Docker (Recommended)

```bash
# Clone the repository
git clone https://github.com/Joventuts-Magiques/Joventuts-Magiques.github.io.git
cd Joventuts-Magiques.github.io

# Start the development server
docker-compose up

# Open in browser
# http://localhost:4000
```

### Local Development with Ruby

```bash
# Install dependencies
bundle install

# Start the development server
bundle exec jekyll serve

# Open in browser
# http://localhost:4000
```

---

## 🔧 Pre-commit Hooks

This project uses pre-commit hooks to maintain code quality. The hooks run automatically before each commit.

### Setup

```bash
# Install pre-commit
pip install pre-commit

# Install the hooks
pre-commit install

# Run all hooks manually (optional)
pre-commit run --all-files
```

### Configured Checks

| Hook                      | Description                         |
| ------------------------- | ----------------------------------- |
| `trailing-whitespace`     | Removes trailing whitespace         |
| `end-of-file-fixer`       | Ensures files end with newline      |
| `check-yaml`              | Validates YAML syntax               |
| `check-json`              | Validates JSON syntax               |
| `markdownlint`            | Lints and auto-fixes Markdown       |
| `detect-private-key`      | Prevents committing private keys    |
| `detect-aws-credentials`  | Prevents committing AWS credentials |
| `check-added-large-files` | Blocks files >1MB                   |
| `check-merge-conflict`    | Detects merge conflict markers      |

---

## 📁 Project Structure

```
├── _games/                    # Board games collection
│   ├── monopoly/
│   │   ├── monopoly.ca.md    # Catalan version
│   │   ├── monopoly.es.md    # Spanish version
│   │   ├── monopoly.en.md    # English version
│   │   └── images/           # Game images
│   └── game-template/        # Template for new games
│
├── _card_games/               # Card games collection
│   ├── magic-the-gathering-standard/
│   ├── pokemon-tcg/
│   └── card-game-template/   # Template for new card games
│
├── _layouts/                  # Jekyll layouts
│   ├── landing.html          # Main landing page
│   ├── game.html             # Board game layout
│   └── card-game.html        # Card game layout
│
├── _includes/                 # Reusable components
│   ├── site-header.html      # Navigation header
│   ├── language-selector.html
│   └── table-of-contents.html
│
├── assets/
│   ├── css/                  # Stylesheets
│   │   ├── variables.css     # CSS custom properties
│   │   ├── base.css          # Base styles
│   │   └── ...
│   └── js/                   # JavaScript
│       ├── language-manager.js
│       ├── theme-toggle.js   # Dark mode
│       └── ...
│
├── _data/
│   └── i18n.yml              # UI translations
│
├── _config.yml               # Jekyll configuration
├── docker-compose.yml        # Docker setup
├── Gemfile                   # Ruby dependencies
├── .pre-commit-config.yaml   # Pre-commit hooks
└── .markdownlint.json        # Markdown linting rules
```

---

## 🤝 Contributing

We welcome contributions! Here's how to add a new game:

### Adding a Board Game

1. **Create the game directory**:

   ```bash
   mkdir -p _games/your-game/images
   ```

2. **Copy the template**:

   ```bash
   cp _games/game-template/game-template.ca.md _games/your-game/your-game.ca.md
   ```

3. **Create all three language versions**:
   - `your-game.ca.md` (Catalan - required)
   - `your-game.es.md` (Spanish - required)
   - `your-game.en.md` (English - required)

4. **Follow the content schema** (see below)

5. **Test locally** with Docker

6. **Run pre-commit hooks**:

   ```bash
   pre-commit run --all-files
   ```

7. **Submit a Pull Request**

### Adding a Card Game

Same process, but use `_card_games/` directory and `card-game-template`.

### Content Schema

Each game file must include:

```yaml
---
title: Game Name
lang: ca  # ca, es, or en
players: "2-4"
duration: "30-60 min"
difficulty: Mitjà  # Fàcil, Mitjà, Difícil
age_range: "10+"
excerpt: "Brief description of the game"
image: "https://example.com/game-image.jpg"
layout: game  # or card-game
---

## Descripció General
Overview and history...

## Components del Joc
List of components...

## Objectiu del Joc
How to win...

## Preparació
Setup instructions...

## Com Jugar
Gameplay rules...

## Estratègies Recomanades
Tips and tactics...

## Variants Populars (optional)
Rule variations...
```

### Translation Guidelines

- Maintain consistent terminology across languages
- Use gender-neutral language where possible
- Adapt cultural references appropriately
- All three language versions are **required** before merging

---

## 🛠️ Technical Details

### Technology Stack

| Component             | Technology                       |
| --------------------- | -------------------------------- |
| Static Site Generator | Jekyll 4.3.4                     |
| Hosting               | GitHub Pages                     |
| CSS                   | Custom CSS with CSS Grid/Flexbox |
| JavaScript            | Vanilla ES6+                     |
| Development           | Docker                           |

### Key Features Implementation

- **Language Switching**: Client-side with localStorage persistence
- **Dark Mode**: CSS custom properties with `prefers-color-scheme` detection
- **Accessibility**: Skip links, ARIA labels, focus indicators, reduced motion support
- **SEO**: Structured data (JSON-LD), hreflang tags, Open Graph metadata
- **Performance**: Lazy loading, skeleton screens, aspect ratio preservation

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **Andy & Juan** - Project maintainers
- **Contributors** - Everyone who helped with translations and content
- **Jekyll Community** - For excellent documentation and tools

---

## 📞 Contact

- **Issues**: [GitHub Issues](https://github.com/Joventuts-Magiques/Joventuts-Magiques.github.io/issues)
- **Discussions**: [GitHub Discussions](https://github.com/Joventuts-Magiques/Joventuts-Magiques.github.io/discussions)

---

<p align="center">
  Made with ❤️ by the board games community
</p>
