import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { motion } from "framer-motion";
import { fetchCollegeFaculties, fetchCollegePageData } from "../services/api";
import { isVideoUrl } from "../components/common/Media";
import Hero from "../components/colegeTemplate/Hero";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

const cardVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, delay: i * 0.06, ease: "easeOut" },
  }),
};

export default function AllFaculty() {
  const { collegeSlug } = useParams();
  const [faculty, setFaculty] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedFaculty, setSelectedFaculty] = useState(null);
  const [heroData, setHeroData] = useState(null);

  useEffect(() => {
    if (!collegeSlug) return;
    let cancelled = false;
    setLoading(true);

    Promise.all([
      fetchCollegeFaculties(collegeSlug),
      fetchCollegePageData(collegeSlug, "faculties"),
    ])
      .then(([facultyData, pageData]) => {
        if (!cancelled) {
          setFaculty(facultyData || []);
          setHeroData(pageData?.sections?.hero || null);
        }
      })
      .catch((err) => {
        console.error("Failed to fetch data:", err);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [collegeSlug]);

  return (
    <div className="w-full overflow-x-hidden">
    {heroData && <Hero data={heroData} />}
    <section className="bg-gradient-to-br from-[#0b1c39] to-[#112a52] text-white min-h-screen py-12 sm:py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.h2
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="text-3xl sm:text-4xl md:text-5xl font-medium text-center"
        >
          Our Faculty
        </motion.h2>

        <div className="w-24 sm:w-32 h-[2px] bg-white mt-3 mb-4 mx-auto"></div>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="text-gray-300 max-w-2xl mb-10 sm:mb-12 text-sm sm:text-base text-center mx-auto"
        >
          Our faculty team consists of renowned academicians, industry
          professionals and research scholars who bring deep domain expertise
          into every classroom.
        </motion.p>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-white"></div>
          </div>
        ) : faculty.length === 0 ? (
          <p className="text-center text-gray-400 py-20 text-lg">
            No faculty found.
          </p>
        ) : (
          <div className="flex flex-wrap justify-center gap-6 sm:gap-8">
            {faculty.map((f, i) => (
              <motion.div
                key={f.id}
                variants={cardVariant}
                initial="hidden"
                whileInView="visible"
                custom={i}
                viewport={{ once: true, amount: 0.1 }}
                onClick={() => setSelectedFaculty(f)}
                className="w-[290px] cursor-pointer bg-white/10 backdrop-blur rounded overflow-hidden hover:translate-y-[-6px] transition"
              >
                {isVideoUrl(f.image) ? (
                  <video
                    src={f.image}
                    className="w-full h-56 sm:h-60 md:h-64 object-cover"
                    muted
                    autoPlay
                    loop
                    playsInline
                    controls
                  />
                ) : (
                  <LazyLoadImage
                    src={f.image}
                    alt={f.name}
                    effect="blur"
                    className="w-full h-56 sm:h-60 md:h-64 object-cover"
                    wrapperClassName="w-full"
                  />
                )}

                <div className="p-4 sm:p-5 text-center sm:text-left">
                  <h5 className="font-medium text-base sm:text-lg">
                    {f.name}
                  </h5>
                  <span className="text-yellow-400 text-xs sm:text-sm">
                    {f.designation}
                  </span>
                  <p className="text-gray-300 text-xs sm:text-sm mt-2">
                    {f.department}
                  </p>
                  <p className="text-gray-300 text-xs sm:text-sm mt-1 line-clamp-3">
                    {f.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
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
            className="bg-white text-black rounded-lg w-full max-w-xl max-h-[85vh] overflow-y-auto shadow-2xl"
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
    </div>
  );
}
