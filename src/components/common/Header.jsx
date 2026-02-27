import { useState, useEffect } from "react";
import { NavLink, useLocation,Navigate,Link } from "react-router-dom";
import logo from "../../assets/logos/logo.png";
import { fetchCollegeInfo } from "../../services/api";

export default function Navbar(){

  const [menuOpen,setMenuOpen]=useState(false);
  const [collegesOpen,setCollegesOpen]=useState(false);
  const [studentOpen,setStudentOpen]=useState(false);
  const [collegeLogo,setCollegeLogo]=useState(null);

  const location = useLocation();
  const pathParts = location.pathname.split("/");

  // ✅ Fix — exclude IPSA-level pages where pathParts[1] IS the page name
const activeCollege =
  pathParts[1] && !["about","contact","placements","facilities"].includes(pathParts[1])
    ? pathParts[1]
    : "ipsa";

    const isCollegeHome =
  activeCollege !== "ipsa" &&
  (
    pathParts.length === 2 ||      // /ibmr
    pathParts[2] === "home" ||
    pathParts[2] === "about"||      pathParts[2] === "placements"||      pathParts[2] === "facilities"||
      pathParts[2] === "contact"
  );


  useEffect(() => {
    if (activeCollege && activeCollege !== "ipsa") {
      fetchCollegeInfo(activeCollege)
        .then((info) => setCollegeLogo(info?.logo || null))
        .catch(() => setCollegeLogo(null));
    } else {
      setCollegeLogo(null);
    }
  }, [activeCollege]);



  const closeAll=()=>{
    setMenuOpen(false);
    setCollegesOpen(false);
    setStudentOpen(false);
  }

  /* ACTIVE LINK STYLE */
  const linkClass = ({ isActive }) =>
  `relative py-2 transition-colors
   ${isActive ? "text-red-500" : "text-gray-900"}
   hover:text-red-500
   after:absolute after:left-0 after:-bottom-1 after:h-[3px] after:w-full
   after:bg-orange-500 after:transition-transform after:duration-300
   ${isActive ? "after:scale-x-100" : "after:scale-x-0"}
   after:origin-left`;

  const dropdownLink=({isActive}) =>
    `px-4 py-2 transition-colors
     ${isActive?"text-red-500":"text-gray-800"}
     hover:bg-red-500 hover:text-white`;

  const studentLinks = [
    ["Cultural Activities","cultural"],
    ["Event Celebration","events"],
    ["Workshops","workshop"],
    ["Student Clubs","clubs"],
    ["Social Activities","social"],
    ["Alumni Testimonials","alumni"],
    ["News & Media","news"],
  ];

  const colleges = [
    ["MANAGEMENT","ibmr"],
    ["SCIENCE","isr"],
    ["COMMERCE","coc"],
    ["LAW","col"],
    ["COMPUTERS","soc"],
    ["FASHION","ift"],
    ["EDUCATION","coe"],
    ["HOTEL MANAGEMENT","iohm"],
    ["SOCIAL SCIENCE","doss"],
  ];


  const collegeSections = [
  ["About","about"],
  ["Courses","courses"],
  ["Facility","facilities"],
  ["Placement","placement"],
  ["Faculty","faculties"],
  ["Admission","admission"],
  ["ApplyNow","applyform"],
  ["Recruiter","recruiters"],
];



  return(

<header className="bg-white sticky top-0 z-50 shadow-sm">

  <div className="max-w-[1440px] mx-auto h-[96px] px-6 lg:px-14 flex items-center justify-between">

    {/* LOGO */}
    <div onClick={()=>window.location.href="/ipsa/home"}  className="flex-shrink-0 ml-2 sm:ml-0 lg:ml-[-66px]">

      <img src={collegeLogo || logo} className="h-[60px] lg:h-[72px] object-contain xl:ml-[50px]" alt="logo"/>
    </div>

    {/* HAMBURGER */}
    <button
      className="lg:hidden flex flex-col gap-1"
      onClick={()=>setMenuOpen(!menuOpen)}
    >
      <span className="w-6 h-[2px] bg-gray-800"/>
      <span className="w-6 h-[2px] bg-gray-800"/>
      <span className="w-6 h-[2px] bg-gray-800"/>
    </button>

    {/* MENU */}
    <nav className={`absolute lg:static top-full left-0 w-full lg:w-auto
        bg-white lg:bg-transparent
        flex flex-col lg:flex-row
        lg:items-center gap-5 lg:gap-8
        px-6 lg:px-0 py-6 lg:py-0
        border-t lg:border-none
        ${menuOpen?"flex":"hidden lg:flex"}`}>

      {activeCollege === "ipsa" ? (
  <NavLink
    to="/ipsa/home"
    end
    className={linkClass}
    onClick={closeAll}
  >
    Home
  </NavLink>
) : (
  <NavLink
    to={`/${activeCollege}`}
    end
    className={linkClass}
    onClick={closeAll}
  >
    Home
  </NavLink>
)}

      {/* ABOUT */}
      <NavLink to={`/${activeCollege}/about`}  className={linkClass} onClick={closeAll}>
        About Us
      </NavLink>

      {/* COLLEGES */}
      <div
        className="relative"
        onMouseEnter={()=>setCollegesOpen(true)}
        onMouseLeave={()=>setCollegesOpen(false)}
      >
        <button
          onClick={()=>setCollegesOpen(!collegesOpen)}
          className="py-2 font-medium text-gray-900 hover:text-red-500"
        >
          {isCollegeHome ? "College Sections" : "Colleges"} ▾
        </button>

        <div className={`lg:absolute lg:top-full lg:left-0
          bg-white shadow-md border lg:min-w-[180px]
          flex flex-col
          ${collegesOpen?"block":"hidden"}`}>

          {isCollegeHome
  ? collegeSections.map(([name,id])=>(
      <a
        key={id}
        href={`/${activeCollege}#${id}`}
        onClick={closeAll}
        className="px-4 py-2 transition-colors text-gray-800 hover:bg-red-500 hover:text-white"
      >
        {name}
      </a>
    ))
  : colleges.map(([name,slug])=>(
      <NavLink
        key={slug}
        to={`/${slug}`}
        onClick={closeAll}
        className={dropdownLink}
        target="_blank"
      >
        {name}
      </NavLink>
    ))
}


        </div>
      </div>

      {/* PLACEMENTS */}
      <NavLink to={`/${activeCollege}/placements`} className={linkClass} onClick={closeAll}>
        Placements
      </NavLink>

      {/* STUDENT LIFE */}
      <div
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
      </div>

      {/* FACILITIES */}
      <NavLink to={`/${activeCollege}/facilities`} className={linkClass} onClick={closeAll}>
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
