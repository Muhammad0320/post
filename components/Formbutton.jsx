"use client";

import { useFormStaus } from "react-dom";

function Formbutton() {
  const { pending } = useFormStaus();

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
