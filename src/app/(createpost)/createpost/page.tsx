import React from "react";
import CreatePostForm from "./CreatePostForm";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import Link from "next/link";

export default async function CreatePost() {
  const session = await getServerSession(authOptions);
  const isCreateAllowed = session?.user?.permissions?.includes("CREATE");

  if (!isCreateAllowed)
    return (
      <div className="flex flex-col gap-3 vertical-center justify-center items-center">
        <div className="text-3xl font-bold text-gray-500">
          You are not authorized
        </div>
        <div>Please Contact our Support team...</div>
        <div>
          <Link
            href="/createticket"
            className="cursor-pointer text-blue-500 font-bold border border-blue-500 px-3 py-2 rounded-lg"
          >
            Contact us
          </Link>
        </div>
      </div>
    );

  return (
    <div className="flex flex-col gap-5 items-center mt-4">
      <h1 className="text-4xl text-gray-700">Create Post</h1>
      <CreatePostForm />
    </div>
  );
}
