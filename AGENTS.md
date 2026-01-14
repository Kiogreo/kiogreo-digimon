# Agent Development Guide - kiogreo-digimon

> **Purpose**: AI orchestration framework for Digimon-like virtual pet simulation within the Kiogreo Ecosystem  
> **Stack**: TypeScript, Bun runtime, OpenCode AI Framework  
> **Last Updated**: 2026-01-14

---

## Build, Lint & Test Commands

```bash
# Development
bun run <file>.ts           # Run TypeScript directly (no build step needed)
bun --watch <file>.ts       # Run with auto-reload

# Type Checking
tsc --noEmit                # Type check without emitting files
tsc --noEmit --watch        # Watch mode for type checking

# Testing (Framework not yet configured)
# TODO: Add Vitest or Bun's built-in test runner
# bun test                  # Run all tests (when configured)
# bun test <file>           # Run single test file
# bun test --watch          # Watch mode

# Linting (Not yet configured)
# TODO: Add ESLint with TypeScript support
# eslint .                  # Lint all files
# eslint --fix .            # Auto-fix issues

# Plugin/Tool Development
cd .opencode/plugin && bun install && bun run telegram-notify.ts
cd .opencode/tool && bun install && bun run gemini/index.ts

# OpenCode Agent Usage
opencode --agent openagent  # Start universal agent
opencode --agent opencoder  # Start development specialist
```

---

## Code Style Guidelines

### Formatting
- **Indentation**: 2 spaces (no tabs)
- **Quotes**: Double quotes
- **Semicolons**: Required
- **Line Length**: Max 100 chars (prefer 80)
- **Trailing Commas**: Use in multiline objects/arrays

### Naming Conventions
- **Files**: `kebab-case.ts` (e.g., `telegram-notify.ts`)
- **Classes**: `PascalCase` (e.g., `SimpleTelegramBot`)
- **Functions**: `camelCase` (e.g., `generateImage`, `loadEnvVariables`)
- **Constants**: `UPPER_SNAKE_CASE` (e.g., `DEFAULT_ENV_PATHS`, `ENABLED`)
- **Interfaces/Types**: `PascalCase` (e.g., `EnvLoaderConfig`, `ImageConfig`)

### Imports
```typescript
// Group: types → external → internal
import type { Plugin } from "@opencode-ai/plugin"
import { readFile } from "fs/promises"
import { resolve, join } from "path"
```

### Types & Interfaces
```typescript
// ✅ GOOD: Explicit types
interface ImageConfig {
  outputDir?: string
  customName?: string
}

export async function generateImage(
  prompt: string, 
  config: ImageConfig = {}
): Promise<string> { }

// ❌ BAD: Implicit any
function doSomething(data) { return data.value }
```

### Error Handling
```typescript
// ✅ GOOD: Helpful error messages
if (!value) {
  throw new Error(`${apiKeyName} not found. Please set it in .env file.
To fix: ${apiKeyName}=your_value_here`)
}

// ✅ GOOD: Try-catch with context
try {
  return await generateImage(prompt, config)
} catch (error) {
  return `Error: ${error.message}`
}

// ❌ BAD: Silent failures
try { doSomething() } catch (e) { console.log("error") }
```

### Environment Variables
```typescript
// ✅ GOOD: Use env vars for secrets
const apiKey = await getApiKey('GEMINI_API_KEY')
const timeout = parseInt(process.env.TELEGRAM_IDLE_TIMEOUT || '300000')

// ❌ BAD: Hardcoded credentials
const apiKey = "sk-1234567890abcdef"
```

### Async/Await
```typescript
// ✅ GOOD: Async/await with error handling
export async function editImage(path: string, prompt: string): Promise<string> {
  const apiKey = await getGeminiApiKey()
  const res = await fetch(url, { method: "POST", body: JSON.stringify(body) })
  
  if (!res.ok) {
    const errorText = await res.text()
    throw new Error(`API error (${res.status}): ${errorText}`)
  }
  return result
}

// ❌ BAD: Promise chains
function getData() {
  return fetch(url).then(res => res.json().then(data => callback(data)))
}
```

### File System Operations
```typescript
// ✅ GOOD: Safe file operations
async function ensureDirectoryExists(dirPath: string) {
  try {
    await mkdir(dirPath, { recursive: true })
  } catch (error) {
    // Directory might already exist
  }
}

// Always validate paths, use join/resolve, handle errors
```

---

## OpenCode Agent Patterns

### Agent Structure
```markdown
---
description: "Brief description"
mode: primary|subagent
tools: [read, edit, bash, task]
---

# Agent Name

**EXECUTE** this workflow:
**1. ANALYZE** - Understand goal
**2. PLAN** - Break into steps
**3. EXECUTE** - Implement

**RULES:**
- **ALWAYS** validate input
- **NEVER** expose sensitive data
```

### Plugin Structure
```typescript
import type { Plugin } from "@opencode-ai/plugin"

const ENABLED = false // Feature flag

export const MyPlugin: Plugin = async ({ $ }) => {
  if (!ENABLED) return {}
  
  return {
    async event(input) {
      if (input.event.type === "session.idle") {
        // Handle event
      }
    }
  }
}
```

---

## Security & Testing

### Security
- **NEVER** commit `.env` files (use `.env.example`)
- **ALWAYS** use environment variables for secrets
- **VALIDATE** all user input
- **SANITIZE** file paths (prevent traversal)
- **USE** feature flags (`ENABLED`) for optional features

### Testing (AAA Pattern)
```typescript
test('generateImage saves file with unique name', async () => {
  // Arrange
  const prompt = "A cute Digimon"
  const config = { customName: "agumon" }
  
  // Act
  const result = await generateImage(prompt, config)
  
  // Assert
  expect(result).toContain("Generated image saved")
})
```

---

## Project-Specific Patterns

### Digimon Documents
- Format: JSON/YAML/Markdown
- Fields: name, personality, specialization, XP, evolution stage
- Memory: 150-300 lines (buffer system, older memories archived)

### Agent Specialization
- Traits: engineering, scientist, arts, politics
- Match tasks to specialized Digimon
- Enable collaboration for complex tasks

---

## Common Pitfalls

❌ **DON'T**: Mutate state, use `any`, ignore TS errors, skip error handling, hardcode paths/secrets, write functions > 50 lines  
✅ **DO**: Use pure functions, validate input, provide helpful errors, use strict mode, document complex logic, write tests

---

## Quick Reference

**Locations**: `.opencode/agent/`, `.opencode/command/`, `.opencode/plugin/`, `.opencode/tool/`, `.opencode/context/`  
**Dependencies**: `@opencode-ai/plugin`, `@opencode-ai/sdk`, `zod`  
**Env Vars**: `GEMINI_API_KEY`, `TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID`, `GEMINI_TEST_MODE`

---

*Guide for AI agents working on kiogreo-digimon. Follow these patterns for consistency and quality.*
