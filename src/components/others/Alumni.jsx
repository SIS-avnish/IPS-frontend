import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { cleanCmsHtml } from "../common/ScratchHtml";

const Alumini = ({ alumniHtml, socialActivitiesHtml, testimonials }) => {

  /* ================== ANIMATIONS ================== */

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.12 } }
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };


  /* ================== UI ================== */

  return (
    <section className="bg-gray-50 py-12 px-4 md:px-8">

      <div className="max-w-6xl mx-auto">

        {/* ================= ALUMNI HTML SECTION ================= */}
        {alumniHtml && (
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="mb-14"
            dangerouslySetInnerHTML={{ __html: cleanCmsHtml(alumniHtml) }}
          />
        )}

        {/* ================= SOCIAL ACTIVITIES HTML SECTION ================= */}
        {socialActivitiesHtml && (
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            dangerouslySetInnerHTML={{ __html: cleanCmsHtml(socialActivitiesHtml) }}
          />
        )}

        {/* ================= ALUMNI TESTIMONIAL TILES ================= */}
        {testimonials && testimonials.length > 0 && (
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="mt-16"
          >

            <motion.h2
              variants={fadeUp}
              className="text-lg md:text-xl font-semibold mb-6 text-center"
            >
              Alumni Testimonials – B.Com, Commerce Department
            </motion.h2>

            <motion.div
              variants={container}
              className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
            >
              {testimonials.map((t, i) => (

                <motion.div
                  key={i}
                  variants={fadeUp}
                  whileHover={{ scale: 1.03 }}
                  className="bg-white rounded-2xl shadow-md p-6 border flex flex-col"
                >

                  <p className="text-gray-700 text-sm md:text-base leading-relaxed flex-1">
                    {t.story}
                  </p>

                  <div className="mt-4 font-semibold text-[#002147]">
                    — {t.name}
                  </div>

                </motion.div>

              ))}
            </motion.div>

          </motion.div>
        )}

      </div>

    </section>
  );
};

export default Alumini;
