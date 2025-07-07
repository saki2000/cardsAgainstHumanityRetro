"use client";

import { ArrowLeftCircleIcon } from "@heroicons/react/24/outline";

export default function ReturnButton() {
  return (
    <button
      onClick={() => window.history.back()}
      className="btn-primary flex items-center gap-2 text-lg"
      aria-label="Go back"
    >
      <ArrowLeftCircleIcon className="w-6 h-6" />
      <span>Back</span>
    </button>
  );
}
