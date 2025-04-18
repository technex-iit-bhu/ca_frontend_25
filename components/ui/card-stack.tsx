"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

let interval: NodeJS.Timeout | undefined;

type Card = {
  id: number;
  name: string;
  surname: string;
  content: React.ReactNode;
};

export const CardStack = ({
  items,
  offset,
  scaleFactor,
  onReadMore,
}: {
  items: Card[];
  offset?: number;
  scaleFactor?: number;
  onReadMore: (id: number) => void;
}) => {
  const CARD_OFFSET = offset || 15; // Increased offset for better stacking
  const SCALE_FACTOR = scaleFactor || 0.05;
  const [cards, setCards] = useState<Card[]>(items);

  useEffect(() => {
    startFlipping();

    return () => clearInterval(interval);
  }, []);

  const startFlipping = () => {
    interval = setInterval(() => {
      setCards((prevCards: Card[]) => {
        const newArray = [...prevCards];
        newArray.unshift(newArray.pop()!);
        return newArray;
      });
    }, 5000);
  };

  return (
    <div className="relative flex justify-center items-center w-full">
      {cards.map((card, index) => (
        <motion.div
          key={card.id}
          className="absolute w-full max-w-md sm:max-w-[90%] md:max-w-[70%] lg:max-w-[50%] xl:max-w-[40%] mx-auto p-4 bg-[#272727] text-white rounded-lg border border-white shadow-xl flex flex-col justify-between"
          style={{ transformOrigin: "top center" }}
          animate={{
            top: index * -CARD_OFFSET,
            scale: 1 - index * SCALE_FACTOR,
            zIndex: cards.length - index,
          }}
          transition={{
            duration: 0.2, // Faster transition duration
            ease: "easeInOut", // Smooth transition effect
          }}
        >
          <div className="mt-2">
            <div className="text-neutral-300 leading-relaxed italic">
              {card.content}
            </div>
            <button
              onClick={() => onReadMore(card.id)}
              className="px-4 py-2 mt-4 rounded-lg bg-gradient-to-r from-red-600 to-red-700 text-white text-sm font-medium hover:from-red-700 hover:to-red-800 transition-all duration-200 shadow-lg hover:shadow-red-600/25"
            >
              Read More
            </button>
          </div>
          <div className="mt-4 flex justify-between items-center border-t border-neutral-700 pt-4">
            <div className="flex flex-col">
              <h3 className="text-white font-semibold text-3xl">
                {card.name}{" "}
                <span className="text-red-500">{card.surname}</span>
              </h3>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};