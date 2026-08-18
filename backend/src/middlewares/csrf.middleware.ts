import { Request, Response, NextFunction } from "express";
import { env } from "../config/env";

const MUTATING_METHODS = new Set(["POST", "PATCH", "PUT", "DELETE"]);

/**
 * CSRF protection for cross-origin SPA.
 *
 * With `sameSite: "none"` cookies (required for cross-origin Vercel→Railway),
 * browsers will attach the session cookie to requests from ANY origin.
 * This middleware ensures mutating requests only come from our frontend.
 *
 * How it works:
 * - Browsers always send the `Origin` header on cross-origin requests.
 * - We reject any mutating request whose `Origin` doesn't match FRONTEND_URL.
 * - Safe methods (GET, HEAD, OPTIONS) are allowed through.
 */
export function csrfProtection(req: Request, res: Response, next: NextFunction): void {
  if (!MUTATING_METHODS.has(req.method)) {
    next();
    return;
  }

  const origin = req.headers.origin;

  // Allow requests with no origin (same-origin, curl, Postman in dev)
  // In production, browsers always send Origin on cross-origin POST/PATCH/DELETE
  if (!origin) {
    next();
    return;
  }

  const allowedOrigin = new URL(env.FRONTEND_URL).origin;

  if (origin !== allowedOrigin) {
    res.status(403).json({ error: "Forbidden: invalid origin" });
    return;
  }

  next();
}
