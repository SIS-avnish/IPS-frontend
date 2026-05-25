
import { lazy, Suspense } from "react"
import { Routes, Route, Navigate, useLocation } from "react-router-dom"
import Footer from "./components/common/Footer"
import Navbar from "./components/common/Header"
import EnquiryModal from "./components/common/EnquiryModal"
import PageSkeleton from "./components/common/SkeletonLoader"
import { useHashScroll } from "./hooks/useHashScroll"

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
const AdmissionPage = lazy(() => import("./pages/AdmissionPage"))
const NotFound = lazy(() => import("./pages/NotFound"))

// HashScroll component - handles hash-based navigation and smooth scrolling
function HashScroll() {
  useHashScroll(150)
  return null
}

const PageLoader = () => <PageSkeleton />

// Layout wrapper to enable useLocation inside Routes
function MainLayout({ initialServerState }) {
  return (
    <>
      <HashScroll />
      <Suspense fallback={<PageLoader />}>
        <Routes>
          {/* DEFAULT REDIRECT */}
          <Route path="/" element={<Navigate to="/ipsa/home" replace />} />

          {/* STATIC ERROR PAGES */}
          <Route path="/404" element={<NotFound />} />
          <Route path="/404.html" element={<NotFound />} />

          {/* COLLEGE ROUTES */}
          <Route path="/:collegeSlug/home" element={<Home initialServerState={initialServerState} />} />
          <Route path="/:collegeSlug/about" element={<AboutPage />} />
          <Route path="/:collegeSlug/contact" element={<Contact />} />
          <Route path="/:collegeSlug/facilities" element={<FacilitiesPage />} />
          <Route path="/:collegeSlug/placements" element={<Placements />} />
          <Route path="/:collegeSlug/activities" element={<MainActivityPage />} />
          <Route path="/:collegeSlug/activities/:subSlug" element={<StudentLife />} />
          <Route path="/:collegeSlug/faculties" element={<AllFaculty />} />
          <Route path="/:collegeSlug" element={<CollegeTemp />} />
          <Route path="/iohm" element={<Hotel />} />
          <Route path="/:collegeSlug/activities/clubs" element={<Student />} />
          <Route path="/:collegeSlug/activities/social" element={<SocialAct />} />
          <Route path="/:collegeSlug/activities/alumni" element={<AlumniPage />} />
          <Route path="/:collegeSlug/activities/alumni/:alumniId" element={<AlumniDetail />} />
          <Route path="/:collegeSlug/activities/news" element={<NewsPage />} />
          <Route path="/:collegeSlug/activities/news/:newsId" element={<NewsDetail />} />
          <Route path="/:collegeSlug/activities/events/:eventId" element={<EventDetail />} />
          <Route path="/:collegeSlug/activity/:activityId" element={<ActivityDetail />} />
          <Route path="/:collegeSlug/ipsadmissions" element={<AdmissionPage />} />

          {/* CATCH-ALL 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </>
  )
}

function App({ initialServerState }) {
  const location = useLocation()
  const isAdmissionPage = location.pathname.includes('ipsadmissions')

  const hideNavbar = location.pathname === "/ipsa/ipsadmissions"


  return (
    <>
      {!hideNavbar && <Navbar />}
      <MainLayout initialServerState={initialServerState} />

      <Footer />
      {!isAdmissionPage && <EnquiryModal />}

       <button
        onClick={() => window.scrollTo({ top: 10, behavior: "smooth" })}
        className="fixed bottom-5 right-5 bg-[#0CC2FE] text-white px-4 py-2 rounded-full shadow-lg transition-opacity duration-300"
      >
        ↑
      </button>
    </>
  )
}

export default App