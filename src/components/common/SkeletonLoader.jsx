/**
 * Reusable skeleton loader with animated shimmer.
 * Variants: "page" (full page), "hero", "card", "text", "inline".
 */

const shimmerClass = "animate-pulse bg-gray-200 rounded";

function SkeletonBlock({ className = "" }) {
  return <div className={`${shimmerClass} ${className}`} />;
}

/** Full page skeleton — replaces the spinner on page loads */
export function PageSkeleton() {
  return (
    <div className="w-full min-h-screen">
      {/* Hero skeleton */}
      <SkeletonBlock className="w-full h-[60vh] rounded-none" />

      {/* Content skeleton */}
      <div className="max-w-6xl mx-auto px-4 py-10 space-y-6">
        <SkeletonBlock className="h-8 w-1/3" />
        <SkeletonBlock className="h-4 w-2/3" />
        <SkeletonBlock className="h-4 w-1/2" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="space-y-3">
              <SkeletonBlock className="h-48 w-full" />
              <SkeletonBlock className="h-4 w-3/4" />
              <SkeletonBlock className="h-4 w-1/2" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/** Hero area skeleton */
export function HeroSkeleton() {
  return (
    <div className="w-full relative">
      <SkeletonBlock className="w-full h-[60vh] sm:h-[55vh] md:h-[90vh] min-h-[420px] rounded-none" />
      <div className="absolute left-0 bottom-0 translate-y-1/5 bg-gray-100 w-[70%] max-w-2xl px-8 py-8 space-y-4">
        <SkeletonBlock className="h-8 w-3/4" />
        <SkeletonBlock className="h-6 w-1/2" />
        <SkeletonBlock className="h-10 w-32" />
      </div>
    </div>
  );
}

/** Card grid skeleton */
export function CardGridSkeleton({ count = 6, columns = 3 }) {
  return (
    <div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-${columns} gap-6`}>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="space-y-3">
          <SkeletonBlock className="h-52 w-full" />
          <SkeletonBlock className="h-4 w-3/4" />
          <SkeletonBlock className="h-4 w-1/2" />
        </div>
      ))}
    </div>
  );
}

/** Text block skeleton */
export function TextSkeleton({ lines = 4 }) {
  return (
    <div className="space-y-3">
      {Array.from({ length: lines }).map((_, i) => (
        <SkeletonBlock
          key={i}
          className={`h-4 ${i === lines - 1 ? "w-1/3" : i % 2 === 0 ? "w-full" : "w-5/6"}`}
        />
      ))}
    </div>
  );
}

export default PageSkeleton;
