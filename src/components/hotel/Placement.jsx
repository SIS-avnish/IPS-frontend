import { memo, useRef, useEffect } from "react";
import { motion, useMotionValue, animate } from "framer-motion";
import Media from "../common/Media";

import fairmont from "../../assets/logos/Fairmont_Logo.svg.png";
import oberoi from "../../assets/logos/oberoi.png";
import marriott from "../../assets/logos/Marriott.png";
import hyatt from "../../assets/logos/Hyatt.png";
import taj from "../../assets/logos/taj.png";
import itc from "../../assets/logos/itc.png";

const fallbackLogos = [fairmont, oberoi, marriott, hyatt, taj, itc];

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.08 }
  })
};

const Placement = memo(({ data, recruitersData }) => {

  const title = data?.title || "Are you next?";
  const description = data?.description?.replace(/\n/g, ' ').trim() ||
    "At IOHM, you don't just join a course—you join a legacy of excellence, where preparation meets exceptional placement success. Backed by placement support, guidance, networking opportunities and shaped by industry exposure, our students are being chosen by leading recruitment partners.";
  const bulletItems = data?.items || [];
  const placementImage = data?.image || null;

  // Use API recruiters logos if available, otherwise fall back to static imports
  const recruiterLogos = recruitersData?.items?.length
    ? recruitersData.items.map(item => item.logo)
    : fallbackLogos;

  const logoTrackRef = useRef(null);
  const x = useMotionValue(0);

  useEffect(() => {
    if (!logoTrackRef.current || recruiterLogos.length === 0) return;
    const el = logoTrackRef.current;
    const halfWidth = el.scrollWidth / 2;

    const controls = animate(x, -halfWidth, {
      ease: "linear",
      duration: recruiterLogos.length * 3,
      repeat: Infinity,
      repeatType: "loop",
      repeatDelay: 0,
    });

    return () => controls.stop();
  }, [recruiterLogos, x]);

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
            <h2 className="text-[#0c2946] text-3xl lg:mt-30 sm:text-4xl md:text-5xl font-semibold leading-tight">
             {title}
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
            <p className="text-gray-800 leading-relaxed">
              {description} 
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

        {/* LOGO AUTO-SCROLL */}
        <div className="mt-12 md:mt-16 overflow-hidden">
          <motion.div
            ref={logoTrackRef}
            style={{ x }}
            className="flex gap-4 sm:gap-5 md:gap-6 w-max"
          >
            {[...recruiterLogos, ...recruiterLogos].map((logo, i) => (
              <div
                key={i}
                className="bg-white border border-gray-200 
                           h-[70px] sm:h-[80px] 
                           min-w-[140px] sm:min-w-[160px]
                           flex items-center justify-center 
                           px-4 sm:px-6
                           transition-transform duration-300
                           hover:scale-105"
              >
                <Media
                  src={logo}
                  alt="recruiter"
                  className="max-h-[32px] sm:max-h-[40px] object-contain opacity-90 hover:opacity-100 transition"
                />
              </div>
            ))}
          </motion.div>
        </div>

      </div>
    </section>
  );
});
export default Placement;