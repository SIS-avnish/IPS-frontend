import { motion } from "framer-motion";
import onlineTeachingIcon from "../../assets/Images/online-teaching 1.svg";
import computerIcon from "../../assets/Images/computer 1.svg";
import globalIcon from "../../assets/Images/global 1.svg";
import opportunitiesIcon from "../../assets/Images/opportunities 1.svg";
import studentFallback from "../../assets/Images/student.png";
import { resolveImageUrl } from "../../services/api";

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
  {
    icon: onlineTeachingIcon,
    title: "Ecosystem For Your Growth",
    text: "From tech-led classrooms to advanced labs and studios, find a world of excellence to lead the future."
  },
  {
    icon: computerIcon,
    title: "Learn Beyond Textbooks",
    text: "Dive into industry-tailored, experiential learning to nurture your creativity with career-readiness."
  },
  {
    icon: globalIcon,
    title: "Be A Global Citizen",
    text: "Prepare for a successful career and get ready for global opportunities."
  },
  {
    icon: opportunitiesIcon,
    title: "Connect With Alumni",
    text: "Grow your network with IPS alumni all over the world."
  }
];

export default function AboutIntro({ aboutData, ecosystemData, growthImage }) {

  const title = aboutData?.title || "About IPS";
  const content = aboutData?.content ||
    "We are Central India's leading multidisciplinary institution, known for excellence in academics, infrastructure and industry connect.";

  // Use ecosystem items from the API, or fallback to defaults
  const features = ecosystemData?.items
    ? ecosystemData.items.map((item, i) => ({
      icon: iconMap[i] || iconMap[0],
      title: item.question,
      text: item.answer
    }))
    : defaultFeatures;

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

          <motion.img
            variants={slideLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            src={growthImg}
            alt={title}
            className="w-full object-cover"
          />

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

                <img src={f.icon} className="w-10 h-10 mt-1" alt={f.title} />

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
}
