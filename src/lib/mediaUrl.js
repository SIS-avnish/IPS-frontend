const PORTAL_MEDIA_BASE = "https://portal.ipsa.ac.in";

/**
 * Keeps normal URLs intact, but always serves uploads from the public portal.
 * CMS editors can return uploads as relative paths or with a different origin.
 */
export function normalizeMediaUrl(src) {
  if (!src || typeof src !== "string") return src;

  const value = src.trim();
  if (/^(data:|blob:)/i.test(value)) return src;

  try {
    const url = new URL(value, "https://ipsa.local");
    if (/^\/uploads(?:\/|$)/i.test(url.pathname)) {
      return `${PORTAL_MEDIA_BASE}${url.pathname}${url.search}${url.hash}`;
    }

    // A real absolute URL that is not an upload must remain exactly as supplied.
    if (/^(https?:|\/\/)/i.test(value)) return src;
  } catch {
    // Fall through to support malformed-but-common CMS relative paths.
  }

  const relativeUpload = value.replace(/\\/g, "/").replace(/^(?:\.\/|\.\.\/)+/, "");
  if (/^(uploads|media|storage)(?:\/|$)/i.test(relativeUpload)) {
    return `${PORTAL_MEDIA_BASE}/${relativeUpload}`;
  }

  return src;
}

export function normalizeMediaSrcSet(srcSet) {
  if (!srcSet || typeof srcSet !== "string") return srcSet;

  return srcSet
    .split(",")
    .map((candidate) => {
      const [url, descriptor] = candidate.trim().split(/\s+/, 2);
      return [normalizeMediaUrl(url), descriptor].filter(Boolean).join(" ");
    })
    .filter(Boolean)
    .join(", ");
}

/** Normalizes image URLs embedded inside rich-text CMS HTML. */
export function normalizeCmsMediaUrls(html) {
  if (!html || typeof html !== "string") return html || "";

  return html
    .replace(/\b(src|poster)\s*=\s*(["'])(.*?)\2/gi, (match, attribute, quote, url) =>
      `${attribute}=${quote}${normalizeMediaUrl(url)}${quote}`
    )
    .replace(/\bsrcset\s*=\s*(["'])(.*?)\1/gi, (match, quote, srcSet) =>
      `srcset=${quote}${normalizeMediaSrcSet(srcSet)}${quote}`
    )
    .replace(/url\(\s*(["']?)(.*?)\1\s*\)/gi, (match, quote, url) =>
      `url(${quote}${normalizeMediaUrl(url)}${quote})`
    );
}
