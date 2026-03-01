import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { motion } from "framer-motion";
import { fetchCollegeFaculties } from "../../services/api";
import { isVideoUrl } from "../common/Media";

const DISPLAY_LIMIT = 4;

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

const cardVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.35, delay: i * 0.06, ease: "easeOut" },
  }),
};

export default function Faculty({ collegeSlug }) {
  const navigate = useNavigate();
  const [faculty, setFaculty] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedFaculty, setSelectedFaculty] = useState(null);
  const displayedFaculty = faculty.slice(0, DISPLAY_LIMIT);
  const hasMore = faculty.length > DISPLAY_LIMIT;

  useEffect(() => {
    if (!collegeSlug) return;
    let cancelled = false;
    setLoading(true);

    fetchCollegeFaculties(collegeSlug)
      .then((data) => {
        if (!cancelled) setFaculty(data || []);
      })
      .catch((err) => {
        console.error("Failed to fetch faculties:", err);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => { cancelled = true; };
  }, [collegeSlug]);

  return (
    <section id="faculties" className="bg-gradient-to-br from-[#0b1c39] to-[#112a52] text-white py-12 sm:py-14 md:py-16">

      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="text-2xl sm:text-3xl md:text-5xl font-medium text-center md:text-left"
        >
          Faculty
        </motion.h2>

        <div className="w-24 sm:w-32 h-[2px] bg-white mt-3 mb-4 mx-auto md:mx-0"></div>

        <h4 className="text-lg sm:text-xl mb-4 text-center md:text-left">
          Be trained by <span className="text-yellow-400">India's leading experts</span>
        </h4>

        <p className="text-gray-300 max-w-xl mb-8 sm:mb-10 text-sm sm:text-base text-center md:text-left mx-auto md:mx-0">
          Our faculty team consists of renowned academicians, industry professionals
          and research scholars who bring deep domain expertise into every classroom.
        </p>

        {loading ? (
          <div className="flex justify-center py-10">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-white"></div>
          </div>
        ) : (
          <>
            {/* CARDS */}
            <div className="flex flex-wrap justify-center gap-6 sm:gap-8">
              {displayedFaculty.map((f, i) => (
                <motion.div
                  key={f.id}
                  variants={cardVariant}
                  initial="hidden"
                  whileInView="visible"
                  custom={i}
                  viewport={{ once: true, amount: 0.1 }}
                  onClick={() => setSelectedFaculty(f)}
                  className="w-full max-w-[290px] cursor-pointer bg-white/10 backdrop-blur rounded overflow-hidden hover:translate-y-[-6px] transition"
                >
                  {isVideoUrl(f.image) ? (
                    <video
                      src={f.image}
                      className="w-full h-56 sm:h-60 md:h-64 object-cover"
                      muted autoPlay loop playsInline controls
                    />
                  ) : (
                    <LazyLoadImage src={f.image} alt={f.name} effect="blur" className="w-full h-56 sm:h-60 md:h-64 object-cover" wrapperClassName="w-full" />
                  )}

                  <div className="p-4 sm:p-5 text-center sm:text-left">
                    <h5 className="font-medium text-base sm:text-lg">{f.name}</h5>
                    <span className="text-yellow-400 text-xs sm:text-sm">{f.designation}</span>
                    <p className="text-gray-300 text-xs sm:text-sm mt-2">{f.department}</p>
                    <p className="text-gray-300 text-xs sm:text-sm mt-1 line-clamp-3">{f.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {hasMore && (
              <div className="flex justify-center mt-8">
                <motion.button
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  
                  viewport={{ once: true, amount: 0.1 }}
                  onClick={() => window.open(`/${collegeSlug}/faculties`, "_blank")}
                  className="px-8 py-3 border-2 border-yellow-400 text-yellow-400 rounded-full font-medium hover:bg-yellow-400 hover:text-[#0b1c39] transition-all duration-300"
                >
                  See More Faculty
                </motion.button>
              </div>
            )}
          </>
        )}

      </div>
      {/* MODAL */}
{selectedFaculty && (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center px-4"
    onClick={() => setSelectedFaculty(null)}
  >
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.25 }}
      onClick={(e) => e.stopPropagation()}
      className="
        bg-white text-black rounded-lg
        w-full
        max-w-xl          /* smaller for laptop */
        max-h-[85vh]
        overflow-y-auto
        shadow-2xl
      "
    >
      {/* Image */}
      <div className="bg-gray-100 flex items-center justify-center p-4">
        {isVideoUrl(selectedFaculty.image) ? (
          <video
            src={selectedFaculty.image}
            className="max-h-64 w-auto object-contain rounded"
            controls
          />
        ) : (
          <img
            src={selectedFaculty.image}
            alt={selectedFaculty.name}
            className="max-h-64 w-auto object-contain rounded"
          />
        )}
      </div>

      {/* Content */}
      <div className="px-6 pb-6 pt-4">
        <h3 className="text-lg sm:text-xl font-semibold">
          {selectedFaculty.name}
        </h3>

        <p className="text-red-500 font-medium mt-1">
          {selectedFaculty.designation}
        </p>

        <p className="text-gray-600 mt-2 text-sm">
          {selectedFaculty.department}
        </p>

        <p className="mt-4 text-sm leading-relaxed text-gray-700">
          {selectedFaculty.description}
        </p>

        <button
          onClick={() => setSelectedFaculty(null)}
          className="mt-6 px-5 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
        >
          Close
        </button>
      </div>
    </motion.div>
  </motion.div>
)}
    </section>
  );
}
