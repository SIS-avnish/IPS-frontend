import { useState } from "react";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

const slideLeft = {
  hidden: { opacity: 0, x: -30 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.45, ease: "easeOut" } },
};

const slideRight = {
  hidden: { opacity: 0, x: 30 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.45, ease: "easeOut", delay: 0.1 } },
};

export default function WhyIPSA({ data }) {
  const [expanded, setExpanded] = useState(false);

  const title = data?.title || "Why IPSA";
  const text = data?.content || "";

  return (
    <section className="max-w-[1140px] mx-auto px-4 py-20 sm:py-30 mb-10">
      <div className="grid grid-cols-12 gap-x-6">
        {/* Left column - col-12 col-md-6 col-lg-4 */}
        <motion.div
          variants={slideLeft}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="col-span-12 md:col-span-6 lg:col-span-4"
        >
          <div className="flex flex-col max-[576px]:items-center">
            <h2 className="text-[60px] font-medium text-[#002147] max-[576px]:text-[32px]">
              {title}
            </h2>
            <div className="w-[168px] h-[2px] bg-[#FF7373] mb-5" />
          </div>
        </motion.div>

        {/* Right column - col-12 col-md-6 col-lg-8 */}
        <motion.div
          variants={slideRight}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="col-span-12 md:col-span-6 lg:col-span-8"
        >
          <div className="flex flex-col max-[576px]:items-center">
            <p
              className={`text-[16px] font-normal text-[#605654] mb-1! leading-[1.8] transition-all duration-300 max-[576px]:text-center ${
                expanded ? "" : "line-clamp-2"
              }`}
            >
              {text}
            </p>
            <button
              onClick={() => setExpanded(!expanded)}
              className="bg-transparent border-none p-0 font-medium text-[#FF7373] cursor-pointer text-left underline"
            >
              {expanded ? "Read Less" : "Read More"}
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
