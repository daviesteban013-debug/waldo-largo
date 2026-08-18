import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";
import { isAppError } from "../utils/errors";
import { isProduction } from "../config/env";

export function errorHandler(
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction,
): void {
  if (err instanceof ZodError) {
    res.status(400).json({
      error: "Validation failed",
      details: err.issues.map((issue) => ({
        path: issue.path.join("."),
        message: issue.message,
      })),
    });
    return;
  }

  if (isAppError(err)) {
    res.status(err.statusCode).json({
      error: err.message,
      ...(err.code ? { code: err.code } : {}),
    });
    return;
  }

  console.error("Unhandled error:", err);
  res.status(500).json({
    error: isProduction ? "Internal server error" : String(err),
  });
}
