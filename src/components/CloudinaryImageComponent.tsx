"use client";

import { CldImage } from "next-cloudinary";
import React from "react";
import { AspectRatio } from "./ui/aspect-ratio";

export default function CloudinaryImageComponent({
  publicId,
}: {
  publicId: string | null;
}) {
  return (
    <div>
      {publicId && (
        <div className="w-[1024px]">
          <AspectRatio ratio={16 / 9}>
            <CldImage
              src={publicId}
              width={1000}
              height={1000}
              alt="Image"
              className="w-full h-full rounded-md object-cover"
            />
          </AspectRatio>
        </div>
      )}
    </div>
  );
}
