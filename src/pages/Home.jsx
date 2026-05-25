import { useEffect, useState, useMemo } from "react";
import { fetchPageData, fetchCollegeCourses } from "../services/api";
import { PageSkeleton } from "../components/common/SkeletonLoader";
import useSEO from "../hooks/useSEO";
import Hero from "../components/home/Hero";
import WhyIPSA from "../components/home/WhyIPSA";
import StatsSection from "../components/home/StatsSection";
import ExperienceSection from "../components/home/ExperienceSection";
import CoursesAccordion from "../components/home/CoursesAccordion";
import { ScratchSections } from "../components/common/ScratchHtml";

export default function Home({ initialServerState }) {
  const collegeSlug = "ipsa"; // Default college slug for home page
  
  // Determine if we have valid pre-fetched server state for the home page
  const hasInitialState = !!(
    initialServerState &&
    initialServerState.collegeSlug === collegeSlug &&
    initialServerState.pageName === "home" &&
    initialServerState.pageData
  );

  const [sections, setSections] = useState(() => 
    hasInitialState ? initialServerState.pageData.sections : null
  );
  const [pageData, setPageData] = useState(() => 
    hasInitialState ? initialServerState.pageData : null
  );
  const [courses, setCourses] = useState(() => 
    hasInitialState ? initialServerState.courses : []
  );
  const [loading, setLoading] = useState(() => !hasInitialState);
  const [error, setError] = useState(null);

  useSEO(pageData);

  useEffect(() => {
    // If we already loaded data from SSR, skip client-side fetch on mount
    if (hasInitialState) {
      return;
    }

    Promise.all([
      fetchPageData(collegeSlug, "home"),
      fetchCollegeCourses(collegeSlug),
    ])
      .then(([data, coursesData]) => {
        setPageData(data);
        setSections(data.sections);
        setCourses(coursesData);
      })
      .catch((err) => {
        console.error("Failed to fetch home page data:", err);
        setError("Failed to load page data.");
      })
      .finally(() => setLoading(false));
  }, [collegeSlug, hasInitialState]);

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
    <div className="w-full overflow-x-hidden">
      <Hero data={sections?.here} />
      <WhyIPSA data={sections?.why_ips} />
      <StatsSection
        statsData={sections?.stats}
        excellenceData={sections?.excellence}
        startData={sections?.start_image}
      />
      <ExperienceSection data={sections?.["360_video"]} />
      <CoursesAccordion data={sections?.courses} courses={courses} />
      <ScratchSections sections={sections} exclude={['here', 'why_ips', 'stats', 'excellence', '360_video', 'courses']} />
    </div>
  );
}
