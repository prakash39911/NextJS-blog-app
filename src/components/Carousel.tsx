"use client";

import * as React from "react";

import { Card, CardContent } from "@/components/ui/card";
import Autoplay from "embla-carousel-autoplay";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { CldImage } from "next-cloudinary";
import { useRouter } from "next/navigation";

export function CarouselComponent({ allBlogs }: { allBlogs: blogType[] }) {
  const router = useRouter();
  return (
    <Carousel
      className="w-full h-full"
      plugins={[
        Autoplay({
          delay: 3000,
        }),
      ]}
    >
      <CarouselContent>
        {allBlogs &&
          allBlogs.map((blog) => (
            <CarouselItem key={blog.id}>
              <div>
                <Card
                  className="bg-gray-800 border-none cursor-pointer"
                  onClick={() => router.push(`/blog/${blog.id}`)}
                >
                  <CardContent className="flex aspect-video">
                    <div className="relative container">
                      {blog.image_public_id && (
                        <CldImage
                          src={blog.image_public_id}
                          width={1200}
                          height={800} // Use a reasonable height
                          alt="Image"
                          className="object-cover w-full"
                        />
                      )}
                      <div className="absolute w-full h-[70px] flex justify-center items-center bg-white/15 bottom-8">
                        <span className="text-white font-bold text-6xl">
                          Title:{blog.title}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
