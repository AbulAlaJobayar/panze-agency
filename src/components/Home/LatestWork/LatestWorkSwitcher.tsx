import { useState } from "react";
import LatestWorkCard from "./LatestWorkCard.tsx";

interface Card {
  name: string;
  image: string;
  tabTitle:string;
  title: string;
  description: string;
  industry: string;
  tags: string[];
}

interface Props {
  cards: Card[];
}

export default function LatestWorkSwitcher({ cards }: Props) {
  const defaultIndex = cards.findIndex((item) => item.name === "WPSTAR");
  const [activeIndex, setActiveIndex] = useState(
    defaultIndex !== -1 ? defaultIndex : 2,
  );

  return (
    <div className="flex flex-col lg:flex-row max-h-162.5 ">
      {cards.map((card, index) => {
        const isActive = activeIndex === index;

        return (
          <div
            key={card.name}
            className={`
             
              border-white/20
              ${isActive ? "flex-8" : "flex-1"}
              ${index !== cards.length - 1 ? "border-r" : ""}
            `}
          >
            {isActive ? (
              <div className="h-full overflow-hidden">
                <LatestWorkCard
                  heroImage={card.image}
                  title={card.title}
                  description={card.description}
                  industry={card.industry}
                  tags={card.tags}
                />
              </div>
            ) : (
              <button
                onClick={() => setActiveIndex(index)}
                className="
                  w-full h-full
                  flex items-center justify-center
                  bg-[#E8704E]
                  hover:bg-[#d95f3b]
                  transition-colors
                "
              >
                <span
                  className="
                    lg:-rotate-90
                    whitespace-nowrap
                    text-white
                    font-dm-mono
                    uppercase
                    text-[16px]
                  "
                >
                  {card.tabTitle}
                </span>
              </button>
            )}
          </div>
        );
      })}
    </div>
  );
}
