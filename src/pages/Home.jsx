import { useEffect, useState, useMemo } from "react";
import { fetchPageData, fetchCollegeCourses } from "../services/api";
import { PageSkeleton } from "../components/common/SkeletonLoader";

import Hero from "../components/home/Hero";
import WhyIPSA from "../components/home/WhyIPSA";
import StatsSection from "../components/home/StatsSection";
import ExperienceSection from "../components/home/ExperienceSection";
import CoursesAccordion from "../components/home/CoursesAccordion";
import { ScratchSections } from "../components/common/ScratchHtml";

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
    return <PageSkeleton />;
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
      <ScratchSections sections={sections} exclude={['here', 'why_ips', 'stats', 'excellence', '360_video', 'courses']} />
    </>
  );
}
