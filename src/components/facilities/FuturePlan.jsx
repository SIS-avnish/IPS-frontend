import { memo } from "react";
import { motion } from "framer-motion";
import { resolveImageUrl } from "../../services/api";
import Media from "../common/Media";

export default memo(function FuturePlan({ data }) {
  if (!data) return null;

  const nccImage = resolveImageUrl(data.image);

  // First 10 items are icon-based features, rest are initiatives
  const allItems = data.items || [];
  const iconItems = allItems.slice(0, 10).map((text) => ({ text }));
  const initiatives = allItems.slice(11); // skip "Lead Change..." heading item
  const leadChangeHeading = allItems[10] || "Lead Change – One Initiative At a Time";

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
    visible: { opacity: 1, x: 0, transition: { duration: 0.45, ease: "easeOut" } },
  };

  const cardVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1, y: 0,
      transition: { duration: 0.4, delay: i * 0.06, ease: "easeOut" },
    }),
  };

  return (
    <section className="bg-[#F0EEEF] py-12 sm:py-10 xs:py-8">

      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-5">

        <div className="grid lg:grid-cols-2 gap-8 sm:gap-10 items-start">

          {/* LEFT */}
          <motion.div
            variants={slideLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >

            {/* badge */}
            <div className="bg-[#0CC2FE] text-[#002147] px-4 py-1 text-2xl sm:text-xl text-lg w-fit mb-2 text-medium">
              {data.tag || "NCC"}
            </div>

            {/* title */}
            <h2 className="text-2xl sm:text-6xl text-xl font-medium text-[#002147]">
              {data.title}
            </h2>

            <div className="w-24 h-[2px] bg-[#002147] mt-2"></div>

            {/* image */}
            <Media
              src={nccImage}
              className="pt-12 sm:pt-8 w-full"
            />

          </motion.div>

          {/* RIGHT */}
          <motion.div
            variants={slideRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="lg:pl-5"
          >

            <p className="text-[#3A3A3A] mb-4 text-base sm:text-[15px] leading-relaxed">
              {data.description}
            </p>

            {/* ICON GRID */}
            <div className="grid md:grid-cols-2 grid-cols-1 gap-y-6 gap-x-6 my-6">

              {iconItems.map((item, i) => (
                <motion.div
                  key={i}
                  variants={cardVariant}
                  initial="hidden"
                  whileInView="visible"
                  custom={i}
                  viewport={{ once: true, amount: 0.1 }}
                  className="flex gap-3 items-center"
                >
                  <img src={resolveImageUrl(item.img)} className="shrink-0" />
                  <span className="text-[#3A3A3A] text-[16px] sm:text-[15px] font-medium">
                    {item.text}
                  </span>
                </motion.div>
              ))}

            </div>

            {/* subtitle */}
            <h3 className="text-[32px] sm:text-[26px] text-[22px] text-[#002147] font-medium mb-6 sm:mb-4">
              {leadChangeHeading}
            </h3>

            {/* list */}
            <ul>
              {initiatives.map((item, i) => (
                <li key={i} className="mb-5 sm:mb-4 text-[#3A3A3A] text-base sm:text-[15px] leading-relaxed">
                  {item}
                </li>
              ))}
            </ul>

          </motion.div>

        </div>

      </div>
    </section>
  );
})
