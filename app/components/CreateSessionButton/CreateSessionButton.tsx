"use client";

import { useState } from "react";
import axios from "axios";

export default function RefactorSessionButton() {
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const tempObject = { email: "test@example.com", name: "TestUser" };

  const handlePing = async () => {
    setLoading(true);
    try {
      const res = await axios.post("/api/session", tempObject);
      setResponse(res.data);
    } catch (err) {
      setResponse(
        "Ping failed" + (err instanceof Error ? `: ${err.message}` : ""),
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-10 flex flex-col items-center gap-4">
      <button
        onClick={handlePing}
        className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
      >
        {loading ? "Pinging..." : "Ping"}
      </button>
      {response && (
        <p className="text-lg text-gray-800 dark:text-gray-200">
          Response: {response}
        </p>
      )}
    </div>
  );
}
