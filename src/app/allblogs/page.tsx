// app/blog/page.tsx (or wherever your page is located)
import React from "react";
import { getAllBlog } from "../actions/blogActions";
import InfinitePaginationComponent from "./InfinitePaginationComponent";

export default async function BlogPage() {
  const data = await getAllBlog(1);

  const allBlogs = data?.allBlogs;

  if (!allBlogs) return;

  return (
    <div>
      <InfinitePaginationComponent allBlogs={allBlogs} />
    </div>
  );
}
