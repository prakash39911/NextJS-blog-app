"use server";

import { cloudinary } from "@/lib/Cloudinary";
import prisma from "@/lib/PrismaClient";
import { FormSchema, FormSchemaType } from "@/lib/schema/CreatePostFormSchema";
import { getCurrentUserId } from "./authActions";

export async function DeleteCloudinaryImage(public_id: string) {
  try {
    if (public_id) {
      await cloudinary.v2.uploader.destroy(public_id);
    }
  } catch (error) {
    console.log(error);
  }
}

export async function CreatePost(data: FormSchemaType) {
  try {
    const userId = await getCurrentUserId();

    const validatedData = FormSchema.safeParse(data);

    if (!validatedData.success) return { error: "Validation Error" };

    const { title, image, content, image_public_id, video, video_public_id } =
      validatedData.data;

    const isBlogCreated = await prisma.blog.create({
      data: {
        userId,
        title,
        image,
        content,
        image_public_id,
        video,
        video_public_id,
      },
    });
    return { success: "true", data: isBlogCreated };
  } catch (error) {
    console.log(error);
  }
}

export const TogglePublishBlog = async (blogId: string) => {
  try {
    const userId = await getCurrentUserId();

    const blog = await prisma.blog.findUnique({
      where: {
        id: blogId,
      },
    });

    const isPublish = blog?.published;

    if (isPublish) {
      return prisma.blog.update({
        where: {
          id: blogId,
          userId,
        },
        data: {
          published: false,
        },
      });
    } else {
      return prisma.blog.update({
        where: {
          id: blogId,
          userId,
        },
        data: {
          published: true,
        },
      });
    }
  } catch (error) {
    console.log(error);
  }
};

export const deleteUserBlog = async (blogId: string) => {
  try {
    const userId = await getCurrentUserId();

    const isDeleted = await prisma.blog.delete({
      where: {
        id: blogId,
        userId,
      },
    });

    return { status: "success", data: isDeleted };
  } catch (error) {
    console.log(error);
  }
};
