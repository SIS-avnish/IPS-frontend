import { useState, useEffect, useMemo, memo } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { isVideoUrl } from "../common/Media";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

const EventSlider = memo(({ title, content, events = [], collegeSlug }) => {

  // Chunk events into groups of 6 for carousel slides
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

  const prev = () =>
    setIndex(prev => (prev === 0 ? slides.length - 1 : prev - 1));

  const next = () =>
    setIndex(prev => (prev === slides.length - 1 ? 0 : prev + 1));

   useEffect(() => {
    if (slides.length <= 1) return;
    const timer = setInterval(() => {
      setIndex(prev => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 3000);

 return () => clearInterval(timer);
  }, [slides.length]);
 

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
            {title || "A calendar full of celebrations"}
          </h2>
          <div className="w-40 h-[2px] bg-red-400 mt-3"></div>
        </div>

        <p className="text-gray-600 text-base sm:text-[15px]">
          {content || "Life at IPS Academy is a melting pot of diverse cultures, a plethora of events, learning opportunities and peer activities that enhance your experience on campus."}
        </p>

      </motion.div>

      {/* Carousel */}
      <div className="max-w-6xl mx-auto mt-10 sm:mt-8 relative">

        {slides.length > 1 && (
          <div className="absolute right-4 -top-10 sm:-top-8 flex gap-3">
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
            // Activity cards link to activity detail, event cards link to event detail
            const linkTo = event._isActivity
              ? `/${collegeSlug}/activity/${event.id}`
              : `/${collegeSlug}/activities/events/${event.id}`;

            return (
            <Link
              to={linkTo}
              key={event.id || i}
              className="cursor-pointer block"
            >
              {event.thumbnail_image ? (
                isVideoUrl(event.thumbnail_image) ? (
                  <video
                    src={event.thumbnail_image}
                    className="
                      w-full h-[320px] sm:h-[260px] xs:h-[220px] object-cover
                      border-2 border-[#ff7373]
                      shadow-md
                      transition duration-300
                      hover:-translate-y-2 hover:scale-105 hover:shadow-xl transition-all duration-[2000ms] ease-in-out
                    "
                    muted autoPlay loop playsInline
                  />
                ) : (
                <LazyLoadImage
                  src={event.thumbnail_image}
                  alt={event.title || `event-${i}`}
                  effect="blur"
                  className="
                    w-full h-[320px] sm:h-[260px] xs:h-[220px] object-cover
                    border-2 border-[#ff7373]
                    shadow-md
                    transition duration-300
                    hover:-translate-y-2 hover:scale-105 hover:shadow-xl  transition-all duration-[2000ms] ease-in-out
                  "
                  wrapperClassName="w-full"
                />
                )
              ) : (
                <div className="
                  w-full h-[320px] sm:h-[260px] xs:h-[220px]
                  border-2 border-[#ff7373]
                  shadow-md bg-white
                  flex flex-col items-center justify-center p-6
                  transition duration-300
                  hover:-translate-y-2 hover:scale-105 hover:shadow-xl transition-all duration-[2000ms] ease-in-out
                ">
                  <h3 className="text-[#002147] font-semibold text-lg text-center mb-2">
                    {event.title}
                  </h3>
                  <p className="text-gray-500 text-sm text-center line-clamp-3">
                    {event.subtitle}
                  </p>
                  {event.start_date && (
                    <p className="text-gray-400 text-xs mt-3">
                      {new Date(event.start_date).toLocaleDateString('en-IN', {
                        year: 'numeric', month: 'short', day: 'numeric',
                      })}
                    </p>
                  )}
                </div>
              )}
            </Link>
            );
          })}

        </div>

      </div>

    </div>
  );
});
export default EventSlider;
