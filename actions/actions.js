"use server";

import { uploadImage } from "@/lib/cloudinary";
import { storePost, updatePostLikeStatus } from "@/lib/posts";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const createPost = async (prevState, formDate) => {
  // "use server";

  const title = formDate.get("title");
  const image = formDate.get("image");
  const content = formDate.get("content");

  const errors = [];

  if (!title || !!!title.trim().length) {
    errors.push("please provide a valid title");
  }

  if (!content || !!!content.trim().length) {
    errors.push("please provide a valid content");
  }

  if (!image || !image.size) {
    errors.push("please provide a valid image");
  }

  if (!!errors.length) {
    return {
      errors,
    };
  }

  let imageUrl;

  try {
    imageUrl = await uploadImage(image);
  } catch (error) {
    throw new Error(error);
  }

  await storePost({
    userId: 1,
    title,
    content,
    imageUrl,
  });

  revalidatePath("/", "layout");
  redirect("/feed");
};

export const likePostToggle = async (postId) => {
  await updatePostLikeStatus(postId, 2);
  revalidatePath("/", "layout");
};
