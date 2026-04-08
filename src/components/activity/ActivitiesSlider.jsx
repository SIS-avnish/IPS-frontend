import { useState, useEffect, useMemo, memo, useCallback } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { isVideoUrl } from "../common/Media";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

const EventSlider = memo(({ title, content, events = [], collegeSlug, gallery = [] }) => {

  const chunkSize = 6;

  const slides = useMemo(() => {
    const result = [];
    for (let i = 0; i < events.length; i += chunkSize) {
      result.push(events.slice(i, i + chunkSize));
    }
    if (result.length === 0) result.push([]);
    return result;
  }, [events]);

  const [index, setIndex] = useState(0);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [currentGalleryIndex, setCurrentGalleryIndex] = useState(0);

  const prev = () =>
    setIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));

  const next = () =>
    setIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));

  const prevGallery = useCallback(() => {
    setCurrentGalleryIndex((prev) =>
      prev === 0 ? gallery.length - 1 : prev - 1
    );
  }, [gallery.length]);

  const nextGallery = useCallback(() => {
    setCurrentGalleryIndex((prev) =>
      prev === gallery.length - 1 ? 0 : prev + 1
    );
  }, [gallery.length]);

  // Keyboard navigation for gallery modal
  useEffect(() => {
    if (!isGalleryOpen) return;

    const handleKeyPress = (e) => {
      if (e.key === "ArrowLeft") {
        prevGallery();
      } else if (e.key === "ArrowRight") {
        nextGallery();
      } else if (e.key === "Escape") {
        setIsGalleryOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [isGalleryOpen, prevGallery, nextGallery]);

  useEffect(() => {
    if (slides.length <= 1) return;

    const timer = setInterval(() => {
      setIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 3000);

    return () => clearInterval(timer);
  }, [slides.length]);

  const openGalleryModal = (galIndex) => {
    setCurrentGalleryIndex(galIndex);
    setIsGalleryOpen(true);
  };

  const closeGalleryModal = () => {
    setIsGalleryOpen(false);
  };

  return (
    <div className="py-12 md:py-20 px-4 sm:px-5">

      {/* Heading */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        className="max-w-6xl mx-auto grid md:grid-cols-2 gap-6 sm:gap-4 items-start"
      >
        <div>
          <h2 className="text-2xl md:text-5xl sm:text-3xl font-medium leading-tight">
            {title }
          </h2>
          <div className="w-40 h-[2px] bg-red-400 mt-3"></div>
        </div>

        <p className="text-gray-600 mt-4 text-xl sm:text-[20px]">
          {content}
        </p>
      </motion.div>

      {/* Carousel */}
      <div className="max-w-6xl mx-auto mt-10 sm:mt-8 relative">

        {slides.length > 1 && (
          <div className="absolute right-4 -top-10 sm:-top-8 flex gap-3 z-10">
            <button
              onClick={prev}
              className="border border-red-400 rounded-full w-8 h-8 flex items-center justify-center hover:bg-red-50 bg-white"
            >
              ‹
            </button>
            <button
              onClick={next}
              className="border border-red-400 rounded-full w-8 h-8 flex items-center justify-center hover:bg-red-50 bg-white"
            >
              ›
            </button>
          </div>
        )}

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-4 pt-4">
          {slides[index].map((event, i) => {
            const linkTo = event._isActivity
              ? `/${collegeSlug}/activity/${event.id}`
              : `/${collegeSlug}/activities/events/${event.id}`;

            return (
              <Link
                to={linkTo}
                key={event.id || i}
                className="block group"
              >
                <div className="relative overflow-hidden border-2 border-[#ff7373] shadow-md">

                  {/* Image / Video */}
                  {event.thumbnail_image ? (
                    isVideoUrl(event.thumbnail_image) ? (
                      <video
                        src={event.thumbnail_image}
                        className="w-full h-[320px] sm:h-[260px] object-cover transition-transform duration-500 group-hover:scale-105"
                        muted
                        autoPlay
                        loop
                        playsInline
                      />
                    ) : (
                      <LazyLoadImage
                        src={event.thumbnail_image}
                        alt={event.title || `event-${i}`}
                        effect="blur"
                        className="w-full h-[320px] sm:h-[260px] object-cover transition-transform duration-500 group-hover:scale-105"
                        wrapperClassName="w-full"
                      />
                    )
                  ) : (
                    <div className="w-full h-[320px] sm:h-[260px] bg-white flex items-center justify-center p-6">
                      <h3 className="text-[#002147] font-semibold text-lg text-center">
                        {event.title}
                      </h3>
                    </div>
                  )}

                  {/* Overlay Title */}
                  <div className="absolute bottom-0 left-0 w-full bg-black/60 backdrop-blur-sm text-center py-3 px-4">
                    <h3 className="text-white text-lg font-semibold line-clamp-1">
                      {event.title}
                    </h3>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

      </div>

      {/* Gallery Section */}
      {gallery.length > 0 && (
        <div className="mt-16 sm:mt-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 pt-4">
            {gallery.map((image, idx) => (
              <button
                key={idx}
                onClick={() => openGalleryModal(idx)}
                className="block group relative overflow-hidden border-2 border-[#ff7373] shadow-md rounded-lg hover:shadow-lg transition-shadow"
              >
                <LazyLoadImage
                  src={image}
                  alt={`gallery-${idx}`}
                  effect="blur"
                  className="w-full h-[240px] sm:h-[200px] object-cover transition-transform duration-500 group-hover:scale-105"
                  wrapperClassName="w-full"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                  <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-2xl">
                    🔍
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Gallery Modal */}
      {isGalleryOpen && gallery.length > 0 && (
        <div
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          onClick={closeGalleryModal}
        >
          <div
            className="relative max-w-4xl max-h-[90vh] w-full flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={closeGalleryModal}
              className="absolute top-4 right-4 bg-red-400 hover:bg-red-500 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold text-xl transition-colors z-10"
              aria-label="Close gallery"
            >
              ×
            </button>

            {/* Image */}
            <div className="relative w-full">
              <LazyLoadImage
                src={gallery[currentGalleryIndex]}
                alt={`gallery-${currentGalleryIndex}`}
                effect="blur"
                className="w-full h-auto max-h-[80vh] object-contain"
                wrapperClassName="w-full flex justify-center"
              />
            </div>

            {/* Navigation Buttons */}
            {gallery.length > 1 && (
              <>
                <button
                  onClick={prevGallery}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-red-400 hover:bg-red-500 text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-2xl transition-colors"
                  aria-label="Previous image"
                >
                  ‹
                </button>

                <button
                  onClick={nextGallery}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-red-400 hover:bg-red-500 text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-2xl transition-colors"
                  aria-label="Next image"
                >
                  ›
                </button>

                {/* Image Counter */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/70 text-white px-4 py-2 rounded-full text-sm">
                  {currentGalleryIndex + 1} / {gallery.length}
                </div>
              </>
            )}
          </div>
        </div>
      )}

    </div>
  );
});

export default EventSlider;