import React, { useState, useCallback } from "react";
import { AnimatePresence, motion, LayoutGroup } from "framer-motion";
interface Service {
  value: string;
  slug: string;
  tabTitle: string;
  tabSubtitle: string;
  title: string;
  description: string;
  image: string;
  buttonText: string;
  features: string[];
}

interface TabSectionProps {
  services: Service[];
  label?: string;
  description?: string;
  icon?: string;
}

const TabSection: React.FC<TabSectionProps> = ({
  services
}) => {
  const [activeTab, setActiveTab] = useState(services[0]?.title || "");

  const handleTabClick = useCallback((tabId: string) => {
    setActiveTab(tabId);
  }, []);

  return (
    <div className="container mx-auto border-t border-white/10 md:border-t-0  ">
      {/* Tabs Container */}
      <div className="bg-[#1E1212] overflow-hidden">
        <div className="flex flex-col lg:grid lg:grid-cols-12 min-h-125">
          {/* LEFT: Tab List */}
          <LayoutGroup>
            <div
              className=" w-full lg:col-span-3 flex flex-col "
              role="tablist"
            >
              {services.map((service) => {
                const isActive = activeTab === service.title;
                return (
                  <motion.button
                    key={service.title}
                    role="tab"
                    aria-selected={isActive}
                    aria-controls={`panel-${service.title}`}
                    id={`tab-${service.title}`}
                    onClick={() => handleTabClick(service.title)}
                    className={` 
                      relative flex flex-col justify-center shrink-0 lg:shrink-0 w-full px-1 py-5 lg:px-4 lg:py-3 text-left transition-all duration-300 cursor-pointer
                      border-b border-white/5 last:border-b-0  lg:border-white/5
                      ${
                        isActive
                          ? "bg-primary text-white"
                          : "text-white/60 hover:text-white hover:bg-white/5"
                      }
                      focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#EF7B59]
                    `}
                  >
                    {isActive && (
                      <>
                        <motion.div
                          layoutId="active-service-tab"
                          className="absolute inset-0 bg-[#EB6A42]"
                          transition={{
                            type: "spring",
                            stiffness: 350,
                            damping: 30,
                          }}
                        />

                        <motion.div
                          layoutId="active-service-pattern"
                          className="absolute inset-0"
                          style={{
                            backgroundImage:
                              "radial-gradient(rgba(255,255,255,.15) 1px, transparent 1px)",
                            backgroundSize: "12px 12px",
                          }}
                        />
                      </>
                    )}
                    <div className="relative z-10 w-full">
                      <h3
                        className={`py-1  text-[12px] lg:text-[15px] leading-[130%] transition-all duration-300 ${
                          isActive
                            ? "font-semibold text-white"
                            : "font-normal text-white/60"
                        }`}
                      >
                        {service.tabTitle}
                      </h3>

                      <div className="hidden lg:block h-10 mt-2">
                        {service.tabSubtitle && (
                          <p
                            className={`text-sm transition-all duration-300 ${
                              isActive
                                ? "opacity-100 text-white/80"
                                : "opacity-0"
                            }`}
                          >
                            {service.tabSubtitle}
                          </p>
                        )}
                      </div>
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </LayoutGroup>
          {/* MIDDLE: Image */}
          <div
            className=" hidden lg:block lg:col-span-5 relative overflow-hidden border-r border-white/10 max-h-132.5"
          >
            <AnimatePresence mode="wait">
              {services
                .filter((service) => activeTab === service.title)
                .map((service) => (
                  <motion.img
                    key={service.title}
                    src={service.image}
                    alt={service.tabTitle}
                    initial={{
                      opacity: 0,
                      scale: 0.95,
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
                      duration: 0.4,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="absolute inset-0 w-full h-full object-cover "
                  />
                ))}
            </AnimatePresence>
          </div>

          {/* RIGHT: Tab Content */}
          <div
            className="w-full
  lg:col-span-4
  bg-[#1E1212]
  min-h-137.5"
          >
            <AnimatePresence mode="wait">
              {services
                .filter((service) => service.title === activeTab)
                .map((service) => (
                  <motion.div
                    key={service.title}
                    id={`panel-${service.title}`}
                    role="tabpanel"
                    initial={{
                      opacity: 0,
                      y: 30,
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
                      duration: 0.45,
                    }}
                  >
                    <div className="h-full px-6 lg:px-10 py-8 bg-[#1E1212] flex flex-col justify-between">
                      <div>
                        <p className="font-dm-mono text-[12px] md:text-[14px] leading-[150%] font-normal tracking-[-4%] text-white mb-6">
                          {service.description}
                        </p>

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
                          className="space-y-1 md:space-y-2"
                        >
                          {service.features.map((feature, index) => (
                            <motion.li
                              key={index}
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
                              className="font-dm-mono text-[12px] md:text-[14px] leading-[150%] font-normal tracking-[-4%] text-white gap-2 flex items-start"
                            >
                              <span className="text-white shrink-0">-</span>
                              <span>{feature}</span>
                            </motion.li>
                          ))}
                        </motion.ul>
                      </div>

                      <motion.div
                        whileHover={{
                          scale: 1.03,
                        }}
                        whileTap={{
                          scale: 0.98,
                        }}
                        className="bg-primary w-40 text-center md:py-3 py-2 mt-4 md:mt-7"
                      >
                        <a
                          href={`/services/${service.slug}`}
                          className="inline-flex items-center gap-2 text-white text-[15px] font-medium group"
                        >
                          {service.buttonText}

                          <motion.svg
                            animate={{
                              x: [0, 4, 0],
                            }}
                            transition={{
                              repeat: Infinity,
                              duration: 1.8,
                            }}
                            className="size-6"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                          >
                            <path
                              d="M7 17L17 7M17 7H9M17 7V15"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </motion.svg>
                        </a>
                      </motion.div>
                    </div>
                  </motion.div>
                ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TabSection;
