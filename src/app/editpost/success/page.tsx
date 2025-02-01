import * as React from "react";

import SuccessMessage from "@/components/SuccessMessageCard";
import GoToAllBlogsButton from "@/app/(createpost)/createpost/success/GoToAllBlogsButton";

export default function SuccessPage() {
  return (
    <div>
      <SuccessMessage
        title="Blog Updated Successfully"
        description="Please Wait for Approval"
      >
        <GoToAllBlogsButton />
      </SuccessMessage>
    </div>
  );
}
