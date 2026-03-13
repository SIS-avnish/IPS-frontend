import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { submitInquiry, fetchCollegeCourseNames } from "../../services/api";

const slideLeft = {
  hidden: { opacity: 0, x: -30 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.45 } },
};

const slideRight = {
  hidden: { opacity: 0, x: 30 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.45 } },
};

export default function ApplyForm({ collegeSlug, leftSection }) {

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone_number: "",
    course_interested: "",
    message: "",
  });

  const [courseNames, setCourseNames] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [showDialog, setShowDialog] = useState(false);

  useEffect(() => {
    if (!collegeSlug) return;

    fetchCollegeCourseNames(collegeSlug)
      .then((names) => setCourseNames(names || []))
      .catch((err) => console.error(err));
  }, [collegeSlug]);

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSubmitting(true);

      await submitInquiry(collegeSlug, form);

      setForm({
        name: "",
        email: "",
        phone_number: "",
        course_interested: "",
        message: "",
      });

      setShowDialog(true);
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  /* FIX: detect scratch html safely */
  const scratchHtml =
    leftSection?.content ||
    leftSection?.html ||
    leftSection?.body ||
    "";

  return (
    <>
      <section className="bg-gradient-to-br from-[#060e22] to-[#0f2b5b] py-16 text-white">

        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-start">

          {/* LEFT SCRATCH SECTION */}
          <motion.div
  variants={slideLeft}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true }}
  className="flex"
>
  {scratchHtml && (
    <div
      className="w-full h-full flex items-center justify-center"
      dangerouslySetInnerHTML={{
        __html: scratchHtml
      }}
    />
  )}
</motion.div>




          {/* FORM */}
          <motion.div
            variants={slideRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="bg-white/10 backdrop-blur border border-white/20 rounded-2xl p-8"
          >
            <h4 className="font-bold text-xl mb-6">Apply Now</h4>

            <form
              onSubmit={handleSubmit}
              className="grid md:grid-cols-2 gap-4"
            >

              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Full Name"
                required
                className="bg-white/10 border border-white/30 rounded-lg px-4 py-3"
              />

              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Email"
                required
                className="bg-white/10 border border-white/30 rounded-lg px-4 py-3"
              />

              <input
                name="phone_number"
                value={form.phone_number}
                onChange={handleChange}
                placeholder="Mobile Number"
                required
                className="bg-white/10 border border-white/30 rounded-lg px-4 py-3"
              />

              <select
                name="course_interested"
                value={form.course_interested}
                onChange={handleChange}
                className="bg-white/10 border border-white/30 rounded-lg px-4 py-3 text-white"
              >
                <option value="" className="text-black">
                  Select Course
                </option>

                {courseNames.map((course, i) => (
                  <option key={i} value={course} className="text-black">
                    {course}
                  </option>
                ))}
              </select>

              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="Message (Optional)"
                className="md:col-span-2 bg-white/10 border border-white/30 rounded-lg px-4 py-3"
              />

              <button
                type="submit"
                disabled={submitting}
                className="md:col-span-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-[#002147] font-bold py-3 rounded-lg"
              >
                {submitting ? "Submitting..." : "Submit Application"}
              </button>

            </form>
          </motion.div>

        </div>
      </section>


      {/* SUCCESS MODAL */}
      <AnimatePresence>
        {showDialog && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center bg-black/50 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="bg-white text-center p-8 rounded-xl">
              <h3 className="text-xl font-bold mb-3">
                Thank You!
              </h3>

              <p className="mb-4">
                Our team will contact you soon.
              </p>

              <button
                onClick={() => setShowDialog(false)}
                className="bg-[#002147] text-white px-6 py-2 rounded"
              >
                Close
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
