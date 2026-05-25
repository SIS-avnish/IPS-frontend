import { memo } from "react";
import { motion } from "framer-motion";
import { resolveImageUrl } from "../../services/api";
import Media from "../common/Media";

export default memo(function Hero({ data }) {
  if (!data) return null;

  const heroImage = data.images?.[0] ? resolveImageUrl(data.images[0]) : "";
  const descriptionLines = (data.description || "").split("\n");

  return (
    <section className="
      relative mb-12 sm:mb-16 lg:mb-20
      w-full max-w-[1492px]
      h-[420px] sm:h-[520px] md:h-[620px] lg:h-[740px]
      mx-auto px-4
    ">

      {/* Background image */}
      <Media
        src={heroImage}
        alt="Hero"
        loading="eager"
        fetchPriority="high"
        decoding="async"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Bottom-left overlay box */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut", delay: 0.15 }}
        className="absolute bottom-0 left-0
        translate-y-0 lg:translate-y-1/7
        bg-[#F9F4E1]
        w-full sm:w-[85%] md:w-[70%] lg:w-[40%] xl:w-[35%]
        max-w-3xl
        px-4 sm:px-6 md:px-8 lg:px-10
        py-4 sm:py-7 md:py-7 lg:py-5
        z-10"
      >

        <h1 className="
          text-[#0066A6]
          text-xl sm:text-2xl md:text-3xl lg:text-5xl
          leading-tight font-medium
        ">
          {descriptionLines.map((line, i) => (
            <span key={i}>
              {line}
              {i < descriptionLines.length - 1 && <br />}
            </span>
          ))}
        </h1>

        {/* CTA button */}
       {/*  <button
          className="mt-4 sm:mt-5 md:mt-6
               flex items-center gap-3
               border border-[#0B2C4D]
               text-[#0B2C4D]
               px-4 sm:px-5 md:px-6
               py-2 sm:py-2.5 md:py-3
               text-sm sm:text-base
               font-medium
               hover:bg-[#0B2C4D] hover:text-white
               transition duration-300"
        >
          {data.cta_text || "Explore Now"}
        </button> */}

      </motion.div>

    </section>
  );
})
