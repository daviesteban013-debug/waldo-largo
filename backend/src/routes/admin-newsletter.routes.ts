import { Router } from "express";
import { list } from "../controllers/admin-newsletter.controller";
import { validate } from "../middlewares/validate.middleware";
import { subscriberListQuerySchema } from "../schemas/admin.schema";
import { requireAuth } from "../middlewares/auth.middleware";

const router = Router();

router.use(requireAuth);
router.get("/", validate(subscriberListQuerySchema, "query"), list);

export default router;
