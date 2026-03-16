import { memo, useState } from "react";
import { motion } from "framer-motion";
import { resolveImageUrl } from "../../services/api";
import Media from "../common/Media";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

const itemVariant = {
  hidden: { opacity: 0, x: -15 },
  visible: (i) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.3, delay: i * 0.06, ease: "easeOut" },
  }),
};

const slideLeft = {
  hidden: { opacity: 0, x: -30 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.45, ease: "easeOut" } },
};

const slideRight = {
  hidden: { opacity: 0, x: 30 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.45, ease: "easeOut" } },
};

export default memo(function TextSection({ data }) {
  const title = data?.title || "";
  const content = data?.content || "";
  const image = data?.image ? resolveImageUrl(data.image) : "";
  const [expanded, setExpanded] = useState(false);

  if (!title && !content) return null;

  const isLong = content.length > 200;
  const imagePosition = data?.sort_order % 2 === 0 ? "right" : "left";

  // Split layout when image is present
  if (image) {
    return (
      <section className="py-12 sm:py-14 md:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Text Content */}
            <motion.div
              variants={imagePosition === "left" ? slideRight : slideLeft}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              className={imagePosition === "left" ? "order-2" : "order-1"}
            >
              {title && (
                <h2 className="text-[#002147] text-2xl sm:text-3xl md:text-4xl font-medium mb-4">
                  {title}
                </h2>
              )}
              <div className="w-24 h-[2px] bg-[#FF7373] mb-4" />
              {content && (
                <p className="text-gray-600 text-base leading-relaxed whitespace-pre-line">
                  {content}
                </p>
              )}
            </motion.div>

            {/* Image */}
            <motion.div
              variants={imagePosition === "left" ? slideLeft : slideRight}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              className={imagePosition === "left" ? "order-1" : "order-2"}
            >
              <Media
                src={image}
                alt={title}
                className="w-full rounded-xl object-cover max-h-[450px]"
              />
            </motion.div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 sm:py-14 md:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {title && (
          <motion.h2
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="text-[#002147] text-2xl sm:text-3xl md:text-5xl font-medium text-center md:text-left"
          >
            {title}
          </motion.h2>
        )}

        <div className="w-24 sm:w-32 h-[2px] bg-[#FF7373] mt-3 mb-6 mx-auto md:mx-0" />

        {content && (
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            <p
              className={`text-gray-600 text-base sm:text-lg leading-relaxed whitespace-pre-line ${
                !expanded && isLong ? "line-clamp-3" : ""
              }`}
            >
              {content}
            </p>
            
          </motion.div>
        )}
      </div>
    </section>
  );
});

export const FeaturesSection = memo(function FeaturesSection({ data }) {
  const title = data?.title || "";
  const subtitle = data?.subtitle || "";
  const items = data?.items || [];

  if (!title && !items.length) return null;

  return (
    <section className="py-12 sm:py-14 md:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {title && (
          <motion.h2
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="text-[#002147] text-2xl sm:text-3xl md:text-5xl font-medium text-center md:text-left"
          >
            {title}
          </motion.h2>
        )}

        <div className="w-24 sm:w-32 h-[2px] bg-[#FF7373] mt-3 mb-4 mx-auto md:mx-0" />

        {subtitle && (
          <p className="text-gray-600 mb-8 sm:mb-10 text-center md:text-left max-w-3xl">
            {subtitle}
          </p>
        )}

        {items.length > 0 && (
          <ul className="space-y-3">
            {items.map((item, i) => (
              <motion.li
                key={i}
                variants={itemVariant}
                initial="hidden"
                whileInView="visible"
                custom={i}
                viewport={{ once: true, amount: 0.1 }}
                className="flex items-start gap-3 text-gray-700"
              >
                <span className="text-[#0CC2FE] font-bold mt-0.5">✔</span>
                <span className="text-base sm:text-lg">{item}</span>
              </motion.li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
});


