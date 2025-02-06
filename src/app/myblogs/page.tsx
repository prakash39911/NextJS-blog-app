import React from "react";
import { getAllBlogsForUserId } from "../actions/blogActions";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import ComponentWrapper from "./ComponentWrapper";

export default async function page({
  searchParams,
}: {
  searchParams: Promise<{ page: string }>;
}) {
  const page = (await searchParams).page ?? 1;

  const session = await getServerSession(authOptions);
  const permissionArray = session?.user.permissions;

  const data = await getAllBlogsForUserId(parseInt(page));
  const allBlogs = data?.allBlogs;
  const count = data?.count;

  if (!allBlogs || !count || (allBlogs && allBlogs.length === 0))
    return (
      <div className="flex vertical-center justify-center items-center flex-col">
        You have not created any Blogs!
        <Link
          href="/createpost"
          className="text-blue-500 font-bold cursor-pointer"
        >
          Create Blog
        </Link>
      </div>
    );

  const totalPages = Math.ceil(
    count / Number(process.env.PAGINATION_RESULT_PER_PAGE)
  );

  return (
    <div className="container mx-auto py-10 flex justify-center">
      <ComponentWrapper
        allBlogs={allBlogs}
        permissionArray={permissionArray}
        count={count}
        currentPage={Number(page)}
        totalPages={totalPages}
      />
    </div>
  );
}
