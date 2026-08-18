import { Router } from "express";
import { submit } from "../controllers/contact.controller";
import { validate } from "../middlewares/validate.middleware";
import { contactSchema } from "../schemas/contact.schema";
import { contactRateLimiter } from "../middlewares/rateLimit.middleware";

const router = Router();

router.post("/", contactRateLimiter, validate(contactSchema), submit);

export default router;
