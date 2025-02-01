"use server";

import { authOptions } from "@/lib/authOptions";
import prisma from "@/lib/PrismaClient";
import {
  registerSchema,
  registerSchemaType,
} from "@/lib/schema/registerSchema";
import bcrypt from "bcrypt";
import { getServerSession } from "next-auth";

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

export async function getCurrentUserId() {
  const session = await getServerSession(authOptions);

  const userId = session?.user.id;

  if (!userId) throw new Error("Unauthorised");

  return userId;
}

export async function getUserInfo(userId: string) {
  try {
    return prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
  } catch (error) {
    console.log(error);
  }
}

export async function getAllUserDetails() {
  try {
    const allUsers = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        permissions: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return allUsers;
  } catch (error) {
    console.log(error);
  }
}

export async function getCurrentUserSessionData() {
  try {
    const session = await getServerSession(authOptions);

    if (session) return session;
  } catch (error) {
    console.log(error);
  }
}
