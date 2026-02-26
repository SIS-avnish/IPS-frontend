import { useMemo } from "react";

/**
 * Renders a single scratch‑type HTML block received from the API.
 * Strips CMS editing artefacts (edit buttons, contenteditable attrs, wrapper
 * chrome) so the raw content renders cleanly on the public site.
 */
export default function ScratchHtml({ html, className = "" }) {
  const cleanHtml = useMemo(() => {
    if (!html) return "";

    try {
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, "text/html");

      // Remove "Edit HTML" buttons injected by the CMS
      doc.querySelectorAll("button").forEach((btn) => {
        if (/edit\s*html/i.test(btn.textContent)) {
          const wrapper = btn.closest("div");
          if (wrapper) wrapper.remove();
          else btn.remove();
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

      return doc.body.innerHTML;
    } catch {
      // Fallback: return the original HTML if parsing fails
      return html;
    }
  }, [html]);

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
export function ScratchSections({ sections, className = "" }) {
  const items = useMemo(() => getScratchSections(sections), [sections]);

  if (items.length === 0) return null;

  return (
    <>
      {items.map((item) => (
        <ScratchHtml key={item.key} html={item.html} className={className} />
      ))}
    </>
  );
}
