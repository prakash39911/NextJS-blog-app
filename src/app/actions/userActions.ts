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
