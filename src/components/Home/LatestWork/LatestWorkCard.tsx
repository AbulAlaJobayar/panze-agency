import { motion } from "framer-motion";

interface Props {
  heroImage: string;
  title: string;
  description: string;
  industry: string;
  tags: string[];
}

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 100,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {

      ease: "easeOut" as const,
      staggerChildren: 0.08,
    },
  },
};

const titleVariants = {
  hidden: {
    opacity: 0,
    y: 40,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
    },
  },
};

const tagVariants = {
  hidden: {
    opacity: 0,
    y: 15,
    scale: 0.8,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.4,
    },
  },
};

const textVariants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

export default function LatestWorkCard({
  heroImage,
  title,
  description,
  industry,
  tags,
}: Props) {
  return (
    <motion.div
      className="portfolio-card overflow-hidden"
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{
        once: false,
        amount: 0.2,
      }}
    >
      {/* Hero Image */}
      <div className="relative h-50 sm:h-87.5 lg:h-113.25 overflow-hidden">
        <motion.img
          src={heroImage}
          alt={title}
          className="absolute inset-0 w-full h-113.25 object-cover"
          initial={{
            scale: 1.1,
            opacity: 0,
          }}
          whileInView={{
            scale: 1,
            opacity: 1,
          }}
          transition={{
            duration: 1.2,
            ease: "easeOut",
          }}
          whileHover={{
            scale: 1.08,
          }}
          viewport={{ once: false }}
        />
      </div>

      {/* Content */}
      <div className="relative bg-[#221617] h-49">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: "radial-gradient(#ED7743 1px, transparent 1px)",
            backgroundSize: "10px 10px",
          }}
        />

        <div className="relative z-10 grid lg:grid-cols-2 gap-2 lg:gap-27">
          {/* Left */}
          <motion.div
            variants={titleVariants}
            className="pt-8 pr-8 md:pr-0 pl-8"
          >
            <h3
              className="
                font-commissioner
                font-semibold
                text-xl
                leading-[110%]
                tracking-[-4%]
                text-white
              "
            >
              {title}
            </h3>

            <div className="flex flex-wrap gap-3 mt-5">
              {tags.map((tag, index) => (
                <motion.span
                  key={index}
                  variants={tagVariants}
                  className="
                    px-4 py-1
                    border border-[#4A3737]
                    rounded-full
                    text-sm
                    text-white/70
                    font-dm-mono
                  "
                >
                  {tag}
                </motion.span>
              ))}
            </div>
          </motion.div>

          {/* Right */}
          <div className="my-8 ml-8 md:ml-0 mr-8 md:mr-1">
            <motion.p
              variants={textVariants}
              className="
                font-dm-mono
                text-white
                text-sm
                leading-[150%]
                tracking-[-4%]
                mb-8
              "
            >
              {description}
            </motion.p>

            <motion.p
              variants={textVariants}
              className="
                mt-8
                font-dm-mono
                text-sm
                leading-[150%]
                tracking-[-4%]
                text-white
              "
            >
              Industry:{" "}
              <span
                className="
                  text-[#ED7743]
                  font-medium
                "
              >
                {industry}
              </span>
            </motion.p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
