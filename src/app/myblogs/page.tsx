import React from "react";
import { getAllBlogsForUserId } from "../actions/blogActions";
import CardContainer from "@/components/CardContainer";
import Link from "next/link";
import EachBlogView from "./EachBlogView";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

export default async function page() {
  const session = await getServerSession(authOptions);
  const permissionArray = session?.user.permissions;

  const cardTitle = [
    "Image",
    "Title",
    "Created",
    "Status",
    "Published",
    "Action",
  ];

  const allBlogs = await getAllBlogsForUserId();

  if (allBlogs && allBlogs.length === 0)
    return (
      <div className="flex vertical-center items-center">
        You have not created any Blogs!
        <Link
          href="/createpost"
          className="text-blue-500 font-bold cursor-pointer"
        >
          Create Blog
        </Link>
      </div>
    );

  return (
    <div className="container mx-auto py-10 flex justify-center">
      <CardContainer
        cardTitle={cardTitle}
        cssStyle={"grid grid-cols-6 border border-gray-300 rounded-md p-1.5"}
      >
        {allBlogs &&
          allBlogs.map((blog) => (
            <EachBlogView
              key={blog.id}
              blog={blog}
              permissionArray={permissionArray}
            />
          ))}
      </CardContainer>
    </div>
  );
}
