import { createOpencodeClient } from "@opencode-ai/sdk/v2";
import { readFile } from "fs/promises";

export async function loadCodeQualityContext(): Promise<void> {
  const projectDir = process.env.PROJECT_DIR || process.cwd();
  const client = await createOpencodeClient();

  await readFile(
    `${projectDir}/.opencode/context/core/standards/code-quality.md`,
    "utf8",
  );

  await client.tui.showToast({
    message: 'Successfully loaded code quality context.',
    variant: 'success'
  });
}
