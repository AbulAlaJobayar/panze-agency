// src/components/Stepper.tsx
import { useState, useEffect } from "react";
import { Check } from "lucide-react";
import stepeerIcon from "/public/ourProcess/stepper.png"

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

export default function Stepper({ steps}: StepperProps) {
  // Use provided steps or fallback to default
  const stepperSteps = steps && steps.length > 0 ? steps : defaultSteps;
  const [active, setActive] = useState(0);

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

  return (
    <div className="w-full max-w-6xl mx-auto ">
      {/* ================= Stepper ================= */}
      <div className="relative mb-10">
        {/* Timeline - Dashed Line */}
        <div className="absolute top-2 left-0 w-full flex items-center">
          {stepperSteps.slice(0, -1).map(
            (
              _,
              index, // slice is now safe
            ) => (
              <div key={index} className="flex-1">
                <div
                  className={`h-px ${
                    index < active
                      ? "border-t border-dashed border-[#EB6A42]"
                      : "bg-[#EB6A42]"
                  }`}
                />
              </div>
            ),
          )}
        </div>

        {/* Animated Arrow */}
        {active < stepperSteps.length - 1 && (
          <div
            className="absolute -top-2 transition-all duration-700 ease-in-out"
            style={{
              left: `calc(${getProgressPosition(active, stepperSteps.length)}% + 100px)`,
            }}
          >
            <img src={stepeerIcon.src} alt="stepericon" />
          </div>
        )}

        {/* Steps */}
        <div className="border-b pb-10">
          <div className="relative z-10 flex justify-between">
            {stepperSteps.map((step, index) => {
              const completed = index < active;
              const current = index === active;

              return (
                <div
                  key={index}
                  className="flex flex-col items-center cursor-pointer group"
                  onClick={() => setActive(index)}
                >
                  {/* Circle with Icon */}
                  <div
                    className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                      completed || current
                        ? "bg-[#EB6A42] border-[#EB6A42]"
                        : "bg-white border-[#EB6A42]"
                    }`}
                  >
                    {completed || current ? (
                      <Check
                        className="w-3.5 h-3.5 text-white"
                        strokeWidth={3}
                      />
                    ) : null}
                  </div>

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
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ================= Content ================= */}
      <div className="px-10 grid lg:grid-cols-2 gap-8 lg:gap-20 items-center">
        {/* Image Section */}
        <div className="h-80 lg:h-105 rounded-[180px] bg-gray-100 flex items-center justify-center overflow-hidden relative">
          {stepperSteps[active]?.image ? (
            <img
              src={stepperSteps[active].image}
              alt={stepperSteps[active].imageAlt || stepperSteps[active].title}
              className="w-full h-full object-cover"
              onError={(e) => {
                // Handle image load error
                e.currentTarget.style.display = "none";
              }}
            />
          ) : (
            <div className="text-gray-400 text-center p-4">
              <p className="text-sm">Step {active + 1}</p>
              <p className="text-xs mt-1">{stepperSteps[active]?.title}</p>
            </div>
          )}
        </div>

        {/* Content Section */}
        <div>
          <p className="font-dm-mono font-medium text-[16px]  leading-[150%] tracking-[-4%] text-[#301C1B] mb-6 lg:mb-10">
            {stepperSteps[active].description}
          </p>
          <ul className="space-y-0.5">
            {stepperSteps[active].points.map((item, idx) => (
              <li key={idx} className="flex items-center gap-3">
                <span className="text-[#301C1B] font-bold mt-1">-</span>
                <span className="font-dm-mono font-normal text-[14px] text-[#301C1B] leading-[150%] tracking-[-4%]">
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
