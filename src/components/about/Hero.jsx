import { motion } from "framer-motion";
import aboutFallback from "../../assets/Images/about.png";
import { resolveImageUrl } from "../../services/api";
import Media from "../common/Media";

export default function Hero({ data }) {

  const heroImage = data?.images?.[0]
    ? resolveImageUrl(data.images[0])
    : aboutFallback;
  const description = data?.description || "Welcome to Central India's Premier Institute";
  const ctaText = data?.cta_text || "Explore Now";
  const ctaLink = data?.cta_link || "#";

  return (
    <section className="relative w-full h-[88vh] 
                          max-[991px]:h-[60vh] 
                          max-[576px]:h-[65vh] 
                          pb-28 overflow-visible px-2">

      <Media
        src={heroImage}
        alt="About Hero"
        loading="eager"
        fetchpriority="high"
        decoding="async"
        className="absolute inset-0 w-full h-full object-cover"
      />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut", delay: 0.15 }}
        className="absolute left-0 -bottom-12
                        bg-[#E9E9E9]
                        max-w-[637px]
                        px-8 py-8
                        shadow-lg
                        max-[991px]:w-[75%] max-[991px]:px-6 max-[991px]:py-6 max-[991px]:-bottom-10
                        max-[576px]:w-[90%] max-[576px]:px-5 max-[576px]:py-5 max-[576px]:-bottom-8">

        <h1 className="text-[#0B2C4D]
                          text-[1.3rem]
                        sm:text-[2.2rem]
                        lg:text-[3rem]
                        leading-tight 
                        lg:leading-[60px]
                        font-medium">
          {description}
        </h1>

        {/* CTA button */}
        <a
          href={ctaLink}
          className="mt-6 inline-flex items-center gap-3 border border-[#0B2C4D] text-[#0B2C4D] px-7 py-3 hover:bg-[#0B2C4D] hover:text-white transition"
        >
          {ctaText}
        </a>

      </motion.div>

    </section>
  );
}
