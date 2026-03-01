import { useEffect, useState, useMemo, useCallback, useRef } from "react";
import { fetchPageData, submitContactForm } from "../services/api";
import { PageSkeleton } from "../components/common/SkeletonLoader";
import LazyIframe from "../components/common/LazyIframe";
import { MapPin, Phone, Mail, BookOpen } from "lucide-react";
import { motion } from "framer-motion";
import { useParams } from "react-router-dom";
import { ScratchSections } from "../components/common/ScratchHtml";
import useSEO from "../hooks/useSEO";

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
// ── Indian states → cities map ──────────────────────────────────────────────
const STATES_CITIES = {
  "Andhra Pradesh": ["Visakhapatnam", "Vijayawada", "Guntur", "Tirupati", "Nellore", "Kakinada", "Rajahmundry", "Kurnool"],
  "Arunachal Pradesh": ["Itanagar", "Naharlagun", "Tawang"],
  "Assam": ["Guwahati", "Dibrugarh", "Silchar", "Jorhat", "Tezpur"],
  "Bihar": ["Patna", "Gaya", "Muzaffarpur", "Bhagalpur", "Purnia"],
  "Chhattisgarh": ["Raipur", "Bhilai", "Bilaspur", "Korba", "Durg"],
  "Delhi": ["New Delhi", "Central Delhi", "South Delhi", "North Delhi", "East Delhi"],
  "Goa": ["Panaji", "Margao", "Mapusa", "Vasco da Gama"],
  "Gujarat": ["Ahmedabad", "Surat", "Vadodara", "Rajkot", "Gandhinagar", "Bhavnagar"],
  "Haryana": ["Gurugram", "Faridabad", "Karnal", "Ambala", "Panipat", "Hisar"],
  "Himachal Pradesh": ["Shimla", "Manali", "Dharamshala", "Solan", "Mandi"],
  "Jharkhand": ["Ranchi", "Jamshedpur", "Dhanbad", "Bokaro", "Hazaribagh"],
  "Karnataka": ["Bengaluru", "Mysuru", "Mangaluru", "Hubli", "Belagavi", "Dharwad"],
  "Kerala": ["Thiruvananthapuram", "Kochi", "Kozhikode", "Thrissur", "Kollam"],
  "Madhya Pradesh": ["Indore", "Bhopal", "Jabalpur", "Gwalior", "Ujjain", "Sagar", "Dewas", "Rewa"],
  "Maharashtra": ["Mumbai", "Pune", "Nagpur", "Nashik", "Aurangabad", "Thane", "Kolhapur"],
  "Manipur": ["Imphal", "Thoubal", "Bishnupur"],
  "Meghalaya": ["Shillong", "Tura", "Jowai"],
  "Mizoram": ["Aizawl", "Lunglei", "Champhai"],
  "Nagaland": ["Kohima", "Dimapur", "Mokokchung"],
  "Odisha": ["Bhubaneswar", "Cuttack", "Rourkela", "Puri", "Sambalpur"],
  "Punjab": ["Chandigarh", "Ludhiana", "Amritsar", "Jalandhar", "Patiala", "Bathinda"],
  "Rajasthan": ["Jaipur", "Jodhpur", "Udaipur", "Kota", "Ajmer", "Bikaner"],
  "Sikkim": ["Gangtok", "Namchi", "Pelling"],
  "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai", "Tiruchirappalli", "Salem", "Tirunelveli"],
  "Telangana": ["Hyderabad", "Warangal", "Nizamabad", "Karimnagar", "Khammam"],
  "Tripura": ["Agartala", "Udaipur", "Dharmanagar"],
  "Uttar Pradesh": ["Lucknow", "Noida", "Kanpur", "Agra", "Varanasi", "Prayagraj", "Meerut", "Ghaziabad"],
  "Uttarakhand": ["Dehradun", "Haridwar", "Rishikesh", "Nainital", "Haldwani"],
  "West Bengal": ["Kolkata", "Howrah", "Durgapur", "Siliguri", "Asansol"],
};
const STATE_NAMES = Object.keys(STATES_CITIES).sort();

// ── Simple math captcha generator ───────────────────────────────────────────
function generateCaptcha() {
  const a = Math.floor(Math.random() * 20) + 1;
  const b = Math.floor(Math.random() * 20) + 1;
  return { question: `${a} + ${b} = ?`, answer: a + b };
}

const INITIAL_FORM = {
  name: "",
  email: "",
  countryCode: "+91",
  phone_no: "",
  state: "",
  city: "",
  address: "",
  message: "",
};

export default function Contact() {
  const { collegeSlug } = useParams();
  const [sections, setSections] = useState(null);
  const [pageData, setPageData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ── form state ──
  const [form, setForm] = useState(INITIAL_FORM);
  const [captcha, setCaptcha] = useState(generateCaptcha);
  const [captchaInput, setCaptchaInput] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitMsg, setSubmitMsg] = useState(null); // { type: 'success'|'error', text }
  const formRef = useRef(null);

  useSEO(pageData);

  const cities = useMemo(
    () => (form.state ? STATES_CITIES[form.state] || [] : []),
    [form.state]
  );

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setForm((prev) => {
      const next = { ...prev, [name]: value };
      // reset city when state changes
      if (name === "state") next.city = "";
      return next;
    });
  }, []);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      setSubmitMsg(null);

      // validate captcha
      if (Number(captchaInput) !== captcha.answer) {
        setSubmitMsg({ type: "error", text: "Incorrect captcha. Please try again." });
        setCaptcha(generateCaptcha());
        setCaptchaInput("");
        return;
      }

      setSubmitting(true);
      try {
        const payload = {
          name: form.name,
          email: form.email,
          phone_no: `${form.countryCode}${form.phone_no}`,
          state: form.state,
          city: form.city,
          address: form.address,
          message: form.message,
        };
        await submitContactForm(collegeSlug, payload);
        setSubmitMsg({ type: "success", text: "Your enquiry has been submitted successfully!" });
        setForm(INITIAL_FORM);
        setCaptchaInput("");
        setCaptcha(generateCaptcha());
      } catch (err) {
        console.error("Contact form submission failed:", err);
        setSubmitMsg({
          type: "error",
          text: err?.response?.data?.message || "Something went wrong. Please try again.",
        });
      } finally {
        setSubmitting(false);
      }
    },
    [form, captcha, captchaInput, collegeSlug]
  );

  useEffect(() => {
    fetchPageData(collegeSlug, "contact")
      .then((data) => {
        setPageData(data);
        setSections(data.sections);
      })
      .catch((err) => {
        console.error("Failed to fetch contact page data:", err);
        setError("Failed to load page data.");
      })
      .finally(() => setLoading(false));
  }, [collegeSlug]);

  const hero = sections?.hero;
  const contact = sections?.contact_us;

  // Support both array and comma-separated string for phones
  const phoneNumbers = useMemo(() => Array.isArray(contact?.phones)
    ? contact.phones
    : contact?.phone
      ? contact.phone.split(",").map((p) => p.trim())
      : [], [contact]);

  // Support both array and single string for emails
  const emails = useMemo(() => Array.isArray(contact?.emails)
    ? contact.emails
    : contact?.email
      ? [contact.email]
      : [], [contact]);

  // Split address by newline for line breaks
  const addressLines = useMemo(() => contact?.address
    ? contact.address.split("\n")
    : [], [contact]);

  // Build Google Maps embed URL from address
  const mapUrl = useMemo(() => contact?.map
    || (contact?.address
      ? `https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${encodeURIComponent(contact.address.replace(/\n/g, ", "))}`
      : null), [contact]);

  if (loading) {
    return <PageSkeleton />;
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen text-red-600 text-lg">
        {error}
      </div>
    );
  }

  return (
    <>
      {/* CONTACT SECTION */}
      <section className="pt-[50px] pb-[40px] px-3 sm:px-0">
        <div className="max-w-6xl mx-auto">

          {/* TITLE */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="mb-6"
          >
            <h2 className="text-2xl sm:text-3xl font-semibold text-[#002147]">
              {hero?.description || "Contact Us"}
            </h2>
            <div className="w-16 h-[2px] bg-[#002147] mt-2"></div>
          </motion.div>

          {/* CONTACT INFO */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 py-6">

            <Info icon={<MapPin size={20} />} >
              {addressLines.map((line, i) => (
                <span key={i}>
                  {line}
                  {i < addressLines.length - 1 && <br />}
                </span>
              ))}
            </Info>

            <Info icon={<Phone size={20} />} >
              {phoneNumbers.map((num, i) => (
                <span key={i}>
                  <a href={`tel:${num.replace(/\s/g, "")}`}>{num}</a>
                  {i < phoneNumbers.length - 1 && <br />}
                </span>
              ))}
            </Info>

            <Info icon={<Mail size={20} />} >
              {emails.map((email, i) => (
                <span key={i}>
                  <a href={`mailto:${email}`} className="underline">
                    {email}
                  </a>
                  {i < emails.length - 1 && <br />}
                </span>
              ))}
            </Info>

            <Info icon={<BookOpen size={20} />} >
              <a href="#" className="underline">
                Telephone Directory
              </a>
            </Info>

          </div>

          {/* CONTACT CARD */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="bg-[#F0EEEF] p-5 sm:p-10"
          >

            <h5 className="text-[28px] sm:text-[40px] font-normal text-[#002147] mb-4">
              Get in Touch
            </h5>

            <form ref={formRef} className="space-y-3" onSubmit={handleSubmit}>

              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                placeholder="Enter Name"
                className="w-full bg-white px-6 py-2 text-sm placeholder-[#8F8F8F] focus:outline-none"
              />

              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                placeholder="Enter Email Address"
                className="w-full bg-white px-6 py-2 text-sm placeholder-[#8F8F8F] focus:outline-none"
              />

              {/* PHONE INPUT */}
              <div className="flex items-center bg-white px-6 py-2">

                <select
                  name="countryCode"
                  value={form.countryCode}
                  onChange={handleChange}
                  className="bg-transparent outline-none font-medium pr-2"
                >
                  <option value="+91">+91</option>
                  <option value="+1">+1</option>
                  <option value="+44">+44</option>
                  <option value="+61">+61</option>
                </select>

                <span className="mx-2 text-gray-400">|</span>

                <input
                  type="tel"
                  name="phone_no"
                  value={form.phone_no}
                  onChange={handleChange}
                  required
                  pattern="[0-9]{7,15}"
                  placeholder="Phone Number"
                  className="flex-1 outline-none text-sm placeholder-[#8F8F8F]"
                />

              </div>

              {/* STATE CITY */}
              <div className="grid md:grid-cols-2 gap-3">

                <select
                  name="state"
                  value={form.state}
                  onChange={handleChange}
                  required
                  className="bg-white px-6 py-2 text-sm text-gray-500 outline-none h-[45px]"
                >
                  <option value="">Select State</option>
                  {STATE_NAMES.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>

                <select
                  name="city"
                  value={form.city}
                  onChange={handleChange}
                  required
                  className="bg-white px-6 py-2 text-sm text-gray-500 outline-none h-[45px]"
                >
                  <option value="">Select City</option>
                  {cities.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>

              </div>

              <textarea
                rows="4"
                name="message"
                value={form.message}
                onChange={handleChange}
                required
                placeholder="Type Your Enquiry Here"
                className="w-full bg-white px-6 py-4 text-sm placeholder-[#8F8F8F] outline-none"
              />

              {/* CAPTCHA */}
              <div className="flex items-center gap-3 flex-wrap">
                <span className="bg-white px-4 py-2 text-sm font-semibold text-[#002147] select-none tracking-wider">
                  {captcha.question}
                </span>
                <input
                  type="text"
                  inputMode="numeric"
                  value={captchaInput}
                  onChange={(e) => setCaptchaInput(e.target.value)}
                  required
                  placeholder="Your Answer"
                  className="bg-white px-4 py-2 text-sm placeholder-[#8F8F8F] outline-none w-32"
                />
                <button
                  type="button"
                  onClick={() => { setCaptcha(generateCaptcha()); setCaptchaInput(""); }}
                  className="text-xs text-[#002147] underline hover:opacity-70"
                >
                  Refresh
                </button>
              </div>

              {/* STATUS MESSAGE */}
              {submitMsg && (
                <p className={`text-sm font-medium ${
                  submitMsg.type === "success" ? "text-green-600" : "text-red-600"
                }`}>
                  {submitMsg.text}
                </p>
              )}

              <button
                type="submit"
                disabled={submitting}
                className="bg-[#002147] text-white px-8 py-2 text-sm hover:bg-[#081f36] transition disabled:opacity-60"
              >
                {submitting ? "Submitting..." : "Submit"}
              </button>

            </form>

          </motion.div>
        </div>
      </section>

      {/* MAP */}
      <div className="w-full">
        <LazyIframe
          src={mapUrl || "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3680.123456789!2d75.857123!3d22.719567!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3962e4a8abcd1234%3A0x1234567890abcdef!2sRP%20Education%20%26%20Bridge!5e0!3m2!1sen!2sin!4v1600000000000!5m2!1sen!2sin"}
          allowFullScreen=""
          loading="lazy"
          className="w-full"
          style={{ height: "600px", border: 0 }}
        />
      </div>
      <ScratchSections sections={sections} exclude={['hero', 'contact_us']} />
    </>
  );
}

/* HELPER */
function Info({ icon, children }) {
  return (
    <div className="flex gap-3 items-start">
      <div className="text-[#FF7373] pt-1">{icon}</div>
      <p className="text-[16px] text-[#002147] font-medium leading-5">
        {children}
      </p>
    </div>
  );
}
