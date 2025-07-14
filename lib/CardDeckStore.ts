import { create } from "zustand";

type CardTypes = "GOOD" | "BAD" | "OTHER";

interface Card {
  id: string;
  text: string;
  type: CardTypes;
}

type SlotId = "slot1" | "slot2" | "slot3";

interface CardDeckState {
  hand: Card[];
  slots: {
    slot1: Card | null;
    slot2: Card | null;
    slot3: Card | null;
  };
}

interface CardDeckActions {
  setHand: (cards: Card[]) => void;
  playCard: (cardId: string, slotId: SlotId) => void;
  setSlots: (newSlots: CardDeckState["slots"]) => void;
  resetSlots: () => void;
}

export const useCardDeckStore = create<CardDeckState & CardDeckActions>(
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

    playCard: (cardId, slotId) => {
      const cardToPlay = get().hand.find((card) => card.id === cardId);
      const targetSlot = get().slots[slotId];

      if (cardToPlay && !targetSlot) {
        set((state) => ({
          hand: state.hand.filter((card) => card.id !== cardId),
          slots: {
            ...state.slots,
            [slotId]: cardToPlay,
          },
        }));
      }
    },

    setSlots: (newSlots) => {
      set({ slots: newSlots });
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
