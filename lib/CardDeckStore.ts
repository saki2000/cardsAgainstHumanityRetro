import { CardDeckActions, CardDeckState } from "@/app/types/customTypes";
import { create } from "zustand";

export const useCardDeckStore = create<CardDeckState & CardDeckActions>(
  (set) => ({
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
