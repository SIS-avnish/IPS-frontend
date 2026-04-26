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

export default memo(function VisionInfra({ data }) {

  const items = data?.items || [];
  const visionItem = items.find((i) => i.question === "Vision");
  const missionItem = items.find((i) => i.question === "Mission");

  const visionTitle = visionItem?.question || "Vision";
  const visionText = visionItem?.answer ||
    "IPS Academy aims to be one of the premier institutions of the country, dedicated to the creation, application, dissemination of knowledge, skills, spirit of competitive excellence, building up generations of global citizens and value driven professionals for the corporate world and the society.";

  const missionTitle = missionItem?.question || "Mission";
  const missionText = missionItem?.answer ||
    "To create professional manpower of the highest order for meeting the current and future demands of the industry and society. To nurture entrepreneurship capabilities amongst the students enabling them to be job providers instead of job seekers. To foster research and development culture in close interaction with the industry, promoting synergistic partnership with the industry, scientific world and society.";

  return (
    <section className="bg-[#F9F4E1] py-16 text-white">

      <div className="max-w-7xl mx-auto px-3">

        {/* Vision */}
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <motion.div
            variants={slideLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="flex justify-center items-center"
          >
            <img src={visionIcon} className="mx-auto md:mx-0" alt="Vision" />
          </motion.div>

          <motion.div
            variants={slideRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            <h2 className="text-4xl md:text-[60px] text-[#0066A6] font-medium mb-4 text-center sm:text-left">
              {visionTitle}
            </h2>

            <p className="text-black text-xl wrap leading-relaxed">
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
            <h2 className="text-4xl md:text-[60px] text-[#0066A6] font-medium mb-4 text-center sm:text-left">
              {missionTitle}
            </h2>

            <div className="text-black space-y-2">
  {missionText.split("\n").map((point, index) => (
    <p key={index} className="text-xl leading-relaxed">
      {point.trim()}
    </p>
  ))}
</div>
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

        {/* ---------------- Infrastructure Section ---------------- */}

        {/* <div className="mt-20 grid md:grid-cols-2 gap-10 items-start">

          <div>
            <h2 className="text-[#002147] text-4xl md:text-[56px] font-medium leading-tight">
              An infrastructure designed to make your ideas happen
            </h2>

            <div className="w-32 h-[3px] bg-red-500 mt-4"></div>
          </div>

          <p className="text-gray-600">
            Bring your ideas and make them successful growth stories at the IPS
            Academy Incubation Centre. Our multidisciplinary hub brings together
            students, faculty, and alumni from all departments to build
            solutions that matter.
          </p>

        </div>

       

        <div className="grid md:grid-cols-2 gap-6 mt-10">

          <div className="bg-[#22A9D3] p-8 text-[#002147]">
            <h3 className="text-2xl font-medium mb-3">
              Vibrant Entrepreneurial Ecosystem
            </h3>

            <p>
              The Incubation Centre reflects IPS Academy's commitment to
              holistic, future-oriented education - shaping graduates who think
              boldly, act responsibly and create meaningful impact.
            </p>
          </div>

          <div className="bg-[#F36C6C] p-8 text-[#002147]">
            <h3 className="text-2xl font-medium mb-3">
              A Collaboration Across Disciplines
            </h3>

            <p>
              Diverse minds from multiple disciplines and skillsets come
              together to build bold, relevant and real-world-ready ventures at
              the IPSA Incubation Centre.
            </p>
          </div>

        </div> */}

      </div>

    </section>
  );
});