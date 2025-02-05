"use client";

import { ReactNode } from "react";
import { Toaster } from "./ui/sonner";
import { SessionProvider } from "next-auth/react";
import { useNotificationChannel } from "@/hooks/useNotificationChannel";

export default function Provider({
  children,
  userId,
}: {
  children: ReactNode;
  userId: string;
}) {
  useNotificationChannel(userId);

  return (
    <>
      <SessionProvider>
        {children}
        <Toaster />
      </SessionProvider>
    </>
  );
}
