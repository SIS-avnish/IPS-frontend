import { useState, useEffect } from "react";
import { NavLink, useLocation, Navigate, Link, useNavigate } from "react-router-dom";
import { fetchCollegeInfo, resolveImageUrl } from "../../services/api";
import logo from "../../assets/logos/logo.png";
import { Menu, X } from "lucide-react";

export default function Navbar() {

  const [menuOpen, setMenuOpen] = useState(false);
  const [collegesOpen, setCollegesOpen] = useState(false);
  const [otherCoursesOpen, setOtherCoursesOpen] = useState(false);
  const [collegeLogo, setCollegeLogo] = useState(null);
  const navigation = useNavigate();

  const location = useLocation();
  const pathParts = location.pathname.split("/");

  // ✅ Fix — exclude IPSA-level pages where pathParts[1] IS the page name
  const activeCollege =
    pathParts[1] && !["about", "contact", "placements", "facilities", "404.html", "404"].includes(pathParts[1])
      ? pathParts[1]
      : "ipsa";

  const isCollegeHome =
    activeCollege !== "ipsa" &&
    (
      pathParts.length === 2 ||
      pathParts[2] === "home" ||
      pathParts[2] === "about" ||
      pathParts[2] === "placements" ||
      pathParts[2] === "facilities" ||
      pathParts[2] === "contact" ||
      pathParts[2] === "activities" ||
      pathParts[2] === "faculties"   // ✅ ADD THIS
    );

  useEffect(() => {
    if (activeCollege) {
      fetchCollegeInfo(activeCollege)
        .then((info) => setCollegeLogo(info?.logo ? resolveImageUrl(info.logo) : null))
        .catch(() => setCollegeLogo(null));
    }
  }, [activeCollege]);



  const closeAll = () => {
    setMenuOpen(false);
    setCollegesOpen(false);
    setOtherCoursesOpen(false);
  }

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  /* ACTIVE LINK STYLE */
  const linkClass = ({ isActive }) =>
    `relative py-2 transition-colors
   ${isActive ? "text-red-500" : "text-gray-900"}
   hover:text-red-500
   after:absolute after:left-0 after:-bottom-1 after:h-[3px] after:w-full
   after:bg-orange-500 after:transition-transform after:duration-300
   ${isActive ? "after:scale-x-100" : "after:scale-x-0"}
   after:origin-left`;

  const dropdownLink = ({ isActive }) =>
    `px-4 py-2 transition-colors
     ${isActive ? "text-red-500" : "text-gray-800"}
     hover:bg-red-500 hover:text-white`;

  const colleges = [
    ["MANAGEMENT", "ibmr"],
    ["SCIENCE", "isr"],
    ["COMMERCE", "coc"],
    ["LAW", "col"],
    ["COMPUTERS", "soc"],
    ["FASHION", "ift"],
    ["EDUCATION", "coe"],
    ["HOTEL MANAGEMENT", "iohm"],
    ["SOCIAL SCIENCE", "doss"],
  ];

  const collegeNameMap = Object.fromEntries(
    colleges.map(([name, slug]) => [slug, name])
  );


  const collegeSections = [
    ["Courses", "courses"],
    ["Faculty", "faculties"],
    ["Admission", "admission"],
    ["ApplyNow", "applyform"],
    ["Recruiter", "recruiters"],
    ["Other Courses ", "othercourses "]
  ];



  return (

    <header className="bg-white sticky top-0 z-50 shadow-sm">

      <div className="relative max-w-[1440px] mx-auto h-16 sm:h-20 lg:h-[96px] px-4 sm:px-6 lg:px-14 flex items-center justify-between gap-4">

        {/* LOGO */}
        <div onClick={() => window.location.href = "https://ipsa.ac.in/"} className="flex-shrink-0 cursor-pointer">

          <img src={collegeLogo || logo} className="h-12 sm:h-14 lg:h-20 w-auto object-contain transition-transform duration-300 hover:scale-105" alt="logo" />
        </div>

        {/* HAMBURGER */}
        <button
          type="button"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          className="ml-auto shrink-0 lg:hidden inline-flex h-11 w-11 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-900 shadow-sm transition hover:bg-gray-100 relative z-50"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>

        {/* MENU */}
        <nav className={`absolute lg:static top-full left-0 w-full lg:w-auto
        bg-white lg:bg-transparent
        flex flex-col lg:flex-row
        lg:items-center gap-5 lg:gap-8
        px-4 sm:px-6 lg:px-0 py-4 lg:py-0
        border-t lg:border-none
        shadow-xl lg:shadow-none
        overflow-y-auto lg:overflow-visible max-h-[calc(100vh-4rem)] sm:max-h-[calc(100vh-5rem)] lg:max-h-none
        ${menuOpen ? "flex" : "hidden lg:flex"}`}>

          {activeCollege === "ipsa" ? (
            <NavLink
              to="https://ipsa.ac.in/"
              end
              className={linkClass}
              onClick={closeAll}
            >
              Home
            </NavLink>
          ) : (
            <NavLink
              to={`https://ipsa.ac.in/`}
              end
              className={linkClass}
              onClick={closeAll}
            >
              Home
            </NavLink>
          )}

          {/* ABOUT */}
          <NavLink to={`/ipsa/about`} className={linkClass} onClick={closeAll}>
            {activeCollege === "ipsa" ? "About IPSA" : "About IPSA"}
          </NavLink>

          {/* COLLEGES */}
          <div
            className="relative"
            onMouseEnter={() => setCollegesOpen(true)}
            onMouseLeave={() => setCollegesOpen(false)}
          >
            <button
              onClick={() => {
                if (isCollegeHome) {
                  navigation(`/${activeCollege}`);
                } else {
                  setCollegesOpen(!collegesOpen);
                }
              }}
              className="w-full lg:w-auto text-left py-2 font-medium text-gray-900 hover:text-red-500 flex items-center justify-between lg:justify-start gap-2"
            >
              {isCollegeHome ? collegeNameMap[activeCollege] : "Courses"} ▾
            </button>

            <div className={`lg:absolute lg:top-full lg:left-0
          bg-white shadow-md border lg:min-w-[180px]
          flex flex-col
          ${collegesOpen ? "block" : "hidden"}`}>

              {isCollegeHome
                ? collegeSections.map(([name, id]) =>
                  name === "Other Courses " ? (
                    <div key={id} className="relative group">

                      {/* OTHER COURSES BUTTON */}
                      <div
                        className="px-4 py-2 flex justify-between items-center text-gray-800 hover:bg-red-500 hover:text-white cursor-pointer"
                        onClick={() => setOtherCoursesOpen(!otherCoursesOpen)}
                      >
                        {name}
                        <span className={`transition-transform lg:rotate-0 ${otherCoursesOpen ? "rotate-90" : ""}`}>▶</span>
                      </div>

                      {/* SUB MENU */}
                      <div className={`lg:absolute lg:left-full lg:top-0 lg:hidden lg:group-hover:flex flex-col bg-white shadow-md border lg:min-w-[180px] ${otherCoursesOpen ? "flex" : "hidden"}`}>

                        {colleges.map(([collegeName, slug]) => (
                          <a
                            key={slug}
                            href={`https://${slug}.ipsa.ac.in/${slug}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={closeAll}
                            className={dropdownLink}
                          >
                            {collegeName}
                          </a>
                        ))}

                      </div>
                    </div>
                  ) : (
                    <a
                      key={id}
                      href={`/${activeCollege}#${id}`}
                      onClick={closeAll}
                      className="px-4 py-2 text-gray-800 hover:bg-red-500 hover:text-white"
                    >
                      {name}
                    </a>
                  )
                )
                : colleges.map(([name, slug]) => (
                  <a
                    key={slug}
                    href={`https://${slug}.ipsa.ac.in/${slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={closeAll}
                    className={dropdownLink}
                  >
                    {name}
                  </a>
                ))
              }


            </div>
          </div>

          {/* PLACEMENTS */}
          <NavLink to={`/ipsa/placements`} className={linkClass} onClick={closeAll}>
            Placements
          </NavLink>

          {/* STUDENT LIFE */}
          {/*  <div
        className="relative"
        onMouseEnter={()=>setStudentOpen(true)}
        onMouseLeave={()=>setStudentOpen(false)}
      >
        <button
          onClick={()=>setStudentOpen(!studentOpen)}
          className="py-2 font-medium text-gray-900 hover:text-red-500"
        >
          Activities ▾
        </button>

        <div className={`lg:absolute lg:top-full lg:left-0
          bg-white shadow-md border lg:min-w-[200px]
          flex flex-col
          ${studentOpen?"block":"hidden"}`}>

          {studentLinks.map(([name,slug])=>(
            <NavLink
              key={slug}
              to={`/${activeCollege}/activities/${slug}`}
              onClick={closeAll}
              className={dropdownLink}
            >
              {name}
            </NavLink>
          ))}

        </div>
      </div> */}

          <NavLink to={`/${activeCollege}/activities`} className={linkClass} onClick={closeAll}>
            Activities
          </NavLink>

          {/* FACILITIES */}
          <NavLink to={`/ipsa/facilities`} className={linkClass} onClick={closeAll}>
            Facilities
          </NavLink>

          {/* CONTACT */}
          <NavLink to={`/${activeCollege}/contact`} className={linkClass} onClick={closeAll}>
            Contact Us
          </NavLink>

        </nav>

      </div>

    </header>

  );
}
