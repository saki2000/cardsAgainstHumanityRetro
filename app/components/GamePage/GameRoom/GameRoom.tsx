"use client";

import { useEffect } from "react";
import PlayerList from "../PlayerList/PlayerList";
import { useSession } from "next-auth/react";
import HostControls from "../HostControls/HostControls";
import { useGameStore } from "@/lib/gameStore";

interface Props {
  sessionCode: string;
}

export default function GameRoom({ sessionCode }: Props) {
  const connectSocket = useGameStore((state) => state.connectSocket);
  const joinSession = useGameStore((state) => state.joinSession);

  const { data: session } = useSession();

  useEffect(() => {
    connectSocket();

    if (session?.user?.name && session.user?.email) {
      joinSession({
        username: session.user.name,
        email: session.user.email,
        sessionCode: sessionCode,
      });
    }
  }, [session, sessionCode, connectSocket, joinSession]);

  return (
    <>
      <div className="h-screen border-4 border-white m-2 rounded-lg shadow-lg">
        <PlayerList />
      </div>
      <footer className="fixed bottom-2 left-1/2 -translate-x-1/2 w-1/2 bg-gray-600 rounded-lg border-white border-2 shadow-lg">
        <HostControls />
      </footer>
    </>
  );
}
