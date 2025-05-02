// app/blog/page.tsx (or wherever your page is located)
import React from "react";
import { getAllBlog } from "../actions/blogActions";
import InfinitePaginationComponent from "./InfinitePaginationComponent";

export default async function BlogPage() {
  const pageSize = process.env.INFINITE_PAGINATION_RESULT_PER_PAGE as string;

  const data = await getAllBlog(1, parseInt(pageSize));

  const allBlogs = data?.allBlogs;

  if (!allBlogs || allBlogs?.length === 0)
    return (
      <div className="flex vertical-center justify-center items-center text-xl font-semibold text-gray-500">
        No Blogs Created..
      </div>
    );

  return (
    <div>
      <InfinitePaginationComponent allBlogs={allBlogs} />
    </div>
  );
}
