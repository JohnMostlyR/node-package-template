---
Original: 'javascript-testing-best-practices'
description: '📗🌐 🚢 Comprehensive and exhaustive JavaScript & Node.js testing best practices (August 2025)'
author: 'Yoni Goldberg'
url: 'https://github.com/goldbergyoni/javascript-testing-best-practices'
license: 'https://github.com/goldbergyoni/javascript-testing-best-practices/blob/master/LICENSE'
lastUpdated: '2023-08-08'
---

# Testing Best Practices - Agent Guideline

Quick reference for writing effective, maintainable tests. Keep tests simple, clear, and focused.

---

## Core Principle

**Keep tests simple and immediately understandable.** Minimize cognitive load. Test only what matters.

---

## Test Anatomy: Essential Practices

### 1. Three-Part Test Names

**Include:** What + Scenario + Expected Result

```javascript
describe('ProductService', () => {
  describe('addNewProduct', () => {
    it('Should reject when no price provided', () => {});
  });
});
```

### 2. Arrange-Act-Assert Pattern

```javascript
it('Should classify customer as premium when spent $500+', () => {
  // Arrange: setup
  const customer = { spent: 505, id: 1 };
  // Act: execute
  const result = classifyCustomer(customer);
  // Assert: verify
  expect(result).toBe('premium');
});
```

### 3. Black-Box Testing Only

Test public behavior, not internals. If public behavior is correct, internals are implicitly tested.

```javascript
// ✗ Wrong: testing internals
expect(service.internalCalculateVAT(0)).toBe(0);

// ✓ Right: testing public behavior
expect(service.getFinalPrice(0)).toBe(0);
```

### 4. Use Stubs & Spies Over Mocks

Stubs and spies test behavior; mocks test internals.

```javascript
// ✓ Right: verify behavior
const stub = sinon.stub(paymentService, 'process').returns('error');
await processOrder(order);
expect(sendEmail.called).toBe(true);
```

### 5. Use Realistic Input Data

```javascript
// ✗ Wrong: placeholder
addProduct('Foo', 50);

// ✓ Right: realistic data
addProduct('iPhone Pro Max', 1299);
```

### 6. Short Inline Snapshots Only

Keep snapshots 3-7 lines, inline, not external.

```javascript
expect(menu).toMatchInlineSnapshot(`
  <ul>
    <li>Home</li>
  </ul>
`);
```

### 7. Expect Errors, Don't Catch

```javascript
// ✗ Wrong: try-catch boilerplate
try {
  addProduct({});
  expect.fail();
} catch (e) {
  expect(e.status).toBe(400);
}

// ✓ Right: dedicated assertion
await expect(addProduct({})).rejects.toThrow('Missing price');
```

### 8. Tag Tests for Selective Running

```javascript
describe('OrderService', () => {
  describe('Add order #cold-test #sanity', () => {
    it('Should validate input', () => {});
  });
});
```

Run: `mocha --grep 'cold-test'`

### 9. Organize Tests Hierarchically

```javascript
describe('TransferService', () => {
  describe('When transfer is valid', () => {
    it('Should succeed', () => {});
  });
  describe('When account has no credit', () => {
    it('Should fail with 409', () => {});
  });
});
```

### 10. BDD-Style Assertions

```javascript
// ✓ Right: declarative
expect(admins).toEqual(['admin1', 'admin2']);
expect(admins).not.toContain('user1');

// ✗ Wrong: imperative
admins.forEach((admin) => {
  if (admin === 'user1') assert.fail();
});
```

### 11. Copy Code Strategically

Include only details that affect test result. Use factories for complex setup.

```javascript
// ✗ Wrong: 500 lines of JSON
const transfer = {
  /* massive data */
};

// ✓ Right: highlight what matters
const transfer = createTransfer({ sender: undefined });
expect(response.status).toBe(409); // Obviously fails
```

### 12. Don't Test Implementation Details

Focus on user-facing behavior and requirements, not internal logic.

---

## Backend Testing

### Core Principles

- **Test behavior, not implementation** - API perspective, not code structure
- **Mock external services** - Use stubs for third-party APIs
- **Test error scenarios** - Timeouts, invalid responses, missing data
- **Keep DB tests isolated** - Use transactions to rollback after each test
- **Use async/await** - Not callbacks or nested promises

### API Endpoint Test Example

```javascript
describe('POST /api/orders', () => {
  describe('When valid order data provided', () => {
    it('Should create order and return 201', async () => {
      const orderData = { item: 'laptop', qty: 1, price: 999 };
      const response = await request(app).post('/api/orders').send(orderData);

      expect(response.status).toBe(201);
      expect(response.body.id).toBeDefined();
    });
  });
});
```

---

## Code Quality Rules

- **No `any` or `unknown`** - Use proper types
- **No duplicate imports** - Reuse existing imports
- **No `enums`** - Use union types or constants
- **No optional chaining `?.`** - Use null checks
- **Prefer functions over arrow functions** - Better stack traces
- **No global types** - Keep types local unless shared
- **No code duplication** - Extract and reuse utilities

---

## Pre-Commit Checklist

Before committing:

```bash
pnpm lint      # Fix linting errors
pnpm format    # Auto-format code
pnpm typecheck # Fix type errors
pnpm test      # All tests must pass
pnpm coverage  # Aim for 75%+
```

For PRs:

- All tests passing
- Coverage maintained or improved
- No linting/type errors
- Conventional commit format: `feat:`, `fix:`, `docs:`
