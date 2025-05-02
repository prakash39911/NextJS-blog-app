import { getBlogForTrendingTab } from "@/app/actions/blogActions";
import Image from "next/image";
import React from "react";

const TrendingBlogsSidebar = async () => {
  const trendingBlogs = await getBlogForTrendingTab();

  if (!trendingBlogs) {
    return;
  }

  return (
    <div className="w-80 sticky top-8 h-fit">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-6 pb-2 border-b border-gray-200">
          Trending Now
        </h2>

        <div className="space-y-5">
          {trendingBlogs.map((blog) => (
            <div key={blog.id} className="flex gap-3 group">
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
