"use client";

import React from "react";
import { CldImage } from "next-cloudinary";
import { useRouter } from "next/navigation";
import { formatDate } from "@/lib/usefulFunctions";
import { FaEdit } from "react-icons/fa";
import ButtonComponent from "@/components/ButtonComponent";
import { AiOutlineDelete } from "react-icons/ai";
import { SwitchComponent } from "@/components/SwitchComponent";
import { deleteUserBlog, TogglePublishBlog } from "../actions/userActions";
import LoadingSpinner from "@/components/LoadingSpinner";
import clsx from "clsx";
import { BlogStore } from "@/hooks/BlogStore";

export default function EachBlogView({
  blog,
  permissionArray,
}: {
  blog: userBlogType;
  permissionArray: Array<"CREATE" | "EDIT" | "DELETE">;
}) {
  // const blogs = BlogStore((state) => state.blogs);
  // const currentBlog = blogs.find((b) => b.id === blog.id);
  // const approved = currentBlog?.isApproved ?? false;

  const updatedBlog = BlogStore((state) => state.updatedBlog);
  const blogFound = updatedBlog.find((eachBlog) => eachBlog.id === blog.id);
  const approved = blogFound ? blogFound.isApproved : blog.isApproved;

  const updatedPermissionArray = BlogStore(
    (state) => state.updatedPermissionArray
  );

  const finalPermissionArray =
    JSON.stringify(permissionArray) === JSON.stringify(updatedPermissionArray)
      ? permissionArray
      : updatedPermissionArray;

  const router = useRouter();
  const [publishLoading, setPublishLoading] = React.useState(false);

  const isEditAllowed = finalPermissionArray.includes("EDIT");
  const isDeleteAllowed = finalPermissionArray.includes("DELETE");

  const onPublishedChange = async () => {
    setPublishLoading(true);
    await TogglePublishBlog(blog.id);
    setPublishLoading(false);
    router.refresh();
  };

  const EditUserBlogFn = async (blogId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    router.replace(`/editpost/${blogId}`);
    router.refresh();
  };

  const DeleteBlogFn = async (blogId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    await deleteUserBlog(blogId);
    router.refresh();
  };

  return (
    <div className="w-[1180px] h-[150px] bg-gray-200 rounded-md p-2 ml-1 grid grid-cols-6 gap-2 mt-2">
      <div className="col-span-1 bg-gray-300 rounded-md relative">
        {blog.image && (
          <CldImage
            src={blog.image}
            width={600}
            height={400}
            alt="Image"
            className={clsx(
              "absolute w-full h-full rounded-md object-fill",
              approved ? "" : "opacity-60"
            )}
          />
        )}
        {approved ? (
          ""
        ) : (
          <div className="absolute w-full h-[30px] flex justify-center items-center bg-white/15 bottom-8">
            <span className="text-white font-bold text-xl">Pending</span>
          </div>
        )}
      </div>

      <div className="col-span-1 flex items-center justify-center font-semibold">
        {blog.title}
      </div>

      <div className="col-span-1 flex items-center justify-center">
        {formatDate(blog?.createdAt)}
      </div>

      <div className="col-span-1 flex items-center justify-center">
        <div
          className={clsx(
            "",
            approved ? "font-bold text-green-500" : "font-bold text-red-500"
          )}
        >
          {approved ? "Approved" : "Pending"}
        </div>
      </div>

      <div className="col-span-1 flex items-center justify-center">
        {publishLoading ? (
          <LoadingSpinner size={7} />
        ) : (
          <SwitchComponent
            isChecked={blog.published}
            idText="published"
            labelText={blog.published ? "Published" : "Not Published"}
            isDisabled={!blog.isApproved}
            onChange={() => {
              onPublishedChange();
            }}
          />
        )}
      </div>

      <div className="col-span-1 flex justify-center">
        <div className="flex flex-col gap-2 justify-center items-center">
          <ButtonComponent
            onButtonClick={(e: React.MouseEvent) => {
              e.stopPropagation();
              router.push(`/blog/${blog.id}`);
            }}
            btnText={"View"}
            cssClass="text-blue-600 border-2 border-blue-400 w-[100px]"
          />
          <ButtonComponent
            onButtonClick={(e: React.MouseEvent) => EditUserBlogFn(blog.id, e)}
            btnText={"Edit"}
            isDisabled={!isEditAllowed}
            cssClass="text-green-600 border-2 border-green-400 w-[100px]"
            reactIcon={FaEdit}
          />

          <ButtonComponent
            onButtonClick={(e: React.MouseEvent) => DeleteBlogFn(blog.id, e)}
            btnText={"Delete"}
            isDisabled={!isDeleteAllowed}
            cssClass="text-red-700 border-2 border-red-400 w-[100px]"
            reactIcon={AiOutlineDelete}
          />
        </div>
      </div>
    </div>
  );
}
