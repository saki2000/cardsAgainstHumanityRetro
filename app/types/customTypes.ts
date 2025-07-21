import { components } from "./api";

export type Comments = {
  id: number;
  authorName: string;
  content: string;
  voteCount: number;
};

export type Card = {
  id: number;
  sessionCardId: number;
  content: string;
  comments?: Comments[];
};

export type SlotId = "slot1" | "slot2" | "slot3";

export type Slots = {
  slot1: Card | null;
  slot2: Card | null;
  slot3: Card | null;
};

export type CardDeckState = {
  hand: Card[];
  slots: Slots;
};

export type CardDeckActions = {
  setHand: (cards: Card[]) => void;
  setSlots: (newSlots: Slots) => void;
  resetSlots: () => void;
  removeCardFromHand: (cardId: number) => void;
};

export type JoinSessionPayload = {
  username: string;
  email: string;
  sessionCode: string;
};

export type Player = {
  id: number;
  username: string;
  score: number;
};

export type MessageCallback = (msg: {
  text: string;
  type: "join" | "leave" | "host";
}) => void;

export type GameState = {
  sessionCode: string | null;
  players: Player[];
  roundNumber: number | null;
  hostId: number | null;
  cardHolderId: number | null;
  currentUser?: { username: string; email: string };
  socket: SocketIOClient.Socket | null;
  sessionStarted: boolean;
  sessionEnded: boolean;
  slots: Record<string, Card | null>;
};

export type ErrorResponse = components["schemas"]["ErrorResponse"];
export type SessionCreateRequest =
  components["schemas"]["SessionCreateRequest"];
export type UserNameRequest = components["schemas"]["UserNameRequest"];
export type Users = components["schemas"]["Users"];
