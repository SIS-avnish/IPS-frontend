import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchCollegePageData } from "../services/api";
import { PageSkeleton } from "../components/common/SkeletonLoader";
import Hero from "../components/colegeTemplate/Hero";
import About from "../components/colegeTemplate/About";
import Programs from "../components/colegeTemplate/Programs";
import Facilities from "../components/colegeTemplate/Facilities";
import Placement from "../components/colegeTemplate/Placement";
import Faculty from "../components/colegeTemplate/Faculty";
import Admission from "../components/colegeTemplate/Admission";
import ApplyForm from "../components/colegeTemplate/ApplyForm";
import SuccessStories from "../components/colegeTemplate/SuccessStories";
import { ScratchSections } from "../components/common/ScratchHtml";
import useSEO from "../hooks/useSEO";
import Excellence from "@/components/colegeTemplate/Excellence";
import Experience from "@/components/colegeTemplate/Experience";
import VissionInfra from "@/components/colegeTemplate/VissionInfra";

export default function IbmrPage() {
  const { collegeSlug } = useParams();
  const [sections, setSections] = useState(null);
  const [pageData, setPageData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useSEO(pageData);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);

    fetchCollegePageData(collegeSlug, "home")
      .then((data) => {
        if (!cancelled) {
          setPageData(data);
          setSections(data.sections || {});
        }
      })
      .catch((err) => {
        if (!cancelled) setError(err.message || "Failed to load data");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => { cancelled = true; };
  }, [collegeSlug]);

  if (loading) {
    return <PageSkeleton />;
  }

  if (error) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="w-full overflow-x-hidden">
      {sections.hero && <Hero data={sections.hero} />}
     <About/>
     <Excellence/>
     <Experience/>
     <VissionInfra/>
      <Programs data={sections.programmed_offered} collegeSlug={collegeSlug} />
       <Faculty collegeSlug={collegeSlug} />
      {sections.facilities && <Facilities data={sections.facilities} />}
      <Placement/>
     
      <Admission />
      <ApplyForm collegeSlug={collegeSlug} />
      {sections.success_stories && <SuccessStories data={sections.success_stories} />}
      {sections.news_and_events && (
        <Placement
          placement={sections.news_and_events}
          testimonials={null}
        />
      )}
      
      <ScratchSections sections={sections} exclude={['hero', 'about', 'campus_to_business_boardroom', 'why_choose', 'experience_learn', 'programmed_offered', 'facilities', 'career_pathways', 'news_and_events', 'placement', 'testimonials', 'success_stories', 'recruiter']} />
    </div>
  );
}
