import { useState, useMemo, memo } from "react";
import { ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

function stripHtml(html) {
  if (!html) return "";
  const doc = new DOMParser().parseFromString(html, "text/html");
  return doc.body.textContent || "";
}

export default memo(function CoursesAccordion({ data, courses: apiCourses = [] }) {

  // Prefer dedicated courses API data; fall back to page section items
  const courses = useMemo(() => apiCourses.length
    ? apiCourses.map((c) => ({
        title: c.name || "",
        desc: stripHtml(c.description),
      }))
    : (data?.items || []).map((item) => ({
        title: item.title || item.question || "",
        desc: item.description || item.answer || "",
      })), [apiCourses, data]);

  const sectionTitle = data?.title || "Innovative Courses";
  const sectionSubtitle = data?.subtitle || "Tailored for the Industry";
  const sectionDescription = data?.description || "Choose your next from a diverse range of courses designed to shape you for an evolving future.";

  const [open, setOpen] = useState(0);
  const [expanded, setExpanded] = useState({});

  if (!courses.length) return null;

  return (
    <div className="bg-[#F0EEEF]  pt-[180px] pb-[60px] px-2 -mt-[13%] max-[991px]:-mt-[24%] max-[576px]:pt-[30px] max-[576px]:pb-[30px] max-[576px]:px-5 max-[576px]:mt-0!">
      <section className="max-w-[1140px] mx-auto px-3">


        {/* Header Row */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-12 items-center gap-1 "
        >
          <div className="col-span-12 lg:col-span-7">
            <div className="max-[576px]:text-center">
              <h2 className="text-[50px] text-[#002147] mb-4 font-medium leading-[60px] max-[991px]:text-[48px] max-[576px]:text-[32px] max-[576px]:leading-[38px]">
                {sectionTitle}<br />
                {sectionSubtitle}
              </h2>
              <div className="w-[340px] h-[2px] bg-[#FF7373] max-[576px]:w-auto max-[576px]:mx-auto" />
            </div>
          </div>
          <div className="col-span-12 lg:col-span-5">
            <p className="text-[16px] text-[#605654] font-normal mb-0! pt-8 max-[991px]:pt-5 max-[576px]:pt-5">
              {sectionDescription}
            </p>
          </div>
        </motion.div>

        {/* Accordion */}
<div className="py-12 max-w-[1420px]  px-2 max-[676px]:py-6">

  {courses.map((c, i) => {
    const isOpen = open === i;
    const isExpanded = expanded[i];

    return (
      <div key={i} className="border-b-[3px] border-white">


        {/* HEADER */}
        <button
          onClick={() => setOpen(isOpen ? null : i)}
          className={`w-full flex justify-between items-center text-left
          px-9 py-6 transition-all duration-300
          max-[576px]:px-5 max-[576px]:py-4
          
          ${isOpen
            ? "bg-[#F26D6D] text-white"
            : "bg-[#EDEBED] text-[#0B2A4A]"
          }`}
        >
          <span className="text-[28px] leading-[34px] font-medium max-[991px]:text-[24px] max-[576px]:text-[20px]">
            {c.title}
          </span>

          {/* ARROW CIRCLE */}
          <div className={`w-9 h-9 min-w-9 min-w-9 flex items-center justify-center rounded-full border transition-all
            ${isOpen ? "border-white" : "border-[#F26D6D]"}`}>
            <ChevronRight
              size={20}
              className={`transition-transform duration-300
                ${isOpen ? "rotate-90 text-white" : "text-[#F26D6D]"}`}
            />
          </div>
        </button>

        {/* BODY */}
        <div
          className={`overflow-hidden transition-all duration-500
          ${isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"}`}
        >
          <div className="bg-[#fff] px-9 py-6 text-[#605654] max-[576px]:px-5">

            <p className="text-[16px] leading-[26px]">
              {isExpanded ? c.desc : c.desc.slice(0, 100) + (c.desc.length > 100 ? ".." : "")}
            </p>

            {c.desc.length > 100 && (
              <button
                onClick={() =>
                  setExpanded(prev => ({ ...prev, [i]: !prev[i] }))
                }
                className="mt-3 text-[#F26D6D] underline font-medium"
              >
                {isExpanded ? "Read Less" : "Read More"}
              </button>
            )}

          </div>
        </div>

      </div>
    );
  })}
</div>
      </section>
    </div>
  );
})