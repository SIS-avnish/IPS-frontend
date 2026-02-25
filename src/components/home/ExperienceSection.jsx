import { motion } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import collegeFallback from "../../assets/Images/college.JPG";
import logo360 from "../../assets/logos/360.png";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

const scaleUp = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: "easeOut" } },
};

const VIDEO_EXTENSIONS = [".mp4", ".webm", ".ogg", ".mov", ".avi"];

function getYouTubeId(url) {
  const match = url.match(
    /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|.*[?&]v=))([^"&?/\s]{11})/
  );
  return match ? match[1] : null;
}

function getMediaType(url) {
  if (!url) return "image";
  const lower = url.toLowerCase();
  if (VIDEO_EXTENSIONS.some((ext) => lower.includes(ext))) return "video";
  if (getYouTubeId(url)) return "youtube";
  return "image";
}

export default function ExperienceSection({ data }) {

  const title = data?.title || "Experience IPSA with a 3600 View";
  const mediaSrc = data?.images?.[0] || collegeFallback;
  const mediaType = getMediaType(typeof mediaSrc === "string" ? mediaSrc : "");

  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Mobile: play/pause on scroll via IntersectionObserver
  useEffect(() => {
    if (!isMobile || mediaType === "image") return;
    if (mediaType === "youtube") return; // YouTube handles autoplay via params

    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, [isMobile, mediaType]);

  // Desktop: play on hover
  const handleMouseEnter = () => {
    if (isMobile || mediaType === "image" || mediaType === "youtube") return;
    videoRef.current?.play().catch(() => {});
  };

  const handleMouseLeave = () => {
    if (isMobile || mediaType === "image" || mediaType === "youtube") return;
    const video = videoRef.current;
    if (video) {
      video.pause();
      video.currentTime = 0;
    }
  };

  // Use Cloudinary / external URL directly, or fallback to imported image
  const imageSrc =
    mediaType === "image"
      ? typeof mediaSrc === "string" && mediaSrc.startsWith("http")
        ? mediaSrc
        : collegeFallback
      : null;

  const youtubeId = mediaType === "youtube" ? getYouTubeId(mediaSrc) : null;

  return (
    <section className="max-w-[1140px] mx-auto px-4">
      <div className="py-[70px] max-[991px]:py-[50px] max-[576px]:py-[30px]">
        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="text-[#002147] text-[60px] font-medium mb-3 max-[991px]:text-[48px] max-[576px]:text-[28px] max-[576px]:text-center"
        >
          {title}
        </motion.h2>
        <div className="bg-[#FF7373] w-[380px] h-[2px] mb-12 max-[576px]:w-auto max-[576px]:mx-auto max-[576px]:my-[15px]" />
        <motion.div
          ref={containerRef}
          variants={scaleUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="relative overflow-hidden"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {mediaType === "image" && (
            <>
              <img
                src={imageSrc}
                alt={title}
                className="max-h-[568px] w-full object-cover transition-all duration-[600ms] scale-100 hover:scale-[1.01] hover:shadow-[0_12px_35px_rgba(0,0,0,0.25)]"
              />
              <img
                src={logo360}
                alt="360 view"
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
              />
            </>
          )}

          {mediaType === "video" && (
            <>
              <video
                ref={videoRef}
                src={mediaSrc}
                muted
                loop
                playsInline
                preload="metadata"
                className="max-h-[568px] w-full object-cover transition-all duration-[600ms] scale-100 hover:scale-[1.01] hover:shadow-[0_12px_35px_rgba(0,0,0,0.25)]"
              />
              <img
                src={logo360}
                alt="360 view"
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
              />
            </>
          )}

          {mediaType === "youtube" && (
            <>
              <iframe
                src={`https://www.youtube.com/embed/${youtubeId}?autoplay=${isMobile ? 1 : 0}&mute=1&loop=1&playlist=${youtubeId}&controls=0&modestbranding=1&rel=0`}
                title={title}
                allow="autoplay; encrypted-media"
                allowFullScreen
                className="w-full aspect-video max-h-[568px]"
              />
              <img
                src={logo360}
                alt="360 view"
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
              />
            </>
          )}
        </motion.div>
      </div>
    </section>
  );
}
