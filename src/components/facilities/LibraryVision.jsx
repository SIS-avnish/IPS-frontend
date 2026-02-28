import { memo } from "react";
import { motion } from "framer-motion";
import { resolveImageUrl } from "../../services/api";
import Media from "../common/Media";

export default memo(function LibraryVision({ library, yourService, facilitiesForYou }) {
  if (!library) return null;

  const libraryImage = resolveImageUrl(library.image);
  const serviceItems = yourService?.items || [];
  const facilityItems = (facilitiesForYou?.items || []).map((item) => ({
    img: resolveImageUrl(item.logo),
    text: item.name,
  }));

  // Split service items into two columns
  const mid = Math.ceil(serviceItems.length / 2);
  const serviceCol1 = serviceItems.slice(0, mid);
  const serviceCol2 = serviceItems.slice(mid);

  return (
    <section className="bg-[#f7f7f7] lg:pt-[160px] md:pt-[120px] pt-[40px] pb-[40px]">

      <div className="w-full">

  {/* YELLOW CARD */}
  <motion.div
    initial={{ opacity: 0, x: -30 }}
    whileInView={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.45, ease: "easeOut" }}
    viewport={{ once: true, amount: 0.1 }}
    className="
    bg-[#FFC73E]
    w-[92%] lg:w-[88%]        /* makes card slightly smaller */
    mr-auto                   /* keeps it aligned left */
    p-6 md:p-8
    shadow-[8px_12px_50px_#00000026]
    lg:-mt-[140px] md:-mt-[100px] sm:-mt-[60px]
    relative z-10
  ">

    {/* INNER CONTENT WRAPPER (controls spacing from left) */}
    <div className="max-w-7xl ml-auto pl-6 md:pl-16 lg:pl-24">

      <div className="grid lg:grid-cols-2 gap-8 sm:gap-6 items-center">

        <Media
          src={libraryImage}
          alt="Library"
          className="w-full aspect-square object-cover min-h-[260px]"
        />

        <div>

          <span className="text-[#002147] text-xl md:text-2xl font-medium">
            {library.tag || "Library"}
          </span>

          <h5 className="text-[26px] sm:text-[30px] md:text-[48px] lg:text-[60px] leading-none text-[#002147] font-medium mb-3">
            {library.title}
          </h5>

          <div className="w-[168px] h-[2px] bg-[#FF7373] my-4"></div>

          <p className="text-[#3A3A3A] leading-snug text-base sm:text-[15px]">
            {library.description}
          </p>

          <h6 className="text-[22px] md:text-[28px] lg:text-[32px] mt-4 font-medium text-[#002147]">
            Wisdom at your fingertips
          </h6>

          <ul className="list-disc pl-5 text-sm mt-2 space-y-1">
            {(library.items || []).map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>

        </div>
      </div>

    </div>
  </motion.div>

</div>


      <div className="max-w-6xl mx-auto md:ml-60 px-4 sm:px-5">         

        {/* SERVICES */}
        {serviceItems.length > 0 && (
        <div className="mt-12 lg:mt-14 sm:mt-10">

          <h3 className="text-[26px] md:text-[30px] lg:text-[32px] sm:text-[24px] text-[#002147] font-medium mb-6 sm:mb-4">
            {yourService?.title || "Your Service"}
          </h3>

          <div className="grid md:grid-cols-2 gap-8 sm:gap-6">

            <ul className="text-[#3A3A3A] space-y-3 md:space-y-4 text-base sm:text-[15px]">
              {serviceCol1.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>

            <ul className="text-[#3A3A3A] space-y-3 md:space-y-4 text-base sm:text-[15px]">
              {serviceCol2.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>

          </div>
        </div>
        )}


        {/* FACILITIES */}
        {facilityItems.length > 0 && (
        <div className="mt-12 sm:mt-10">

          <div className="text-[26px] md:text-[30px] lg:text-[32px] sm:text-[24px] text-[#002147] font-medium mb-6 sm:mb-4">
            Facilities for you
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-5">

            {facilityItems.map((item, i) => (
              <div key={i} className="flex items-center gap-4">
                <img src={item.img} alt="" className="w-6 h-6 shrink-0" />
                <span className="font-medium text-[#3A3A3A] text-base sm:text-[15px] leading-snug">
                  {item.text}
                </span>
              </div>
            ))}

          </div>
        </div>
        )}

      </div>
    </section>
  );
})
