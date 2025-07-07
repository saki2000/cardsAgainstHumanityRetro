"use client";

import { useState } from "react";
import { toast } from "react-toastify";
import SessionCreatedModal from "../../SessionCreatedModal/SessionCreatedModal";
import { useSession } from "next-auth/react";
import axios from "axios";

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
      const response = await axios.post("/api/session/create", payload, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      setSessionCode(response.data); // Adjust if your backend returns { code: ... }
      toast.success("Session created!", {
        position: "bottom-right",
      });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      // TODO: manage errors better once backend is ready
      toast.error(
        "Failed to start session. Please try again." +
          (err.response?.data?.message ? ` ${err.response.data.message}` : ""),
        { position: "bottom-right" },
      );
      console.error("Session creation error:", err);
    } finally {
      setlockButton(false);
    }
  };

  return (
    <div className="tile border border-gray-200 bg-white">
      <h2 className="text-2xl font-bold mb-4 text-black">
        Start a New Session
      </h2>
      <p className="mb-6 text-black">Create a new game session to play.</p>
      <button
        onClick={handleStartSession}
        disabled={lockButton}
        className={`px-4 py-2 rounded-lg
          ${
            lockButton
              ? "bg-gray-400 text-gray-200 cursor-not-allowed"
              : "btn-primary"
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
  );
}
