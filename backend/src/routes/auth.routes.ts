import { Router } from "express";
import { login, logout, me } from "../controllers/auth.controller";
import { validate } from "../middlewares/validate.middleware";
import { loginSchema } from "../schemas/auth.schema";
import { requireAuth } from "../middlewares/auth.middleware";
import { loginRateLimiter } from "../middlewares/rateLimit.middleware";

const router = Router();

router.post("/login", loginRateLimiter, validate(loginSchema), login);
router.post("/logout", requireAuth, logout);
router.get("/me", requireAuth, me);

export default router;
