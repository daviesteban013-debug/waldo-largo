import { Request, Response, NextFunction } from "express";
import { submitContact } from "../services/contact.service";

export async function submit(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const result = await submitContact(req.body, {
      ipAddress: req.ip,
      userAgent: req.headers["user-agent"],
    });
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
}
