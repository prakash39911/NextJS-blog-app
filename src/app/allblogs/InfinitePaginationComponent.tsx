"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { getAllBlog } from "../actions/blogActions";
import EachBlogCard from "@/components/EachBlogCard";
import { useSearchParams } from "next/navigation";
import LoadingSpinner from "@/components/LoadingSpinner";
import ButtonComponent from "@/components/ButtonComponent";

export default function InfinitePaginationComponent({
  allBlogs,
}: {
  allBlogs: blogType[];
}) {
  const loaderRef = useRef(null);
  const searchParams = useSearchParams();
  const [blogs, setBlogs] = useState<blogType[]>(allBlogs);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const page = parseInt(searchParams.get("page") || "1");
  const [pageNumber, setPageNumber] = useState(page);

  const loadBlogs = useCallback(async (pageNumber: number) => {
    try {
      setIsLoading(true);
      const data = await getAllBlog(pageNumber);
      const newBlogs = data?.allBlogs;
      if (!newBlogs) return;

      if (pageNumber === 1) {
        setBlogs(newBlogs);
      } else {
        setBlogs((prev) => [...prev, ...newBlogs]);
      }

      setHasMore(newBlogs.length > 0);
    } catch (error) {
      console.error("Error loading blogs:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadBlogs(pageNumber);
  }, [pageNumber, loadBlogs]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isLoading) {
          setPageNumber((prev) => prev + 1);
        }
      },
      { threshold: 1.0 }
    );

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => observer.disconnect();
  }, [hasMore, isLoading, pageNumber, searchParams]);

  return (
    <div className="flex flex-col w-full vertical-center items-center gap-4 relative">
      {blogs?.map((blog) => (
        <div key={blog.id}>
          {blog.isApproved && blog.published && <EachBlogCard blog={blog} />}
        </div>
      ))}

      {/* Loading indicator and intersection observer target */}
      <div className="w-full py-6 flex justify-center">
        {isLoading && (
          <div className="flex items-center gap-2">
            <LoadingSpinner />
            <span className="text-xl font-semibold text-gray-700">
              Loading...
            </span>
          </div>
        )}
        <div ref={loaderRef} className="flex flex-col gap-4 items-center">
          {!hasMore && !isLoading && (
            <div className="text-2xl font-bold text-gray-700">
              No More Blogs
            </div>
          )}
          <div>
            <ButtonComponent
              btnText="Go to Top"
              onButtonClick={() =>
                window.scrollTo({ top: 0, behavior: "smooth" })
              }
              cssClass="fixed bottom-10 right-10 px-4 bg-gray-600 font-bold text-lg text-white hover:bg-gray-800 hover:text-white rounded-lg shadow-lg"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
