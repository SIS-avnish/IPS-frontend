import { useState, useMemo, useCallback, useRef } from "react";
import { submitInquiry } from "../../services/api";

// ── Indian states → cities map ──────────────────────────────────────────────
const STATES_CITIES = {
  "Andhra Pradesh": ["Visakhapatnam", "Vijayawada", "Guntur", "Tirupati", "Nellore", "Kakinada", "Rajahmundry", "Kurnool", "Anantapur", "Kadapa", "Other"],

  "Arunachal Pradesh": ["Itanagar", "Naharlagun", "Tawang", "Pasighat", "Ziro", "Other"],

  "Assam": ["Guwahati", "Dibrugarh", "Silchar", "Jorhat", "Tezpur", "Nagaon", "Bongaigaon", "Tinsukia", "Karimganj", "Other"],

  "Bihar": ["Patna", "Gaya", "Muzaffarpur", "Bhagalpur", "Purnia", "Darbhanga", "Arrah", "Begusarai", "Katihar", "Other"],

  "Chhattisgarh": ["Raipur", "Bhilai", "Bilaspur", "Korba", "Durg", "Rajnandgaon", "Jagdalpur", "Raigarh", "Other"],

  "Goa": ["Panaji", "Margao", "Mapusa", "Vasco da Gama", "Ponda", "Other"],

  "Gujarat": ["Ahmedabad", "Surat", "Vadodara", "Rajkot", "Gandhinagar", "Bhavnagar", "Jamnagar", "Junagadh", "Anand", "Other"],

  "Haryana": ["Gurugram", "Faridabad", "Karnal", "Ambala", "Panipat", "Hisar", "Rohtak", "Sonipat", "Yamunanagar", "Other"],

  "Himachal Pradesh": ["Shimla", "Manali", "Dharamshala", "Solan", "Mandi", "Kullu", "Other"],

  "Jharkhand": ["Ranchi", "Jamshedpur", "Dhanbad", "Bokaro", "Hazaribagh", "Deoghar", "Other"],

  "Karnataka": ["Bengaluru", "Mysuru", "Mangaluru", "Hubli", "Belagavi", "Dharwad", "Tumakuru", "Udupi", "Other"],

  "Kerala": ["Thiruvananthapuram", "Kochi", "Kozhikode", "Thrissur", "Kollam", "Alappuzha", "Kannur", "Other"],

  "Madhya Pradesh": ["Indore", "Bhopal", "Jabalpur", "Gwalior", "Ujjain", "Sagar", "Rewa", "Satna", "Other"],

  "Maharashtra": ["Mumbai", "Pune", "Nagpur", "Nashik", "Aurangabad", "Thane", "Kolhapur", "Solapur", "Amravati", "Nanded", "Other"],

  "Manipur": ["Imphal", "Thoubal", "Bishnupur", "Churachandpur", "Other"],

  "Meghalaya": ["Shillong", "Tura", "Jowai", "Nongpoh", "Other"],

  "Mizoram": ["Aizawl", "Lunglei", "Champhai", "Serchhip", "Other"],

  "Nagaland": ["Kohima", "Dimapur", "Mokokchung", "Wokha", "Other"],

  "Odisha": ["Bhubaneswar", "Cuttack", "Rourkela", "Puri", "Sambalpur", "Berhampur", "Balasore", "Other"],

  "Punjab": ["Chandigarh", "Ludhiana", "Amritsar", "Jalandhar", "Patiala", "Bathinda", "Mohali", "Other"],

  "Rajasthan": ["Jaipur", "Jodhpur", "Udaipur", "Kota", "Ajmer", "Bikaner", "Alwar", "Bharatpur", "Other"],

  "Sikkim": ["Gangtok", "Namchi", "Pelling", "Gyalshing", "Other"],

  "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai", "Tiruchirappalli", "Salem", "Tirunelveli", "Erode", "Vellore", "Other"],

  "Telangana": ["Hyderabad", "Warangal", "Nizamabad", "Karimnagar", "Khammam", "Adilabad", "Other"],

  "Tripura": ["Agartala", "Udaipur", "Dharmanagar", "Kailashahar", "Other"],

  "Uttar Pradesh": ["Lucknow", "Noida", "Kanpur", "Agra", "Varanasi", "Prayagraj", "Meerut", "Ghaziabad", "Bareilly", "Aligarh", "Other"],

  "Uttarakhand": ["Dehradun", "Haridwar", "Rishikesh", "Nainital", "Haldwani", "Roorkee", "Other"],

  "West Bengal": ["Kolkata", "Howrah", "Durgapur", "Siliguri", "Asansol", "Kharagpur", "Other"],

  // Union Territories
  "Delhi": ["New Delhi", "Central Delhi", "South Delhi", "North Delhi", "East Delhi", "West Delhi", "Shahdara", "Other"],

  "Jammu and Kashmir": ["Srinagar", "Jammu", "Anantnag", "Baramulla", "Other"],

  "Ladakh": ["Leh", "Kargil", "Other"],

  "Chandigarh": ["Chandigarh", "Other"],

  "Dadra and Nagar Haveli and Daman and Diu": ["Daman", "Diu", "Silvassa", "Other"],

  "Lakshadweep": ["Kavaratti", "Agatti", "Minicoy", "Other"],

  "Puducherry": ["Puducherry", "Karaikal", "Mahe", "Yanam", "Other"]
};
const STATE_NAMES = Object.keys(STATES_CITIES).sort();

// ── Courses → specializations map ─────────────────────────────────────────
const COURSE_SPECIALIZATIONS = {
  Commerce: [
    "B.Com-Plain",
    "B.Com-Tax",
    "B.Com-Foreign Trade",
    "B.Com-Computer Application",
    "B.Com-Hons",
    "M.Com",
  ],
  Computers: ["BCA", "Integrated MCA", "MCA"],
  Science: [
    "B.Sc.-PCM",
    "B.Sc.-Computer Science",
    "B.Sc.-Life Science",
    "B.Sc.-Biotechnology",
    "B.Sc.-Forensic",
    "B.Sc.-Horticulture",
    "M.Sc-Microbiology",
    "M.Sc-Biotechnology",
    "M.Sc-Mathematics",
    "M.Sc-Chemistry",
    "M.Sc-Pharma Chemistry",
    "M.Sc-Physics",
  ],
  Law: ["BA. LLB (Hons)", "BBA. LLB (Hons)", "LLB (Hons)", "LLM"],
  "Hotel Management": ["BBA-Hotel Management", "Bachelor of Hotel Management"],
  Management: [
    "BBA-Plain",
    "BBA-Foreign Trade",
    "MBA-Full Time",
    "MBA-Financial Administration",
    "MBA-Marketing Management",
    "MBA-International Business",
    "PhD-Management",
  ],
  Economics: ["PhD-Economics"],
  Arts: ["BA", "MSW", "BA (Hons)"],
  Fashion: [
    "B. Design-Fashion",
    "PG Diploma in Fashion Design & Marketing",
    "Certificate Course - Fashion Design",
  ],
  "Library Science": ["B.Lib"],
  Education: ["B.Ed"],
  "Master of Social Work": ["Master of Social Work"],
};

const COURSE_NAMES = Object.keys(COURSE_SPECIALIZATIONS);

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
  course: "",
  specialization: "",
  message: "",
};

/**
 * Reusable enquiry / contact form.
 *
 * @param {string}  collegeSlug  – slug used in the POST endpoint
 * @param {string}  [title]      – heading text (default "Get in Touch")
 * @param {string}  [className]  – extra wrapper classes
 * @param {boolean} [compact]    – when true, skips the heading (useful inside modals)
 * @param {() => void} [onSuccess] – optional callback after successful submission
 */
export default function EnquiryForm({
  collegeSlug,
  title = "Get in Touch",
  className = "",
  compact = false,
  onSuccess,
}) {
  const [form, setForm] = useState(INITIAL_FORM);
  const [captcha, setCaptcha] = useState(generateCaptcha);
  const [captchaInput, setCaptchaInput] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitMsg, setSubmitMsg] = useState(null);
  const formRef = useRef(null);

  const cities = useMemo(
    () => (form.state ? STATES_CITIES[form.state] || [] : []),
    [form.state]
  );

  const specializations = useMemo(
    () => (form.course ? COURSE_SPECIALIZATIONS[form.course] || [] : []),
    [form.course]
  );

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setForm((prev) => {
      const next = { ...prev, [name]: value };
      if (name === "state") next.city = "";
      if (name === "course") next.specialization = "";
      return next;
    });
  }, []);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      setSubmitMsg(null);

      if (Number(captchaInput) !== captcha.answer) {
        setSubmitMsg({ type: "error", text: "Incorrect captcha. Please try again." });
        setCaptcha(generateCaptcha());
        setCaptchaInput("");
        return;
      }

      setSubmitting(true);
      try {
        const selectedCourse = form.course;
        const payload = {
          name: form.name,
          email: form.email,
          phone_number: `${form.countryCode}${form.phone_no}`,
          state: form.state,
          city: form.city,
          course_interested: selectedCourse,
          message: form.message,
          c_course: selectedCourse,
          c_specialization: form.specialization,
        };
        await submitInquiry(collegeSlug, payload);
        setSubmitMsg({ type: "success", text: "Your enquiry has been submitted successfully!" });
        setForm(INITIAL_FORM);
        setCaptchaInput("");
        setCaptcha(generateCaptcha());
        onSuccess?.();
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
    [form, captcha, captchaInput, collegeSlug, onSuccess]
  );

  return (
    <div className={className}>
      {!compact && (
        <h5 className="text-[28px] sm:text-[40px] font-normal text-[#002147] mb-4">
          {title}
        </h5>
      )}

      <form ref={formRef} className="space-y-3" onSubmit={handleSubmit}>

        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          required
          placeholder="Enter Name"
          className="w-full border bg-white px-6 py-2 text-sm placeholder-[#8F8F8F] focus:outline-none"
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
            
            className="bg-white px-6 py-2 text-sm text-gray-500 outline-none h-[45px]"
          >
            <option value="">Select City</option>
            {cities.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>

        </div>

        {/* COURSE SPECIALIZATION */}
        <div className="grid md:grid-cols-2 gap-3">
          <select
            name="course"
            value={form.course}
            onChange={handleChange}
            required
            className="bg-white px-6 py-2 text-sm text-gray-500 outline-none h-[45px]"
          >
            <option value="">Select Course</option>
            {COURSE_NAMES.map((course) => (
              <option key={course} value={course}>
                {course}
              </option>
            ))}
          </select>

          <select
            name="specialization"
            value={form.specialization}
            onChange={handleChange}
            required
            disabled={!form.course}
            className="bg-white px-6 py-2 text-sm text-gray-500 outline-none h-[45px]"
          >
            <option value="">Select Specialization</option>
            {specializations.map((spec) => (
              <option key={spec} value={spec}>
                {spec}
              </option>
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
          className="bg-[#0066A6] text-white px-8 py-2 text-sm hover:bg-[#081f36] transition disabled:opacity-60"
        >
          {submitting ? "Submitting..." : "Submit"}
        </button>

      </form>
    </div>
  );
}
