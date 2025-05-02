"use client";

import React from "react";
import {
  CldUploadButton,
  CloudinaryUploadWidgetResults,
} from "next-cloudinary";
import { HiPhoto } from "react-icons/hi2";

type Props = {
  onUploadImage: (result: CloudinaryUploadWidgetResults) => void;
  buttonName: string;
};

export default function ImageUploadButtonCloudinary({
  onUploadImage,
  buttonName,
}: Props) {
  return (
    <>
      <CldUploadButton
        options={{ maxFiles: 1, folder: "Blog_APP" }}
        onSuccess={onUploadImage}
        uploadPreset="Image_upload"
        signatureEndpoint="/api/sign-image"
        className="flex flex-row gap-2 px-3 py-2 bg-gray-500 text-gray-50 rounded-lg items-center"
      >
        <HiPhoto size={28} />
        {buttonName}
      </CldUploadButton>
    </>
  );
}
