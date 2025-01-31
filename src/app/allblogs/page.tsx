import React from "react";
import { getAllBlog } from "../actions/blogActions";
import EachBlogCard from "@/components/EachBlogCard";

export default async function AllBlogs() {
  const allBlogs = await getAllBlog();

  if (allBlogs?.length === 0)
    return (
      <div className="flex items-center justify-center w-full vertical-center text-2xl text-gray-500 font-extralight">
        No Blog Found
      </div>
    );
  return (
    <div className="flex flex-col w-full vertical-center items-center">
      {allBlogs?.map((blog) => (
        <div key={blog.id}>
          {blog.isApproved && blog.published && <EachBlogCard blog={blog} />}
        </div>
      ))}
    </div>
  );
}
