import React, { memo } from "react";
import { motion } from "framer-motion";
import { cleanCmsHtml } from "../common/ScratchHtml";

import bhmImg from "../../assets/Images/bhm.jpg";  
import bbaImg from "../../assets/Images/bba.jpg";  

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const Program = memo(({ data, titleData }) => {

  const programTitle = titleData?.title || "Programmes";
  const programDescription = titleData?.content || "";

  // If API provides scratch HTML, render it dynamically
  if (data?.html) {
    return (
      <section className="bg-[#ffffff] py-14 sm:py-16 md:py-20 px-4 sm:px-6 md:px-12 lg:px-16">
        {/* Heading */}
        <div className="max-w-7xl mx-auto mb-10 md:mb-14">
          <h2 className="text-[#002147] text-2xl sm:text-3xl md:text-4xl font-semibold">
            {programTitle}
          </h2>
          <div className="w-24 sm:w-28 md:w-32 h-[2px] bg-red-400 mt-3"></div>
          {programDescription && (
            <p className="text-gray-600 mt-4 max-w-3xl leading-relaxed">{programDescription}</p>
          )}
        </div>

        <div
          className="max-w-7xl mx-auto programmes-scratch overflow-x-auto"
          dangerouslySetInnerHTML={{ __html: cleanCmsHtml(data.html) }}
        />
      </section>
    );
  }

  // Fallback: hardcoded content
  return (
    <section className="bg-[#ffffff] py-14 sm:py-16 md:py-20 px-4 sm:px-6 md:px-12 lg:px-16">
      
      {/* Heading */}
      <div className="max-w-7xl mx-auto mb-10 md:mb-14">
        <h2 className="text-[#002147] text-2xl sm:text-3xl md:text-4xl font-semibold">
          {programTitle}
        </h2>
        <div className="w-24 sm:w-28 md:w-32 h-[2px] bg-red-400 mt-3"></div>
        {programDescription && (
          <p className="text-gray-600 mt-4 max-w-3xl leading-relaxed">{programDescription}</p>
        )}
      </div>

      <div className="max-w-7xl mx-auto space-y-14 md:space-y-20">

        {/* ---------- BHM ---------- */}
        <div className="grid md:grid-cols-2 gap-8 md:gap-10 items-center">

          {/* Image */}
          <motion.div 
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="inline-block"
          >
            <img
              src={bhmImg}
              alt="BHM"
              className="w-full h-[260px] sm:h-[320px] md:h-[380px] lg:h-[420px] object-cover rounded-md"
            />
          </motion.div>

          {/* Text */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h3 className="text-[#002147] text-xl sm:text-2xl font-semibold mb-4">
              BHM
            </h3>

            <p className="text-gray-600 mb-5 md:mb-6 leading-relaxed">
              Go places in your career with a comprehensive, industry-focused
              Bachelor of Hotel Management (BHM) program that blends hands-on
              hospitality training with strong management skills. Tailored for
              your success in the world of hospitality, this course prepares you
              for a spectrum of evolving choices in luxury hotels and resorts,
              airlines, cruise lines, and event management companies.
            </p>

            <h4 className="text-[#002147] font-medium mb-2">
              Program Highlights
            </h4>
            <ul className="list-disc pl-5 text-gray-600 mb-5 space-y-1">
              <li>Training in culinary arts, event planning and hospitality operations.</li>
              <li>Hands-on experience in mock hotel and restaurant settings.</li>
            </ul>

            <h4 className="text-[#002147] font-semibold mb-2">
              Career After BHM
            </h4>
            <ul className="list-disc pl-5 text-gray-600 space-y-1">
              <li>Opportunities in hotel management, tourism boards, cruise and luxury resorts.</li>
              <li>Pathways to entrepreneurship in hospitality.</li>
            </ul>
          </motion.div>
        </div>


        {/* ---------- BBA ---------- */}
        <div className="grid md:grid-cols-2 gap-8 md:gap-10 items-center">

          {/* Text first */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="order-2 md:order-1"
          >
            <h3 className="text-[#002147] text-xl sm:text-2xl font-semibold mb-4">
              BBA (Hotel Management)
            </h3>

            <p className="text-gray-600 mb-5 md:mb-6 leading-relaxed">
              Step into the dynamic world of hospitality and tourism with our
              BBA in Hotel Management. Our industry-tailored course blends
              business management with hands-on hospitality training to prepare
              you for leadership roles in the global hospitality sector.
            </p>

            <h4 className="text-[#002147] font-semibold mb-2">
              Program Highlights
            </h4>
            <ul className="list-disc pl-5 text-gray-600 mb-5 space-y-1">
              <li>Comprehensive learning in business administration and hospitality operations.</li>
              <li>Practical exposure to marketing, customer service and event management.</li>
            </ul>

            <h4 className="text-[#002147] font-semibold mb-2">
              Career After BBA
            </h4>
            <ul className="list-disc pl-5 text-gray-600 space-y-1">
              <li>Careers in hotel chains, airlines, marketing and tourism boards.</li>
              <li>Leadership roles or entrepreneurship in hospitality management.</li>
            </ul>
          </motion.div>

          {/* Image */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="order-1 md:order-2"
          >
            <img
              src={bbaImg}
              alt="BBA"
              className="w-full h-[260px] sm:h-[320px] md:h-[380px] lg:h-[420px] object-cover rounded-md"
            />
          </motion.div>

        </div>

      </div>
    </section>
  );
});
export default Program;