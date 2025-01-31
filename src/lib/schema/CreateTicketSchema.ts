import { z } from "zod";

export const createTicketSchema = z.object({
  issue: z.string().min(4, { message: "Please enter Valid Issue" }),
  description: z
    .string()
    .min(10, { message: "Please describe your issue properly" }),
});

export type createTicketType = z.infer<typeof createTicketSchema>;
