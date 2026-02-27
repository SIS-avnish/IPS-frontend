// src/components/Activities/Activities.jsx

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ActivitiesHero from "../components/activity/ActivitiesHero";
import ActivitiesSlider from "../components/activity/ActivitiesSlider";
import { fetchPageData, fetchCollegeEvents, fetchActivities } from "../services/api";
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
        const activityType = subSlug || "events";

        const [pageData, activitiesList] = await Promise.all([
          fetchPageData(collegeSlug, pageName).catch(() => ({ sections: {} })),
          fetchActivities(collegeSlug, activityType).catch(() => []),
        ]);

        setSections(pageData.sections || {});

        // Map activities to the card shape the slider expects
        const cards = (activitiesList || []).map((a) => ({
          id: a.slug || a.id,
          title: a.title,
          subtitle: a.short_description,
          thumbnail_image: a.main_image,
          start_date: a.start_date,
          _isActivity: true,
        }));

        setEvents(cards);
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
      <ScratchSections sections={sections} exclude={['hero', 'a_calendar_full_of']} />
    </div>
  );
};

export default StudentLife;
