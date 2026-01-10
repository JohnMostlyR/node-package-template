# node-package-template

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Coverage Status](https://img.shields.io/badge/coverage-reports-green)](./reports/coverage/index.html)

A minimal, well‑opinionated starter template for TypeScript Node packages. It includes:

- TypeScript for authoring the package
- Unbuild for producing ESM/CJS builds and types
- Vitest for testing and coverage (V8)
- ESLint and Prettier for linting & formatting

This repository is intended as a template you can copy when starting a new npm package.

## Quick start

Clone the template, install dependencies, and run the default tasks:

1. Install dependencies

```powershell
pnpm install
```

2. Run tests

```powershell
pnpm test
```

3. Build the package

```powershell
pnpm build
```

## Package scripts

The template exposes a set of convenient npm scripts (see `package.json`):

- `pnpm build` — Build with `unbuild` (outputs CJS/ESM and type declarations into `dist`).
- `pnpm clean` — Clean untracked/build artifacts using `git clean`.
- `pnpm deps:check` - Interactively update dependencies.
- `pnpm deps:verify` - Run this after installing the updated dependencies.
- `pnpm test` — Run tests once with Vitest.
- `pnpm test:watch` — Run Vitest in watch mode for TDD.
- `pnpm coverage` — Run tests and produce coverage reports (see `reports/coverage`).
- `pnpm lint` — Run ESLint and auto‑fix fixable issues.
- `pnpm format` — Run Prettier to format the repository.
- `pnpm typecheck` — Run TypeScript type checks (no emit).

Use `pnpm` (recommended), or substitute `npm` / `yarn` if you prefer.

## Development workflow

1. Create a feature branch from `main`.
2. Implement your feature in `src/` and add tests in `tests/`.
3. Run `pnpm test` and `pnpm lint` locally. Run `pnpm format` to keep code style consistent.
4. Build with `pnpm build` and check the `dist/` output if publishing.

## Testing and coverage

Vitest is configured for fast unit tests. Run `pnpm coverage` to generate coverage output. Open `reports/coverage/index.html` in your browser for the human‑readable report.

## Linting and formatting

- ESLint is installed and wired to the `lint` script. It includes recommended rules and sonarjs plugin.
- Prettier is used for consistent formatting and a Prettier import‑sorting plugin is included.

Run both before committing to keep the repository clean:

```powershell
pnpm lint
pnpm format
```

## Build and distributions

This template uses `unbuild` to generate distributable outputs in `dist/`. The `exports` field in `package.json` is set up to provide both ESM and CommonJS entry points and separate type files for each format.

Before publishing, ensure:

- Tests pass and coverage is acceptable.
- Type checking (`pnpm typecheck`) passes.
- The `dist/` contents look correct after `pnpm build`.

## Publishing

If you publish to npm, follow these steps as a checklist:

1. Bump the package version in `package.json`.
2. Run `pnpm build`.
3. Verify `dist/` contains the expected entry files.
4. Publish using `npm publish --access public` (or your preferred publish command).

Tip: use a release workflow or `np` to automate versioning and publishing.

## Configuration files

You will find the project configuration in these files:

- `tsconfig.json` — TypeScript configuration
- `eslint.config.js` — ESLint configuration
- `prettier.config.js` — Prettier configuration
- `vitest.config.ts` — Vitest configuration
- `build.config.ts` — unbuild configuration

## Compatibility

- Node.js: v18+ recommended
- Vitest: v3.x (configured in the template)

## Contributing

Contributions are welcome. Please open issues and PRs against the repository you copied this template from.

## License

MIT © Johan Meester
