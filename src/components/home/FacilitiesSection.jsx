import { memo, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { resolveImageUrl } from "../../services/api";

const hasOverflow = (text) => {
  if (!text) return false;
  const cleanText = text.replace(/(<([^>]+)>)/gi, "");
  return cleanText.length > 150 || (cleanText.match(/\r?\n/g) || []).length >= 4;
};

const FacilitiesSection = memo(function FacilitiesSection({ data }) {
  const items = useMemo(() => data?.facilities || [], [data]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);

  if (!items.length) return null;

  // Duplicate the items array to create a seamless infinite scrolling effect
  const scrollingItems = [...items, ...items, ...items];

  return (
    <section className="bg-[#F9F4E1] py-16 overflow-hidden w-full relative z-10">
      <style>
        {`
          @keyframes infinite-scroll {
            0% { transform: translateX(0); }
            100% { transform: translateX(calc(-100% / 3)); }
          }
          .animate-infinite-scroll {
            display: flex;
            width: max-content;
            animation: infinite-scroll 45s linear infinite;
          }
          .animate-infinite-scroll:hover {
            animation-play-state: paused;
          }
        `}
      </style>
      
      <div className="max-w-[1140px] mx-auto px-4 mb-10">
        <h2 className="text-[54px] font-medium text-[#0066A6] mb-4 max-[991px]:text-[48px] max-[576px]:text-[36px]">
          {data?.title || "Facilities"}
        </h2>
        
        <div className="w-[120px] h-[3px] bg-[#F68C1F] mb-8" />
        
        <div className="flex flex-col md:flex-row gap-8 justify-between items-start md:items-center">
          {data?.subtitle && (
            <h3 className="text-[#0066A6] text-2xl md:text-[28px] font-medium max-w-lg leading-snug">
              {data.subtitle}
            </h3>
          )}
          {data?.description && (
            <p className="text-gray-500 text-base md:text-lg max-w-xl leading-relaxed">
              {data.description.replace(/(<([^>]+)>)/gi, "")}
            </p>
          )}
        </div>
      </div>

      {/* Infinite Scroll Container */}
      <div className="w-full relative mt-12">
        <div className="animate-infinite-scroll group">
          {scrollingItems.map((item, index) => (
            <div 
              key={`${item.id || index}-${index}`} 
              className="flex-shrink-0 w-[350px] md:w-[400px] mx-4 flex flex-col shadow-md hover:shadow-xl transition-shadow duration-300"
            >
              {/* Header */}
              <div className="bg-[#D89324] py-3 px-4 text-center">
                <h4 className="font-bold text-black tracking-wide text-lg uppercase">
                  {item.name}
                </h4>
              </div>
              
              {/* Image */}
              <div 
                className="h-[250px] w-full overflow-hidden cursor-pointer group-hover:cursor-pointer"
                onClick={() => setSelectedImage(resolveImageUrl(item.image))}
              >
                <img 
                  src={resolveImageUrl(item.image)} 
                  alt={item.name} 
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </div>
              
              {/* Description */}
              <div className="bg-[#E9EEF4] p-6 flex-grow flex flex-col items-center justify-center text-center">
                <div 
                  className="text-gray-800 text-sm leading-relaxed line-clamp-4 text-ellipsis overflow-hidden mb-3"
                  style={{ color: '#1a1a1a' }}
                  dangerouslySetInnerHTML={{ __html: item.description || item.story || "" }}
                />
                {hasOverflow(item.description || item.story) && (
                  <button 
                    onClick={() => setSelectedItem(item)}
                    className="text-xs font-bold text-[#D89324] hover:text-[#0066A6] transition-colors focus:outline-none cursor-pointer"
                  >
                    Read More &rarr;
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Image Popup Modal via Portal */}
      {selectedImage && createPortal(
        <div 
          className="fixed inset-0 z-[99999] flex items-center justify-center bg-black bg-opacity-80 p-4 transition-opacity"
          onClick={() => setSelectedImage(null)}
        >
          <div 
            className="relative max-w-4xl max-h-[90vh] w-full"
            onClick={e => e.stopPropagation()}
          >
            <button 
              className="absolute -top-12 right-0 text-white text-4xl font-light hover:text-gray-300 transition-colors"
              onClick={() => setSelectedImage(null)}
            >
              &times;
            </button>
            <img 
              src={selectedImage} 
              alt="Popup Enlarged" 
              className="w-full h-auto max-h-[90vh] object-contain rounded-lg shadow-[0_0_50px_rgba(0,0,0,0.5)]"
            />
          </div>
        </div>,
        document.body
      )}

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
            <div className="bg-[#D89324] p-4 text-center relative shrink-0">
              <h3 
                className="font-bold text-black tracking-wide text-lg md:text-xl uppercase pr-8"
                style={{ color: '#000000' }}
              >
                {selectedItem.name}
              </h3>
              <button 
                className="absolute top-1/2 -translate-y-1/2 right-4 text-black text-2xl font-bold hover:opacity-75 transition-opacity cursor-pointer"
                onClick={() => setSelectedItem(null)}
                style={{ color: '#000000' }}
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
                dangerouslySetInnerHTML={{ __html: selectedItem.description || selectedItem.story || "" }}
              />
            </div>
          </div>
        </div>,
        document.body
      )}
    </section>
  );
});

export default FacilitiesSection;
