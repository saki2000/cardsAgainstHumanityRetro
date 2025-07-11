"use client";

import { useState } from "react";
import ConfirmationModal from "../../ConfirmationModal/ConfirmationModal";
import { useGameStore } from "@/lib/gameStore";

interface Props {
  sessionCode: string;
}

export default function HostControls({ sessionCode }: Props) {
  const [isEndGameModalOpen, setIsEndGameModalOpen] = useState(false);
  const [isStartRoundModalOpen, setIsStartRoundModalOpen] = useState(false);

  const sessionStarted = useGameStore((state) => state.sessionStarted);
  const isHost = useGameStore((state) => state.isCurrentUserHost());
  const startSession = useGameStore((state) => state.startSession);
  const endRound = useGameStore((state) => state.endRound);
  const endSession = useGameStore((state) => state.endSession);

  if (!isHost) {
    return null;
  }

  const handleConfirmEnd = () => {
    endSession(sessionCode);
    setIsEndGameModalOpen(false);
  };

  const handleConfirmStart = () => {
    if (sessionStarted) {
      endRound(sessionCode);
    } else {
      startSession(sessionCode);
    }
    setIsStartRoundModalOpen(false);
  };

  return (
    <footer className="fixed bottom-4 left-1/2 -translate-x-1/2 w-1/2 bg-gray-600 rounded-lg border-white border-2 shadow-lg">
      <div className="flex items-center justify-between m-4">
        <button
          className="btn-primary"
          onClick={() => setIsStartRoundModalOpen(true)}
        >
          {sessionStarted ? "Next Round" : "Start Game"}
        </button>

        <p className="text-sm font-semibold">Host Controls</p>

        <button
          className="btn-cancel"
          onClick={() => setIsEndGameModalOpen(true)}
        >
          End Game
        </button>

        <ConfirmationModal
          isOpen={isEndGameModalOpen}
          closeModal={() => setIsEndGameModalOpen(false)}
          onConfirm={handleConfirmEnd}
          onCancel={() => setIsEndGameModalOpen(false)}
          title="Confirm End Game"
          message="Are you sure you want to end the game for everyone?"
          okText="End Game"
          cancelText="Cancel"
          isWarning={true}
        />

        <ConfirmationModal
          isOpen={isStartRoundModalOpen}
          closeModal={() => setIsStartRoundModalOpen(false)}
          onConfirm={handleConfirmStart}
          onCancel={() => setIsStartRoundModalOpen(false)}
          title={sessionStarted ? "Start New Round" : "Confirm Start Game"}
          message={
            sessionStarted
              ? "Are you sure you want to start a new round?"
              : "Are you sure you want to start the game?"
          }
          okText={"Let's Go!"}
          cancelText="Cancel"
        />
      </div>
    </footer>
  );
}
