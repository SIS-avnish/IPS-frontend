import React from 'react'
import { motion } from "framer-motion";
import { resolveImageUrl } from "../../services/api";
import { memo } from "react";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

const cardVariant = {
  hidden: { opacity: 0, y: 15 },
  visible: (i) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.35, delay: i * 0.06, ease: "easeOut" },
  }),
};
export default memo(function HostelFeatures({ intro, services }) {
  if (!intro && !services) return null;

  const features = (services?.items || []).map((item) => ({
    icon: resolveImageUrl(item.logo),
    title: item.name,
  }));

  return (
    <section className="py-12 sm:py-10 xs:py-8 mt-10">

      <div className="max-w-7xl mx-auto px-4 sm:px-5">

        {/* heading */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid md:grid-cols-2 gap-6 sm:gap-8"
        >

          <div>
            <div className="bg-[#0CC2FE] font-medium text-[#002147] px-4 py-1 text-3xl sm:text-xl text-lg w-fit mb-2">
              Hostel
            </div>

            <h2 className="text-4xl sm:text-6xl text-2xl font-medium text-[#002147] ">
              {intro?.title || "Discover a Home Away from Home"}
            </h2>

            <div className="w-44 h-[2px] bg-[#fcb001] mt-1"></div>
          </div>

          <p className="text-[#3A3A3A] text-base sm:text-[15px] mt-0 lg:mt-10 leading-relaxed">
            {intro?.content || ""}
          </p>

        </motion.div>

        {/* grid */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 pt-[70px] sm:pt-[50px] pt-[40px] pb-[50px] sm:pb-[40px] gap-y-8">

          {features.map((f, i) => (
            <motion.div
              key={i}
              variants={cardVariant}
              initial="hidden"
              whileInView="visible"
              custom={i}
              viewport={{ once: true, amount: 0.1 }}
              className="border-b border-[#D7D7D7] sm:border-b-0 md:border-b-0 md:border-r md:border-[#D7D7D7] p-6 sm:p-5 text-center md:text-left"
            >
              <img
                src={f.icon}
                className="w-[45px] h-[45px] sm:w-[40px] sm:h-[40px] mb-3 sm:mb-3 mx-auto md:mx-0 bg-none"
              />
              <div className="sm:mx-auto text-[24px] sm:text-[20px] text-[18px] md:mx-auto font-medium text-[#002147] leading-6">
                {f.title}
              </div>
            </motion.div>
          ))}

        </div>

      </div>
    </section>
  );
})
