import React, { useMemo } from "react";
import { cleanCmsHtml } from "../common/ScratchHtml";

const IndustryPartner = ({ html }) => {
  const cleanHtml = useMemo(() => cleanCmsHtml(html), [html]);

  if (cleanHtml) {
    return (
      <section className="font-medium py-10 px-3 sm:px-6 bg-white">
        <div dangerouslySetInnerHTML={{ __html: cleanHtml }} />
      </section>
    );
  }

  return null;
};

export default IndustryPartner;