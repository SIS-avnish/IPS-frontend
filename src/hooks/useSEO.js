import { useEffect, useRef } from "react";

const DEFAULT_TITLE = "IPS Academy";

/**
 * Dynamically injects SEO meta tags, canonical link, Open Graph,
 * Twitter Card, and JSON-LD schema markup into <head> based on
 * the API page response.
 *
 * Usage:  useSEO(pageData)   — pass the full API response object.
 *
 * On unmount the hook removes every tag it created and restores
 * the original document title, keeping the DOM clean during SPA
 * navigation.
 */
export default function useSEO(pageData) {
  // Track every DOM node the hook creates so we can clean up on
  // unmount or when pageData changes.
  const createdNodes = useRef([]);

  useEffect(() => {
    if (!pageData) return;

    // ── helpers ──────────────────────────────────────────────────
    const setMeta = (attr, attrValue, content) => {
      if (!content) return;
      let el = document.head.querySelector(`meta[${attr}="${attrValue}"]`);
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr, attrValue);
        document.head.appendChild(el);
        createdNodes.current.push(el);
      }
      el.setAttribute("content", content);
    };

    const setLink = (rel, href) => {
      if (!href) return;
      let el = document.head.querySelector(`link[rel="${rel}"]`);
      if (!el) {
        el = document.createElement("link");
        el.setAttribute("rel", rel);
        document.head.appendChild(el);
        createdNodes.current.push(el);
      }
      el.setAttribute("href", href);
    };

    // ── title ───────────────────────────────────────────────────
    const prevTitle = document.title;
    if (pageData.meta_title) {
      document.title = pageData.meta_title;
    }

    // ── standard meta tags ──────────────────────────────────────
    setMeta("name", "description", pageData.meta_description);
    setMeta("name", "keywords", pageData.meta_keywords);
    setMeta("name", "robots", pageData.robots);

    // ── canonical URL ───────────────────────────────────────────
    setLink("canonical", pageData.canonical_url);

    // ── Open Graph ──────────────────────────────────────────────
    setMeta("property", "og:title", pageData.og_title);
    setMeta("property", "og:description", pageData.og_description);
    setMeta("property", "og:image", pageData.og_image);
    setMeta("property", "og:url", pageData.canonical_url);
    setMeta("property", "og:type", "website");

    // ── Twitter Card ────────────────────────────────────────────
    setMeta("name", "twitter:card", "summary_large_image");
    setMeta("name", "twitter:title", pageData.twitter_title);
    setMeta("name", "twitter:description", pageData.twitter_description);
    setMeta("name", "twitter:image", pageData.twitter_image);

    // ── JSON-LD Schema Markup ───────────────────────────────────
    let schemaScript = null;
    if (pageData.schema_markup) {
      schemaScript = document.createElement("script");
      schemaScript.type = "application/ld+json";
      try {
        // Normalise: the API may return a string with \r\n
        const parsed =
          typeof pageData.schema_markup === "string"
            ? JSON.parse(pageData.schema_markup)
            : pageData.schema_markup;
        schemaScript.textContent = JSON.stringify(parsed);
      } catch {
        schemaScript.textContent = pageData.schema_markup;
      }
      document.head.appendChild(schemaScript);
      createdNodes.current.push(schemaScript);
    }

    // ── cleanup on unmount / re-run ─────────────────────────────
    return () => {
      document.title = prevTitle || DEFAULT_TITLE;
      createdNodes.current.forEach((node) => {
        try {
          node.parentNode?.removeChild(node);
        } catch {
          /* already removed */
        }
      });
      createdNodes.current = [];
    };
  }, [pageData]);
}
