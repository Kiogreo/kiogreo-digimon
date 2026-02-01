// Tests for the readFileSkill using Bun's built‑in helpers
// This test uses a setup pattern to mock the SDK before importing

// First, set up global environment for tests
const originalProcessEnv = { ...process.env };
process.env.NODE_ENV = "test";

// Clean up after tests
process.on("exit", () => {
  process.env = originalProcessEnv;
});

// Import main skill function for testing the whole flow
// Note: These tests require OpenCode SDK client availability
import { run as readFile } from "../.opencode/skills/read-file/index";

// Import core functions for unit testing without SDK dependencies
import {
  sanitizeFilePath,
  readFileContent,
  getFileInfo,
  formatFileSize,
  fileExists
} from "../.opencode/skills/read-file/core";

import { readFile as fsReadFile, writeFile, stat } from "fs/promises";

describe("readFileSkill", () => {
  const testDir = "/home/kiogreo/test.lab/kiogreo-digimon/data/test-read-file";

  // Create test directory and clean slate before tests
  beforeEach(async () => {
    try {
      await Bun.$`mkdir -p "${testDir}"`;
      await Bun.$`rm -f "${testDir}"/*.txt`;
    } catch {}
  });

  // Clean up after all tests
  afterAll(async () => {
    try {
      await Bun.$`rm -rf "${testDir}"`;
    } catch {}
  });

  describe("Core Functions", () => {
    describe("sanitizeFilePath", () => {
      test("trims whitespace from path", () => {
        const result = sanitizeFilePath("  /path/to/file.txt  ");
        expect(result).toBe("/path/to/file.txt");
      });

      test("throws error for empty path", () => {
        expect(() => sanitizeFilePath("")).toThrow("File path cannot be empty");
      });

      test("throws error for whitespace-only path", () => {
        expect(() => sanitizeFilePath("   ")).toThrow(
          "File path cannot be empty"
        );
      });

      test("throws error for null bytes in path", () => {
        expect(() => sanitizeFilePath("/path/\0file.txt")).toThrow(
          "File path cannot contain null bytes"
        );
      });

      test("returns clean path for valid input", () => {
        const result = sanitizeFilePath("/path/to/file.txt");
        expect(result).toBe("/path/to/file.txt");
      });

      test("handles relative paths correctly", () => {
        const result = sanitizeFilePath("./relative/path.txt");
        expect(result).toBe("./relative/path.txt");
      });
    });

    describe("formatFileSize", () => {
      test("formats zero bytes", () => {
        expect(formatFileSize(0)).toBe("0 B");
      });

      test("formats bytes correctly", () => {
        expect(formatFileSize(512)).toBe("512 B");
        expect(formatFileSize(1023)).toBe("1023 B");
      });

      test("formats kilobytes correctly", () => {
        expect(formatFileSize(1024)).toBe("1.00 KB");
        expect(formatFileSize(1536)).toBe("1.50 KB");
        expect(formatFileSize(2048)).toBe("2.00 KB");
      });

      test("formats megabytes correctly", () => {
        expect(formatFileSize(1048576)).toBe("1.00 MB");
        expect(formatFileSize(1572864)).toBe("1.50 MB");
        expect(formatFileSize(2097152)).toBe("2.00 MB");
        expect(formatFileSize(1024 * 1024)).toBe("1.00 MB");
      });

      test("formats gigabytes correctly", () => {
        expect(formatFileSize(1073741824)).toBe("1.00 GB");
        expect(formatFileSize(1610612736)).toBe("1.50 GB");
      });

      test("formats terabytes correctly", () => {
        expect(formatFileSize(1099511627776)).toBe("1.00 TB");
        expect(formatFileSize(1649267441664)).toBe("1.50 TB");
      });

      test("handles large numbers correctly", () => {
        expect(formatFileSize(1500000)).toBe("1.43 MB");
        expect(formatFileSize(999999999)).toBe("954 MB");
      });
    });

    describe("fileExists", () => {
      test("returns true for existing file", async () => {
        const testFile = `${testDir}/existing.txt`;
        await writeFile(testFile, "test content", "utf8");

        const result = await fileExists(testFile);
        expect(result).toBe(true);
      });

      test("returns false for non‑existent file", async () => {
        const result = await fileExists(`${testDir}/nonexistent.txt`);
        expect(result).toBe(false);
      });

      test("returns false for missing directory", async () => {
        const result = await fileExists(`/nonexistent/path/file.txt`);
        expect(result).toBe(false);
      });
    });

    describe("readFileContent", () => {
      test("reads file content correctly", async () => {
        const testFile = `${testDir}/read-test.txt`;
        const content = "Hello, world!";
        await writeFile(testFile, content, "utf8");

        const result = await readFileContent(testFile, "utf8");
        expect(result).toBe(content);
      });

      test("reads file with different encoding", async () => {
        const testFile = `${testDir}/utf16-test.txt`;
        const content = "Hello, world!";
        await writeFile(testFile, content, "utf16le");

        const result = await readFileContent(testFile, "utf16le");
        expect(result).toBe(content);
      });

      test("reads empty file", async () => {
        const testFile = `${testDir}/empty.txt`;
        await writeFile(testFile, "", "utf8");

        const result = await readFileContent(testFile, "utf8");
        expect(result).toBe("");
      });

      test("reads file with special characters", async () => {
        const testFile = `${testDir}/special-chars.txt`;
        const content = "Hello, 世界! 🌍 \n\t";
        await writeFile(testFile, content, "utf8");

        const result = await readFileContent(testFile, "utf8");
        expect(result).toBe(content);
      });

      test("throws error for non‑existent file", async () => {
        await expect(
          readFileContent(`${testDir}/nonexistent.txt`, "utf8")
        ).rejects.toThrow();
      });
    });

    describe("getFileInfo", () => {
      test("returns correct file size and timestamp", async () => {
        const testFile = `${testDir}/info-test.txt`;
        const content = "test content";
        await writeFile(testFile, content, "utf8");

        const result = await getFileInfo(testFile);
        expect(result.size).toBe(content.length);
        expect(result.timestamp).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/);
      });

      test("returns size 0 for empty file", async () => {
        const testFile = `${testDir}/empty-info.txt`;
        await writeFile(testFile, "", "utf8");

        const result = await getFileInfo(testFile);
        expect(result.size).toBe(0);
      });

      test("throws error for non‑existent file", async () => {
        await expect(
          getFileInfo(`${testDir}/nonexistent.txt`)
        ).rejects.toThrow();
      });
    });
  });

  describe("Main run() Function", () => {
    test("reads existing file successfully", async () => {
      const testFile = `${testDir}/main-test.txt`;
      const content = "Test file content for main function";
      await writeFile(testFile, content, "utf8");

      const result = await readFile({ filePath: testFile });

      expect(result).toEqual({
        content,
        size: content.length,
        encoding: "utf8",
        exists: true,
        timestamp: expect.any(String),
        humanSize: "35 B"
      });
    });

    test("handles file not found gracefully", async () => {
      const testFile = `${testDir}/nonexistent-main.txt`;

      const result = await readFile({ filePath: testFile });

      expect(result).toEqual({
        content: "",
        size: 0,
        encoding: "utf8",
        exists: false,
        humanSize: "0 B"
      });
    });

    test("uses custom encoding when specified", async () => {
      const testFile = `${testDir}/encoding-test.txt`;
      const content = "Test content";
      await writeFile(testFile, content, "utf16le");

      const result = await readFile({
        filePath: testFile,
        encoding: "utf16le"
      });

      expect(result.encoding).toBe("utf16le");
      expect(result.content).toBe(content);
    });

    test("formats human‑readable size correctly", async () => {
      const testFile = `${testDir}/size-test.txt`;
      const content = "x".repeat(2048); // 2KB
      await writeFile(testFile, content, "utf8");

      const result = await readFile({ filePath: testFile });

      expect(result.size).toBe(2048);
      expect(result.humanSize).toBe("2 KB");
    });

    test("throws error for empty filePath", async () => {
      await expect(
        readFile({ filePath: "" })
      ).rejects.toThrow("filePath cannot be empty");
    });

    test("throws error for whitespace‑only filePath", async () => {
      await expect(
        readFile({ filePath: "   " })
      ).rejects.toThrow("filePath cannot be empty");
    });

    test("trims whitespace from filePath", async () => {
      const testFile = `${testDir}/trim-test.txt`;
      await writeFile(testFile, "content", "utf8");

      const result = await readFile({ filePath: `  ${testFile}  ` });

      expect(result.exists).toBe(true);
      expect(result.content).toBe("content");
    });

    test("includes timestamp in output", async () => {
      const testFile = `${testDir}/timestamp-test.txt`;
      await writeFile(testFile, "test", "utf8");

      const result = await readFile({ filePath: testFile });

      expect(result.timestamp).toBeDefined();
      expect(result.timestamp).toMatch(
        /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/
      );
    });

    test("handles empty file", async () => {
      const testFile = `${testDir}/empty-main.txt`;
      await writeFile(testFile, "", "utf8");

      const result = await readFile({ filePath: testFile });

      expect(result).toEqual({
        content: "",
        size: 0,
        encoding: "utf8",
        exists: true,
        timestamp: expect.any(String),
        humanSize: "0 B"
      });
    });

    test("includes all metadata in output", async () => {
      const testFile = `${testDir}/metadata-test.txt`;
      const content = "Metadata test content";
      await writeFile(testFile, content, "utf8");

      const result = await readFile({ filePath: testFile });

      expect(result).toHaveProperty("content");
      expect(result).toHaveProperty("size");
      expect(result).toHaveProperty("encoding");
      expect(result).toHaveProperty("exists");
      expect(result).toHaveProperty("timestamp");
      expect(result).toHaveProperty("humanSize");
    });
  });
});