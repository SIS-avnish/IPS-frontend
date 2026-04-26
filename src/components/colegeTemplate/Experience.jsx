import { memo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBriefcase,
  faBookOpen,
  faChartLine,
  faUsers,
  faBuildingColumns,
  faSitemap
} from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";

const fallbackIcons = [
  faBriefcase,
  faChartLine,
  faBookOpen,
  faUsers,
  faBuildingColumns,
  faSitemap
];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

const cardVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, delay: i * 0.06, ease: "easeOut" },
  }),
};

export default memo(function Experience({ data }) {

  const rawTitle = data?.title || "Experience, Learn, Lead: The IBMR Advantage";

  // comma based split
  const titleParts = rawTitle.split(",");
  const firstTitle = titleParts[0];
  const secondTitle = titleParts.slice(1).join(",");

  const cards = data?.cards 


  return (
    <section className="bg-[#0066A6] py-12 sm:py-14 md:pb-16 text-white mt-[-20px]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* Title Section */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="text-center md:text-left mb-8"
        >

          <h2 className="text-2xl sm:text-3xl md:text-5xl font-medium mb-2">
            {firstTitle}
          </h2>

          {/* red underline only for first title */}
          <div className="w-24 sm:w-32 h-[2px] bg-red-500 mb-4 mx-auto md:mx-0"></div>

          {secondTitle && (
            <h3 className="text-lg sm:text-xl md:text-3xl font-medium">
              {secondTitle}
            </h3>
          )}

        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {cards.map((card, idx) => (
            <motion.div
              key={idx}
              variants={cardVariant}
              initial="hidden"
              whileInView="visible"
              custom={idx}
              viewport={{ once: true, amount: 0.1 }}
              className="
                border border-white/20 rounded-xl 
                p-6 bg-white/[0.02]
                hover:bg-white/[0.08]
                hover:-translate-y-2
                transition-all duration-300 ease-out
                text-center sm:text-left
                group
              "
            >
              <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-white/10 mb-4 mx-auto sm:mx-0 group-hover:bg-white/20 transition">
                <img src={card.icon} alt={card.title} className="w-full h-full object-contain" />
              </div>

              <h6 className="text-lg sm:text-xl font-medium mb-2">
                {card.title}
              </h6>

              <p className="text-white/70 text-sm sm:text-base">
                {card.description}
              </p>

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
});
