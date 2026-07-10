"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useMemo, useState } from "react";
import PricingCard from "./PricingCard";
import PricingToggle from "./PricingToggle";
import CategoryTabs from "./CategoryTabs";

export default function PricingSection({ data }: any) {
  const [mode, setMode] = useState<"human" | "ai">("human");
  const [category, setCategory] = useState("website");
  const plans = useMemo(
    () => data?.[mode]?.[category] ?? [],
    [mode, category, data],
  );
  const categories = [
    { key: "mobile", label: "Mobile App" },
    { key: "website", label: "Website" },
    { key: "webapp", label: "Web App" },
    { key: "branding", label: "Branding" },
  ];
  return (
    <section className="pt-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-10">
          <PricingToggle
            value={mode}
            onChange={(value) => {
              setMode(value);
              setCategory("website");
            }}
          />
        </div>

        <CategoryTabs
          categories={categories}
          active={category}
          onChange={setCategory}
        />

        <AnimatePresence mode="wait">
          <motion.div
            key={`${mode}-${category}`}
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -25 }}
            transition={{
              duration: 0.45,
              ease: "easeOut",
            }}
            className="grid grid-cols-1 lg:grid-cols-3  items-stretch"
          >
            {plans.map((plan: any, index: number) => (
              <PricingCard key={index} plan={plan} />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
