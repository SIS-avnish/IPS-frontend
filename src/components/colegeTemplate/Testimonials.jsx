import { memo, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { resolveImageUrl } from "../../services/api";
import Modal from "../common/Modal";
import { isVideoUrl } from "../common/Media";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

export default memo(function Testimonials({ data }) {
  const title = data?.title || "Testimonials";
  const items = data?.items || [];

  const [index, setIndex] = useState(0);
  const [selectedItem, setSelectedItem] = useState(null);

  // autoplay carousel
  useEffect(() => {
    if (items.length <= 2 || selectedItem) return;

    const timer = setInterval(() => {
      setIndex((prev) => (prev + 2 >= items.length ? 0 : prev + 2));
    }, 5000);

    return () => clearInterval(timer);
  }, [items.length, selectedItem]);

  if (!items.length) return null;

  const visibleItems = items.slice(index, index + 2);

  const prev = () =>
    setIndex(index - 2 >= 0 ? index - 2 : Math.max(0, items.length - 2));

  const next = () =>
    setIndex(index + 2 >= items.length ? 0 : index + 2);

  return (
    <section className="py-12 sm:py-14 md:py-16 bg-[#F0EEEF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">

        {/* Title */}
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

        {/* Navigation Buttons */}
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

        {/* Cards */}
        <div className="grid md:grid-cols-2 gap-10">
          <AnimatePresence mode="wait">
            {visibleItems.map((t, i) => (
              <motion.div
                key={`${index}-${i}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="bg-white p-8 rounded-xl shadow h-[260px] flex flex-col cursor-pointer"
                onClick={() => setSelectedItem(t)}
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
                    <h4 className="font-semibold text-[#002147]">
                      {t.name}
                    </h4>

                    {t.designation && (
                      <p className="text-gray-500 text-sm">
                        {t.designation}
                      </p>
                    )}
                  </div>
                </div>

                {/* Truncated Story */}
                <p
                  className="text-gray-600 leading-relaxed overflow-hidden"
                  style={{
                    display: "-webkit-box",
                    WebkitLineClamp: 4,
                    WebkitBoxOrient: "vertical",
                  }}
                >
                  {t.story}
                </p>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Modal */}
        {selectedItem && (
  <AnimatePresence>
    <motion.div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={() => setSelectedItem(null)}
    >
      <motion.div
        className="bg-white rounded-xl max-w-2xl w-full p-6 relative"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ duration: 0.2 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={() => setSelectedItem(null)}
          className="absolute top-4 right-4 text-gray-500 hover:text-black text-xl"
        >
          ✕
        </button>

        {/* User Info */}
        <div className="flex items-center gap-4 mb-6">
          {selectedItem.image && (
            <img
              src={resolveImageUrl(selectedItem.image)}
              className="w-16 h-16 rounded-full object-cover"
              alt={selectedItem.name}
            />
          )}

          <div>
            <h3 className="text-xl font-semibold text-[#002147]">
              {selectedItem.name}
            </h3>

            {selectedItem.designation && (
              <p className="text-gray-500 text-sm">
                {selectedItem.designation}
              </p>
            )}
          </div>
        </div>

        {/* Media */}
        {selectedItem.media && (
          <div className="mb-6">
            {isVideoUrl(selectedItem.media) ? (
              <video
                controls
                autoPlay
                className="w-full rounded-lg"
                src={resolveImageUrl(selectedItem.media)}
              />
            ) : (
              <img
                src={resolveImageUrl(selectedItem.media)}
                className="w-full rounded-lg"
                alt="testimonial"
              />
            )}
          </div>
        )}

        {/* Full Story */}
        <p className="text-gray-700 leading-relaxed">
          {selectedItem.story}
        </p>
      </motion.div>
    </motion.div>
  </AnimatePresence>
)}

      </div>
    </section>
  );
});