import { memo } from "react";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

const cardVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.35, delay: i * 0.06, ease: "easeOut" },
  }),
};

const defaultSteps = [
  { num: 1, title: "Apply Online", desc: "Fill out the online admission form with accurate personal and academic details." },
  { num: 2, title: "Document Verification", desc: "Submit required documents for eligibility check." },
  { num: 3, title: "Counselling & Interview", desc: "Attend counselling session and interview if required." },
  { num: 4, title: "Confirmation & Fee Payment", desc: "Confirm your seat by completing payment and formalities." },
  { num: 5, title: "Orientation & Onboarding", desc: "Join orientation sessions to get familiar with campus life." },
  { num: 6, title: "Start Your Journey", desc: "Begin your academic journey with us and explore endless opportunities." },
  { num: 7, title: "Support & Guidance", desc: "Access ongoing support from our admissions team throughout your journey." },
];

export default memo(function Admission({ data }) {
  const rawTitle = data?.title || "Admission Procedure : Follow these simple steps to begin your journey with us.";
  const [heading, subtitle] = rawTitle.split(":").map((s) => s.trim());

  const steps = data?.items?.length
    ? data.items.map((item) => ({
        num: parseInt(item.name, 10) || 0,
        title: (item.designation || "").trim(),
        desc: item.story || "",
      }))
    : defaultSteps;

  return (
    <section id="admission" className="bg-[#f8f9fc] py-12 sm:py-14 md:py-16">

      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="text-[#0066A6] text-2xl sm:text-3xl md:text-5xl font-medium text-center md:text-left"
        >
          {heading}
        </motion.h2>

        <div className="w-24 sm:w-32 h-[2px] bg-[#F68C1F] mt-3 mb-4 mx-auto md:mx-0"></div>

        {subtitle && (
          <p className="text-gray-600 mb-8 sm:mb-10 text-center md:text-left">
            {subtitle}
          </p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">

          {steps.map((s) => (
            <motion.div
              key={s.num}
              variants={cardVariant}
              initial="hidden"
              whileInView="visible"
              custom={s.num - 1}
              viewport={{ once: true, amount: 0.1 }}
              className="bg-[#F9F4E1] p-5 sm:p-6 rounded-xl text-center shadow hover:-translate-y-1 transition"
            >
              <div className="w-12 h-12 mx-auto rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center font-bold mb-3">
                {s.num}
              </div>

              <h4 className="font-semibold mb-2 text-base sm:text-lg">{s.title}</h4>
              {s.desc.includes("\n") ? (
  <ul className="text-gray-600 text-sm list-disc list-inside text-left space-y-1">
    {s.desc.split("\n").map((line, index) => (
      <li key={index}>{line}</li>
    ))}
  </ul>
) : (
  <p className="text-gray-600 text-md">{s.desc}</p>
)}
            </motion.div>
          ))}

        </div>

      </div>
    </section>
  );
})
