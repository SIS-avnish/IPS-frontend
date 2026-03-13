import { memo } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45 } },
};

const AlumniCards = memo(function AlumniCards({ alumni, collegeSlug }) {
  const navigate = useNavigate();

  if (!alumni || alumni.length === 0) return null;

  return (
    <section className="bg-gray-50 py-12 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-2xl md:text-3xl font-bold text-[#002147] text-center mb-10"
        >
          Our Alumni
        </motion.h2>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {alumni.map((item) => (
            <motion.div
              key={item.id}
              variants={fadeUp}
              whileHover={{ scale: 1.03 }}
              onClick={() =>
                navigate(`/${collegeSlug}/activities/alumni/${item.id}`)
              }
              className="bg-white rounded-2xl shadow-md overflow-hidden border cursor-pointer transition-shadow hover:shadow-lg"
            >
              {item.main_image && (
                <img
                  src={item.main_image}
                  alt={item.name}
                  loading="lazy"
                  className="w-full h-56 object-cover"
                />
              )}
              <div className="p-5">
                <h3 className="text-lg font-semibold text-[#002147] mb-1">
                  {item.name}
                </h3>
                {item.achievement && (
                  <p className="text-sm text-gray-600">{item.achievement}</p>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
});

export default AlumniCards;
