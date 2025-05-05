"use client";

import { getBlogForTrendingTab } from "@/app/actions/blogActions";
import { redirect, useRouter } from "next/navigation";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import LoadingSpinner from "./LoadingSpinner";

interface blogDataType {
  id: string;
  title: string;
  image: string | null;
  date: string;
  readTime: string;
}

const TrendingBlogsSidebar = () => {
  const [trendingBlogs, setTrendingBlogs] = useState<blogDataType[] | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const data = await getBlogForTrendingTab();

      if (data) {
        setTrendingBlogs(data);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="w-80 sticky top-8 h-fit">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-6 pb-2 border-b border-gray-200">
          Trending Now
        </h2>

        <div className="space-y-5">
          {trendingBlogs?.map((blog) => (
            <div
              key={blog.id}
              className="flex gap-3 group"
              onClick={() => router.push(`/blog/${blog.id}`)}
            >
              <div className="flex-shrink-0">
                {blog.image && (
                  <Image
                    width={50}
                    height={50}
                    src={blog.image}
                    alt={blog.title}
                    className="w-16 h-16 rounded-md object-cover"
                  />
                )}
              </div>
              <div>
                <a
                  href="#"
                  className="block mt-1 text-sm font-medium text-gray-900 group-hover:text-indigo-600 transition-colors"
                >
                  {blog.title}
                </a>
                <div className="flex items-center mt-1 text-xs text-gray-500">
                  <span>{blog.date}</span>
                  <span className="mx-1">•</span>
                  <span>{blog.readTime}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrendingBlogsSidebar;
