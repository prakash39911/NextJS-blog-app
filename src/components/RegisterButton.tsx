import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";

export default function RegisterButton() {
  return (
    <div>
      <Link href="/register">
        <Button className="bg-gray-600 border border-gray-500 text-white font-semibold hover:bg-gray-700">
          Register
        </Button>{" "}
      </Link>
    </div>
  );
}
