import { memo, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { resolveImageUrl } from "../../services/api";
import { Download } from "lucide-react";

const getPlainText = (html = "") => html
  .replace(/<script[\s\S]*?<\/script>/gi, " ")
  .replace(/<style[\s\S]*?<\/style>/gi, " ")
  .replace(/<[^>]+>/g, " ")
  .replace(/&nbsp;|&#160;/gi, " ")
  .replace(/&amp;/gi, "&")
  .replace(/&quot;|&#34;/gi, '"')
  .replace(/&#39;|&apos;/gi, "'")
  .replace(/&lt;/gi, "<")
  .replace(/&gt;/gi, ">")
  .replace(/\s+/g, " ")
  .trim();

const hasOverflow = (text) => getPlainText(text).length > 150;

const FacilitiesSection = memo(function FacilitiesSection({ data }) {
  const items = useMemo(() => data?.facilities || [], [data]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async (imageUrl, fileName) => {
    if (!imageUrl || isDownloading) return;

    setIsDownloading(true);

    try {
      const response = await fetch(imageUrl, { mode: "cors", cache: "no-store" });
      if (!response.ok) throw new Error(`Image request failed with status ${response.status}`);

      const blob = await response.blob();
      const objectUrl = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = objectUrl;
      link.download = fileName || "event-flyer.jpg";
      link.style.display = "none";
      document.body.appendChild(link);
      link.click();

      window.setTimeout(() => {
        link.remove();
        window.URL.revokeObjectURL(objectUrl);
      }, 1000);
    } catch (error) {
      console.error("Failed to download image via fetch:", error);
      const link = document.createElement("a");
      link.href = imageUrl;
      link.download = fileName || "event-flyer.jpg";
      link.rel = "noopener noreferrer";
      link.target = "_blank";
      document.body.appendChild(link);
      link.click();
      link.remove();
    } finally {
      setIsDownloading(false);
    }
  };

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
              className="flex-shrink-0 w-[350px] md:w-[400px] mx-4 flex flex-col overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300"
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
              <div className="bg-[#E9EEF4] p-6 flex-grow min-w-0 flex flex-col items-center justify-center text-center">
                <p
                  className="w-full max-w-full text-gray-800 text-sm leading-relaxed line-clamp-4 overflow-hidden break-words [overflow-wrap:anywhere] mb-3"
                  style={{ color: '#1a1a1a' }}
                >
                  {getPlainText(item.description || item.story)}
                </p>
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
            <button
              className="absolute -top-12 right-12 text-white hover:text-gray-300 transition-colors flex items-center gap-1.5 text-sm bg-black/40 px-3 py-1.5 rounded-md border border-white/20 hover:bg-black/60 cursor-pointer disabled:cursor-wait disabled:opacity-60"
              onClick={() => handleDownload(selectedImage, "event-flyer.jpg")}
              title={isDownloading ? "Downloading image" : "Download image"}
              disabled={isDownloading}
            >
              <Download className="w-4 h-4" />
              <span>{isDownloading ? "Downloading..." : "Download"}</span>
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
