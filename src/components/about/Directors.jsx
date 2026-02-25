import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

const cardVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, delay: i * 0.06, ease: "easeOut" },
  }),
};

export default function Directors({ data, courses: apiCourses = [], colleges: apiColleges = [] }) {

  const sectionTitle = data?.title || "Institute Directors";
  const subtitle = data?.subtitle || "Principal / Director";

  // Only use API data — no fallbacks
  const collegeItems = apiColleges?.length
    ? apiColleges.map((c) => c.name)
    : [];

  const courseItems = apiCourses?.length
    ? apiCourses.map((c) => c.name)
    : [];

  const directorItems = data?.items?.length
    ? data.items.map((item) => item.replace(/\\n/g, "\n"))
    : [];

  const cols = [
    { title: "College / Institute", color: "bg-[#0CC2FE]", items: collegeItems },
    { title: "Courses", color: "bg-[#FF7373]", items: courseItems },
    { title: subtitle, color: "bg-[#FFC73E]", items: directorItems },
  ].filter(col => col.items.length > 0); // skip empty columns

  const card = (title, color, items) => (
    <div className="bg-[#f7f4f4] h-full">

      {/* Header */}
      <div className={`px-6 py-2 font-medium text-[#002147] text-[18px] ${color}`}>
        {title}
      </div>

      {/* Items */}
      {items.map((t, i) => (
        <div
          key={i}
          className="bg-[#F0EEEF] px-6 py-5 mb-[3px]"
        >
          <p className="text-[#3A3A3A] text-[18px] leading-[22px] font-normal whitespace-pre-line">
            {t}
          </p>
        </div>
      ))}

    </div>
  );

  // If no column has data, render nothing
  if (!cols.length) return null;

  return (
    <section className="py-16">

      <div className="max-w-6xl mx-auto px-3">

        {/* Heading */}
        <motion.h3
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="text-4xl md:text-[60px] font-medium text-[#002147]"
        >
          {sectionTitle}
        </motion.h3>

        <div className="h-[2px] w-60 bg-[#FF7373] my-3 mb-8" />

        {/* Cards */}
        <div className="grid lg:grid-cols-3 gap-8">
          {cols.map((col, colIdx) => (
            <motion.div
              key={colIdx}
              variants={cardVariant}
              initial="hidden"
              whileInView="visible"
              custom={colIdx}
              viewport={{ once: true, amount: 0.1 }}
            >
              {card(col.title, col.color, col.items)}
            </motion.div>
          ))}
        </div>

      </div>

    </section>
  );
}