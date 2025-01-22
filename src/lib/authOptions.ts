import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import type { NextAuthOptions } from "next-auth";

import prisma from "./PrismaClient";
import bcrypt from "bcrypt";
import { loginSchema } from "./schema/loginSchama";

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email ID",
          type: "text",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },
      async authorize(credentials: any) {
        const validate = loginSchema.safeParse(credentials);

        if (!validate.success) return null;

        const { email, password } = validate.data;

        const existingUser = await prisma.user?.findFirst({
          where: {
            email,
          },
        });

        if (
          !existingUser ||
          !(await bcrypt.compare(password, existingUser.password))
        ) {
          return null;
        }

        return existingUser;
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user }: any) {
      if (user) {
        token.id = user.id;
        token.profileComplete = user.profileComplete;
        token.role = user.role;
      }
      return token;
    },
    async session({ token, session }: any) {
      if (token?.id) {
        session.user.id = token.id;
        session.user.profileComplete = token.profileComplete;
        session.user.role = token.role;
      }
      return session;
    },
  },
  session: { strategy: "jwt" },
} satisfies NextAuthOptions;
