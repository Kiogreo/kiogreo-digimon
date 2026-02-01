// Tests for the saveMemorySkill using Bun's built‑in helpers
// This test uses a setup pattern to mock the SDK before importing

// First, set up global environment for tests
const originalProcessEnv = { ...process.env };
process.env.NODE_ENV = "test";

// Clean up after tests
process.on("exit", () => {
  process.env = originalProcessEnv;
});

// Now import after environment is set
import { run as saveMemory } from "../.opencode/skills/save-memory/index";

describe("saveMemorySkill", () => {
  const testDir = "/home/kiogreo/test.lab/kiogreo-digimon/data/memories";
  const digimonId = "testdigimon";

  // Clean slate before each test
  beforeEach(async () => {
    try {
      await Bun.$`rm -f "${testDir}/${digimonId}.json"`;
    } catch {}
  });

  // Clean up after all tests
  afterAll(async () => {
    try {
      await Bun.$`rm -f "${testDir}/${digimonId}.json"`;
      await Bun.$`rm -f "${testDir}/test_digimon__.json"`;
      await Bun.$`rm -f "${testDir}/corruptedtest.json"`;
      await Bun.$`rm -f "${testDir}/badformattest.json"`;
    } catch {}
  });

  test("creates file and appends memory", async () => {
    const memory = "First memory at " + new Date().toISOString();
    const result = await saveMemory({ digimonId, memory });

    // Verify the function returned the expected path
    expect(result.file).toBe(`${testDir}/${digimonId}.json`);

    // Read back the file and confirm the memory is stored
    // @ts-ignore
    const content = await Bun.file(result.file as any).text();
    const parsed = JSON.parse(content);
    expect(Array.isArray(parsed)).toBe(true);
    expect(parsed).toContain(memory);
  });

  test("appends to existing memories", async () => {
    const memory1 = "Memory 1: Initial thought";
    const memory2 = "Memory 2: Follow-up idea";
    const memory3 = "Memory 3: Conclusion";

    // Save first memory
    await saveMemory({ digimonId, memory: memory1 });

    // Save second memory
    await saveMemory({ digimonId, memory: memory2 });

    // Save third memory
    await saveMemory({ digimonId, memory: memory3 });

    // Verify all three memories are stored in order
    const content = await Bun.file(`${testDir}/${digimonId}.json`).text();
    const parsed = JSON.parse(content);

    expect(parsed).toHaveLength(3);
    expect(parsed[0]).toBe(memory1);
    expect(parsed[1]).toBe(memory2);
    expect(parsed[2]).toBe(memory3);
  });

  test("sanitizes unsafe digimon ID", async () => {
    const unsafeId = "Test Digimon!@#$%";
    const memory = "Test memory with safe ID";

    const result = await saveMemory({ digimonId: unsafeId, memory });

    // Should sanitize special characters to underscores
    expect(result.file).toMatch(/test_digimon__/i);

    // Verify the memory is actually saved
    // @ts-ignore
    const content = await Bun.file(result.file as any).text();
    const parsed = JSON.parse(content);
    expect(parsed).toContain(memory);
  });

  test("lowercases digimon ID", async () => {
    const uppercaseId = "TESTDIGIMON";
    const memory = "Test case sensitivity";

    const result = await saveMemory({ digimonId: uppercaseId, memory });

    // Should lowercase the ID
    expect(result.file).toMatch(/testdigimon/);
    expect(result.file).not.toMatch(/TESTDIGIMON/);

    // Verify the memory is saved
    // @ts-ignore
    const content = await Bun.file(result.file as any).text();
    const parsed = JSON.parse(content);
    expect(parsed).toContain(memory);
  });

  test("throws error for missing digimonId", async () => {
    await expect(
      saveMemory({ digimonId: "", memory: "test memory" })
    ).rejects.toThrow("Both digimonId and memory must be non‑empty strings");
  });

  test("throws error for whitespace-only digimonId", async () => {
    await expect(
      saveMemory({ digimonId: "   ", memory: "test memory" })
    ).rejects.toThrow("Both digimonId and memory must be non‑empty strings");
  });

  test("throws error for missing memory", async () => {
    await expect(
      saveMemory({ digimonId: "testdigimon", memory: "" })
    ).rejects.toThrow("Both digimonId and memory must be non‑empty strings");
  });

  test("throws error for whitespace-only memory", async () => {
    await expect(
      saveMemory({ digimonId: "testdigimon", memory: "   " })
    ).rejects.toThrow("Both digimonId and memory must be non‑empty strings");
  });

  test("handles corrupted existing file gracefully", async () => {
    const corruptedId = "corruptedtest";
    const filePath = `${testDir}/${corruptedId}.json`;

    // Create a corrupted JSON file
    await Bun.write(filePath, "not valid json {broken content");

    // Should not throw error, should create new array
    const result = await saveMemory({ digimonId: corruptedId, memory: "recovery memory" });

    // Verify the memory was saved despite corruption
    // @ts-ignore
    const content = await Bun.file(result.file as any).text();
    const parsed = JSON.parse(content);
    expect(Array.isArray(parsed)).toBe(true);
    expect(parsed).toHaveLength(1);
    expect(parsed[0]).toBe("recovery memory");
  });

  test("handles non-array existing file gracefully", async () => {
    const badFormatId = "badformattest";
    const filePath = `${testDir}/${badFormatId}.json`;

    // Create a file that's valid JSON but not an array
    await Bun.write(filePath, JSON.stringify({ not: "an array" }));

    // Should convert to array and save memory
    const result = await saveMemory({ digimonId: badFormatId, memory: "fixed memory" });

    // @ts-ignore
    const content = await Bun.file(result.file as any).text();
    const parsed = JSON.parse(content);
    expect(Array.isArray(parsed)).toBe(true);
    expect(parsed).toContain("fixed memory");
  });

  test("trims whitespace from memory", async () => {
    const memoryWithSpaces = "   memory with extra spaces   ";
    const result = await saveMemory({ digimonId, memory: memoryWithSpaces });

    // @ts-ignore
    const content = await Bun.file(result.file as any).text();
    const parsed = JSON.parse(content);

    // Memory should be trimmed
    expect(parsed[0]).toBe("memory with extra spaces");
    expect(parsed[0]).not.toBe(memoryWithSpaces);
  });

  test("stores memories in valid JSON format with indentation", async () => {
    const memory = "Test pretty-printed JSON";
    await saveMemory({ digimonId, memory });

    // @ts-ignore
    const content = await Bun.file(`${testDir}/${digimonId}.json`).text();

    // Should be valid JSON with 2-space indentation
    expect(() => JSON.parse(content)).not.toThrow();
    expect(content).toContain('\n'); // Pretty-printed
    expect(content).toContain('  '); // Indented
  });
});