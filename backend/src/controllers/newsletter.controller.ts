import { Request, Response, NextFunction } from "express";
import * as newsletterService from "../services/newsletter.service";
import { env } from "../config/env";

export async function subscribe(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const result = await newsletterService.subscribe(req.body.email);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
}

export async function confirm(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const result = await newsletterService.confirmViaApi(req.query.token as string);

    if (req.headers.accept?.includes("text/html")) {
      res.redirect(`${env.FRONTEND_URL}/newsletter/confirmed`);
      return;
    }

    res.json(result);
  } catch (error) {
    next(error);
  }
}

export async function unsubscribe(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const result = await newsletterService.unsubscribe(req.body.token);
    res.json(result);
  } catch (error) {
    next(error);
  }
}
