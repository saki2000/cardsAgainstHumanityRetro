"use client";

import { useState } from "react";
import ConfirmationModal from "../../ConfirmationModal/ConfirmationModal";
// import { useGameStore } from "@/lib/gameStore";

export default function HostControls() {
  const [isEndGameModalOpen, setIsEndGameModalOpen] = useState(false);
  const [isStartRoundModalOpen, setIsStartRoundModalOpen] = useState(false);
  const [isFirstRound, setIsFirstRound] = useState(true);

  // const hostId = useGameStore((state) => state.hostId);
  // const currentUser = useGameStore((state) => state.currentUser);

  // const isHost = currentUser && hostId && currentUser.id === hostId;

  // if (!isHost) {
  //   return null;
  // }

  const handleConfirmEnd = () => {
    console.log("Session ended");
    // TODO: Implement session end logic
    setIsEndGameModalOpen(false);
  };

  const handleConfirmStart = () => {
    //TODO: Implement session start logic
    if (isFirstRound) {
      console.log("Game started");
      setIsFirstRound(false);
    } else {
      console.log("Next round started");
    }
    setIsStartRoundModalOpen(false);
  };

  return (
    <footer className="fixed bottom-2 left-1/2 -translate-x-1/2 w-1/2 bg-gray-600 rounded-lg border-white border-2 shadow-lg">
      <div className="flex items-center justify-between m-4">
        <button
          className="btn-primary"
          onClick={() => setIsStartRoundModalOpen(true)}
        >
          {isFirstRound ? "Start game" : "Next Round"}
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
          title={isFirstRound ? "Confirm Start Game" : "Start New Round"}
          message={
            isFirstRound
              ? "Are you sure you want to start the game?"
              : "Are you sure you want to start a new round?"
          }
          okText={isFirstRound ? "Start game" : "Start Round"}
          cancelText="Cancel"
        />
      </div>
    </footer>
  );
}
