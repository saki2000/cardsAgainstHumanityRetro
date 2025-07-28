import CardDeck from "../CardDeck/CardDeck";
import { DndContext, DndContextProps } from "@dnd-kit/core";
import TableSlot from "../TableSlot/TableSlot";
import { useCardDeckStore } from "@/lib/CardDeckStore";
import { useGameStore } from "@/lib/GameStore";
import Card from "../Card/Card";
import AnswerSlots from "../AnswerSlot/AnswerSlots";
import AnswerDeck from "../../AnswerDeck/AnswerDeck";
import { useState } from "react";

interface Props {
  sessionCode: string;
}

export default function GameContainer({ sessionCode }: Props) {
  const [answerText, setAnswerText] = useState("");
  const { slots } = useCardDeckStore();
  const playCard = useGameStore((state) => state.playCard);
  const submitComment = useGameStore((state) => state.submitComment);
  const isCurrentUserCardHolder = useGameStore(
    (state) => state.isCurrentUserCardHolder,
  );

  const handleDragEnd: DndContextProps["onDragEnd"] = (event) => {
    const { active, over } = event;

    if (!over) return;

    const activeType = active.data.current?.type;
    const overType = over.data.current?.type;

    if (activeType === "question-card" && overType === "table-slot") {
      const cardId = active.id as string;
      const slotId = over.id as "slot1" | "slot2" | "slot3";
      playCard(sessionCode, Number(cardId), slotId);
      return;
    }

    if (activeType === "answer-card" && overType === "answer-slot") {
      const answerText = active.data.current?.text || "";
      const answerSlotId = over.id as string;

      const correspondingSlotKey = answerSlotId.replace(
        "answerSlot",
        "slot",
      ) as keyof typeof slots;

      const playedCard = slots[correspondingSlotKey];

      if (playedCard && playedCard.sessionCardId) {
        if (!answerText.trim()) {
          console.error("Answer text cannot be empty.");
          return;
        } //TODO: Need to refactor this function to smaller functions
        submitComment(sessionCode, playedCard.sessionCardId, answerText);
        setAnswerText("");
      } else {
        console.error(
          `Could not find a played card in ${correspondingSlotKey} to comment on.`,
        );
      }
      return;
    }
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
              <AnswerSlots
                sessionCode={sessionCode}
                id="answerSlot1"
                comments={slots.slot1.comments || []}
              />
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
              <AnswerSlots
                sessionCode={sessionCode}
                id="answerSlot2"
                comments={slots.slot2.comments || []}
              />
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
              <AnswerSlots
                sessionCode={sessionCode}
                id="answerSlot3"
                comments={slots.slot3.comments || []}
              />
            )}
          </div>
        </div>

        {isCurrentUserCardHolder() ? (
          <CardDeck />
        ) : (
          <AnswerDeck answerText={answerText} setAnswerText={setAnswerText} />
        )}
      </div>
    </DndContext>
  );
}
