import { memo } from "react";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

export default memo(function Directors({ data, department, principal, designation, contact }) {

  const sectionTitle = data?.title || "Institute Directors";

  const colConfigs = [
    { section: department, color: "bg-[#0CC2FE]" },
    { section: principal,  color: "bg-[#FFC73E]" },
    { section: designation, color: "bg-[#FF7373]" },
    { section: contact,    color: "bg-[#a0e0f6]" },
  ];

  const cols = colConfigs
    .map(({ section, color }) => ({
      title: section?.title || "",
      color,
      items: (section?.items || []).map((item) =>
        item === "null" ? "-" : item.replace(/\\n/g, "\n")
      ),
    }))
    .filter((col) => col.items.length > 0);

  // If no column has data, render nothing
  if (!cols.length) return null;

  const maxRows = Math.max(...cols.map((c) => c.items.length));

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

        <div className="h-[2px] w-60 bg-[#FF7373]  my-3 mb-8" />

        {/* Table-like grid: row-by-row to keep heights in sync */}
        <div className="w-full overflow-x-auto">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid gap-x-4 "
          style={{
    gridTemplateColumns: `repeat(${cols.length}, minmax(160px, 1fr))`,
    minWidth: `${cols.length * 160}px`
  }}
        >
          {/* Header row */}
          {cols.map((col, ci) => (
            <div
              key={ci}
              className={`px-4 py-3 font-medium text-[#002147] text-[16px] text-center flex items-center justify-center ${col.color} ${ci < cols.length - 1 ? "border-r border-white/40" : ""}`}
            >
              {col.title}
            </div>
          ))}

          {/* Data rows */}
          {Array.from({ length: maxRows }).map((_, rowIdx) => (
            cols.map((col, ci) => (
              <div
                key={`${rowIdx}-${ci}`}
                className={`bg-[#F0EEEF] px-4 py-4 flex items-center justify-center border-b border-[#ddd] ${ci < cols.length - 1 ? "border-r border-[#ddd]" : ""}`}
              >
                <p className="text-[#3A3A3A] text-[16px] leading-[22px] font-normal whitespace-pre-line text-center">
                  {col.items[rowIdx] ?? ""}
                </p>
              </div>
            ))
          ))}
        </motion.div>
        </div>

      </div>

    </section>
  );
})
