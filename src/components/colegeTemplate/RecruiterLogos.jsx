import { memo } from "react";
import { motion } from "framer-motion";
import { resolveImageUrl } from "../../services/api";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

export default memo(function RecruiterLogos({ data }) {
  const items = data?.items || [];
  if (!items.length) return null;

  return (
    <section className="py-12 sm:py-14 md:py-16 bg-[#F0EEEF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-[#002147] text-2xl sm:text-3xl md:text-5xl font-medium text-center md:text-left mb-2"
        >
          Our Recruiters
        </motion.h2>

        <div className="w-24 sm:w-32 h-[2px] bg-[#FF7373] mt-3 mb-10 mx-auto md:mx-0" />

        <div className="overflow-hidden">
          <motion.div
            className="flex gap-6"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
          >
            {[...items, ...items].map((item, i) => (
              <div
                key={i}
                className="min-w-[160px] sm:min-w-[180px] bg-white p-2 rounded-lg flex items-center justify-center shadow-sm flex-shrink-0"
              >
                <img
                  src={resolveImageUrl(item.logo)}
                  className="h-[130px] sm:h-[90px] object-contain"
                  alt={item.name || "Recruiter"}
                  loading="lazy"
                />
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
});
