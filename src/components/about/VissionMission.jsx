import { memo } from "react";
import { motion } from "framer-motion";
import visionIcon from "../../assets/Images/vision.svg";
import missionIcon from "../../assets/Images/mission.svg";

const slideLeft = {
  hidden: { opacity: 0, x: -30 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.45, ease: "easeOut" } },
};

const slideRight = {
  hidden: { opacity: 0, x: 30 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.45, ease: "easeOut" } },
};
export default memo(function VisionMission({ data }) {

  const items = data?.items || [];

  // Find vision and mission from the API items array
  const vision = items.find((item) => item.question?.toLowerCase() === "vision");
  const mission = items.find((item) => item.question?.toLowerCase() === "mission");

  const visionTitle = vision?.question || "Vision";
  const visionText = vision?.answer ||
    "IPS Academy aims to be one of the premier institutions of the country, dedicated to creation and dissemination of knowledge and global citizens.";

  const missionTitle = mission?.question || "Mission";
  const missionText = mission?.answer ||
    "To create professional manpower of the highest order and nurture entrepreneurship capabilities amongst students.";

  return (
    <section className="bg-[#f0eeef] py-16 text-white">

      <div className="max-w-6xl mx-auto px-3">

        {/* Vision */}
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <motion.div
            variants={slideLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="flex justify-center items-center"
          >
          <img src={visionIcon} className="mx-auto md:mx-0 " alt="Vision" />
          </motion.div>

          <motion.div
            variants={slideRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            <h2 className="text-4xl md:text-[60px] text-[#002147] font-medium mb-4 text-center sm:text-left">
              {visionTitle}
            </h2>

            <p className="text-black">
              {visionText}
            </p>
          </motion.div>

        </div>

        <div className="h-[2px] bg-gray-200 my-10" />

        {/* Mission */}
        <div className="grid md:grid-cols-2 gap-10 items-center">

          <motion.div
            variants={slideRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="order-2 md:order-1"
          >
            <h2 className="text-4xl md:text-[60px] text-[#002147] font-medium mb-4 text-center sm:text-left">
              {missionTitle}
            </h2>

            <p className="text-black">
              {missionText}
            </p>
          </motion.div>

          <motion.img
            variants={slideLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            src={missionIcon}
            alt="Mission"
            className="order-1 md:order-2 mx-auto md:ml-auto h-24"
          />

        </div>

      </div>

    </section>
  );
})
