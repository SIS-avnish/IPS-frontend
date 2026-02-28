import { useState, useEffect, useMemo, memo } from "react";
import logo from "../../assets/logos/logo-white.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import { faPhone } from "@fortawesome/free-solid-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { Link, useLocation } from "react-router-dom";
import { fetchCollegeInfo, fetchCollegesWithCourses } from "../../services/api";

export default memo(function Footer() {

  const location = useLocation();
  const pathParts = location.pathname.split("/");

  const activeCollege =
    pathParts[1] && !["about","contact","placements","facilities"].includes(pathParts[1])
      ? pathParts[1]
      : "ipsa";

  const [collegeLogo, setCollegeLogo] = useState(null);
  const [colleges, setColleges] = useState([]);

  useEffect(() => {
    if (activeCollege && activeCollege !== "ipsa") {
      fetchCollegeInfo(activeCollege)
        .then((info) => setCollegeLogo(info?.logo || null))
        .catch(() => setCollegeLogo(null));
    } else {
      setCollegeLogo(null);
    }
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
    {label:"About Us", path:`/${activeCollege}/about`},
    {label:"Placements", path:`/${activeCollege}/placements`},
    {label:"Activities", path:`/${activeCollege}/activities/cultural`},
    {label:"Facilities", path:`/${activeCollege}/facilities`},
    {label:"Contact Us", path:`/${activeCollege}/contact`}
  ], [activeCollege]);

  return (

<footer className="bg-[#002147] text-white pt-14 pb-10 ">

  <div className="max-w-6xl mx-auto px-3 ">

    {/* ================= TOP COLLEGE GRID ================= */}
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-9 gap-x-8 gap-y-10">

      {sections.map((sec,i)=>(
        <div key={i}>
          <h6 className="text-[#00BFFF] font-medium mb-3">
            <Link to={`/${sec.slug}`} className="hover:underline">
              {sec.title}
            </Link>
          </h6>

          <ul className="space-y-1 leading-relaxed">
            {sec.links.map((l,idx)=>(
              <li className="border-t-1 leading-6" key={idx}>
                <Link to={`/${sec.slug}`} className="hover:text-[#00BFFF] transition">
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
  <div className="w-[40%]">
  <img
    src={collegeLogo || logo}
    className="h-[80px] lg:h-[96px] object-contain mx-auto lg:mx-0"
    alt="IPS Logo"
  />
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
          IPS Academy, AB Road,<br/>
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

      <div className="flex gap-3 justify-center lg:justify-start">
        <span className="text-[#ff7373] text-[20px]"><FontAwesomeIcon icon={faEnvelope} /></span>
        <a href="mailto:info@ipsacademy.org" className="hover:underline">
          info@ipsacademy.org
        </a>
      </div>

    </div>

  </div>

</div>

  </div>

</footer>

  );
})
