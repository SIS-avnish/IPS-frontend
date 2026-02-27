import { useState, useEffect } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { isVideoUrl } from "../common/Media";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

const EventSlider = ({ title, content, events = [], collegeSlug }) => {

  // Chunk events into groups of 6 for carousel slides
  const chunkSize = 6;
  const slides = [];
  for (let i = 0; i < events.length; i += chunkSize) {
    slides.push(events.slice(i, i + chunkSize));
  }

  // Fallback if no events
  if (slides.length === 0) slides.push([]);

  const [index, setIndex] = useState(0);

  const prev = () =>
    setIndex(prev => (prev === 0 ? slides.length - 1 : prev - 1));

  const next = () =>
    setIndex(prev => (prev === slides.length - 1 ? 0 : prev + 1));

   useEffect(() => {
  if (slides.length <= 1) return;

 const timer = setInterval(() => {
    setIndex((prevIndex) => {
      if (prevIndex >= slides.length - 1) {
        return 0;
      }
      return prevIndex + 1;
    });
  }, 10000);

  return () => clearInterval(timer);
}, [slides]);

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

           {slides[index].map((item, i) => (
  <Link
    to={`/${collegeSlug}/activities/events/${item.id}`}
    key={item.id || i}
    className="cursor-pointer block"
  >
    <div className="relative group overflow-hidden border-2 border-[#ff7373] shadow-md">

      {/* Image */}
      <LazyLoadImage
        src={item.thumbnail_image}
        alt={item.title || `event-${i}`}
        effect="blur"
        className="
          w-full h-[320px] sm:h-[260px] object-cover
          transition duration-500
          group-hover:scale-110
        "
        wrapperClassName="w-full"
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition duration-300"></div>

      {/* Title */}
      <div className="absolute bottom-4 left-4 right-4">
        <h3 className="text-white text-lg md:text-xl font-semibold leading-tight">
          {item.title}
        </h3>

        {item.start_date && (
          <p className="text-gray-200 text-sm mt-1">
            {new Date(item.start_date).toLocaleDateString('en-IN', {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
            })}
          </p>
        )}
      </div>

    </div>
  </Link>
))}

        </div>

      </div>

    </div>
  );
};

export default EventSlider;
