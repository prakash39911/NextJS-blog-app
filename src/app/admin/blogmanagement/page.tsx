import React from "react";
import TabsComponent from "./TabsComponent";
import { getAllBlog } from "@/app/actions/blogActions";

export default async function page({
  searchParams,
}: {
  searchParams: Promise<{ page: string }>;
}) {
  const page = (await searchParams).page ?? 1;
  const pageSize = process.env.PAGINATION_RESULT_PER_PAGE as string;
  const data = await getAllBlog(parseInt(page), parseInt(pageSize));

  const allBlogs = data?.allBlogs;
  const pendingBlogCount = data?.pendingBlogCount ?? 0;
  const approvedBlogCount = data?.approvedBlogCount ?? 0;

  const totalPendingBlogPages = Math.ceil(
    pendingBlogCount / parseInt(pageSize)
  );

  const totalApprovedBlogPages = Math.ceil(
    approvedBlogCount / parseInt(pageSize)
  );

  return (
    <div className="container px-48 py-10">
      {allBlogs && (
        <TabsComponent
          allBlogs={allBlogs}
          currentPage={parseInt(page)}
          totalPendingBlogPages={totalPendingBlogPages}
          totalApprovedBlogPages={totalApprovedBlogPages}
        />
      )}
    </div>
  );
}
