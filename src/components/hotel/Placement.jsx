import React, { memo } from "react";
import { motion } from "framer-motion";
import Media from "../common/Media";

import fairmont from "../../assets/logos/Fairmont_Logo.svg.png";
import oberoi from "../../assets/logos/oberoi.png";
import marriott from "../../assets/logos/Marriott.png";
import hyatt from "../../assets/logos/Hyatt.png";
import taj from "../../assets/logos/taj.png";
import itc from "../../assets/logos/itc.png";

const logos = [fairmont, oberoi, marriott, hyatt, taj, itc];

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.08 }
  })
};

const Placement = memo(({ data }) => {

  const title = data?.title || "Are you next?";
  const description = data?.description?.replace(/\n/g, ' ').trim() ||
    "At IOHM, you don't just join a course—you join a legacy of excellence, where preparation meets exceptional placement success. Backed by placement support, guidance, networking opportunities and shaped by industry exposure, our students are being chosen by leading recruitment partners.";
  const bulletItems = data?.items || [];
  const placementImage = data?.image || null;

  return (
    <section className="bg-[#ffffff] pt-20 sm:pt-28 md:pt-32 lg:pt-40 pb-16 md:pb-20">
      <div className="max-w-[1300px] mx-auto px-4 sm:px-6 md:px-10 lg:px-12">

        {/* TOP ROW */}
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-start text-center md:text-left">

          {/* LEFT TITLE */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h2 className="text-[#0c2946] text-3xl sm:text-4xl md:text-5xl font-semibold leading-tight">
              Placements and <br /> Recruitments
            </h2>

            <div className="w-20 sm:w-24 h-[3px] bg-[#e45b5b] mt-5 md:mt-6 mx-auto md:mx-0"></div>
          </motion.div>

          {/* RIGHT TEXT */}
          <motion.div
            className="max-w-xl mx-auto md:mx-0"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={1}
          >
            <p className="text-gray-600 leading-relaxed">
              {description} <span className="font-semibold text-[#0c2946]">{title}</span>
            </p>

            {bulletItems.length > 0 && (
              <ul className="mt-4 space-y-2">
                {bulletItems.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-gray-600">
                    <span className="text-[#e45b5b] mt-1">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            )}
          </motion.div>

        </div>

        {/* PLACEMENT IMAGE */}
        {placementImage && (
          <motion.div
            className="mt-10 md:mt-14"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={1}
          >
            <Media
              src={placementImage}
              alt="Placement"
              className="w-full h-[300px] sm:h-[380px] md:h-[450px] object-cover rounded-md"
            />
          </motion.div>
        )}

        {/* LOGO GRID */}
        <motion.div
          className="mt-12 md:mt-16 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-5 md:gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {logos.map((logo, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              custom={i + 2}
              className="bg-white border border-gray-200 
                         h-[70px] sm:h-[80px] 
                         flex items-center justify-center 
                         px-4 sm:px-6
                         transition-transform duration-300
                         hover:scale-105"
            >
              <img
                src={logo}
                alt="recruiter"
                className="max-h-[32px] sm:max-h-[40px] object-contain opacity-90 hover:opacity-100 transition"
              />
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
});
export default Placement;