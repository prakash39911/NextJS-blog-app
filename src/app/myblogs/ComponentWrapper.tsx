"use client";

import CardContainer from "@/components/CardContainer";
import React, { useEffect } from "react";
import EachBlogView from "./EachBlogView";
import { BlogStore } from "@/hooks/BlogStore";

export default function ComponentWrapper({
  allBlogs,
  permissionArray,
}: {
  allBlogs: userBlogType[];
  permissionArray: Array<"CREATE" | "EDIT" | "DELETE">;
}) {
  const setBlog = BlogStore((state) => state.setBlog);
  const reset = BlogStore((state) => state.reset);
  const blogs = BlogStore((state) => state.blogs);
  const setUpdatedPermissionArray = BlogStore(
    (state) => state.setUpdatedPermissionArray
  );
  const updatedPermissionArray = BlogStore(
    (state) => state.updatedPermissionArray
  );

  useEffect(() => {
    setBlog(allBlogs);
    setUpdatedPermissionArray(permissionArray);

    return () => {
      reset();
    };
  }, [allBlogs, setBlog, permissionArray, setUpdatedPermissionArray, reset]);

  const cardTitle = [
    "Image",
    "Title",
    "Created",
    "Status",
    "Published",
    "Action",
  ];

  return (
    <CardContainer
      cardTitle={cardTitle}
      cssStyle={"grid grid-cols-6 border border-gray-300 rounded-md p-1.5"}
    >
      {blogs &&
        blogs.map((blog) => (
          <EachBlogView
            key={blog.id}
            blog={blog}
            permissionArray={updatedPermissionArray}
          />
        ))}
    </CardContainer>
  );
}
