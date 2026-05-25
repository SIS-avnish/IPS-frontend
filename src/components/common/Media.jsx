import { memo } from "react";

const VIDEO_EXTENSIONS = [".mp4", ".webm", ".ogg", ".mov", ".avi", ".mkv", ".m4v"];

/**
 * Checks if a given URL is a video asset.
 */
export function isVideoUrl(url) {
  if (!url || typeof url !== "string") return false;
  try {
    const pathname = new URL(url, "http://localhost").pathname.toLowerCase();
    return VIDEO_EXTENSIONS.some((ext) => pathname.endsWith(ext));
  } catch {
    const lower = url.toLowerCase();
    return VIDEO_EXTENSIONS.some((ext) => lower.includes(ext));
  }
}

/**
 * Modifies Cloudinary URLs to inject auto-format, auto-quality, and sizing options.
 * Also strips out any existing transformation folder to prevent conflicts.
 */
export function getOptimizedCloudinaryUrl(url, options = {}) {
  if (!url || typeof url !== 'string') return url;
  if (!url.includes('res.cloudinary.com')) return url;

  const uploadIndex = url.indexOf('image/upload');
  if (uploadIndex === -1) return url;

  const base = url.substring(0, uploadIndex + 12);
  let rest = url.substring(uploadIndex + 12);

  // Strip existing transformation segment if present (e.g. /c_scale,w_400/)
  const parts = rest.split('/').filter(Boolean);
  if (parts.length > 0 && !/^v\d+$/.test(parts[0]) && parts[0].includes('_')) {
    parts.shift();
    rest = '/' + parts.join('/');
  }

  const { width, height, quality = 'auto', format = 'auto', crop = 'fill' } = options;

  const transformations = [];
  transformations.push(`f_${format}`);
  transformations.push(`q_${quality}`);

  if (width) transformations.push(`w_${width}`);
  if (height) transformations.push(`h_${height}`);
  if (width || height) transformations.push(`c_${crop}`);

  const transformationStr = transformations.join(',');
  const cleanRest = rest.startsWith('/') ? rest : '/' + rest;

  return `${base}/${transformationStr}${cleanRest}`;
}

/**
 * Optimized Media component.
 * - Handles both image and video assets.
 * - Injects dynamic Cloudinary optimization.
 * - Implements responsive srcSet images.
 * - Configures loading and fetchPriority to avoid CLS and optimize LCP.
 */
export default memo(function Media({
  src,
  alt = "IPS Academy Indore",
  className,
  style,
  width,
  height,
  priority = false, // Set to true for hero / LCP images (disables lazy loading, sets fetchpriority to high)
  aspectRatio,      // Useful for reserving space to prevent CLS (e.g., "16/9")
  sizes = "(max-width: 768px) 100vw, 1200px",
  ...rest
}) {
  if (!src) return null;

  if (isVideoUrl(src)) {
    return (
      <video
        src={src}
        className={className}
        style={{ objectFit: "cover", ...(aspectRatio ? { aspectRatio } : {}), ...style }}
        muted
        autoPlay
        loop
        playsInline
        controls
        aria-label={alt}
        width={width}
        height={height}
        {...rest}
      />
    );
  }

  const isCloudinary = src.includes('res.cloudinary.com');
  const loadingMode = priority ? "eager" : "lazy";
  const fetchPriority = priority ? "high" : "low";

  const imgStyle = {
    ...(aspectRatio ? { aspectRatio } : {}),
    ...style,
  };

  let srcSet = undefined;
  let optimizedSrc = src;

  if (isCloudinary) {
    // Generate base optimized URL using specified or fallback width
    optimizedSrc = getOptimizedCloudinaryUrl(src, {
      width: width || 1200,
      height: height,
      crop: width && height ? 'fill' : 'limit'
    });

    // Generate srcSet for responsive breakpoints
    const srcSetWidths = [360, 540, 720, 960, 1200, 1600];
    srcSet = srcSetWidths
      .map(w => `${getOptimizedCloudinaryUrl(src, { width: w, crop: 'limit' })} ${w}w`)
      .join(', ');
  }

  return (
    <img
      src={optimizedSrc}
      srcSet={srcSet}
      sizes={srcSet ? sizes : undefined}
      alt={alt}
      className={className}
      style={imgStyle}
      width={width}
      height={height}
      loading={loadingMode}
      decoding="async"
      fetchPriority={fetchPriority}
      {...rest}
    />
  );
});
