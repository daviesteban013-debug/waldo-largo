import { Request, Response, NextFunction } from "express";
import { listSubscribers } from "../services/newsletter.service";

export async function list(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const result = await listSubscribers(req.query as never);
    res.json(result);
  } catch (error) {
    next(error);
  }
}
