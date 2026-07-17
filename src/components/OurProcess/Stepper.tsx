import { Check } from "lucide-react";
import stepeerIcon from "/public/ourProcess/stepper.png";
import { AnimatePresence, motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import sectionIcon from "@/assets/sectionIcon/networkIcon.svg"
import LinkButton from "../ui/LinkButton2";
import type { Variants } from "framer-motion";
interface Step {
  title: string;
  description: string;
  image?: string;
  imageAlt?: string;
  points: string[];
}
interface TData {
  title: string;
  subTitle: string;
  description: string;
  buttonText: string;
  buttonLink: string;
  ourPocessIcon:any;
}

interface StepperProps {
  steps?: Step[]; 
  data:TData;
}

// Fallback data if steps is undefined
const defaultSteps: Step[] = [];
gsap.registerPlugin(ScrollTrigger);

export default function Stepper({ steps,data }: StepperProps) {
  // Use provided steps or fallback to default

const sectionRef = useRef<HTMLDivElement>(null);

const progressRef = useRef<HTMLDivElement>(null);
const arrowRef = useRef<HTMLDivElement>(null);

  const stepperSteps = steps && steps.length > 0 ? steps : defaultSteps;
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState(1);
  const timelineRef = useRef<HTMLDivElement>(null);
  // Reset active index if it's out of bounds
//   useEffect(() => {
//     if (!sectionRef.current || stepperSteps.length <= 1) return;
//     const totalSteps = stepperSteps.length;
//     let currentIndex = 0;
// const getTimelineWidth = () => timelineRef.current?.offsetWidth || 0;
//     const trigger = ScrollTrigger.create({
//       trigger: sectionRef.current,
//       start: "top 3%",
//       end: `+=${window.innerHeight * totalSteps}`,
//       pin: true,
//       scrub: 1.5,

//       onUpdate: (self) => {
//         const progress = self.progress;
// const timelineWidth = getTimelineWidth();
//       gsap.set(progressRef.current, {
//         width: `${progress * 100}%`,
//       });

//         const index = Math.min(
//           totalSteps - 1,
//           Math.floor(progress * totalSteps),
//         );

//         if (index !== currentIndex) {
//           setDirection(index > currentIndex ? 1 : -1);
//           setActive(index);
//           currentIndex = index;
//         }

//         // Smooth arrow movement
//        gsap.to(arrowRef.current, {
//          x: progress * (timelineWidth - 40),
//          duration: 0.6,
//          ease: "power4.out",
//          overwrite: "auto",
//        });
//       }
//     });

//     return () => {
//       trigger.kill();
//     };
//   }, [stepperSteps]);

useEffect(() => {
  if (!sectionRef.current || stepperSteps.length <= 1) return;

  const mm = gsap.matchMedia();

  const createStepperTrigger = (pin: boolean) => {
    const totalSteps = stepperSteps.length;
    let currentIndex = 0;

    return ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top 7%",
      end: `+=${window.innerHeight * totalSteps}`,
      pin,
      scrub: 1.5,

      onUpdate: (self) => {
        const progress = self.progress;
        const timelineWidth = timelineRef.current?.offsetWidth || 0;

        gsap.set(progressRef.current, {
          width: `${progress * 100}%`,
        });

        gsap.set(arrowRef.current, {
          x: progress * (timelineWidth - 40),
        });

        const index = Math.min(
          totalSteps - 1,
          Math.floor(progress * totalSteps),
        );

        if (index !== currentIndex) {
          setDirection(index > currentIndex ? 1 : -1);
          setActive(index);
          currentIndex = index;
        }
      },
    });
  };

  // Mobile
  mm.add("(max-width: 767px)", () => {
    const trigger = createStepperTrigger(false);

    return () => trigger.kill();
  });

  // Tablet + Desktop
  mm.add("(min-width: 768px)", () => {
    const trigger = createStepperTrigger(true);

    return () => trigger.kill();
  });

  return () => {
    mm.revert();
  };
}, [stepperSteps.length]);
  // Safety check: if no steps, show a message
  if (!stepperSteps || stepperSteps.length === 0) {
    return (
      <div className="text-center  text-gray-500">No steps available</div>
    );
  }
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};



const itemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 40,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: "easeOut",
    },
  },
};

  return (
    <section ref={sectionRef} className="border-b overflow-hidden">
      <div className=" flex flex-col md:flex-row items-stretch">
        {/*  Left Side - Fixed width with white background  */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: false,
            amount: 0.3,
          }}
          className="w-full py-20 px-8 lg:w-100 shrink-0 border-b sm:border-b-0 sm:border-r    bg-white"
        >
          <motion.div
            variants={itemVariants}
            className="flex items-center gap-2 mb-6 md:mb-9"
          >
            <img
              src={sectionIcon.src}
              alt="icon"
              width={16}
              height={14}
              className="w-5 h-5 md:w-auto md:h-auto"
            />
            <h6 className="font-dm-mono font-normal text-[12px] sm:text-[14px] leading-[150%] tracking-[-4%] text-primary">
              {data.title}
            </h6>
          </motion.div>
          <motion.p
            variants={itemVariants}
            className="font-commissioner font-semibold text-[20px] sm:text-[22px] md:text-[24px] leading-[110%] tracking-[-4%] uppercase pb-8 md:pb-24 "
          >
            {data.subTitle}
          </motion.p>
          <motion.p
            variants={itemVariants}
            className="font-dm-mono font-normal text-[14px] leading-[150%] tracking-[-4%] pb-10 lg:pb-20"
          >
            {data.description}
          </motion.p>
          <motion.div variants={itemVariants}>
            <LinkButton href={data.buttonLink} text={data.buttonText} />
          </motion.div>
        </motion.div>

        {/* bottom component */}
        <div className=" pt-20 bg-white">
          <div className="w-full max-w-6xl mx-auto md:min-h-screen">
            {/* ================= Stepper ================= */}
            <div className="relative ">
              {/* Timeline - Dashed Line */}

              <div ref={timelineRef} className="absolute top-2 left-0 right-0">
                <div className="absolute top-0 left-0 w-full h-px bg-[#EB6A42]/20" />

                <div
                  ref={progressRef}
                  className="absolute h-px top-0 left-0 border-t border-dashed border-[#EB6A42]"
                />
              </div>

              {/* Animated Arrow */}

              <div ref={arrowRef} className="pl-3 absolute -top-2 z-10">
                <img src={stepeerIcon.src} alt="" className="w-auto h-auto" />
              </div>

              {/* Steps */}
              <div className="border-b pb-10">
                <div className="relative z-10 flex justify-between">
                  {stepperSteps.map((step, index) => {
                    const completed = index <= active;
                    const current = index === active;

                    return (
                      <motion.div
                        key={index}
                        className="flex flex-col items-center group"
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
            <div className="pl-15 mt-12 grid md:grid-cols-2 gap-8 items-center">
              {/* Image Section */}
              <div className="h-108 w-77.75 rounded-[180px] bg-gray-100 overflow-hidden relative">
                <AnimatePresence mode="wait" custom={direction}>
                  <motion.img
                    key={active}
                    src={stepperSteps[active].image}
                    alt={stepperSteps[active].imageAlt}
                    custom={direction}
                    initial={{
                      opacity: 0,
                      scale: 0.9,
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
                      className="font-dm-mono font-medium text-[16px] leading-[150%] tracking-[-4%] mb-9"
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
                          className="flex items-center gap-3 "
                        >
                          <span className="text-[#301C1B]  mt-1">-</span>
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
        </div>
      </div>
    </section>
  );
}
