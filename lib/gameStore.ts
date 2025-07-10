import { create } from "zustand";
import io from "socket.io-client";

interface JoinSessionPayload {
  username: string;
  email: string;
  sessionCode: string;
}

interface Player {
  id: number;
  username: string;
}

interface GameState {
  players: Player[];
  hostId: number | null;
  cardHolderId: number | null;
  currentUser?: { username: string; email: string };
  socket: SocketIOClient.Socket | null;
  isFirstRound: boolean;
  sessionEnded: boolean;
}

interface GameActions {
  connectSocket: () => void;
  joinSession: (payload: JoinSessionPayload) => void;
  // emitLeaveSession: (payload: LeaveSessionPayload) => void;
  disconnectAndCleanup: () => void;

  isCurrentUserHost: () => boolean;
  getCardHolder: () => Player | undefined;
  getHostNameById: (id: number) => string | null;
  setFirstRound: (isFirstRound: boolean) => void;
  endSession: (sessionCode: string) => void;
}

export const useGameStore = create<GameState & GameActions>((set, get) => ({
  sessionCode: null,
  players: [],
  hostId: null,
  cardHolderId: null,
  socket: null,
  isFirstRound: true,
  sessionEnded: false,

  connectSocket: () => {
    if (get().socket) return;
    const socket = io(process.env.NEXT_PUBLIC_SOCKET_URL as string);

    socket.on("connect", () => {
      console.log("Socket connected:", socket.id);
    });

    socket.on("disconnect", () => {
      console.log("Socket disconnected.");
      set({ socket: null, players: [], hostId: null, cardHolderId: null });
    });

    socket.on("game_state_update", (gameState: GameState) => {
      set({
        players: gameState.players,
        hostId: gameState.hostId,
        cardHolderId: gameState.cardHolderId,
      });
    });

    socket.on("session_ended", () => {
      set({ sessionEnded: true });
    });

    set({ socket });
  },

  joinSession: (payload) => {
    set({ currentUser: { username: payload.username, email: payload.email } });
    const socket = get().socket;
    if (!socket) {
      console.error("joinSession called but socket is not connected.");
      return;
    }
    socket.emit("join_session", payload);
  },

  endSession: (sessionCode: string) => {
    const socket = get().socket;
    if (socket) {
      socket.emit("end_session", { sessionCode });
    }
  },

  disconnectAndCleanup: () => {
    const socket = get().socket;
    if (socket) {
      socket.disconnect();
      set({ socket: null, players: [], hostId: null, cardHolderId: null });
    }
  },

  isCurrentUserHost: () => {
    const { hostId, currentUser, players } = get();
    if (!currentUser) return false;
    const me = players.find((p) => p.username === currentUser.username);
    return me ? me.id === hostId : false;
  },

  getCardHolder: () => {
    const { cardHolderId } = get();
    return cardHolderId
      ? get().players.find((p) => p.id === cardHolderId)
      : undefined;
  },

  getHostNameById: (id: number) => {
    const { players } = get();
    return players.find((p) => p.id === id)?.username || null;
  },

  setFirstRound: (isFirstRound: boolean) => {
    set({ isFirstRound });
  },
}));
