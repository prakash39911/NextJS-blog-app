import { getBlogforID } from "@/app/actions/blogActions";
import CloudinaryImageComponent from "@/components/CloudinaryImageComponent";
import HtmlRenderer from "@/components/HtmlRenderer";
import React from "react";

export default async function BlogPage({
  params,
}: {
  params: Promise<{ blogid: string }>;
}) {
  const { blogid } = await params;

  const blog = await getBlogforID(blogid);

  if (!blog)
    return (
      <div className="flex items-center justify-center w-full vertical-center text-2xl text-gray-500 font-extralight">
        Nothing to Show here
      </div>
    );

  return (
    <div className="flex flex-col mx-auto items-center max-w-6xl gap-4 my-5">
      <div>
        <h1 className="text-5xl">{blog?.title}</h1>
        <span>Author-{blog.user.name}</span>
      </div>
      <div className="col-span-1 bg-gray-100 rounded-md">
        {blog?.image && (
          <CloudinaryImageComponent publicId={blog.image_public_id} />
        )}
      </div>
      <div className="text-xl">
        <HtmlRenderer htmlString={blog.content} />
      </div>
    </div>
  );
}
