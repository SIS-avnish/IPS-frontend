import { memo } from "react";
import { motion } from "framer-motion";
import onlineTeachingIcon from "../../assets/Images/online-teaching 1.svg";
import computerIcon from "../../assets/Images/computer 1.svg";
import globalIcon from "../../assets/Images/global 1.svg";
import opportunitiesIcon from "../../assets/Images/opportunities 1.svg";
import studentFallback from "../../assets/Images/student.png";
import { resolveImageUrl } from "../../services/api";
import Media from "../common/Media";

// Map icons by index (matches the order returned by the API)
const iconMap = [onlineTeachingIcon, computerIcon, globalIcon, opportunitiesIcon];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

const slideLeft = {
  hidden: { opacity: 0, x: -30 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.45, ease: "easeOut" } },
};

const slideRight = {
  hidden: { opacity: 0, x: 30 },
  visible: (i = 0) => ({ opacity: 1, x: 0, transition: { duration: 0.4, delay: i * 0.07, ease: "easeOut" } }),
};

const defaultFeatures = [
 
];

export default memo(function AboutIntro({ aboutData, ecosystemData, growthImage }) {

  const title = aboutData?.title || "About IPS";
  const content = aboutData?.content ||
    "We are Central India's leading multidisciplinary institution, known for excellence in academics, infrastructure and industry connect.";

  // Use ecosystem items from the API, or fallback to defaults
  const features = ecosystemData?.cards
    ? ecosystemData.cards.map((item, i) => ({
      icon: item.icon ,
      title: item.title,
      text: item.description
    }))
    : (defaultFeatures);

  // Growth image from the API gallery section
  const growthImg = growthImage?.images?.[0]
    ? resolveImageUrl(growthImage.images[0])
    : studentFallback;

  return (
    <section className="py-[50px] sm:py-[120px]">

      <div className="max-w-6xl mx-auto px-3">

        {/* title */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid md:grid-cols-2 gap-8 pb-5"
        >
          <div>
            <h2 className="text-[60px] font-medium text-[#002147] text-center sm:text-left" >{title}</h2>
          <div class="h-[2px] w-60 bg-[#FF7373] mx-auto sm:mx-0"></div>
          </div>

          <p className="text-gray-700 text-center sm:text-left">
            {content}
          </p>
        </motion.div>

        {/* feature section */}
        <div className="grid md:grid-cols-2 gap-14 mt-10 items-start">

          <motion.div
            variants={slideLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            <Media
              src={growthImg}
              alt={title}
              className="w-full mt-10 lg:mt-30 object-cover"
            />
          </motion.div>

          <div>
            {features.map((f, i) => (
              <div key={i} className="flex gap-6 py-6 border-b last:border-0">

                <motion.div
                  variants={slideRight}
                  initial="hidden"
                  whileInView="visible"
                  custom={i}
                  viewport={{ once: true, amount: 0.1 }}
                  className="flex gap-6 w-full"
                >

                <img
  src={f.icon}
  alt={f.title}
  className="w-16 h-12 sm:w-20 sm:h-14 md:w-24 md:h-16 lg:w-28 lg:h-18 xl:w-30 xl:h-20 mt-1 object-contain"
/>

                <div>
                  <h6 className="text-xl font-medium text-[#002147]">{f.title}</h6>
                  <p className="text-gray-600 mt-1">{f.text}</p>
                </div>

                </motion.div>
              </div>
            ))}
          </div>

        </div>

      </div>

    </section>
  );
})
