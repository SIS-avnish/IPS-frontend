import React from "react";
import { motion } from "framer-motion";
import Media, { isVideoUrl } from "../common/Media";

/**
 * Extract YouTube video ID from various URL formats
 * Supports: youtu.be/ID, youtube.com/watch?v=ID, youtube.com/embed/ID
 */
const extractYouTubeId = (url) => {
  if (!url) return null;
  const match = url.match(
    /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|v\/))([a-zA-Z0-9_-]{11})/
  );
  return match ? match[1] : null;
};

/**
 * Determine media type: "youtube" | "video" | "image"
 */
const getMediaType = (url) => {
  if (!url) return "image";
  if (extractYouTubeId(url)) return "youtube";
  if (isVideoUrl(url)) return "video";
  return "image";
};

const StudentTestimonials = ({ title, testimonials, videoTitle, videos }) => {

  // Map API items to text testimonials
  const textTestimonials = (testimonials || []).map((item) => ({
    name: item.name,
    text: item.story,
    image: item.image,
    designation: item.designation,
  }));

  // Map API gallery URLs — detect youtube / video / image automatically
  const videoTestimonials = (videos || []).map((url) => ({
    url,
    type: getMediaType(url),
    youtubeId: extractYouTubeId(url),
  }));

  // animations
  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.12 } }
  };

  const card = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  if (!textTestimonials.length && !videoTestimonials.length) return null;

  return (
    <section className="py-12 px-4 md:px-8 bg-gray-50">

      {/* ---------------- HEADING ---------------- */}
      {title && (
        <div className="max-w-6xl mx-auto text-center mb-10">
          <h2 className="text-xl md:text-2xl font-bold">
            {title}
          </h2>
        </div>
      )}

      {/* ================= TEXT SECTION ================= */}
      {textTestimonials.length > 0 && (
        <>
          <div className="max-w-6xl mx-auto text-center mb-6">
            <p className="text-lg font-semibold">Placement Student Testimonial</p>
          </div>

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="max-w-6xl mx-auto grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {textTestimonials.map((t, i) => (
              <motion.div
                key={i}
                variants={card}
                whileHover={{ scale: 1.03 }}
                className="bg-white rounded-2xl shadow-md p-6 border"
              >
                {t.image && (
                  <Media
                    src={t.image}
                    alt={t.name}
                    className="w-16 h-16 rounded-full object-cover mx-auto mb-4"
                  />
                )}
                <p className="text-gray-700 leading-relaxed text-sm md:text-base">
                  {t.text}
                </p>

                <div className="mt-4 font-semibold text-[#002147]">
                  — {t.name}
                  {t.designation && (
                    <span className="block text-sm font-normal text-gray-500">{t.designation}</span>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </>
      )}


      {/* ================= VIDEO SECTION ================= */}
      {videoTestimonials.length > 0 && (
        <>
          <div className="max-w-6xl mx-auto text-center mt-16 mb-6">
            <p className="text-lg font-semibold">{videoTitle || "Alumni Video Testimonials"}</p>
          </div>

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="max-w-6xl mx-auto grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {videoTestimonials.map((media, i) => (
              <motion.div
                key={i}
                variants={card}
                whileHover={{ scale: 1.03 }}
                className="bg-white rounded-2xl shadow-md border overflow-hidden"
              >

                {/* YouTube embed */}
                {media.type === "youtube" && (
                  <div className="relative w-full pt-[56.25%]">
                    <iframe
                      className="absolute inset-0 w-full h-full"
                      src={`https://www.youtube.com/embed/${media.youtubeId}`}
                      title="Alumni testimonial"
                      allowFullScreen
                    />
                  </div>
                )}

                {/* Native video (.mp4, .webm, etc.) */}
                {media.type === "video" && (
                  <div className="relative w-full pt-[56.25%]">
                    <video
                      className="absolute inset-0 w-full h-full object-cover"
                      src={media.url}
                      controls
                      playsInline
                      preload="metadata"
                      aria-label="Alumni testimonial"
                    />
                  </div>
                )}

                {/* Image fallback */}
                {media.type === "image" && (
                  <Media
                    src={media.url}
                    alt="Alumni testimonial"
                    className="w-full h-auto object-cover"
                  />
                )}

              </motion.div>
            ))}
          </motion.div>
        </>
      )}

    </section>
  );
};

export default StudentTestimonials;