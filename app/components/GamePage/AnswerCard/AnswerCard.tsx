import { useDraggable } from "@dnd-kit/core";
import { useState } from "react";

export default function AnswerCard() {
  const [text, setText] = useState("");
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: "answerCard",
      data: {
        type: "answer-card",
        text: text,
      },
    });

  const cornerText = "R";

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        zIndex: 10,
        opacity: isDragging ? 0.5 : 1,
      }
    : undefined;

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      className={`h-48 w-40 bg-white text-black border-2 border-gray-600 rounded-lg shadow-lg flex flex-col overflow-hidden`}
    >
      {/* Top Drag Handle */}
      <div
        {...listeners}
        className="relative w-full h-8 cursor-grab flex-shrink-0"
      >
        <div className="absolute top-2 left-2 h-4 w-4 bg-black text-white rounded-sm flex items-center justify-center p-1">
          <span className="text-xs font-bold leading-tight text-center">
            {cornerText}
          </span>
        </div>
      </div>

      {/* Non-draggable Text Area in the middle */}
      <div className="flex-grow flex items-center justify-center">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="resize-none w-full h-full bg-transparent border-none outline-none text-center"
          placeholder="Type your answer..."
        />
      </div>

      {/* Bottom Drag Handle */}
      <div
        {...listeners}
        className="relative w-full h-8 cursor-grab flex-shrink-0"
      >
        <div className="absolute bottom-2 right-2 h-4 w-4 bg-black text-white rounded-sm flex items-center justify-center p-1 transform rotate-180">
          <span className="text-xs font-bold leading-tight text-center">
            {cornerText}
          </span>
        </div>
      </div>
    </div>
  );
}
