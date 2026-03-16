import { memo } from "react";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

const cardVariant = {
  hidden: { opacity: 0, y: 15 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, delay: i * 0.06, ease: "easeOut" },
  }),
};

export default memo(function StatsSection({ data }) {
  const stats = (data?.stats || []).filter(
    (s) => s.value && s.value !== "null"
  );
  if (!stats.length) return null;

  return (
    <section className="bg-[#0CC2FE] py-12 sm:py-14 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-8 text-center">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              variants={cardVariant}
              initial="hidden"
              whileInView="visible"
              custom={i}
              viewport={{ once: true, amount: 0.1 }}
              className="flex flex-col items-center"
            >
              <span className="text-3xl sm:text-4xl font-bold text-[#002147]">
                {stat.value}
              </span>
              <span className="text-sm sm:text-base mt-2 text-[#002147]/80">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
});
