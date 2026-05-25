import { useMemo } from "react";
import SafeHtml from "./SafeHtml";
import { cleanCmsHtml as sanitizeCmsHtml } from "../../lib/sanitize";

/**
 * Strips CMS editing artefacts and sanitizes raw HTML.
 * Legacy export for backward compatibility.
 */
export function cleanCmsHtml(html) {
  return sanitizeCmsHtml(html);
}

/**
 * Renders a single scratch‑type HTML block received from the API.
 */
export default function ScratchHtml({ html, className = "" }) {
  if (!html) return null;

  return (
    <section className={`w-full py-8 sm:py-12 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <SafeHtml html={html} className="overflow-x-auto" />
      </div>
    </section>
  );
}

/**
 * Extract all scratch‑type sections from API response, sorted by sort_order.
 *
 * @param {Object|null} sections – the `sections` object from the page API response
 * @returns {{ key: string, sort_order: number, html: string }[]}
 */
export function getScratchSections(sections) {
  if (!sections || typeof sections !== "object") return [];

  return Object.entries(sections)
    .filter(([, section]) => section && section.type === "scratch" && section.html)
    .sort((a, b) => (a[1].sort_order ?? Infinity) - (b[1].sort_order ?? Infinity))
    .map(([key, section]) => ({
      key,
      sort_order: section.sort_order,
      html: section.html,
    }));
}

/**
 * Convenience component: renders ALL scratch sections extracted from the
 * API sections object.
 */
const EMPTY_EXCLUDE = [];
export function ScratchSections({ sections, className = "", exclude = EMPTY_EXCLUDE }) {
  const items = useMemo(() => {
    const all = getScratchSections(sections);
    if (exclude.length === 0) return all;
    const excludeSet = new Set(exclude);
    return all.filter((item) => !excludeSet.has(item.key));
  }, [sections, exclude]);

  if (items.length === 0) return null;

  return (
    <>
      {items.map((item) => (
        <ScratchHtml key={item.key} html={item.html} className={className} />
      ))}
    </>
  );
}

