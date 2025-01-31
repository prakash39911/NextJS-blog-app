"use client";

import ButtonComponent from "@/components/ButtonComponent";
import { useRouter } from "next/navigation";
import React from "react";

export default function SuccessButton() {
  const router = useRouter();

  return (
    <div>
      <ButtonComponent
        btnText="Go to Ticket Section"
        onButtonClick={() => router.push("/alltickets")}
      />
    </div>
  );
}
