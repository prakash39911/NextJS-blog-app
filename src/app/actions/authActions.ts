"use server";

import prisma from "@/lib/PrismaClient";
import {
  registerSchema,
  registerSchemaType,
} from "@/lib/schema/registerSchema";
import bcrypt from "bcrypt";

export async function RegisterUser(data: registerSchemaType) {
  const validate = registerSchema.safeParse(data);

  if (!validate.success) return { success: "false", data: null };

  const { name, email, password } = validate.data;

  const hashedPassword = await bcrypt.hash(password, 10);

  const createdUser = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  if (!createdUser) return { success: "false", data: null };

  return { success: "true", data: createdUser };
}
