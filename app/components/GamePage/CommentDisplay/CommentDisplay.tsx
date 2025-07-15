import { Comments, useGameStore } from "@/lib/GameStore_";
import { useState } from "react";

interface Props {
  sessionCode: string;
  comment: Comments;
}

export default function CommentDisplay({ comment, sessionCode }: Props) {
  const [isPulsing, setIsPulsing] = useState(false);
  const voteForComment = useGameStore((state) => state.voteForComment);

  const animateClick = () => {
    setIsPulsing(true);
    setTimeout(() => {
      setIsPulsing(false);
    }, 100);
  };

  const handleVoteClick = () => {
    voteForComment(sessionCode, comment.id);
    animateClick();
  };

  return (
    <div className="w-full p-1 m-0.5 bg-gray-800 rounded-md text-white text-sm shadow flex-shrink-0">
      <p className="font-arial">{comment.content}</p>
      <div className="flex justify-between items-center mt-1 text-xs text-gray-400">
        <span>by {comment.authorName}</span>

        <div className="flex items-center gap-1">
          <span>{comment.voteCount}</span>
          <button
            onClick={handleVoteClick}
            className={`transition-transform duration-300 ease-out
                        hover:scale-150 
                        active:scale-110
                         cursor-pointer 
                        ${isPulsing ? "scale-150" : "scale-100"}`}
          >
            ❤️
          </button>
        </div>
      </div>
    </div>
  );
}
