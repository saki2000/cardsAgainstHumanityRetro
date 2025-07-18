import { create } from "zustand";
import io from "socket.io-client";
import { useCardDeckStore } from "@/lib/CardDeckStore";
import {
  Card,
  GameState,
  JoinSessionPayload,
  MessageCallback,
  Player,
} from "@/app/types/customTypes";
import { detectPlayerEvents } from "./detectPlayerEvents";

let messageListeners: MessageCallback[] = [];
let lastPlayers: Player[] = [];
let lastHostId: number | null = null;

interface GameActions {
  connectSocket: () => void;
  joinSession: (payload: JoinSessionPayload) => void;
  disconnectAndCleanup: () => void;

  isCurrentUserHost: () => boolean;
  isCurrentUserCardHolder: () => boolean;
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
  playCard: (sessionCode: string, cardId: number, slotId: string) => void;
  submitComment: (
    sessionCode: string,
    sessionCardId: number,
    content: string,
  ) => void;
  voteForComment: (sessionCode: string, commentId: number) => void;
}

export const useGameStore = create<GameState & GameActions>((set, get) => ({
  sessionCode: null,
  players: [],
  hostId: null,
  cardHolderId: null,
  socket: null,
  sessionStarted: false,
  sessionEnded: false,
  slots: {},

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
    const socket = io(process.env.NEXT_PUBLIC_SOCKET_URL as string, {
      path: "/socket.io",
      transports: ["websocket"],
    });

    socket.on("connect", () => {
      console.log("Socket connected:", socket.id);
    });

    socket.on("disconnect", () => {
      console.log("Socket disconnected.");
      set({ socket: null, players: [], hostId: null, cardHolderId: null });
    });

    socket.on("game_state_update", (gameState: GameState) => {
      const events = detectPlayerEvents(lastPlayers, gameState, lastHostId);

      // Emit messages for each event
      events.forEach((event) => {
        if (event.type === "join") {
          get()._emitMessage({
            text: `${event.username} has joined the session`,
            type: "join",
          });
        } else if (event.type === "leave") {
          get()._emitMessage({
            text: `${event.username} has left the session`,
            type: "leave",
          });
        } else if (event.type === "host") {
          get()._emitMessage({
            text: `${event.username} is now the host`,
            type: "host",
          });
        }
      });

      lastPlayers = gameState.players;
      lastHostId = gameState.hostId;

      set({
        players: gameState.players,
        hostId: gameState.hostId,
        cardHolderId: gameState.cardHolderId,
        sessionStarted: gameState.sessionStarted,
        slots: gameState.slots,
      });

      if (gameState.slots) {
        useCardDeckStore.getState().setSlots({
          slot1: gameState.slots.slot1 || null,
          slot2: gameState.slots.slot2 || null,
          slot3: gameState.slots.slot3 || null,
        });
      }
    });

    socket.on("session_ended", () => {
      set({ sessionEnded: true });
    });

    socket.on("deal_cards", (cards: Card[]) => {
      console.log("Received private hand:", cards);
      useCardDeckStore.getState().setHand(cards);
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

  isCurrentUserCardHolder: () => {
    const { cardHolderId, currentUser, players } = get();
    if (!currentUser) return false;
    const me = players.find((p) => p.username === currentUser.username);
    return me ? me.id === cardHolderId : false;
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

  playCard: (sessionCode: string, cardId: number, slotId: string) => {
    const socket = get().socket;
    if (socket && sessionCode) {
      socket.emit("play_card", { sessionCode, cardId, slotId });
      const { hand } = useCardDeckStore.getState();
      useCardDeckStore.getState().setHand(hand.filter((c) => c.id !== cardId));
    }
  },

  submitComment: (
    sessionCode: string,
    sessionCardId: number,
    content: string,
  ) => {
    const socket = get().socket;
    console.log(
      `Submitting comment for card ID ${sessionCardId} with content: ${content} in session ${sessionCode}`,
    );
    if (socket && sessionCode) {
      socket.emit("submit_comment", { sessionCode, sessionCardId, content });
    }
  },

  voteForComment: (sessionCode, commentId) => {
    const socket = get().socket;
    if (socket && sessionCode) {
      socket.emit("vote_comment", { commentId });
    }
  },
}));
