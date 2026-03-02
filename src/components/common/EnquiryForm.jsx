import { useState, useMemo, useCallback, useRef } from "react";
import { submitContactForm } from "../../services/api";

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

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setForm((prev) => {
      const next = { ...prev, [name]: value };
      if (name === "state") next.city = "";
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
    </div>
  );
}
