import { useState, useEffect, useMemo, memo, useCallback } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight, X, ZoomIn, Download } from "lucide-react";
import Media, { isVideoUrl } from "../common/Media";

const EventSlider = memo(({ title, content, events = [], collegeSlug, gallery = [] }) => {
  const chunkSize = 6;

  const handleDownload = async (imageUrl, fileName) => {
    try {
      const response = await fetch(imageUrl, { mode: 'cors' });
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = fileName || 'downloaded-image.jpg';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Failed to download image via fetch:', error);
      const link = document.createElement('a');
      link.href = imageUrl;
      link.target = '_blank';
      link.download = fileName || 'downloaded-image.jpg';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const slides = useMemo(() => {
    const result = [];
    for (let i = 0; i < events.length; i += chunkSize) {
      result.push(events.slice(i, i + chunkSize));
    }
    if (result.length === 0) result.push([]);
    return result;
  }, [events]);

  const [index, setIndex] = useState(0);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [currentGalleryIndex, setCurrentGalleryIndex] = useState(0);

  const prev = () => setIndex((prevIndex) => (prevIndex === 0 ? slides.length - 1 : prevIndex - 1));
  const next = () => setIndex((prevIndex) => (prevIndex === slides.length - 1 ? 0 : prevIndex + 1));

  const prevGallery = useCallback(() => {
    setCurrentGalleryIndex((prev) => (prev === 0 ? gallery.length - 1 : prev - 1));
  }, [gallery.length]);

  const nextGallery = useCallback(() => {
    setCurrentGalleryIndex((prev) => (prev === gallery.length - 1 ? 0 : prev + 1));
  }, [gallery.length]);

  useEffect(() => {
    if (!isGalleryOpen) return;

    const handleKeyPress = (e) => {
      if (e.key === "ArrowLeft") {
        prevGallery();
      } else if (e.key === "ArrowRight") {
        nextGallery();
      } else if (e.key === "Escape") {
        setIsGalleryOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [isGalleryOpen, prevGallery, nextGallery]);

  useEffect(() => {
    if (slides.length <= 1) return;

    const timer = setInterval(() => {
      setIndex((prevIndex) => (prevIndex === slides.length - 1 ? 0 : prevIndex + 1));
    }, 7000);

    return () => clearInterval(timer);
  }, [slides.length]);

  const openGalleryModal = (galIndex) => {
    setCurrentGalleryIndex(galIndex);
    setIsGalleryOpen(true);
  };

  const closeGalleryModal = () => {
    setIsGalleryOpen(false);
  };

  return (
    <div className="py-12 md:py-20 px-4 sm:px-5">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-6 sm:gap-4 items-start">
        <div>
          <h2 className="text-2xl md:text-5xl sm:text-3xl font-medium leading-tight">
            {title}
          </h2>
          <div className="w-40 h-[2px] bg-red-400 mt-3" />
        </div>

        <p className="text-gray-600 mt-4 text-xl sm:text-[20px]">
          {content}
        </p>
      </div>

      <div className="max-w-6xl mx-auto mt-10 sm:mt-8 relative">
        {slides.length > 1 && (
          <div className="absolute right-4 -top-10 sm:-top-8 flex gap-3 z-10">
            <button
              onClick={prev}
              className="border border-red-400 rounded-full w-8 h-8 flex items-center justify-center hover:bg-red-50 bg-white"
              >
              <ChevronLeft className="w-4 h-4 text-red-500" aria-hidden="true" />
            </button>
            <button
              onClick={next}
              className="border border-red-400 rounded-full w-8 h-8 flex items-center justify-center hover:bg-red-50 bg-white"
              >
              <ChevronRight className="w-4 h-4 text-red-500" aria-hidden="true" />
            </button>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-4 pt-4 transition-all duration-300">
          {slides[index].map((event, i) => {
            const eventCollegeSlug = event.collegeSlug || collegeSlug;
            const linkTo = event._isActivity
              ? `/${eventCollegeSlug}/activity/${event.id}`
              : `/${eventCollegeSlug}/activities/events/${event.id}`;

            return (
              <Link
                to={linkTo}
                key={event.id || i}
                className="block group"
              >
                <div className="relative overflow-hidden border-2 border-[#ff7373] shadow-md">
                  {event.thumbnail_image ? (
                    isVideoUrl(event.thumbnail_image) ? (
                      <video
                        src={event.thumbnail_image}
                        className="w-full h-[320px] sm:h-[260px] object-cover transition-transform duration-500 group-hover:scale-105"
                        muted
                        autoPlay
                        loop
                        playsInline
                      />
                    ) : (
                      <img
                        src={event.thumbnail_image}
                        alt={event.title || `event-${i}`}
                        className="w-full h-[320px] sm:h-[260px] object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="eager"
                      />
                    )
                  ) : (
                    <div className="w-full h-[320px] sm:h-[260px] bg-white flex items-center justify-center p-6">
                      <h3 className="text-[#002147] font-semibold text-lg text-center">
                        {event.title}
                      </h3>
                    </div>
                  )}

                  {event.collegeName && (
                    <div className="absolute top-3 left-3 rounded-full bg-white/90 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#002147] shadow-sm">
                      {event.collegeName}
                    </div>
                  )}

                  <div className="absolute bottom-0 left-0 w-full bg-black/60 backdrop-blur-sm text-center py-3 px-4">
                    <h3 className="text-white text-lg font-semibold line-clamp-1">
                      {event.title}
                    </h3>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {gallery.length > 0 && (
        <div className="mt-16 sm:mt-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 pt-4">
            {gallery.map((image, idx) => (
              <button
                key={idx}
                onClick={() => openGalleryModal(idx)}
                className="block group relative overflow-hidden border-2 border-[#ff7373] shadow-md rounded-lg hover:shadow-lg transition-shadow"
              >
                <Media
                  src={image}
                  alt={`gallery-${idx}`}
                  className="w-full h-[240px] sm:h-[200px] object-cover transition-transform duration-500 group-hover:scale-105"
                  aspectRatio="4/3"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                  <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-2xl">
                    <ZoomIn className="w-8 h-8" aria-hidden="true" />
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {isGalleryOpen && gallery.length > 0 && (
        <div
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          onClick={closeGalleryModal}
        >
          <div
            className="relative max-w-4xl max-h-[90vh] w-full flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeGalleryModal}
              className="absolute top-1 right-38 bg-black text-white w-10 h-10 rounded-full flex items-center justify-center font-bold text-xl transition-colors z-10"
              aria-label="Close gallery"
              >
              <X className="w-5 h-5" aria-hidden="true" />
            </button>
            <button
              onClick={() => handleDownload(gallery[currentGalleryIndex], `gallery-${currentGalleryIndex}.jpg`)}
              className="absolute top-1 right-52 bg-black text-white w-10 h-10 rounded-full flex items-center justify-center transition-colors z-10 hover:bg-gray-800 cursor-pointer"
              aria-label="Download image"
              title="Download Image"
            >
              <Download className="w-5 h-5" />
            </button>

            <div className="relative w-full flex justify-center">
              <img
                src={gallery[currentGalleryIndex]}
                alt={`gallery-${currentGalleryIndex}`}
                className="w-150 mx-auto h-auto max-h-[80vh] object-contain"
                loading="eager"
              />
            </div>

            {gallery.length > 1 && (
              <>
                <button
                  onClick={prevGallery}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-white text-black w-12 h-12 rounded-full flex items-center justify-center font-bold text-2xl transition-colors"
                  aria-label="Previous image"
                  >
                  <ChevronLeft className="w-6 h-6" aria-hidden="true" />
                </button>

                <button
                  onClick={nextGallery}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white text-black w-12 h-12 rounded-full flex items-center justify-center font-bold text-2xl transition-colors"
                  aria-label="Next image"
                  >
                  <ChevronRight className="w-6 h-6" aria-hidden="true" />
                </button>

                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/70 text-white px-4 py-2 rounded-full text-sm">
                  {currentGalleryIndex + 1} / {gallery.length}
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
});

export default EventSlider;
