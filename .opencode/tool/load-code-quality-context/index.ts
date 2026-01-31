import { readFile } from "fs/promises";

export async function loadCodeQualityContext(): Promise<void> {
  const projectDir = process.env.PROJECT_DIR || process.cwd();

  await readFile(
    `${projectDir}/.opencode/context/core/standards/code-quality.md`,
    "utf8",
  );
}
