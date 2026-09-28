import { useEffect, useState } from "react";
import { fetchPageData, fetchCollegeCourses } from "../services/api";
import { PageSkeleton } from "../components/common/SkeletonLoader";
import useSEO from "../hooks/useSEO";
import Hero from "../components/home/Hero";
import WhyIPSA from "../components/home/WhyIPSA";
import StatsSection from "../components/home/StatsSection";
import ExperienceSection from "../components/home/ExperienceSection";
import CoursesAccordion from "../components/home/CoursesAccordion";
import FacilitiesSection from "../components/home/FacilitiesSection";

export default function Home({ initialServerState }) {
  const collegeSlug = "ipsa";
  const hasInitialState = !!(
    initialServerState &&
    initialServerState.collegeSlug === collegeSlug &&
    initialServerState.pageName === "home" &&
    initialServerState.pageData
  );

  const [pageData, setPageData] = useState(() =>
    hasInitialState ? initialServerState.pageData : null
  );
  const [courses, setCourses] = useState(() =>
    hasInitialState ? initialServerState.courses || [] : []
  );
  const [loading, setLoading] = useState(() => !hasInitialState);
  const [error, setError] = useState(null);
  const sections = pageData?.sections;

  useSEO(pageData);

  useEffect(() => {
    if (hasInitialState) return;
    let active = true;

    Promise.all([
      fetchPageData(collegeSlug, "home"),
      fetchCollegeCourses(collegeSlug),
    ])
      .then(([data, coursesData]) => {
        if (!active) return;
        setPageData(data);
        setCourses(coursesData);
      })
      .catch((err) => {
        if (active) setError(err.message);
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => { active = false; };
  }, [collegeSlug, hasInitialState]);

  if (loading) {
    return <PageSkeleton />;
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen text-red-600 text-lg">
        Failed to load page data. Details: {error}
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
        facilitiesData={sections?.facilities}
      />
      <ExperienceSection data={sections?.["360_video"]} />
      <CoursesAccordion data={sections?.courses} courses={courses} />

      {sections?.facilities_1 && (
        <div className="mt-16 mb-10">
          <FacilitiesSection data={sections.facilities_1} />
        </div>
      )}
    </div>
  );
}
