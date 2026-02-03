import { defineConfig } from 'vitest/config';

/**
 * Base Vitest configuration shared across all packages.
 * Provides sensible defaults for test isolation, mocking, and coverage.
 * @see https://vitest.dev/config/
 */
const baseConfig = defineConfig({
  test: {
    /* Test Execution */
    globals: false,
    passWithNoTests: true,

    /* Mock & State Management - Ensures test isolation */
    restoreMocks: true,
    clearMocks: true,
    mockReset: true,

    /* Performance & Compatibility - Turbo + pnpm friendly */
    pool: 'forks',

    /* Timeouts */
    testTimeout: 10000,
    hookTimeout: 10000,

    /* Reporting */
    reporters: ['verbose'],

    coverage: {
      provider: 'v8',
      reporter: ['text', 'text-summary', 'html', 'lcov', 'json'],
      reportsDirectory: './reports/coverage',

      /* Exclude non-testable code */
      exclude: [
        '**/*.d.ts',
        '**/*.test.{ts,tsx}',
        '**/*.spec.{ts,tsx}',
        '**/tests/**',
        '**/dist/**',
        '**/node_modules/**',
        '**/index.{ts,tsx}',
      ],

      /* Coverage thresholds */
      thresholds: {
        lines: 80,
        statements: 80,
        functions: 80,
        branches: 70,
      },
    },
  },
});

export default baseConfig;
