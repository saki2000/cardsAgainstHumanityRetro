"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

type Props = {
  lockButton: boolean;
  setlockButton: (lockButton: boolean) => void;
};

export default function JoinSessionTile({ lockButton, setlockButton }: Props) {
  const router = useRouter();
  const [sessionCode, setSessionCode] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleJoinSession = async () => {
    setlockButton(true);
    setErrorMessage("");

    const trimmedCode = sessionCode.trim();
    const valid = /^[a-zA-Z0-9]{6}$/.test(trimmedCode);

    if (!valid) {
      setlockButton(false);
      setErrorMessage("Invalid code provided.");
      return;
    }

    try {
      await axios.get(`/api/session/check/${trimmedCode}`);
      router.push(`/Session/${trimmedCode}`);
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        if (err.response?.status === 404) {
          toast.error("Session not found. Please check the code.", {
            position: "bottom-right",
          });
          setErrorMessage("Session not found.");
        } else {
          setErrorMessage("Can't join session. Please try again.");
        }
      } else {
        setErrorMessage("An unexpected error occurred.");
      }
      console.error("Join session error:", err);
    } finally {
      setlockButton(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-full border-2 px-2 py-3 border-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Join a Session</h2>
      <p className="mb-6">Enter the session code to join an existing game.</p>

      <input
        id="sessionCode"
        type="text"
        placeholder="Session Code"
        value={sessionCode}
        onChange={(e) => setSessionCode(e.target.value)}
        className="border border-gray-300 rounded-lg p-2 mb-4 w-64 bg-white text-black"
      />
      <p className="text-red-500">{errorMessage} </p>
      <button
        className={`px-4 py-2 rounded-lg          ${
          lockButton
            ? "bg-gray-400 text-gray-200 cursor-not-allowed"
            : "bg-blue-500 text-white hover:bg-blue-600 cursor-pointer"
        }`}
        onClick={handleJoinSession}
        disabled={lockButton}
      >
        Join game
      </button>
    </div>
  );
}
