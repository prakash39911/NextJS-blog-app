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
      onClick={handleOnClick}
      className="w-full max-w-6xl h-64 mt-5 bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1 flex flex-col md:flex-row"
    >
      <div className="md:w-1/3 h-48 md:h-full relative overflow-hidden">
        {blog.image && (
          <CldImage
            src={blog.image}
            fill
            alt="Blog cover image"
            className="object-cover transition-transform duration-500 hover:scale-105"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        )}
      </div>

      <div className="p-5 md:w-2/3 flex flex-col">
        <div className="mb-3">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-sm font-medium text-indigo-600">Title</span>
            <h1 className="text-xl font-bold text-gray-800 truncate">
              {blog.title}
            </h1>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <span>By</span>
            <span className="font-medium text-gray-700">{blog.user.name}</span>
          </div>
        </div>

        <div className="flex-1 overflow-hidden">
          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
            Preview
          </span>
          <div className="h-32 overflow-y-auto mt-1 pr-2 custom-scrollbar">
            <HtmlRenderer htmlString={blog.content} />
          </div>
        </div>
      </div>
    </div>
  );
}
