import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchCollegePageData } from "../services/api";
import Hero from "../components/colegeTemplate/Hero";
import About from "../components/colegeTemplate/About";
import Advantage from "../components/colegeTemplate/Advantage";
import Programs from "../components/colegeTemplate/Programs";
import Facilities from "../components/colegeTemplate/Facilities";
import Placement from "../components/colegeTemplate/Placement";
import Faculty from "../components/colegeTemplate/Faculty";
import Admission from "../components/colegeTemplate/Admission";
import ApplyForm from "../components/colegeTemplate/ApplyForm";
import Recruiters from "../components/colegeTemplate/Recruiters";
import SuccessStories from "../components/colegeTemplate/SuccessStories";

export default function IbmrPage() {
  const { collegeSlug } = useParams();
  const [sections, setSections] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  console.log("Fetching data for college slug:", collegeSlug);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);

    fetchCollegePageData(collegeSlug, "home")
      .then((data) => {
        if (!cancelled) {
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
    return (
      <div className="w-full min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#002147]"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="w-full">
      {sections.hero && <Hero data={sections.hero} />}
      {sections.about && (
        <About
          about={sections.about}
          features={sections.campus_to_business_boardroom}
          whyChooseData={sections.why_choose}
        />
      )}
      {sections.experience_learn && <Advantage data={sections.experience_learn} />}
      {sections.programmed_offered && <Programs data={sections.programmed_offered} collegeSlug={collegeSlug} />}
      {sections.facilities && <Facilities data={sections.facilities} />}
      {(sections.career_pathways || sections.news_and_events) && (
        <Placement
          placement={sections.career_pathways}
          testimonials={null}
        />
      )}
      {(sections.placement || sections.testimonials) && (
        <Placement
          placement={sections.placement}
          testimonials={sections.testimonials}
        />
      )}
      <Faculty collegeSlug={collegeSlug} />
      <Admission />
      <ApplyForm collegeSlug={collegeSlug} />
      {sections.success_stories && <SuccessStories data={sections.success_stories} />}
      {sections.news_and_events && (
        <Placement
          placement={sections.news_and_events}
          testimonials={null}
        />
      )}
      {sections.recruiter && <Recruiters data={sections.recruiter} />}
    </div>
  );
}
