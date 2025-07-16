"use client";

import { useGameStore } from "@/lib/GameStore";

export default function PlayerList() {
  const players = useGameStore((state) => state.players);

  return (
    <aside className="w-48 bg-white/50 p-4 rounded-lg shadow-md m-2">
      <h2 className="text-xl font-bold mb-4">Players - {players.length}</h2>
      <ul>
        {players.map((player) => (
          <li key={player.id} className="flex items-center gap-2 mb-2">
            <span className="w-3 h-3 bg-green-400 rounded-full"></span>
            <span>{player.username}</span>
          </li>
        ))}
      </ul>
      <p>
        current card holder: {useGameStore.getState().getCardHolder()?.username}
      </p>
    </aside>
  );
}
