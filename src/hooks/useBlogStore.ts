import { useEffect } from "react";
import { BlogStore } from "./BlogStore";

export const useBlogStore = (allBlogs?: userBlogType[]) => {
  const { blogs, setBlog, reset } = BlogStore();

  useEffect(() => {
    if (!allBlogs) return;

    setBlog(allBlogs);

    return () => {
      reset();
    };
  }, [allBlogs, reset, setBlog]);

  return {
    blogs,
    setBlog,
    reset,
  };
};
