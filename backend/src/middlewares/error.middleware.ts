import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";
import { isAppError } from "../utils/errors";
import { isProduction } from "../config/env";
import { logger } from "../utils/logger";

/**
 * Global Error Handling Middleware (Zero Data Leakage)
 *
 * Catches all thrown exceptions and formats responses consistently:
 * - 400 for validation errors (Zod)
 * - 4xx for known business/domain errors (AppError)
 * - 500 for unhandled internal server errors
 *
 * In production:
 * Stack traces, internal Prisma errors, SQL queries, and file paths are NEVER exposed to the client.
 */
export function errorHandler(
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction,
): void {
  // 1. Zod Validation Errors
  if (err instanceof ZodError) {
    const formattedDetails = err.issues.map((issue) => ({
      path: issue.path.join("."),
      message: issue.message,
    }));

    res.status(400).json({
      success: false,
      message: "Validation failed",
      error: "Validation failed",
      details: formattedDetails,
    });
    return;
  }

  // 2. Known Operational / Application Errors
  if (isAppError(err)) {
    res.status(err.statusCode).json({
      success: false,
      message: err.message,
      error: err.message,
      ...(err.code ? { code: err.code } : {}),
    });
    return;
  }

  // 3. Body parser JSON Syntax Error (e.g. malformed JSON sent in POST request)
  if (err instanceof SyntaxError && "status" in err && err.status === 400) {
    res.status(400).json({
      success: false,
      message: "Malformed JSON payload",
      error: "Malformed JSON payload",
    });
    return;
  }

  // 4. Unhandled / Internal Server Errors
  // Safely log on server without leaking credentials or PII
  logger.error("Unhandled server exception:", err);

  res.status(500).json({
    success: false,
    message: "Internal server error",
    error: isProduction ? "Internal server error" : (err instanceof Error ? err.message : String(err)),
    ...(isProduction ? {} : { stack: err instanceof Error ? err.stack : undefined }),
  });
}

