// app/blog/page.tsx (or wherever your page is located)
import React from "react";
import { getAllBlog } from "../actions/blogActions";
import PaginationComponent from "./PaginationComponent";

export default async function BlogPage() {
  const allBlogs = await getAllBlog(1);

  if (!allBlogs) return;

  return (
    <div>
      <PaginationComponent allBlogs={allBlogs} />
    </div>
  );
}
