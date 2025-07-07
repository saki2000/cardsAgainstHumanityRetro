"use client";

import { signIn } from "next-auth/react";

export default function SignInContainer() {
  return (
    <div className="mt-34 border-6 p-16 bg-gray-800 rounded-lg flex flex-col items-center justify-center">
      <button
        className="btn-primary font-bold text-xl"
        onClick={() => signIn("cognito")}
        style={{ minWidth: 320 }}
      >
        Log In
        <br />
        or
        <br />
        Sign Up
      </button>
    </div>
  );
}
