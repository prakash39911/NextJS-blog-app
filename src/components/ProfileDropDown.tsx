"use Client";

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
import { Button } from "./ui/button";
import Link from "next/link";

export default function ProfileDropDown({ sessionData }: any) {
  const isAdmin = sessionData?.user?.role === "ADMIN";

  return (
    <div className="flex flex-row items-center gap-4">
      {!isAdmin && (
        <div>
          <Link href="/createpost">
            <Button className="bg-gray-600 font-semibold border border-gray-500 hover:bg-gray-700">
              Create Post
            </Button>
          </Link>
        </div>
      )}

      {isAdmin && (
        <div>
          <Link href="/admin/blogmanagement">
            <Button className="bg-gray-600 font-bold border border-gray-500 hover:bg-gray-700">
              Admin Panel
            </Button>
          </Link>
        </div>
      )}
      <div>
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center">
            <AvatarComponent />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-gray-200">
            <DropdownMenuLabel>
              {isAdmin ? "Hello Admin" : `Hello ${sessionData?.user.name}`}
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Edit</DropdownMenuItem>
            <DropdownMenuItem className="text-red-700">
              <LogOutUser />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
