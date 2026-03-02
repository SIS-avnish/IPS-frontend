import { useEffect, useState, memo } from "react";
import { motion } from "framer-motion";
import { fetchCollegeCourses } from "../../services/api";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};
export default memo(function Programs({ data, collegeSlug }) {
  const title = data?.title || "Programmes Offered";
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!collegeSlug) return;
    let cancelled = false;
    setLoading(true);

    fetchCollegeCourses(collegeSlug)
      .then((data) => {
        if (!cancelled) setCourses(data?.value || data || []);
      })
      .catch((err) => {
        console.error("Failed to fetch courses:", err);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => { cancelled = true; };
  }, [collegeSlug]);

  return (
    <section id="courses" className="py-12 sm:py-14 md:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="text-[#002147] text-2xl sm:text-3xl md:text-5xl font-medium text-center md:text-left"
        >
          {title}
        </motion.h2>

        <div className="w-24 sm:w-32 h-[2px] bg-[#002147] mt-3 mb-8 sm:mb-10 mx-auto md:mx-0"></div>

        {loading ? (
          <div className="flex justify-center py-10">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-[#002147]"></div>
          </div>
        ) : (
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="overflow-x-auto"
          >

            <table className="min-w-full border border-gray-300 text-sm sm:text-base">

              {/* HEADER */}
              <thead>
                <tr className="text-left text-base sm:text-lg font-medium">
                  <th className="p-3 sm:p-4 bg-cyan-400 text-[#002147] whitespace-nowrap">
                    Programme
                  </th>
                  <th className="p-3 sm:p-4 bg-red-400 text-[#002147] whitespace-nowrap">
                    Programme Details
                  </th>
                  <th className="p-3 sm:p-4 bg-yellow-300 text-[#002147] whitespace-nowrap">
                    Eligibility
                  </th>
                </tr>
              </thead>

              {/* BODY */}
              <tbody className="text-gray-700 bg-gray-100">

                {courses.map((course) => (
                  <tr key={course.id} className="border-t">
                    <td className="p-3 sm:p-4 font-medium text-[#002147] whitespace-nowrap align-top">
                      {course.name}
                    </td>

                    <td
                      className="p-3 sm:p-4 bg-gray-100 prose prose-sm max-w-none"
                      dangerouslySetInnerHTML={{ __html: course.description }}
                    />

                    <td
                      className="p-3 sm:p-4 bg-gray-100 prose prose-sm max-w-none"
                      dangerouslySetInnerHTML={{ __html: course.eligibility }}
                    />
                  </tr>
                ))}

              </tbody>

            </table>

          </motion.div>
        )}

      </div>
    </section>
  );
})
