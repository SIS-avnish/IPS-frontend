
import { memo, useEffect, useState } from "react";
import { motion } from "framer-motion";
import logoIps from "../../assets/Images/logoips.png";
import phoneLayer from "../../assets/Images/layer.png";
import heroImage from "../../assets/Images/heroimage.png";
import foundation1 from "../../assets/Images/foundation_image_1.jpg";
import foundation2 from "../../assets/Images/foundation_image_2.jpg";
import foundation3 from "../../assets/Images/foundation_image_3.jpg";
import foundation4 from "../../assets/Images/foundation_image_4.jpg";
import foundation5 from "../../assets/Images/foundation_image_5.jpg";
import programsBg from "../../assets/Images/image1.png";
import akshatImg from "../../assets/Images/AKSHAT.png";
import tinaImg from "../../assets/Images/TINAVAISHNAV.png";
import harshitImg from "../../assets/Images/harshitmukati.png";
import rivaaImg from "../../assets/Images/Riyabhargava.png";
import soumitraImg from "../../assets/Images/soumitrabajaj.png";
import EnquiryForm from "../common/EnquiryForm";

const logoModules = import.meta.glob("../../assets/logos/*.png", {
  eager: true,
  import: "default",
});

const recruiterLogos = Object.entries(logoModules)
  .sort((a, b) => {
    const aNum = parseInt(a[0].match(/(\d+)\.png$/)?.[1] || "0", 10);
    const bNum = parseInt(b[0].match(/(\d+)\.png$/)?.[1] || "0", 10);
    return aNum - bNum;
  })
  .map(([, src]) => src);

const recruiterLoop = recruiterLogos.length
  ? [...recruiterLogos, ...recruiterLogos]
  : [];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5, ease: "easeOut" } },
};

const stagger = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.05 },
  },
};

const cardFade = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: "easeOut" },
  },
};

const containerClass = "w-[90%] max-w-[1200px] mx-auto";

const sectionTitleClass =
  "text-[#2397bd] text-[28px] font-normal text-center mb-8 tracking-[0.5px] leading-[1.3] max-[600px]:text-[22px] max-[600px]:mb-[25px]";

const stats = [
  { value: "33", lines: ["Years of", "Academic Legacy"] },
  { value: "6,000+", lines: ["Active", "Students"] },
  { value: "80,000+", lines: ["Alumni", "Network"] },
  { value: "250+", lines: ["Faculty", "Members"] },
  { value: "58-Acre", lines: ["Integrated", "Campus"] },
  { value: "9", lines: ["Schools", "Multiple Career Paths"] },
];

const features = [
  {
    image: foundation1,
    titleLines: ["Futuristic", "Programs"],
    desc: "Curriculum aligned with evolving industries & tech",
  },
  {
    image: foundation2,
    titleLines: ["New-Age Skills", "Integration"],
    desc: "Technology and AI-enhanced learning",
    orange: true,
  },
  {
    image: foundation3,
    titleLines: ["Safe & Structured", "Campus"],
    desc: "Focused academic environment",
  },
  {
    image: foundation4,
    titleLines: ["Career-Focused", "Approach"],
    desc: "Skill development & practical exposure",
    orange: true,
  },
  {
    image: foundation5,
    titleLines: ["Placement &", "Career Support"],
    desc: "Guidance beyond graduation",
  },
];

const programs = [
  {
    titleLines: ["INSTITUTE OF BUSINESS", "MANAGEMENT & RESEARCH"],
    descLines: ["BBA | MBA | Ph.D."],
  },
  {
    titleLines: ["DEPARTMENT OF", "COMMERCE"],
    descLines: ["B.Com + Professional Course | M.Com"],
    orange: true,
  },
  {
    titleLines: ["DEPARTMENT OF SCIENCE", "AND RESEARCH"],
    descLines: ["B.Sc. | M.Sc. | Ph.D."],
  },
  {
    titleLines: ["COLLEGE OF LAW"],
    descLines: [
      "B.A.LL.B. (Hons.)",
      "BBA. LL.B. (Hons.)",
      "LL.B. (Hons.) | LL.M.",
    ],
    orange: true,
  },
  {
    titleLines: ["COLLEGE OF", "EDUCATION"],
    descLines: ["B.Ed. (2 Years)"],
  },
  {
    titleLines: ["SCHOOL OF", "COMPUTERS"],
    descLines: ["BCA | MCA | MCA (Integrated)"],
    orange: true,
  },
  {
    titleLines: ["INSTITUTE OF FASHION", "TECHNOLOGY"],
    descLines: [
      "B.Design (Fashion)",
      "P.G. Diploma in Fashion Design",
      "Certificate Course",
    ],
  },
  {
    titleLines: ["INSTITUTE OF HOTEL", "MANAGEMENT"],
    descLines: ["BHM | BBA (Hotel Management)"],
    orange: true,
  },
  {
    titleLines: ["DEPARTMENT OF SOCIAL", "SCIENCES"],
    descLines: ["BA | B.Lib. | MSW"],
  },
];

const testimonials = [
  {
    image: akshatImg,
    quote:
      "IPS Academy provided a life-changing experience that left a lasting impact.",
    name: "Akshat Khamparia",
    metaLines: ["(Batch: 2006-2009 | COC)", "International Chess Player"],
  },
  {
    image: tinaImg,
    quote:
      "My experience was life-changing—IPS Academy gave me a strong foundation in law.",
    name: "Tina Vaishnav",
    metaLines: ["(Batch: 2011-2016 | BALLB)", "Code-28 Selected Faculty"],
  },
  {
    image: harshitImg,
    quote:
      "The education, mentorship and practical insights I gained at IPSA were instrumental.",
    name: "Harshit Mukati",
    metaLines: ["(Batch: 2017-2020 | BBA)", "Founder: Mukati Agro Overseas"],
  },
  {
    image: rivaaImg,
    quote: "For me, IPS Academy was the launchpad to an international career.",
    name: "Rivaa Bhargava",
    metaLines: ["(B.Sc. BT/LS)", "Team Leader, FinCrime, Poland"],
  },
  {
    image: soumitraImg,
    quote: "IPS Academy provided strong academic and practical training in law.",
    name: "Soumitra Bajaj",
    metaLines: [
      "(Batch: 2011-2016 | BALLB)",
      "Advocate MP High Court, Indore",
    ],
  },
];

function WhatsappBadge({ className = "" }) {
  return (
    <span
      className={`inline-flex items-center justify-center w-[18px] h-[18px] rounded-full bg-[#25D366] text-white text-[10px] font-bold ${className}`}
      aria-hidden="true"
    >
      W
    </span>
  );
}

export default memo(function Admission() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 200);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div
      className="text-[#222] bg-white"
      style={{ fontFamily: '"DejaVu Sans", Arial, sans-serif' }}
    >
      <header className="bg-white border-b-[4px] border-[#2d9bc3] py-[14px]">
        <div
          className={`${containerClass} flex justify-between items-center gap-5 flex-wrap max-[768px]:flex-col max-[768px]:text-center`}
        >
          <div>
            <img
              src={logoIps}
              alt="IPS Academy Logo"
              className="w-[320px] max-w-full h-auto block max-[600px]:w-[250px] max-[420px]:w-[220px]"
              loading="eager"
            />
          </div>

          <div className="flex flex-col items-end gap-3 max-[768px]:items-center">
            <div className="flex items-center justify-end gap-[6px] text-[17px] font-bold mt-2 text-[#222] flex-wrap max-[992px]:text-[16px] max-[600px]:text-[14px]">
              <span className="flex items-center gap-1">
                <img
                  src={phoneLayer}
                  alt="Phone Icon"
                  className="w-[18px] h-auto object-contain"
                />
                <WhatsappBadge className="ml-[2px]" />
                +91 92294 98055
              </span>
              <span className="text-[#222]">|</span>
              <span>+91 99778 35161</span>
            </div>

            <nav className="flex gap-2 flex-wrap justify-end max-[768px]:justify-center w-full">
              <a
                href="#about"
                className="text-white text-[14px] font-semibold px-5 py-[10px] rounded-[4px] bg-[#e58c18] transition-opacity hover:opacity-85 max-[600px]:flex-1 max-[600px]:min-w-[95px] max-[600px]:text-[12px] max-[600px]:px-[8px] max-[600px]:py-[9px]"
              >
                About
              </a>
              <a
                href="#courses"
                className="text-white text-[14px] font-semibold px-5 py-[10px] rounded-[4px] bg-[#329ac1] transition-opacity hover:opacity-85 max-[600px]:flex-1 max-[600px]:min-w-[95px] max-[600px]:text-[12px] max-[600px]:px-[8px] max-[600px]:py-[9px]"
              >
                Courses
              </a>
              <a
                href="https://ipsacademyindore.edu.in/"
                target="_blank"
                rel="noreferrer"
                className="text-[#222] text-[14px] font-semibold px-5 py-[10px] rounded-[4px] bg-[#ffd400] transition-opacity hover:opacity-85 max-[600px]:flex-1 max-[600px]:min-w-[95px] max-[600px]:text-[12px] max-[600px]:px-[8px] max-[600px]:py-[9px]"
              >
                Visit Website
              </a>
            </nav>
          </div>
        </div>
      </header>

      <section
        className="w-full border-t-[4px] border-[#2d9bc3] relative bg-center bg-cover"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div
          className={`${containerClass} min-h-[580px] flex justify-between items-center gap-[30px] px-0 max-[992px]:min-h-0 max-[992px]:flex-col max-[992px]:items-center max-[992px]:text-center max-[992px]:py-[50px] max-[768px]:items-start max-[768px]:text-left max-[768px]:py-[35px] max-[768px]:pb-[120px] max-[600px]:py-[35px]`}
        >
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="w-[55%] flex flex-col items-start overflow-hidden max-[992px]:w-full max-[992px]:items-center max-[768px]:items-start"
          >
            <h2 className="text-white text-[52px] leading-none font-extrabold mb-[10px] text-left drop-shadow-[2px_2px_4px_rgba(0,0,0,0.45)] max-[1200px]:text-[46px] max-[992px]:text-[42px] max-[768px]:text-[34px] max-[420px]:text-[30px]">
              New-age
              <br />
              Learning.
            </h2>
            <h3 className="text-[#ffdb00] text-[58px] leading-[0.95] font-black mb-[35px] text-left drop-shadow-[2px_2px_4px_rgba(0,0,0,0.45)] max-[1200px]:text-[46px] max-[992px]:text-[42px] max-[768px]:text-[38px] max-[600px]:text-[34px]">
              BACKED BY
              <br />
              33 YEARS OF
              <br />
              LEGACY.
            </h3>
          </motion.div>

          <div className="w-[300px] flex-shrink-0 bg-[#f5f5f5] shadow-[0_4px_20px_rgba(0,0,0,0.2)] rounded-[4px] overflow-hidden max-[992px]:w-[420px] max-[992px]:max-w-full max-[768px]:w-full max-[768px]:max-w-[400px]">
            <div className="bg-[#2d9bc3] text-white text-[13px] font-bold px-[15px] py-[10px] flex items-center justify-between tracking-[1px]">
              ENQUIRY <span className="text-[16px] cursor-pointer">×</span>
            </div>
            <div className="p-[14px] pb-[20px]">
              <EnquiryForm collegeSlug="ipsa" compact />
            </div>
          </div>
        </div>

        <div className="absolute left-0 bottom-[65px] w-[40%] m-0 px-[20px] pl-[70px] py-[12px] bg-[#1aaebc] text-white text-[26px] font-black leading-none tracking-[0.5px] max-[992px]:text-[32px] max-[768px]:left-0 max-[768px]:bottom-[35px] max-[768px]:w-full max-[768px]:px-[15px] max-[768px]:text-center max-[768px]:text-[20px] max-[600px]:text-[24px] max-[420px]:text-[21px]">
          <span className="text-[#f39a18] italic font-black">#</span>
          Ambition
          <span className="text-[#f39a18] italic font-black">Se</span>
          Occupation
          <span className="text-[#f39a18] italic font-black">Tak!</span>
        </div>
      </section>

      <section className="bg-[#e9e9e9] py-[60px] pb-[70px] text-center">
        <div className={containerClass}>
          <motion.h2
            className={sectionTitleClass}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            WHY THOUSANDS OF <b>PEOPLE TRUST</b> IPS ACADEMY?
          </motion.h2>
          <motion.div
            className="grid grid-cols-6 gap-4 max-[1024px]:grid-cols-3 max-[768px]:grid-cols-2 max-[600px]:grid-cols-1"
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {stats.map((stat) => (
              <motion.div
                key={stat.value}
                className="bg-white rounded-[16px] p-[28px] px-[12px] min-h-[140px] flex flex-col items-center justify-center max-[600px]:min-h-0 max-[600px]:py-[24px]"
                variants={cardFade}
              >
                <h3 className="text-[#2d9bc3] text-[30px] leading-none mb-2">
                  {stat.value}
                </h3>
                <p className="text-[13px] font-bold leading-[1.2] text-[#444]">
                  {stat.lines.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="py-[55px] bg-white border-b border-[#e5e5e5] overflow-hidden">
        <div className={containerClass}>
          <motion.h2
            className={sectionTitleClass}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            OUR <b>RECRUITERS</b>
          </motion.h2>

          <motion.div
            className="overflow-hidden w-full"
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <motion.div
              className="flex w-max"
              animate={{ x: ["0%", "-50%"] }}
              transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
            >
              {recruiterLoop.map((logo, index) => (
                <img
                  key={`${logo}-${index}`}
                  src={logo}
                  alt={`Recruiter logo ${index + 1}`}
                  className="w-[130px] h-[70px] object-contain mx-3 bg-white p-2 border border-[#ddd] rounded-[8px] flex-shrink-0 max-[992px]:w-[120px] max-[992px]:h-[70px] max-[600px]:w-[105px] max-[600px]:h-[60px] max-[600px]:mx-2"
                  loading="lazy"
                />
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section id="about" className="py-[60px] border-b border-[#e5e5e5]">
        <div className={containerClass}>
          <motion.h2
            className={sectionTitleClass}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            STRONG FOUNDATIONS. <b>FUTURE-READY</b> LEARNING.
          </motion.h2>

          <motion.div
            className="grid grid-cols-5 gap-8 max-[1024px]:grid-cols-3 max-[768px]:grid-cols-2 max-[600px]:grid-cols-1 max-[768px]:gap-6"
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {features.map((feature) => (
              <motion.div key={feature.desc} variants={cardFade}>
                <div
                  className="w-full h-[180px] rounded-[10px] mb-4 bg-cover bg-center max-[600px]:h-[220px]"
                  style={{ backgroundImage: `url(${feature.image})` }}
                />
                <h3
                  className={`text-[18px] leading-[1.2] mb-2 ${
                    feature.orange ? "text-[#e58c18]" : "text-[#2397bd]"
                  }`}
                >
                  {feature.titleLines.map((line, idx) => (
                    <span key={`${feature.desc}-${idx}`} className="block">
                      {line}
                    </span>
                  ))}
                </h3>
                <p className="text-[#666] text-[13px] leading-[1.4]">
                  {feature.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section
        id="courses"
        className="py-[65px] pb-[90px] bg-[#bcd8ef] bg-center bg-cover"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.22), rgba(255,255,255,0.22)), url(${programsBg})`,
        }}
      >
        <div className={containerClass}>
          <motion.h2
            className={`${sectionTitleClass} text-[#111] max-[600px]:text-[22px]`}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            ONE INSTITUTE. <b>INFINITE POSSIBILITIES.</b>
          </motion.h2>

          <motion.div
            className="grid grid-cols-5 gap-y-[120px] gap-x-[28px] max-[1200px]:gap-y-[90px] max-[1024px]:grid-cols-3 max-[1024px]:gap-[28px] max-[768px]:grid-cols-2 max-[768px]:gap-[20px] max-[600px]:gap-[14px] max-[420px]:grid-cols-1"
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {programs.map((program, index) => (
              <motion.div
                key={program.titleLines.join(" ")}
                className={`bg-white/90 min-h-[160px] rounded-[14px] p-[24px] px-[20px] shadow-[0_2px_12px_rgba(0,0,0,0.08)] transition-transform hover:-translate-y-1 hover:shadow-[0_8px_24px_rgba(0,0,0,0.13)] max-[992px]:bg-white/70 max-[992px]:min-h-[150px] max-[992px]:p-[22px] max-[600px]:min-h-[125px] max-[600px]:p-[15px] ${
                  index === 5 ? "lg:col-start-1" : ""
                } ${index === 6 ? "lg:col-start-2" : ""} ${
                  index === 7 ? "lg:col-start-4" : ""
                } ${index === 8 ? "lg:col-start-5" : ""}`}
                variants={cardFade}
              >
                <h3
                  className={`text-[17px] leading-[1.2] mb-[10px] font-semibold max-[600px]:text-[14px] ${
                    program.orange ? "text-[#e58c18]" : "text-[#2397bd]"
                  }`}
                >
                  {program.titleLines.map((line, idx) => (
                    <span key={`${program.titleLines[0]}-${idx}`} className="block">
                      {line}
                    </span>
                  ))}
                </h3>
                <p className="text-[17px] leading-[1.3] text-[#333] font-semibold max-[600px]:text-[13px] max-[600px]:leading-[1.35]">
                  {program.descLines.map((line, idx) => (
                    <span key={`${program.descLines[0]}-${idx}`} className="block">
                      {line}
                    </span>
                  ))}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="py-[60px]">
        <div className={containerClass}>
          <motion.h2
            className={sectionTitleClass}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            STRONG FOUNDATIONS. <b>FUTURE-READY</b> LEARNING.
          </motion.h2>

          <motion.div
            className="grid grid-cols-5 gap-9 max-[1024px]:grid-cols-3 max-[768px]:grid-cols-2 max-[600px]:grid-cols-1 max-[768px]:gap-7"
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {testimonials.map((item) => (
              <motion.div key={item.name} className="group" variants={cardFade}>
                <img
                  src={item.image}
                  className="w-full h-[180px] object-cover border-b-4 border-[#e58c18] mb-[14px] block rounded-t-[4px] grayscale-[80%] transition group-hover:grayscale-0 max-[600px]:h-[220px]"
                  alt={item.name}
                  loading="lazy"
                />
                <p className="text-[13px] text-[#555] leading-[1.4] min-h-[80px] border-b border-[#ddd] pb-[14px]">
                  {item.quote}
                </p>
                <h3 className="text-[#e58c18] text-[16px] mt-[12px] font-bold">
                  {item.name}
                </h3>
                <span className="block text-[#555] text-[12px] leading-[1.4] mt-[4px]">
                  {item.metaLines.map((line, idx) => (
                    <span key={`${item.name}-${idx}`} className="block">
                      {line}
                    </span>
                  ))}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {showScrollTop && (
        <button
          onClick={scrollToTop}
          id="scrollTopBtn"
          title="Go to top"
          className="fixed bottom-6 right-6 z-[999] text-[20px] border-none bg-[#2d9bc3] text-white cursor-pointer px-[16px] py-[12px] rounded-full shadow-[0_4px_12px_rgba(0,0,0,0.25)] transition-colors hover:bg-[#e58c18] max-[600px]:bottom-[15px] max-[600px]:right-[15px] max-[600px]:px-[14px] max-[600px]:py-[10px] max-[600px]:text-[18px]"
        >
          ↑
        </button>
      )}

      <footer id="visit" className="border-t border-[#ddd] pb-[55px] text-center">
        <div className={`${containerClass} flex flex-col items-center`}>
          <h2 className="inline-block bg-[#e58c18] text-white px-[40px] py-[16px] text-[26px] font-black tracking-[1px] mb-[24px] max-[600px]:text-[20px] max-[600px]:px-[18px] max-[600px]:py-[12px]">
            EXPLORE MORE. VISIT THE CAMPUS.
          </h2>
          <p className="text-[16px] leading-[1.5] text-[#444] max-w-[540px] mb-[10px] max-[600px]:text-[14px]">
            Speak with our academic counsellors or plan a campus visit to
            <br />
            understand how IPS Academy supports your journey of
          </p>
          <h3 className="text-[28px] font-black my-[10px] mb-[28px] leading-[1.2] text-center text-[#2397bd] whitespace-nowrap [text-shadow:1px_1px_2px_rgba(0,0,0,0.15)] max-[768px]:text-[22px] max-[768px]:whitespace-normal max-[600px]:text-[28px] max-[600px]:break-words max-[600px]:[overflow-wrap:anywhere]">
            <span className="text-[#f39a18] italic font-black">#</span>
            Ambition
            <span className="text-[#f39a18] italic font-black">Se</span>
            Occupation
            <span className="text-[#f39a18] italic font-black">Tak!</span>
          </h3>
          <div className="border-t border-b border-[#ccc] inline-block px-[60px] py-[20px] text-[20px] font-bold text-[#222] max-[768px]:w-full max-[768px]:px-[20px] max-[768px]:text-[17px] max-[600px]:w-full max-[600px]:px-[10px] max-[600px]:text-[15px]">
            Call: +91 92294 98055 | +91 99778 35161
          </div>
        </div>
      </footer>
    </div>
  );
});
