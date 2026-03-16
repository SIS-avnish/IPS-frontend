import { memo } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { motion } from "framer-motion";
import { resolveImageUrl } from "../../services/api";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { Navigation, Pagination, Autoplay } from "swiper/modules";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

const cardVariant = {
  hidden: { opacity: 0, y: 15 },
  visible: (i) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.35, delay: i * 0.06, ease: "easeOut" },
  }),
};
export default memo(function Recruiters({ data }) {
  const title = data?.title || "Recruiters";
  const items = data?.items || [];

  return (
    <section id="recruiters" className="bg-[#f7f9fc] py-12 sm:py-14 md:py-16">

      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="text-2xl sm:text-3xl md:text-4xl font-medium text-[#0b1c39] text-center md:text-left"
        >
          {title}
        </motion.h2>

        {items.length > 0 && (
          <div className="mt-5 sm:mt-10 p-5">
<Swiper
  modules={[Navigation, Pagination, Autoplay]}
  spaceBetween={10}
  slidesPerView={5}
  navigation
  autoplay={{ delay: 0, disableOnInteraction: false }}
speed={2000}
loop={true}
  breakpoints={{
    320: { slidesPerView: 2 },
    640: { slidesPerView: 3 },
    1024: { slidesPerView: 5 },
  }}
>
      {items.map((item, i) => (
        <SwiperSlide key={i}>
        <motion.div
          key={i}
          variants={cardVariant}
          initial="hidden"
          whileInView="visible"
          custom={i}
          viewport={{ once: true, amount: 0.1 }}
          className="bg-white rounded-xl p-2 sm:p-2 md:p-2 flex flex-col items-center justify-center shadow hover:-translate-y-1 transition"
        >
          {/* LOGO */}
          <LazyLoadImage
            src={resolveImageUrl(item.logo)}
            alt={item.name || `Recruiter ${i + 1}`}
            effect="blur"
            className="h-16 sm:h-20 md:h-20 w-auto object-contain w-auto transition"
          />

          {/* NAME UNDER LOGO */}
          <p className="text-md sm:text-sm md:text-base text-center mt-2 text-gray-700">
            {item.name}
          </p>
        </motion.div>
        </SwiperSlide>
      ))}
</Swiper>
    </div>
        )}

      </div>
    </section>
  );
})
