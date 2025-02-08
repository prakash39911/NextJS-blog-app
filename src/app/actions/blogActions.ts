"use server";

import prisma from "@/lib/PrismaClient";
import { getCurrentUserId } from "./authActions";

export async function getAllBlog(pageNumber?: number, pageSize?: number) {
  try {
    const page = pageNumber || 1;
    const limit = pageSize || 5;

    const skip = (page - 1) * limit;

    const approvedBlogCount = await prisma.blog.count({
      where: {
        isApproved: true,
      },
    });

    const pendingBlogCount = await prisma.blog.count({
      where: {
        isApproved: false,
      },
    });

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
      skip: skip,
      take: limit,
    });
    return { allBlogs, approvedBlogCount, pendingBlogCount };
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

export const getAllBlogsForUserId = async (page: number) => {
  const pageNumber = page || 1;
  const pageSize = 4;

  const skip = (pageNumber - 1) * pageSize;

  try {
    const userId = await getCurrentUserId();

    const count = await prisma.blog.count({
      where: {
        userId,
      },
    });

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
      skip,
      take: pageSize,
    });

    return { allBlogs, count };
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
