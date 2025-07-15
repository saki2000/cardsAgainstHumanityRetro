import { create } from "zustand";

interface Comments {
  id: number;
  authorName: string;
  content: string;
  voteCount: number;
}

interface Card {
  id: number;
  sessionCardId: number;
  content: string;
  comments?: Comments[];
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
type SlotId = "slot1" | "slot2" | "slot3";

export interface Slots {
  slot1: Card | null;
  slot2: Card | null;
  slot3: Card | null;
}

interface CardDeckState {
  hand: Card[];
  slots: Slots;
}

interface CardDeckActions {
  setHand: (cards: Card[]) => void;
  setSlots: (newSlots: Slots) => void; // The payload is now the simpler Slots type
  resetSlots: () => void;
  removeCardFromHand: (cardId: number) => void;
}

export const useCardDeckStore = create<CardDeckState & CardDeckActions>(
  //TODO: Fix this type error
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  (set, get) => ({
    hand: [],
    slots: {
      slot1: null,
      slot2: null,
      slot3: null,
    },

    setHand: (cards) => {
      set({ hand: cards });
    },

    setSlots: (newSlots) => {
      set({ slots: newSlots });
    },

    removeCardFromHand: (cardId) => {
      set((state) => ({
        hand: state.hand.filter((card) => card.id !== cardId),
      }));
    },

    resetSlots: () => {
      set({
        slots: {
          slot1: null,
          slot2: null,
          slot3: null,
        },
      });
    },
  }),
);
