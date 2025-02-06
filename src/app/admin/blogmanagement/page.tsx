import React from "react";
import TabsComponent from "./TabsComponent";
import { getAllBlog } from "@/app/actions/blogActions";

export default async function page({
  searchParams,
}: {
  searchParams: Promise<{ page: string }>;
}) {
  const page = (await searchParams).page ?? 1;
  const data = await getAllBlog(parseInt(page));

  const allBlogs = data?.allBlogs;
  const pendingBlogCount = data?.pendingBlogCount ?? 0;
  const approvedBlogCount = data?.approvedBlogCount ?? 0;

  const totalPendingBlogPages = Math.ceil(
    pendingBlogCount / Number(process.env.PAGINATION_RESULT_PER_PAGE)
  );

  const totalApprovedBlogPages = Math.ceil(
    approvedBlogCount / Number(process.env.PAGINATION_RESULT_PER_PAGE)
  );

  return (
    <div className="container mx-auto py-10">
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
