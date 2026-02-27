/**
 * Drop-in replacement for <img> that auto-detects video URLs from the API
 * and renders a <video> player instead.
 *
 * Usage: simply replace <img src={url} ... /> with <Media src={url} ... />
 * All standard <img> props (className, alt, loading, style, etc.) are forwarded as-is.
 */

const VIDEO_EXTENSIONS = [".mp4", ".webm", ".ogg", ".mov", ".avi", ".mkv", ".m4v"];

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

export default function Media({ src, alt, className, style, ...rest }) {
  if (isVideoUrl(src)) {
    return (
      <video
        src={src}
        className={className}
        style={{ objectFit: "cover", ...style }}
        muted
        autoPlay
        loop
        playsInline
        controls
        aria-label={alt}
      />
    );
  }

  return (
    <img src={src} alt={alt} className={className} style={style} {...rest} />
  );
}
