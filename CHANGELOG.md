# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

> **Note**: Changelog entries prior to version 1.3.0 were not maintained. This changelog begins with version 1.3.0 to establish proper change tracking going forward.

## [Unreleased]

## [1.3.1] - 2026-01-14

### Added

### Changed

- Updated VS Code extensions recommendations by removing `gitlens` and `sqlite-viewer`
- Enhanced VS Code settings with branch protection configuration for `main` branch with prompt to commit to new branch
- Bumped version to 1.3.1

### Fixed

### Removed

- Removed `eamodio.gitlens` from recommended VS Code extensions
- Removed `qwtel.sqlite-viewer` from recommended VS Code extensions

## [1.3.0] - 2026-01-14

Initial release with comprehensive changelog tracking.

### Added

- `validateTypeScript()` utility function to test TypeScript transpilation and modern language features
- `validateESLint()` utility function to validate ESLint linting functionality
- `validatePrettier()` utility function to test code formatting capabilities
- `validateRimraf()` utility function to verify rimraf CLI availability
- `validateUnbuild()` utility function to verify unbuild CLI availability
- Comprehensive test suite with 14 tests covering all installed dev dependencies
- Dependency validation framework for testing major version updates safely

### Changed

- Renamed `agents.md` to `AGENTS.md` for consistent naming convention
- Updated `build.config.ts` to mark ESLint, Prettier, and TypeScript as external dependencies to prevent bundling and resolve unused import warnings

### Fixed

### Removed

## [1.3.0] - 2026-01-14

Initial release with comprehensive changelog tracking.

### Added

- `validateTypeScript()` utility function to test TypeScript transpilation and modern language features
- `validateESLint()` utility function to validate ESLint linting functionality
- `validatePrettier()` utility function to test code formatting capabilities
- `validateRimraf()` utility function to verify rimraf CLI availability
- `validateUnbuild()` utility function to verify unbuild CLI availability
- Comprehensive test suite with 14 tests covering all installed dev dependencies
- Dependency validation framework for testing major version updates safely
- CHANGELOG.md with semantic versioning history

### Changed

- Renamed `agents.md` to `AGENTS.md` for consistent naming convention
- Updated `build.config.ts` to mark ESLint, Prettier, and TypeScript as external dependencies to prevent bundling and resolve unused import warnings

[Unreleased]: https://github.com/JohnMostlyR/node-package-template/compare/v1.3.0...HEAD
[1.3.0]: https://github.com/JohnMostlyR/node-package-template/releases/tag/v1.3.0
