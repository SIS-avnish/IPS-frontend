import { memo } from "react";
import { motion } from "framer-motion";
import { resolveImageUrl } from "../../services/api";
import placementImg from "../../assets/Images/placement.jpg";
import Media from "../common/Media";

export default memo(function Hero({ data }) {
  const heroImage = data?.images?.[0]
    ? resolveImageUrl(data.images[0])
    : placementImg;
  const description = data?.description || "Your Launchpad for\nSuccess";
  const ctaText = data?.cta_text || "Explore Now";
  const ctaLink = data?.cta_link || "";

  // Split description by newline to render with <br />
  const descLines = description.split("\n");

  return (
    <section className="relative mb-10 w-full h-[320px] sm:h-[420px] md:h-[700px] lg:h-[750px] px-3">

      <Media
        src={heroImage}
        alt="hero"
        loading="eager"
        fetchPriority="high"
        decoding="async"
        className="absolute inset-0 w-full h-full object-cover"
      />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut", delay: 0.15 }}
        className="absolute bottom-0 left-0 transform translate-y-1/4
                bg-[#F9F4E1] 
                w-full sm:w-[80%] lg:w-[50%] 
                max-w-2xl 
                px-4 sm:px-6 lg:px-10 
                py-6 sm:py-8 lg:py-8"
      >
        <h1
          className="text-[#0066A6] 
                 text-xl sm:text-2xl md:text-4xl lg:text-6xl 
                 leading-tight font-medium whitespace-pre-line"
        >
          {descLines.map((line, i) => (
            <span key={i}>
              {line}
              {i < descLines.length - 1 && <br />}
            </span>
          ))}
        </h1>

        {/* CTA button */}
        {/* {ctaText && (
          <button
            onClick={() => ctaLink && (window.location.href = ctaLink)}
            className="mt-4 sm:mt-6 flex items-center gap-3 
               border border-[#0B2C4D] 
               text-[#0B2C4D] 
               px-5 sm:px-6 py-2.5 sm:py-3
               text-sm sm:text-base
               font-medium
               hover:bg-[#0B2C4D] hover:text-white 
               transition duration-300"
          >
            {ctaText}
          </button>
        )} */}
      </motion.div>
    </section>
  );
})
