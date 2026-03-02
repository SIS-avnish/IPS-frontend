import { useEffect, useState } from "react";
import { fetchPageData } from "../services/api";
import { PageSkeleton } from "../components/common/SkeletonLoader";
import Hero from "../components/facilities/Hero";
import HostelFeatures from "../components/facilities/HostelFeature";
import LibraryVision from "../components/facilities/LibraryVision";
import Sports from "../components/facilities/Sports";
import FuturePlan from "../components/facilities/FuturePlan";
import FacilityBlocks from "../components/facilities/FacilityBlocks";
import { useParams } from "react-router-dom";
import { ScratchSections } from "../components/common/ScratchHtml";
import useSEO from "../hooks/useSEO";

export default function FacilitiesPage() {
  const [sections, setSections] = useState(null);
  const [pageData, setPageData] = useState(null);
  const {collegeSlug} = useParams();
  const [loading, setLoading] = useState(true);

  useSEO(pageData);

  useEffect(() => {
    fetchPageData(collegeSlug, "facilities")
      .then((data) => {
        setPageData(data);
        setSections(data.sections);
      })
      .catch((err) => console.error("Failed to load facilities data:", err))
      .finally(() => setLoading(false));
  }, [collegeSlug]);

  if (loading) {
    return <PageSkeleton />;
  }

  if (!sections) return null;

  return (
    <div className="w-full overflow-hidden">
      <Hero data={sections.hero} />
      <HostelFeatures
        intro={sections.discover_a_home_away_from_home}
        services={sections.services}
      />
      <LibraryVision
        library={sections.library}
        yourService={sections.your_service}
        facilitiesForYou={sections.facilities_for_you}
      />
      <Sports
        playground={sections.hostel_your_playground_for_success}
        joinCommunity={sections.join_a_community}
        sportstars={sections.the_sportstars_of_ips}
        facilitiesFeature={sections.facilities_feature}
      />
      <FuturePlan data={sections.empower_your_future} />
      <FacilityBlocks
        wellnessCenter={sections.wellness_center}
        transport={sections.safe_transport_at_your_service}
        canteen={sections.canteen}
        mess={sections.mess}
        sportsFacility={sections.sports_facility}
      />
      <ScratchSections sections={sections} exclude={['hero', 'discover_a_home_away_from_home', 'services', 'library', 'your_service', 'facilities_for_you', 'hostel_your_playground_for_success', 'join_a_community', 'the_sportstars_of_ips', 'facilities_feature', 'empower_your_future', 'wellness_center', 'safe_transport_at_your_service', 'canteen', 'mess', 'sports_facility']} />
    </div>
  );
}
