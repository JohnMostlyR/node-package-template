import { describe, expect, it } from 'vitest';

import { name } from '../src/index.js';

describe('node-package-template', () => {
  describe('name', () => {
    it('should be node-package-template', () => {
      expect(name).toBe('node-package-template');
    });
  });
});
