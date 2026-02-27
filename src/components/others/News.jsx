import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Media from "../common/Media";

/* -------------------- ANIMATION -------------------- */
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.07, duration: 0.45 },
  }),
};

/* -------------------- COMPONENT -------------------- */
const News = ({ newsEventsHtml, newsCards = [], collegeSlug }) => {
  return (
    <section className="bg-gray-50 py-10 md:py-14">

      <div className="max-w-6xl mx-auto px-4">

        {/* ================= NEWS EVENTS HTML SECTION ================= */}
        {newsEventsHtml && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-14"
            dangerouslySetInnerHTML={{ __html: newsEventsHtml }}
          />
        )}

        {/* ================= IMAGE NEWS SECTION ================= */}
        {newsCards.length > 0 && (
          <>
            <motion.h3
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="text-lg md:text-2xl font-bold text-[#002147] mb-6"
            >
              News Media Coverage
            </motion.h3>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {newsCards.map((item, i) => (
                <motion.div
                  key={item.id}
                  custom={i}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden"
                >
                  <Link to={`/${collegeSlug}/activities/news/${item.id}`}>
                    <Media
                      src={item.thumbnail_image}
                      alt={item.title}
                      className="h-52 w-full object-cover"
                    />

                    <div className="p-4">
                      <h4 className="font-semibold text-[#002147] text-sm md:text-base">
                        {item.title}
                      </h4>
                      <p className="text-gray-600 text-xs md:text-sm mt-2">
                        {item.subtitle}
                      </p>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </>
        )}

      </div>
    </section>
  );
};

export default News;