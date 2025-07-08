"use client";

import { ArrowLeftOnRectangleIcon } from "@heroicons/react/24/solid";

interface SessionCodeBannerProps {
  sessionCode: string;
}

export default function SessionCodeBanner({
  sessionCode,
}: SessionCodeBannerProps) {
  const handleLeaveSession = () => {
    window.location.href = "/Dashboard";
  };

  return (
    <div className="flex items-center justify-between bg-gray-600 rounded-lg shadow-md p-4">
      <div className="flex items-center">
        <p className="text-2xl font-bold mr-2">Session Code:</p>
        <p className="text-2xl font-mono bg-white border-2 border-black rounded-xl p-1 text-gray-800">
          {sessionCode}
        </p>
      </div>

      <button
        className="btn-cancel flex items-center gap-2"
        onClick={handleLeaveSession}
      >
        <ArrowLeftOnRectangleIcon className="h-8 w-8" />
        <span>Leave</span>
      </button>
    </div>
  );
}
