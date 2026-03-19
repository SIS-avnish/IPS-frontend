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
    default:
      return null;
  }
}

function renderSection(key, data, sections, collegeSlug) {
  switch (key) {
    case "hero":
      return null;

    case "about":
      return <About data={data} />;

    case "stats":
      if (sections.excellence) return null;
      return <StatsSection data={data} />;

    case "excellence":
      return <Excellence data={data} statsData={sections.stats} startData={sections.star_image} />;

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
      if (sections.placement) return null;
      return <StatsSection data={data} />;

    case "proven_placement_record":
      if (sections.placement) return null;
      return <FeaturesSection data={data} />;

    case "recruiter":
      if (sections.placement) return null;
      return <RecruiterLogos data={data} />;

    case "success_stories":
      return null;

    case "testimonials":
      return null;

    case "admission_procedure":
      return <Admission data={data} />;

    default:
      break;
  }

  if (data.type === "scratch") return null;

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

    return () => {
      cancelled = true;
    };
  }, [collegeSlug]);

  if (loading) return <PageSkeleton />;

  if (error) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center text-red-500">
        {error}
      </div>
    );
  }

  const sortedSections = Object.entries(sections)
    .filter(([key]) => key !== "success_stories" && key !== "testimonials")
    .sort(([, a], [, b]) => (a.sort_order ?? 999) - (b.sort_order ?? 999));

  let orderedSections = [...sortedSections];

  const moveKeys = ["learning_beyond_the_classroom", "mentorship"];
  const movedSections = [];

  moveKeys.forEach((key) => {
    const idx = orderedSections.findIndex(([k]) => k === key);
    if (idx !== -1) movedSections.push(orderedSections.splice(idx, 1)[0]);
  });

  const admissionIndex = orderedSections.findIndex(
    ([k]) => k === "admission_procedure"
  );

  if (admissionIndex !== -1) {
    orderedSections.splice(admissionIndex, 0, ...movedSections);
  }

  const nonScratchKeys = Object.entries(sections)
    .filter(([, s]) => s.type !== "scratch")
    .map(([k]) => k);

  return (
    <div className="w-full overflow-x-hidden">
      {sections.hero && <Hero data={sections.hero} />}

      {orderedSections.map(([key, data]) => {
        const rendered = renderSection(key, data, sections, collegeSlug);

        if (!rendered) return null;

        return <Fragment key={key}>{rendered}</Fragment>;
      })}

      {!sections.admission_procedure && <Admission />}

      {/* APPLY FORM */}
      <ApplyForm
        collegeSlug={collegeSlug}
        leftSection={sections.just_above_the_footer}
      />

      {/* SCRATCH SECTIONS (only the second one below) */}
      <ScratchSections
        sections={sections}
        exclude={[
          ...nonScratchKeys,
          "just_above_the_footer" // exclude first scratch so it doesn't repeat
        ]}
      />

      {sections.testimonials && (
        <Testimonials data={sections.testimonials} />
      )}

      {sections.success_stories && (
        <SuccessStories data={sections.success_stories} />
      )}
    </div>
  );
}
