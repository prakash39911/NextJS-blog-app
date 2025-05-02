import { getBlogforID } from "@/app/actions/blogActions";
import BlogCategories from "@/components/BlogCategories";
import CloudinaryImageComponent from "@/components/CloudinaryImageComponent";
import HtmlRenderer from "@/components/HtmlRenderer";
import TrendingBlogsSidebar from "@/components/TrendingBlogSidebar";
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
        Nothing to Show here...
      </div>
    );

  return (
    <div className="grid grid-cols-7 max-w-7xl mx-auto">
      <div className="flex flex-col items-center gap-4 my-5 col-span-5">
        <div className="border rounded-lg shadow-lg border-gray-100 gap-2 flex flex-col p-6 w-full bg-gray-100">
          <h1 className="text-5xl">{blog?.title}</h1>
          <span>
            Author-
            <span className="text-blue-500 font-semibold">
              {blog.user.name}
            </span>{" "}
          </span>
        </div>
        <div className=" bg-gray-100 rounded-md">
          {blog?.image && (
            <CloudinaryImageComponent publicId={blog.image_public_id} />
          )}
        </div>
        <div className="border rounded-lg shadow-lg border-gray-100 p-6 bg-gray-100">
          <HtmlRenderer htmlString={blog.content} />
        </div>
      </div>
      <div className="col-span-2 ml-6 my-3">
        <BlogCategories />
        <TrendingBlogsSidebar />
      </div>
    </div>
  );
}
