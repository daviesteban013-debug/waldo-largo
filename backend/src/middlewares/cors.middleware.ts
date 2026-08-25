import cors from "cors";
import { env } from "../config/env";

/**
 * CORS middleware with dynamic origin validation.
 *
 * Accepts any origin present in the ALLOWED_ORIGINS env var (comma-separated).
 * This lets us allow both https://waldolargo.com and https://www.waldolargo.com
 * (plus localhost for dev) without a wildcard.
 */
export const corsMiddleware = cors({
  origin(requestOrigin, callback) {
    // Allow requests with no origin (same-origin, server-to-server, curl)
    if (!requestOrigin) {
      callback(null, true);
      return;
    }

    if (env.ALLOWED_ORIGINS.includes(requestOrigin)) {
      callback(null, requestOrigin);
    } else {
      callback(new Error(`Origin ${requestOrigin} not allowed by CORS`));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type"],
});
