#!/usr/bin/env python3
"""
Content Validation Script for Joventuts Màgiques

Validates:
- Translation completeness (all 3 languages: ca, es, en)
- Required frontmatter fields
- Required content sections
- Media presence (images, videos)
- Template structure compliance
"""

import os
import sys
import re
import yaml
from pathlib import Path
from dataclasses import dataclass
from typing import Optional

# Configuration
REQUIRED_LANGUAGES = ['ca', 'es', 'en']

# Required frontmatter fields for board games
GAME_REQUIRED_FIELDS = [
    'title', 'lang', 'players', 'duration', 'difficulty',
    'age_range', 'excerpt', 'layout'
]

# Required frontmatter fields for card games
CARD_GAME_REQUIRED_FIELDS = [
    'title', 'lang', 'players', 'format', 'difficulty',
    'age_range', 'excerpt', 'layout'
]

# Media fields (warning if missing, not error)
MEDIA_FIELDS = ['image', 'video_url']

# Required content sections for board games (in any language)
GAME_REQUIRED_SECTIONS = [
    r'##\s*(Descripció General|Descripción General|General Description|Overview)',
    r'##\s*(Components|Componentes|Components del Joc)',
    r'##\s*(Objectiu|Objetivo|Objective|Goal)',
    r'##\s*(Preparació|Preparación|Setup|Preparation)',
    r'##\s*(Com Jugar|Cómo Jugar|How to Play|Gameplay)',
    r'##\s*(Estratèg|Estrateg|Strateg)',
]

# Required content sections for card games
CARD_GAME_REQUIRED_SECTIONS = [
    r'##\s*(Descripció General|Descripción General|General Description|Overview)',
    r'##\s*(Components|Componentes|Basic Components)',
    r'##\s*(Objectiu|Objetivo|Objective|Goal)',
    r'##\s*(Preparació|Preparación|Setup|Preparation)',
    r'##\s*(Com Jugar|Cómo Jugar|How to Play|Gameplay)',
]


@dataclass
class ValidationResult:
    """Holds validation results for a single file or game."""
    errors: list
    warnings: list

    def __init__(self):
        self.errors = []
        self.warnings = []

    def add_error(self, message: str):
        self.errors.append(message)

    def add_warning(self, message: str):
        self.warnings.append(message)

    @property
    def has_errors(self) -> bool:
        return len(self.errors) > 0

    @property
    def has_warnings(self) -> bool:
        return len(self.warnings) > 0


def parse_frontmatter(content: str) -> tuple[Optional[dict], str]:
    """Parse YAML frontmatter from markdown content."""
    if not content.startswith('---'):
        return None, content

    try:
        parts = content.split('---', 2)
        if len(parts) < 3:
            return None, content
        frontmatter = yaml.safe_load(parts[1])
        body = parts[2]
        return frontmatter, body
    except yaml.YAMLError:
        return None, content


def validate_frontmatter(
    frontmatter: dict,
    required_fields: list,
    file_path: str,
    result: ValidationResult
):
    """Validate that all required frontmatter fields are present."""
    if frontmatter is None:
        result.add_error(f"{file_path}: Missing or invalid YAML frontmatter")
        return

    for field in required_fields:
        if field not in frontmatter or frontmatter[field] is None:
            result.add_error(f"{file_path}: Missing required field '{field}'")
        elif isinstance(frontmatter[field], str) and frontmatter[field].startswith('['):
            result.add_error(
                f"{file_path}: Field '{field}' contains placeholder value"
            )

    # Check media fields (warnings only)
    for field in MEDIA_FIELDS:
        if field not in frontmatter or not frontmatter.get(field):
            result.add_warning(f"{file_path}: Missing media field '{field}'")
        elif isinstance(frontmatter[field], str) and frontmatter[field].startswith('['):
            result.add_warning(
                f"{file_path}: Media field '{field}' contains placeholder value"
            )

    # Check if published is explicitly set to false (template not ready)
    if frontmatter.get('published') is False:
        result.add_warning(
            f"{file_path}: Game is marked as unpublished (published: false)"
        )


def validate_content_sections(
    body: str,
    required_sections: list,
    file_path: str,
    result: ValidationResult
):
    """Validate that required content sections are present."""
    for section_pattern in required_sections:
        if not re.search(section_pattern, body, re.IGNORECASE):
            result.add_warning(
                f"{file_path}: Missing section matching '{section_pattern}'"
            )


def validate_game_directory(
    game_dir: Path,
    is_card_game: bool = False
) -> ValidationResult:
    """Validate a single game directory for translation completeness."""
    result = ValidationResult()
    game_name = game_dir.name

    # Skip template directories
    if 'template' in game_name.lower():
        return result

    # Determine required fields and sections based on game type
    if is_card_game:
        required_fields = CARD_GAME_REQUIRED_FIELDS
        required_sections = CARD_GAME_REQUIRED_SECTIONS
    else:
        required_fields = GAME_REQUIRED_FIELDS
        required_sections = GAME_REQUIRED_SECTIONS

    # Check for all language versions
    found_languages = []
    for lang in REQUIRED_LANGUAGES:
        # Try different naming patterns
        patterns = [
            game_dir / f"{game_name}.{lang}.md",
            game_dir / f"{game_name.replace('-', '_')}.{lang}.md",
        ]

        # Also check for any .{lang}.md file in the directory
        lang_files = list(game_dir.glob(f"*.{lang}.md"))

        file_found = None
        for pattern in patterns:
            if pattern.exists():
                file_found = pattern
                break

        # If standard patterns don't match, use any matching language file
        if file_found is None and lang_files:
            file_found = lang_files[0]

        if file_found is None:
            result.add_error(
                f"{game_dir}: Missing {lang.upper()} translation "
                f"(expected *.{lang}.md file)"
            )
        else:
            found_languages.append(lang)

            # Validate file content
            try:
                content = file_found.read_text(encoding='utf-8')
                frontmatter, body = parse_frontmatter(content)

                # Validate frontmatter
                validate_frontmatter(
                    frontmatter, required_fields, str(file_found), result
                )

                # Validate content sections
                validate_content_sections(
                    body, required_sections, str(file_found), result
                )

                # Check language field matches filename
                if frontmatter and frontmatter.get('lang') != lang:
                    result.add_error(
                        f"{file_found}: Language field '{frontmatter.get('lang')}' "
                        f"doesn't match filename language '{lang}'"
                    )

            except Exception as e:
                result.add_error(f"{file_found}: Error reading file: {e}")

    return result


def validate_all_games(games_dir: Path, is_card_game: bool = False) -> ValidationResult:
    """Validate all games in a directory."""
    result = ValidationResult()

    if not games_dir.exists():
        result.add_warning(f"Directory {games_dir} does not exist")
        return result

    for game_dir in sorted(games_dir.iterdir()):
        if game_dir.is_dir() and not game_dir.name.startswith('.'):
            game_result = validate_game_directory(game_dir, is_card_game)
            result.errors.extend(game_result.errors)
            result.warnings.extend(game_result.warnings)

    return result


def print_results(result: ValidationResult, title: str):
    """Print validation results."""
    print(f"\n{'=' * 60}")
    print(f" {title}")
    print('=' * 60)

    if result.errors:
        print(f"\n❌ ERRORS ({len(result.errors)}):")
        for error in result.errors:
            print(f"   • {error}")

    if result.warnings:
        print(f"\n⚠️  WARNINGS ({len(result.warnings)}):")
        for warning in result.warnings:
            print(f"   • {warning}")

    if not result.errors and not result.warnings:
        print("\n✅ All validations passed!")


def main():
    """Main entry point."""
    print("🎲 Joventuts Màgiques Content Validator")
    print("=" * 60)

    # Get the repository root (script is in /tests)
    repo_root = Path(__file__).parent.parent

    # Validate board games
    games_dir = repo_root / '_games'
    games_result = validate_all_games(games_dir, is_card_game=False)
    print_results(games_result, "Board Games Validation")

    # Validate card games
    card_games_dir = repo_root / '_card_games'
    card_games_result = validate_all_games(card_games_dir, is_card_game=True)
    print_results(card_games_result, "Card Games Validation")

    # Summary
    total_errors = len(games_result.errors) + len(card_games_result.errors)
    total_warnings = len(games_result.warnings) + len(card_games_result.warnings)

    print(f"\n{'=' * 60}")
    print(" SUMMARY")
    print('=' * 60)
    print(f"   Total Errors:   {total_errors}")
    print(f"   Total Warnings: {total_warnings}")

    # Exit with error code if there are errors
    if total_errors > 0:
        print("\n❌ Validation FAILED - please fix errors before merging")
        sys.exit(1)
    else:
        print("\n✅ Validation PASSED")
        sys.exit(0)


if __name__ == '__main__':
    main()
