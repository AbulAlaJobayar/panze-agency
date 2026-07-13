// src/components/Stepper.tsx
import { useState, useEffect } from "react";
import { Check } from "lucide-react";
import stepeerIcon from "/public/ourProcess/stepper.png";
import { AnimatePresence, motion } from "framer-motion";
interface Step {
  title: string;
  description: string;
  image?: string;
  imageAlt?: string;
  points: string[];
}

interface StepperProps {
  steps?: Step[]; // Make it optional with fallback
}

// Fallback data if steps is undefined
const defaultSteps: Step[] = [];

export default function Stepper({ steps }: StepperProps) {
  // Use provided steps or fallback to default
  const stepperSteps = steps && steps.length > 0 ? steps : defaultSteps;
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState(1);
  const handleStepChange = (index: number) => {
    setDirection(index > active ? 1 : -1);
    setActive(index);
  };
  
  // Reset active index if it's out of bounds
  useEffect(() => {
    if (active >= stepperSteps.length) {
      setActive(0);
    }
  }, [stepperSteps.length, active]);

  // Calculate progress positions
  const getProgressPosition = (index: number, total: number) => {
    if (total <= 1) return 50;
    return (index / (total - 1)) * 100;
  };

  // Safety check: if no steps, show a message
  if (!stepperSteps || stepperSteps.length === 0) {
    return (
      <div className="text-center py-10 text-gray-500">No steps available</div>
    );
  }
// const progressWidth =
//   active === stepperSteps.length - 1
//     ? 100
//     : ((active + 1) / (stepperSteps.length - 1)) * 100;

    const totalSteps = stepperSteps.length;

    const segmentWidth = totalSteps > 1 ? 100 / (totalSteps - 1) : 100;

    const progressWidth =
      active === totalSteps - 1 ? 100 : segmentWidth * (active + 0.5);
  return (
    <div className="w-full max-w-6xl mx-auto ">
      {/* ================= Stepper ================= */}
      <div className="relative mb-10">
        {/* Timeline - Dashed Line */}
        {/* Timeline */}
        <div className="absolute top-2 left-0 right-0">
          <div className="absolute top-0 left-0 w-full h-px bg-[#EB6A42]/20" />

          <motion.div
            className="absolute top-0 left-0 border-t border-dashed border-[#EB6A42]"
            animate={{
              width: `${progressWidth}%`,
            }}
            transition={{
              duration: 0.5,
            }}
          />
        </div>

        {/* Animated Arrow */}
        {active !== totalSteps - 1 && (
          <motion.div
            animate={{
              left: `calc(${progressWidth}% - 30px)`,
            }}
            transition={{
              type: "spring",
              stiffness: 120,
              damping: 18,
            }}
            className="absolute -top-2 z-20"
          >
            <img src={stepeerIcon.src} alt="" className="w-auto h-auto" />
          </motion.div>
        )}

        {/* Steps */}
        <div className="border-b pb-10">
          <div className="relative z-10 flex justify-between">
            {stepperSteps.map((step, index) => {
              const completed = index <= active;
              const current = index === active;

              return (
                <motion.div
                  key={index}
                  className="flex flex-col items-center cursor-pointer group"
                  onClick={() => handleStepChange(index)}
                  whileHover={{
                    y: -1,
                  }}
                  whileTap={{
                    scale: 0.96,
                  }}
                >
                  {/* Circle with Icon */}
                  <motion.div
                    layout
                    transition={{
                      type: "spring",
                      stiffness: 400,
                      damping: 30,
                    }}
                    className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                      completed
                        ? "bg-[#EB6A42] border-[#EB6A42]"
                        : "bg-white border-[#EB6A42]"
                    }`}
                  >
                    {completed && (
                      <Check
                        className="w-3.5 h-3.5 text-white"
                        strokeWidth={3}
                      />
                    )}
                  </motion.div>

                  {/* Title */}
                  <p
                    className={`mt-6 pb-2 mx-10 font-commissioner text-[14px] sm:text-[16px] font-normal leading-[130%] tracking-[-4%] transition-all ${
                      current
                        ? "text-[#301C1B] "
                        : completed
                          ? "text-[#EB6A42]"
                          : "text-[#301C1B] opacity-60"
                    }`}
                  >
                    {step.title}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ================= Content ================= */}
      <div className="px-10 grid lg:grid-cols-2 gap-8 lg:gap-20 items-center">
        {/* Image Section */}
        <div className="h-80 lg:h-105 rounded-[180px] bg-gray-100 overflow-hidden relative">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.img
              key={active}
              src={stepperSteps[active].image}
              alt={stepperSteps[active].imageAlt}
              custom={direction}
              initial={{
                opacity: 0,
                scale: 0.90,
              }}
              animate={{
                opacity: 1,
                scale: 1,
              }}
              exit={{
                opacity: 0,
                scale: 1.01,
              }}
              transition={{
                duration: 0.5,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="absolute inset-0 w-full h-full object-cover"
            />
          </AnimatePresence>
        </div>

        {/* Content Section */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{
              opacity: 0,
              y: 40,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              y: -20,
            }}
            transition={{
              duration: 0.5,
            }}
          >
            <div>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.15,
                  duration: 0.4,
                }}
                className="font-dm-mono ..."
              >
                {stepperSteps[active].description}
              </motion.p>
              <motion.ul
                initial="hidden"
                animate="show"
                variants={{
                  hidden: {},
                  show: {
                    transition: {
                      staggerChildren: 0.08,
                    },
                  },
                }}
              >
                {stepperSteps[active].points.map((item, idx) => (
                  <motion.li
                    key={idx}
                    variants={{
                      hidden: {
                        opacity: 0,
                        x: 20,
                      },
                      show: {
                        opacity: 1,
                        x: 0,
                      },
                    }}
                    className="flex items-center gap-3"
                  >
                    <span className="text-[#301C1B] font-bold mt-1">-</span>
                    <span className="font-dm-mono font-normal text-[14px] text-[#301C1B] leading-[150%] tracking-[-4%]">
                      {item}
                    </span>
                  </motion.li>
                ))}
              </motion.ul>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
