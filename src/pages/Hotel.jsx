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
      <Program data={sections?.programmes} />
      <Facility facilitiesData={sections?.facilities} skillsData={sections?.skills_iohm} />
      <Skills data={sections?.skills_iohm} />
      <Faculties data={sections?.train_with_tech_tools} />
      <Placement data={sections?.placement} />
      {sections?.success_stories && <SuccessStories data={sections.success_stories} />}
      <ScratchSections sections={sections} exclude={['hero', 'about_college', 'why_college_of_education', 'programmes', 'facilities', 'skills_iohm', 'train_with_tech_tools', 'placement', 'success_stories']} />
    </div>
  );
};

export default Hotel