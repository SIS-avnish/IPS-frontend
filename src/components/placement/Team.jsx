import { useState, useEffect, memo } from "react";
import { motion } from "framer-motion";
import { resolveImageUrl } from "../../services/api";
import Media from "../common/Media";

import rajeev from "../../assets/Images/Rajeev-Shukla.webp";
import nihit from "../../assets/Images/Nihit Agrawal.png";
import rajani from "../../assets/Images/Rajani-Sharma.webp";
import pratik from "../../assets/Images/Pratik-Hardiya.webp";

const defaultExperts = [
  {
    img: rajeev,
    name: "Mr. Rajeev Shukla",
    role: "Director",
    desc:
      "A senior leader with more than three decades in placements, training and corporate relations. Distinguished HR leader with strong industry network and interests in Career Coaching, Mind Power Performance and Endurance Psychology.\n\nEmail ID: director.cmg@ipsacademy.org, campus@ipsacademy.org\nContact Number: 9826040161"
  },
  {
    img: nihit,
    name: "Dr. Nihit Jaiswal",
    role: "General Manager",
    desc:
      "Ph.D. in Management, MBA Marketing, Microsoft Certified Educator with expertise in Campus Recruitment, Corporate Affairs, Talent Management and Diversity. 15+ years experience in campus placement."
  },
  {
    img: rajani,
    name: "Ms. Rajani Sharma",
    role: "Assistant General Manager",
    desc:
      "Ph.D Scholar in Computer Science, MCA from IGNOU, Microsoft Certified Technology Specialist. 24 years experience in Corporate Relations, Placements and Academia."
  },
  {
    img: pratik,
    name: "Mr. Pratik Hardiya",
    role: "Manager",
    desc:
      "MBA Marketing & Finance from DAVV. 10+ years experience in campus placements with strengths in Corporate Relations, Networking and Client Management."
  }
];

export default memo(function Team({ data }) {

  const sectionTitle = data?.title || "The Placement Team";

  const experts = data?.members?.length
    ? data.members.map((m) => ({
        img: m.image ? resolveImageUrl(m.image) : "",
        name: m.name,
        role: m.title,
        desc: m.description,
      }))
    : defaultExperts;

  const [index, setIndex] = useState(0);

  const prev = () =>
    setIndex((index - 1 + experts.length) % experts.length);

  const next = () =>
    setIndex((index + 1) % experts.length);

  // Auto-slide every 3 seconds
  useEffect(() => {
    if (experts.length <= 1) return;
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % experts.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [experts.length]);

  const expert = experts[index];

  return (
    <section className="py-12 sm:py-16 md:pt-10 mb-30 bg-white relative">

      <div className="max-w-7xl mx-auto pt-4 sm:px-6 grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-10">

        {/* LEFT TITLE */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.1 }}
          
        >
          <p className="ml-5 sm:ml-0 text-lg sm:text-lg font-medium text-[#0066A6]">
            {sectionTitle}
          </p>

          <h2 className="ml-5 sm:ml-0 text-5xl sm:text-3xl md:text-5xl font-medium text-[#0066A6] mt-2 leading-tight">
            With You at 
            <br />
            Every Step
          </h2>
 <button
            onClick={prev}
            className="absolute right-[18%] top-[25%] sm:left-[10%] sm:top-[74%] -translate-y-1/2 
                       w-8 h-8 rounded-full border border-[#0066A6] 
                       text-[#0066A6] flex items-center justify-center
                       bg-white sm:bg-transparent
                       hover:bg-[#0066A6] hover:text-white transition"
          >
            ‹
          </button>

          <button
            onClick={next}
            className="absolute right-[9%] top-[25%] sm:left-[13%] sm:top-[74%] -translate-y-1/2
                       w-8 h-8 rounded-full border border-[#0066A6] 
                       text-[#0066A6] flex items-center justify-center
                       bg-white sm:bg-transparent
                       hover:bg-[#0066A6] hover:text-white transition"
          >
            ›
          </button>
          <div className="ml-5 sm:ml-0 h-[2px] w-32 sm:w-40 bg-[#0066A6] mt-3 sm:mt-4"/>
        </motion.div>

 
        {/* RIGHT CAROUSEL */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.45, ease: "easeOut", delay: 0.1 }}
          viewport={{ once: true, amount: 0.1 }}
          className="lg:col-span-2  translate-y-0 lg:translate-y-2/5  mt-5 sm:mt-[-150px]"
        >

          <div className="bg-white shadow-[8px_8px_30px_2px_#00000026] p-4 sm:p-6">

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8 items-center">

              <Media
                src={expert.img}
                alt={expert.name}
                className="w-full aspect-square object-cover"
              />

              <div>
                <div className="text-xl sm:text-2xl font-medium text-[#0066A6]">
                  {expert.name}
                </div>

                <div className="text-[#3A3A3A] mb-2 text-sm sm:text-base">
                  {expert.role}
                </div>

                <p className="text-[#3A3A3A] whitespace-pre-line text-sm sm:text-base leading-relaxed">
                  {expert.desc}
                </p>
              </div>

            </div>

          </div>


          {/* CONTROLS */}
        

        </motion.div>

      </div>

    </section>
  );
})
