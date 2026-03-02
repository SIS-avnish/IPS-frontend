import React, { useRef, useEffect, useState, memo } from "react";
import { motion } from "framer-motion";
import Media from "../common/Media";

import front from "../../assets/Images/Front.png";
import language from "../../assets/Images/language.png";
import maintenance from "../../assets/Images/maintainance.png";
import accom from "../../assets/Images/accom.png";

const Skills = memo(({ data }) => {

  const sliderRef = useRef(null);
  const innerRef = useRef(null);

  const [width, setWidth] = useState(0);
  const [x, setX] = useState(0);

  const staticImages = [front, language, maintenance, accom];

  // Parse API items: first item is heading, rest are "Title: Description" format
  const apiItems = data?.items || [];
  const heading = apiItems[0] || "Master Your Skills in Our Practical Labs";

  const labs = apiItems.length > 1
    ? apiItems.slice(1).map((item, i) => {
        const colonIdx = item.indexOf(": ");
        const title = colonIdx !== -1 ? item.substring(0, colonIdx) : item;
        const desc = colonIdx !== -1 ? item.substring(colonIdx + 2) : "";
        return {
          img: staticImages[i % staticImages.length],
          title,
          desc,
        };
      })
    : [
        {
          img: front,
          title: "Front Office Lab",
          desc: "Learn and test your skills in a simulated hotel reception with IDS Next 6i Hotel ERP software, PA systems, luggage rooms and bell desks, offering practical front-office training."
        },
        {
          img: language,
          title: "Language Lab",
          desc: "Enhance communication skills through modern software, preparing students for the industry's global demands."
        },
        {
          img: maintenance,
          title: "Maintenance Lab",
          desc: "Master essential skills in plumbing, electrical systems and refrigeration, ensuring students can manage hotel maintenance challenges."
        }
      ];

  useEffect(() => {
    const calculateWidth = () => {
      if (!innerRef.current || !sliderRef.current) return;

      const scrollWidth = innerRef.current.scrollWidth;
      const offsetWidth = sliderRef.current.offsetWidth;
      setWidth(scrollWidth - offsetWidth);
    };

    calculateWidth();
    window.addEventListener("resize", calculateWidth);

    return () => window.removeEventListener("resize", calculateWidth);

  }, [labs]);

  const slideLeft = () => {
    setX(prev => Math.min(prev + 500, 0));
  };

  const slideRight = () => {
    setX(prev => Math.max(prev - 500, -width));
  };

  return (
    <section className="bg-[#ffffff] py-12 md:py-16">

      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-12 lg:px-16">

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-[#002147] text-2xl sm:text-3xl md:text-4xl font-medium mb-4 md:mb-6"
        >
          {heading}
        </motion.h2>

      </div>


      {/* SLIDER */}
      <div className="relative">

        {/* Buttons */}
        <div className="flex justify-end gap-2 sm:gap-3 px-4 sm:px-6 md:px-12 lg:px-16 mb-4 md:mb-6">
          <button
            onClick={slideLeft}
            className="bg-white shadow px-3 sm:px-4 py-2 rounded-md active:scale-95 transition"
          >
            ←
          </button>

          <button
            onClick={slideRight}
            className="bg-white shadow px-3 sm:px-4 py-2 rounded-md active:scale-95 transition"
          >
            →
          </button>
        </div>

        <motion.div
          ref={sliderRef}
          className="cursor-grab overflow-hidden"
        >
          <motion.div
            ref={innerRef}
            drag="x"
            dragConstraints={{ left: -width, right: 0 }}
            animate={{ x }}
            transition={{ type: "spring", stiffness: 90, damping: 18 }}
            className="flex gap-6 md:gap-8 lg:gap-10 px-4 sm:px-6 md:px-12 lg:px-16"
          >

            {labs.map((lab, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="min-w-[260px] sm:min-w-[320px] md:min-w-[420px] lg:min-w-[520px]"
              >

                <div className="overflow-hidden rounded-md">
                  <Media
                    src={lab.img}
                    alt={lab.title}
                    className="w-full h-[180px] sm:h-[220px] md:h-[260px] object-cover"
                  />
                </div>

                <h3 className="text-[#002147] text-lg sm:text-xl font-semibold mt-5 md:mt-6">
                  {lab.title}
                </h3>

                <div className="w-full h-[2px] bg-red-400 my-3 md:my-4"></div>

                <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                  {lab.desc}
                </p>

              </motion.div>
            ))}

          </motion.div>
        </motion.div>

      </div>

    </section>
  );
});
export default Skills;