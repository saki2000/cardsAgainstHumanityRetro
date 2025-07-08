import { create } from "zustand";
import io from "socket.io-client";

interface Player {
  username: string;
  email: string;
  sessionCode: string;
}

interface UserState {
  players: Player[];
  socket: SocketIOClient.Socket | null;
  setPlayers: (players: Player[]) => void;
  connectSocket: () => void;
  joinSession: (payload: Player) => void;
  leaveSession: (payload: Player) => void;
}

export const useUserStore = create<UserState>((set, get) => ({
  players: [],
  socket: null,

  setPlayers: (players) => set({ players }),

  connectSocket: () => {
    if (get().socket) return;
    const socket = io(process.env.NEXT_PUBLIC_SOCKET_URL as string);

    socket.on("update_user_list", (players: Player[]) => {
      set({ players });
    });

    set({ socket });
  },

  joinSession: (payload) => {
    const socket = get().socket;
    if (socket) {
      socket.emit("join_session", payload);
    }
  },

  leaveSession: (payload) => {
    const socket = get().socket;
    if (socket) {
      socket.emit("leave_session", payload);
    }
  },
}));
