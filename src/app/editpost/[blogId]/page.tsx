import { getBlogforID } from "@/app/actions/blogActions";
import React from "react";
import EditPostForm from "./EditPostForm";

export default async function page({
  params,
}: {
  params: Promise<{ blogId: string }>;
}) {
  const { blogId } = await params;
  console.log(blogId);

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
