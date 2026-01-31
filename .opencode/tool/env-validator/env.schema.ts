import * as z from "zod";

export const envSchema = z.object({
  PROJECT_DIR: z.string(),
});