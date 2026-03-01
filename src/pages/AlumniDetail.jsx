import React, { useEffect, useState, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { PageSkeleton } from "../components/common/SkeletonLoader";
import { motion } from "framer-motion";
import Hero from "../components/others/Hero";
import { YouTubeThumbnail } from "../components/common/LazyIframe";
import { fetchCollegeAlumniDetail, fetchPageData } from "../services/api";
import useSEO from "../hooks/useSEO";

/**
 * Extract a YouTube video ID from various URL formats:
 *  - https://youtu.be/VIDEO_ID
 *  - https://www.youtube.com/watch?v=VIDEO_ID
 *  - https://www.youtube.com/embed/VIDEO_ID
 *  - https://youtube.com/shorts/VIDEO_ID
 * Returns null if not a YouTube URL.
 */
function extractYouTubeId(url) {
  if (!url) return null;
  const patterns = [
    /youtu\.be\/([A-Za-z0-9_-]{11})/,
    /youtube\.com\/watch\?.*v=([A-Za-z0-9_-]{11})/,
    /youtube\.com\/embed\/([A-Za-z0-9_-]{11})/,
    /youtube\.com\/shorts\/([A-Za-z0-9_-]{11})/,
  ];
  for (const re of patterns) {
    const m = url.match(re);
    if (m) return m[1];
  }
  return null;
}

const AlumniDetail = () => {
  const { collegeSlug, alumniId } = useParams();
  const navigate = useNavigate();
  const [alumni, setAlumni] = useState(null);
  const [heroData, setHeroData] = useState({});
  const [seoData, setSeoData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [lightboxImg, setLightboxImg] = useState(null);

  useSEO(seoData);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const [detail, pageData] = await Promise.all([
          fetchCollegeAlumniDetail(collegeSlug, alumniId),
          fetchPageData(collegeSlug, "activities/alumni"),
        ]);
        setAlumni(detail);
        setSeoData(pageData);
        setHeroData(pageData?.sections?.hero || {});
      } catch (err) {
        console.error("Failed to fetch alumni detail:", err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [collegeSlug, alumniId]);

  // Separate videos into YouTube vs direct
  const { ytVideos, directVideos } = useMemo(() => {
    if (!alumni?.videos?.length) return { ytVideos: [], directVideos: [] };
    const yt = [];
    const direct = [];
    for (const url of alumni.videos) {
      const id = extractYouTubeId(url);
      if (id) yt.push({ id, url });
      else direct.push(url);
    }
    return { ytVideos: yt, directVideos: direct };
  }, [alumni?.videos]);

  const hasGallery = alumni?.gallery_images?.length > 0;
  const hasVideos = ytVideos.length > 0 || directVideos.length > 0;

  if (loading) {
    return <PageSkeleton />;
  }

  if (!alumni) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-500 text-lg">Alumni not found.</p>
      </div>
    );
  }

  return (
    <div>
      {/* HERO */}
      <Hero
        heroImage={heroData.images?.[0]}
        description={alumni.name}
        ctaText={heroData.cta_text}
        ctaLink={heroData.cta_link}
      />

      {/* ALUMNI DETAIL CONTENT */}
      <section className="bg-gray-50 py-10 md:py-14">
        <div className="max-w-5xl mx-auto px-4">
          {/* Back button */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={() => navigate(`/${collegeSlug}/activities/alumni`)}
            className="text-[#002147] text-sm font-medium mb-6 flex items-center gap-1 hover:underline"
          >
            ← Back to Alumni
          </motion.button>

          {/* ─── Profile Card ─── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-white rounded-2xl shadow-md overflow-hidden mb-10"
          >
            {/* Image — full-width on top */}
            {alumni.main_image && (
              <div className="w-full">
                <img
                  src={alumni.main_image}
                  alt={alumni.name}
                  className="w-full h-64 sm:h-80 md:h-96 object-cover"
                />
              </div>
            )}

            {/* Info — below image */}
            <div className="p-6 md:p-8">
              <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1 mb-3">
                <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#002147]">
                  {alumni.name}
                </h1>
                {alumni.achievement && (
                  <span className="text-[#002147]/70 text-sm md:text-base font-medium">
                    {alumni.achievement}
                  </span>
                )}
              </div>

              {alumni.created_at && (
                <p className="text-gray-400 text-xs md:text-sm mb-4">
                  {new Date(alumni.created_at).toLocaleDateString("en-IN", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              )}

              {alumni.description && (
                <p className="text-gray-700 text-sm md:text-base text-justify leading-relaxed whitespace-pre-line">
                  {alumni.description}
                </p>
              )}
            </div>
          </motion.div>

          {/* ─── Gallery ─── */}
          {hasGallery && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mb-10"
            >
              <h2 className="text-lg md:text-xl font-semibold text-[#002147] mb-4">
                Gallery
              </h2>
              <div className="grid gap-3 grid-cols-2 lg:grid-cols-3">
                {alumni.gallery_images.map((img, idx) => (
                  <img
                    key={idx}
                    src={img}
                    alt={`${alumni.name} gallery ${idx + 1}`}
                    loading="lazy"
                    onClick={() => setLightboxImg(img)}
                    className="w-full h-48 sm:h-56 object-cover rounded-xl shadow-sm cursor-pointer hover:opacity-90 transition-opacity"
                  />
                ))}
              </div>
            </motion.div>
          )}

          {/* ─── Videos ─── */}
          {hasVideos && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-lg md:text-xl font-semibold text-[#002147] mb-4">
                Videos
              </h2>
              <div className="grid gap-4 sm:grid-cols-2">
                {/* YouTube videos — thumbnail-first, plays on click */}
                {ytVideos.map(({ id }) => (
                  <div key={id} className="rounded-xl overflow-hidden shadow-sm">
                    <YouTubeThumbnail
                      videoId={id}
                      title={`${alumni.name} video`}
                    />
                  </div>
                ))}
                {/* Direct video URLs (.mp4 etc.) */}
                {directVideos.map((url, idx) => (
                  <video
                    key={idx}
                    src={url}
                    controls
                    preload="metadata"
                    className="w-full h-64 rounded-xl shadow-sm"
                  />
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* ─── Lightbox ─── */}
      {lightboxImg && (
        <div
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
          onClick={() => setLightboxImg(null)}
        >
          <button
            onClick={() => setLightboxImg(null)}
            className="absolute top-4 right-4 text-white text-3xl font-bold hover:opacity-80"
          >
            ✕
          </button>
          <img
            src={lightboxImg}
            alt="Gallery preview"
            className="max-w-full max-h-[90vh] rounded-xl object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
};

export default AlumniDetail;
