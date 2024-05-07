"use server";

import { storePost } from "@/lib/posts";
import { redirect } from "next/navigation";

export const createPost = async (prevState, formDate) => {
  "use server";

  const title = formDate.get("title");
  const image = formDate.get("image");
  const content = formDate.get("content");

  await storePost({
    userId: 1,
    title,
    content,
    imageUrl: "",
  });

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

  redirect("/feed");
};
