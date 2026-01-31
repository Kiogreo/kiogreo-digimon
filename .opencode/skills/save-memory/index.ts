// .opencode/skills/save-memory/index.ts
// Skill: Append a memory string to a per‑Digimon JSON file.
// The skill loads the project code‑quality context before any write operation.

// Use Bun's built‑in helpers for file‑system operations (no external @opencode/tool)
import { readFile, writeFile, mkdir } from "fs/promises";
import { loadCodeQualityContext } from "../../tool/load-code-quality-context"
import { existsSync } from "fs";
import { fileURLToPath } from "url";
import { Input } from "./input.interface";
import { Output } from "./output.interface";
import { meta } from "./meta";

/** Main entry point for the skill. */
export async function run(payload: Input): Promise<Output> {
  // 1️⃣ Ensure we respect the critical context rule.
  await loadCodeQualityContext();

  // 2️⃣ Basic validation.
  if (!payload.digimonId?.trim() || !payload.memory?.trim()) {
    throw new Error("Both digimonId and memory must be non‑empty strings");
  }

  // Normalise the identifier to a safe filename.
  const safeId = payload.digimonId.replace(/[^a-z0-9_-]/gi, "_").toLowerCase();

  const dir = `${process.env.PROJECT_DIR || ""}/data/memories`;
  const filePath = `${dir}/${safeId}.json`;

  // 3️⃣ Ensure the destination directory exists.
  await mkdir(dir, { recursive: true });

    // 4️⃣ Load any existing memories (gracefully handle missing/invalid files).
    let existing: string[] = [];
    try {
      const fileContent = await readFile(filePath, "utf8");
      existing = JSON.parse(fileContent);
      if (!Array.isArray(existing)) existing = [];
    } catch {
      existing = [];
    }

  // 5️⃣ Append the new memory.
  existing.push(payload.memory.trim());

  // 6️⃣ Write the updated array back to disk (pretty‑printed).
  await writeFile(filePath, JSON.stringify(existing, null, 2), "utf8");

  return { file: filePath };
}

export default { meta, run };

