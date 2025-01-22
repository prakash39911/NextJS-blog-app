import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import AvatarComponent from "./AvatarComponent";
import LogOutUser from "./LogOutUser";

export default function ProfileDropDown() {
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <AvatarComponent />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="bg-gray-200">
          <DropdownMenuLabel>Profile</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Edit</DropdownMenuItem>
          <DropdownMenuItem className="text-red-700">
            <LogOutUser />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
