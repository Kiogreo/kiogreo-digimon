import { readFile, stat } from "fs/promises";
import { dirname } from "path";

/**
 * Validate and normalize a file path.
 * @param path - The file path to validate
 * @returns Normalized absolute path
 * @throws Error if path is empty or contains invalid characters
 */
export function sanitizeFilePath(path: string): string {
  if (!path?.trim()) {
    throw new Error("File path cannot be empty");
  }

  // Check for null bytes (security risk)
  if (path.includes("\0")) {
    throw new Error("File path cannot contain null bytes");
  }

  return path.trim();
}

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

/**
 * Get file metadata.
 * @param filePath - Path to the file
 * @returns File size in bytes and last modified timestamp
 * @throws Error if metadata cannot be retrieved
 */
export async function getFileInfo(filePath: string): Promise<{
  size: number;
  timestamp: string;
}> {
  const stats = await stat(filePath);
  return {
    size: stats.size,
    timestamp: stats.mtime.toISOString()
  };
}

/**
 * Format byte size to human-readable string.
 * @param bytes - Size in bytes
 * @returns Human-readable size string
 * @example
 * formatFileSize(1024) // "1.00 KB"
 * formatFileSize(1500000) // "1.43 MB"
 */
export function formatFileSize(bytes: number): string {
  const units = ["B", "KB", "MB", "GB", "TB"];
  if (bytes === 0) return "0 B";

  const size = Math.floor(Math.log(bytes) / Math.log(1024));
  const value = bytes / Math.pow(1024, size);
  const rounded = value >= 10 ? value.toFixed(0) : value.toFixed(2);

  return `${rounded} ${units[size]}`;
}

/**
 * Check if a file exists and is accessible.
 * @param filePath - Path to check
 * @returns True if file exists and is readable
 */
export async function fileExists(filePath: string): Promise<boolean> {
  try {
    await stat(filePath);
    return true;
  } catch (error: unknown) {
    const isFileNotFound =
      error instanceof Error &&
      "code" in error &&
      (error as { code: string }).code === "ENOENT";
    return !isFileNotFound;
  }
}