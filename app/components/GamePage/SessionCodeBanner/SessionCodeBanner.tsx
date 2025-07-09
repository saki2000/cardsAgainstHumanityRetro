"use client";

import { ArrowLeftOnRectangleIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import ConfirmationModal from "../../ConfirmationModal/ConfirmationModal";
import { useGameStore } from "@/lib/gameStore";

interface SessionCodeBannerProps {
  sessionCode: string;
}

interface Message {
  id: number;
  text: string;
  type: "join" | "leave" | "host";
}

const messageStyles = {
  join: "text-green-400",
  leave: "text-red-400",
  host: "text-blue-400",
};

export default function SessionCodeBanner({
  sessionCode,
}: SessionCodeBannerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);

  const socket = useGameStore((state) => state.socket);

  useEffect(() => {
    if (!socket) return;

    const addMessage = (text: string, type: Message["type"]) => {
      const newMessage = { id: Date.now(), text, type };
      setMessages((prev) => [...prev, newMessage]);
      setTimeout(() => {
        setMessages((current) => current.filter((m) => m.id !== newMessage.id));
      }, 3000);
    };

    const handlePlayerJoined = (username: string) =>
      addMessage(`${username} has joined the session`, "join");
    const handlePlayerLeft = (username: string) =>
      addMessage(`${username} has left the session`, "leave");
    const handleHostChange = (username: string) =>
      addMessage(`${username} is now the host`, "host");

    socket.on("player_joined", handlePlayerJoined);
    socket.on("player_left", handlePlayerLeft);
    socket.on("host_change", handleHostChange);

    return () => {
      socket.off("player_joined", handlePlayerJoined);
      socket.off("player_left", handlePlayerLeft);
      socket.off("host_change", handleHostChange);
    };
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

      <div className="flex flex-col items-center">
        {messages.map((msg) => (
          <p
            key={msg.id}
            className={`text-sm font-semibold ${messageStyles[msg.type]}`}
          >
            {msg.text}
          </p>
        ))}
      </div>

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
