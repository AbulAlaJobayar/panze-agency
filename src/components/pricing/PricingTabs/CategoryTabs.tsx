"use client";

import { motion } from "framer-motion";

type Props = {
  categories: {
    key: string;
    label: string;
  }[];
  active: string;
  onChange: (value: string) => void;
};

export default function CategoryTabs({ categories, active, onChange }: Props) {
  return (
    <div className="mb-16 flex justify-center">
      <div className="inline-flex flex-wrap justify-center gap-3">
        {categories.map((item) => {
          const selected = active === item.key;

          return (
            <button
              key={item.key}
              onClick={() => onChange(item.key)}
              className="relative  overflow-hidden  border border-[#D9D9D9] px-6 py-2 transition-colors"
            >
              {selected && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-primary "
                  transition={{
                    type: "spring",
                    stiffness: 450,
                    damping: 38,
                  }}
                />
              )}

              <span
                className={`relative z-10 font-commissioner font-normal text-[14px] leading-[150%] tracking-[-4%]  ${
                  selected ? "text-white" : "text-[#35211F]"
                }`}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
