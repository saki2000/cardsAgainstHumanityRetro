"use client";

import { useSession, signIn } from "next-auth/react";
import ProfileDropDown from "../ProfileDropDown/ProfileDropDown";
import SignOutButton from "../SignOutButton/SignOutButton";

export default function AuthButtons() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <div className="h-10 w-24 rounded-lg bg-gray-200 animate-pulse"></div>
    );
  }

  if (session) {
    return (
      <div className="flex items-center gap-4">
        <ProfileDropDown />
        <SignOutButton />
      </div>
    );
  }
  return (
    <div className="flex items-center gap-4">
      <p>Not signed in</p>
      <button
        onClick={() => signIn("cognito")}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-colors"
      >
        Sign in
      </button>
    </div>
  );
}
