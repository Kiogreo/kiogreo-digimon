import { readFile, writeFile, mkdir } from "fs/promises";
import { loadCodeQualityContext } from "../../tool/load-code-quality-context"
import { Input } from "./input.interface";
import { Output } from "./output.interface";
import { meta } from "./meta";
import { createOpencodeClient } from "@opencode-ai/sdk/v2";

export async function run(payload: Input): Promise<Output> {
  if (!payload.digimonId?.trim() || !payload.memory?.trim()) {
    throw new Error("Both digimonId and memory must be non‑empty strings");
  }

  const client = await createOpencodeClient();
  await loadCodeQualityContext();

  const safeId = payload.digimonId.replace(/[^a-z0-9_-]/gi, "_").toLowerCase();
  const dir = `${process.env.PROJECT_DIR || ""}/data/memories`;
  const filePath = `${dir}/${safeId}.json`;

  await mkdir(dir, { recursive: true });

  let existing: string[] = [];
  try {
    const fileContent = await readFile(filePath, "utf8");
    existing = JSON.parse(fileContent);
    if (!Array.isArray(existing)) {
      existing = [];
    }
  } catch (error: unknown) {
    const isFileNotFound = error instanceof Error && 'code' in error && (error as { code: string }).code === 'ENOENT';
    
    if (!isFileNotFound && error instanceof Error) {
      await client.tui.showToast({
        message: `Failed to load existing memories: ${error.message}`,
        variant: 'error'
      });
    }
    existing = [];
  }

  try {
    existing.push(payload.memory.trim());
    await writeFile(filePath, JSON.stringify(existing, null, 2), "utf8");
    
    await client.tui.showToast({
      message: 'Digimon Memory saved successfully',
      variant: 'success'
    });

    return { file: filePath };
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    await client.tui.showToast({
      message: `Failed to save memory: ${message}`,
      variant: 'error'
    });
    throw error;
  }
}

export default { meta, run };

