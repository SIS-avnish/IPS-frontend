import { motion } from "framer-motion";
import Group from "../../assets/Images/Group.png";
import Group96 from "../../assets/Images/Group 96.png";
import Union from "../../assets/Images/Union.png";
import Vector from "../../assets/Images/Vector.png";
import iohm from "../../assets/Images/iohm.svg";
import Vector1 from "../../assets/Images/Vector (1).png";
import { useState, memo } from "react";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, delay: i * 0.08, ease: "easeOut" }
  }),
};
export default memo(function About({ aboutData, whyData }) {

  const staticIcons = [Group, Group96, Union, Vector, Vector1, iohm];

  // Handle both 'cards' and 'items' format for dynamic data
  const items = whyData?.cards?.length
    ? whyData.cards.map((item, i) => ({
        icon: item.icon,
        title: item.title,
        desc: item.description,
      }))
    : whyData?.items?.length
    ? whyData.items.map((item, i) => ({
        icon: item.icon,
        title: item.title,
        desc: item.description,
      }))
    : [];


      const [expanded, setExpanded] = useState(null);

  const aboutTitle = aboutData?.title || "About IOHM";
  const aboutContent = aboutData?.content?.replace(/\n/g, ' ').trim() ||
    "As the hospitality sector grows into a trillion-dollar global industry, there's a rising demand for skilled professionals who can deliver world-class experiences. IPS Institute of Hotel Management stands at the forefront of this transformation, bridging the talent gap by empowering students with international-standard education, hands-on training, and global exposure. Be here to lead the future of hospitality.";
  const whyTitle = whyData?.title || "Experience, Learn, Lead: The IPS Advantage";

  return (
    <>
      {/* -------- ABOUT SECTION -------- */}
      <section id="about" className="py-12  sm:py-14 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 
                        grid grid-cols-1 md:grid-cols-2 
                        gap-8 md:gap-10 items-center">

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="text-center md:text-left"
          >
            <h2 className="text-[#002147] text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium">
              {aboutTitle}
            </h2>
            <div className="w-20 sm:w-36 md:w-44 h-[2px] bg-[#faa701] mt-3 mx-auto md:mx-0"></div>
          </motion.div>

          <motion.div
            variants={fadeUp}
            custom={1}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="text-center md:text-left"
          >
            <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
              {aboutContent}
            </p>

            
          </motion.div>

        </div>
      </section>

      {/* -------- IPS ADVANTAGE SECTION -------- */}
      <section className="bg-[#002147] py-12 sm:py-16 md:py-20 lg:py-28 mt-8 sm:mt-10 md:mt-16">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">

          <motion.h2
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium leading-tight"
          >
            {whyTitle}
          </motion.h2>

          <div className="w-24 sm:w-32 md:w-40 h-1 sm:h-[2px] bg-white mt-3 mb-8 sm:mb-12"></div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6 lg:gap-8">

            {items.map((item, i) => (
              <motion.div
                key={i}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
                className="text-white p-5 sm:p-6 border border-white/15 rounded-lg sm:rounded-xl 
                           transition duration-300 
                           hover:bg-white/5 hover:-translate-y-1 hover:border-white/30
                           flex flex-col"
              >
                {/* Icon Container - Handle both URL and imported images */}
                <div className="w-14 h-14 sm:w-16 sm:h-16 md:w-18 md:h-18 lg:w-20 lg:h-20 
                                flex items-center justify-center 
                                bg-white/10 rounded-lg mb-4 flex-shrink-0">
                  {item.icon.includes('http') || item.icon.includes('cloudinary') ? (
                    <img
                      src={item.icon}
                      alt={item.title}
                      className="w-8 h-8 sm:w-10 sm:h-10 md:w-11 md:h-11 lg:w-12 lg:h-12 object-contain"
                      loading="lazy"
                    />
                  ) : (
                    <img
                      src={item.icon}
                      alt={item.title}
                      className="w-8 h-8 sm:w-10 sm:h-10 md:w-11 md:h-11 lg:w-12 lg:h-12 object-contain"
                    />
                  )}
                </div>

                <h6 className="text-base sm:text-lg md:text-xl font-medium mb-2 leading-snug">
                  {item.title}
                </h6>

                <p className="text-white/75 text-xs sm:text-sm md:text-base leading-relaxed flex-grow">
                  {expanded === i
                    ? item.desc
                    : item.desc.length > 130
                      ? item.desc.slice(0, 130) + "..."
                      : item.desc}
                </p>

                {item.desc.length > 130 && (
                  <button
                    onClick={() => setExpanded(expanded === i ? null : i)}
                    className="mt-3 text-xs font-medium text-white underline underline-offset-2 hover:opacity-80 transition text-left"
                  >
                    {expanded === i ? "Show less" : "Know more"}
                  </button>
                )}

              </motion.div>
            ))}

          </div>
        </div>
      </section>
    </>
  );
})
