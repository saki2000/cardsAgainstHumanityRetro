"use client";

import { useState } from "react";
import { toast } from "react-toastify";
import SessionCreatedModal from "../../Modals/SessionCreatedModal";
import { useSession } from "next-auth/react";

//TODO: Replace with real
type Temp = {
  email: string;
  name: string;
};

type Props = {
  lockButton: boolean;
  setlockButton: (lockButton: boolean) => void;
};

export default function StartNewSessionTile({
  lockButton,
  setlockButton,
}: Props) {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const [sessionCode, setSessionCode] = useState("");

  const buildPayload = (): Temp | null => {
    console.log("Session data:", session);
    if (!session || !session.user?.email || !session.user?.name) {
      toast.error("You must be logged in to start a session.", {
        position: "bottom-right",
      });
      return null;
    }
    return {
      email: session.user.email,
      name: session.user.name,
    };
  };

  const handleStartSession = async () => {
    setlockButton(true);
    setSessionCode("");
    const payload = buildPayload();
    if (!payload) {
      toast.error("Error has occured. Please try again.", {
        position: "bottom-right",
      });
      setlockButton(false);
      return;
    }
    setIsOpen(true);
    try {
      const response = await fetch("/api/session/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      setSessionCode(data);
      toast.success("Session created!", {
        position: "bottom-right",
      });

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err: unknown) {
      //TODO: change to Error type
      toast.error("Failed to start session. Please try again.", {
        position: "bottom-right",
      });
    } finally {
      setlockButton(false);
    }
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center h-full border border-gray-200 rounded-lg shadow-lg p-6 bg-white">
        <h2 className="text-2xl font-bold mb-4 text-black">
          Start a New Session
        </h2>
        <p className="mb-6 text-black">Create a new game session to play.</p>
        <button
          onClick={handleStartSession}
          disabled={lockButton}
          className={`px-4 py-2 rounded-lg transition font-semibold
          ${
            lockButton
              ? "bg-gray-400 text-gray-200 cursor-not-allowed"
              : "bg-blue-500 text-white hover:bg-blue-600 cursor-pointer"
          }`}
        >
          Start New Game
        </button>
        <SessionCreatedModal
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          sessionCode={sessionCode}
          setSessionCode={setSessionCode}
        />
      </div>
    </>
  );
}
