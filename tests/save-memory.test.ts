// Test for the saveMemorySkill using Bun's built‑in helpers (no @opencode/tool imports)
import { run as saveMemory } from "../.opencode/skills/save-memory/index";

describe("saveMemorySkill", () => {
  const testDir = "/home/kiogreo/test.lab/kiogreo-digimon/data/memories";
  const digimonId = "testdigimon";
  const memory = "First memory at " + new Date().toISOString();

  test("creates file and appends memory", async () => {
    // Clean slate – delete the file if it exists.
    try {
      await Bun.$`rm -f "${testDir}/${digimonId}.json"`;
    } catch {}

    const result = await saveMemory({ digimonId, memory });

    // Verify the function returned the expected path.
    expect(result.file).toBe(`${testDir}/${digimonId}.json`);

    // Read back the file and confirm the memory is stored.
    // @ts-ignore
  const content = await Bun.file(result.file as any).text();
    const parsed = JSON.parse(content);
    expect(Array.isArray(parsed)).toBe(true);
    expect(parsed).toContain(memory);
  });
});
