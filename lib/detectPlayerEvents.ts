import { Player, GameState } from "@/app/types/customTypes";

export type PlayerEvent =
  | { type: "join"; username: string }
  | { type: "leave"; username: string }
  | { type: "host"; username: string };

export function detectPlayerEvents(
  prevPlayers: Player[],
  newGameState: GameState,
  prevHostId: number | null,
): PlayerEvent[] {
  const events: PlayerEvent[] = [];
  const prevIds = new Set(prevPlayers.map((p) => p.id));
  const newIds = new Set(newGameState.players.map((p) => p.id));

  // Detect join
  newGameState.players.forEach((p) => {
    if (!prevIds.has(p.id)) {
      events.push({ type: "join", username: p.username });
    }
  });

  // Detect leave
  prevPlayers.forEach((p) => {
    if (!newIds.has(p.id)) {
      events.push({ type: "leave", username: p.username });
    }
  });

  // Detect host change
  if (newGameState.hostId !== prevHostId) {
    const hostName =
      newGameState.players.find((p) => p.id === newGameState.hostId)
        ?.username || "Unknown";
    events.push({ type: "host", username: hostName });
  }

  return events;
}
