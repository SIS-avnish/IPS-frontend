import { memo } from "react";
import { motion } from "framer-motion";
import { resolveImageUrl } from "../../services/api";
import Media from "../common/Media";

const slideLeft = {
  hidden: { opacity: 0, x: -30 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.45, ease: "easeOut" } },
};

const slideRight = {
  hidden: { opacity: 0, x: 30 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.45, ease: "easeOut" } },
};

export default memo(function SplitSection({ data }) {
  const title = data?.title || "";
  const description = data?.description || "";
  const image = data?.image ? resolveImageUrl(data.image) : "";
  const items = data?.items || [];
  const tag = data?.tag || "";
  const imagePosition = data?.image_position || (data?.sort_order % 2 === 0 ? "right" : "left");

  if (!title && !description && !image) return null;

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
            {tag && (
              <span className="inline-block bg-[#0CC2FE] text-white text-xs font-semibold px-3 py-1 rounded-full mb-4 uppercase tracking-wide">
                {tag}
              </span>
            )}
            {title && (
              <h2 className="text-[#002147] text-2xl sm:text-3xl md:text-4xl font-medium mb-4">
                {title}
              </h2>
            )}
            <div className="w-24 h-[2px] bg-[#FF7373] mb-4" />
            {description && (
              <p className="text-gray-600 text-base leading-relaxed mb-6 whitespace-pre-line">
                {description}
              </p>
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

          {/* Image */}
          {image && (
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
          )}
        </div>
      </div>
    </section>
  );
});
