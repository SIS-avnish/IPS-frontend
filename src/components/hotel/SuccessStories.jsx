import React, { memo } from "react";
import { motion } from "framer-motion";
import Media from "../common/Media";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.08 },
  }),
};

const SuccessStories = memo(({ data }) => {
  const title = data?.title || "Success Stories";
  const stories = data?.items || [];

  if (!stories.length) return null;

  return (
    <section className="bg-[#f3f3f3] py-14 sm:py-16 md:py-20 px-4 sm:px-6 md:px-12 lg:px-16">
      <div className="max-w-7xl mx-auto">

        {/* Heading */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-10 md:mb-14"
        >
          <h2 className="text-[#002147] text-2xl sm:text-3xl md:text-4xl font-semibold">
            {title}
          </h2>
          <div className="w-24 sm:w-28 md:w-32 h-[2px] bg-red-400 mt-3"></div>
        </motion.div>

        {/* Stories Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {stories.map((story, i) => (
            <motion.div
              key={i}
              custom={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
              className="bg-white rounded-xl shadow-md overflow-hidden 
                         transition duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              {story.image && (
                <Media
                  src={story.image}
                  alt={story.name}
                  className="w-full h-[220px] sm:h-[260px] object-cover"
                />
              )}

              <div className="p-5 sm:p-6">
                <h3 className="text-[#002147] text-lg sm:text-xl font-semibold">
                  {story.name}
                </h3>

                {story.designation && (
                  <p className="text-[#e45b5b] text-sm font-medium mt-1">
                    {story.designation}
                  </p>
                )}

                {story.story && (
                  <p className="text-gray-600 text-sm leading-relaxed mt-3">
                    {story.story}
                  </p>
                )}
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
});
export default SuccessStories;
