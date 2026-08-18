import { z } from "zod";
import { isValidSlug } from "../utils/slugify";

const slugSchema = z
  .string()
  .max(200)
  .refine(isValidSlug, { message: "Invalid slug format" });

export const createPostSchema = z.object({
  title: z.string().min(1).max(200),
  slug: slugSchema.optional(),
  excerpt: z.string().max(500).optional(),
  content: z.string().min(1).max(100_000),
  coverImageUrl: z.url().max(2048).optional(),
  status: z.enum(["DRAFT", "PUBLISHED"]).optional(),
});

export const updatePostSchema = createPostSchema.partial();

export const postIdParamSchema = z.object({
  id: z.string().min(1),
});

export const postSlugParamSchema = z.object({
  slug: z.string().min(1).max(200),
});

export const listPostsQuerySchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().min(1).max(50).default(10),
});

export type CreatePostInput = z.infer<typeof createPostSchema>;
export type UpdatePostInput = z.infer<typeof updatePostSchema>;
export type ListPostsQuery = z.infer<typeof listPostsQuerySchema>;
