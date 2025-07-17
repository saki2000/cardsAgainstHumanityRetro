"use client";

import { useEffect, useRef } from "react";
import PlayerList from "../PlayerList/PlayerList";
import { useSession } from "next-auth/react";
import { useGameStore } from "@/lib/GameStore";
import Loading from "@/app/loading";
import WaitingForStartBanner from "../WaitingForStartBanner/WaitingForStartBanner";
import { useRouter } from "next/navigation";
import GameContainer from "../GameContainer/GameContainer";

interface Props {
  sessionCode: string;
}

export default function GameRoom({ sessionCode }: Props) {
  const router = useRouter();

  const connectSocket = useGameStore((state) => state.connectSocket);
  const joinSession = useGameStore((state) => state.joinSession);
  const disconnectAndCleanup = useGameStore(
    (state) => state.disconnectAndCleanup,
  );
  const socket = useGameStore((state) => state.socket);
  const gameStarted = useGameStore((state) => state.sessionStarted);
  const sessionEnded = useGameStore((state) => state.sessionEnded);
  const hasJoined = useRef(false);

  const { data: session, status } = useSession();

  useEffect(() => {
    if (sessionEnded) {
      router.replace("/Session/End");
    }
  }, [sessionEnded, router]);

  useEffect(() => {
    if (status === "authenticated") {
      connectSocket();
    }
  }, [status, connectSocket]);

  useEffect(() => {
    if (
      socket &&
      session?.user?.name &&
      session.user?.email &&
      !hasJoined.current
    ) {
      joinSession({
        username: session.user.name,
        email: session.user.email,
        sessionCode: sessionCode,
      });
      hasJoined.current = true;
    }
  }, [socket, session, sessionCode, joinSession]);

  useEffect(() => {
    return () => {
      disconnectAndCleanup();
    };
  }, [disconnectAndCleanup]);

  if (status === "loading") {
    return <Loading />;
  }

  return (
    <div className="flex-1 border-4 border-white rounded-lg shadow-lg bg-black m-2 flex flex-col ">
      <PlayerList />
      {!gameStarted ? (
        <WaitingForStartBanner />
      ) : (
        <GameContainer sessionCode={sessionCode} />
      )}
    </div>
  );
}
