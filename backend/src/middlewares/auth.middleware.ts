import { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/errors";

export function requireAuth(req: Request, _res: Response, next: NextFunction): void {
  if (!req.session.userId) {
    next(new AppError(401, "Authentication required"));
    return;
  }
  next();
}
