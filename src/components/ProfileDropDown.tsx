"use client";

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
import { useRouter } from "next/navigation";
import { FaCaretDown } from "react-icons/fa";

export default function ProfileDropDown({ sessionData }: any) {
  const router = useRouter();
  const isAdmin = sessionData?.user?.role === "ADMIN";

  return (
    <div className="flex flex-row items-center gap-4">
      <div>
        <Link href="/createpost">
          <Button className="bg-gray-600 font-semibold border border-gray-500 hover:bg-gray-700">
            Create Post
          </Button>
        </Link>
      </div>

      <div>
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center">
            <AvatarComponent />
            <FaCaretDown className="text-white" />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-gray-200">
            <DropdownMenuLabel>
              {isAdmin ? "Hello Admin" : `Hello ${sessionData?.user.name}`}
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Edit Profile</DropdownMenuItem>
            <DropdownMenuItem onClick={() => router.push("/createticket")}>
              Create Ticket
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => router.push("/alltickets")}>
              View Tickets
            </DropdownMenuItem>

            <DropdownMenuItem className="text-red-700">
              <LogOutUser />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
