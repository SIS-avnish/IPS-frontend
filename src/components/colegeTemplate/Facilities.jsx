import { memo, useState } from "react";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";
import { resolveImageUrl } from "../../services/api";
import Media, { isVideoUrl } from "../common/Media";

const hasOverflow = (text) => {
  if (!text) return false;
  const cleanText = text.replace(/(<([^>]+)>)/gi, "");
  return cleanText.length > 150 || (cleanText.match(/\r?\n/g) || []).length >= 4;
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

const cardVariant = {
  hidden: { opacity: 0, y: 15 },
  visible: (i) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.35, delay: i * 0.06, ease: "easeOut" },
  }),
};
export default memo(function Facilities({ data }) {
  const title = data?.title || "Facilities";
  const subtitle = data?.subtitle || "";
  const description = data?.description || "";
  const facilityItems = data?.facilities || [];
  const [selectedItem, setSelectedItem] = useState(null);

  return (
    <section id="facilities" className="bg-[#F9F4E1] py-12 sm:py-14 md:py-16 text-white">

      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="text-2xl text-[#0066A6] sm:text-3xl md:text-5xl font-medium text-center md:text-left"
        >
          {title}
        </motion.h2>

        <div className="w-24 sm:w-32 h-[2px] bg-[#F68C1F] mt-3 mb-6 mx-auto md:mx-0"></div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-8 sm:mb-10 text-center md:text-left">
          <h5 className="text-xl text-[#0066A6] sm:text-2xl font-medium">
            {subtitle}
          </h5>

          <p className="text-gray-400 text-sm sm:text-base">
            {description}
          </p>
        </div>

        {/* CARDS */}
        <div className="grid grid-cols-1 xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 sm:gap-6">

          {facilityItems.map((f, i) => (
            <motion.div
              key={i}
              variants={cardVariant}
              initial="hidden"
              whileInView="visible"
              custom={i}
              viewport={{ once: true, amount: 0.1 }}
              className="bg-gray-200 text-black"
            >

              <div className="bg-yellow-600 text-center font-semibold py-2 uppercase tracking-wide text-sm sm:text-base">
                {f.name}
              </div>

              <Media
                src={resolveImageUrl(f.image)}
                alt={f.name}
                className="w-full h-48 sm:h-52 md:h-56 object-cover"
                aspectRatio="4/3"
              />

              <div className="p-4 text-xs sm:text-sm font-medium text-center flex flex-col items-center gap-2 flex-grow text-black" style={{ color: '#1a1a1a' }}>
                <div className="line-clamp-4 text-ellipsis overflow-hidden">
                  {f.description}
                </div>
                {hasOverflow(f.description) && (
                  <button 
                    onClick={() => setSelectedItem(f)}
                    className="text-xs font-bold text-yellow-600 hover:text-[#0066A6] mt-2 transition-colors focus:outline-none cursor-pointer"
                  >
                    Read More &rarr;
                  </button>
                )}
              </div>

            </motion.div>
          ))}

        </div>

      </div>

      {/* Detail Popup Modal */}
      {selectedItem && createPortal(
        <div 
          className="fixed inset-0 z-[99999] flex items-center justify-center bg-black bg-opacity-80 p-4 transition-all"
          onClick={() => setSelectedItem(null)}
        >
          <div 
            className="bg-white rounded-xl max-w-2xl max-h-[90vh] w-full relative flex flex-col overflow-hidden shadow-2xl"
            onClick={e => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="bg-yellow-600 p-4 text-center relative shrink-0">
              <h3 
                className="font-bold text-white tracking-wide text-lg md:text-xl uppercase pr-8"
                style={{ color: '#ffffff' }}
              >
                {selectedItem.name}
              </h3>
              <button 
                className="absolute top-1/2 -translate-y-1/2 right-4 text-white text-2xl font-bold hover:opacity-75 transition-opacity cursor-pointer"
                onClick={() => setSelectedItem(null)}
                style={{ color: '#ffffff' }}
              >
                &times;
              </button>
            </div>
            
            {/* Modal Content */}
            <div className="p-6 overflow-y-auto flex-grow flex flex-col items-center gap-6 custom-scrollbar text-black" style={{ backgroundColor: '#ffffff' }}>
              {selectedItem.image && (
                <div className="w-full flex justify-center shrink-0">
                  <img 
                    src={resolveImageUrl(selectedItem.image)} 
                    alt={selectedItem.name} 
                    className="max-w-full max-h-[450px] object-contain rounded-lg shadow-sm"
                  />
                </div>
              )}
              
              <div 
                className="text-sm md:text-base leading-relaxed text-left w-full whitespace-pre-line"
                style={{ color: '#1a1a1a' }}
              >
                {selectedItem.description}
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}
    </section>
  );
})
