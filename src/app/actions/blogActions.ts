"use server";

import prisma from "@/lib/PrismaClient";
import { getCurrentUserId } from "./authActions";

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
        updatedAt: true,
        isApproved: true,
        published: true,
        user: {
          select: {
            name: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
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
        updatedAt: true,
        published: true,
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

export const getAllBlogsForUserId = async () => {
  try {
    const userId = await getCurrentUserId();

    const allBlogs = await prisma.blog.findMany({
      where: {
        userId,
      },
      select: {
        id: true,
        title: true,
        image: true,
        image_public_id: true,
        updatedAt: true,
        createdAt: true,
        published: true,
        isApproved: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return allBlogs;
  } catch (error) {
    console.log(error);
  }
};

export const getAllBlogsForParticularUser = async (userId: string) => {
  try {
    const allBlogs = await prisma.blog.findMany({
      where: {
        userId,
      },
      select: {
        id: true,
        title: true,
        image: true,
        image_public_id: true,
        updatedAt: true,
        createdAt: true,
        published: true,
        isApproved: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return allBlogs;
  } catch (error) {
    console.log(error);
  }
};
