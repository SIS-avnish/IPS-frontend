import { useMemo } from "react";

/**
 * Strips CMS editing artefacts (edit buttons, contenteditable attrs, wrapper
 * chrome, "Edit HTML" text) from raw HTML so it renders cleanly on the public site.
 *
 * Can be used standalone:  cleanCmsHtml(rawHtml)
 */
export function cleanCmsHtml(html) {
  if (!html) return "";
  try {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");

    // Remove "Edit HTML" buttons/links/elements injected by the CMS
    doc.querySelectorAll("button, a, span, div, p").forEach((el) => {
      if (/^\s*edit\s*html\s*$/i.test(el.textContent) && el.children.length === 0) {
        const wrapper = el.closest("div:not(body)");
        if (wrapper && wrapper !== el && wrapper.textContent.trim().replace(/edit\s*html/i, "").trim() === "") {
          wrapper.remove();
        } else {
          el.remove();
        }
      }
    });

    // Strip contenteditable attributes
    doc.querySelectorAll("[contenteditable]").forEach((el) => {
      el.removeAttribute("contenteditable");
    });

    // Remove data-raw markers
    doc.querySelectorAll("[data-raw]").forEach((el) => {
      el.removeAttribute("data-raw");
    });

    // Final pass: remove any remaining "Edit HTML" text via string replacement
    let result = doc.body.innerHTML;
    result = result.replace(/<[^>]*>\s*Edit\s+HTML\s*<\/[^>]*>/gi, "");

    return result;
  } catch {
    return html;
  }
}

/**
 * Renders a single scratch‑type HTML block received from the API.
 */
export default function ScratchHtml({ html, className = "" }) {
  const cleanHtml = useMemo(() => cleanCmsHtml(html), [html]);

  if (!cleanHtml) return null;

  return (
    <section className={`w-full py-8 sm:py-12 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div dangerouslySetInnerHTML={{ __html: cleanHtml }} />
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
 * API sections object. Drop this into any page to automatically pick up
 * every scratch block without hard‑coding section keys.
 *
 * Usage:
 *   <ScratchSections sections={sections} />
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
