import React from "react";
import CreatePostForm from "./CreatePostForm";

export default function CreatePost() {
  return (
    <div className="flex flex-col gap-4 items-center justify-center vertical-center">
      <div className="flex justify-center">
        <h1 className="text-5xl text-gray-700">Create Post</h1>
      </div>
      <CreatePostForm />
    </div>
  );
}
