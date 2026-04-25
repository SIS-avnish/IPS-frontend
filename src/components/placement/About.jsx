import { memo } from "react";
import { motion } from "framer-motion";
import mentoringIcon from "../../assets/Images/mentoring.svg";
import skyscrapersIcon from "../../assets/Images/skyscrapers.svg";
import consultingIcon from "../../assets/Images/consulting.svg";
import skillIcon from "../../assets/Images/skill 1.svg";
import internshipIcon from "../../assets/Images/internship.svg";
import mechanicalIcon from "../../assets/Images/mechanical-engineering.svg";
import certificateIcon from "../../assets/Images/certificate 1.svg";

const defaultFeatures = [
  { title: "Corporate Mentoring", img: mentoringIcon },
  { title: "Industrial Visit", img: skyscrapersIcon },
  { title: "Expert Talk", img: consultingIcon },
  { title: "Soft Skills", img: skillIcon },
  { title: "Internship", img: internshipIcon },
  { title: "Industrial Training", img: mechanicalIcon },
  { title: "Industry-Linked Certifications", img: certificateIcon },
];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

const cardVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.35, delay: i * 0.06, ease: "easeOut" },
  }),
};
export default memo(function About({ data }) {
  const title = data?.title || "Where Opportunities Find You";
  const content =
    data?.content ||
    "At the Central Placement Cell, we offer comprehensive placement support that is designed to prepare our students for success; from campus life to a thriving career. Whether you're aiming for a specific industry or a particular role, our nationally recognized placement cell is committed to equipping you for success in an increasingly competitive job market.";

  // Split title into main text and last two words for underline styling
  const titleWords = title.split(" ");
  const lastTwoWords = titleWords.slice(-2).join(" ");
  const firstPart = titleWords.slice(0, -2).join(" ");

  return (
    <section className="py-10 sm:py-12 md:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-2">

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-start"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl md:text-6xl font-medium text-[#0066A6] leading-tight">
            {firstPart}
            <br />
            <span className="border-b-2 border-[#F68C1F]">
              {lastTwoWords}
            </span>
          </h2>

          <p className="text-gray-700 text-sm sm:text-base md:text-base leading-relaxed">
            {content}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 mt-8 sm:mt-10 md:mt-12">
          {defaultFeatures.map((f, i) => (
            <motion.div
              key={i}
              variants={cardVariant}
              initial="hidden"
              whileInView="visible"
              custom={i}
              viewport={{ once: true, amount: 0.1 }}
              className="border p-4 sm:p-5 md:p-6 hover:shadow-lg transition rounded bg-white text-center sm:text-left"
            >
              <img
                src={f.img}
                className="w-12 h-12 sm:w-14 sm:h-14 mb-4 sm:mb-6 mx-auto sm:mx-0"
              />
              <h3 className="text-lg sm:text-xl font-medium text-[#002147]">
                {f.title}
              </h3>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
})
