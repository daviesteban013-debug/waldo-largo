import { Router } from "express";
import { healthCheck } from "../controllers/health.controller";
import authRoutes from "./auth.routes";
import { postsPublicRouter, postsAdminRouter } from "./posts.routes";
import contactRoutes from "./contact.routes";
import newsletterRoutes from "./newsletter.routes";
import adminContactRoutes from "./admin-contact.routes";
import adminNewsletterRoutes from "./admin-newsletter.routes";

const router = Router();

router.get("/health", healthCheck);
router.use("/auth", authRoutes);
router.use("/posts", postsPublicRouter);
router.use("/admin/posts", postsAdminRouter);
router.use("/admin/contact", adminContactRoutes);
router.use("/admin/newsletter", adminNewsletterRoutes);
router.use("/contact", contactRoutes);
router.use("/newsletter", newsletterRoutes);

export default router;
