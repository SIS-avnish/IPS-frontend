import { memo, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { resolveImageUrl } from "../../services/api";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

export default memo(function Testimonials({ data }) {
  const title = data?.title || "Testimonials";
  const items = data?.items || [];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (items.length <= 2) return;
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 2 >= items.length ? 0 : prev + 2));
    }, 5000);
    return () => clearInterval(timer);
  }, [items.length]);

  if (!items.length) return null;

  const visibleItems = items.slice(index, index + 2);
  const prev = () =>
    setIndex(index - 2 >= 0 ? index - 2 : Math.max(0, items.length - 2));
  const next = () =>
    setIndex(index + 2 >= items.length ? 0 : index + 2);

  return (
    <section className="py-12 sm:py-14 md:py-16 bg-[#F0EEEF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-3xl sm:text-4xl md:text-5xl font-medium text-[#002147]"
        >
          {title}
        </motion.h2>

        <div className="h-[2px] w-40 bg-[#002147] mt-4 mb-12" />

        {items.length > 2 && (
          <>
            <button
              onClick={prev}
              className="absolute left-0 top-[60%] bg-[#002147] text-white w-10 h-10 rounded-full z-10 hidden md:flex items-center justify-center"
            >
              ‹
            </button>
            <button
              onClick={next}
              className="absolute right-0 top-[60%] bg-[#002147] text-white w-10 h-10 rounded-full z-10 hidden md:flex items-center justify-center"
            >
              ›
            </button>
          </>
        )}

        <div className="grid md:grid-cols-2 gap-10">
          <AnimatePresence mode="wait">
            {visibleItems.map((t, i) => (
              <motion.div
                key={`${index}-${i}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="bg-white p-8 rounded-xl shadow"
              >
                <div className="flex items-center gap-4 mb-4">
                  {t.image && (
                    <img
                      src={resolveImageUrl(t.image)}
                      className="w-14 h-14 rounded-full object-cover"
                      alt={t.name}
                      loading="lazy"
                    />
                  )}
                  <div>
                    <h4 className="font-semibold text-[#002147]">{t.name}</h4>
                    {t.designation && (
                      <p className="text-gray-500 text-sm">{t.designation}</p>
                    )}
                  </div>
                </div>
                <p className="text-gray-600 leading-relaxed">{t.story}</p>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
});
