"use client";

import { signIn } from "next-auth/react";

export default function SignInContainer() {
  return (
    <div className="mt-34 border-6 p-8 bg-gray-800 rounded-lg flex flex-col items-center justify-center">
      <button
        className="bg-blue-500 hover:bg-blue-600 font-bold text-2xl cursor-pointer rounded-full w-48 h-48 flex items-center justify-center text-center"
        onClick={() => signIn("cognito")}
      >
        Let&apos;s
        <br />
        <br />
        Retro
        <br />
      </button>
    </div>
  );
}
