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

type MessageCallback = (msg: {
  text: string;
  type: "join" | "leave" | "host";
}) => void;

let messageListeners: MessageCallback[] = [];

interface GameState {
  players: Player[];
  hostId: number | null;
  cardHolderId: number | null;
  currentUser?: { username: string; email: string };
  socket: SocketIOClient.Socket | null;
  sessionStarted: boolean;
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
  startSession: (sessionCode: string) => void;
  endRound: (sessionCode: string) => void;
  endSession: (sessionCode: string) => void;
  subscribeToMessages: (cb: MessageCallback) => () => void;
  _emitMessage: (msg: {
    text: string;
    type: "join" | "leave" | "host";
  }) => void;
}

export const useGameStore = create<GameState & GameActions>((set, get) => ({
  sessionCode: null,
  players: [],
  hostId: null,
  cardHolderId: null,
  socket: null,
  sessionStarted: false,
  sessionEnded: false,

  subscribeToMessages: (cb: MessageCallback) => {
    messageListeners.push(cb);
    return () => {
      messageListeners = messageListeners.filter((fn) => fn !== cb);
    };
  },

  // Internal: call this to notify all listeners
  _emitMessage: (msg: { text: string; type: "join" | "leave" | "host" }) => {
    messageListeners.forEach((cb) => cb(msg));
  },

  connectSocket: () => {
    if (get().socket) return;
    const socket = io(process.env.NEXT_PUBLIC_SOCKET_URL as string);

    socket.on("player_joined", (username: string) => {
      get()._emitMessage({
        text: `${username} has joined the session`,
        type: "join",
      });
    });

    socket.on("player_left", (username: string) => {
      get()._emitMessage({
        text: `${username} has left the session`,
        type: "leave",
      });
    });

    socket.on("host_change", (hostId: number) => {
      const hostName = get().getHostNameById(hostId);
      get()._emitMessage({ text: `${hostName} is now the host`, type: "host" });
    });

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

    socket.on("session_started", () => {
      set({ sessionStarted: true });
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

  startSession: (sessionCode: string) => {
    const socket = get().socket;
    if (socket) {
      socket.emit("start_session", { sessionCode });
    }
  },

  endRound: (sessionCode: string) => {
    const socket = get().socket;
    if (socket) {
      socket.emit("end_of_round", { sessionCode });
    }
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
}));
