"use client";

import { useCardDeckStore } from "@/lib/CardDeckStore";
import Card from "../Card/Card";

export default function CardDeck() {
  const hand = useCardDeckStore((state) => state.hand);

  return (
    <div className="p-4 bg-gray-600 rounded-lg bottom-4 left-4 right-4 shadow-inner mb-14 mt-8">
      <div className="flex gap-4 justify-center min-h-[14rem] items-center">
        {hand.length > 0 ? (
          hand.map((card) => (
            <Card key={card.id} id={card.id} text={card.text} />
          ))
        ) : (
          <p className="text-gray-500">No cards in hand.</p>
        )}
      </div>
    </div>
  );
}
