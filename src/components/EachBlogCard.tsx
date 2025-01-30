"use client";

import React from "react";
import { CldImage } from "next-cloudinary";
import HtmlRenderer from "./HtmlRenderer";
import { useRouter } from "next/navigation";

export default function EachBlogCard({ blog }: { blog: blogType }) {
  const router = useRouter();

  const handleOnClick = () => {
    router.push(`/blog/${blog.id}`);
  };

  return (
    <div
      onClick={() => handleOnClick()}
      className="w-[1400px] h-[250px] bg-gray-200 grid grid-cols-3 cursor-pointer mt-2"
    >
      <div className="col-span-1 bg-gray-300 relative overflow-hidden">
        {blog.image && (
          <CldImage
            src={blog.image}
            width={500}
            height={500}
            alt="Image"
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}
      </div>

      <div className="col-span-2 flex flex-col gap-1 ml-2 h-full">
        <div className="border border-gray-300 bg-gray-200 p-1">
          <div className="flex flex-row gap-1 items-center">
            <span className="text-lg font-semibold">Title-</span>
            <h1 className="text-2xl truncate">{blog.title}</h1>
          </div>
          <div>
            <span className="text-sm font-thin">Author-</span>
            {blog.user.name}
          </div>
        </div>

        <div className="flex-1 overflow-hidden ml-2">
          <span className="font-semibold text-sm">Content:</span>
          <div className="h-[140px] overflow-y-hidden pl-2">
            <HtmlRenderer htmlString={blog.content} />
          </div>
        </div>
      </div>
    </div>
  );
}
