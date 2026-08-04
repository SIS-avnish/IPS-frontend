import { useState, useMemo, memo } from "react";
import { motion } from "framer-motion";
import Media, { isVideoUrl } from "../common/Media";
import { YouTubeThumbnail } from "../common/LazyIframe";

/**
 * Extract YouTube video ID
 */
const extractYouTubeId = (url) => {
  if (!url) return null;
  const match = url.match(
    /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|v\/))([a-zA-Z0-9_-]{11})/
  );
  return match ? match[1] : null;
};

/**
 * Determine media type
 */
const getMediaType = (url) => {
  if (!url) return "image";
  if (extractYouTubeId(url)) return "youtube";
  if (isVideoUrl(url)) return "video";
  return "image";
};

const StudentTestimonials = memo(({
  title,
  testimonials,
  videoTitle,
  videos,
  hideSubtitle = false,
  isSocialActivities = false,
}) => {
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [selectedTextTestimonial, setSelectedTextTestimonial] = useState(null);

  const textTestimonials = useMemo(() => (testimonials || []).map((item) => ({
    name: item.name,
    text: item.story,
    image: item.image,
    designation: item.designation,
  })), [testimonials]);

  const videoTestimonials = useMemo(() => (videos || []).map((url) => ({
    url,
    type: getMediaType(url),
    youtubeId: extractYouTubeId(url),
  })), [videos]);

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.12 } },
  };

  const card = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  if (!textTestimonials.length && !videoTestimonials.length) return null;

  return (
    <section className="py-12 px-4 md:px-8 bg-gray-50">

      {/* HEADING */}
      {title && (
        <div className="max-w-6xl mx-auto text-center mb-10">
          <h2 className="text-xl md:text-2xl font-bold">{title}</h2>
        </div>
      )}

      {/* ================= TEXT SECTION ================= */}
      {textTestimonials.length > 0 && (
        <>
          {!hideSubtitle && (
            <div className="max-w-6xl mx-auto text-center mb-6">
              <p className="text-lg font-semibold">
                Testimonials
              </p>
            </div>
          )}

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
                onClick={() => setSelectedTextTestimonial(t)}
                className="bg-white rounded-2xl shadow-md p-6 border flex flex-col text-left cursor-pointer"
              >
                <div className="flex items-center gap-4 mb-4">
                  {t.image && (
                    <div
                      onClick={(e) => {
                        e.stopPropagation();
                        document.querySelectorAll('video').forEach(v => v.pause());
                        setSelectedMedia({
                          url: t.image,
                          type: getMediaType(t.image),
                          youtubeId: extractYouTubeId(t.image),
                        });
                      }}
                      className={isSocialActivities 
                        ? "cursor-pointer w-24 h-16 md:w-32 md:h-20 flex-shrink-0 rounded-lg overflow-hidden border border-gray-200" 
                        : "cursor-pointer w-20 h-20 md:w-24 md:h-24 flex-shrink-0"
                      }
                    >
                      <Media
                        src={t.image}
                        alt={t.name}
                        className={isSocialActivities 
                          ? "w-full h-full object-cover" 
                          : "w-full h-full rounded-full object-cover border border-gray-200"
                        }
                      />
                    </div>
                  )}
                  <div>
                    <h3 className="text-lg font-bold text-[#002147]">{t.name}</h3>
                    {t.designation && (
                      <p className="text-sm text-gray-500">{t.designation}</p>
                    )}
                  </div>
                </div>

                <p className="text-gray-600 leading-relaxed text-sm md:text-base line-clamp-4">
                  {t.text}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </>
      )}

      {/* ================= VIDEO SECTION ================= */}
      {videoTestimonials.length > 0 && (
        <>
          <div className="max-w-6xl mx-auto text-center mt-16 mb-6">
            <p className="text-lg font-semibold">
              {videoTitle || "Alumni Video Testimonials"}
            </p>
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
                onClick={() => {
                  document.querySelectorAll('video').forEach(v => v.pause());
                  setSelectedMedia(media);
                }}
                className="bg-white rounded-2xl shadow-md border overflow-hidden cursor-pointer"
              >
                {media.type === "youtube" && (
                  <YouTubeThumbnail
                    videoId={media.youtubeId}
                    title="Alumni testimonial"
                    autoplayOnClick={false}
                  />
                )}

                {media.type === "video" && (
                  <div className="relative w-full pt-[56.25%]">
                    <video
                      className="absolute inset-0 w-full h-full object-cover"
                      src={media.url}
                      controls
                      playsInline
                      preload="metadata"
                      onPlay={(e) => {
                        document.querySelectorAll('video').forEach(v => {
                          if (v !== e.target) v.pause();
                        });
                      }}
                    />
                  </div>
                )}

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

      {/* ================= TEXT MODAL ================= */}
      {selectedTextTestimonial && (
        <div
          className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4"
          onClick={() => setSelectedTextTestimonial(null)}
        >
          <div
            className="bg-white rounded-xl w-full max-w-md sm:max-w-lg md:max-w-2xl relative overflow-hidden p-6 md:p-8 flex flex-col max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedTextTestimonial(null)}
              className="absolute top-3 right-3 text-gray-500 hover:text-black w-8 h-8 z-10 flex items-center justify-center text-xl font-bold"
            >
              ✕
            </button>
            <div className="flex items-center gap-4 mb-6 pr-8">
              {selectedTextTestimonial.image && (
                <div className={isSocialActivities 
                  ? "w-28 h-20 md:w-36 md:h-24 flex-shrink-0 rounded-lg overflow-hidden border border-gray-200" 
                  : "w-16 h-16 md:w-20 md:h-20 flex-shrink-0"
                }>
                  <Media
                    src={selectedTextTestimonial.image}
                    alt={selectedTextTestimonial.name}
                    className={isSocialActivities 
                      ? "w-full h-full object-cover" 
                      : "w-full h-full rounded-full object-cover border border-gray-200"
                    }
                  />
                </div>
              )}
              <div>
                <h3 className="text-xl font-bold text-[#002147]">{selectedTextTestimonial.name}</h3>
                {selectedTextTestimonial.designation && (
                  <p className="text-sm text-gray-500">{selectedTextTestimonial.designation}</p>
                )}
              </div>
            </div>
            <div className="overflow-y-auto pr-2 custom-scrollbar">
              <p className="text-gray-700 leading-relaxed text-sm md:text-base whitespace-pre-line">
                {selectedTextTestimonial.text}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ================= RESPONSIVE MODAL ================= */}
      {selectedMedia && (
        <div
          className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4"
          onClick={() => setSelectedMedia(null)}
        >
          <div
            className="
              bg-white 
              rounded-xl 
              w-full 
              max-w-md 
              sm:max-w-lg 
              md:max-w-2xl 
              lg:max-w-3xl
              relative
              overflow-hidden
            "
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedMedia(null)}
              className="absolute top-3 right-3 bg-black text-white rounded-full w-8 h-8 z-10 flex items-center justify-center"
            >
              ✕
            </button>

            {selectedMedia.type === "youtube" && (
              <div className="relative w-full pt-[56.25%]">
                <iframe
                  className="absolute inset-0 w-full h-full"
                  src={`https://www.youtube.com/embed/${selectedMedia.youtubeId}?autoplay=1`}
                  title="Alumni testimonial"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            )}

            {selectedMedia.type === "video" && (
              <video
                className="w-full max-h-[75vh]"
                src={selectedMedia.url}
                controls
                autoPlay
                onPlay={(e) => {
                  document.querySelectorAll('video').forEach(v => {
                    if (v !== e.target) v.pause();
                  });
                }}
              />
            )}

            {selectedMedia.type === "image" && (
              <img
                src={selectedMedia.url}
                alt="Preview"
                className="w-full max-h-[75vh] object-contain"
              />
            )}
          </div>
        </div>
      )}
    </section>
  );
});
export default StudentTestimonials;