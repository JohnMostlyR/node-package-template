# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

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

## [0.1.0] - 2026-01-14

### Added

- Initial release of Node Package Template
- TypeScript support with strict type checking
- ESLint configuration for code linting
- Prettier configuration for code formatting
- Vitest setup for unit testing
- Build configuration
- Package metadata and dependencies
- Development guidelines and best practices documentation

[Unreleased]: https://github.com/JohnMostlyR/node-package-template/compare/v0.1.0...HEAD
[0.1.0]: https://github.com/JohnMostlyR/node-package-template/releases/tag/v0.1.0
