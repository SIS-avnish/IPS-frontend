import { memo } from "react";
import { motion } from "framer-motion";
import { resolveImageUrl } from "../../services/api";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export default memo(function Placement({ data, recruiterData, placementStats, provenRecord }) {
  // Split section data (placement)
  const title = data?.title || "";
  const description = data?.description || "";
  const image = data?.image ? resolveImageUrl(data.image) : "";
  const items = data?.items || [];
  const tag = data?.tag || "";
  const imagePosition = data?.image_position || "right";

  // Placement count / course-wise stats
  const allStats = placementStats?.stats || [];
  const highlights = allStats.filter(
    (s) => s.value && s.value !== "null" && ["Students Placed", "Companies in Closed Campus Drive"].some((k) => s.label?.trim().startsWith(k))
  );
  const sectors = allStats.filter(
    (s) => s.value && s.value !== "null" && !["Students Placed", "Companies in Closed Campus Drive", "Sectors"].some((k) => s.label?.trim().startsWith(k))
  );

  // Recruiter logos
  const logos = recruiterData?.items || [];

  if (!data && !placementStats && !recruiterData) return null;

  return (
    <section id="recruiters" className="bg-[#F0EEEF] pt-20 pb-24">
      <div className="max-w-7xl mx-auto px-4">

        {/* SPLIT: image + text */}
        {data && (title || description) && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center mb-16">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className={imagePosition === "left" ? "order-2" : "order-1"}
            >
              {tag && (
                <span className="inline-block bg-[#0CC2FE] text-white text-xs font-semibold px-3 py-1 rounded-full mb-4 uppercase tracking-wide">
                  {tag}
                </span>
              )}
              {title && (
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium text-[#002147] leading-tight mb-4">
                  {title}
                </h2>
              )}
              <div className="h-[2px] w-64 bg-[#FF7373] mb-6" />
              {description && (
                <p className="text-gray-600 leading-relaxed mb-6 whitespace-pre-line">{description}</p>
              )}
              {items.length > 0 && (
                <ul className="space-y-3">
                  {items.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-gray-700">
                      <span className="text-[#0CC2FE] font-bold mt-0.5">✔</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              )}
            </motion.div>

            {image && (
              <motion.div
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className={imagePosition === "left" ? "order-1" : "order-2"}
              >
                <img
                  src={image}
                  alt={title}
                  className="w-full rounded-xl object-cover max-h-[450px]"
                  loading="lazy"
                />
              </motion.div>
            )}
          </div>
        )}

        {/* PLACEMENT STATS BOX */}
        {placementStats && (highlights.length > 0 || sectors.length > 0) && (
          <>
            

            

            <div className="bg-[#002147] p-6 sm:p-10 text-white rounded-xl">
              <h3 className="text-2xl sm:text-3xl font-semibold mb-8">
                {provenRecord?.subtitle || "Placement Highlights"}
              </h3>

              {highlights.length > 0 && (
                <div className="flex flex-wrap items-center gap-6 sm:gap-12 mb-10">
                  {highlights.map((h, i) => (
                    <div
                      key={i}
                      className={`flex items-center gap-3 ${
                        i < highlights.length - 1 ? "pr-6 sm:pr-12 border-r border-white/40" : ""
                      }`}
                    >
                      <span className="text-4xl sm:text-5xl font-bold">{h.value}</span>
                      <span className="uppercase text-xs sm:text-sm max-w-[140px]">{h.label}</span>
                    </div>
                  ))}
                </div>
              )}

              {sectors.length > 0 && (
                <>
                  <h4 className="text-xl sm:text-2xl font-medium mb-4">Sectors</h4>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-y-6 gap-x-4 text-white">
                    {sectors.map((s, i) => (
                      <div key={i} className="border-b border-white/30 pb-2">
                        <span className="text-2xl sm:text-3xl font-bold mr-2">{s.value}</span>
                        <span className="uppercase text-xs sm:text-sm">{s.label}</span>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          </>
        )}

        {/* RECRUITER LOGOS SLIDER */}

         <motion.h2
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className=" mt-10 text-5xl font-medium text-[#002147] leading-tight"
            >
              {provenRecord?.title}
            </motion.h2>
            <div className="h-[2px] w-64 bg-[#FF7373] mt-4 mb-10" />
        {logos.length > 0 && (
          <div className="overflow-hidden mt-14">
            <motion.div
              className="flex gap-6"
              animate={{ x: ["0%", "-50%"] }}
              transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
            >
              {[...logos, ...logos].map((logo, i) => (
                <div
                  key={i}
                  className="min-w-[160px] sm:min-w-[180px] bg-white p-2 rounded-lg flex items-center justify-center shadow-sm flex-shrink-0"
                >
                  <img
                    src={resolveImageUrl(logo.logo)}
                    className="h-[130px] sm:h-[90px] object-contain"
                    alt={logo.name || "Recruiter"}
                    loading="lazy"
                  />
                </div>
              ))}
            </motion.div>
          </div>
        )}

      </div>
    </section>
  );
});