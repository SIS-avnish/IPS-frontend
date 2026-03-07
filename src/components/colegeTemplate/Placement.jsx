import { memo, useState } from "react";
import { motion } from "framer-motion";

import fairmontLogo from "../../assets/logos/Fairmont_Logo.svg.png";
import oberoiLogo from "../../assets/logos/oberoi.png";
import marriottLogo from "../../assets/logos/Marriott.png";
import hyattLogo from "../../assets/logos/Hyatt.png";
import tajLogo from "../../assets/logos/taj.png";
import itcLogo from "../../assets/logos/itc.png";

export default memo(function Placement() {

  const logos = [
    fairmontLogo,
    oberoiLogo,
    marriottLogo,
    hyattLogo,
    tajLogo,
    itcLogo,
  ];

  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  const testimonials = [
    {
      name: "Yamini Malviya",
      role: "IPS Academy | Alumni",
      img: "https://randomuser.me/api/portraits/men/32.jpg",
      text: "I am delighted to announce that I have been placed and this milestone wouldn't have been possible without the continuous support and encouragement from IPS College training and placement cell and the faculty members at IPS College. I am truly grateful for the guidance and learning that shaped my journey at IPSA Indore.",
    },
    {
      name: "Shreyanshi Tripathi",
      role: "IPS Academy | Alumni",
      img: "https://randomuser.me/api/portraits/women/44.jpg",
      text: "My experience at IPS Academy Indore has been very wonderful. It has been 3 years since I joined the college and I have learned a lot not just academically but in all aspects of career development. Faculty members have been supportive throughout. Their constant motivation and support enlightened me throughout this wonderful journey.",
    },
    {
      name: "Rahul Sharma",
      role: "IPS Academy | Alumni",
      img: "https://randomuser.me/api/portraits/men/55.jpg",
      text: "IPS Academy gave me the right exposure and support to grow both academically and professionally. The faculty guidance and placement cell played a huge role in shaping my career.",
    },
  ];

  const [index, setIndex] = useState(0);

  const visibleTestimonials = testimonials.slice(index, index + 2);

  const next = () => {
    if (index + 2 < testimonials.length) {
      setIndex(index + 2);
    }
  };

  const prev = () => {
    if (index - 2 >= 0) {
      setIndex(index - 2);
    }
  };

  return (
    <section className="bg-[#F0EEEF] pt-20 pb-24">

      <div className="max-w-7xl mx-auto px-4">

        {/* TITLE */}
        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-5xl font-medium text-[#002147] leading-tight"
        >
          Proven Placement Record with <br /> 500+ Recruiters
        </motion.h2>

        <div className="h-[2px] w-64 bg-[#FF7373] mt-4 mb-10" />

        {/* PLACEMENT BOX */}

        <div className="bg-[#002147] p-10 text-white">

          <h3 className="text-3xl font-semibold mb-8">
            Placement Highlights 2025-2026
          </h3>

          <div className="flex items-center gap-12 mb-10">

            <div className="flex items-center gap-3 pr-12 border-r border-white/40">
              <span className="text-5xl font-bold">1948</span>
              <span className="uppercase text-sm">
                Students Placed
              </span>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-5xl font-bold">563</span>
              <span className="uppercase text-sm">
                Companies in Closed Campus Drive
              </span>
            </div>

          </div>

          <h4 className="text-2xl font-medium mb-4">Sectors</h4>

          <div className="grid grid-cols-5 gap-y-6 text-white">

            <div className="border-b border-white/30 pb-2">
              <span className="text-3xl font-bold mr-2">14</span> PSU
            </div>

            <div className="border-b border-white/30 pb-2">
              <span className="text-3xl font-bold mr-2">81</span> CORE
            </div>

            <div className="border-b border-white/30 pb-2">
              <span className="text-3xl font-bold mr-2">74</span> MNC
            </div>

            <div className="border-b border-white/30 pb-2">
              <span className="text-3xl font-bold mr-2">15</span> BANK
            </div>

            <div className="border-b border-white/30 pb-2">
              <span className="text-3xl font-bold mr-2">32</span> NBFC
            </div>

            <div className="border-b border-white/30 pb-2">
              <span className="text-3xl font-bold mr-2">21</span> PHARMA
            </div>

            <div className="border-b border-white/30 pb-2">
              <span className="text-3xl font-bold mr-2">134</span> BLUE CHIP
            </div>

            <div className="border-b border-white/30 pb-2">
              <span className="text-3xl font-bold mr-2">115</span> IT/ITES
            </div>

            <div className="border-b border-white/30 pb-2">
              <span className="text-3xl font-bold mr-2">60</span> SERVICE INDUSTRY
            </div>

            <div className="border-b border-white/30 pb-2">
              <span className="text-3xl font-bold mr-2">17</span> CONSULTING
            </div>

          </div>

        </div>

        {/* RECRUITER LOGOS SLIDER */}

        <div className="overflow-hidden mt-14">

          <motion.div
            className="flex gap-6"
            animate={{ x: ["0%", "-100%"] }}
            transition={{
              repeat: Infinity,
              duration: 20,
              ease: "linear",
            }}
          >
            {[...logos, ...logos].map((logo, i) => (
              <div
                key={i}
                className="min-w-[160px] bg-white p-4 flex items-center justify-center"
              >
                <img
                  src={logo}
                  className="h-[70px] object-contain"
                  alt="Recruiter"
                />
              </div>
            ))}
          </motion.div>

        </div>

      </div>

      {/* TESTIMONIALS */}

      <div className="mt-24 mx-auto max-w-7xl px-4 relative">

        <h2 className="text-5xl font-medium text-[#002147]">
          Testimonials
        </h2>

        <div className="h-[2px] w-40 bg-[#002147] mt-4 mb-12" />

        {testimonials.length > 2 && (
          <>
            <button
              onClick={prev}
              disabled={index === 0}
              className="absolute left-[-30px] top-[55%] bg-[#002147] text-white w-10 h-10 rounded-full"
            >
              ‹
            </button>

            <button
              onClick={next}
              disabled={index + 2 >= testimonials.length}
              className="absolute right-[-30px] top-[55%] bg-[#002147] text-white w-10 h-10 rounded-full"
            >
              ›
            </button>
          </>
        )}

        <div className="grid md:grid-cols-2 gap-10">

          {visibleTestimonials.map((t, i) => (

            <div key={i} className="bg-white p-8 rounded-xl shadow">

              <div className="flex items-center gap-4 mb-4">

                <img
                  src={t.img}
                  className="w-14 h-14 rounded-full object-cover"
                  alt="student"
                />

                <div>
                  <h4 className="font-semibold text-[#002147]">
                    {t.name}
                  </h4>

                  <p className="text-gray-500 text-sm">
                    {t.role}
                  </p>
                </div>

              </div>

              <p className="text-gray-600 leading-relaxed">
                {t.text}
              </p>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
});