import React, { memo, useRef, useEffect, useState, useCallback } from "react";
import { motion, useMotionValue, animate } from "framer-motion";
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
  const scrollRef = useRef(null);
  const [maxDrag, setMaxDrag] = useState(0);
  const x = useMotionValue(0);

  useEffect(() => {
    if (!scrollRef.current) return;
    const el = scrollRef.current;
    setMaxDrag(el.scrollWidth - el.offsetWidth);
  }, [stories]);

  const scroll = useCallback((dir) => {
    const step = 380;
    const current = x.get();
    const next = dir === "left"
      ? Math.min(current + step, 0)
      : Math.max(current - step, -maxDrag);
    animate(x, next, { type: "spring", stiffness: 300, damping: 30 });
  }, [x, maxDrag]);

  if (!stories.length) return null;

  return (
    <section className="bg-[#f3f3f3] py-14 sm:py-16 md:py-20 px-4 sm:px-6 md:px-12 lg:px-16">
      <div className="max-w-7xl mx-auto">

        {/* Heading + Nav Buttons */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex items-end justify-between mb-10 md:mb-14"
        >
          <div>
            <h2 className="text-[#002147] text-2xl sm:text-3xl md:text-4xl font-semibold">
              {title}
            </h2>
            <div className="w-24 sm:w-28 md:w-32 h-[2px] bg-red-400 mt-3"></div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => scroll("left")}
              className="w-10 h-10 rounded-full border-2 border-[#002147] text-[#002147] flex items-center justify-center hover:bg-[#002147] hover:text-white transition"
              aria-label="Scroll left"
            >
              &#8592;
            </button>
            <button
              onClick={() => scroll("right")}
              className="w-10 h-10 rounded-full border-2 border-[#002147] text-[#002147] flex items-center justify-center hover:bg-[#002147] hover:text-white transition"
              aria-label="Scroll right"
            >
              &#8594;
            </button>
          </div>
        </motion.div>

        {/* Stories Horizontal Scroll */}
        <motion.div
          ref={scrollRef}
          className="cursor-grab overflow-hidden"
          whileTap={{ cursor: "grabbing" }}
        >
          <motion.div
            drag="x"
            style={{ x }}
            dragConstraints={{ right: 0, left: -maxDrag }}
            className="flex gap-6 md:gap-8"
          >
            {stories.map((story, i) => (
              <motion.div
                key={i}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
                className="bg-white rounded-xl shadow-md overflow-hidden 
                           transition duration-300 hover:-translate-y-1 hover:shadow-lg
                           min-w-[280px] sm:min-w-[320px] lg:min-w-[360px] max-w-[360px] flex-shrink-0"
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
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
});
export default SuccessStories;
