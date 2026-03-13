import { useMemo, memo } from "react";
import { cleanCmsHtml } from "../common/ScratchHtml";

const StudentClub = memo(({ html }) => {
  const cleanHtml = useMemo(() => cleanCmsHtml(html), [html]);

  // If API provides raw HTML, render it directly
  if (cleanHtml) {
    return (
      <section className=" font-medium py-1 px-1 sm:px-1 bg-white">
        <div className="overflow-x-auto" dangerouslySetInnerHTML={{ __html: cleanHtml }} />
      </section>
    );
  }

  return null;
});

export default StudentClub;