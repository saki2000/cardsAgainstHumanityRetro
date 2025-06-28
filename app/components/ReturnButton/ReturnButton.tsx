"use client";

import { ArrowLeftCircleIcon } from "@heroicons/react/24/outline";

export default function ReturnButton() {
  return (
    <button
      onClick={() => window.history.back()}
      className="flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 transition"
      aria-label="Go back"
    >
      <ArrowLeftCircleIcon className="w-6 h-6" />
      <span>Back</span>
    </button>
  );
}
