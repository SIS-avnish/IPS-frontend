import { motion } from "framer-motion";
import { resolveImageUrl } from "../../services/api";

export default function Hero({ data }) {
  const heroImage = data.images?.[0] ? resolveImageUrl(data.images[0]) : "";
  const description = data.description || "";
  const ctaText = data.cta_text || "Explore Now";
  const ctaLink = data.cta_link || "#";
  const [title, subtitle] = description.split("\n");


  return (
    <section id="banner" className="
          relative mb-12 sm:mb-16 lg:mb-20
          w-full max-w-[1592px]
          h-[420px] sm:h-[520px] md:h-[620px] lg:h-[736px]
          mx-auto px-4
        ">
    
          {/* Background image */}
          <img
            src={heroImage}
            alt="Hero"
            loading="eager"
            fetchpriority="high"
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
            bg-[#E9E9E9]
            w-full sm:w-[85%] md:w-[70%] lg:w-[40%] xl:w-[40%]
            max-w-3xl
            px-4 sm:px-6 md:px-8 lg:px-10
            py-4 sm:py-7 md:py-7 lg:py-3
            z-10"
          >
    
            <div className="text-[#0B2C4D] whitespace-pre-line">
  <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-6xl  font-medium">
    {title}
  </h1>

  {subtitle && (
    <p className="mt-2 text-sm sm:text-base md:text-lg lg:text-xl text-[#0B2C4D]/80">
      {subtitle}
    </p>
  )}
</div>

    
            {/* CTA button */}
            <a
              href={ctaLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              <button
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
                {ctaText}
              </button>
            </a>
    
          </motion.div>
    
        </section>
  );
}
