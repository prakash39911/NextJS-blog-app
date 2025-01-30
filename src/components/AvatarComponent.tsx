import React from "react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";

export default function AvatarComponent() {
  return (
    <div>
      <Avatar className="h-10 w-10">
        <AvatarImage src="https://github.com/shadcn.png" />
      </Avatar>
    </div>
  );
}
