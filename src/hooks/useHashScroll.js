import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Custom hook for smooth scrolling to hash-based sections
 * Handles:
 * - Route changes with hash
 * - Direct URL access with hash
 * - DOM rendering delays for lazy-loaded components
 * - Overflow container issues
 */
export const useHashScroll = (initialDelay = 150) => {
  const { pathname, hash } = useLocation();
  const lastHashRef = useRef(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Prevent scroll on initial render without hash
    if (!hash && lastHashRef.current === null) {
      lastHashRef.current = hash;
      return;
    }

    lastHashRef.current = hash;

    const scrollToHash = () => {
      if (!hash) {
        // No hash, scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }

      // Extract the id from hash (e.g., "#courses" → "courses")
      const elementId = hash.replace('#', '');
      
      if (!elementId) return;

      // Try to find element immediately, if not found try again after delay
      const tryScroll = (attempt = 0) => {
        const element = document.getElementById(elementId);

        if (element) {
          // Calculate offset accounting for fixed navbar
          const headerOffset = 80; // Approximate navbar height - adjust if needed
          const elementPosition = element.getBoundingClientRect().top + window.scrollY;
          const offsetPosition = Math.max(0, elementPosition - headerOffset);

          // Scroll smoothly to the element
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth',
          });

          // Add highlight effect to active section
          element.classList.add('scroll-target-active');
          setTimeout(() => {
            element.classList.remove('scroll-target-active');
          }, 2000);
        } else if (attempt < 3) {
          // Element not found yet, retry after delay (for lazy loading)
          setTimeout(() => tryScroll(attempt + 1), 200);
        }
      };

      tryScroll();
    };

    // Initial delay to ensure DOM is fully rendered
    const timer = setTimeout(scrollToHash, initialDelay);

    return () => clearTimeout(timer);
  }, [pathname, hash, initialDelay]);
};

