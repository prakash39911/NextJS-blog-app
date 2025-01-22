import { ReactNode } from "react";
import Navbar from "./Navbar";
import { Toaster } from "./ui/sonner";

export default function Provider({ children }: { children: ReactNode }) {
  return (
    <div>
      <Navbar />
      {children}
      <Toaster />
    </div>
  );
}
