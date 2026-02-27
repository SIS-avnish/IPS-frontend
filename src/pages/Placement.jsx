import { useEffect, useState } from "react";
import { fetchPageData } from "../services/api";
import Hero from "../components/placement/Hero";
import About from "../components/placement/About";
import Incubation from "../components/placement/Incubation";
import Team from "../components/placement/Team";
import Recruiters from "../components/placement/Recruiter";
import { useParams } from "react-router-dom";
import { ScratchSections, cleanCmsHtml } from "../components/common/ScratchHtml";

export default function Placements() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { collegeSlug } = useParams();

  useEffect(() => {
    fetchPageData(collegeSlug, "placements")
      .then((res) => setData(res))
      .catch((err) => {
        console.error("Failed to load placements:", err);
        setError("Failed to load placements data.");
      })
      .finally(() => setLoading(false));
  }, [collegeSlug]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#002147]" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen text-red-600">
        {error}
      </div>
    );
  }

  const sections = data?.sections || {};

  return (
    <div className="w-full overflow-hidden">
      <Hero data={sections.hero} />
      <About data={sections.about_ips} />
      <Incubation
        infrastructure={sections.an_infrastructure}
        vibrant={sections.vibrant_entreprenurial}
        collaboration={sections.a_collaboration}
        stats={sections.orientation_and_awareness}
      />
      <Team data={sections.the_placement_team} />
      <Recruiters
        highlights={sections.proven_placement_record}
        courseStats={sections.placement_count_course_wise}
      />

      {/* PLACED STUDENTS */}
      {sections.placed_student?.html && (
        <section className="bg-white py-12 sm:py-16 md:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div dangerouslySetInnerHTML={{ __html: cleanCmsHtml(sections.placed_student.html) }} />
          </div>
        </section>
      )}
      <ScratchSections sections={sections} exclude={['hero', 'about_ips', 'an_infrastructure', 'vibrant_entreprenurial', 'a_collaboration', 'orientation_and_awareness', 'the_placement_team', 'proven_placement_record', 'placement_count_course_wise', 'placed_student']} />
    </div>
  );
}
