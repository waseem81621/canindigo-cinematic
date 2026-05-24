import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Route-change scroll behavior:
 *   - With a hash (`/#contact`, `/interiors#section`), smooth-scroll to
 *     that element after a short delay so route content has time to mount.
 *   - Otherwise, reset scroll position to the top.
 *
 * Re-fires on every navigation (`location.key`) so clicking the same
 * navbar link twice scrolls again, not just on first click.
 */
export function ScrollToTop() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const el = document.querySelector(location.hash);
      if (el) {
        const t = setTimeout(() => {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 120);
        return () => clearTimeout(t);
      }
      return;
    }
    window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
  }, [location.key]);

  return null;
}
