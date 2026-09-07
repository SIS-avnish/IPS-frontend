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
    pathParts[1] && !["about", "contact", "placements", "facilities", "404.html", "404"].includes(pathParts[1])
      ? pathParts[1]
      : "ipsa";

  const [collegeLogo, setCollegeLogo] = useState(null);
  const [socialLinks, setSocialLinks] = useState([]);
  const [colleges, setColleges] = useState([]);

  const customSocialLinks = {
    ipsa: [
      { platform: "instagram", url: "https://www.instagram.com/ipsa_indore_india?igsi=OW8wODdiZWhhZTJq" },
      { platform: "facebook", url: "https://www.facebook.com/share/1duEQ6JGos/" }
    ],
    ibmr: [
      { platform: "instagram", url: "https://www.instagram.com/ibmr_ipsacademy?igsi=MjRyN3JtamQ2em5h" },
      { platform: "facebook", url: "https://www.facebook.com/share/1C3ExXRD6g/" }
    ],
    isr: [ // Science and Research
      { platform: "instagram", url: "https://www.instagram.com/dsr_ips_academy?igsi=MXYybW56c2x3dGdveQ==" },
      { platform: "facebook", url: "https://www.facebook.com/share/19bKao3GJg/" }
    ],
    doss: [ // Social science
      { platform: "instagram", url: "https://www.instagram.com/deptofsocial_sciences?igsi=azlrZ3N6YmRoYTU5" },
      { platform: "facebook", url: "https://www.facebook.com/share/1LwXDkvdcN/" }
    ],
    iohm: [
      { platform: "instagram", url: "https://www.instagram.com/iohm_ipsacademy?igsi=MXFuYWlkZTZzZGpncA==" },
      { platform: "facebook", url: "https://www.facebook.com/share/1BPvX1H2jr/" }
    ],
    col: [ // College of Law
      { platform: "instagram", url: "https://www.instagram.com/collegeoflaw_ipsa?igsi=MWZweGc5cmJucWgwNw==" },
      { platform: "facebook", url: "https://www.facebook.com/share/19XShfH2je/" }
    ],
    soc: [ // School of Computer
      { platform: "instagram", url: "https://www.instagram.com/soc_ipsa?igsi=c21pZHA3aW51a3I0" },
      { platform: "facebook", url: "https://www.facebook.com/share/1EFUju3vws/" }
    ],
    coc: [ // Commerce
      { platform: "instagram", url: "https://www.instagram.com/departmentofcommerce_ipsa?igsi=MnBlcTUwMHZxdXVt" },
      { platform: "facebook", url: "https://www.facebook.com/share/18dgqJbr5L/" }
    ],
    ift: [ // Fashion
      { platform: "instagram", url: "https://www.instagram.com/ift_ips_academy?igsi=MW0wdDgyMzB1NW5jdA==" },
      { platform: "facebook", url: "https://www.facebook.com/share/1DPf9AyQh3/" }
    ]
  };

  useEffect(() => {
    fetchCollegeInfo(activeCollege)
      .then((info) => {
        setCollegeLogo(info?.footer_logo || info?.logo || null);
        
        // Use custom links for the active college, or fallback to API links. 
        // If neither exists, fallback to main IPSA links.
        let linksToUse = customSocialLinks[activeCollege] || info?.social_media_links;
        if (!linksToUse || linksToUse.length === 0) {
          linksToUse = customSocialLinks["ipsa"];
        }
        
        // Always include YouTube link globally
        const finalLinks = [...linksToUse, { platform: "youtube", url: "https://www.youtube.com/@IPSAIndoreIndia" }];
        
        setSocialLinks(finalLinks);
      })
      .catch(() => {
        setCollegeLogo(null);
        let fallbackLinks = customSocialLinks[activeCollege] || customSocialLinks["ipsa"];
        const finalLinks = [...fallbackLinks, { platform: "youtube", url: "https://www.youtube.com/@IPSAIndoreIndia" }];
        setSocialLinks(finalLinks);
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
    { label: "Home", path: activeCollege === "ipsa" ? "/ipsa/home" : `/${activeCollege}` },
    { label: "About IPSA", path: `/ipsa/about` },
    { label: "Placements", path: `/ipsa/placements` },
    { label: "Activities", path: `/${activeCollege}/activities/cultural` },
    { label: "Facilities", path: `/ipsa/facilities` },
    { label: "Contact Us", path: `/${activeCollege}/contact` }
  ], [activeCollege]);

  return (

    <footer className="bg-[#0066A6] text-white pt-14 pb-10 ">

      <div className="max-w-7xl mx-auto px-2 ">

        {/* ================= TOP COLLEGE GRID ================= */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-9 gap-x-4 gap-y-10">

          {sections.map((sec, i) => (
            <div key={i}>
              <h6 className="text-[#00BFFF] font-medium mb-3">
                <a href={`https://${sec.slug}.ipsa.ac.in/${sec.slug}`} target="_blank" rel="noopener noreferrer" className="text-xl text-[#00A7C4] hover:text-white transition">
                  {sec.title}
                </a>
              </h6>

              <ul className="space-y-4">
                {sec.links.map((l, idx) => (
                  <li key={idx} className="leading-tight" title={l}>
                    <a
                      href={`https://${sec.slug}.ipsa.ac.in/${sec.slug}#courses`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-[#00BFFF] transition block truncate"
                    >
                      {l}
                    </a>
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
              {navLinks.map((n, i) => (
                <li key={i}>
                  <Link to={n.path} className="hover:text-[#00BFFF] transition">
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* DIVIDER */}
            <div className="w-full border-t border-[#F68C1F] mt-4 mb-4"></div>

            {/* CONTACT */}
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 text-center lg:text-right">

              <div className="flex gap-3 justify-center lg:justify-start">
                <span className="text-[#ff7373] text-[20px]"><FontAwesomeIcon icon={faMapMarkerAlt} /></span>
                <p className="text-left">
                  IPS Academy, knowledge village,<br />
                  Rajendra Nagar, Indore (M.P)
                </p>
              </div>

              <div className="flex gap-3 justify-center lg:justify-start">
                <span className="text-[#ff7373] text-[20px]"><FontAwesomeIcon icon={faPhone} /></span>
                <p className="text-left">
                  +91 97748 97748
                </p>
              </div>

              <div className="flex flex-col  justify-center lg:items-baseline">
                <div>
                  <span className="text-[#ff7373] text-[20px]"><FontAwesomeIcon icon={faEnvelope} /></span>
                  <a href="mailto:info@ipsa.ac.in" className="hover:underline">
                    info@ipsa.ac.in
                  </a>
                </div>
                <div>
                  <span className="text-[#ff7373] text-[20px]"><FontAwesomeIcon icon={faEnvelope} /></span> <a href="mailto:admission@ipsa.ac.in" className="hover:underline">
                    admission@ipsa.ac.in
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
