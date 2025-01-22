import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().min(2, { message: "Please enter Valid name" }),
  email: z.string().email(),
  password: z.string().min(6, { message: "Minimum length should be 6" }),
});

export type registerSchemaType = z.infer<typeof registerSchema>;
