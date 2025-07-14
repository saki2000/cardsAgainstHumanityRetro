interface Props {
  id: string;
  children?: React.ReactNode;
}

export default function AnswerSlots({ id, children }: Props) {
  return (
    <div
      id={id}
      className="h-64 w-64 border-2 border-white rounded-lg flex items-center justify-center bg-gray-600"
    >
      {children}
    </div>
  );
}
