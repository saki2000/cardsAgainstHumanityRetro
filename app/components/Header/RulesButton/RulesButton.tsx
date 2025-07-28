"use client";
import { QuestionMarkCircleIcon } from "@heroicons/react/24/outline";
import { useState, useRef, useEffect } from "react";

export default function RulesButton() {
  const [isVisible, setIsVisible] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(event.target as Node)
      ) {
        setIsVisible(false);
      }
    }
    if (isVisible) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isVisible]);

  return (
    <div ref={popoverRef} className="relative inline-block">
      <button
        className="focus:outline-none"
        onClick={() => setIsVisible((prev) => !prev)}
      >
        <QuestionMarkCircleIcon className="h-12 w-12 text-bold text-gray-100 hover:text-blue-500 transition-colors duration-200" />
      </button>

      {isVisible && (
        <div className="absolute left-1/2 -translate-x-1/2 mt-2 w-72 max-h-80 overflow-y-auto rounded-lg bg-white shadow-lg border border-gray-200 p-4 text-sm text-gray-700 z-10 scrollbar-thin scrollbar-thumb-gray-300">
          <span className="font-bold text-blue-500">Game Rules</span>
          <ul className="list-disc list-inside space-y-2 mt-2">
            <li>
              <strong>Sign In & Join:</strong> Each player must sign in and join
              the same session using a session code.
            </li>
            <li>
              <strong>Admin Role:</strong> One player is the Admin, who controls
              starting/ending the game and each round.
            </li>
            <li>
              <strong>Cards:</strong> Each round, every player receives 9 random
              cards and may place up to 3 cards on the table (cannot be removed
              once placed).
            </li>
            <li>
              <strong>Comments:</strong> Players can comment on cards by
              dragging a card into the answer slot beneath the card they are
              responding to.
            </li>
            <li>
              <strong>Voting:</strong> Players can vote on others’ comments with
              the heart icon. One vote per comment, and you can’t vote for your
              own comment.
            </li>
            <li>
              <strong>Discussion:</strong> The Admin leads a discussion or
              reflection before ending the round.
            </li>
            <li>
              <strong>Game End:</strong> The game ends when all cards are used
              or when the Admin finishes it manually.
            </li>
            <li>
              <strong>Summary:</strong> After each game, all players receive an
              email with a full session summary.
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
