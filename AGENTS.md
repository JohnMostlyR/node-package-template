---
name: 'Node Package Template'
description: 'A modern Node.js package template with TypeScript, ESLint, Prettier, and Vitest. Designed for building scalable and maintainable npm packages.'
category: 'Node.js Package'
author: 'Your Name'
authorUrl: 'https://github.com/yourusername'
tags: ['node.js', 'typescript', 'template', 'package']
lastUpdated: '2026-01-14'
---

# Node Package Template

## Project Overview

A modern, production-ready template for creating Node.js packages. This template provides a solid foundation with TypeScript support, comprehensive linting and formatting tools, and testing infrastructure. It solves the problem of setting up boilerplate configuration for new npm packages, allowing developers to focus on writing package code rather than tooling setup.

## Tech Stack

List the main technologies and tools used in the project:

- **Runtime**: Node.js
- **Language**: TypeScript
- **Package Manager**: PNPM
- **Testing**: Vitest
- **Linting**: ESLint
- **Formatting**: Prettier
- **Build**: Build Config (build.config.ts)
- **Other Tools**: Workspace management (pnpm-workspace.yaml)

## Project Structure

```
/
├── src/                      # Main TypeScript source code
│   └── index.ts              # Main package entry point
├── tests/                    # Integration tests and test infrastructure
│   └── index.test.ts         # Test suite
├── .prettierignore           # Prettier ignore configuration
├── .renovaterc               # Renovate bot configuration
├── AGENTS.md                 # Agents instructions
├── build.config.ts           # Build configuration
├── eslint.config.js          # ESLint configuration
├── LICENSE                   # Project license
├── package.json              # Package metadata and dependencies
├── pnpm-lock.yaml            # Dependency lock file
├── pnpm-workspace.yaml       # Workspace configuration
├── prettier.config.js        # Prettier configuration
├── README.md                 # Project documentation
├── tsconfig.json             # TypeScript configuration
└── vitest.config.ts          # Vitest configuration
```

## Dev environment tips

- This project uses pnpm as package manager.
- Before you use the terminal, check the operating system and use the default terminal.

## Environment Setup

### Development Requirements

- Node.js: Latest LTS version (v18 or higher recommended)
- Package manager: PNPM (v8 or higher)
- Operating System: Cross-platform (Windows, macOS, Linux)

### Installation Steps

- Run `pnpm install` to install dependencies.
- Run `pnpm test` to to run tests.
- Run `pnpm deps:update` to update dependencies.
- Run `pnpm deps:verify` to verify the updated dependencies (if any).

## Testing instructions

- Find the CI plan in the .github/workflows folder.
- Run `pnpm lint` and fix any remaining linting errors.
- Run `pnpm format` to correct any formatting errors.
- Run `pnpm typecheck` and fix all typing errors, if any.
- Run `pnpm test` and fix any errors until the whole suite is green.
- Run `pnpm coverage` and aim for at least 75% coverage.
- After moving files or changing imports, run `pnpm lint` to be sure ESLint and TypeScript rules still pass.
- Add or update tests for the code you change, even if nobody asked.

## Development Guidelines

### Code Style

- Use TypeScript for type safety.
- Follow ESLint rules defined in eslint.config.js.
- Format code with Prettier before committing.
- Keep code clean, readable, and maintainable.
- Whenever possible, use in top-level scopes `export function x(…) {…}` instead of `export const x = (…) => {…}`. One advantage of using the `function` keyword is that the stack-trace shows a good name when debugging.
- Use arrow functions `=>` over anonymous function expressions.
- Do not use the optional-call operator `?.(`.

### Naming Conventions

- **File naming**: Use kebab-case for files (e.g., `util-functions.ts`).
- **Variable naming**: Use camelCase (e.g., `const maxRetries = 5`).
- **Function naming**: Use camelCase descriptive names (e.g., `async function fetchData()`).
- **Class naming**: Use PascalCase (e.g., `class DataProcessor`).

### Types

- Do not export `types` or `functions` unless you need to share it across multiple components.
- Do not introduce new `types` or `values` to the global namespace.
- Do not use `enums`.

### Comments

- Use JSDoc style comments for `functions`, `interfaces`, and `classes`.

## Code Quality

- Prefer regex capture groups with names over numbered capture groups.
- If you create any temporary new files, scripts, or helper files for iteration, clean up these files by removing them at the end of the task.
- Never duplicate imports. Always reuse existing imports if they are present.
- Do not use `any` or `unknown` as the type for variables, parameters, or return values unless absolutely necessary. If they need type annotations, they should have proper types or interfaces defined.
- Do not duplicate code. Always look for existing utility functions, helpers, or patterns in the codebase before implementing new functionality. Reuse and extend existing code whenever possible.
- Don't add tests to the wrong test suite (e.g., adding to end of file instead of inside relevant suite).
- Look for existing test patterns before creating new structures.
- Use `describe-it` pattern consistently with existing patterns.
- **Important**: Use best practices as described in `.agents/testing-best-practices.md`.
- If you need to create fixtures, install and use the latest version of `vitest-temporary-fixture`.

### Git Workflow Essentials

1. **Before creating a new branch**: Make sure we are on the `main` branch.
2. **Get latest changes from origin**: Pull from `origin/main`, if there is one.
3. **Branch naming**: Branch from `main` with a descriptive name: `feature/<slug>`, `fix/<slug>` or `docs/<slug>`.
4. **Commit message format**: Use conventional commits (e.g., `feat: add new feature`).
5. **Pull Request process**: Create PRs with clear descriptions and passing tests.

## PR instructions

- Title format: [<project_name>] <Title>
- Always run `pnpm validate` before committing.
- Update the README.md.
- Update this document.
- Create, or update, the CHANGELOG.md with the changes that were made.
- Bump the version in `package.json` with the appropriate semver: `major`, `minor` or `patch`.
