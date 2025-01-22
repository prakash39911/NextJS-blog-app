import React from "react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";

export default function AvatarComponent() {
  return (
    <div>
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" />
      </Avatar>
    </div>
  );
}
