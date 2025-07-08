import GameRoom from "@/app/components/GamePage/GameRoom/GameRoom";
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
    <div className="items-center justify-center text-white">
      <div className="flex items-center bg-gray-600 rounded-lg shadow-md p-4">
        <p className="text-2xl font-bold mr-2">Session Code:</p>
        <p className="text-2xl font-mono">{sessionCode}</p>
      </div>
      <GameRoom sessionCode={sessionCode} />
    </div>
  );
}
