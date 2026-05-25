import { useMemo, memo, useState } from "react";
import { motion } from "framer-motion";
import { cleanCmsHtml } from "../common/ScratchHtml";
import Modal from "../common/Modal";

const Alumini = memo(({ alumniHtml, socialActivitiesHtml, testimonials, testimonialsTitle }) => {
  
  const [selectedTestimonial, setSelectedTestimonial] = useState(null);

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
            className="mb-10 overflow-x-auto"
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
            className="overflow-x-auto"
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
              {testimonialsTitle}
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
                  onClick={() => setSelectedTestimonial(t)}
                  className="bg-white rounded-2xl shadow-md p-6 border flex flex-col h-96 cursor-pointer hover:shadow-lg transition-shadow"
                >
                  <img
                    src={t.image}
                    alt={t.name}
                    className="w-24 h-24 sm:w-24 sm:h-24 md:w-28 md:h-28
                        object-contain
                        object-center
                        bg-gray-100
                        border-4 border-white
                        shadow-lg
                        mb-4
                        mx-auto
                        flex-shrink-0
  "
                    loading="lazy"
                    width="112"
                    height="112"
                  />

                  <p className="text-gray-700 text-sm md:text-base leading-relaxed flex-1 overflow-hidden line-clamp-3">
                    {t.story}
                  </p>

                  <div className="mt-4 font-semibold text-[#002147] flex-shrink-0">
                    — {t.name}
                  </div>

                </motion.div>

              ))}
            </motion.div>

          </motion.div>
        )}

      </div>

      {/* ================= TESTIMONIAL MODAL ================= */}
      <Modal isOpen={selectedTestimonial !== null} onClose={() => setSelectedTestimonial(null)}>
        {selectedTestimonial && (
          <div className="text-center">
            <img
              src={selectedTestimonial.image}
              alt={selectedTestimonial.name}
              className="w-32 h-32 md:w-40 md:h-40 object-contain object-center bg-gray-100 border-4 border-white shadow-lg mb-6 mx-auto rounded-lg"
              loading="lazy"
              width="160"
              height="160"
            />
            <p className="text-gray-700 text-base md:text-lg leading-relaxed mb-6">
              {selectedTestimonial.story}
            </p>
            <div className="font-semibold text-xl text-[#002147]">
              — {selectedTestimonial.name}
            </div>
          </div>
        )}
      </Modal>

    </section>
  );
});
export default Alumini;
