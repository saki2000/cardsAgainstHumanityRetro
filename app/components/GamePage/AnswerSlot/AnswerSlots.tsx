import { useDroppable } from "@dnd-kit/core";

interface Props {
  id: string;
  children?: React.ReactNode;
}

export default function AnswerSlots({ id, children }: Props) {
  const { isOver, setNodeRef } = useDroppable({
    id: id,
    data: {
      type: "answer-slot",
    },
  });

  const style = isOver
    ? "border-gray-400 bg-gray-700"
    : "border-white border-solid bg-gray-600";

  return (
    <div
      ref={setNodeRef}
      id={id}
      className={`h-64 w-64 border-2 rounded-lg flex items-center justify-center  transition-colors ${style}`}
    >
      {children}
    </div>
  );
}
