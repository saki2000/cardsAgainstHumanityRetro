"use client";

import { useCardDeckStore } from "@/lib/CardDeckStore";
import Card from "../Card/Card";

export default function CardDeck() {
  const hand = useCardDeckStore((state) => state.hand);

  return (
    <div className="p-4 bg-gray-600 rounded-lg bottom-4 left-4 right-4 shadow-inner mb-14 mt-8 max-w-full">
      <div className="flex flex-wrap gap-2 justify-center items-center">
        {hand.map((card) => (
          <Card
            key={card.id}
            id={card.id.toString()}
            text={card.content}
            isDraggable={true}
          />
        ))}
      </div>
    </div>
  );
}
