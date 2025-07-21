"use client";

import { useGameStore } from "@/lib/GameStore";

export default function PlayerList() {
  const players = useGameStore((state) => state.players);

  const sortedPlayers = [...players].sort(
    (a, b) => (b.score ?? 0) - (a.score ?? 0),
  );

  return (
    <aside className="w-48 bg-white/50 p-4 rounded-lg shadow-md m-2">
      <h2 className="text-xl font-bold mb-4">Players - {players.length}</h2>
      <ul>
        {sortedPlayers.map((player) => (
          <li key={player.id} className="flex items-center gap-2 mb-2">
            <span className="w-3 h-3 bg-green-400 rounded-full flex-shrink-0"></span>
            <span className="font-mono w-28 truncate">{player.username}</span>
            <span className="ml-auto">{player.score || "0"}</span>
          </li>
        ))}
      </ul>
      <p className="font-semibold mt-1">Current Player:</p>
      <span className="font-mono">
        {useGameStore.getState().getCardHolder()?.username}
      </span>
    </aside>
  );
}
