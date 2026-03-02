
import { lazy, Suspense, useEffect } from "react"
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom"
import Footer from "./components/common/Footer"
import Navbar from "./components/common/Header"
import EnquiryModal from "./components/common/EnquiryModal"

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

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

import PageSkeleton from "./components/common/SkeletonLoader"

const PageLoader = () => <PageSkeleton />

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Navbar />

      <Suspense fallback={<PageLoader />}>
      <Routes>

        {/* DEFAULT REDIRECT */}
        <Route path="/" element={<Navigate to="/ipsa/home" replace />} />

        {/* COLLEGE ROUTES */}
        <Route path="/:collegeSlug/home" element={<Home />} />
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
      </Routes>
      </Suspense>

      <Footer />
      <EnquiryModal />
    </Router>
  )
}


export default App