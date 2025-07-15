import { useDroppable } from "@dnd-kit/core";
import CommentDisplay from "../CommentDisplay/CommentDisplay";
import { Comments } from "@/lib/GameStore";

interface Props {
  id: string;
  comments: Comments[];
}

export default function AnswerSlots({ id, comments }: Props) {
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
      className={`min-h-64 w-full border-2 border-dashed rounded-lg flex flex-col p-2 bg-gray-700 transition-colors overflow-y-auto ${style}`}
    >
      {comments && comments.length > 0 ? (
        comments.map((comment) => (
          <CommentDisplay key={comment.id} comment={comment} />
        ))
      ) : (
        <div className="flex-grow flex items-center justify-center text-gray-400 ">
          <span>Drop Answer Here</span>
        </div>
      )}
    </div>
  );
}
