import { useDroppable } from "@dnd-kit/core";
interface Props {
  id: string;
  children: React.ReactNode;
  isOccupied: boolean;
}

export default function TableSlot({ id, children, isOccupied }: Props) {
  const { isOver, setNodeRef } = useDroppable({
    id: id,
    disabled: isOccupied,
  });

  const style = {
    backgroundColor: isOver ? "#e0f7fa" : "#f1f5f9",
    borderColor: isOver ? "#0284c7" : "#cbd5e1",
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="h-64 w-64 border-2 border-white rounded-lg flex items-center justify-center p-2 transition-colors"
    >
      {children}
    </div>
  );
}
