import { z } from "zod";

export const FormSchema = z.object({
  title: z.string().min(3, { message: "Please Give valid Title for the Blog" }),
  content: z.string().min(5, {
    message: "At least write few words for the blog you wanna create",
  }),
  image: z.string().optional(),
  video: z.string().optional(),
  image_public_id: z.string().optional(),
  video_public_id: z.string().optional(),
});

export type FormSchemaType = z.infer<typeof FormSchema>;
