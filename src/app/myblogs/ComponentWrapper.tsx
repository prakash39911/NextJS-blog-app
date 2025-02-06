"use client";

import CardContainer from "@/components/CardContainer";
import React, { useEffect } from "react";
import EachBlogView from "./EachBlogView";
import { BlogStore } from "@/hooks/BlogStore";
import { PaginationComponent } from "../../components/PaginationComponent";
import { usePathname } from "next/navigation";

export default function ComponentWrapper({
  allBlogs,
  permissionArray,
  currentPage,
  totalPages,
}: {
  totalPages: number;
  count: number;
  currentPage: number;
  allBlogs: userBlogType[];
  permissionArray: Array<"CREATE" | "EDIT" | "DELETE">;
}) {
  const pathname = usePathname();

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
    <div className="flex flex-col gap-3">
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
      {!(totalPages === 1) && (
        <PaginationComponent
          currentPage={currentPage}
          totalPages={totalPages}
          pathname={pathname}
        />
      )}
    </div>
  );
}
