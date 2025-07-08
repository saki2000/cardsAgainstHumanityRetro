/* eslint-disable @typescript-eslint/no-unused-vars */
import { create } from "zustand";
import type { Socket as SocketType } from "socket.io-client";

interface Player {
  id: string;
  name: string;
  email: string; //TODO: UNSURE IF NEEDED
}

type GameState = {
  players: Player[];
};

type GameActions = {
  updateGameState: (newState: Partial<GameState>) => void;
};

export const useGameStore = create<GameState & GameActions>((set) => ({
  players: [],
  updateGameState: (newState) => set((state) => ({ ...state, ...newState })),
}));
