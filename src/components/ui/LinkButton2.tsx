import { motion } from "framer-motion";

interface LinkButtonProps {
  href: string;
  text: string;
  className?: string;
  id?: string;
}

export default function LinkButton({
  href,
  text,
  className = "",
  id,
}: LinkButtonProps) {
  return (
    <motion.a
      id={id}
      href={href}
      className={`
        relative overflow-hidden cursor-pointer
        w-36.25 h-11.25
        bg-primary text-white
        flex items-center justify-center
        ${className}
      `}
      initial="rest"
      whileHover="hover"
      animate="rest"
    >
      {/* Content */}
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
        className="
          relative
          z-10
          flex
          items-center
          justify-center
          py-3
          gap-3
        "
      >
        <span className="font-commissioner font-normal text-[14px] leading-[150%] tracking-[-4%]">
          {text}
        </span>

        <motion.svg
          variants={{
            rest: {
              x: 0,
              y: 0,
            },
            hover: {
              rotate: 45,
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
    </motion.a>
  );
}
