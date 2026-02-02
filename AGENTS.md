# AGENTS.md for node-package-template

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

## Commands

- `pnpm build` - Build
- `pnpm clean` - Remove untracked files and directories
- `pnpm coverage` - Code coverage
- `pnpm format` - Format code
- `pnpm lint` - Lint & fix
- `pnpm test` - Run tests
- `pnpm test:watch` - Watch mode
- `pnpm typecheck` - Type check
- `pnpm validate` - All checks

## Project Structure

- `src/` - Main TypeScript source code
- `tests/` - Integration tests and test infrastructure

## General Coding Rules

**IMPORTANT:**

- Prefer **explicit, readable code** over clever abstractions
- Avoid unnecessary dependencies
- Do not introduce breaking changes without documentation
- New code must be [tested](#testing)
- Do not modify public APIs without updating:
  - Types
  - Tests
  - Relevant documentation (e.g. `JSDoc`, `README.md`, `AGENTS.md`)
- **[VALIDATION CHECKPOINT]** After creating, or making changes to, any code...
  - Run `pnpm lint` and fix any errors until all errors are resolved
  - Run `pnpm format`
  - Run `pnpm typecheck` and fix any errors until all errors are resolved
  - Run `pnpm test` and fix any errors until the whole suite is green
  - Run `pnpm coverage` and and aim for 80%+ coverage
  - Repeat all these steps until all issues are solved
- **[DOCUMENT CHECKPOINT]** After creating, or making changes to, any code...
  - Update README.md
  - Update AGENTS.md
- **[CLEANUP CHECKPOINT]** Before completing any task, delete all temporary files you created
  - Any file created for debugging, testing, or investigation purposes
  - Examples: `test-output.txt`, `debug.log`, `*.temp`, `*.tmp`, `scratch.*`, helper scripts
  - Check both root and subdirectories (packages/_, apps/_, tooling/\*)
  - Files used for investigation but not part of the codebase
  - Use `file_search` to verify no temporary files remain before task completion

---

## TypeScript Conventions

- Prefer interfaces/types already defined in shared packages
- Export types explicitly
- Put shared types in a separate `types.ts`

---

## Testing

**IMPORTANT:**

- Never run Vitest with the option `--passWithNoTests` or `--pass-with-no-tests`
- Use best practices as described in `.agents/docs/testing-best-practices.md`!.
- New behavior should include tests where practical
- Do not delete tests unless the behavior is removed intentionally
- Keep tests deterministic and isolated
- Use the `describe-it` pattern consistently with existing patterns.
- The name of a test must start with 'should' so it reeds like it-should
- Do not add tests to the wrong test suite (e.g., adding to end of file instead of inside relevant suite).

---

## Documenting

- Avoid the use of abbreviations, _unless_ commonly used by the intended audience

### Comments

- Use JSDoc style comments for `functions`, `interfaces`, and `classes`.

### Common rules for markdown and JSDoc

- Use `shell` for example code that runs in the command-line interface.

  Example:

  ```shell
  pnpm add -D prettier
  ```

- Do not sound like a salesman by avoiding words like 'comprehensive' and 'powered' as much as possible.

---

## Versioning & Changes

- Follow semantic versioning for packages
- Update changelogs or release notes when required
- Avoid combining unrelated changes in a single commit

---

## Safety Rules for Automated Changes

Automated agents must:

- Make the smallest possible change to achieve the goal
- Avoid large refactors unless explicitly requested
- Never remove code without understanding its usage
- Preserve backward compatibility unless instructed otherwise
- Never loosen or override any rules as stated in `eslint.config.js`
- Prevent the need to loosen or override any linting rule with directives.
  Common exceptions are:
  - The use of the `any` type were it is common (e.g. `chunks` in streams)
  - The `max-param` rule where it would otherwise make the code less readable
  - Too expensive to change in an older codebase
- Never loosen any rules as stated in `tsconfig.json` **without** asking

If uncertain, **stop and ask for clarification**.
