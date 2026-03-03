import { memo } from "react";
import { motion } from "framer-motion";
import fairmontLogo from "../../assets/logos/Fairmont_Logo.svg.png";
import oberoiLogo from "../../assets/logos/oberoi.png";
import marriottLogo from "../../assets/logos/Marriott.png";
import hyattLogo from "../../assets/logos/Hyatt.png";
import tajLogo from "../../assets/logos/taj.png";
import itcLogo from "../../assets/logos/itc.png";

export default memo(function Recruiters({ highlights, courseStats, logos: customLogos }) {

  const logos = customLogos || [
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

          {logos.map((logo, i) => {
            const src = typeof logo === "object" && logo !== null ? logo.logo : logo;
            const alt = typeof logo === "object" && logo !== null ? (logo.name || "Recruiter") : "Recruiter";
            return (
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
                  src={src}
                  alt={alt}
                  className="h-[90px] sm:h-[60px] md:h-[72px] w-full object-contain"
                />
              </motion.div>
            );
          })}

        </div>


        {/* PLACEMENT HIGHLIGHTS */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="bg-[#002147] mt-10 sm:mt-12 md:mt-14 p-6 sm:p-8 md:p-10"
        >

          {/* TITLE */}
          <div className="text-white text-xl sm:text-2xl md:text-3xl font-semibold mb-6">
            {highlights?.title || "Placement Highlights"}
          </div>

          {/* STAT ITEMS ROW */}
          {highlights?.items?.length > 0 && (
            <div className="flex flex-wrap items-center gap-0 mb-8">
              {highlights.items.map((item, i) => {
                const match = item.match(/^(\d[\d,]*)\s+(.+)$/);
                const num = match ? match[1] : item;
                const label = match ? match[2] : "";
                return (
                  <div key={i} className="flex items-center">
                    <div className="flex items-center gap-3 pr-6 sm:pr-10">
                      <span className="text-4xl sm:text-5xl font-bold text-white">{num}</span>
                      {label && (
                        <span className="text-white text-xs sm:text-sm font-medium leading-tight max-w-[100px]">
                          {label}
                        </span>
                      )}
                    </div>
                    {i < highlights.items.length - 1 && (
                      <div className="w-[1px] h-12 bg-white mr-6 sm:mr-10" />
                    )}
                  </div>
                );
              })}
            </div>
          )}

         {courseStats?.stats?.length > 0 && (
  <div className="text-white">

    {/* TOP STATS */}
    <div className="flex items-center mb-8">

      {courseStats.stats.slice(0, 2).map((s, i) => (
        <div
          key={i}
          className={`flex items-center ${
            i === 0
              ? "pr-6 border-r border-white/40"
              : "pl-6"
          }`}
        >
          <span className="text-3xl sm:text-4xl font-bold mr-2">
            {s.value}
          </span>

          <span className="text-sm sm:text-base uppercase tracking-wide">
            {s.label.replace(
              /Total No\. of Students Who are Placed\s*/i,
              ""
            )}
          </span>
        </div>
      ))}

    </div>

    {/* SECTORS TITLE */}
    <h3 className="text-xl sm:text-2xl font-medium mb-3">
      Sectors
    </h3>

   

    {/* SECTOR GRID */}
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-y-6">
      {courseStats.stats.slice(2).map((s, i) => (
        <div
          key={i}
          className="border-b border-white/40  font-semi-bold flex items-center gap-2"
        >
          <span className="text-2xl sm:text-3xl font-bold mr-2">
            {s.value}
          </span>

          <span className="text-xs sm:text-sm uppercase tracking-wide">
            {s.label.replace(
              /Total No\. of Students Who are Placed\s*/i,
              ""
            )}
          </span>
        </div>
      ))}
    </div>

  </div>
)}

         

        </motion.div>

      </div>

    </section>
  );
})
