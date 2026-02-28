import { useState, useRef, useEffect, memo } from "react";

/**
 * LazyIframe — only loads the iframe when it enters the viewport.
 * Prevents heavy iframes (Google Maps, YouTube embeds) from blocking initial page load.
 *
 * Props: same as <iframe> plus optional `rootMargin` for IntersectionObserver.
 */
const LazyIframe = memo(function LazyIframe({
  src,
  rootMargin = "200px",
  className = "",
  style,
  ...rest
}) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !src) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [src, rootMargin]);

  return (
    <div ref={ref} className={className} style={style}>
      {isVisible ? (
        <iframe src={src} className="w-full h-full" {...rest} />
      ) : (
        <div className="w-full h-full bg-gray-200 animate-pulse flex items-center justify-center">
          <span className="text-gray-400 text-sm">Loading map…</span>
        </div>
      )}
    </div>
  );
});

export default LazyIframe;

/**
 * YouTubeThumbnail — shows a thumbnail image with play button.
 * Only loads the actual YouTube iframe when the user clicks play.
 * Vastly reduces initial page load time vs embedding iframes directly.
 */
export const YouTubeThumbnail = memo(function YouTubeThumbnail({
  videoId,
  title = "YouTube video",
  className = "",
  autoplayOnClick = true,
}) {
  const [play, setPlay] = useState(false);

  if (!videoId) return null;

  if (play) {
    return (
      <div className={`relative w-full pt-[56.25%] ${className}`}>
        <iframe
          className="absolute inset-0 w-full h-full"
          src={`https://www.youtube.com/embed/${videoId}?autoplay=${autoplayOnClick ? 1 : 0}&rel=0`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    );
  }

  return (
    <div
      className={`relative w-full pt-[56.25%] cursor-pointer group ${className}`}
      onClick={() => setPlay(true)}
    >
      <img
        src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
        alt={title}
        loading="lazy"
        className="absolute inset-0 w-full h-full object-cover"
      />
      {/* Play button overlay */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center shadow-lg group-hover:bg-red-700 transition-colors">
          <svg className="w-7 h-7 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z" />
          </svg>
        </div>
      </div>
    </div>
  );
});
