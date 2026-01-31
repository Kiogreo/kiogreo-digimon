import { envSchema } from "./env.schema";

// 2. Parse and validate process.env
const _env = envSchema.safeParse(process.env);

// 3. Throw error if validation fails (Fail-fast)
if (!_env.success) {
  console.error("❌ Invalid environment variables:", _env.error.format());
  process.exit(1);
}

// 4. Export the validated, typed object
export const env = _env.data;

// Use 'env' instead of 'process.env' throughout the app
// console.log(env.PORT); // Typed as number
