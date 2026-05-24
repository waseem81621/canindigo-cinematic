import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Route-change scroll behavior:
 *   - With a hash (`/#contact`, `/interiors#hero`), scroll to that element
 *     after a short delay so the route content has time to mount.
 *   - Otherwise, reset scroll position to the top.
 *
 * The hash handler enables cross-route deep-links like the "Get a Quote"
 * CTA on /interiors and /automotive (added in Phase 6 / Phase 7) — these
 * point at /#contact and need to land on the homepage Contact section
 * without a full page reload.
 */
export function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const el = document.querySelector(hash);
      if (el) {
        const t = setTimeout(() => {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 120);
        return () => clearTimeout(t);
      }
      return;
    }
    window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
  }, [pathname, hash]);

  return null;
}
