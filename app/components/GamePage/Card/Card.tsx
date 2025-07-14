"use client";

import { useDraggable } from "@dnd-kit/core";

interface Props {
  id: string;
  text: string;
  isDraggable?: boolean;
}

export default function Card({ id, text, isDraggable }: Props) {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: id,
      disabled: !isDraggable,
    });

  const cornerText = "R";

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        zIndex: 10,
        opacity: isDragging ? 0.5 : 1,
      }
    : undefined;

  const cursorClass = isDraggable ? "cursor-grab" : "cursor-default";

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...(isDraggable ? listeners : {})}
      {...attributes}
      className={`relative p-4 h-48 w-40 bg-black text-white border-2 border-gray-600 rounded-lg shadow-lg flex items-center justify-center ${cursorClass}`}
    >
      <div className="absolute top-2 left-2 h-4 w-4 bg-white text-black rounded-sm flex items-center justify-center p-1">
        <span className="text-small font-bold leading-tight text-center">
          {cornerText}
        </span>
      </div>

      <p className="text-center font-bold">{text}</p>

      <div className="absolute bottom-2 right-2 h-4 w-4 bg-white text-black rounded-sm flex items-center justify-center p-1 transform rotate-180">
        <span className="text-small font-bold leading-tight text-center">
          {cornerText}
        </span>
      </div>
    </div>
  );
}
