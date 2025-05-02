import React from "react";
import NavItems from "./NavItems";
import LoginButton from "./LoginButton";
import RegisterButton from "./RegisterButton";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import ProfileDropDown from "./ProfileDropDown";
import BlogLogo from "./BlogLogo";

export default async function Navbar() {
  const session = await getServerSession(authOptions);
  const isAdmin = session?.user.role === "ADMIN";

  const memberLink = [
    { label: "All Blogs", href: "/allblogs" },
    {
      label: "My Blogs",
      href: "/myblogs",
    },
  ];

  const adminLink = [
    { label: "Blog Management", href: "/admin/blogmanagement" },
    { label: "User Management", href: "/admin/usermanagement" },
    { label: "Ticket Management", href: "/admin/ticketmanagement" },
  ];

  const links = isAdmin ? adminLink : memberLink;

  return (
    <div className="bg-white p-4">
      <div className="flex flex-row justify-between items-center mx-8">
        <BlogLogo />
        <div className="flex flex-row gap-6">
          {links.map((link) => (
            <NavItems key={link.label} href={link.href} label={link.label} />
          ))}
        </div>
        <div>
          {session ? (
            <ProfileDropDown sessionData={session} />
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
