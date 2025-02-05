"use client";

import React from "react";
import { CldImage } from "next-cloudinary";
import { useRouter } from "next/navigation";
import { formatDate } from "@/lib/usefulFunctions";
import { FaEdit } from "react-icons/fa";
import { FaCheck } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import ButtonComponent from "@/components/ButtonComponent";
import { AiOutlineDelete } from "react-icons/ai";
import { ApproveBlog, DeleteBlog } from "@/app/actions/adminActions";

export default function EachBlogView({ blog }: { blog: blogType }) {
  const router = useRouter();

  const handleOnClick = () => {
    router.push(`/blog/${blog.id}`);
  };

  const ApproveBlogFn = async (blogId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    await ApproveBlog(blogId);
    router.refresh();
  };

  const RejectBlogFn = async (blogId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    await DeleteBlog(blogId);
    router.refresh();
  };

  const EditBlogFn = async (blogId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    router.replace(`/editpost/${blog.id}`);
    router.refresh();
  };

  return (
    <div
      onClick={() => handleOnClick()}
      className="w-[1180px] h-[130px] bg-gray-200 rounded-md p-2 ml-1 grid grid-cols-5 gap-2 cursor-pointer mt-2"
    >
      <div className="col-span-1 bg-gray-300 rounded-md relative">
        {blog.image && (
          <CldImage
            src={blog.image}
            width={600}
            height={400}
            alt="Image"
            className="absolute w-full h-full rounded-md object-fill"
          />
        )}
      </div>

      <div className="col-span-1 flex items-center justify-center font-semibold">
        <div className="font-semibold text-lg flex flex-wrap">{blog.title}</div>
      </div>

      <div className="col-span-1 flex items-center justify-center font-semibold">
        {blog.user.name}
      </div>

      <div className="col-span-1 flex items-center justify-center">
        {formatDate(blog.createdAt)}
      </div>

      <div className="col-span-1 flex justify-center">
        {blog.isApproved ? (
          <div className="flex flex-col gap-2 justify-center items-center">
            <ButtonComponent
              onButtonClick={(e: React.MouseEvent) => EditBlogFn(blog.id, e)}
              btnText={"Edit"}
              cssClass="text-green-600 border-2 border-green-400 w-[100px]"
              reactIcon={FaEdit}
            />

            <ButtonComponent
              onButtonClick={(e: React.MouseEvent) => RejectBlogFn(blog.id, e)}
              btnText={"Delete"}
              cssClass="text-red-700 border-2 border-red-400 w-[100px]"
              reactIcon={AiOutlineDelete}
            />
          </div>
        ) : (
          <div className="flex flex-col gap-2 justify-center items-center">
            <ButtonComponent
              onButtonClick={(e: React.MouseEvent) => ApproveBlogFn(blog.id, e)}
              btnText={"Approve"}
              cssClass="text-green-600 border-2 border-green-400 w-[100px]"
              reactIcon={FaCheck}
            />

            <ButtonComponent
              onButtonClick={(e: React.MouseEvent) => RejectBlogFn(blog.id, e)}
              btnText={"Reject"}
              cssClass="text-red-700 border-2 border-red-400 w-[100px]"
              reactIcon={ImCross}
            />
          </div>
        )}
      </div>
    </div>
  );
}
