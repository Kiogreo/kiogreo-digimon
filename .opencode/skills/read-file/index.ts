import { stat } from "fs/promises";
import { Input } from "./input.interface";
import { Output } from "./output.interface";
import { meta } from "./meta";
import {
  sanitizeFilePath,
  readFileContent,
  getFileInfo,
  formatFileSize
} from "./core";
import { createOpencodeClient } from "@opencode-ai/sdk/v2";

export async function run(payload: Input): Promise<Output> {
  // Input validation
  if (!payload.filePath?.trim()) {
    throw new Error("filePath cannot be empty");
  }

  const filePath = sanitizeFilePath(payload.filePath);
  const encoding = payload.encoding || "utf8";
  const client = await createOpencodeClient();

  try {
    // Check if file exists
    const exists = await fileExists(filePath);

    if (!exists) {
      await client.tui.showToast({
        message: `File not found: ${filePath}`,
        variant: "error"
      });

      return {
        content: "",
        size: 0,
        encoding,
        exists: false,
        humanSize: "0 B"
      };
    }

    // Read file content
    const content = await readFileContent(filePath, encoding);

    // Get file metadata
    const fileInfo = await getFileInfo(filePath);

    // Format file size
    const humanSize = formatFileSize(fileInfo.size);

    await client.tui.showToast({
      message: `File read successfully: ${filePath}`,
      variant: "success"
    });

    return {
      content,
      size: fileInfo.size,
      encoding,
      exists: true,
      timestamp: fileInfo.timestamp,
      humanSize
    };
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Unknown error occurred";

    await client.tui.showToast({
      message: `Failed to read file: ${message}`,
      variant: "error"
    });

    throw error;
  }
}

async function fileExists(filePath: string): Promise<boolean> {
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

export default { meta, run };