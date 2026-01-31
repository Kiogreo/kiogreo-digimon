# Agent Development Guide – kiogreo-digimon

> **Purpose**: Standardise how AI agents work in this repo (build, test, style, lint, etc.).
> **Stack**: TypeScript, Bun, OpenCode framework.
> **Last Updated**: 2026-01-31

---

## 1️⃣ Build / Lint / Test Commands

| Goal                     | Command                                    | Notes                                 |
|--------------------------|--------------------------------------------|--------------------------------------|
| Run a TS file (dev)      | `bun <file>.ts`                             | No compile step required             |
| Auto‑reload dev file      | `bun --watch <file>.ts`                     |                                      |
| Type‑check only          | `tsc --noEmit`                              | Fails on TS errors, no output        |
| Continuous type‑check    | `tsc --noEmit --watch`                      |                                      |
| Run **all** tests        | `bun test`                                   | Built‑in Bun test runner             |
| Run **single** test file | `bun test <path>/<file>.test.ts`            | *example:* `bun test src/utils/math.test.ts` |
| Run tests matching pattern | `bun test --grep "<pattern>"`               |                                      |
| Watch tests               | `bun test --watch`                           |                                      |
| Coverage report           | `bun test --coverage`                        |                                      |
| Lint (when ESLint added) | `eslint .`                                   | –                                    |
| Auto‑fix lint             | `eslint --fix .`                            | –                                    |
| Lint single file          | `eslint <file>.ts`                           | –                                    |
| Plugin dev                | `cd .opencode/plugin && bun install && bun run telegram-notify.ts` |
| Tool dev                  | `cd .opencode/tool && bun install && bun run gemini/index.ts` |
| OpenCode agents           | `opencode --agent openagent` (recommended)  |
|                           | `opencode --agent opencoder` (dev specialist) |

---

## 2️⃣ Code‑Style Guidelines

### Formatting
- **Indent**: 2 spaces (no tabs)
- **Quotes**: double (`"`) everywhere
- **Semicolons**: required
- **Line length**: ≤ 100 chars (prefer ≤ 80)
- **Trailing commas** in multiline literals

### Naming Conventions
| Element                | Convention          | Example                     |
|------------------------|--------------------|-----------------------------|
| Files                  | `kebab-case.ts`    | `telegram-notify.ts`        |
| Classes                | `PascalCase`       | `SimpleTelegramBot`        |
| Functions              | `camelCase`        | `generateImage`              |
| Constants              | `UPPER_SNAKE_CASE`| `DEFAULT_TIMEOUT`           |
| Interfaces / Types      | `PascalCase`       | `ImageConfig`               |
| Variables              | `camelCase`        | `outputDir`                 |

### Imports (grouped, one per line)
```ts
// 1️⃣ Types
import type { Plugin } from "@opencode-ai/plugin";

// 2️⃣ External libs
import { readFile } from "fs/promises";

// 3️⃣ Internal utils
import { resolve, join } from "path";
```

### Functional‑Programming & Error Handling *(from `code-quality.md`)*
- **Pure functions** – same input → same output, no side‑effects.
- **Immutability** – never mutate arguments; use spread / `Object.assign` or array copies.
- **Composition** – build larger behaviour from small, focused functions.
- **Explicit dependencies** – inject collaborators (e.g., DB, logger) via parameters, never import globals.
- **Error handling** – return `{ success: boolean, data?, error? }` objects or throw explicit errors; avoid `console.log` inside pure logic.

### Documentation Standards
- **Golden Rule**: If the same question is asked twice, document it.
- **What to document** – why decisions were made, complex algorithms, public APIs, setup, limitations, architecture diagrams.
- **What NOT to document** – obvious code, self‑explanatory logic, stale information.

#### README Template
```markdown
# Project Name
Brief description (1‑2 sentences)

## Features
- Feature 1
- Feature 2

## Installation
```bash
npm install package-name
```

## Quick Start
```js
const result = doSomething();
```

## Usage
[Detailed examples]

## API Reference
[If applicable]

## Contributing
[Link to CONTRIBUTING.md]

## License
[License type]
```

#### Function JSDoc Example
```js
/**
 * Calculate total price including tax.
 * @param {number} price - Base price.
 * @param {number} taxRate - Tax rate (0‑1).
 * @returns {number} Total with tax.
 * @example
 * calculateTotal(100, 0.1) // 110
 */
function calculateTotal(price, taxRate) {
  return price * (1 + taxRate);
}
```

---

## 3️⃣ Testing Standards (from `test-coverage.md`)

**Golden Rule** – If you can’t test it easily, refactor it.

### AAA Pattern
```js
test('calculateTotal returns sum of item prices', () => {
  // Arrange
  const items = [{ price: 10 }, { price: 20 }, { price: 30 }];

  // Act
  const result = calculateTotal(items);

  // Assert
  expect(result).toBe(60);
});
```

### What to Test (✅ DO)
- Happy path & typical usage
- Edge cases (empty, null, boundaries)
- Error cases (invalid input, failures)
- Business logic & public APIs

### What NOT to Test (❌ DON'T)
- Third‑party libraries / framework internals
- Simple getters/setters or private implementation details

### Coverage Goals
- **Critical** (100 %): Core business logic, data transformations
- **High** (90 %+): Public APIs, user‑facing features
- **Medium** (80 %+): Utility helpers
- **Low** (optional): Simple wrappers

### Test Naming
```js
// ✅ Good
test('calculateDiscount returns 10% off for premium users', () => {});

// ❌ Bad
test('it works', () => {});
```

### Dependency‑Injection Testing Example
```js
function createUserService(database) {
  return { getUser: (id) => database.findById('users', id) };
}

test('getUser retrieves from database', () => {
  const mockDb = { findById: jest.fn().mockReturnValue({ id: 1, name: 'John' }) };
  const service = createUserService(mockDb);
  const user = service.getUser(1);
  expect(mockDb.findById).toHaveBeenCalledWith('users', 1);
  expect(user).toEqual({ id: 1, name: 'John' });
});
```

---

## 4️⃣ Repository‑Wide Rules (if present)

- **Cursor rules**: none found (`.cursor/rules/` empty).
- **Copilot instructions**: none found (`.github/copilot‑instructions.md` missing).

*If such files appear later, add a short “⚙️ Rules” section summarising their directives.*

---

## 5️⃣ How to Use This File

1. Keep this file at the repository root as `AGENTS.md`.
2. Update it whenever new tooling, style decisions, or standards are introduced.
3. All AI agents **must read** this file **before** performing any code changes.

---

*End of guide.*