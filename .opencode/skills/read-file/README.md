# read-file Skill

Read a file from the filesystem with comprehensive metadata support.

## Description

This skill reads file content from the filesystem and returns both the content and rich metadata including file size, encoding, existence status, and last modified timestamp. It handles errors gracefully and provides human-readable file size formatting.

## Usage

### Input

```typescript
{
  filePath: string;       // Path to file to read (absolute or relative)
  encoding?: string;      // Optional encoding (defaults to "utf8")
}
```

### Output

```typescript
{
  content: string;        // File content as string
  size: number;           // File size in bytes
  encoding: string;       // Encoding used to read the file
  exists: boolean;        // Whether the file existed
  timestamp?: string;     // Last modified timestamp (ISO 8601)
  humanSize: string;      // Human-readable file size
}
```

## Examples

### Read a plain text file

```typescript
const result = await run({
  filePath: "/path/to/file.txt"
});

// Result:
// {
//   content: "Hello, world!",
//   size: 13,
//   encoding: "utf8",
//   exists: true,
//   timestamp: "2026-01-31T12:00:00.000Z",
//   humanSize: "13 B"
// }
```

### Read with custom encoding

```typescript
const result = await run({
  filePath: "/path/to/file.txt",
  encoding: "utf16le"
});
```

### Handle missing file gracefully

```typescript
const result = await run({
  filePath: "/path/to/nonexistent.txt"
});

// Result:
// {
//   content: "",
//   size: 0,
//   encoding: "utf8",
//   exists: false,
//   humanSize: "0 B"
// }
```

## Error Handling

The skill handles the following error cases gracefully:

- **Empty file path**: Throws `Error("filePath cannot be empty")`
- **Null bytes in path**: Throws `Error("File path cannot contain null bytes")`
- **File not found**: Returns `exists: false` with empty content
- **Permission errors**: Propagates the error with TUI notification
- **Corrupted files**: Propagates the error with TUI notification

## Core Functions

The following pure functions are exported for testing:

### `sanitizeFilePath(path: string): string`

Validate and normalize a file path. Throws `Error` if path is empty or contains invalid characters.

### `readFileContent(filePath: string, encoding: string): Promise<string>`

Read file content as string. Wraps `fs.promises.readFile()` with proper typing.

### `getFileInfo(filePath: string): Promise<{size: number, timestamp: string}>`

Get file metadata including size and last modified timestamp. Uses `fs.promises.stat()`.

### `formatFileSize(bytes: number): string`

Format byte size to human-readable string (e.g., `1024` → `"1.00 KB"`).

### `fileExists(filePath: string): Promise<boolean>`

Check if a file exists and is accessible. Returns `true` if file exists, `false` otherwise.

## Testing

Run tests with Bun:

```bash
bun test tests/read-file.test.ts
```

Tests cover:
- Happy path: reading an existing file
- File not found scenarios
- Different file sizes and encodings
- Input validation (empty paths, null bytes)
- Human-readable size formatting
- Error handling

## Requirements

- Node.js with fs/promises support
- TypeScript with ES2015+ lib support
- @opencode-ai/sdk/v2 for TUI notifications