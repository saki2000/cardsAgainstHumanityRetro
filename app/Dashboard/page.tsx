"use client";
import { useState } from "react";
import JoinSessionTile from "../components/Tiles/JoinSessionTile/JoinSessionTile";
import StartNewSessionTile from "../components/Tiles/StartNewSessionTile/StartNewSessionTile";

export default function DashboardPage() {
  const [lockButton, setlockButton] = useState(false);
  return (
    <>
      <div className="flex min-h-screen items-center justify-center">
        <div className="flex flex-row gap-8">
          <StartNewSessionTile
            lockButton={lockButton}
            setlockButton={setlockButton}
          />
          <JoinSessionTile
            lockButton={lockButton}
            setlockButton={setlockButton}
          />
        </div>
      </div>
    </>
  );
}
