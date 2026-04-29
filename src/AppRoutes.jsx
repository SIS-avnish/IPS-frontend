import { lazy, Suspense } from "react"
import { Routes, Route, Navigate, useLocation } from "react-router-dom"
import Footer from "./components/common/Footer"
import Navbar from "./components/common/Header"
import EnquiryModal from "./components/common/EnquiryModal"
import PageSkeleton from "./components/common/SkeletonLoader"
import AdmissionPage from "./pages/AdmissionPage"
const Home = lazy(() => import("./pages/Home"))
const Contact = lazy(() => import("./pages/Contact"))
const FacilitiesPage = lazy(() => import("./pages/Facilities"))
const StudentLife = lazy(() => import("./pages/StudentLife"))
const Placements = lazy(() => import("./pages/Placement"))
const AboutPage = lazy(() => import("./pages/About"))
const CollegeTemp = lazy(() => import("./pages/CollegeTemp"))
const Student = lazy(() => import("./pages/Student"))
const SocialAct = lazy(() => import("./pages/SocialAct"))
const AlumniPage = lazy(() => import("./pages/AlumniPage"))
const NewsPage = lazy(() => import("./pages/NewsPage"))
const NewsDetail = lazy(() => import("./pages/NewsDetail"))
const EventDetail = lazy(() => import("./pages/EventDetail"))
const ActivityDetail = lazy(() => import("./pages/ActivityDetail"))
const AlumniDetail = lazy(() => import("./pages/AlumniDetail"))
const Hotel = lazy(() => import("./pages/Hotel"))
const AllFaculty = lazy(() => import("./pages/AllFaculty"))
const MainActivityPage = lazy(() => import("./components/activity/MainActivityPage"))

const PageLoader = () => <PageSkeleton />

// Helper function to get college slug from subdomain
const getCollegeSlugFromSubdomain = () => {
  if (typeof window === 'undefined') return 'ipsa' // SSR fallback
  
  const hostname = window.location.hostname
  const parts = hostname.split('.')
  
  // If it's a subdomain (e.g., ibmr.ipsacademyindore.edu.in)
  if (parts.length > 2) {
    return parts[0] // Return the subdomain (ibmr, isr, coc, etc.)
  }
  
  // Default to ipsa if it's the main domain
  return 'ipsa'
}

export default function AppRoutes() {
  const collegeSlug = getCollegeSlugFromSubdomain()
  const location = useLocation()
  const hideNavbar = location.pathname === "/ipsa/ipsadmissions"
  
  return (
    <>
      {!hideNavbar && <Navbar />}
      <Suspense fallback={<PageLoader />}>
        <Routes>
          {/* DEFAULT REDIRECT */}
          <Route path="/" element={<Navigate to={`/${collegeSlug}`} replace />} />

          {/* COLLEGE ROUTES */}
          <Route path="https://ipsacademyindore.edu.in/ipsa/home" element={<Home />} />
          <Route path="/ipsa/about" element={<AboutPage />} />
          <Route path="/ipsa/contact" element={<Contact />} />
          <Route path="/ipsa/facilities" element={<FacilitiesPage />} />
          <Route path="/ipsa/student-life" element={<StudentLife />} />
          <Route path="/ipsa/placement" element={<Placements />} />
          <Route path="/student-council" element={<Student />} />
        <Route path="/social-activities" element={<SocialAct />} />
          <Route path="/alumni" element={<AlumniPage />} />
          <Route path="/alumni/:slug" element={<AlumniDetail />} />
          <Route path="/news" element={<NewsPage />} />
          <Route path="/news/:slug" element={<NewsDetail />} />
          <Route path="/activities" element={<MainActivityPage />} />
          <Route path="/activities/:slug" element={<ActivityDetail />} />
          <Route path="/events/:slug" element={<EventDetail />} />
          <Route path="/all-faculty" element={<AllFaculty />} />
          <Route path="/ipsa/ipsadmissions" element={<AdmissionPage />} />
          {/* COLLEGE TEMPLATE ROUTES */}
          <Route path="/:collegeSlug" element={<CollegeTemp />} />
          <Route path="/:collegeSlug/hotel" element={<Hotel />} />
        </Routes>
      </Suspense>
      <Footer />
    </>
  )
}
