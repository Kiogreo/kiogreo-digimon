# 🎓 Complete Guide: OpenCode Skill Development Best Practices

> Created: 2026-02-01
> Based on the `read-file` skill example

---

## 📋 Executive Summary

The `read-file` skill demonstrates **testable skill development** by separating **core business logic** from **SDK dependencies**.

**Key Results:**
- ✅ **26/26 core function tests pass** (testable logic)
- ❌ **8/8 main run() tests fail** (SDK requires server)
- **Lesson:** Test pure core functions, not SDK-wrapped run()

---

## 🏆 The Golden Rule

> **Separate pure business logic from SDK calls**

```typescript
// ✅ GOOD - Separated
// core.ts (testable)
export async function readFileContent(path: string): Promise<string> {
  return await readFile(path);
}

// index.ts (SDK wrapper)
export async function run(payload: Input): Promise<Output> {
  const client = await createOpencodeClient();  // SDK
  const content = await readFileContent(path);  // Pure!
  await client.tui.showToast({...});            // SDK
}

// ❌ BAD - Mixed
export async function run(payload: Input): Promise<Output> {
  const client = await createOpencodeClient();
  const content = await readFile(path);  // Can't test this part
  await client.tui.showToast({...});
}
```

---

## 📁 Skill Structure

### Standard OpenCode Skill Directory

```
.opencode/skills/{skill-name}/
├── index.ts              # Main run() function + SDK integration
├── core.ts               # Pure business logic (TESTABLE!)
├── input.interface.ts    # Input type definition
├── output.interface.ts   # Output type definition
├── meta.ts               # Skill metadata
└── README.md             # Documentation
```

### File Responsibilities

| File | Purpose | Testable? |
|------|---------|-----------|
| `index.ts` | SDK integration, orchestration | ❌ Hard (needs SDK) |
| `core.ts` | Pure business logic | ✅ Easy (no SDK) |
| `*.interface.ts` | Type definitions | ✅ N/A (types only) |
| `meta.ts` | Metadata | ✅ N/A (static) |

---

## 🔑 Key Design Patterns

### 1. Separation of Concerns

**Pattern:** Extract pure functions to `core.ts`

```typescript
// core.ts
export function sanitizeFilePath(path: string): string {
  if (!path?.trim()) {
    throw new Error("File path cannot be empty");
  }
  return path.trim();
}

export async function readFileContent(filePath: string, encoding: string): Promise<string> {
  return await readFile(filePath, encoding);
}

export async function getFileInfo(filePath: string): Promise<{size: number, timestamp: string}> {
  const stats = await stat(filePath);
  return { size: stats.size, timestamp: stats.mtime.toISOString() };
}

export function formatFileSize(bytes: number): string {
  const units = ["B", "KB", "MB", "GB", "TB"];
  if (bytes === 0) return "0 B";
  const size = Math.floor(Math.log(bytes) / Math.log(1024));
  const value = bytes / Math.pow(1024, size);
  return `${value.toFixed(2)} ${units[size]}`;
}
```

**In `index.ts`:**
```typescript
import {
  sanitizeFilePath,
  readFileContent,
  getFileInfo,
  formatFileSize
} from "./core";
import { createOpencodeClient } from "@opencode-ai/sdk/v2";

export async function run(payload: Input): Promise<Output> {
  // SDK at the top
  const client = await createOpencodeClient();

  // Core functions in the middle (testable!)
  const filePath = sanitizeFilePath(payload.filePath);
  const content = await readFileContent(filePath, encoding);
  const fileInfo = await getFileInfo(filePath);
  const humanSize = formatFileSize(fileInfo.size);

  // SDK at the bottom
  await client.tui.showToast({ message: "Success!", variant: "success" });

  return { content, size: fileInfo.size, encoding, exists: true, humanSize };
}
```

---

### 2. Function-Level Exports

Export every function you might want to test:

```typescript
// ✅ GOOD - Export everything
export function sanitizeFilePath(path: string): string { ... }
export async function readFileContent(path: string): Promise<string> { ... }
export async function getFileInfo(path: string): Promise<Info> { ... }
export function formatFileSize(bytes: number): string { ... }

// ❌ BAD - Only export run()
export async function run(payload: Input): Promise<Output> { ... }
function sanitizeFilePath(path: string): string { ... }  // Private!
```

**Test can import directly:**
```typescript
import {
  sanitizeFilePath,
  formatFileSize,
  getFileInfo
} from "../.opencode/skills/read-file/core";

test("formatFileSize works", () => {
  expect(formatFileSize(1024)).toBe("1.00 KB");
});
```

---

### 3. Pure Functions

Use pure functions where possible (same input → same output):

```typescript
// ✅ PURE - Easy to test
export function formatFileSize(bytes: number): string {
  const units = ["B", "KB", "MB"];
  const size = Math.floor(Math.log(bytes) / Math.log(1024));
  return `${bytes / Math.pow(1024, size)} ${units[size]}`;
}

// ❌ IMPURE - Hard to test (depends on external state)
export function formatFileSize(): string {
  const bytes = getCurrentFileBytes();  // Side effect!
  return `${bytes / 1024} KB`;
}
```

**Benefits:**
- Easy to test (no setup, no mocks)
- Predictable behavior
- Better performance (can be Memoized)

---

### 4. Input Validation

Validate inputs early and throw clear errors:

```typescript
export function sanitizeFilePath(path: string): string {
  // 1. Check for empty
  if (!path?.trim()) {
    throw new Error("File path cannot be empty");
  }

  // 2. Security check (null bytes)
  if (path.includes("\0")) {
    throw new Error("File path cannot contain null bytes");
  }

  // 3. Normalize
  return path.trim();
}
```

**Benefits:**
- Fail fast (before expensive operations)
- Clear error messages
- Security hardening

---

### 5. Error Handling

Use proper TypeScript error handling:

```typescript
try {
  const content = await readFile(filePath, encoding);
  return content;
} catch (error: unknown) {
  // Check for specific error types
  const isFileNotFound =
    error instanceof Error &&
    "code" in error &&
    (error as { code: string }).code === "ENOENT";

  if (isFileNotFound) {
    return [];  // Or handle gracefully
  }

  // Re-throw unexpected errors
  throw error;
}
```

**Pattern:**
- Use `error: unknown` (not `any`)
- Check `instanceof Error`
- Inspect specific error codes
- Re-throw unexpected errors

---

## 📝 TypeScript Best Practices

### Type Definitions

```typescript
// input.interface.ts
export interface Input {
  /** Path to the file (absolute or relative) */
  filePath: string;
  /** Optional encoding (defaults to "utf8") */
  encoding?: string;
}

// output.interface.ts
export interface Output {
  /** File content as string */
  content: string;
  /** File size in bytes */
  size: number;
  /** Encoding used */
  encoding: string;
  /** Whether file existed */
  exists: boolean;
  /** Last modified timestamp (ISO 8601) */
  timestamp?: string;
  /** Human-readable size */
  humanSize: string;
}
```

**Benefits:**
- Type safety
- IDE autocomplete
- Clear contracts
- Self-documenting

---

### JSDoc Comments

Document all exported functions:

```typescript
/**
 * Read file content as string.
 * @param filePath - Path to the file
 * @param encoding - Character encoding (defaults to "utf8")
 * @returns File content as string
 * @throws Error if file cannot be read
 */
export async function readFileContent(
  filePath: string,
  encoding: string = "utf8"
): Promise<string> {
  return await readFile(filePath, encoding);
}
```

---

### Default Parameters

```typescript
// ✅ GOOD - Default parameter
export async function readFileContent(
  filePath: string,
  encoding: string = "utf8"  // Default value
): Promise<string> {
  return await readFile(filePath, encoding);
}

// ❌ BAD - Manual default
export async function readFileContent(
  filePath: string,
  encoding: string
): Promise<string> {
  const actualEncoding = encoding || "utf8";  // Manual!
  return await readFile(filePath, actualEncoding);
}
```

---

## 🧪 Testing Strategy

### Test Structure

```typescript
// Import core functions (no SDK needed)
import {
  sanitizeFilePath,
  readFileContent,
  getFileInfo,
  formatFileSize
} from "../.opencode/skills/read-file/core";

// Import main run() for integration tests (needs SDK)
import { run as readFile } from "../.opencode/skills/read-file/index";

describe("readFileSkill", () => {
  describe("Core Functions", () => {
    describe("sanitizeFilePath", () => {
      test("trims whitespace", () => {
        expect(sanitizeFilePath("  /path  ")).toBe("/path");
      });

      test("throws for empty path", () => {
        expect(() => sanitizeFilePath("")).toThrow();
      });
    });

    describe("formatFileSize", () => {
      test("formats bytes", () => {
        expect(formatFileSize(1024)).toBe("1.00 KB");
      });
    });

    // ... more tests
  });

  describe("Main run() Function", () => {
    // These tests WILL FAIL without SDK server
    // That's expected and OK!
    test("reads file successfully", async () => {
      // This requires OpenCode server running
    });
  });
});
```

---

### Test Categories

| Category | Focus | Passing Tests |
|----------|-------|---------------|
| **Unit Tests** | Core functions only | ✅ 26 pass |
| **Integration Tests** | Full skill with SDK | ❌ fail without server |
| **E2E Tests** | Full system (手动) | ✅ Manual run |

---

### Running Tests

```bash
# Run all tests
bun test tests/read-file.test.ts

# Run only core function tests
bun test tests/read-file.test.ts --grep "Core Functions"

# Run with coverage
bun test --coverage

# Watch mode
bun test --watch
```

---

### Test Coverage Goals (from AGENTS.md)

| Component | Goal |
|-----------|------|
| **Core business logic** | 100% |
| **Public APIs** | 90%+ |
| **Utility helpers** | 80%+ |
| **SDK integration** | Low priority (manual test) |

**Achieved:**
- ✅ Core functions: 100% (26 tests)
- ⚠️ Main run(): Manual testing needed

---

## 📊 Comparison: Your Skills

### `save-memory` (Your Original)

```
.opencode/skills/save-memory/
├── index.ts           # SDK + logic mixed ❌
├── input.interface.ts
├── output.interface.ts
└── meta.ts
```

**Issues:**
- ❌ No `core.ts` file
- ❌ Logic mixed with SDK calls
- ❌ Hard to test
- ✅ Good input validation
- ✅ Good error handling

**To Fix:**
```typescript
// Extract to core.ts
export async function saveMemoryCore(payload: Input): Promise<Output> {
  const safeId = sanitizeDigimonId(payload.digimonId);
  const existing = await loadExistingMemories(filePath);
  existing.push(payload.memory);
  await saveMemoriesToFile(filePath, existing);
  return { file: filePath };
}

// Use in index.ts
export async function run(payload: Input): Promise<Output> {
  const client = await createOpencodeClient();
  const result = await saveMemoryCore(payload);  // Testable!
  await client.tui.showToast({...});
  return result;
}
```

---

### `read-file` (New Example)

```
.opencode/skills/read-file/
├── index.ts           # SDK wrapper ✅
├── core.ts            # Pure logic ✅
├── input.interface.ts
├── output.interface.ts
├── meta.ts
└── README.md
```

**Benefits:**
- ✅ Clean separation
- ✅ Core functions testable
- ✅ 26/26 tests pass
- ✅ Good documentation

---

## 🚀 Quick Start Template

When creating a new skill:

### Step 1: Create Directory

```bash
mkdir -p .opencode/skills/my-skill
cd .opencode/skills/my-skill
```

### Step 2: Create Files

```bash
touch index.ts core.ts
touch input.interface.ts output.interface.ts
touch meta.ts README.md
```

### Step 3: Implement `core.ts` (Pure Functions)

```typescript
import { readFile, writeFile, mkdir } from "fs/promises";

/**
 * Pure function - NO SDK calls!
 */
export async function doTheCoreLogic(input: Input): Promise<Output> {
  // Validation
  if (!input.requiredField) {
    throw new Error("Missing required field");
  }

  // Core logic
  const result = await processInput(input);

  return result;
}
```

### Step 4: Implement `index.ts` (SDK Wrapper)

```typescript
import { Input } from "./input.interface";
import { Output } from "./output.interface";
import { meta } from "./meta";
import { createOpencodeClient } from "@opencode-ai/sdk/v2";
import { doTheCoreLogic } from "./core";

export async function run(payload: Input): Promise<Output> {
  // SDK at start
  const client = await createOpencodeClient();

  // Core logic (testable!)
  const result = await doTheCoreLogic(payload);

  // SDK at end
  await client.tui.showToast({ message: "Success!", variant: "success" });

  return result;
}

export default { meta, run };
```

### Step 5: Define Types

```typescript
// input.interface.ts
export interface Input {
  requiredField: string;
  optionalField?: string;
}

// output.interface.ts
export interface Output {
  result: string;
  timestamp: string;
}
```

### Step 6: Add Metadata

```typescript
// meta.ts
export const meta = {
  name: "mySkill",
  description: "Brief description",
  version: "1.0.0",
};
```

### Step 7: Test Core Functions

```typescript
// tests/my-skill.test.ts
import { doTheCoreLogic } from "../.opencode/skills/my-skill/core";

test("core logic works", async () => {
  const result = await doTheCoreLogic({
    requiredField: "test"
  });
  expect(result).toBeDefined();
});
```

---

## 📚 Complete Checklist

### Creating a New Skill

- [ ] Create skill directory: `.opencode/skills/{name}/`
- [ ] Create `core.ts` with pure business logic
- [ ] Create `index.ts` with SDK wrapper
- [ ] Define `input.interface.ts` with input types
- [ ] Define `output.interface.ts` with output types
- [ ] Create `meta.ts` with skill metadata
- [ ] Add `README.md` with documentation
- [ ] Export all core functions from `core.ts`
- [ ] Add JSDoc comments to all exports
- [ ] Validate inputs in core functions
- [ ] Handle errors properly
- [ ] Create tests for core functions
- [ ] Run tests: `bun test tests/{name}.test.ts`

### Testing Checklist

- [ ] Import core functions directly
- [ ] Unit test each exported function
- [ ] Test happy path
- [ ] Test edge cases (empty, null, boundaries)
- [ ] Test error conditions
- [ ] Verify 100% coverage of core logic
- [ ] Note: Main run() function needs manual/integration testing

---

## 🎓 Key Takeaways

### ✅ DO:

1. **Separate concerns**: Core logic → `core.ts`, SDK → `index.ts`
2. **Export everything**: Make core functions testable
3. **Use pure functions**: Easy to test, no side effects
4. **Validate early**: Fail fast with clear errors
5. **Document well**: JSDoc comments + README
6. **Test core logic first**: 100% coverage achievable
7. **Manual test SDK**: Run skill in full system

### ❌ DON'T:

1. **Mix SDK and logic**: Hard to test
2. **Hide core functions**: Keep them exported
3. **Use `any` type**: Use `unknown` for errors
4. **Ignore errors**: Handle them properly
5. **Skip type definitions**: Provide clear contracts
6. **Test with SDK**: Mocking is complex, avoid it

---

## 🔗 Related Documentation

- **Project Standards**: `AGENTS.md` (testing, code style)
- **Skill Guide**: `.opencode/context/openagents-repo/guides/adding-skill.md`
- **CLI Skills** (different pattern): `.opencode/skill/task-management/SKILL.md`

---

**Happy Skill Building! 🚀**