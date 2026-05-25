import DOMPurify from 'isomorphic-dompurify';

/**
 * Merges duplicate style attributes in HTML tags.
 * e.g., <div style="color: red" style="font-weight: bold"> -> <div style="color: red; font-weight: bold;">
 */
export function mergeDuplicateStyles(html) {
  if (!html) return "";
  
  // A regex to match any HTML tag
  return html.replace(/<[a-zA-Z0-9\-]+[^>]*>/g, (tag) => {
    // Find all style attributes (supporting single or double quotes)
    const styleMatches = tag.match(/style=(['"])(.*?)\1/gi);
    if (styleMatches && styleMatches.length > 1) {
      const styles = styleMatches.map(m => {
        const match = m.match(/style=(['"])(.*?)\1/i);
        return match ? match[2].trim() : "";
      }).filter(Boolean);
      
      const combinedStyle = styles.map(s => s.endsWith(';') ? s : s + ';').join(' ');
      
      // Strip all style attributes from the tag
      let cleanedTag = tag.replace(/style=(['"])(.*?)\1/gi, '');
      
      // Clean up extra spaces
      cleanedTag = cleanedTag.replace(/\s+/g, ' ');
      
      // Append combined style
      if (cleanedTag.endsWith(' />')) {
        cleanedTag = cleanedTag.slice(0, -3).trim() + ` style="${combinedStyle}" />`;
      } else if (cleanedTag.endsWith('/>')) {
        cleanedTag = cleanedTag.slice(0, -2).trim() + ` style="${combinedStyle}" />`;
      } else {
        cleanedTag = cleanedTag.slice(0, -1).trim() + ` style="${combinedStyle}">`;
      }
      return cleanedTag;
    }
    return tag;
  });
}

// Set up DOMPurify hooks for cleaning CMS specific editing artifacts
DOMPurify.addHook('uponSanitizeElement', (node) => {
  // Remove contenteditable attribute
  if (node.removeAttribute && node.hasAttribute && node.hasAttribute('contenteditable')) {
    node.removeAttribute('contenteditable');
  }
  // Remove data-raw attribute
  if (node.removeAttribute && node.hasAttribute && node.hasAttribute('data-raw')) {
    node.removeAttribute('data-raw');
  }
  // Remove "Edit HTML" buttons/links/elements injected by CMS
  if (node.textContent && /^\s*edit\s*html\s*$/i.test(node.textContent) && (!node.children || node.children.length === 0)) {
    if (node.parentNode) {
      const parent = node.parentNode;
      if (parent && parent.tagName === 'DIV' && parent.textContent.trim().replace(/edit\s*html/i, "").trim() === "") {
        if (parent.parentNode) {
          parent.parentNode.removeChild(parent);
          return;
        }
      }
      parent.removeChild(node);
    }
  }
});

/**
 * Sanitizes HTML content from CMS/API, ensuring it is spec-compliant and safe.
 * Runs isomorphically on both server and client.
 */
export function cleanCmsHtml(html) {
  if (!html) return "";
  try {
    // 1. Preprocess: merge duplicate styles
    const preprocessed = mergeDuplicateStyles(html);

    // 2. Sanitize with DOMPurify
    const sanitized = DOMPurify.sanitize(preprocessed, {
      ADD_TAGS: ['iframe', 'embed', 'object', 'style'],
      ADD_ATTR: ['target', 'rel', 'allow', 'allowfullscreen', 'frameborder', 'scrolling', 'loading', 'fetchpriority', 'decoding'],
      USE_PROFILES: { html: true }
    });

    // 3. Final string replacement check to remove lingering "Edit HTML" comments/elements
    return sanitized.replace(/<[^>]*>\s*Edit\s+HTML\s*<\/[^>]*>/gi, "");
  } catch (err) {
    console.error('[Sanitization Error]: Failed to sanitize HTML', err);
    return html; // Return original HTML as fallback if sanitization crashes
  }
}
