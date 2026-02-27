import { useState, useEffect } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { motion, AnimatePresence } from "framer-motion";
import { resolveImageUrl } from "../../services/api";
import { isVideoUrl } from "../common/Media";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

const cardVariant = {
  hidden: { opacity: 0, y: 15 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, delay: i * 0.06, ease: "easeOut" },
  }),
};

export default function SuccessStories({ data }) {
  if (!data || !data.items || data.items.length === 0) return null;

  const title = data.title || "Success Stories";
  const items = data.items;

  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (items.length <= 1) return;
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % items.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [items.length]);

  const prev = () => setIndex((index - 1 + items.length) % items.length);
  const next = () => setIndex((index + 1) % items.length);

  const current = items[index];

  return (
    <section id="success-stories" className="bg-[#f7f9fc] py-12 sm:py-14 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* TITLE */}
        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="text-2xl sm:text-3xl md:text-4xl font-medium text-[#0b1c39] text-center md:text-left"
        >
          {title}
        </motion.h2>

        <div className="w-40 h-[3px] bg-[#faa701] mt-3 mb-10 mx-auto md:mx-0"></div>

        {/* SLIDER */}
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="bg-white rounded-xl shadow-md p-6 sm:p-8 md:p-10 flex flex-col md:flex-row gap-6 items-center"
            >
              {/* IMAGE */}
              {current.image && (
                <div className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full overflow-hidden flex-shrink-0 border-4 border-[#faa701]">
                  {isVideoUrl(resolveImageUrl(current.image)) ? (
                    <video
                      src={resolveImageUrl(current.image)}
                      className="w-full h-full object-cover"
                      muted autoPlay loop playsInline controls
                    />
                  ) : (
                  <LazyLoadImage
                    src={resolveImageUrl(current.image)}
                    alt={current.name}
                    effect="blur"
                    className="w-full h-full object-cover"
                  />
                  )}
                </div>
              )}

              {/* CONTENT */}
              <div className="text-center md:text-left flex-1">
                <p className="text-gray-600 text-sm sm:text-base leading-relaxed italic">
                  "{current.story}"
                </p>
                <h4 className="mt-4 text-[#002147] text-lg font-semibold">
                  {current.name}
                </h4>
                {current.designation && (
                  <p className="text-gray-500 text-sm mt-1">
                    {current.designation}
                  </p>
                )}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* NAV ARROWS */}
          {items.length > 1 && (
            <div className="flex justify-center md:justify-end gap-3 mt-6">
              <button
                onClick={prev}
                className="w-10 h-10 rounded-full border border-[#002147] text-[#002147] flex items-center justify-center hover:bg-[#002147] hover:text-white transition"
              >
                &#8592;
              </button>
              <button
                onClick={next}
                className="w-10 h-10 rounded-full border border-[#002147] text-[#002147] flex items-center justify-center hover:bg-[#002147] hover:text-white transition"
              >
                &#8594;
              </button>
            </div>
          )}
        </div>

        {/* DOTS */}
        {items.length > 1 && (
          <div className="flex justify-center gap-2 mt-6">
            {items.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                className={`w-2.5 h-2.5 rounded-full transition ${
                  i === index ? "bg-[#002147]" : "bg-gray-300"
                }`}
              />
            ))}
          </div>
        )}

      </div>
    </section>
  );
}
