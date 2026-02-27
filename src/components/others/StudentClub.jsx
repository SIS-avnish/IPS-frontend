import React from "react";

const StudentClub = ({ html }) => {

  // If API provides raw HTML, render it directly
  if (html) {
    return (
<<<<<<< HEAD
      <section className="font-medium py-10 px-3 sm:px-6 bg-white">
=======
      <section className=" font-medium py-10 px-3 sm:px-6 bg-white">
>>>>>>> ab93de2c9f5d13604da556a60868b81111fb7a53
        <div dangerouslySetInnerHTML={{ __html: html }} />
      </section>
    );
  }

  return null;
};

export default StudentClub;