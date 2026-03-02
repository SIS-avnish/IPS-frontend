import { useEffect, useState, useMemo, memo } from "react";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import Media from "../common/Media";
import { fetchPageData, resolveImageUrl } from "../../services/api";
import { PageSkeleton } from "../common/SkeletonLoader";
import useSEO from "../../hooks/useSEO";
import activitiesFallback from "../../assets/Images/activities.jpg";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

const cardVariant = {
  hidden: { opacity: 0, y: 25 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, delay: i * 0.08, ease: "easeOut" },
  }),
};

/**
 * Derive a URL-friendly route slug from a card title.
 * Uses a known-title map first, then falls back to a generic slugify.
 */
const TITLE_SLUG_MAP = {
  "cultural activities": "cultural",
  "event celebration": "events",
  "workshops": "workshop",
  "student clubs": "clubs",
  "social activities": "social",
  "alumni testimonials": "alumni",
  "news & media": "news",
};

function titleToSlug(title) {
  if (!title) return "";
  const lower = title.trim().toLowerCase();
  if (TITLE_SLUG_MAP[lower]) return TITLE_SLUG_MAP[lower];
  // Generic fallback: lowercase, strip non-alphanumeric, replace spaces with hyphens
  return lower.replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-");
}

const MainActivityPage = memo(() => {
  const { collegeSlug } = useParams();
  const slug = collegeSlug || "ipsa";

  const [pageData, setPageData] = useState(null);
  const [sections, setSections] = useState(null);
  const [loading, setLoading] = useState(true);

  useSEO(pageData);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);

    fetchPageData(slug, "activities")
      .then((data) => {
        if (!cancelled) {
          setPageData(data);
          setSections(data.sections || {});
        }
      })
      .catch((err) => console.error("Failed to fetch activities page:", err))
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => { cancelled = true; };
  }, [slug]);

  // Extract section data
  const hero = sections?.hero || {};
  const about = useMemo(() => {
    if (!sections) return null;
    // Find the first "text" type section (about)
    return Object.values(sections).find((s) => s.type === "text") || null;
  }, [sections]);

  const cardsSection = useMemo(() => {
    if (!sections) return null;
    // Find the first "cards" type section
    return Object.values(sections).find((s) => s.type === "cards") || null;
  }, [sections]);

  const heroImage = hero.images?.[0] ? resolveImageUrl(hero.images[0]) : activitiesFallback;
  const descParts = hero.description ? hero.description.split("\n") : [];

  const cards = cardsSection?.cards || [];

  if (loading) return <PageSkeleton />;

  return (
    <div className="w-full overflow-x-hidden">
      {/* ── HERO ── */}
      <section className="w-full relative overflow-visible pb-20 sm:pb-48 lg:pb-26">
        <div className="relative h-[60vh] sm:h-[55vh] md:h-[90vh] min-h-[420px]">
          <Media
            src={heroImage}
            alt="Activities Hero"
            loading="eager"
            fetchpriority="high"
            decoding="async"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-black/10 to-transparent" />

          <motion.div
            initial={{ opacity: 0, y: 45 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.15 }}
            className="
              absolute left-0 bottom-0 translate-y-1/5
              bg-[#E9E9E9] w-full sm:w-[82%] lg:w-[70%] max-w-2xl
              px-6 sm:px-8 lg:px-10 py-8 sm:py-10 lg:py-12
              shadow-xl z-20
            "
          >
            <h1 className="text-[#0B2C4D] text-xl sm:text-3xl md:text-4xl lg:text-5xl leading-tight font-medium">
              {descParts.length > 0
                ? descParts.map((part, i) => (
                    <span key={i}>
                      {part}
                      {i < descParts.length - 1 && <br />}
                    </span>
                  ))
                : "A Calendar Full of Learning"}
            </h1>

            {hero.cta_text && (
              <Link
                to={hero.cta_link || `/${slug}/activities/events`}
                className="
                  mt-6 inline-flex items-center gap-3
                  border border-[#0B2C4D] text-[#0B2C4D]
                  px-6 py-3 font-medium text-base
                  hover:bg-[#0B2C4D] hover:text-white
                  transition duration-300
                "
              >
                {hero.cta_text}
              </Link>
            )}
          </motion.div>
        </div>
      </section>

      {/* ── CATEGORIES SECTION ── */}
      <section className="py-12 md:py-20 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="grid md:grid-cols-2 gap-6 sm:gap-4 items-start mb-10"
          >
            <div>
              <h2 className="text-2xl md:text-5xl sm:text-3xl font-medium leading-tight text-[#0B2C4D]">
                {about?.title || cardsSection?.title || "365 Days to Become Your Best"}
              </h2>
              <div className="w-40 h-[2px] bg-red-400 mt-3" />
            </div>
            <p className="text-gray-600 text-base sm:text-[15px]">
              {about?.content ||
                "Life at IPS Academy is a melting pot of diverse cultures, a plethora of events, learning opportunities and peer activities that enhance your experience on campus."}
            </p>
          </motion.div>

          {/* ── CATEGORY CARDS GRID ── */}
          {cards.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {cards.map((card, idx) => {
                const routeSlug = titleToSlug(card.title);
                const iconUrl = card.icon ? resolveImageUrl(card.icon) : null;

                return (
                  <motion.div
                    key={routeSlug || idx}
                    variants={cardVariant}
                    initial="hidden"
                    whileInView="visible"
                    custom={idx}
                    viewport={{ once: true, amount: 0.1 }}
                    className={[
                      idx === cards.length - 1 && cards.length % 3 === 1 ? "lg:col-start-2" : "",
                      idx === cards.length - 1 && cards.length % 2 === 1 ? "sm:col-start-2" : "",
                    ].filter(Boolean).join(" ") || undefined}
                  >
                    <Link
                      to={`/${slug}/activities/${routeSlug}`}
                      className="group relative block rounded-xl overflow-hidden shadow-md hover:shadow-2xl transition-shadow duration-300 h-[280px] sm:h-[300px]"
                    >
                      {/* Card image */}
                      {iconUrl ? (
                        <LazyLoadImage
                          src={iconUrl}
                          alt={card.title}
                          effect="blur"
                          className="absolute inset-0 w-full h-full object-cover transition-transform duration-400 ease-in-out group-hover:scale-110"
                          wrapperClassName="absolute inset-0 w-full h-full"
                        />
                      ) : (
                        <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-[#0B2C4D] to-[#1a4a7a]" />
                      )}

                      {/* Default state: subtle bottom gradient + centered title */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent transition-opacity duration-300 ease-in-out group-hover:opacity-0" />

                      <h3 className="absolute inset-0 flex items-center justify-center text-white text-xl sm:text-2xl font-semibold text-center px-4 drop-shadow-lg transition-opacity duration-300 ease-in-out group-hover:opacity-0 z-10">
                        {card.title}
                      </h3>

                      {/* Hover state: dark overlay with description */}
                      <div className="absolute inset-0 bg-[#0B2C4D]/85 flex flex-col items-center justify-center px-6 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out z-10">
                        <h3 className="text-white text-xl sm:text-2xl font-semibold mb-3">
                          {card.title}
                        </h3>
                        <div className="w-10 h-[2px] bg-red-400 mb-4" />
                        <p className="text-white/80 text-sm leading-relaxed max-w-[260px]">
                          {card.description}
                        </p>
                        <span className="mt-5 inline-flex items-center gap-2 text-red-400 text-sm font-medium">
                          Explore →
                        </span>
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  );
});

export default MainActivityPage;
