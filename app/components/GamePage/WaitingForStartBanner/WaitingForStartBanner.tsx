import { useGameStore } from "@/lib/gameStore";

export default function WaitingForStartBanner() {
  const isFirstRound = useGameStore((state) => state.isFirstRound);

  if (!isFirstRound) {
    return null;
  }
  return (
    <>
      <div className="flex justify-center items-center min-h-[200px]">
        <p className="text-6xl text-center">Waiting for host to start</p>
      </div>
    </>
  );
}
// TODO: Impment better animated banner
