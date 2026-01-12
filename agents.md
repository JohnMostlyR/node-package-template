---
name: "Node Package Template"
description: "A modern Node.js package template with TypeScript, ESLint, Prettier, and Vitest. Designed for building scalable and maintainable npm packages."
category: "Node.js Package"
author: "Your Name"
authorUrl: "https://github.com/yourusername"
tags: ["node.js", "typescript", "npm", "template", "package"]
lastUpdated: "2026-01-12"
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
node-package-template/
├── src/
│   └── index.ts              # Main package entry point
├── tests/
│   └── index.test.ts         # Test suite
├── build.config.ts           # Build configuration
├── eslint.config.js          # ESLint configuration
├── prettier.config.js        # Prettier configuration
├── vitest.config.ts          # Vitest configuration
├── tsconfig.json             # TypeScript configuration
├── package.json              # Package metadata and dependencies
├── pnpm-lock.yaml            # Dependency lock file
├── pnpm-workspace.yaml       # Workspace configuration
├── LICENSE                   # Project license
└── README.md                 # Project documentation
```

## Development Guidelines

### Code Style

- Use TypeScript for type safety
- Follow ESLint rules defined in eslint.config.js
- Format code with Prettier before committing
- Keep code clean, readable, and maintainable

### Naming Conventions

- **File naming**: Use kebab-case for files (e.g., `util-functions.ts`)
- **Variable naming**: Use camelCase (e.g., `const maxRetries = 5`)
- **Function naming**: Use camelCase descriptive names (e.g., `async function fetchData()`)
- **Class naming**: Use PascalCase (e.g., `class DataProcessor`)

### Git Workflow

- **Branch naming**: Use `feature/`, `fix/`, or `docs/` prefixes
- **Commit message format**: Use conventional commits (e.g., `feat: add new feature`)
- **Pull Request process**: Create PRs with clear descriptions and passing tests

## Environment Setup

### Development Requirements

- Node.js: Latest LTS version (v18 or higher recommended)
- Package manager: PNPM (v8 or higher)
- Operating System: Cross-platform (Windows, macOS, Linux)

### Installation Steps

```bash
# 1. Clone the project
git clone https://github.com/yourusername/node-package-template.git

# 2. Navigate to project directory
cd node-package-template

# 3. Install dependencies
pnpm install

# 4. Start development
pnpm run dev
```

## Core Feature Implementation

### Main Export

The package exports functionality from `src/index.ts`. Implement your main features here:

```typescript
// src/index.ts
export function greet(name: string): string {
  return `Hello, ${name}!`;
}

export const version = "1.0.0";
```

### Module Organization

Organize your package code into logical modules:

- `src/utils/` - Utility functions
- `src/types/` - TypeScript type definitions
- `src/core/` - Core business logic

## Testing Strategy

### Unit Testing

- **Testing framework**: Vitest
- **Test coverage requirements**: Aim for 80%+ coverage
- **Test file organization**: Collocate tests with source files using `.test.ts` suffix

```bash
# Run tests
pnpm run test

# Run tests with coverage
pnpm run test:coverage

# Watch mode
pnpm run test:watch
```

### Integration Testing

- Write tests that verify multiple modules work together
- Test public API contracts
- Mock external dependencies appropriately

## Deployment Guide

### Build Process

```bash
# Build the package
pnpm run build
```

### Publishing Steps

1. Update version in package.json following semantic versioning
2. Update CHANGELOG
3. Create a git tag matching the version
4. Push changes and tag to main branch
5. Publish to npm registry:
   ```bash
   pnpm publish
   ```

### Environment Variables

Configure any required environment variables:

```env
# Example configuration
NODE_ENV=development
DEBUG=false
```

## Performance Optimization

### Build Optimization

- Use tree-shaking to minimize bundle size
- Configure proper entry points in package.json
- Consider using `exports` field for conditional exports

### Code Optimization

- Avoid synchronous operations in async functions
- Use lazy loading for large dependencies
- Profile code for memory leaks

## Security Considerations

### Data Security

- Validate all user inputs
- Avoid hardcoding sensitive information
- Use environment variables for secrets

### Package Security

- Keep dependencies up to date: `pnpm outdated`
- Audit for vulnerabilities: `pnpm audit`
- Use npm provenance for published packages

## Monitoring and Logging

### Application Monitoring

- Monitor package performance metrics
- Track error rates in production
- Use semantic versioning for breaking changes

### Logging

- Use structured logging for better debugging
- Log important operations and errors
- Configure appropriate log levels

## Common Issues

### Issue 1: TypeScript Compilation Errors

**Solution**: Ensure your `tsconfig.json` is properly configured and all types are correctly imported. Run `pnpm run build` to check compilation.

### Issue 2: Tests Failing After Updates

**Solution**: Update test dependencies and check for breaking changes. Run `pnpm update` and review test output carefully.

### Issue 3: Linting Errors on Commit

**Solution**: Run `pnpm run lint:fix` to auto-fix linting issues before committing.

## Reference Resources

- [TypeScript Documentation](https://www.typescriptlang.org/)
- [Vitest Documentation](https://vitest.dev/)
- [ESLint Configuration Guide](https://eslint.org/docs/latest/use/configure/)
- [NPM Package Publishing Guide](https://docs.npmjs.com/packages-and-modules/contributing-packages-to-the-registry)
- [Semantic Versioning](https://semver.org/)

## Changelog

### v1.0.0 (2026-01-12)

- Initial release
- TypeScript configuration
- ESLint and Prettier setup
- Vitest testing framework
- Basic project structure

---

**Note**: Customize this documentation with your specific project details, remove inapplicable sections, and add project-specific implementation details as needed.
