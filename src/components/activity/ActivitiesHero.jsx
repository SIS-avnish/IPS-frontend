// src/components/Activities/Hero.jsx
import { memo } from "react";
import { motion } from "framer-motion";
import activitiesImg from "../../assets/Images/activities.jpg";
import Media from "../common/Media";

const Hero = memo(({ heroImage, description, ctaText, ctaLink }) => {
  const bgImage = heroImage || activitiesImg;

  // Parse description like "Events\n365 days of celebration"
  const descParts = description ? description.split("\n") : ["Events", "365 days of celebration"];

  return (
    <section className="w-full relative overflow-visible pb-20 sm:pb-48 lg:pb-26">

      {/* HERO IMAGE AREA */}
      <div className="relative h-[60vh] sm:h-[55vh] md:h-[90vh] min-h-[420px]">

        <Media
          src={bgImage}
          alt="Activities Hero"
          loading="eager"
          fetchpriority="high"
          decoding="async"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* OPTIONAL subtle dark gradient for readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-black/10 to-transparent" />

        {/* OVERLAP CARD */}
        <motion.div
          initial={{ opacity: 0, y: 45 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.15 }}
          className="
            absolute left-0 bottom-0
            translate-y-1/5
            bg-[#F9F4E1]
            w-full sm:w-[82%] lg:w-[70%]
            max-w-2xl
            px-6 sm:px-8 lg:px-10
            py-8 sm:py-10 lg:py-12
            shadow-xl
            z-20
          "
        >

          <h1 className="
            text-[#0066A6]
            text-xl sm:text-3xl md:text-4xl lg:text-5xl
            leading-tight font-medium
          ">
            {descParts.map((part, i) => (
              <span key={i}>
                {part}
                {i < descParts.length - 1 && <br />}
              </span>
            ))}
          </h1>

          {/* <button
            onClick={() => ctaLink && window.open(ctaLink, "_blank")}
            className="
              mt-6 flex items-center gap-3
              border border-[#0B2C4D]
              text-[#0B2C4D]
              px-6 py-3
              font-medium text-base
              hover:bg-[#0B2C4D] hover:text-white
              transition duration-300
            "
          >
            {ctaText || "Explore Now"}
          </button> */}

        </motion.div>

      </div>
    </section>
  );
});
export default Hero;