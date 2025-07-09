"use client";

import { useUserStore } from "@/lib/userStore";
import { ArrowLeftOnRectangleIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import ConfirmationModal from "../../ConfirmationModal/ConfirmationModal";

interface SessionCodeBannerProps {
  sessionCode: string;
}

export default function SessionCodeBanner({
  sessionCode,
}: SessionCodeBannerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: string } | null>(
    null,
  );
  const socket = useUserStore((state) => state.socket);

  const messageStyles: Record<string, string> = {
    joined: "text-green-500",
    left: "text-red-500",
    newHost: "text-blue-500",
  };

  useEffect(() => {
    if (socket) {
      socket.on("player_joined", (username: string) => {
        setMessage({
          text: `${username} has joined the session.`,
          type: "joined",
        });

        setTimeout(() => {
          setMessage(null);
        }, 1000);
      });

      socket.on("player_left", (username: string) => {
        setMessage({ text: `${username} has left the session.`, type: "left" });

        setTimeout(() => {
          setMessage(null);
        }, 1000);
      });

      return () => {
        socket.off("player_joined");
        socket.off("player_left");
      };
    }
  }, [socket]);

  const leaveSession = () => {
    window.location.href = "/Dashboard";
  };

  const handleLeaveSession = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <div className="flex items-center justify-between bg-gray-600 rounded-lg shadow-md p-4">
      <div className="flex items-center">
        <p className="text-2xl font-bold mr-2">Session Code:</p>
        <p className="text-2xl font-mono bg-white border-2 border-black rounded-xl p-1 text-gray-800">
          {sessionCode}
        </p>
      </div>
      {message && (
        <p className={`text-sm ${messageStyles[message.type]}`}>
          {message.text}
        </p>
      )}
      <button
        className="btn-cancel flex items-center gap-2"
        onClick={handleLeaveSession}
      >
        <ArrowLeftOnRectangleIcon className="h-8 w-8" />
        <span>Leave</span>
      </button>
      <ConfirmationModal
        isOpen={isOpen}
        closeModal={() => {}}
        onConfirm={leaveSession}
        onCancel={closeModal}
        title="Confirm Leave"
        message="Are you sure you want to leave the session?"
        okText="Leave"
        cancelText="Cancel"
        isWarning={true}
      />
    </div>
  );
}
