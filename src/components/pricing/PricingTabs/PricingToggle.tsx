"use client";

import { motion } from "framer-motion";

type DesignType = "human" | "ai";

interface PricingToggleProps {
  value: DesignType;
  onChange: (value: DesignType) => void;
}

export default function PricingToggle({ value, onChange }: PricingToggleProps) {
  return (
    <div className="flex justify-center">
      <div className="flex items-center gap-4">
        <button
          onClick={() => onChange("human")}
          className={`font-dm-mono font-medium text-[14px] leading-[150%] tracking-[-4%] transition-colors ${
            value === "human" ? "text-[#35211F]" : "text-[#35211F]/50"
          }`}
        >
          Human Design
        </button>

        <button
          onClick={() => onChange(value === "human" ? "ai" : "human")}
          className="toggle-border relative flex h-5 w-10 border border-primary p-1"
        >
          <div
            className={`flex w-full ${
              value === "human" ? "justify-start" : "justify-end"
            }`}
          >
            <motion.div
              layoutId="pricing-toggle"
              transition={{
                type: "spring",
                stiffness: 500,
                damping: 30,
              }}
              className="h-3 w-4 bg-primary"
            />
          </div>
        </button>

        <button
          onClick={() => onChange("ai")}
          className={` font-dm-mono font-medium text-[14px] leading-[150%] tracking-[-4%] transition-colors ${
            value === "ai" ? "text-[#35211F]" : "text-[#35211F]/50"
          }`}
        >
          AI Design
        </button>
      </div>
    </div>
  );
}
