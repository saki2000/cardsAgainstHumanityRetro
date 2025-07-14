import CardDeck from "../CardDeck/CardDeck";
import { DndContext, DndContextProps } from "@dnd-kit/core";
import TableSlot from "../TableSlot/TableSlot";
import { useCardDeckStore } from "@/lib/CardDeckStore";
import { useGameStore } from "@/lib/GameStore";
import Card from "../Card/Card";

interface Props {
  sessionCode: string;
}

export default function GameContainer({ sessionCode }: Props) {
  const { slots } = useCardDeckStore();
  const playCard = useGameStore((state) => state.playCard);
  const isCurrentUserCardHolder = useGameStore(
    (state) => state.isCurrentUserCardHolder,
  );

  const handleDragEnd: DndContextProps["onDragEnd"] = (event) => {
    const { active, over } = event;
    if (over) {
      const cardId = active.id;
      const slotId = over.id as "slot1" | "slot2" | "slot3";

      playCard(sessionCode, Number(cardId), slotId);
    }
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className="flex flex-1 flex-col items-center justify-center p-8 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 ">
          <TableSlot id="slot1" isOccupied={!!slots.slot1}>
            {slots.slot1 ? (
              <Card
                id={slots.slot1?.id ? String(slots.slot1.id) : ""}
                text={slots.slot1?.content ?? ""}
                isDraggable={false}
              />
            ) : (
              <span className="text-gray-400">Card Slot</span>
            )}
          </TableSlot>
          <TableSlot id="slot2" isOccupied={!!slots.slot2}>
            {slots.slot2 ? (
              <Card
                id={slots.slot2?.id ? String(slots.slot2.id) : ""}
                text={slots.slot2?.content ?? ""}
                isDraggable={false}
              />
            ) : (
              <span className="text-gray-400">Card Slot</span>
            )}
          </TableSlot>
          <TableSlot id="slot3" isOccupied={!!slots.slot3}>
            {slots.slot3 ? (
              <Card
                id={slots.slot3?.id ? String(slots.slot3.id) : ""}
                text={slots.slot3?.content ?? ""}
                isDraggable={false}
              />
            ) : (
              <span className="text-gray-400">Card Slot</span>
            )}
          </TableSlot>
        </div>
        {isCurrentUserCardHolder() ? <CardDeck /> : null}
      </div>
    </DndContext>
  );
}
