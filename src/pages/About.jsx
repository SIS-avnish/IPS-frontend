import { useEffect, useState } from "react";
import { fetchPageData } from "../services/api";
import { useParams } from "react-router-dom";
import Hero from "../components/about/Hero";
import AboutIntro from "../components/about/AboutIntro";
import VissionMission from "../components/about/VissionMission";
import Leadership from "../components/about/Leadership";
import Governing from "../components/about/Governing";
import Directors from "../components/about/Directors";

export default function AboutPage() {
   const { collegeSlug } = useParams();
  const [sections, setSections] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);

    fetchPageData(collegeSlug,"about-us")
      .then((data) => {
        setSections(data.sections);
      })
      .catch((err) => {
        console.error("Failed to fetch about page data:", err);
        setError("Failed to load page data.");
      })
      .finally(() => setLoading(false));
  }, [collegeSlug]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#002147] border-t-transparent" />
      </div>
    );
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
      <Governing />
      <Directors />
    </div>
  );
}
