import React from "react";
import { getAllBlogsForUserId } from "../actions/blogActions";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import ComponentWrapper from "./ComponentWrapper";

export default async function page() {
  const session = await getServerSession(authOptions);
  const permissionArray = session?.user.permissions;

  const allBlogs = await getAllBlogsForUserId();

  if (!allBlogs || (allBlogs && allBlogs.length === 0))
    return (
      <div className="flex vertical-center items-center">
        You have not created any Blogs!
        <Link
          href="/createpost"
          className="text-blue-500 font-bold cursor-pointer"
        >
          Create Blog
        </Link>
      </div>
    );

  return (
    <div className="container mx-auto py-10 flex justify-center">
      <ComponentWrapper allBlogs={allBlogs} permissionArray={permissionArray} />
    </div>
  );
}
