# Agent Development Guide – kiogreo-digimon

> **Purpose**: Provide a single source of truth for AI agents operating in this repository – build, test, style, lint, and documentation standards.
> **Stack**: TypeScript, Bun, OpenCode framework.
> **Last Updated**: 2026-02-01

---

## 1️⃣ Build / Lint / Test Commands

| Goal | Command | Notes |
|------|---------|-------|
| Run a TS file (dev) | `bun <file>.ts` | No compile step needed |
| Auto‑reload dev file | `bun --watch <file>.ts` | |
| Type‑check only | `tsc --noEmit` | Fails on TS errors |
| Run **all** tests | `bun test` | Built‑in Bun test runner |
| Run **single** test file | `bun test <path>/<file>.test.ts` | Example: `bun test src/utils/math.test.ts` |
| Run tests matching pattern | `bun test --grep "<pattern>"` | |
| Watch tests | `bun test --watch` | |
| Coverage report | `bun test --coverage` | |
| Lint (if ESLint present) | `eslint .` | |
| Auto‑fix lint | `eslint --fix .` | |
| Lint single file | `eslint <file>.ts` | |
| OpenCode agents | `opencode --agent openagent` (recommended) | |

---

## 2️⃣ Code‑Style Guidelines

### Formatting
- **Indent**: 2 spaces (no tabs)
- **Quotes**: double (`"`) everywhere
- **Semicolons**: required
- **Line length**: ≤ 100 chars (prefer ≤ 80)
- **Trailing commas** in multiline literals

### Naming Conventions
| Element | Convention | Example |
|--------|------------|---------|
| Files | `kebab-case.ts` | `telegram-notify.ts` |
| Classes | `PascalCase` | `SimpleTelegramBot` |
| Functions | `camelCase` | `generateImage` |
| Constants | `UPPER_SNAKE_CASE` | `DEFAULT_TIMEOUT` |
| Interfaces / Types | `PascalCase` | `ImageConfig` |
| Variables | `camelCase` | `outputDir` |

### Imports (grouped, one per line)
```ts
// 1️⃣ Types
import type { Plugin } from "@opencode-ai/plugin";

// 2️⃣ External libs
import { readFile } from "fs/promises";

// 3️⃣ Internal utils
import { resolve, join } from "path";
```

### Functional‑Programming & Error Handling (from `code-quality.md`)
- **Pure functions** – same input → same output, no side‑effects.
- **Immutability** – never mutate arguments; use spread or `Object.assign`.
- **Composition** – build larger behaviour from small, focused functions.
- **Explicit dependencies** – inject collaborators via parameters, never import globals.
- **Error handling** – return `{ success: boolean, data?, error? }` objects or throw explicit errors; avoid `console.log` in pure logic.

### Documentation Standards
- **Golden Rule**: If the same question is asked twice, document it.
- **What to document** – why decisions were made, complex algorithms, public APIs, setup, limitations.
- **What NOT to document** – obvious code, self‑explanatory logic, stale information.
- **README template** and **JSDoc** examples are provided in the repository’s `docs/` folder.

---

## 3️⃣ Testing Standards (from `test-coverage.md`)

- **AAA Pattern**: `Arrange → Act → Assert`.
- **Golden Rule**: If you can’t test it easily, refactor it.
- **Coverage Goals**: Critical (100 %), High (90 %+), Medium (80 %+).
- **What to test** – happy path, edge cases, error cases, business logic, public APIs.
- **What NOT to test** – third‑party libraries, framework internals, simple getters/setters.

### Example test (Jest)
```ts
test('calculateTotal returns sum of item prices', () => {
  // Arrange
  const items = [{ price: 10 }, { price: 20 }, { price: 30 }];

  // Act
  const result = calculateTotal(items);

  // Assert
  expect(result).toBe(60);
});
```

### Dependency‑Injection testing example
```ts
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
