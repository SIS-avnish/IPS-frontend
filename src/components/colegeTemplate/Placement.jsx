import { useState, useEffect, useRef, memo } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { motion, AnimatePresence } from "framer-motion";
import { resolveImageUrl } from "../../services/api";
import { isVideoUrl } from "../common/Media";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

const slideLeft = {
  hidden: { opacity: 0, x: -30 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.45, ease: "easeOut" } },
};

const slideRight = {
  hidden: { opacity: 0, x: 30 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.45, ease: "easeOut" } },
};
export default memo(function Placement({ placement, testimonials }) {

  const placementData = placement || {};
  const testimonialsData = testimonials || {};
  const testimonialItems = testimonialsData.items || [];
  const [selectedTestimonial, setSelectedTestimonial] = useState(null);
  const videoRef = useRef(null);

  const [index, setIndex] = useState(0);

  const prev = () =>
    setIndex((index - 1 + testimonialItems.length) % testimonialItems.length);

  const next = () =>
    setIndex((index + 1) % testimonialItems.length);

  // Auto-slide testimonials every 3 seconds
  useEffect(() => {
    if (testimonialItems.length <= 1) return;
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % testimonialItems.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [testimonialItems.length]);

  useEffect(() => {
    if (selectedTestimonial?.video && videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => { });
    }
  }, [selectedTestimonial]);

  const first = testimonialItems[index];
  const second = testimonialItems[(index + 1) % testimonialItems.length];

  return (
    <section id="placement" className="bg-[#f7f9fc] py-12 sm:py-14 md:py-16">

      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* TOP CONTENT */}
        {placementData.title && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 items-center mb-12 sm:mb-16">

            <motion.div
              variants={placementData.image_position === "left" ? slideRight : slideLeft}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              className={`text-center lg:text-left ${placementData.image_position === "left" ? "order-2" : ""}`}
            >
              {placementData.tag && (
                <span className="text-yellow-600 tracking-widest font-medium text-sm sm:text-base">
                  {placementData.tag}
                </span>
              )}

              <h3 className="text-[#002147] text-2xl sm:text-3xl md:text-4xl font-medium mt-2">
                {placementData.title}
              </h3>

              <p
  className="mt-4 text-gray-600 text-sm sm:text-base whitespace-pre-line"
  dangerouslySetInnerHTML={{
    __html: placementData.content?.replace(/\n/g, "<br />")
  }}
/>

              {placementData.items && placementData.items.length > 0 && (
                <ul className="mt-6 space-y-2 inline-block text-left">
                  {placementData.items.map((item, i) => (
                    <li key={i} className="flex gap-2 items-start">
                      <span className="text-yellow-600 font-bold">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
              )}
            </motion.div>

            {placementData.image && (
              <motion.div
                variants={placementData.image_position === "left" ? slideLeft : slideRight}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
                className={`text-center ${placementData.image_position === "left" ? "order-1" : ""}`}
              >
                {isVideoUrl(resolveImageUrl(placementData.image)) ? (
                  <video
                    src={resolveImageUrl(placementData.image)}
                    className="rounded shadow-lg mx-auto w-full max-w-md lg:max-w-full"
                    muted autoPlay loop playsInline controls
                  />
                ) : (
                <LazyLoadImage
                  src={resolveImageUrl(placementData.image)}
                  alt={placementData.title}
                  effect="blur"
                  className="rounded shadow-lg mx-auto w-full max-w-md lg:max-w-full"
                  wrapperClassName="w-full"
                />
                )}
              </motion.div>
            )}

          </div>
        )}

        {/* TESTIMONIALS */}
        {testimonialItems.length > 0 && (
          <>
            <motion.h2
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              className="text-[#002147] text-2xl sm:text-3xl md:text-5xl font-medium text-center md:text-left"
            >
              {testimonialsData.title || "Testimonials"}
            </motion.h2>

            <div className="w-24 sm:w-32 h-[2px] bg-[#002147] mt-3 mb-8 sm:mb-10 mx-auto md:mx-0"></div>

            <div className="relative max-w-5xl mx-auto px-6 sm:px-0">

              {/* GRID: 1 on mobile, 2 on desktop */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {[first, second].filter(Boolean).map((t, i) => (
                  <div
                    key={i}
                    onClick={() => setSelectedTestimonial(t)}
                    className="bg-white p-5 sm:p-6 md:p-8 rounded-xl shadow border cursor-pointer"
                  >

                    <div className="flex items-center gap-3 sm:gap-4 mb-4">
                      {t.image && (
                        isVideoUrl(resolveImageUrl(t.image)) ? (
                          <video
                            src={resolveImageUrl(t.image)}
                            className="w-12 h-12 sm:w-14 sm:h-14 rounded-full border-2 border-[#002147] object-cover"
                            muted autoPlay loop playsInline
                          />
                        ) : (
                        <LazyLoadImage
                          src={resolveImageUrl(t.image)}
                          alt={t.name}
                          effect="blur"
                          className="w-12 h-12 sm:w-14 sm:h-14 rounded-full border-2 border-[#002147] object-cover"
                          wrapperClassName="w-12 h-12 sm:w-14 sm:h-14 rounded-full"
                        />
                        )
                      )}
                      <div>
                        <h6 className="font-bold text-[#002147] text-sm sm:text-base">{t.name}</h6>
                        <span className="text-gray-500 text-xs sm:text-sm">{t.designation}</span>
                      </div>
                    </div>

                    <p className="text-gray-600 text-sm sm:text-base">{t.story}</p>

                  </div>
                ))}

              </div>

              {/* NAV BUTTONS */}
              <button
                onClick={prev}
                className="absolute left-0 sm:-left-4 top-1/2 -translate-y-1/2 bg-[#002147] text-white w-9 h-9 sm:w-10 sm:h-10 rounded-full z-10"
              >
                ‹
              </button>

              <button
                onClick={next}
                className="absolute right-0 sm:-right-4 top-1/2 -translate-y-1/2 bg-[#002147] text-white w-9 h-9 sm:w-10 sm:h-10 rounded-full z-10"
              >
                ›
              </button>

            </div>
          </>
        )}

      </div>

      <AnimatePresence>
  {selectedTestimonial && (
    <motion.div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.85, y: 20 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="bg-white max-w-xl w-full rounded-xl shadow-lg p-6 relative"
      >

        <button
          onClick={() => setSelectedTestimonial(null)}
          className="absolute top-3 right-3 text-gray-500 hover:text-black text-xl"
        >
          ✕
        </button>

        <div className="flex items-center gap-4 mb-4">
          {selectedTestimonial.image && (
            isVideoUrl(resolveImageUrl(selectedTestimonial.image)) ? (
              <video
                src={resolveImageUrl(selectedTestimonial.image)}
                className="w-14 h-14 rounded-full border-2 border-[#002147] object-cover"
                muted autoPlay loop playsInline
              />
            ) : (
            <LazyLoadImage
              src={resolveImageUrl(selectedTestimonial.image)}
              alt={selectedTestimonial.name}
              className="w-14 h-14 rounded-full border-2 border-[#002147] object-cover"
            />
            )
          )}
          <div>
            <h6 className="font-bold text-[#002147]">
              {selectedTestimonial.name}
            </h6>
            <span className="text-gray-500 text-sm">
              {selectedTestimonial.designation}
            </span>
          </div>
        </div>

        <p className="text-gray-600 mb-4">{selectedTestimonial.story}</p>

        {selectedTestimonial.video && (
          <video
            ref={videoRef}
            src={resolveImageUrl(selectedTestimonial.video)}
            controls
            autoPlay
            className="w-full rounded-lg"
          />
        )}

      </motion.div>
    </motion.div>
  )}
</AnimatePresence>
    </section>
  );
})
