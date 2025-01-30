import React from "react";
import TabsComponent from "./TabsComponent";
import { getAllBlog } from "@/app/actions/blogActions";

export default async function page() {
  const allBlogs = await getAllBlog();

  return (
    <div className="container mx-auto py-10">
      {allBlogs && <TabsComponent allBlogs={allBlogs} />}
    </div>
  );
}
