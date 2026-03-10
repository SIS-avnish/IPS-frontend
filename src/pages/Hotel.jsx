import { useEffect, useState } from "react";
import { fetchPageData } from "../services/api";
import { PageSkeleton } from "../components/common/SkeletonLoader";
import Hero from "../components/hotel/Hero";
import About from "../components/hotel/About";
import Program from "../components/hotel/Program";
import Facility from "../components/hotel/Facility";
import Skills from "../components/hotel/Skills";
import Faculties from "../components/hotel/Faculties";
import Placement from "../components/hotel/Placement";
import SuccessStories from "../components/hotel/SuccessStories";
import { ScratchSections } from "../components/common/ScratchHtml";
import useSEO from "../hooks/useSEO";
import Admission from "../components/hotel/Admission";
import Excellence from "@/components/hotel/Excellence";
import VissionInfra from "@/components/hotel/VissionInfra";
import SplitSection from "@/components/colegeTemplate/SplitSection";

const Hotel = () => {
  const [sections, setSections] = useState(null);
  const [pageData, setPageData] = useState(null);
  const [loading, setLoading] = useState(true);

  useSEO(pageData);

  useEffect(() => {
    fetchPageData("iohm", "home")
      .then((res) => {
        setPageData(res);
        setSections(res.sections);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <PageSkeleton />;
  }

  return (
    <div className='w-full overflow-x-hidden'>
      <Hero data={sections?.hero} />
      <About aboutData={sections?.about_college} whyData={sections?.why_college_of_education} />
      <Excellence data={sections?.excellence} statsData={sections?.stats} />
      <VissionInfra data={sections?.vision_mission} />
      <Program data={sections?.programmes} titleData={sections?.programmed_offered_title_description} />
      <Facility facilitiesData={sections?.facilities} skillsData={sections?.skills_iohm} bakeryData={sections?.bakery_1} />
      <Skills data={sections?.skills_iohm} />
      <Faculties data={sections?.train_with_tech_tools} teamData={sections?.learn_from_experts} />
      <Placement data={sections?.placement} recruitersData={sections?.recruiters} />
      {sections?.placement_1 && <SplitSection data={sections.placement_1} />}
      {sections?.success_stories && <SuccessStories data={sections.success_stories} />}
      <Admission data={sections?.admission_procedure} />
      <ScratchSections sections={sections} exclude={['hero', 'about_college', 'why_college_of_education', 'excellence', 'vision_mission', 'programmed_offered_title_description', 'programmes', 'facilities', 'skills_iohm', 'train_with_tech_tools', 'learn_from_experts', 'placement', 'placement_1', 'recruiters', 'success_stories', 'admission_procedure', 'bakery_1', 'stats']} />
      

    </div>
  );
};

export default Hotel