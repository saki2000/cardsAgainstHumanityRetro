import CardDeck from "../CardDeck/CardDeck";
import { DndContext, DndContextProps } from "@dnd-kit/core";
import TableSlot from "../TableSlot/TableSlot";
import { useCardDeckStore } from "@/lib/CardDeckStore";
import { useGameStore } from "@/lib/GameStore";
import Card from "../Card/Card";
import AnswerSlots from "../AnswerSlot/AnswerSlots";
import AnswerDeck from "../../AnswerDeck/AnswerDeck";

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

    // Ensure we have a drop target
    if (!over) return;

    const activeType = active.data.current?.type;
    const overType = over.data.current?.type;

    console.log("Drag Ended", { activeType, overType });

    // Logic for dropping a Question Card onto a Table Slot
    if (activeType === "question-card" && overType === "table-slot") {
      const cardId = active.id as string;
      const slotId = over.id as "slot1" | "slot2" | "slot3";
      playCard(sessionCode, Number(cardId), slotId);
      return;
    }

    // Logic for dropping an Answer Card onto an Answer Slot
    if (activeType === "answer-card" && overType === "answer-slot") {
      const answerText = active.data.current?.text;
      const slotId = over.id as string; // "answerSlot1", "answerSlot2", etc.
      //   submitAnswer(sessionCode, slotId, answerText);
      console.log(`Answer submitted to ${slotId}: ${answerText}`);
      return;
    }

    // If it's not a valid drop combination, do nothing.
    console.log("Invalid drop");
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className="flex flex-1 flex-col items-center justify-center pb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col gap-6">
            <TableSlot id="slot1" isOccupied={!!slots.slot1}>
              {slots.slot1 ? (
                <Card
                  id={String(slots.slot1.id)}
                  text={slots.slot1.content}
                  isDraggable={false}
                />
              ) : (
                <span className="text-gray-400">Drop Card Here</span>
              )}
            </TableSlot>

            {slots.slot1 && (
              <AnswerSlots id="answerSlot1">
                <span className="text-gray-400">Drop Answer Here</span>
              </AnswerSlots>
            )}
          </div>

          <div className="flex flex-col gap-6">
            <TableSlot id="slot2" isOccupied={!!slots.slot2}>
              {slots.slot2 ? (
                <Card
                  id={String(slots.slot2.id)}
                  text={slots.slot2.content}
                  isDraggable={false}
                />
              ) : (
                <span className="text-gray-400">Drop Card Here</span>
              )}
            </TableSlot>
            {slots.slot2 && (
              <AnswerSlots id="answerSlot2">
                <span className="text-gray-400">Drop Answer Here</span>
              </AnswerSlots>
            )}
          </div>

          <div className="flex flex-col gap-6">
            <TableSlot id="slot3" isOccupied={!!slots.slot3}>
              {slots.slot3 ? (
                <Card
                  id={String(slots.slot3.id)}
                  text={slots.slot3.content}
                  isDraggable={false}
                />
              ) : (
                <span className="text-gray-400">Drop Card Here</span>
              )}
            </TableSlot>
            {slots.slot3 && (
              <AnswerSlots id="answerSlot3">
                <span className="text-gray-400">Drop Answer Here</span>
              </AnswerSlots>
            )}
          </div>
        </div>

        {isCurrentUserCardHolder() ? <CardDeck /> : <AnswerDeck />}
      </div>
    </DndContext>
  );
}
