import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().min(1).max(100),
  email: z.email(),
  message: z.string().min(10).max(5000),
});

export type ContactInput = z.infer<typeof contactSchema>;
