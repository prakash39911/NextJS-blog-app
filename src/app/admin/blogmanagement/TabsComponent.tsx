"use client";

import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import EachBlogView from "./EachBlogView";
import CardContainer from "../../../components/CardContainer";
import { PaginationComponent } from "@/components/PaginationComponent";
import { usePathname } from "next/navigation";

export default function TabsComponent({
  allBlogs,
  currentPage,
  totalPendingBlogPages,
  totalApprovedBlogPages,
}: {
  allBlogs: blogType[];
  currentPage: number;
  totalPendingBlogPages: number | undefined;
  totalApprovedBlogPages: number | undefined;
}) {
  const pathname = usePathname();
  const [activeTab, setActiveTab] = React.useState("pending");

  const cardTitle = ["Image", "Title", "Author", "Created", "Action"];

  return (
    <div>
      <Tabs
        defaultValue="pending"
        className="w-[400px]"
        onValueChange={setActiveTab}
      >
        <TabsList className="w-[350px] h-[50px] flex flex-row gap-1">
          <TabsTrigger
            value="pending"
            className={cn(
              "w-full h-full transition-colors font-bold text-xl",
              "data-[state=active]:bg-red-500 data-[state=active]:text-white ",
              activeTab === "pending" ? "hover:text-red-500" : ""
            )}
          >
            Pending
          </TabsTrigger>
          <TabsTrigger
            value="approved"
            className={cn(
              "w-full h-full transition-colors font-bold text-xl",
              "data-[state=active]:bg-blue-500 data-[state=active]:text-white",
              activeTab === "approved" ? "hover:text-blue-500" : ""
            )}
          >
            Approved
          </TabsTrigger>
        </TabsList>
        <TabsContent value="pending" className=" flex gap-3 flex-col">
          <CardContainer
            cardTitle={cardTitle}
            cssStyle={
              "grid grid-cols-5 border border-gray-300 rounded-md p-1.5"
            }
          >
            {allBlogs.map((blog: blogType) => {
              return (
                <div key={blog.id}>
                  {!blog.isApproved && <EachBlogView blog={blog} />}
                </div>
              );
            })}
          </CardContainer>
          <PaginationComponent
            currentPage={currentPage}
            totalPages={totalPendingBlogPages}
            pathname={pathname}
          />
        </TabsContent>
        <TabsContent value="approved" className=" flex gap-3 flex-col">
          <CardContainer
            cardTitle={cardTitle}
            cssStyle={
              "grid grid-cols-5 border border-gray-300 rounded-md p-1.5"
            }
          >
            {allBlogs.map((blog: blogType) => {
              return (
                <div key={blog.id}>
                  {blog.isApproved && <EachBlogView blog={blog} />}
                </div>
              );
            })}
          </CardContainer>

          <PaginationComponent
            currentPage={currentPage}
            totalPages={totalApprovedBlogPages}
            pathname={pathname}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
