// src/components/Activities/Activities.jsx

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ActivitiesHero from "../components/activity/ActivitiesHero";
import ActivitiesSlider from "../components/activity/ActivitiesSlider";
import { fetchPageData, fetchCollegeEvents } from "../services/api";
import { ScratchSections } from "../components/common/ScratchHtml";

const StudentLife = () => {
  const { collegeSlug, subSlug } = useParams();
  const [sections, setSections] = useState(null);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const pageName = `activities/${subSlug || "events"}`;
        const [pageData, eventsList] = await Promise.all([
          fetchPageData(collegeSlug, pageName),
          fetchCollegeEvents(collegeSlug),
        ]);
        setSections(pageData.sections || {});
        setEvents(eventsList || []);
      } catch (err) {
        console.error("Failed to fetch activities page data:", err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [collegeSlug, subSlug]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#002147] border-t-transparent" />
      </div>
    );
  }

  const hero = sections?.hero || {};
  const calendarSection = sections?.a_calendar_full_of || {};

  return (
    <div>
      <ActivitiesHero
        heroImage={hero.images?.[0]}
        description={hero.description}
        ctaText={hero.cta_text}
        ctaLink={hero.cta_link}
      />
      <ActivitiesSlider
        title={calendarSection.title}
        content={calendarSection.content}
        events={events}
        collegeSlug={collegeSlug}
      />
      <ScratchSections sections={sections} />
    </div>
  );
};

export default StudentLife;
