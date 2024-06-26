"use client";

import { formatDate } from "@/lib/format";
import LikeButton from "./like-icon";
import { useOptimistic } from "react";
import { likePostToggle } from "@/actions/actions";

function Post({ post, action }) {
  return (
    <article className="post">
      <div className="post-image">
        <img src={post.image} alt={post.title} />
      </div>
      <div className="post-content">
        <header>
          <div>
            <h2>{post.title}</h2>
            <p>
              Shared by {post.userFirstName} on{" "}
              <time dateTime={post.createdAt}>
                {formatDate(post.createdAt)}
              </time>
            </p>
          </div>
          <div>
            <form
              action={action.bind(null, post.id)}
              className={!!post.isLiked ? "liked" : ""}
            >
              <LikeButton />
            </form>
          </div>
        </header>
        <p>{post.content}</p>
      </div>
    </article>
  );
}

export default function Posts({ posts }) {
  const [optimisticPost, updateOptimisticPost] = useOptimistic(
    posts,
    (prevPost, updatedPostId) => {
      const updatedPostIndex = prevPost.findIndex(
        (post) => post.id === updatedPostId
      );

      if (updatedPostIndex === -1) {
        return prevPost;
      }

      const updatedPost = { ...posts[updatedPostIndex] };

      updatedPost.likes = updatedPost.likes + (updatedPost.isLiked ? -1 : 1);

      updatedPost.isLiked = !updatedPost.isLiked;

      const newPosts = [...prevPost];

      newPosts[updatedPostIndex] = updatedPost;

      return newPosts;
    }
  );

  if (!optimisticPost || optimisticPost.length === 0) {
    return <p>There are no posts yet. Maybe start sharing some?</p>;
  }

  const updatePost = async (postId) => {
    updateOptimisticPost(postId);

    await likePostToggle(postId);
  };

  return (
    <ul className="posts">
      {optimisticPost.map((post) => (
        <li key={post.id}>
          <Post post={post} action={updatePost} />
        </li>
      ))}
    </ul>
  );
}
