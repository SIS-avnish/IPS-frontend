import { memo } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.4, delay: i * 0.07, ease: "easeOut" } }),
};



const defaultWhyChoose = [
 
];

export default memo(function About({ about, features, whyChooseData }) {
  const title = about?.title || "About";
  const content = about?.content || "";
  const featuresTitle = features?.title || "";
  const featuresSubtitle = features?.subtitle || "";
  const featureItems = features?.items || [];

  const whyChooseTitle = whyChooseData?.title 
  const whyChooseCards = whyChooseData?.cards || whyChooseData?.items || [];
  const whyChoose = whyChooseCards.map((item) => ({
    icon: item.icon || "✅",
    title: item.title || item.question || "",
    desc: item.description || item.desc || item.answer || "",
  }));

  const navigate = useNavigate();
const {collegeSlug} = useParams();

  return (
    <section id="about" className="py-12 sm:py-14 md:py-0">

      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-2 items-center">

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="text-center md:text-left"
        >
          <h2 className="text-[#002147] text-2xl sm:text-3xl md:text-5xl font-medium mr-5">
            {title}
          </h2>
          <div className="w-20 sm:w-44 h-[2px] bg-[#faa701] mt-3 mx-auto md:mx-0"></div>
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          custom={1}
          viewport={{ once: true, amount: 0.1 }}
          className="text-center md:text-left"
        >
          <p className="text-gray-600 text-base sm:text-lg ">
            {content}
          </p>

          <button onClick={() => navigate(`/${collegeSlug}/about`)} className="mt-5 bg-white border border-[#002147] text-black px-6 py-3  w-full sm:w-auto">
            Know More
          </button>
        </motion.div>

      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-2 items-center mt-10">

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="text-center md:text-left"
        >
          <h2 className="text-[#002147] text-2xl sm:text-3xl md:text-5xl font-medium mr-5">
            {title}
          </h2>
          <div className="w-20 sm:w-44 h-[2px] bg-[#faa701] mt-3 mx-auto md:mx-0"></div>
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          custom={1}
          viewport={{ once: true, amount: 0.1 }}
          className="text-center md:text-left"
        >
          <p className="text-gray-600 text-base sm:text-lg ">
            {content}
          </p>

          <button onClick={() => navigate(`/${collegeSlug}/about`)} className="mt-5 bg-white border border-[#002147] text-black px-6 py-3  w-full sm:w-auto">
            Know More
          </button>
        </motion.div>

      </div>

      {/* WHY CHOOSE SECTION */}
{whyChooseTitle && whyChooseCards && whyChoose && (
        <div className="bg-[#0B2C4D] mt-16 py-12 sm:py-14 md:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">

            <motion.h2
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              className="text-white text-2xl sm:text-3xl md:text-4xl font-semibold"
            >
              {whyChooseTitle}
            </motion.h2>

            <div className="w-40 h-[3px] bg-red-400 mt-3 mb-10"></div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {whyChoose.map((card, i) => (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  custom={i}
                  viewport={{ once: true, amount: 0.1 }}
                  className="border border-white/20 rounded-xl p-6 text-white bg-white/5 backdrop-blur-sm hover:bg-white/10 transition"
                >
                  <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-white/10 text-2xl mb-4">
                    {card.icon && card.icon.startsWith("http") ? (
                      <img src={card.icon} alt={card.title} className="w-8 h-8 object-contain" />
                    ) : (
                      card.icon
                    )}
                  </div>

                  <h4 className="text-lg font-semibold mb-2">
                    {card.title}
                  </h4>

                  <p className="text-white/80 text-sm leading-relaxed">
                    {card.desc}
                  </p>
                </motion.div>
              ))}
            </div>

          </div>
        </div>
      )}

      {featureItems.length > 0 && (
        <div className="bg-[#F0EEEF] mt-20 py-12 sm:py-14 md:py-16">
          <div className="max-w-6xl mx-auto px-4">

            {/* TITLE */}
            <motion.h2
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              className="text-[#0B2C4D] text-3xl md:text-4xl font-semibold"
            >
              {featuresTitle}
            </motion.h2>

            {/* UNDERLINE */}
            <div className="w-40 h-[3px] bg-red-400 mt-3 mb-6"></div>

            {/* SUBTITLE */}
            <h3 className="text-[#0B2C4D] text-xl md:text-2xl mb-6">
              {featuresSubtitle}
            </h3>

            {/* LIST */}
            <ul className="space-y-5 text-gray-800">
              {featureItems.map((item, i) => (
                <motion.li
                  key={i}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  custom={i}
                  viewport={{ once: true, amount: 0.1 }}
                  className="border-b border-gray-300 pb-4 flex gap-3"
                >
                  <span className="mt-2 w-2 h-2 bg-gray-700 rounded-full"></span>
                  <span>{item}</span>
                </motion.li>
              ))}
            </ul>

          </div>
        </div>
      )}

    </section>
  );
})
