import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { PageSkeleton } from "../components/common/SkeletonLoader";
import { useParams } from "react-router-dom";
import ActivitiesHero from "../components/activity/ActivitiesHero";
import ActivitiesSlider from "../components/activity/ActivitiesSlider";
import { fetchPageData, fetchActivities } from "../services/api";
import { fetchIpsaActivityCards } from "../services/ipsaReuse";
import { ScratchSections } from "../components/common/ScratchHtml";
import StudentTestimonials from "../components/others/StudentTestimonials";
import useSEO from "../hooks/useSEO";

const StudentLife = () => {
  const { collegeSlug, subSlug } = useParams();
  const location = useLocation();
  const [sections, setSections] = useState(null);
  const [pageData, setPageData] = useState(null);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useSEO(pageData);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const isUpcoming = location.pathname.includes("upcoming-activities");
        const activityType = isUpcoming ? "upcoming-activities" : (subSlug || "events");
        const pageName = `activities/${activityType}`;
        const useIpsaAggregate = collegeSlug === "ipsa" && ["cultural", "events", "workshop"].includes(activityType);

        const pageResult = await fetchPageData(collegeSlug, pageName).catch(() => ({ sections: {} }));
        setPageData(pageResult);
        setSections(pageResult.sections || {});

        if (useIpsaAggregate) {
          const cards = await fetchIpsaActivityCards(activityType, 2).catch(() => []);
          setEvents(cards);
          return;
        }

        const activitiesList = await fetchActivities(collegeSlug, activityType).catch(() => []);
        const normalizedActivities = Array.isArray(activitiesList)
          ? activitiesList
          : Array.isArray(activitiesList?.activities)
            ? activitiesList.activities
            : Array.isArray(activitiesList?.results)
              ? activitiesList.results
              : Array.isArray(activitiesList?.data)
                ? activitiesList.data
                : [];
        const cards = normalizedActivities.map((a) => ({
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
    return <PageSkeleton />;
  }

  const hero = sections?.hero || {};
  const calendarSection = sections?.a_calendar_full_of || sections?.a_calender_full_of || {};
  const gallerySection = sections?.cultural_gallery || {};

  return (
    <div className="w-full overflow-x-hidden">
      <ActivitiesHero
        heroImage={hero.images?.[0]}
        description={hero.description}
        ctaText={hero.cta_text}
        ctaLink={hero.cta_link}
      />
      {sections?.testimonials && (
        <StudentTestimonials
          title={sections.testimonials.title}
          testimonials={sections.testimonials.items}
        />
      )}
      <ScratchSections sections={sections} exclude={['hero', 'a_calendar_full_of', 'a_calender_full_of', 'testimonials']} />
      <ActivitiesSlider
        title={calendarSection.title}
        content={calendarSection.content}
        events={events}
        collegeSlug={collegeSlug}
        gallery={gallerySection.images || []}
      />
    </div>
  );
};

export default StudentLife;
