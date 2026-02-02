// @ts-check
import * as Path from 'node:path';
import { fileURLToPath } from 'node:url';
import { includeIgnoreFile } from '@eslint/compat';
import commentsPlugin from 'eslint-plugin-consistent-comments';
import sonarjs from 'eslint-plugin-sonarjs';
import tseslint from 'typescript-eslint';

const GITIGNORE_PATH = Path.join(
  Path.dirname(fileURLToPath(import.meta.url)),
  '.gitignore',
);

/**
 * @type {any[]}
 */
export const config = [
  includeIgnoreFile(GITIGNORE_PATH),
  ...(sonarjs.configs?.recommended ? [sonarjs.configs.recommended] : []),
  ...tseslint.configs.strict,
  ...tseslint.configs.stylistic,
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        parser: tseslint.parser,
        projectService: false,
        sourceType: 'module',
      },
    },
    plugins: {
      comments: commentsPlugin,
      '@typescript-eslint': tseslint.plugin,
    },
    rules: {
      /* Comment style enforcement */
      'comments/comment-style': 'error',

      /* General coding rules */
      'prefer-named-capture-group': 'error',
      'prefer-arrow-callback': 'error',
      'func-style': ['error', 'declaration', { allowArrowFunctions: true }],
      'max-params': ['warn', 4],
      'no-duplicate-imports': ['error', { allowSeparateTypeImports: true }],
      'prefer-rest-params': 'off',

      /* TypeScript-specific rules */
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
      '@typescript-eslint/consistent-type-imports': [
        'error',
        { prefer: 'type-imports' },
      ],
      '@typescript-eslint/no-namespace': 'error',

      /* Naming conventions per CODING_RULES.md */
      '@typescript-eslint/naming-convention': [
        'error',
        /* Variables and functions: camelCase */
        {
          selector: 'variable',
          format: ['camelCase'],
          leadingUnderscore: 'allowSingleOrDouble',
          trailingUnderscore: 'allowSingleOrDouble',
        },
        {
          selector: 'function',
          format: ['camelCase'],
          leadingUnderscore: 'allowSingleOrDouble',
        },

        /* Constants: UPPER_SNAKE_CASE (allow camelCase for non-const or imported) */
        {
          selector: 'variable',
          modifiers: ['const'],
          format: ['camelCase', 'UPPER_CASE'],
          leadingUnderscore: 'allowSingleOrDouble',
          trailingUnderscore: 'allowSingleOrDouble',
        },

        /* Classes and types: PascalCase */
        {
          selector: 'class',
          format: ['PascalCase'],
        },
        {
          selector: 'typeParameter',
          format: ['PascalCase'],
        },

        /* Interfaces: PascalCase with 'I' prefix */
        {
          selector: 'interface',
          format: ['PascalCase'],
          custom: {
            regex: '^I[A-Z]',
            match: true,
          },
        },

        /* Type aliases: PascalCase with 'Type' suffix */
        {
          selector: 'typeAlias',
          format: ['PascalCase'],
          custom: {
            regex: 'Type$',
            match: true,
          },
        },

        /* Enum members: PascalCase or UPPER_CASE (but enums are discouraged) */
        {
          selector: 'enumMember',
          format: ['PascalCase', 'UPPER_CASE'],
        },
      ],

      /* Discourage enums (use union types or constants instead) */
      '@typescript-eslint/prefer-enum-initializers': 'error',
      '@typescript-eslint/prefer-literal-enum-member': 'error',

      /* SonarJS rules */
      'sonarjs/todo-tag': 'warn',
    },
  },

  /* Disable sonarjs/no-nested-functions for test files (nested functions are common in test suites) */
  {
    files: ['**/*.test.ts', '**/*.test.tsx', '**/*.spec.ts', '**/*.spec.tsx'],
    rules: {
      'sonarjs/no-nested-functions': 'off',
    },
  },
];

export default config;
