import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface StepItem {
  title: string;
  subtitle: string;
  description: string;
  points: string[];
}

interface OurWebsiteProcessProps {
  data: StepItem[];
}

export default function OurWebsiteProcess({ data }: OurWebsiteProcessProps) {
  // FIX 1: Default to the title of the first data item to make the first step active on load safely
  const [expandedTitle, setExpandedTitle] = useState<string>("");

  useEffect(() => {
    if (data && data.length > 0) {
      setExpandedTitle(data[0].title);
    }
  }, [data]); // FIX 2: Added dependency array to stop the infinite rendering loop

  if (!data || data.length === 0) return null;

  return (
    <div className="w-full  mx-auto">
      <div
        className="flex flex-col lg:flex-row mx-4 lg:mx-5 border border-gray-200 lg:h-100 w-full overflow-hidden"
      >
        {data.map((step) => {
          const isExpanded = expandedTitle === step.title;

          return (
            <motion.div
              key={step.title}
              layout
              transition={{
                duration: 0.45,
                ease: [0.25, 1, 0.5, 1],
              }}
              // Keeps the 40% and 20% width calculations completely fluid
              animate={{
                flexGrow: isExpanded ? 2 : 1,
              }}
              onClick={() => setExpandedTitle(step.title)}
              className="relative border-b lg:border-b-0 lg:border-r last:border-r-0
                          last:border-b-0border-gray-200 p-6 md:p-8 bg-white overflow-hidden cursor-pointer flex flex-col min-h-35 lg:h-full"
            >
              {/* Layout manager inside the card */}
              <div
                className={`flex flex-col h-full ${isExpanded ? "gap-5" : "justify-between"}`}
              >
                {/* Header Segment */}
                <div
                  className={`flex flex-col ${isExpanded ? "mb-0" : "h-full justify-between"}`}
                >
                  <div className="text-[#FF6A4A] font-dm-mono font-normal text-sm tracking-[-4% ] leading-[150%] pt-2">
                    {step.title}
                  </div>

                  <h3
                    className={` font-commissioner font-semibold text-[16px] text-[#1F1615] tracking-[-4% ] leading-[130%] transition-all duration-500 ${
                      isExpanded
                        ? "text-xl mt-2 max-w-md"
                        : "text-base pb-2 max-w-40"
                    }`}
                  >
                    {step.subtitle}
                  </h3>
                </div>

                {/* Body Content Segment */}
                <motion.div layout="position" className="w-full">
                  <AnimatePresence initial={false}>
                    {isExpanded && (
                      <motion.div
                        initial={false}
                          animate={{
                            opacity: isExpanded ? 1 : 0,
                            height: isExpanded ? "auto" : 0,
                          }}
                          transition={{
                            duration: 0.3,
                          }}

                        className="space-y-4 mt-4 max-w-xl pr-0 lg:pr-2"
                      >
                        {step.description && (
                          <p className="font-dm-mono font-normal text-sm tracking-[-4% ] leading-[150%] text-[#5A4F4E] text-[14px]  ">
                            {step.description}
                          </p>
                        )}

                        {step.points && (
                          <ul className="space-y-2 font-dm-mono font-normal text-sm tracking-[-4% ] leading-[150%]  text-[#5A4F4E] font-normal">
                            {step.points.map((bullet: string, idx: number) => (
                              <li key={idx} className="flex items-start">
                                <span className="mr-2 text-gray-400">•</span>
                                <span>{bullet}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
