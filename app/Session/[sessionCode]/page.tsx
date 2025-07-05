interface Params {
  sessionCode: string;
}

interface Props {
  params: Params;
}
export default function SessionPage({ params }: Props) {
  const { sessionCode } = params;
  return (
    <div>
      <h1>Session {sessionCode}</h1>
    </div>
  );
}
