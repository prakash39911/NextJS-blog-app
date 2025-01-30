"use client";

import ButtonComponent from "@/components/ButtonComponent";
import { useRouter } from "next/navigation";
import React from "react";

export default function GoToAllBlogsButton() {
  const router = useRouter();

  return (
    <div>
      <ButtonComponent
        btnText="Go to all Blogs"
        cssClass="hover:bg-blue-600 hover:text-gray-100 border-2 border-blue-400 text-blue-700 font-bold"
        onButtonClick={() => router.push("/allblogs")}
      />
    </div>
  );
}
