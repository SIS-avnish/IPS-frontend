

import { useState, memo } from "react";
import { motion } from "framer-motion";
import heroFallback from "../../assets/Images/hero.jpg";
import Media from "../common/Media";
import EnquiryForm from "../common/EnquiryForm";

export default memo(function Admission({ data }) {
  const [showVideo, setShowVideo] = useState(false);

  // Fallback values if API data is not available
  const heroImage = data?.images?.[0] || heroFallback;
  const description =
    data?.description ||
    "Where Knowledge, Skills and Values Transform the Future";
  const ctaText = data?.cta_text || "Explore Now";
  const videoUrl = data?.cta_link || "";

  console.log("Admission component received data:", data);
  console.log("Hero image:", heroImage);

  return (
    <div className="w-full px-2">

      {/* HERO */}
      <section className="relative w-full h-[90vh] 
                          max-[991px]:h-[60vh] 
                          max-[576px]:h-[65vh] 
                          pb-28 overflow-visible bg-gray-200">

        {/* Background */}
        <Media
          src={heroImage}
          alt="Hero Background"
          loading="eager"
          fetchpriority="high"
          decoding="async"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* SMALLER OVERLAY BOX */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.15 }}
          className="absolute left-0 -bottom-12
                        bg-[#F9F4E1]
                        max-w-[637px]
                        px-8 py-8
                        shadow-lg
                        max-[991px]:w-[75%] max-[991px]:px-6 max-[991px]:py-6 max-[991px]:-bottom-10
                        max-[576px]:w-[90%] max-[576px]:px-5 max-[576px]:py-5 max-[576px]:-bottom-8">

          <h1 className="text-[#00A7C4]
                         text-[1.3rem]
                        sm:text-[2.2rem]
                        lg:text-[3rem]
                        leading-tight 
                        lg:leading-[60px]
                        font-medium">
            {description}
          </h1>

          {/* <button
            onClick={() => setShowVideo(true)}
            className="mt-5 flex items-center gap-3
                       border border-[#0B2C4D]
                       text-[#0B2C4D]
                       px-5 py-2 bg-[#fff]
                       transition-all duration-300
                       hover:-translate-y-1 hover:scale-105
                       hover:shadow-[0_10px_25px_rgba(0,0,0,0.25)]">

            <Play size={18} fill="currentColor" />
            {ctaText}
          </button> */}
        </motion.div>

        {/* VIDEO MODAL */}
        {showVideo && videoUrl && (
          <div
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-[999]"
            onClick={() => setShowVideo(false)}
          >
            <div
              className="w-[90%] max-w-[900px] relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setShowVideo(false)}
                className="absolute -top-3 -right-3 bg-[#002147] text-white
                           rounded-full w-[32px] h-[32px]
                           flex items-center justify-center shadow-lg z-[99]">
                ✕
              </button>

              <div className="relative pt-[56.25%]">
                <iframe
                  src={videoUrl}
                  className="absolute inset-0 w-full h-full rounded-lg"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
          </div>
        )}

        {/* ENQUIRY FORM ON HERO - Fixed positioning */}
        <div className="absolute right-4 top-1/2 -translate-y-1/2 z-40
                        w-[90%] max-w-md
                        bg-[#F0EEEF] rounded-xl shadow-2xl overflow-hidden
                        max-[768px]:right-2 max-[576px]:max-w-sm">
          
          {/* Header */}
          <div className="bg-[#0066A6] px-5 py-4">
            <h4 className="text-white text-lg font-semibold">Enquiry</h4>
          </div>

          {/* Form */}
          <div className="p-5 sm:p-7">
            <EnquiryForm
              collegeSlug="ipsa"
              compact
              onSuccess={() => {}}
            />
          </div>
        </div>
      </section>

    </div>
  );
})
