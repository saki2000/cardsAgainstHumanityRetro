import { Comments } from "@/lib/GameStore";

interface Props {
  comment: Comments;
}

export default function CommentDisplay({ comment }: Props) {
  return (
    <div className="w-full p-1 m-1 bg-gray-800 rounded-md text-white text-sm shadow flex-shrink-0">
      <p>{comment.content}</p>
      <div className="flex justify-between items-center mt-1 text-xs text-gray-400">
        <span>by {comment.authorName}</span>
        {/* You can add voting logic here later */}
        <span>{comment.voteCount} ❤️</span>
      </div>
    </div>
  );
}
