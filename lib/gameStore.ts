import { create } from "zustand";
import io from "socket.io-client";

interface JoinSessionPayload {
  username: string;
  email: string;
  sessionCode: string;
}

// interface LeaveSessionPayload {
//   username: string;
//   sessionCode: string;
// }

interface Player {
  id: number;
  username: string;
}

interface GameState {
  players: Player[];
  hostId: number | null;
  currentPlayerId: number | null;
  socket: SocketIOClient.Socket | null;
}

interface GameActions {
  connectSocket: () => void;
  joinSession: (payload: JoinSessionPayload) => void;
  // emitLeaveSession: (payload: LeaveSessionPayload) => void;
  disconnectAndCleanup: () => void;
}

export const useGameStore = create<GameState & GameActions>((set, get) => ({
  players: [],
  hostId: null,
  currentPlayerId: null,
  socket: null,

  connectSocket: () => {
    if (get().socket) return;
    const socket = io(process.env.NEXT_PUBLIC_SOCKET_URL as string);

    socket.on("connect", () => {
      console.log("Socket connected:", socket.id);
    });

    socket.on("disconnect", () => {
      console.log("Socket disconnected.");
      set({ socket: null, players: [], hostId: null, currentPlayerId: null });
    });

    socket.on("game_state_update", (gameState: GameState) => {
      set({
        players: gameState.players,
        hostId: gameState.hostId,
        currentPlayerId: gameState.currentPlayerId,
      });
    });

    set({ socket });
  },

  joinSession: (payload) => {
    const socket = get().socket;
    if (!socket) {
      console.error("joinSession called but socket is not connected.");
      return;
    }
    socket.emit("join_session", payload);
  },

  // emitLeaveSession: (payload) => {
  //   const socket = get().socket;
  //   if (!socket) {
  //     console.error("emitLeaveSession called but socket is not connected.");
  //     return;
  //   }
  //   socket.emit("leave_session", payload);
  // },

  disconnectAndCleanup: () => {
    const socket = get().socket;
    if (socket) {
      socket.disconnect();
      set({ socket: null, players: [], hostId: null });
    }
  },
}));
