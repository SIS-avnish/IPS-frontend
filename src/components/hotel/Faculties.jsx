import React, { memo, useState } from "react";
import { motion } from "framer-motion";
import Media from "../common/Media";
import faculty from "../../assets/Images/faculty.png";

const Faculties = memo(({ data, teamData }) => {

  const cardColors = ["#27B5D6", "#F36C6C", "#F2B632"];
  const [currentMember, setCurrentMember] = useState(0);

  // Build cards: first card is the main section (title + description), rest from facilities array
  const cards = [];
  if (data) {
    cards.push({ title: data.title, desc: data.description });
    data.facilities?.forEach(f => cards.push({ title: f.name, desc: f.description }));
  }

  const displayCards = cards.length
    ? cards
    : [
        {
          title: "Train with tech tools of tomorrow computer labs",
          desc: "Prepare for the digital world of hospitality with the latest IDS hotel management software, audio-visual aids, including projectors, training films and interactive presentations and engaging learning experiences.",
        },
        {
          title: "Discover a world of knowledge, Library and Online Resources",
          desc: "Grow with a vast collection of hospitality-related books, journals, and research materials online training manuals and e-resources to stay updated with industry trends.",
        },
        {
          title: "Thrive in modern spaces auditorium",
          desc: "Find your space to meet, grow and craft your own future in a modern auditorium with a seating capacity of 350, equipped with audio-visual systems, ideal for seminars, guest lectures and student events.",
        },
      ];

  return (
    <section className="relative bg-[#f2f2f2] pt-16 md:pt-24 overflow-visible">

      {/* Grey strip behind card */}
      <div className="absolute left-0 right-0 top-[60%] h-[200px] md:h-[220px] bg-[#f2f2f2] -translate-y-1/2"></div>

      <div className="relative max-w-[1400px] mx-auto px-4 sm:px-6 md:px-12 lg:px-16">

        {/* Top Info Blocks */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-14 md:mb-16">

          {displayCards.map((card, i) => (
            <div
              key={i}
              className="w-full min-h-[240px] p-6 md:p-8 text-[#0c2946] flex flex-col justify-between"
              style={{ backgroundColor: cardColors[i % cardColors.length] }}
            >
              <h3 className="text-xl md:text-2xl font-semibold leading-snug">
                {card.title}
              </h3>

              <p className="text-sm leading-relaxed mt-4">
                {card.desc}
              </p>
            </div>
          ))}

        </div>


        {(() => {
          const teamTitle = teamData?.title || "Learn from Experts in Hospitality";
          const members = teamData?.members?.length
            ? teamData.members
            : [{
                name: "Jitendra Kumar Gupta",
                title: "Director",
                image: faculty,
                description: "Diploma in Hotel Management & Catering Technology (DHMCT)\n\nProf. Jitendra Gupta has served in senior culinary and management roles with leading hotel chains including Taj, ITC, Oberoi, and Jaypee Hotels. With 28 years of rich industry experience and 20 years in academic leadership, he has shaped culinary talent through his strong command of hospitality operations, food production, and chef training.\n\nUnder his guidance, IOHM continues to foster industry-ready professionals with excellence and innovation at its core."
              }];
          const member = members[currentMember] || members[0];
          const descParagraphs = member.description?.split('\n').filter(p => p.trim()) || [];

          const goLeft = () => setCurrentMember(prev => (prev - 1 + members.length) % members.length);
          const goRight = () => setCurrentMember(prev => (prev + 1) % members.length);

          return (
            <div className="relative md:-mt-10 grid md:grid-cols-[280px_1fr] lg:grid-cols-[320px_1fr] gap-8 md:gap-10 items-center">

              {/* LEFT SIDE */}
              <motion.div
                initial={{ opacity: 0, x: -70 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7 }}
                viewport={{ once: true }}
                className="text-center md:text-left"
              >
                <h2 className="text-[#0c2946] text-3xl sm:text-4xl md:text-5xl font-medium leading-tight">
                  {teamTitle.split(/\s+/).reduce((acc, word, i) => {
                    if (i > 0 && i % 2 === 0) acc.push(<br key={`br-${i}`} />);
                    if (acc.length > 0 && typeof acc[acc.length - 1] === 'string') {
                      acc[acc.length - 1] += ' ' + word;
                    } else {
                      acc.push(word);
                    }
                    return acc;
                  }, [])}
                </h2>

                <div className="w-16 h-[2px] bg-[#e45b5b] mt-5 md:mt-6 mb-8 md:mb-10 mx-auto md:mx-0"></div>

                {members.length > 1 && (
                  <div className="flex gap-3 justify-center md:justify-start">
                    <button
                      onClick={goLeft}
                      className="w-11 h-11 rounded-full border border-[#f1a2a2] text-[#e45b5b] flex items-center justify-center hover:bg-white transition active:scale-95"
                    >
                      ←
                    </button>
                    <button
                      onClick={goRight}
                      className="w-11 h-11 rounded-full border border-[#f1a2a2] text-[#e45b5b] flex items-center justify-center hover:bg-white transition active:scale-95"
                    >
                      →
                    </button>
                  </div>
                )}
              </motion.div>

              {/* RIGHT SIDE CARD */}
              <motion.div
                key={currentMember}
                initial={{ opacity: 0, x: 70, scale: 0.98 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="relative z-10 bg-white shadow-lg 
                           w-full max-w-[1000px]
                           md:translate-y-[80px] lg:translate-y-[120px]"
              >
                <div className="flex flex-col md:flex-row gap-6 md:gap-10 p-5 sm:p-6">

                  {/* IMAGE */}
                  <Media
                    src={member.image || faculty}
                    alt={member.name}
                    className="w-full md:w-[360px] lg:w-[420px] 
                               h-[260px] sm:h-[320px] md:h-[380px] lg:h-[420px]
                               object-cover rounded-md flex-shrink-0"
                  />

                  {/* CONTENT */}
                  <div className="max-w-xl">

                    <h3 className="text-[#0c2946] text-xl sm:text-2xl font-semibold">
                      {member.name}
                    </h3>

                    {member.title && (
                      <p className="text-gray-600 mt-1 font-bold">{member.title}</p>
                    )}

                    {descParagraphs.map((para, pi) => (
                      <p key={pi} className={`text-gray-600 leading-relaxed text-sm sm:text-base ${pi === 0 ? 'mt-3 font-semibold' : 'mt-3 md:mt-4'}`}>
                        {para}
                      </p>
                    ))}

                  </div>

                </div>
              </motion.div>

            </div>
          );
        })()}

      </div>

    </section>
  );
});
export default Faculties;