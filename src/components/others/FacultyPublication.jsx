import React, { useMemo, memo } from "react";
import { cleanCmsHtml } from "../common/ScratchHtml";

const FacultyPublication = memo(({ html }) => {
  const cleanHtml = useMemo(() => cleanCmsHtml(html), [html]);

  if (cleanHtml) {
    return (
      <section className="bg-gray-50 py-12 px-4 md:px-8">
        <div className="max-w-5xl mx-auto">
          <div dangerouslySetInnerHTML={{ __html: cleanHtml }} />
        </div>
      </section>
    );
  }

  return null;
});
export default FacultyPublication;