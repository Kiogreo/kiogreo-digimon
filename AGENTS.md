# Agent Development Guide - kiogreo-digimon

> **Purpose**: AI orchestration framework for Digimon-like virtual pet simulation within the Kiogreo Ecosystem
> **Stack**: TypeScript, Bun/Node.js, OpenCode AI Framework
> **Last Updated**: 2026-01-06

---

## Build, Lint & Test Commands

### Running Tests
```bash
# No test framework configured yet - tests should be added
# When adding tests, use Vitest or Jest:
bun test                    # Run all tests
bun test <file>             # Run single test file
bun test --watch            # Watch mode
```

### Build & Type Checking
```bash
# TypeScript compilation (when tsconfig.json is added)
tsc --noEmit               # Type check without emitting files
tsc                        # Compile TypeScript

# Bun runtime (current setup)
bun run <file>.ts          # Run TypeScript directly
```

### Linting & Formatting
```bash
# No linter configured yet - recommended to add ESLint
# When adding ESLint:
eslint .                   # Lint all files
eslint --fix .             # Auto-fix issues
```

### Plugin Development
```bash
cd .opencode/plugin
bun install                # Install plugin dependencies
bun run telegram-notify.ts # Test Telegram plugin
```

### Tool Development
```bash
cd .opencode/tool
bun install                # Install tool dependencies
```

---

## Code Style Guidelines

### TypeScript Conventions

#### Imports
```typescript
// ✅ GOOD: Organized imports
import type { Plugin } from "@opencode-ai/plugin"
import { readFile } from "fs/promises"
import { resolve, join } from "path"

// Group imports: types → external → internal
// Use named imports over default when possible
// Use type imports for type-only imports
```

#### Formatting
- **Indentation**: 2 spaces (no tabs)
- **Quotes**: Double quotes for strings
- **Semicolons**: Required at end of statements
- **Line Length**: Max 100 characters (prefer 80)
- **Trailing Commas**: Use in multiline objects/arrays

#### Types & Interfaces
```typescript
// ✅ GOOD: Explicit types, clear interfaces
interface ImageConfig {
  outputDir?: string
  useTimestamp?: boolean
  preserveOriginal?: boolean
  customName?: string
}

export async function generateImage(
  prompt: string, 
  config: ImageConfig = {}
): Promise<string> {
  // Implementation
}

// ❌ BAD: Implicit any, unclear types
function doSomething(data) {
  return data.value
}
```

#### Naming Conventions
- **Files**: `kebab-case.ts` (e.g., `telegram-notify.ts`)
- **Classes**: `PascalCase` (e.g., `SimpleTelegramBot`)
- **Functions**: `camelCase` (e.g., `generateImage`, `loadEnvVariables`)
- **Constants**: `UPPER_SNAKE_CASE` (e.g., `DEFAULT_ENV_PATHS`, `ENABLED`)
- **Interfaces**: `PascalCase` (e.g., `EnvLoaderConfig`, `ImageConfig`)
- **Type Aliases**: `PascalCase` (e.g., `Plugin`)
- **Private Members**: Prefix with `private` keyword, use `camelCase`

### Error Handling

```typescript
// ✅ GOOD: Comprehensive error handling
export async function getApiKey(apiKeyName: string): Promise<string> {
  const value = await getEnvVariable(apiKeyName)
  
  if (!value) {
    throw new Error(`${apiKeyName} not found. Please set it in your environment or .env file.
    
To fix this:
1. Add to .env file: ${apiKeyName}=your_value_here
2. Or export it: export ${apiKeyName}=your_value_here

Current working directory: ${process.cwd()}`)
  }
  
  return value
}

// ✅ GOOD: Try-catch with context
try {
  const result = await generateImage(prompt, config)
  return result
} catch (error) {
  return `Error: ${error.message}`
}

// ❌ BAD: Silent failures, generic errors
try {
  doSomething()
} catch (e) {
  console.log("error")
}
```

### Configuration & Environment Variables

```typescript
// ✅ GOOD: Use environment variables for secrets
const apiKey = await getApiKey('GEMINI_API_KEY')
const botToken = process.env.TELEGRAM_BOT_TOKEN

// ✅ GOOD: Provide defaults and validation
const idleTimeout = parseInt(process.env.TELEGRAM_IDLE_TIMEOUT || '300000')
const botUsername = process.env.TELEGRAM_BOT_USERNAME || '@OpenCode'

// ❌ BAD: Hardcoded credentials
const apiKey = "sk-1234567890abcdef"
```

### Async/Await Patterns

```typescript
// ✅ GOOD: Async/await with proper error handling
export async function editImage(
  imagePath: string, 
  prompt: string, 
  config: ImageConfig = {}
): Promise<string> {
  const apiKey = await getGeminiApiKey()
  const { mime, base64 } = await parseImageInput(imagePath)
  
  const res = await fetch(url, { method: "POST", body: JSON.stringify(body) })
  
  if (!res.ok) {
    const errorText = await res.text()
    throw new Error(`API error (${res.status}): ${errorText}`)
  }
  
  return result
}

// ❌ BAD: Mixing promises and callbacks
function getData() {
  return fetch(url).then(res => {
    res.json().then(data => {
      callback(data)
    })
  })
}
```

### File System Operations

```typescript
// ✅ GOOD: Safe file operations with validation
async function ensureDirectoryExists(dirPath: string) {
  try {
    await mkdir(dirPath, { recursive: true })
  } catch (error) {
    // Directory might already exist, that's fine
  }
}

async function getUniqueFilename(
  directory: string, 
  baseName: string, 
  extension: string
): Promise<string> {
  await ensureDirectoryExists(directory)
  
  const baseFilename = join(directory, `${baseName}${extension}`)
  const fileExists = await Bun.file(baseFilename).exists()
  
  if (!fileExists) {
    return baseFilename
  }
  
  // Add timestamp if file exists
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, -5)
  return join(directory, `${baseName}_${timestamp}${extension}`)
}
```

---

## OpenCode Agent Patterns

### Agent Structure
```markdown
---
description: "Brief description of agent purpose"
mode: primary|subagent
tools: [read, edit, bash, task, etc.]
---

# Agent Name

**EXECUTE** this workflow for every request:

**1. ANALYZE** the request:
- Understand the goal
- Identify requirements

**2. PLAN** the approach:
- Break down into steps
- Identify dependencies

**RULES:**
- **ALWAYS** validate input
- **NEVER** expose sensitive data
```

### Command Structure
```markdown
---
name: command-name
agent: target-agent
---

You are executing [specific task].

**Request:** $ARGUMENTS

**Context Loaded:**
@.opencode/context/core/essential-patterns.md

Execute now.
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

## Security Best Practices

- **NEVER** commit `.env` files (use `.env.example` as template)
- **ALWAYS** use environment variables for API keys and tokens
- **VALIDATE** all user input before processing
- **SANITIZE** file paths to prevent traversal attacks
- **LOG** errors without exposing sensitive details
- **USE** feature flags (`ENABLED`) for optional plugins

---

## Testing Guidelines

```typescript
// When adding tests, follow AAA pattern:
test('generateImage saves file with unique name', async () => {
  // Arrange
  const prompt = "A cute Digimon"
  const config = { customName: "agumon" }
  
  // Act
  const result = await generateImage(prompt, config)
  
  // Assert
  expect(result).toContain("Generated image saved")
  expect(result).toContain("agumon")
})

// Test error cases
test('getApiKey throws when key not found', async () => {
  await expect(getApiKey('MISSING_KEY')).rejects.toThrow('not found')
})
```

---

## Project-Specific Patterns

### Digimon Document Structure
- Store in structured format (JSON/YAML/Markdown)
- Include: name, personality, specialization, XP, evolution stage
- Keep memory context between 150-300 lines

### Agent Specialization
- Each Digimon has a specialization trait (engineering, scientist, arts, politics)
- Match tasks to specialized Digimon agents
- Allow collaboration between Digimon for complex tasks

### Memory Management
- Save chat context to Memory Document after each interaction
- Implement buffer system (150-300 lines)
- Older memories can be "forgotten" (archived)

---

## Common Pitfalls to Avoid

❌ **DON'T** mutate state directly
❌ **DON'T** use `any` type (use `unknown` or specific types)
❌ **DON'T** ignore TypeScript errors
❌ **DON'T** skip error handling
❌ **DON'T** hardcode file paths (use `path.join()` or `resolve()`)
❌ **DON'T** commit sensitive data
❌ **DON'T** write functions > 50 lines (refactor into smaller functions)

✅ **DO** use pure functions when possible
✅ **DO** validate input at boundaries
✅ **DO** provide helpful error messages
✅ **DO** use TypeScript strict mode
✅ **DO** document complex logic
✅ **DO** write tests for critical paths
✅ **DO** use async/await over promises

---

## Quick Reference

**File Locations:**
- Agents: `.opencode/agent/`
- Commands: `.opencode/command/`
- Plugins: `.opencode/plugin/`
- Tools: `.opencode/tool/`
- Context: `.opencode/context/`
- Config: `.env` (create from `.env.example`)

**Key Dependencies:**
- `@opencode-ai/plugin` - Plugin framework
- `@opencode-ai/sdk` - SDK utilities
- `zod` - Schema validation (available)

**Environment Variables:**
- `GEMINI_API_KEY` - For image generation
- `TELEGRAM_BOT_TOKEN` - For notifications
- `TELEGRAM_CHAT_ID` - For notifications
- `GEMINI_TEST_MODE` - Set to 'true' for testing

---

*This guide is for AI coding agents working on the kiogreo-digimon project. Follow these patterns to maintain consistency and quality.*
