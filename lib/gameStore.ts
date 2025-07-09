import { create } from "zustand";
import io from "socket.io-client";

interface JoinSessionPayload {
  username: string;
  email: string;
  sessionCode: string;
}

interface LeaveSessionPayload {
  username: string;
  sessionCode: string;
}

interface Player {
  id: number;
  username: string;
}

interface GameState {
  sessionCode: string;
  hostId: number;
  players: Player[];
}

interface UserState {
  players: Player[];
  hostId: number | null;
  socket: SocketIOClient.Socket | null;
  connectSocket: () => void;
  joinSession: (payload: JoinSessionPayload) => void;
  leaveSession: (payload: LeaveSessionPayload) => void;
}

export const useGameStore = create<UserState>((set, get) => ({
  players: [],
  hostId: null,
  socket: null,

  connectSocket: () => {
    if (get().socket) return;
    const socket = io(process.env.NEXT_PUBLIC_SOCKET_URL as string);

    socket.on("game_state_update", (gameState: GameState) => {
      set({ players: gameState.players, hostId: gameState.hostId });
    });

    set({ socket });
  },

  joinSession: (payload) => {
    get().socket?.emit("join_session", payload);
  },

  leaveSession: (payload) => {
    const socket = get().socket;
    if (socket) {
      socket.emit("leave_session", {
        sessionCode: payload.sessionCode,
        username: payload.username,
      });
      socket.disconnect();
      set({ socket: null, players: [], hostId: null });
    }
  },
}));
