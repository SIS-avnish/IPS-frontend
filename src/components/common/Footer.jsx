import { useState, useEffect, useMemo, memo } from "react";
import logo from "../../assets/logos/logo-white.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt, faPhone, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import {
  faInstagram,
  faFacebookF,
  faXTwitter,
  faLinkedinIn,
  faYoutube,
  faWhatsapp,
} from "@fortawesome/free-brands-svg-icons";
import { Link, useLocation } from "react-router-dom";
import { fetchCollegeInfo, fetchCollegesWithCourses } from "../../services/api";

// Map platform name → icon
const SOCIAL_ICONS = {
  instagram: faInstagram,
  facebook: faFacebookF,
  twitter: faXTwitter,
  linkedin: faLinkedinIn,
  youtube: faYoutube,
  whatsapp: faWhatsapp,
};

export default memo(function Footer() {

  const location = useLocation();
  const pathParts = location.pathname.split("/");

  const activeCollege =
    pathParts[1] && !["about","contact","placements","facilities"].includes(pathParts[1])
      ? pathParts[1]
      : "ipsa";

  const [collegeLogo, setCollegeLogo] = useState(null);
  const [socialLinks, setSocialLinks] = useState([]);
  const [colleges, setColleges] = useState([]);

  useEffect(() => {
    fetchCollegeInfo(activeCollege)
      .then((info) => {
        setCollegeLogo(info?.footer_logo || info?.logo || null);
        setSocialLinks(info?.social_media_links || []);
      })
      .catch(() => {
        setCollegeLogo(null);
        setSocialLinks([]);
      });
  }, [activeCollege]);

  useEffect(() => {
    fetchCollegesWithCourses()
      .then((data) => setColleges(data?.colleges || []))
      .catch(() => setColleges([]));
  }, []);

  // Build footer sections from API data — exclude the main "ipsa" entry
  const sections = useMemo(() =>
    colleges
      .filter((c) => c.slug.toLowerCase() !== "ipsa")
      .map((c) => ({
        title: c.name,
        slug: c.slug.toLowerCase(),
        links: (c.courses || []).map((course) => course.trim()).filter(Boolean),
      })),
    [colleges]
  );

  const navLinks = useMemo(() => [
    {label:"Home", path: activeCollege === "ipsa" ? "/ipsa/home" : `/${activeCollege}`},
    {label:"About IPSA", path:`/ipsa/about`},
    {label:"Placements", path:`/ipsa/placements`},
    {label:"Activities", path:`/${activeCollege}/activities/cultural`},
    {label:"Facilities", path:`/ipsa/facilities`},
    {label:"Contact Us", path:`/${activeCollege}/contact`}
  ], [activeCollege]);

  return (

<footer className="bg-[#002147] text-white pt-14 pb-10 ">

  <div className="max-w-7xl mx-auto px-2 ">

    {/* ================= TOP COLLEGE GRID ================= */}
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-9 gap-x-4 gap-y-10">

      {sections.map((sec,i)=>(
        <div key={i}>
          <h6 className="text-[#00BFFF] font-medium mb-3">
            <Link to={`/${sec.slug}`} className="text-xl text-[#00BFFF] hover:text-white transition">
              {sec.title}
            </Link>
          </h6>

          <ul className="space-y-4">
  {sec.links.map((l, idx) => (
    <li key={idx} className="leading-tight">
      <Link
        to={`/${sec.slug}`}
        className="hover:text-[#00BFFF] transition"
      >
        {l}
      </Link>
    </li>
  ))}
</ul>
        </div>
      ))}

    </div>


   {/* LOGO + RIGHT CONTENT */}
<div className="flex flex-col lg:flex-row items-center lg:items-start justify-between mt-12 gap-10">

  {/* LOGO */}
  <div className="w-full lg:w-[40%] flex flex-col items-center lg:items-start gap-5">
  <img
    src={collegeLogo || logo}
    className="h-[80px] lg:h-[96px] bg-transparent object-contain mx-auto lg:mx-0"
    alt="IPS Logo"
  />

  {/* SOCIAL MEDIA */}
  {socialLinks.length > 0 && (
    <div className="flex items-center gap-3 flex-wrap justify-center lg:justify-start">
      {socialLinks.map((link) => {
        const icon = SOCIAL_ICONS[link.platform?.toLowerCase()];
        if (!icon || !link.url) return null;
        return (
          <a
            key={link.platform}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={link.platform}
            className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center
                       text-white hover:bg-[#00BFFF] hover:text-white transition-colors"
          >
            <FontAwesomeIcon icon={icon} className="text-[15px]" />
          </a>
        );
      })}
    </div>
  )}
  </div>

  {/* RIGHT SIDE */}
  <div className=" flex flex-col items-center lg:items-start w-full">

    {/* NAV */}
    <ul className="flex flex-wrap justify-center lg:justify-start gap-6 sm:gap-8 md:gap-[55px] text-[15px] sm:text-[16px]">
      {navLinks.map((n,i)=>(
        <li key={i}>
          <Link to={n.path} className="hover:text-[#00BFFF] transition">
            {n.label}
          </Link>
        </li>
      ))}
    </ul>

    {/* DIVIDER */}
    <div className="w-full border-t border-[#0F3D72] mt-4 mb-4"></div>

    {/* CONTACT */}
    <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 text-center lg:text-right">

      <div className="flex gap-3 justify-center lg:justify-start">
        <span className="text-[#ff7373] text-[20px]"><FontAwesomeIcon icon={faMapMarkerAlt} /></span>
        <p className="text-left">
          IPS Academy, knowledge village,<br/>
          Rajendra Nagar, Indore (M.P)
        </p>
      </div>

      <div className="flex gap-3 justify-center lg:justify-start">
        <span className="text-[#ff7373] text-[20px]"><FontAwesomeIcon icon={faPhone} /></span>
        <p className="text-left">
          +91 92294 98055<br/>
          +91 99778 35161
        </p>
      </div>

      <div className="flex flex-col  justify-center lg:items-baseline">
        <div>
           <span className="text-[#ff7373] text-[20px]"><FontAwesomeIcon icon={faEnvelope} /></span>
            <a href="mailto:info@ipsacademy.org" className="hover:underline">
            info@ipsacademy.org
            </a>
        </div>
        <div>
              <span className="text-[#ff7373] text-[20px]"><FontAwesomeIcon icon={faEnvelope} /></span> <a href="mailto:admission@ipsacademy.org" className="hover:underline">
             admission@ipsacademy.org
             </a>
          </div>
        
      </div>

    </div>

  </div>

</div>

  </div>

</footer>

  );
})
