"use client";

import { useFormStatus } from "react-dom";

function Formbutton() {
  const { pending } = useFormStatus();

  if (pending) {
    return <p> Submitting... </p>;
  }

  return (
    <>
      <button type="reset">Reset</button>
      <button>Create Post</button>
    </>
  );
}

export default Formbutton;



