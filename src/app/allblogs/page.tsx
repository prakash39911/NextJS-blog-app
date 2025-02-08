// app/blog/page.tsx (or wherever your page is located)
import React from "react";
import { getAllBlog } from "../actions/blogActions";
import InfinitePaginationComponent from "./InfinitePaginationComponent";

export default async function BlogPage() {
  const pageSize = process.env.INFINITE_PAGINATION_RESULT_PER_PAGE as string;

  const data = await getAllBlog(1, parseInt(pageSize));

  const allBlogs = data?.allBlogs;
  console.log(allBlogs);

  if (!allBlogs) return;

  return (
    <div>
      <InfinitePaginationComponent allBlogs={allBlogs} />
    </div>
  );
}
