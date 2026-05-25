import { memo } from "react";
import { motion } from "framer-motion";
import { resolveImageUrl } from "../../services/api";
import Media, { isVideoUrl } from "../common/Media";

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
export default memo(function Facilities({ data }) {
  const title = data?.title || "Facilities";
  const subtitle = data?.subtitle || "";
  const description = data?.description || "";
  const facilityItems = data?.facilities || [];

  return (
    <section id="facilities" className="bg-[#F9F4E1] py-12 sm:py-14 md:py-16 text-white">

      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="text-2xl text-[#0066A6] sm:text-3xl md:text-5xl font-medium text-center md:text-left"
        >
          {title}
        </motion.h2>

        <div className="w-24 sm:w-32 h-[2px] bg-[#F68C1F] mt-3 mb-6 mx-auto md:mx-0"></div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-8 sm:mb-10 text-center md:text-left">
          <h5 className="text-xl text-[#0066A6] sm:text-2xl font-medium">
            {subtitle}
          </h5>

          <p className="text-gray-400 text-sm sm:text-base">
            {description}
          </p>
        </div>

        {/* CARDS */}
        <div className="grid grid-cols-1 xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 sm:gap-6">

          {facilityItems.map((f, i) => (
            <motion.div
              key={i}
              variants={cardVariant}
              initial="hidden"
              whileInView="visible"
              custom={i}
              viewport={{ once: true, amount: 0.1 }}
              className="bg-gray-200 text-black"
            >

              <div className="bg-yellow-600 text-center font-semibold py-2 uppercase tracking-wide text-sm sm:text-base">
                {f.name}
              </div>

              <Media
                src={resolveImageUrl(f.image)}
                alt={f.name}
                className="w-full h-48 sm:h-52 md:h-56 object-cover"
                aspectRatio="4/3"
              />

              <div className="p-4 text-xs sm:text-sm font-medium text-center">
                {f.description}
              </div>

            </motion.div>
          ))}

        </div>

      </div>

    </section>
  );
})
