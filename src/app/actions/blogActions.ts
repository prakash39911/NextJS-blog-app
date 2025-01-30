"use server";

import prisma from "@/lib/PrismaClient";

export async function getAllBlog() {
  try {
    const allBlogs = await prisma.blog.findMany({
      select: {
        id: true,
        title: true,
        content: true,
        image: true,
        video: true,
        image_public_id: true,
        video_public_id: true,
        createdAt: true,
        isApproved: true,
        user: {
          select: {
            name: true,
          },
        },
      },
    });
    return allBlogs;
  } catch (error) {
    console.log(error);
  }
}

export async function getBlogforID(blogid: string) {
  try {
    const blog = await prisma.blog.findUnique({
      where: {
        id: blogid,
      },
      select: {
        id: true,
        title: true,
        content: true,
        image: true,
        video: true,
        image_public_id: true,
        video_public_id: true,
        createdAt: true,
        isApproved: true,
        user: {
          select: {
            name: true,
          },
        },
      },
    });
    if (blog) return blog;
  } catch (error) {
    console.log(error);
  }
}
