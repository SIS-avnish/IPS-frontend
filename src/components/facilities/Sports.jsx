import { memo, useRef, useState } from "react";
import { motion } from "framer-motion";
import trophy from "../../assets/Images/trophy 2.svg";
import { resolveImageUrl } from "../../services/api";
import Media from "../common/Media";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

const cardVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.35, delay: i * 0.06, ease: "easeOut" },
  }),
};
export default memo(function Sports({ playground, joinCommunity, sportstars, facilitiesFeature }) {
  if (!playground) return null;

  const playgroundImage = resolveImageUrl(playground.image);
  const athletes = sportstars?.members || [];
  // Clean bullet prefix from items
  const allFacilities = (facilitiesFeature?.items || []).map((item) =>
    item.replace(/^•\s*/, "")
  );
  const colSize = Math.ceil(allFacilities.length / 3);
  const col1 = allFacilities.slice(0, colSize);
  const col2 = allFacilities.slice(colSize, colSize * 2);
  const col3 = allFacilities.slice(colSize * 2);

  return (
    <section className="py-10 mt-20 sm:mt-14 mt-10">

      <div className="max-w-7xl mx-auto px-4 sm:px-5">

        {/* ---------- INTRO SECTION ---------- */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid md:grid-cols-2 gap-6 sm:gap-8 items-start mb-8"
        >

          {/* LEFT */}
          <div>

            <div className="bg-[#FF7373] text-[#002147] text-[22px] sm:text-[20px] text-[18px] font-medium px-4 py-1 w-fit mb-2">
              Sports
            </div>

            <h2 className="text-[44px] md:text-[52px] sm:text-[40px] text-[26px] font-medium text-[#002147] leading-12">
              {playground.title}
            </h2>

            <div className="w-[120px] h-[2px] bg-[#fcb001] mt-1"></div>

          </div>

          {/* RIGHT */}
          <p className="text-[#3A3A3A] text-base mt-0 lg:mt-15 sm:text-[15px] leading-relaxed">
            {playground.content}
          </p>

        </motion.div>

        {/* HERO IMAGE */}
        <div className="pt-8 sm:pt-4">
          <Media
            src={playgroundImage}
            className="w-full min-h-[500px] max-h-[500px] md:min-h-[420px] md:max-h-[420px] sm:min-h-[320px] sm:max-h-[320px] min-h-[260px] max-h-[260px] object-cover"
          />

          {/* CAPTION BOX */}
          <div className="bg-[#F0EEEF] p-[28px] sm:p-[22px] grid md:grid-cols-2 gap-4 items-center">
            <p className="text-[32px] md:text-[28px] sm:text-[24px] text-[22px] font-medium text-[#002147] leading-snug">
              {joinCommunity?.title}
            </p>

            <span className="text-[#3A3A3A] text-[16px] sm:text-[15px] leading-relaxed">
              {joinCommunity?.content}
            </span>
          </div>
        </div>

        {/* TITLE */}
        <h5 className="text-[32px] md:text-[30px] sm:text-[26px] text-[24px] text-[#002147] font-medium mt-14">
          {sportstars?.title}
        </h5>

        {/* ATHLETES */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-5 mt-6">

          {athletes.map((member, i) => (
            <motion.div key={i} variants={cardVariant} initial="hidden" whileInView="visible" custom={i} viewport={{ once: true, amount: 0.1 }}>
              <Athlete
                name={member.name}
                image={resolveImageUrl(member.image)}
                desc={
                  member.description.includes("\n") ? (
                    <ul className="list-disc pl-5">
                      {member.description.split("\n").map((line, j) => (
                        <li key={j}>{line}</li>
                      ))}
                    </ul>
                  ) : (
                    member.description
                  )
                }
              />
            </motion.div>
          ))}

        </div>

        {/* DIVIDER */}
        <hr className="h-[2px] bg-[#D9D9D9] border-none my-8 sm:my-6" />

        {/* FACILITIES CARDS CAROUSEL */}
        {facilitiesFeature?.cards?.length > 0 && (
          <FacilityCarousel title={facilitiesFeature.title} cards={facilitiesFeature.cards} />
        )}

      </div>
    </section>
  );
})


/* ---------- Athlete Card ---------- */

function Athlete({ name, image, desc }) {
  return (
    <div className="p-4 sm:p-3 flex flex-col items-center text-center">

      <Media
        src={image}
        className="mb-3 w-40 h-40 object-cover rounded-full border-4 border-[#FF7373]"
      />

      <div className="text-[20px] sm:text-[22px] font-medium text-[#002147] border-b border-[#FFC73E] pb-2 pt-2 w-fit">
        {name}
      </div>

      <div className="text-[16px] sm:text-[20px] text-[#3A3A3A] pt-3 leading-relaxed">
        {desc}
      </div>

    </div>
  );
}


/* ---------- Sports List ---------- */

/* function SportsList({ items }) {
  return (
    <ul className="text-[16px] sm:text-[15px]">
      {items.map((item, i) => (
        <li key={i} className="mb-4 sm:mb-3 flex">
          <span className="mr-2 text-[#002147]">•</span>
          {item}
        </li>
      ))}
    </ul>
  );
} */


/* ---------- Facility Cards Carousel ---------- */

function FacilityCarousel({ title, cards }) {
  const trackRef = useRef(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  const CARD_WIDTH = 220; // px per scroll step

  const updateArrows = () => {
    const el = trackRef.current;
    if (!el) return;
    setCanPrev(el.scrollLeft > 4);
    setCanNext(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  };

  const scroll = (dir) => {
    trackRef.current?.scrollBy({ left: dir * CARD_WIDTH * 2, behavior: "smooth" });
    setTimeout(updateArrows, 350);
  };

  return (
    <div className="mt-10">
      {title && (
        <h5 className="text-[32px] md:text-[30px] sm:text-[26px] text-[24px] text-[#002147] font-medium mb-6">
          {title}
        </h5>
      )}

      <div className="relative group">
        {/* PREV */}
        {canPrev && (
          <button
            onClick={() => scroll(-1)}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-[#002147] text-white flex items-center justify-center shadow-lg hover:bg-[#fcb001] transition -translate-x-3"
            aria-label="Previous"
          >
            ‹
          </button>
        )}

        {/* TRACK */}
        <div
          ref={trackRef}
          onScroll={updateArrows}
          className="flex gap-4 overflow-x-auto scroll-smooth pb-2"
          style={{ scrollbarWidth: "none" }}
        >
          {cards.map((card, i) => (
            <motion.div
              key={i}
              variants={cardVariant}
              initial="hidden"
              whileInView="visible"
              custom={i}
              viewport={{ once: true, amount: 0.1 }}
              className="flex-shrink-0 w-[200px] sm:w-[280px] bg-white rounded-xl shadow-md p-5 flex flex-col items-center text-center gap-3 border border-[#e8e8e8] hover:shadow-lg transition h-60"
            >
              <img
                src={resolveImageUrl(card.icon)}
                alt={card.title}
                className="w-64 h-64 object-contain"
              />
              <p className="text-[25px] font-medium text-[#002147] leading-snug">
                {card.title}
              </p>
              {card.description && (
                <p className="text-[13px]  text-[#3A3A3A] leading-relaxed">
                  {card.description}
                </p>
              )}
            </motion.div>
          ))}
        </div>

        {/* NEXT */}
        {canNext && (
          <button
            onClick={() => scroll(1)}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-[#002147] text-white flex items-center justify-center shadow-lg hover:bg-[#fcb001] transition translate-x-3"
            aria-label="Next"
          >
            ›
          </button>
        )}
      </div>
    </div>
  );
}
