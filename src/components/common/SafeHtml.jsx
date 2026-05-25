import React, { Component, useMemo } from 'react';
import { cleanCmsHtml } from '../../lib/sanitize';

/**
 * A standard Error Boundary component to prevent rendering errors
 * inside dangerouslySetInnerHTML from crashing the entire application.
 */
export class SafeHtmlErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('[SafeHtmlErrorBoundary caught rendering error]:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // Return fallback content (e.g. standard content without styling, or a user-friendly message)
      return (
        <div className="p-4 border border-red-200 bg-red-50 text-red-800 rounded">
          <p className="font-semibold text-sm">Failed to render some content. Displaying plain text fallback:</p>
          <pre className="mt-2 text-xs overflow-auto max-h-40 whitespace-pre-wrap">
            {this.props.fallbackText || 'An error occurred while loading this section.'}
          </pre>
        </div>
      );
    }

    return this.props.children;
  }
}

/**
 * SafeHtml component for rendering CMS and API-provided HTML.
 * Merges duplicate styles, removes contenteditable/CMS chrome, and ensures safe rendering.
 * Suppresses hydration warnings to ensure rendering stability between server/prerender/client.
 */
export default function SafeHtml({ html, className = "", as = "div", ...props }) {
  const sanitizedHtml = useMemo(() => cleanCmsHtml(html), [html]);
  const ComponentTag = as;

  if (!sanitizedHtml) return null;

  return (
    <SafeHtmlErrorBoundary fallbackText={html}>
      <ComponentTag
        className={`safe-html-content ${className}`}
        dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
        suppressHydrationWarning={true}
        {...props}
      />
    </SafeHtmlErrorBoundary>
  );
}
