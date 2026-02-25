import { useEffect, useState } from "react";
import { fetchPageData, fetchCollegeCourses } from "../services/api";

import Hero from "../components/home/Hero";
import WhyIPSA from "../components/home/WhyIPSA";
import StatsSection from "../components/home/StatsSection";
import ExperienceSection from "../components/home/ExperienceSection";
import CoursesAccordion from "../components/home/CoursesAccordion";

export default function Home() {
  const collegeSlug = "ipsa"; // Default college slug for home page
  const [sections, setSections] = useState(null);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    Promise.all([
      fetchPageData(collegeSlug, "home"),
      fetchCollegeCourses(collegeSlug),
    ])
      .then(([pageData, coursesData]) => {
        setSections(pageData.sections);
        setCourses(coursesData);
      })
      .catch((err) => {
        console.error("Failed to fetch home page data:", err);
        setError("Failed to load page data.");
      })
      .finally(() => setLoading(false));
  }, [collegeSlug]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#002147] border-t-transparent" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen text-red-600 text-lg">
        {error}
      </div>
    );
  }

  return (
    <>
      <Hero data={sections?.here} />
      <WhyIPSA data={sections?.why_ips} />
      <StatsSection
        statsData={sections?.stats}
        excellenceData={sections?.excellence}
      />
      <ExperienceSection data={sections?.["360_video"]} />
      <CoursesAccordion data={sections?.courses} courses={courses} />
    </>
  );
}
