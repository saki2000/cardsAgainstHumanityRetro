import GameRoom from "@/app/components/GamePage/GameRoom/GameRoom";
import HostControls from "@/app/components/GamePage/HostControls/HostControls";
import SessionCodeBanner from "@/app/components/GamePage/SessionCodeBanner/SessionCodeBanner";
import { checkSessionExists } from "@/lib/checkSession";
import { notFound } from "next/navigation";

type Params = Promise<{ sessionCode: string }>;
interface Props {
  params: Params;
}

export default async function SessionPage(props: Props) {
  const { sessionCode } = await props.params;

  try {
    const sessionData = await checkSessionExists(sessionCode);

    if (!sessionData) {
      notFound();
    }
  } catch (error) {
    console.error("Error checking session:", error);
    notFound();
  }
  return (
    <div className="min-h-screen flex flex-col bg-black">
      <SessionCodeBanner sessionCode={sessionCode} />
      <div className="flex-1 flex flex-col">
        <GameRoom sessionCode={sessionCode} />
      </div>
      <HostControls sessionCode={sessionCode} />
    </div>
  );
}
