import { Request, Response, NextFunction } from "express";
import { listContactMessages } from "../services/contact.service";

export async function list(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const result = await listContactMessages(req.query as never);
    res.json(result);
  } catch (error) {
    next(error);
  }
}
