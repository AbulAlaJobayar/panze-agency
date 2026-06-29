import React, { useState, useCallback } from "react";
import bg from "/public/whatwedo/bg.png";
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
  services,
  label,
  description,
  icon,
}) => {
  const [activeTab, setActiveTab] = useState(services[0]?.title || "");

  const handleTabClick = useCallback((tabId: string) => {
    setActiveTab(tabId);
  }, []);

  return (
      <div className="container mx-auto ">
        {/* Tabs Container */}
        <div className="bg-[#1E1212] overflow-hidden">
          <div className="flex flex-col lg:flex-row">
            {/* LEFT: Tab List */}
            <div
              className="flex flex-row lg:flex-col overflow-x-auto lg:overflow-x-visible border-b lg:border-b-0 lg:border-r border-white/10 bg-[#1E1212]"
              role="tablist"
            >
              {services.map((service) => {
                const isActive = activeTab === service.title;
                return (
                  <button
                    key={service.title}
                    role="tab"
                    aria-selected={isActive}
                    aria-controls={`panel-${service.title}`}
                    id={`tab-${service.title}`}
                    onClick={() => handleTabClick(service.title)}
                    className={` 
                      relative shrink-0 lg:shrink-0 w-50 lg:w-70 px-6 py-5 text-left transition-all duration-300 cursor-pointer
                      border-b border-white/5 last:border-b-0 lg:border-b lg:border-white/5
                      ${
                        isActive
                          ? "bg-primary text-white"
                          : "text-white/60 hover:text-white hover:bg-white/5"
                      }
                      focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#EF7B59]
                    `}
                  >
                    <div
                      className={`w-full ${isActive && "bg-[url('/public/whatwedo/bg.png')]"}`}
                    >
                      <h3
                        className={` py-1
                          font-commissioner transition-all duration-300
                          ${
                            isActive
                              ? "text-[20px] font-semibold "
                              : "text-[16px] font-normal"
                          }
                          leading-[130%] tracking-[-4%]
                        `}
                      >
                        {service.tabTitle}
                      </h3>

                      {/* Subtitle - only when active */}
                      {isActive && service.tabSubtitle && (
                        <p className="mt-1 text-sm text-white/80 font-normal">
                          {service.tabSubtitle}
                        </p>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* MIDDLE: Image */}
            <div className="lg:w-95 xl:w-105 relative overflow-hidden bg-[#2a1c1c] order-first lg:order-0">
              {services.map((service) => {
                const isActive = activeTab === service.title;
                return (
                  <div
                    key={service.title}
                    className={`
                      ${isActive ? "block" : "hidden"}
                    `}
                  >
                    <img
                      src={service.image}
                      alt={service.tabTitle}
                      className="w-full  object-cover"
                      loading="lazy"
                    />
                  </div>
                );
              })}
            </div>

            {/* RIGHT: Tab Content */}
            <div className="flex-1 bg-[#1E1212] order-last lg:order-0">
              {services.map((service) => {
                const isActive = activeTab === service.title;
                return (
                  <div
                    key={service.title}
                    id={`panel-${service.title}`}
                    role="tabpanel"
                    aria-labelledby={`tab-${service.title}`}
                    className={`
                      ${isActive ? "block" : "hidden"}
                    `}
                  >
                    <div className="px-10 pt-2 bg-[#1E1212]">
                      <div>
                        <p className="font-dm-mono text-[14px]  leading-[150%] font-normal tracking-[-4%] text-white mb-6">
                          {service.description}
                        </p>

                        <ul className="space-y-2">
                          {service.features.map((feature, index) => (
                            <li
                              key={index}
                              className="font-dm-mono text-[14px]  leading-[150%] font-normal tracking-[-4%] text-white gap-2 flex items-start "
                            >
                              <span className="text-white shrink-0">-</span>
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className=" bg-primary w-40 text-center py-3 mt-7">
                        <a
                          href={`/services/${service.slug}`}
                          className="inline-flex items-center gap-2 text-white text-[15px] font-medium transition-all duration-200  group"
                        >
                          {service.buttonText}
                          <span className="inline-block transition-transform group-hover:translate-x-1">
                            ↗
                          </span>
                        </a>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    
  );
};

export default TabSection;
