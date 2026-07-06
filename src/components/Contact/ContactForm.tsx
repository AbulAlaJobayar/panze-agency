import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import dropdown from "@/assets/contact/dropdown.png"

export default function PanzeContactForm() {
  const [status, setStatus] = useState({ type: "", message: "" });
  const [selectedBudget, setSelectedBudget] = useState("$5K - $10K");
  const [isServiceOpen, setIsServiceOpen] = useState(false);
  const [isSourceOpen, setIsSourceOpen] = useState(false);

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

  const [selectedService, setSelectedService] = useState("MVP Development");
  const [selectedSource, setSelectedSource] = useState("From Google");

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
        setSelectedBudget("$5K - $10K");
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
    <div className="max-w-2xl mx-auto p-8  text-white">
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
            <label className="block text-white font-dm-mono text-[14px] leading-[150%] tracking-[-4%] font-normal mb-2  ">
              Full Name
            </label>
            <motion.input
              whileFocus={{ scale: 1.02 }}
              name="fullName"
              type="text"
              defaultValue="John Doe"
              required
              className=" w-full border-black/20 border px-5 py-3 capitalize focus:outline-none  font-dm-mono text-[14px] leading-[150%] tracking-[-4%] font-normal focus:border-primary text-primary"
            />
          </div>
          <div>
            <label className="text-white font-dm-mono text-[14px] leading-[150%] tracking-[-4%] font-normal block  mb-2">
              Email
            </label>
            <motion.input
              whileFocus={{ scale: 1.02 }}
              name="email"
              type="email"
              defaultValue="john@gmail.com"
              required
              className="w-full border-black/20 border px-5 py-3 capitalize focus:outline-none  font-dm-mono text-[14px] leading-[150%] tracking-[-4%] font-normal focus:border-orange-500 text-primary"
            />
          </div>
        </motion.div>

        {/* Animated Service Select */}
        <motion.div variants={selectVariant} className="relative">
          <label className="block text-white font-dm-mono text-[14px] leading-[150%] tracking-[-4%] font-normal mb-2 ">
            Service Required
          </label>
          <div className="relative">
            <motion.button
              type="button"
              onClick={() => setIsServiceOpen(!isServiceOpen)}
              whileHover={{ scale: 1.01 }}
              className="w-full  text-left flex justify-between items-center focus:outline-none   border-black/20 border px-5 py-3 capitalize  font-dm-mono text-[14px] leading-[150%] tracking-[-4%] font-normal focus:border-orange-500 text-primary"
            >
              {selectedService}
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
                  className="absolute z-50 w-full mt-2 bg-zinc-900 border border-black/20 rounded-2xl overflow-hidden shadow-2xl"
                >
                  {services.map((service, i) => (
                    <motion.div
                      key={i}
                      whileHover={{ backgroundColor: "#27272a" }}
                      onClick={() => {
                        setSelectedService(service);
                        setIsServiceOpen(false);
                      }}
                      className={`px-5 py-3 cursor-pointer ${selectedService === service ? "text-orange-400 bg-zinc-800" : ""}`}
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
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedBudget(b.value)}
                className={` font-dm-mono text-[14px] leading-[150%] tracking-[-4%] font-normal px-4 py-3  text-sm transition-all border duration-200 ${
                  selectedBudget === b.value
                    ? "border-primary  text-primary shadow-lg shadow-orange-500/30"
                    : " text-primary hover:border-zinc-500 border-black/20 "
                }`}
              >
                {b.label}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Animated Source Select */}
        <motion.div variants={selectVariant} className="relative">
          <label className="block text-white font-dm-mono text-[14px] leading-[150%] tracking-[-4%] font-normal mb-2 ">
            Where do you know about Panze?
          </label>
          <div className="relative">
            <motion.button
              type="button"
              onClick={() => setIsSourceOpen(!isSourceOpen)}
              whileHover={{ scale: 1.01 }}
              className="w-full  border border-black/20  px-5 py-3 text-left flex justify-between items-center focus:outline-none focus:border-primary text-primary font-dm-mono text-[14px] leading-[150%] tracking-[-4%] font-normal"
            >
              {selectedSource}
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
                  className="text-primary absolute z-50 w-full mt-2  border border-black/20 rounded-2xl overflow-hidden shadow-2xl bg-[#1E1212]"
                >
                  {sources.map((source, i) => (
                    <motion.div
                      key={i}
                      whileHover={{ backgroundColor: "#27272a" }}
                      onClick={() => {
                        setSelectedSource(source);
                        setIsSourceOpen(false);
                      }}
                      className={` font-dm-mono text-[14px] leading-[150%] tracking-[-4%] font-normal px-5 py-3 cursor-pointer ${selectedSource === source ? "text-primary bg-white/20" : "text-white border-black/20"}`}
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
          <label className="block text-white font-dm-mono text-[14px] leading-[150%] tracking-[-4%] font-normal mb-2">
            Project Details
          </label>
          <motion.textarea
            whileFocus={{ scale: 1.01 }}
            name="details"
            rows={5}
            defaultValue="We’re looking for a modern and strategic SaaS website design that clearly communicates our product value, improves user engagement, and increases conversions."
            required
            className="w-full  border border-black/20  px-5 py-4 focus:outline-none focus:border-orange-500 resize-y text-primary font-dm-mono text-[14px] leading-[150%] tracking-[-4%] font-normal"
          />
        </motion.div>

        <motion.button
          type="submit"
          disabled={status.type === "loading"}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className=" bg-primary  disabled:opacity-70 transition-all text-white  py-4  px-10  flex items-center justify-center gap-2 font-commissioner text-[14px] leading-[150%] tracking-[-4%] font-normal"
        >
          {status.type === "loading" ? (
            <>
              <span className="animate-spin inline-block w-5 h-5 border-2 border-black/20 border-t-transparent rounded-full" />
              Sending...
            </>
          ) : (
            "Get a quote"
          )}
        </motion.button>
      </motion.form>
    </div>
  );
}
