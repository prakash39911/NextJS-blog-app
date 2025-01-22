import React from "react";
import NavItems from "./NavItems";
import { FaBlog } from "react-icons/fa";
import LoginButton from "./LoginButton";
import RegisterButton from "./RegisterButton";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import ProfileDropDown from "./ProfileDropDown";

export default async function Navbar() {
  const session = await getServerSession(authOptions);

  return (
    <div className="bg-gray-600 p-5">
      <div className="flex flex-row justify-between items-center mx-8">
        <div>
          <div className="flex flex-row gap-2 items-center cursor-pointer">
            <span>
              <FaBlog className="text-gray-200" size={28} />
            </span>
            <span className="font-bold text-4xl text-gray-200">Blog</span>
          </div>
        </div>
        <div>
          <NavItems />
        </div>
        <div>
          {session ? (
            <ProfileDropDown />
          ) : (
            <div className="flex flex-row gap-3">
              <LoginButton />
              <RegisterButton />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
