import { Router } from "express";
import * as postController from "../controllers/post.controller";
import { validate } from "../middlewares/validate.middleware";
import {
  createPostSchema,
  updatePostSchema,
  postIdParamSchema,
  postSlugParamSchema,
  listPostsQuerySchema,
} from "../schemas/post.schema";
import { requireAuth } from "../middlewares/auth.middleware";

const publicRouter = Router();
const adminRouter = Router();

publicRouter.get("/", validate(listPostsQuerySchema, "query"), postController.listPublished);
publicRouter.get(
  "/:slug",
  validate(postSlugParamSchema, "params"),
  postController.getBySlug,
);

adminRouter.use(requireAuth);
adminRouter.get("/", validate(listPostsQuerySchema, "query"), postController.listAll);
adminRouter.get(
  "/:id",
  validate(postIdParamSchema, "params"),
  postController.getById,
);
adminRouter.post("/", validate(createPostSchema), postController.create);
adminRouter.patch(
  "/:id",
  validate(postIdParamSchema, "params"),
  validate(updatePostSchema),
  postController.update,
);
adminRouter.patch(
  "/:id/publish",
  validate(postIdParamSchema, "params"),
  postController.publish,
);
adminRouter.delete(
  "/:id",
  validate(postIdParamSchema, "params"),
  postController.remove,
);

export { publicRouter as postsPublicRouter, adminRouter as postsAdminRouter };
