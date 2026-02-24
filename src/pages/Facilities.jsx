import { useEffect, useState } from "react";
import { fetchPageData } from "../services/api";
import Hero from "../components/facilities/Hero";
import HostelFeatures from "../components/facilities/HostelFeature";
import LibraryVision from "../components/facilities/LibraryVision";
import Sports from "../components/facilities/Sports";
import FuturePlan from "../components/facilities/FuturePlan";
import FacilityBlocks from "../components/facilities/FacilityBlocks";
import { useParams } from "react-router-dom";

export default function FacilitiesPage() {
  const [sections, setSections] = useState(null);
  const {collegeSlug} = useParams();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPageData(collegeSlug, "facilities")
      .then((data) => setSections(data.sections))
      .catch((err) => console.error("Failed to load facilities data:", err))
      .finally(() => setLoading(false));
  }, [collegeSlug]);

  if (loading) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center">
        <span className="text-lg text-[#002147]">Loading...</span>
      </div>
    );
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
      />
    </div>
  );
}
