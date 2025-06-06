import * as React from "react";

import SuccessMessage from "@/components/SuccessMessageCard";
import GoToAllBlogsButton from "./GoToAllBlogsButton";

export default function SuccessPage() {
  return (
    <div>
      <SuccessMessage
        title="Blog created Successfully"
        description="Please Wait for Approval"
      >
        <GoToAllBlogsButton />
      </SuccessMessage>
    </div>
  );
}
