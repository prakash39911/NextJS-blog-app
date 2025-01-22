import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";

export default function LoginButton() {
  return (
    <div>
      <Link href="/login">
        <Button className="bg-gray-600 border border-gray-500 text-white font-semibold hover:bg-gray-700">
          Login
        </Button>
      </Link>
    </div>
  );
}
