/**
 * Node Package Template
 *
 * Initial starter for creating your own Node.js package with TypeScript.
 *
 * This module is currently used to validate that the development dependencies
 * are working correctly.
 */
import { exec } from 'node:child_process';
import { promisify } from 'node:util';
import { ESLint } from 'eslint';
import * as prettier from 'prettier';
import * as ts from 'typescript';

const execAsync = promisify(exec);

export const name = 'node-package-template';

/**
 * Validates TypeScript compilation works correctly
 */
export async function validateTypeScript(code: string): Promise<boolean> {
  const result = ts.transpileModule(code, {
    compilerOptions: {
      module: ts.ModuleKind.ESNext,
      target: ts.ScriptTarget.ES2022,
    },
  });

  return result.outputText.length > 0;
}

/**
 * Validates ESLint is working correctly
 */
export async function validateESLint(
  code: string,
): Promise<{ ruleId: string | null; message: string }[]> {
  const eslint = new ESLint({
    overrideConfigFile: true,
    overrideConfig: {
      languageOptions: {
        ecmaVersion: 2022,
        sourceType: 'module',
      },
      rules: {
        semi: ['error', 'always'],
      },
    },
  });

  const results = await eslint.lintText(code);

  return results[0]?.messages ?? [];
}

/**
 * Validates Prettier is working correctly
 */
export async function validatePrettier(code: string): Promise<string> {
  const formatted = await prettier.format(code, {
    parser: 'typescript',
    semi: true,
    singleQuote: true,
  });

  return formatted;
}

/**
 * Validates rimraf command exists
 */
export async function validateRimraf(): Promise<boolean> {
  try {
    await execAsync('pnpm rimraf --help');
    return true;
  } catch {
    return false;
  }
}

/**
 * Validates unbuild command exists
 */
export async function validateUnbuild(): Promise<boolean> {
  try {
    await execAsync('pnpm unbuild --help');
    return true;
  } catch {
    return false;
  }
}
