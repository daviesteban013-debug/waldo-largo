import { z } from "zod";

export const paginationQuerySchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
});

export const contactListQuerySchema = paginationQuerySchema;

export const subscriberListQuerySchema = paginationQuerySchema.extend({
  status: z.enum(["PENDING", "CONFIRMED", "UNSUBSCRIBED"]).optional(),
});

export type PaginationQuery = z.infer<typeof paginationQuerySchema>;
export type ContactListQuery = z.infer<typeof contactListQuerySchema>;
export type SubscriberListQuery = z.infer<typeof subscriberListQuerySchema>;
