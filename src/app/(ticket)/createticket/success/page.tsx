import SuccessMessageCard from "@/components/SuccessMessageCard";
import React from "react";
import SuccessButton from "./SuccessButton";

export default function page() {
  return (
    <div>
      <SuccessMessageCard
        title="Ticket has been Submitted"
        description="We will look into the Issue ASAP."
      >
        <SuccessButton />
      </SuccessMessageCard>
    </div>
  );
}
