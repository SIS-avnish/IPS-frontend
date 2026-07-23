import { memo, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, useParams } from "react-router-dom";
import { resolveImageUrl } from "../../services/api";
import Modal from "../common/Modal";
import { isVideoUrl } from "../common/Media";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

export default memo(function Testimonials({ data }) {
  const { collegeSlug } = useParams();
  const navigate = useNavigate();
  
  const title = data?.title || "Testimonials";
  const items = data?.items || [];

  const [index, setIndex] = useState(0);
  const [selectedItem, setSelectedItem] = useState(null);

  // autoplay carousel
  useEffect(() => {
    if (items.length <= 3 || selectedItem) return;

    const timer = setInterval(() => {
      setIndex((prev) => (prev + 3 >= items.length ? 0 : prev + 3));
    }, 5000);

    return () => clearInterval(timer);
  }, [items.length, selectedItem]);

  if (!items.length) return null;

  const visibleItems = items.slice(index, index + 3);

  const prev = () =>
    setIndex(index - 3 >= 0 ? index - 3 : Math.max(0, items.length - 3));

  const next = () =>
    setIndex(index + 3 >= items.length ? 0 : index + 3);

  return (
    <section className="py-12 sm:py-14 md:py-16 bg-[#F9F4E1]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">

        {/* Title */}
        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-3xl sm:text-4xl md:text-5xl font-medium text-[#0066A6] "
        >
          {title}
        </motion.h2>

        <div className="h-[2px] w-40 bg-[#F68C1F] mt-4 mb-12" />

        {/* Navigation Buttons */}
        {items.length > 3 && (
          <>
            <button
              onClick={prev}
              className="absolute left-0 top-[60%] bg-[#0066A6] text-white w-10 h-10 rounded-full z-10 hidden md:flex items-center justify-center"
            >
              ‹
            </button>

            <button
              onClick={next}
              className="absolute right-0 top-[60%] bg-[#0066A6] text-white w-10 h-10 rounded-full z-10 hidden md:flex items-center justify-center"
            >
              ›
            </button>
          </>
        )}

        {/* Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="wait">
            {visibleItems.map((t, i) => (
              <motion.div
                key={`${index}-${i}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm hover:shadow-md transition-all border border-gray-100 min-h-[220px] flex flex-col cursor-pointer group relative overflow-hidden"
                onClick={() => {
                  if (t.id && collegeSlug) {
                    navigate(`/${collegeSlug}/activities/alumni/${t.id}`);
                  } else {
                    setSelectedItem(t);
                  }
                }}
              >
                {/* Decorative background accent */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-blue-50 to-transparent rounded-bl-full -z-0 opacity-50 group-hover:scale-110 transition-transform duration-500"></div>

                <div className="flex flex-col items-center justify-center text-center h-full gap-4 sm:gap-5 relative z-10">
                  
                  {t.image && (
                    <img
                      src={resolveImageUrl(t.image)}
                      className="shrink-0 rounded-lg object-cover w-20 h-20 sm:w-24 sm:h-24 mx-auto"
                      alt={t.name}
                      loading="lazy"
                    />
                  )}

                  <div className="flex flex-col items-center justify-center flex-1 min-w-0 w-full">
                    <h4 className="font-bold text-[#002147] text-lg sm:text-xl mt-3" style={{ wordBreak: 'break-word' }}>
                      {t.name}
                    </h4>

                    {t.designation && (
                      <p className="text-[#0066A6] font-medium mt-0.5 leading-tight text-sm sm:text-base">
                        {t.designation}
                      </p>
                    )}
                  </div>
                </div>

                {/* Truncated Story / Description */}
                {t.story && (
                  <div className="mt-6 relative z-10 flex-1">
                    <svg className="absolute -top-4 -left-2 w-8 h-8 text-blue-50 opacity-50" fill="currentColor" viewBox="0 0 32 32" aria-hidden="true"><path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z"></path></svg>
                    <div
                      className="text-gray-600 leading-relaxed overflow-hidden text-sm md:text-base relative z-10 italic"
                      style={{
                        display: "-webkit-box",
                        WebkitLineClamp: 4,
                        WebkitBoxOrient: "vertical",
                      }}
                      dangerouslySetInnerHTML={{ __html: t.story }}
                    />
                  </div>
                )}
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
              className="w-16 h-16 rounded-lg object-cover"
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

        {/* Full Story / Description */}
        <div 
          className="text-gray-700 leading-relaxed"
          dangerouslySetInnerHTML={{ __html: selectedItem.story || selectedItem.description || "" }}
        />
      </motion.div>
    </motion.div>
  </AnimatePresence>
)}

      </div>
    </section>
  );
});