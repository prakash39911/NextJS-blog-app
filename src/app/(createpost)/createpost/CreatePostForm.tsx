"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import TextEditor from "@/components/TextEditor";
import { FormSchema, FormSchemaType } from "@/lib/schema/CreatePostFormSchema";
import { Input } from "@/components/ui/input";
import ImageUploadButtonCloudinary from "@/components/ImageUploadButtonCloudinary";
import { CldImage, CloudinaryUploadWidgetResults } from "next-cloudinary";
import { useFormStore } from "@/lib/FormStore";
import { CreatePost, DeleteCloudinaryImage } from "@/app/actions/userActions";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useEffect } from "react";

export default function CreatePostForm() {
  const router = useRouter();
  const { image, video, title, content, reset } = useFormStore();
  const { setImage, setVideo, setTitle } = useFormStore();

  const form = useForm<FormSchemaType>({
    mode: "onChange",
    resolver: zodResolver(FormSchema),
    defaultValues: {
      content: "",
      title: "",
    },
  });

  // Set form values from persisted store when component mounts
  useEffect(() => {
    form.setValue("title", title);
    form.setValue("content", content);
  }, [form, title, content]);

  const onAddImage = (result: CloudinaryUploadWidgetResults) => {
    if (result.info && typeof result.info === "object") {
      setImage({ public_id: result.info.public_id, url: result.info.url });
    }
  };

  const onAddVideo = (result: CloudinaryUploadWidgetResults) => {
    if (result.info && typeof result.info === "object") {
      setVideo({ public_id: result.info.public_id, url: result.info.url });
    }
  };

  const onSubmit = async (data: FormSchemaType) => {
    const modifiedData = {
      ...data,
      image: image.url || "",
      image_public_id: image.public_id || "",
      video: video.url || "",
      video_public_id: video.public_id || "",
    };

    try {
      const result = await CreatePost(modifiedData);

      if (result?.error) {
        toast.error("Blog creation failed");
        return;
      }

      if (result?.success === "true") {
        reset(); // Reset the store
        form.reset(); // Reset the form
        router.push("/createpost/success");
        toast.success("Blog created successfully");
      }
    } catch (error) {
      toast.error("An error occurred while creating the blog");
      console.log(error);
    }
  };

  return (
    <div className="overflow-y-auto px-3 h-5/6 bg-gray-100 w-2/3 p-2 rounded-md shadow-md shadow-gray-300">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-8"
        >
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter Title"
                    {...field}
                    onChange={(e) => {
                      field.onChange(e);
                      setTitle(e.target.value);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex flex-row items-center justify-between">
            <div>
              <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Image</FormLabel>
                    <FormControl>
                      <ImageUploadButtonCloudinary
                        onUploadImage={onAddImage}
                        buttonName="Upload Image"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div>
              {image.public_id && (
                <div className="flex flex-row items-center gap-2">
                  <CldImage
                    src={image.url}
                    width={80}
                    height={80}
                    crop="fill"
                    gravity="auto"
                    alt="Blog Image"
                  />
                  <Button
                    variant="destructive"
                    onClick={async (e) => {
                      e.preventDefault();
                      await DeleteCloudinaryImage(image.public_id);
                      setImage({ public_id: "", url: "" });
                    }}
                  >
                    Delete
                  </Button>
                </div>
              )}
            </div>
          </div>

          <FormField
            control={form.control}
            name="video"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Video</FormLabel>
                <FormControl>
                  <ImageUploadButtonCloudinary
                    onUploadImage={onAddVideo}
                    buttonName="Upload Video"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Content</FormLabel>
                <FormControl>
                  <TextEditor
                    content={field.value}
                    onChange={(value: any) => {
                      field.onChange(value);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            variant="outline"
            className="mt-2 bg-gray-500 text-gray-50 font-semibold hover:bg-gray-600"
          >
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
}
