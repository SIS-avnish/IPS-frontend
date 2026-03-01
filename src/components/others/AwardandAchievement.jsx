import React, { useMemo, memo } from "react";
import { cleanCmsHtml } from "../common/ScratchHtml";

const AwardandAchievement = memo(({ achievementsHtml, coCurricularHtml }) => {
  const cleanAchievements = useMemo(() => cleanCmsHtml(achievementsHtml), [achievementsHtml]);
  const cleanCoCurricular = useMemo(() => cleanCmsHtml(coCurricularHtml), [coCurricularHtml]);

  if (!cleanAchievements && !cleanCoCurricular) return null;

  return (
    <section className="bg-gray-50 py-10 md:py-14">
      <div className="max-w-6xl mx-auto px-4 space-y-12">
        {cleanAchievements && (
          <div className="overflow-x-auto" dangerouslySetInnerHTML={{ __html: cleanAchievements }} />
        )}
        {cleanCoCurricular && (
          <div className="overflow-x-auto" dangerouslySetInnerHTML={{ __html: cleanCoCurricular }} />
        )}
      </div>
    </section>
  );
});
export default AwardandAchievement;