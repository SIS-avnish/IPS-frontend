import { memo } from "react";
import { motion } from "framer-motion";
import fairmontLogo from "../../assets/logos/Fairmont_Logo.svg.png";
import oberoiLogo from "../../assets/logos/oberoi.png";
import marriottLogo from "../../assets/logos/Marriott.png";
import hyattLogo from "../../assets/logos/Hyatt.png";
import tajLogo from "../../assets/logos/taj.png";
import itcLogo from "../../assets/logos/itc.png";

export default memo(function Recruiters({ highlights, courseStats }) {

  const logos = [
    fairmontLogo,
    oberoiLogo,
    marriottLogo,
    hyattLogo,
    tajLogo,
    itcLogo,
  ];

  const sectors1 = [
    { num: 14, name: "PSU" },
    { num: 81, name: "Core" },
    { num: 74, name: "MNC" },
    { num: 15, name: "Bank" },
    { num: 32, name: "NBFC" },
  ];

  const sectors2 = [
    { num: 21, name: "PHARMA" },
    { num: 134, name: "Blue Chip" },
    { num: 115, name: "IT/ITES" },
    { num: 60, name: "Service Industry" },
    { num: 17, name: "Consulting" },
  ];

  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
  };

  const cardVariant = {
    hidden: { opacity: 0, y: 15 },
    visible: (i) => ({
      opacity: 1, y: 0,
      transition: { duration: 0.35, delay: i * 0.06, ease: "easeOut" },
    }),
  };

  return (
    <section className="bg-[#F0EEEF] pt-16 sm:pt-20 md:pt-38 pb-16 sm:pb-20 md:pb-24">

      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* TITLE */}
        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium text-[#002147] leading-tight"
        >
          Proven Placement Record with <br /> 500+ Recruiters
        </motion.h2>

        <div className="h-[2px] w-40 sm:w-56 md:w-64 bg-[#FF7373] mt-3 sm:mt-4 mb-8 sm:mb-10" />

        {/* LOGO GRID */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">

          {logos.map((logo, i) => (
            <motion.div
              key={i}
              variants={cardVariant}
              initial="hidden"
              whileInView="visible"
              custom={i}
              viewport={{ once: true, amount: 0.1 }}
              className="bg-white p-1 sm:p-1 border border-[#F0EEEF] flex items-center justify-center"
            >
              <img
                src={logo}
                alt="Recruiter"
                className="h-[90px] sm:h-[60px] md:h-[72px] w-full object-contain"
              />
            </motion.div>
          ))}

        </div>


        {/* PLACEMENT HIGHLIGHTS */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="bg-[#002147] mt-10 sm:mt-12 md:mt-14 p-6 sm:p-8 md:p-12"
        >

          {/* TOP ROW */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start lg:items-center">

            <div className="text-[#fff] text-2xl sm:text-3xl md:text-4xl font-medium leading-tight">
              {highlights?.title || "Placement Highlights 2024-2025"}
            </div>

            {highlights?.subtitle && (
              <p className="text-[#fff] font-medium text-sm sm:text-base">
                {highlights.subtitle}
              </p>
            )}

          </div>

          {/* HIGHLIGHTS LIST */}
          {highlights?.items?.length > 0 && (
            <div className="mt-8 sm:mt-10">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 sm:gap-y-4">
                {highlights.items.map((item, i) => (
                  <div key={i} className="border-b border-[#fff] font-medium text-[#fff] text-sm sm:text-base pb-2">
                    {item}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* COURSE-WISE STATS */}
          {courseStats?.stats?.length > 0 && (
            <div className="mt-8 sm:mt-10 display-inline-block ">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-y-3 sm:gap-y-4">
                {courseStats.stats.map((s, i) => (
                  <div key={i} className="border-b border-[#fff] font-medium text-[#fff] text-sm sm:text-base">
                    <span className="text-xl sm:text-2xl md:text-3xl mr-1">{s.value}</span> {s.label.replace(/Total No\. of Students Who are Placed\s*/i, "")}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SECTORS (fallback when no API data) */}
          {!highlights?.items?.length && !courseStats?.stats?.length && (
            <>
              <div className="flex flex-col sm:flex-row flex-wrap items-start sm:items-center gap-6 sm:gap-8 mt-6">

                <div className="flex items-center gap-3">
                  <div className="text-3xl sm:text-4xl md:text-5xl font-medium text-[#fff]">
                    1904
                  </div>
                  <div className="text-[#fff] font-medium text-sm sm:text-base">
                    Students Placed
                  </div>
                </div>

                <div className="hidden md:block w-[1px] h-14 bg-white" />

                <div className="flex items-center gap-3">
                  <div className="text-3xl sm:text-4xl md:text-5xl font-medium text-[#fff]">
                    563
                  </div>
                  <div className="text-[#fff] font-medium leading-tight text-sm sm:text-base">
                    Companies in <br /> Closed Campus Drive
                  </div>
                </div>

              </div>

              <div className="mt-8 sm:mt-10">

                <div className="text-xl sm:text-2xl md:text-3xl font-medium text-[#fff] mb-4 sm:mb-6">
                  Sectors
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-y-3 sm:gap-y-4">
                  {sectors1.map((s, i) => (
                    <div key={i} className="border-b border-[#ffff] font-medium text-[#ffff] text-sm sm:text-base">
                      <span className="text-xl sm:text-2xl md:text-3xl mr-1">{s.num}</span> {s.name}
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-y-3 sm:gap-y-4 mt-3 sm:mt-4">
                  {sectors2.map((s, i) => (
                    <div key={i} className="border-b border-[#fff] font-medium text-[#fff] text-sm sm:text-base">
                      <span className="text-xl sm:text-2xl md:text-3xl mr-1">{s.num}</span> {s.name}
                    </div>
                  ))}
                </div>

              </div>
            </>
          )}

        </motion.div>

      </div>

    </section>
  );
})
