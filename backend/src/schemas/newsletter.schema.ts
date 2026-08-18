import { z } from "zod";

export const subscribeSchema = z.object({
  email: z.email(),
});

export const unsubscribeSchema = z.object({
  token: z.string().min(1).max(128),
});

export const confirmQuerySchema = z.object({
  token: z.string().min(1).max(128),
});

export type SubscribeInput = z.infer<typeof subscribeSchema>;
export type UnsubscribeInput = z.infer<typeof unsubscribeSchema>;
