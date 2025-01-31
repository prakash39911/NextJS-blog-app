import GoToAllBlogsButton from "@/app/(createpost)/createpost/success/GoToAllBlogsButton";
import SuccessMessageCard from "@/components/SuccessMessageCard";
import * as React from "react";

export default function SuccessPage() {
  return (
    <SuccessMessageCard
      title="Registration Successfull"
      description="Please Login To Continue"
    >
      <GoToAllBlogsButton />
    </SuccessMessageCard>
  );
}
