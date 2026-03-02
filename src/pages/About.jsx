import { useEffect, useState, useMemo } from "react";
import { fetchPageData, fetchCollegeCourses, fetchColleges } from "../services/api";
import { PageSkeleton } from "../components/common/SkeletonLoader";
import { useParams } from "react-router-dom";
import useSEO from "../hooks/useSEO";
import Hero from "../components/about/Hero";
import AboutIntro from "../components/about/AboutIntro";
import VissionMission from "../components/about/VissionMission";
import Leadership from "../components/about/Leadership";
import Governing from "../components/about/Governing";
import Directors from "../components/about/Directors";
import { ScratchSections } from "../components/common/ScratchHtml";

export default function AboutPage() {
   const { collegeSlug } = useParams();
  const [sections, setSections] = useState(null);
  const [pageData, setPageData] = useState(null);
  const [courses, setCourses] = useState([]);
  const [colleges, setColleges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useSEO(pageData);

 useEffect(() => {
  setLoading(true);
  setError(null);

  const promises =
    collegeSlug === "ipsa"
      ? [
          fetchPageData(collegeSlug, "about-us"),
          fetchCollegeCourses(collegeSlug),
          fetchColleges(),
        ]
      : [fetchPageData(collegeSlug, "about-us")];

  Promise.all(promises)
    .then((results) => {
      const [pageData, coursesData, collegesData] = results;

      setPageData(pageData);
      setSections(pageData?.sections || []);

      // Only set these when slug = ipsa
      if (collegeSlug === "ipsa") {
        setCourses(coursesData || []);
        setColleges(collegesData || []);
      }
    })
    .catch((err) => {
      console.error("Failed to fetch about page data:", err);
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
    <div className="w-full overflow-hidden">
      <Hero data={sections?.hero} />
      <AboutIntro
        aboutData={sections?.about_ips}
        ecosystemData={sections?.ecosystem_for_your}
        growthImage={sections?.growth_image}
      />
      <VissionMission data={sections?.vision_mission} />
      <Leadership data={sections?.leaders} />
      <Governing
        governingBody={sections?.governing_body}
        executive={sections?.executive}
        advisory={sections?.advisory}
      />
      <Directors data={sections?.institute_directors} courses={courses} colleges={colleges} />
      <ScratchSections sections={sections} exclude={['hero', 'about_ips', 'ecosystem_for_your', 'growth_image', 'vision_mission', 'leaders', 'governing_body', 'executive', 'advisory', 'institute_directors']} />
    </div>
  );
}
