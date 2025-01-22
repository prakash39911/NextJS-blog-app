import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6, { message: "Minimum length should be 6" }),
});

export type loginSchameType = z.infer<typeof loginSchema>;
