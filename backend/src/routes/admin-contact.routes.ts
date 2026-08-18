import { Router } from "express";
import { list } from "../controllers/admin-contact.controller";
import { validate } from "../middlewares/validate.middleware";
import { contactListQuerySchema } from "../schemas/admin.schema";
import { requireAuth } from "../middlewares/auth.middleware";

const router = Router();

router.use(requireAuth);
router.get("/", validate(contactListQuerySchema, "query"), list);

export default router;
