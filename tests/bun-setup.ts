// bun-setup.ts - Mock setup for save-memory skill tests
// This file sets up global mocks before tests run

// Mock the SDK module
Bun.mock("@opencode-ai/sdk/v2", () => ({
  createOpencodeClient: async () => {
    return {
      tui: {
        showToast: async ({ message, variant }: { message: string; variant: string }) => {
          // Silent in tests for speed, uncomment for debugging:
          // console.log(`[Toast ${variant}]: ${message}`);
        }
      }
    };
  }
}));

// Mock loadCodeQualityContext to do nothing in tests
Bun.mock("../../.opencode/tool/load-code-quality-context/index.ts", () => ({
  loadCodeQualityContext: async () => {}
}));

// Mock the SDK module for read-file skill
Bun.mock("@opencode-ai/sdk/v2", () => ({
  createOpencodeClient: async () => {
    return {
      tui: {
        showToast: async ({ message, variant }: { message: string; variant: string }) => {
          // Silent in tests for speed, uncomment for debugging:
          // console.log(`[Toast ${variant}]: ${message}`);
        }
      }
    };
  }
}));