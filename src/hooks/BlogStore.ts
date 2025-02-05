import { create } from "zustand";
import { persist } from "zustand/middleware";

interface BlogStore {
  blogs: userBlogType[];
  updatedBlog: { id: string; isApproved: boolean }[];
  updatedPermissionArray: Array<"CREATE" | "EDIT" | "DELETE">;
  setUpdatedPermissionArray: (
    permissionArray: Array<"CREATE" | "EDIT" | "DELETE">
  ) => void;
  setUpdatedBlog: (blog: { id: string; isApproved: boolean }) => void;
  setBlog: (blogs: userBlogType[]) => void;
  reset: () => void;
}

const initialState = {
  blogs: [],
  updatedBlog: [],
  updatedPermissionArray: [],
};

export const BlogStore = create<BlogStore>()(
  persist(
    (set) => ({
      ...initialState,
      setBlog: (blogs) => set({ blogs }),
      setUpdatedBlog: (blog) =>
        set((state) => ({ updatedBlog: [blog, ...state.updatedBlog] })),
      setUpdatedPermissionArray: (permissionArray) =>
        set({ updatedPermissionArray: permissionArray }),
      reset: () => set(initialState),
    }),
    {
      name: "Blogs-status-store",
    }
  )
);
