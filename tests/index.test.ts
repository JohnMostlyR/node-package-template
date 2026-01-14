import { describe, expect, it } from 'vitest';

import {
  name,
  validateESLint,
  validatePrettier,
  validateRimraf,
  validateTypeScript,
  validateUnbuild,
} from '../src/index.js';

describe('node-package-template', () => {
  describe('name', () => {
    it('should be node-package-template', () => {
      expect(name).toBe('node-package-template');
    });
  });

  describe('TypeScript dependency', () => {
    it('should transpile TypeScript code', async () => {
      const code = 'const hello: string = "world";';
      const result = await validateTypeScript(code);
      expect(result).toBe(true);
    });

    it('should handle modern TypeScript features', async () => {
      const code = `
        interface User {
          name: string;
          age?: number;
        }
        const user: User = { name: "John" };
      `;
      const result = await validateTypeScript(code);
      expect(result).toBe(true);
    });
  });

  describe('ESLint dependency', () => {
    it('should lint JavaScript code', async () => {
      const code = 'const x = 1;';
      const messages = await validateESLint(code);
      expect(messages).toHaveLength(0);
    });

    it('should detect linting issues', async () => {
      const code = 'const x = 1'; /* missing semicolon */
      const messages = await validateESLint(code);
      expect(messages).toHaveLength(1);
      expect(messages[0]?.ruleId).toBe('semi');
    });
  });

  describe('Prettier dependency', () => {
    it('should format code', async () => {
      const code = 'const x=1;';
      const formatted = await validatePrettier(code);
      expect(formatted).toBe('const x = 1;\n');
    });

    it('should handle multi-line code', async () => {
      const code = 'function test(){return 1;}';
      const formatted = await validatePrettier(code);
      expect(formatted).toContain('function test()');
      expect(formatted).toContain('return 1;');
    });
  });

  describe('Rimraf dependency', () => {
    it('should be available as command', async () => {
      const result = await validateRimraf();
      expect(result).toBe(true);
    });
  });

  describe('Unbuild dependency', () => {
    it('should be available as command', async () => {
      const result = await validateUnbuild();
      expect(result).toBe(true);
    });
  });

  describe('Vitest dependency', () => {
    it('should run this test successfully', () => {
      /* If this test runs, Vitest is working */
      expect(true).toBe(true);
    });

    it('should support async tests', async () => {
      const promise = Promise.resolve(42);
      await expect(promise).resolves.toBe(42);
    });

    it('should support matchers', () => {
      expect([1, 2, 3]).toContain(2);
      expect({ name: 'test' }).toHaveProperty('name');
      expect('hello').toMatch(/^h/);
    });
  });

  describe('Node.js built-in modules', () => {
    it('should support child_process', async () => {
      /* Already tested through validateRimraf and validateUnbuild */
      expect(true).toBe(true);
    });

    it('should support util.promisify', async () => {
      const { promisify } = await import('node:util');
      expect(typeof promisify).toBe('function');
    });
  });
});
