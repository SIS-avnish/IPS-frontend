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

  const items = whyData?.items?.length
    ? whyData.items.map((item, i) => ({
        icon: staticIcons[i % staticIcons.length],
        title: item.question,
        desc: item.answer,
      }))
    : [
        {
          icon: Group,
          title: "State-of-the-Art Facilities",
          desc: "With fully equipped kitchens, training restaurants and labs, students receive hands-on exposure to real-world hospitality operations."
        },
        {
          icon: Group96,
          title: "Industry-focused Curriculum",
          desc: "Practical training through mock hotel setups, industry internships and exposure to top hospitality brands."
        },
        {
          icon: Union,
          title: "Experienced Faculty",
          desc: "Learn from industry professionals with years of experience in hospitality, culinary arts and tourism."
        },
        {
          icon: Vector,
          title: "Global Exposure",
          desc: "Deep understanding of international cuisine, luxury hotels, event planning and more, preparing them for the global hospitality market"
        },
        {
          icon: Vector1,
          title: "Comprehensive Training",
          desc: "Specialisations in culinary arts, event management, front office operations and hospitality marketing, ensuring students are well-rounded professionals."
        },
        {
          icon: iohm,
          title: "Career-Focused Learning",
          desc: "Programs emphasise professional grooming, communication skills and industry readiness for hospitality careers."
        }
      ];

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
      <section className="bg-[#002147] py-12 md:py-26 mt-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">

          <motion.h2
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium"
          >
            {whyTitle}
          </motion.h2>

          <div className="w-28 sm:w-36 md:w-40 h-[2px] bg-white mt-3 mb-10"></div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">

            {items.map((item, i) => (
              <motion.div
                key={i}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
                className="text-white p-6 border border-white/15 rounded-xl 
                           transition duration-300 
                           hover:bg-white/5 hover:-translate-y-1"
              >
                {/* PNG Icon */}
                <div className="w-16 h-16 sm:w-18 sm:h-18 md:w-20 md:h-20 
                                flex items-center justify-center 
                                bg-white/10 rounded-lg mb-4">
                  <img
                    src={item.icon}
                    alt={item.title}
                    className="w-10 h-10 md:w-12 md:h-12 object-contain"
                  />
                </div>

                <h6 className="text-lg sm:text-xl font-medium mb-1">
                  {item.title}
                </h6>

                <p className="text-white/75 text-sm leading-relaxed">
  {expanded === i
    ? item.desc
    : item.desc.length > 140
      ? item.desc.slice(0, 140) + "..."
      : item.desc}
</p>

{item.desc.length > 140 && (
  <button
    onClick={() => setExpanded(expanded === i ? null : i)}
    className="mt-3 text-xs font-medium text-white underline underline-offset-4 hover:opacity-80"
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
