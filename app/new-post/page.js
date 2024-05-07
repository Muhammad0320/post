import PostForm from "@/components/PostForm";
import { storePost } from "@/lib/posts";
import { redirect } from "next/navigation";

export default function NewPostPage() {
  const createPost = async (prevState, formDate) => {
    const title = formDate.get("title");
    const image = formDate.get("image");
    const content = formDate.get("content");

    await storePost({
      userId: 1,
      title,
      content,
      imageUrl: "",
    });

    redirect("/feed");
  };

  return <PostForm data={createPost} />;
}
