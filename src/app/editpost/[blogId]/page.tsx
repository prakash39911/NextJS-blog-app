import { getBlogforID } from "@/app/actions/blogActions";
import React from "react";
import EditPostForm from "./EditPostForm";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import Link from "next/link";

export default async function page({
  params,
}: {
  params: Promise<{ blogId: string }>;
}) {
  const session = await getServerSession(authOptions);
  const isEditAllowed = session?.user?.permissions?.includes("EDIT");

  if (!isEditAllowed)
    return (
      <div className="flex flex-col gap-3 vertical-center justify-center items-center">
        <div className="text-3xl font-bold text-gray-500">
          You are not authorized
        </div>
        <div>Please Contact our Support team...</div>
        <div>
          <Link
            href="/createticket"
            className="cursor-pointer text-blue-500 font-bold border border-blue-500 px-3 py-2 rounded-lg"
          >
            Contact us
          </Link>
        </div>
      </div>
    );

  const { blogId } = await params;

  const blog = await getBlogforID(blogId);

  if (!blog)
    return (
      <div className="flex vertical-center justify-center items-center">
        No Blogs Found
      </div>
    );

  return (
    <div className="flex flex-col gap-4 items-center justify-center vertical-center">
      <div className="flex justify-center">
        <h1 className="text-4xl text-gray-700">Edit Post</h1>
      </div>
      <EditPostForm blog={blog} />
    </div>
  );
}
