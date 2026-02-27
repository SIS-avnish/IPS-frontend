import React from "react";

const IndustryPartner = ({ html }) => {

  if (html) {
    return (
      <section className="font-medium py-10 px-3 sm:px-6 bg-white">
        <div dangerouslySetInnerHTML={{ __html: html }} />
      </section>
    );
  }

  return null;
};

export default IndustryPartner;