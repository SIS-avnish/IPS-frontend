import React, { useState, memo } from "react";
import { motion } from "framer-motion";
import Media from "../common/Media";

import kitchen from "../../assets/Images/Kitchen.png";
import team from "../../assets/Images/team.png";
import chief from "../../assets/Images/chief.png";

const Facilities = memo(({ facilitiesData, skillsData }) => {

  const [open, setOpen] = useState(0);


  // Split facilities into kitchens (with images) and bakeries (without images)
  const allFacilities = facilitiesData?.facilities || [];
  const kitchens = allFacilities.filter(f => f.image) || [];
  const bakeries = allFacilities.filter(f => !f.image) || [];

  const items = kitchens.length
    ? kitchens.map(f => ({ title: f.name, content: f.description, image: f.image }))
    : [
        {
          title: "Basic Training Kitchen (BTK)",
          content: "A well-equipped space for first-year students to learn Indian and Continental cuisines. Students are introduced to essential tools while mastering breakfast, snacks and basic lunch preparations.",
        },
        { title: "Quantity Training Kitchen (QTK)", content: "" },
        { title: "Advanced Training Kitchen (ATK)", content: "" },
        { title: "Garde Manger (Cold Kitchen)", content: "" },
      ];

  const bakeryItems = bakeries.length
    ? bakeries
    : [
        { name: "Bakery 1", description: "Focuses on foundational baking techniques for first-year students, introducing tools and methods for preparing breads, cakes and puddings." },
        { name: "Bakery 2", description: "Advanced-level baking for second and third-year students, covering intricate cake designs, confectionery and buffet presentations." },
      ];

  const sectionTitle = facilitiesData?.title 
  const sectionDesc = facilitiesData?.description 

  // Split subtitle into two parts for section 2 heading and section 1 sub-heading
  const subtitle = facilitiesData?.subtitle || "";
  const subtitleParts = subtitle.split(/\s+AND\s+/i);
  const bakeryHeading = subtitleParts[0]?.trim() || "Dreaming of Success?\nBake it Happen with Exceptional Facilities";
  const kitchenSubHeading = subtitleParts[1]?.trim() || "Become a Pro at Our 5-star Training Kitchens";

  // Skills section (third section)
  const skillsTitle = skillsData?.title?.replace(/\n/g, ' ').trim() || "Want to Launch Your Own Restaurant?\nStar Here with Real-world Training";
  const skillsDesc = skillsData?.description || "Two well-designed restaurants provide real-world exposure to service styles like French, American, flambé, and banquet. The bar facilities teach beverage preparation, including cocktails, mocktails, wines and spirits.";
  const skillsImage = skillsData?.image || null;

  // Get current accordion item's image
  const currentImage = items[open]?.image || kitchenImg;

  return (
    <section>

      {/* FIRST SECTION */}
      <section className="bg-[#ffffff] pt-16 md:pt-24 px-4 sm:px-6 md:px-12 lg:px-16">
        <div className="max-w-7xl mx-auto">

          {/* TOP ROW */}
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-12 items-start mb-14 md:mb-16">

            <motion.div
              initial={{ opacity: 0, x: -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
            >
              <h2 className="text-[#002147] text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium leading-tight">
                {sectionTitle}
              </h2>

              <div className="w-32 sm:w-40 h-[2px] bg-red-400 mt-5 md:mt-6"></div>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, x: 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
              className="text-gray-600 leading-relaxed max-w-xl"
            >
              {sectionDesc}
            </motion.p>
          </div>


          {/* BOTTOM ROW */}
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">

            {/* LEFT CONTENT */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
            >
              <h3 className="text-[#002147] text-2xl sm:text-3xl md:text-4xl font-medium mb-6 md:mb-8">
                {kitchenSubHeading}
              </h3>

              <div className="space-y-5">

                {items.map((item, i) => (
                  <div key={i} className="border-b border-gray-300 pb-5">

                    <button
                      onClick={() => setOpen(open === i ? -1 : i)}
                      className="w-full flex justify-between items-center text-left py-1"
                    >
                      <span className="text-[#002147] text-base sm:text-lg font-medium">
                        {item.title}
                      </span>

                      <span className="text-xl text-[#002147]">
                        {open === i ? "−" : "+"}
                      </span>
                    </button>

                    {open === i && item.content && (
                      <>
                        <p className="text-gray-600 mt-4 leading-relaxed text-sm sm:text-base">
                          {item.content}
                        </p>
                        <div className="h-[2px] bg-red-400 mt-5"></div>
                      </>
                    )}

                  </div>
                ))}

              </div>
            </motion.div>


            {/* RIGHT IMAGE */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
              className="w-full"
            >
              <Media
                src={currentImage}
                alt="Training Kitchen"
                className="w-full h-[320px] sm:h-[380px] md:h-[450px] object-cover rounded-md"
              />
            </motion.div>

          </div>

        </div>
      </section>


      {/* SECOND SECTION */}
      <section className="bg-[#ffffff] py-14 md:mt-[-100px] md:py-0 px-4 sm:px-6 md:px-10 lg:px-12">
        <div className="md:translate-y-50 bg-[#f3f3f3] md:ml-16 lg:ml-50 max-w-7xl grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">

          <motion.img
            src={chief}
            alt="Chief"
            initial={{ opacity: 0, x: -80 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="w-full h-[320px] sm:h-[380px] md:h-[540px] object-cover"
          />

          <motion.div
            initial={{ opacity: 0, x: 80 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <h2 className="text-[#002147] text-2xl sm:text-3xl md:text-4xl font-semibold leading-snug mb-6 md:mb-8">
              {bakeryHeading.split(/[?]/).map((part, i, arr) => (
                <span key={i}>
                  {part}{i < arr.length - 1 ? '?' : ''}
                  {i < arr.length - 1 && <br />}
                </span>
              ))}
            </h2>

            <div className="space-y-6 text-gray-600">

              {bakeryItems.map((bakery, i) => (
                <div key={i}>
                  <h4 className="text-[#002147] font-semibold mb-2">{bakery.name}</h4>
                  <p>{bakery.description}</p>
                </div>
              ))}

            </div>
          </motion.div>

        </div>
      </section>


      {/* THIRD SECTION */}
      <section className="bg-[#082c4e] py-16 md:pt-80 md:pb-20 px-4 sm:px-6 md:px-12 lg:px-16 text-white">

        <div className="max-w-7xl mx-auto">

          <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-start mb-10 md:mb-12">

            <motion.h2
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-2xl sm:text-3xl md:text-4xl font-medium leading-snug"
            >
              {skillsTitle.split(/[?]/).map((part, i, arr) => (
                <span key={i}>
                  {part}{i < arr.length - 1 ? '?' : ''}
                  {i < arr.length - 1 && <br />}
                </span>
              ))}
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-gray-200 leading-relaxed max-w-xl"
            >
              {skillsDesc}
            </motion.p>

          </div>

          <motion.img
            src={skillsImage || team}
            alt="Restaurant training"
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="w-full h-[300px] sm:h-[380px] md:h-[480px] object-cover rounded-md"
          />

        </div>
      </section>

    </section>
  );
});
export default Facilities;