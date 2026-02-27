import { motion } from "framer-motion";
import { resolveImageUrl } from "../../services/api";
import Media from "../common/Media";

const slideFromSide = (fromLeft) => ({
  hidden: { opacity: 0, x: fromLeft ? -30 : 30 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.45, ease: "easeOut" } },
});

const scaleUp = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: "easeOut" } },
};

const badgeColors = ["#FFC73E", "#FF7373", "#0CC2FE", "#FFC73E"];

export default function FacilityBlocks({ wellnessCenter, transport, canteen, mess, sportsFacility }) {
  const sections = [wellnessCenter, transport, canteen, mess].filter(Boolean);

  const blocks = sections.map((section, i) => ({
    badge: section.tag || section.title,
    color: badgeColors[i % badgeColors.length],
    title: section.title,
    text: section.description,
    img: resolveImageUrl(section.image) || null,
    reverse: section.image_position === "right" || i % 2 !== 0,
  }));

  if (blocks.length === 0) return null;

  return (
    <section className="py-[80px] sm:py-[60px] xs:py-[40px]">
      <div className="max-w-7xl mx-auto px-4 sm:px-5 py-4">

        {blocks.map((b, i) => (
          <div
            key={i}
            className="grid lg:grid-cols-2 gap-10 sm:gap-8 gap-y-8 items-center mb-[30px] sm:mb-[40px]"
          >

            {/* TEXT */}
            <motion.div
              variants={slideFromSide(!b.reverse)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              className={b.reverse ? "lg:order-2 lg:pl-10" : ""}
            >

              <div
                className="px-4 py-1 text-[#002147] text-xl sm:text-lg text-base font-medium w-fit mb-2"
                style={{ backgroundColor: b.color }}
              >
                {b.badge}
              </div>

              <h2 className="text-3xl sm:text-6xl text-xl text-[#002147] font-medium whitespace-pre-line leading-snug">
                {b.title}
              </h2>

              <div className="w-44 h-[2px] bg-[#fcb001] mt-2"></div>

              <p className="text-[#3A3A3A] mt-5 mb-2 text-base sm:text-[15px] leading-relaxed">
                {b.text}
              </p>

            </motion.div>

            {/* IMAGE */}
            <motion.div
              variants={scaleUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              className={b.reverse ? "lg:order-1" : ""}
            >

              {b.img ? (
                <Media
                  src={b.img}
                  alt={b.badge}
                  className="w-full h-[456px] lg:h-[456px] md:h-[380px] sm:h-[300px] h-[240px] object-cover"
                />
              ) : (
                <div className="w-full h-[456px] lg:h-[456px] md:h-[380px] sm:h-[300px] h-[240px] bg-[#D9D9D9]"></div>
              )}

            </motion.div>

          </div>
        ))}

        {/* SPORTS FACILITY (HTML from API) */}
        {sportsFacility?.html && (
          <motion.div
            variants={scaleUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="mt-[30px] sm:mt-[40px]"
          >
            <div
              className="sports-facility-table w-full overflow-x-auto [&_table]:w-full [&_table]:border-collapse [&_td]:border [&_td]:border-[#e0e0e0] [&_td]:px-4 [&_td]:py-3 [&_td]:text-[#3A3A3A] [&_td]:text-sm [&_td]:font-[Verdana,sans-serif] [&_a]:text-[#1155cc] [&_a]:underline"
              dangerouslySetInnerHTML={{ __html: sportsFacility.html }}
            />
          </motion.div>
        )}

      </div>
    </section>
  );
}
