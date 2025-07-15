import { useDroppable } from "@dnd-kit/core";
import CommentDisplay from "../CommentDisplay/CommentDisplay";
import { Comments } from "@/lib/GameStore_";

interface Props {
  sessionCode: string;
  id: string;
  comments: Comments[];
}

export default function AnswerSlots({ id, comments, sessionCode }: Props) {
  const { isOver, setNodeRef } = useDroppable({
    id: id,
    data: {
      type: "answer-slot",
    },
  });

  const style = isOver
    ? "border-gray-400 bg-gray-700"
    : "border-white bg-gray-400";

  return (
    <div
      ref={setNodeRef}
      id={id}
      className={`min-h-64 w-64 border-2 rounded-lg flex flex-col p-2 bg-gray-600 transition-colors ${style}`}
    >
      {comments && comments.length > 0 ? (
        comments.map((comment) => (
          <CommentDisplay
            sessionCode={sessionCode}
            key={comment.id}
            comment={comment}
          />
        ))
      ) : (
        <div className="flex-grow flex items-center justify-center text-gray-400 ">
          <span>Drop Answer Here</span>
        </div>
      )}
    </div>
  );
}
