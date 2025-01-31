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
        token.permissions = user.permissions;
      }
      return token;
    },
    async session({ session }: any) {
      // Fetch fresh data from Database whenever we want to use session data anywhere in our App.
      if (session.user?.email) {
        const freshUserData = await prisma.user.findUnique({
          where: {
            email: session.user.email,
          },
        });

        if (freshUserData) {
          session.user.permissions = freshUserData.permissions;
          session.user.id = freshUserData.id;
          session.user.profileComplete = freshUserData.profileComplete;
          session.user.role = freshUserData.role;
        }
      }

      // if (token?.id) {
      //   session.user.id = token.id;
      //   session.user.profileComplete = token.profileComplete;
      //   session.user.role = token.role;
      //   session.user.permissions = token.permissions;
      // }
      return session;
    },
  },
  session: { strategy: "jwt" },
} satisfies NextAuthOptions;
