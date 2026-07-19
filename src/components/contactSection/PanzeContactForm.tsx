import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import dropdown from "@/assets/contact/dropdown.png";
import LinkButton from "../ui/LinkButton2";


export default function PanzeContactForm() {
  const [status, setStatus] = useState({ type: "", message: "" });
  const [selectedBudget, setSelectedBudget] = useState<string | undefined>(
    undefined,
  );
  const [isServiceOpen, setIsServiceOpen] = useState(false);
  const [isSourceOpen, setIsSourceOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<string | undefined>(undefined);
  const [selectedSource, setSelectedSource] = useState<string | undefined>(undefined);

  const budgets = [
    { label: "$500 - $1K", value: "$500 - $1K" },
    { label: "$1K - $5K", value: "$1K - $5K" },
    { label: "$5K - $10K", value: "$5K - $10K" },
    { label: "$10K - $20K", value: "$10K - $20K" },
  ];

  const services = [
    "MVP Development",
    "Web Design",
    "Full Development",
    "Branding",
    "Consulting",
  ];
  const sources = [
    "From Google",
    "From Social Media",
    "Referral",
    "Friend",
    "Other",
  ];

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setStatus({ type: "loading", message: "Sending..." });

    const formData = {
      fullName: e.target.fullName.value,
      email: e.target.email.value,
      service: selectedService,
      budget: selectedBudget,
      source: selectedSource,
      details: e.target.details.value,
    };

    try {
      const res = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await res.json();

      if (result.success) {
        setStatus({
          type: "success",
          message: "Inquiry sent successfully!",
        });
        e.target.reset();
      } else {
        setStatus({ type: "error", message: " Failed to send message." });
      }
    } catch (err) {
      setStatus({ type: "error", message: " Network error. Try again." });
    }
  };

  const selectVariant = {
    hidden: { opacity: 0, y: 10, scale: 0.98 },
    visible: { opacity: 1, y: 0, scale: 1 },
  };

  return (
    <div className="max-w-2xl mx-auto text-white">
      <motion.form
        onSubmit={handleSubmit}
        className="space-y-8"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
        }}
      >
        {/* Name + Email */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          variants={selectVariant}
        >
          <div>
            <label className="block text-white font-dm-mono text-[14px] leading-[150%] tracking-[-4%] font-normal mb-3  ">
              Full Name
            </label>
            <motion.input
              whileFocus={{ scale: 1.02 }}
              name="fullName"
              type="text"
              placeholder="John Doe"
              required
              className="w-full font-dm-mono text-[14px] leading-[150%] tracking-[-4%] font-normal border border-white/20 px-5 py-3 text-primary placeholder:text-white/70 focus:outline-none focus:border-primary "
            />
          </div>
          <div>
            <label className="text-white font-dm-mono text-[14px] leading-[150%] tracking-[-4%] font-normal block  mb-3">
              Email
            </label>
            <motion.input
              whileFocus={{ scale: 1.02 }}
              name="email"
              type="email"
              placeholder="john@gmail.com"
              required
              className="w-full font-dm-mono text-[14px] leading-[150%] tracking-[-4%] font-normal border border-white/20 px-5 py-3 text-primary placeholder:text-white/70 focus:outline-none focus:border-primary "
            />
          </div>
        </motion.div>

        {/* Animated Service Select */}
        <motion.div variants={selectVariant} className="relative">
          <label className="block text-white font-dm-mono text-[14px] leading-[150%] tracking-[-4%] font-normal mb-3 ">
            Service Required
          </label>
          <div className="relative">
            <motion.button
              type="button"
              onClick={() => setIsServiceOpen(!isServiceOpen)}
              whileHover={{ scale: 1.01 }}
              className={`w-full text-left flex justify-between items-center focus:outline-none border-white/20 border px-5 py-3 capitalize font-dm-mono text-[14px] leading-[150%] tracking-[-4%] font-normal focus:border-primary ${selectedService ? "text-primary" : "text-white/40 font-normal "}`}
            >
              {selectedService || "Select a Service"}
              <motion.span
                animate={{ rotate: isServiceOpen ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <img src={dropdown.src} alt="Dropdown" />
              </motion.span>
            </motion.button>

            <AnimatePresence>
              {isServiceOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="absolute z-50 w-full mt-2 bg-[#1E1212] border border-white/20 rounded-2xl overflow-hidden shadow-2xl"
                >
                  {services.map((service, i) => (
                    <motion.div
                      key={i}
                      whileHover={{ backgroundColor: "#2A1C1C" }}
                      onClick={() => {
                        setSelectedService(service);
                        setIsServiceOpen(false);
                      }}
                      className={`px-5 py-3 cursor-pointer ${selectedService === service ? "text-primary bg-[#1E1212]" : ""}`}
                    >
                      {service}
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Budget */}
        <motion.div variants={selectVariant}>
          <label className="block text-white font-dm-mono text-[14px] leading-[150%] tracking-[-4%] font-normal mb-3">
            Budget
          </label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {budgets.map((b) => (
              <motion.button
                key={b.value}
                type="button"
                whileHover={{
                  scale: 1.02,
                  y: -3,
                }}
                whileTap={{
                  scale: 0.97,
                }}
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 20,
                }}
                onClick={() => setSelectedBudget(b.value)}
                className={` cursor-pointer font-dm-mono text-[14px] leading-[150%] tracking-[-4%] font-normal px-4 py-3  text-sm transition-all border duration-200 ${
                  selectedBudget === b.value
                    ? "border-primary  text-primary shadow-lg shadow-orange-500/30"
                    : " text-white/40 hover:border-zinc-500 border-white/20 "
                }`}
              >
                {b.label}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Animated Source Select */}
        <motion.div variants={selectVariant} className="relative">
          <label className="block text-white font-dm-mono text-[14px] leading-[150%] tracking-[-4%] font-normal mb-3 ">
            Where do you know about Panze?
          </label>
          <div className="relative">
            <motion.button
              type="button"
              onClick={() => setIsSourceOpen(!isSourceOpen)}
              whileHover={{ scale: 1.01 }}
              className={`w-full border border-white/20 px-5 py-3 text-left
    flex justify-between items-center focus:outline-none
    focus:border-primary font-dm-mono text-[14px]
    leading-[150%] tracking-[-4%] font-normal
    ${selectedSource ? "text-primary" : "text-white/40"}`}
            >
              {selectedSource || "Select a Source"}
              <motion.span
                animate={{ rotate: isSourceOpen ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <img src={dropdown.src} alt="Dropdown" />
              </motion.span>
            </motion.button>

            <AnimatePresence>
              {isSourceOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="text-primary absolute z-50 w-full mt-2  border border-white/20 rounded-2xl overflow-hidden shadow-2xl bg-[#1E1212]"
                >
                  {sources.map((source, i) => (
                    <motion.div
                      key={i}
                      whileHover={{ backgroundColor: "#27272a" }}
                      onClick={() => {
                        setSelectedSource(source);
                        setIsSourceOpen(false);
                      }}
                      className={` font-dm-mono text-[14px] leading-[150%] tracking-[-4%] font-normal px-5 py-3 cursor-pointer ${selectedSource === source ? "text-primary bg-white/20" : "text-white border-white/20"}`}
                    >
                      {source}
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Project Details */}
        <motion.div variants={selectVariant}>
          <label className="block text-white font-dm-mono text-[14px] leading-[150%] tracking-[-4%] font-normal mb-3">
            Project Details
          </label>
          <motion.textarea
            whileFocus={{ scale: 1.01 }}
            name="details"
            rows={5}
            placeholder="We’re looking for a modern and strategic SaaS website design that clearly communicates our product value, improves user engagement, and increases conversions."
            required
            className="w-full text-primary placeholder:text-white/70 border border-white/20  px-5 py-4 focus:outline-none focus:border-primary resize-y font-dm-mono text-[14px] leading-[150%] tracking-[-4%] font-normal  mb-4 "
          />
        </motion.div>

        <motion.button
          type="submit"
          disabled={status.type === "loading"}
          whileTap={{ scale: 0.98 }}
          className="relative overflow-hidden w-36.25 h-11.25 bg-primary text-white flex items-center justify-center mb-12 lg:mb-0"
          initial="rest"
          whileHover="hover"
          animate="rest"
        >
          {/* Shimmer */}
          <motion.div
            variants={{
              rest: {
                x: "-250%",
              },
              hover: {
                x: "700%",
                transition: {
                  duration: 1.5,
                  ease: "easeInOut",
                },
              },
            }}
            className="absolute top-0 left-0 h-full w-[40%] skew-x-[-20deg]  bg-linear-to-r from-transparentvia-white/60 to-transparent pointer-events-none"
          />
          {/* Border Sweep */}
          <motion.div
            variants={{
              rest: {
                scaleX: 0,
                originX: 1,
              },
              hover: {
                scaleX: 1,
                originX: 0,
                transition: {
                  duration: 0.8,
                },
              },
            }}
            className=" absolute bottom-0 left-0 h-0.5 w-full bg-white
        "
          />
          {/* content */}
          <motion.div
            variants={{
              rest: {
                scale: 1,
              },
              hover: {
                scale: 1.02,
                transition: {
                  duration: 0.3,
                },
              },
            }}
            className="relative z-10 flex items-center justify-center py-3 gap-3
        "
          >
            <span className="font-commissioner font-normal text-[14px] leading-[150%] tracking-[-4%]">
              {status.type === "loading" ? "Loading..." : "Get a quote"}
            </span>

            <motion.svg
              variants={{
                rest: {
                  x: 0,
                  y: 0,
                },
                hover: {
                  x: 5,
                  y: -2,
                  transition: {
                    duration: 0.3,
                  },
                },
              }}
              className="w-4 h-4"
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
          </motion.div>
        </motion.button>
      </motion.form>
    </div>
  );
}
