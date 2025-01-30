"use client";

import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import EachBlogView from "./EachBlogView";
import CardContainer from "../CardContainer";

export default function TabsComponent({ allBlogs }: { allBlogs: blogType[] }) {
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
        <TabsContent value="pending">
          <CardContainer cardTitle={cardTitle}>
            {allBlogs.map((blog: blogType) => {
              return (
                <div key={blog.id}>
                  {!blog.isApproved && <EachBlogView blog={blog} />}
                </div>
              );
            })}
          </CardContainer>
        </TabsContent>
        <TabsContent value="approved">
          <CardContainer cardTitle={cardTitle}>
            {allBlogs.map((blog: blogType) => {
              return (
                <div key={blog.id}>
                  {blog.isApproved && <EachBlogView blog={blog} />}
                </div>
              );
            })}
          </CardContainer>
        </TabsContent>
      </Tabs>
    </div>
  );
}
