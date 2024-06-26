"use client";

import { useFormState } from "react-dom";
import Formbutton from "./Formbutton";

function PostForm({ data }) {
  const [state, formAction] = useFormState(data, { errors: [] });

  return (
    <>
      <h1>Create a new post</h1>
      <form action={formAction}>
        <p className="form-control">
          <label htmlFor="title">Title</label>
          <input type="text" id="title" name="title" />
        </p>
        <p className="form-control">
          <label htmlFor="image">Image URL</label>
          <input
            type="file"
            accept="image/png, image/jpeg"
            id="image"
            name="image"
          />
        </p>
        <p className="form-control">
          <label htmlFor="content">Content</label>
          <textarea id="content" name="content" rows="5" />
        </p>
        <p className="form-actions">
          <Formbutton />
        </p>

        {!!state.errors?.length && (
          <ul className="form-errors">
            {" "}
            {state.errors.map((error) => (
              <li> {error} </li>
            ))}{" "}
          </ul>
        )}
      </form>
    </>
  );
}

export default PostForm;
