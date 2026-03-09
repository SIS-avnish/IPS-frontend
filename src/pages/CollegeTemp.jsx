import { useEffect, useState, Fragment } from "react";
import { useParams } from "react-router-dom";
import { fetchCollegePageData } from "../services/api";
import { PageSkeleton } from "../components/common/SkeletonLoader";
import Hero from "../components/colegeTemplate/Hero";
import About from "../components/colegeTemplate/About";
import Programs from "../components/colegeTemplate/Programs";
import Facilities from "../components/colegeTemplate/Facilities";
import Faculty from "../components/colegeTemplate/Faculty";
import Admission from "../components/colegeTemplate/Admission";
import ApplyForm from "../components/colegeTemplate/ApplyForm";
import SuccessStories from "../components/colegeTemplate/SuccessStories";
import { ScratchSections } from "../components/common/ScratchHtml";
import useSEO from "../hooks/useSEO";
import Excellence from "@/components/colegeTemplate/Excellence";
import Experience from "@/components/colegeTemplate/Experience";
import VissionInfra from "@/components/colegeTemplate/VissionInfra";
import StatsSection from "@/components/colegeTemplate/StatsSection";
import TextSection, { FeaturesSection } from "@/components/colegeTemplate/TextSection";
import SplitSection from "@/components/colegeTemplate/SplitSection";
import RecruiterLogos from "@/components/colegeTemplate/RecruiterLogos";
import Testimonials from "@/components/colegeTemplate/Testimonials";
import Placement from "@/components/colegeTemplate/Placement";

function renderByType(data) {
  switch (data.type) {
    case "text":
      return <TextSection data={data} />;
    case "stats":
      return <StatsSection data={data} />;
    case "features":
      return <FeaturesSection data={data} />;
    case "split":
      return <SplitSection data={data} />;
    case "cards":
      return <Experience data={data} />;
    case "accordion":
      return <Excellence data={data} />;
    case "images_with_logo":
      return <RecruiterLogos data={data} />;
    case "testimonials":
      return <Testimonials data={data} />;
    case "facilities":
      return <Facilities data={data} />;
    case "gallery":
      return <GallerySection data={data} />;
    default:
      return null;
  }
}

function renderSection(key, data, sections, collegeSlug) {
  // Key-specific renderers
  switch (key) {
    case "hero":
      return null; // rendered separately above
    case "about":
      return <About data={data} />;
    case "stats":
      // If excellence exists, stats are passed into Excellence
      if (sections.excellence) return null;
      return <StatsSection data={data} />;
    case "excellence":
      return <Excellence data={data} statsData={sections.stats} />;
    case "experience_learn":
      return <Experience data={data} />;
    case "vision_mission":
      return <VissionInfra data={data} />;
    case "programmed_offered":
      return (
        <Fragment>
          <Programs data={data} collegeSlug={collegeSlug} />
          <Faculty collegeSlug={collegeSlug} />
        </Fragment>
      );
    case "facilities":
      return <Facilities data={data} />;
    case "placement":
      return (
        <Placement
          data={data}
          placementStats={sections.placement_count_course_wise}
          recruiterData={sections.recruiter}
          provenRecord={sections.proven_placement_record}
        />
      );
    case "placement_count_course_wise":
      // rendered inside Placement
      if (sections.placement) return null;
      return <StatsSection data={data} />;
    case "proven_placement_record":
      // rendered inside Placement
      if (sections.placement) return null;
      return <FeaturesSection data={data} />;
    case "recruiter":
      // rendered inside Placement
      if (sections.placement) return null;
      return <RecruiterLogos data={data} />;
    case "success_stories":
      return <SuccessStories data={data} />;
    case "admission_procedure":
      return <Admission data={data} />;
    default:
      break;
  }

  // Type-based fallback for unknown keys
  if (data.type === "scratch") return null; // handled by ScratchSections
  return renderByType(data);
}

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

  // Sort sections by sort_order, filter out hero (rendered separately)
  const sortedSections = Object.entries(sections)
    .sort(([, a], [, b]) => (a.sort_order ?? 999) - (b.sort_order ?? 999));

  // Collect all non-scratch keys for ScratchSections exclude
  const nonScratchKeys = Object.entries(sections)
    .filter(([, s]) => s.type !== "scratch")
    .map(([k]) => k);

  return (
    <div className="w-full overflow-x-hidden">
      {sections.hero && <Hero data={sections.hero} />}

      {sortedSections.map(([key, data]) => {
        const rendered = renderSection(key, data, sections, collegeSlug);
        if (!rendered) return null;
        return <Fragment key={key}>{rendered}</Fragment>;
      })}

      {!sections.admission_procedure && <Admission />}
      <ApplyForm collegeSlug={collegeSlug} />

      <ScratchSections sections={sections} exclude={nonScratchKeys} />
    </div>
  );
}
