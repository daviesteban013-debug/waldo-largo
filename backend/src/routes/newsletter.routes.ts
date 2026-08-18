import { Router } from "express";
import * as newsletterController from "../controllers/newsletter.controller";
import { validate } from "../middlewares/validate.middleware";
import {
  subscribeSchema,
  unsubscribeSchema,
  confirmQuerySchema,
} from "../schemas/newsletter.schema";
import { newsletterRateLimiter } from "../middlewares/rateLimit.middleware";

const router = Router();

router.post(
  "/subscribe",
  newsletterRateLimiter,
  validate(subscribeSchema),
  newsletterController.subscribe,
);
router.get(
  "/confirm",
  validate(confirmQuerySchema, "query"),
  newsletterController.confirm,
);
router.post(
  "/unsubscribe",
  validate(unsubscribeSchema),
  newsletterController.unsubscribe,
);

export default router;
