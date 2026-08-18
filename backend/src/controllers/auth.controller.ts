import { Request, Response, NextFunction } from "express";
import { loginUser, getUserById } from "../services/auth.service";
import { AppError } from "../utils/errors";

export async function login(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const user = await loginUser(req.body);

    req.session.userId = user.id;

    req.session.save((err) => {
      if (err) {
        next(new AppError(500, "Failed to create session"));
        return;
      }
      res.json({ user });
    });
  } catch (error) {
    next(error);
  }
}

export function logout(req: Request, res: Response, next: NextFunction): void {
  req.session.destroy((err) => {
    if (err) {
      next(new AppError(500, "Failed to logout"));
      return;
    }
    res.clearCookie("sid");
    res.json({ success: true });
  });
}

export async function me(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const user = await getUserById(req.session.userId!);
    res.json({ user });
  } catch (error) {
    next(error);
  }
}
