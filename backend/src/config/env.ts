import { z } from "zod";
import dotenv from "dotenv";

// Load local .env file in non-production environments
dotenv.config();

/**
 * Strict Environment Variable Validation Schema
 * Prevents application startup if any critical secret or configuration is missing or malformed.
 */
const envSchema = z.object({
  NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
  PORT: z.coerce.number().int().positive().default(4000),
  FRONTEND_URL: z.url().default("http://localhost:5173"),
  DATABASE_URL: z.string().min(1, "DATABASE_URL is required for database connection"),
  SESSION_SECRET: z.string().min(32, "SESSION_SECRET must be at least 32 characters long for cryptographically secure cookies"),
  ADMIN_EMAIL: z.email().optional(),
  ADMIN_PASSWORD: z.string().min(8).optional(),
  RESEND_API_KEY: z.string().min(1, "RESEND_API_KEY is required for transactional email sending"),
  EMAIL_FROM: z.email().default("contacto@waldolargo.com"),
  ADMIN_NOTIFICATION_EMAIL: z.email().default("notificaciones@waldolargo.com"),
  TRUST_PROXY: z
    .enum(["true", "false"])
    .default("false")
    .transform((v) => v === "true"),
  VERCEL: z.string().optional(),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  const issues = parsed.error.issues.map(
    (issue) => `  - [${issue.path.join(".") || "GLOBAL"}]: ${issue.message}`
  );

  // Safe error reporting: never dump process.env values to stdout/stderr
  console.error("\n[CRITICAL] Configuration Error: Invalid or missing environment variables:\n" + issues.join("\n") + "\n");
  process.exit(1);
}

export const env = parsed.data;

export const isProduction = env.NODE_ENV === "production";
export const isVercel = Boolean(process.env.VERCEL || env.VERCEL);

