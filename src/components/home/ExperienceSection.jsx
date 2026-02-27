import { motion } from "framer-motion";
import collegeFallback from "../../assets/Images/college.JPG";
import logo360 from "../../assets/logos/360.png";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

const scaleUp = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: "easeOut" } },
};

export default function ExperienceSection({ data }) {

  const title = data?.title || "Experience IPSA with a 3600 View";
  const image = data?.images?.[0] || collegeFallback;

  // Use Cloudinary / external URL directly, or fallback to imported image
  const imageSrc = image.startsWith("http") ? image : collegeFallback;

  return (
    <section className="max-w-[1140px] mx-auto px-4">
      <div className="py-[70px] max-[991px]:py-[50px] max-[576px]:py-[30px]">


        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="text-[#002147] text-[60px] font-medium mb-3 max-[991px]:text-[48px] max-[576px]:text-[28px] max-[576px]:text-center"
        >
          {title}
        </motion.h2>
        <div className="bg-[#FF7373] w-[380px] h-[2px] mb-12 max-[576px]:w-auto max-[576px]:mx-auto max-[576px]:my-[15px]" />
        <motion.div
          variants={scaleUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="relative overflow-hidden"
        >
          <img
            src={imageSrc}
            alt={title}
            className="max-h-[568px] w-full object-cover transition-all duration-[600ms] scale-100 hover:scale-[1.01] hover:shadow-[0_12px_35px_rgba(0,0,0,0.25)]"
          />
          <img
            src={logo360}
            alt="360 view"
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          />
        </motion.div>
      </div>
    </section>
  );
}
