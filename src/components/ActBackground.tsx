import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const CREAM = "#F8F6F3"; // --color-bg
const DARK = "#15102A"; //  --color-bg-dark

/**
 * The page's color story — Act I (cream) → Act II (dark) → Act III (cream).
 *
 * A fixed full-viewport layer that sits behind all homepage content and
 * scrubs its background color as the visitor crosses `[data-act-boundary]`
 * marker elements rendered by HomePage. Markers declare their destination
 * (`data-act-boundary="dark" | "light"`) and may override the scrub window
 * with `data-act-start` / `data-act-end` (ScrollTrigger position strings).
 *
 * Also the SINGLE WRITER of `html[data-theme]`, which fixed chrome (navbar,
 * progress bar) uses to flip its palette at each boundary's midpoint.
 * Nothing else may touch that attribute — one writer, no fights.
 *
 * Mounted inside HomePage (not App) so its lifecycle is tied to the route
 * that owns the markers. Reduced motion: no scrubbing — `.act-dark` sections
 * paint their own opaque background via the media query in index.css.
 */
export function ActBackground() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      const markers = gsap.utils.toArray<HTMLElement>("[data-act-boundary]");
      let from = CREAM;

      markers.forEach((marker) => {
        const to = marker.dataset.actBoundary === "dark" ? DARK : CREAM;
        gsap.fromTo(
          el,
          { backgroundColor: from },
          {
            backgroundColor: to,
            ease: "none",
            // Without this, the later boundary's `from` state would paint
            // immediately on load and stomp the earlier one.
            immediateRender: false,
            scrollTrigger: {
              trigger: marker,
              start: marker.dataset.actStart ?? "top bottom",
              end: marker.dataset.actEnd ?? "top 30%",
              scrub: true,
              onUpdate: (self) => {
                const pastMidpoint = self.progress > 0.5;
                document.documentElement.dataset.theme =
                  (to === DARK) === pastMidpoint ? "dark" : "light";
              },
            },
          }
        );
        from = to;
      });
    });

    return () => {
      ctx.revert();
      delete document.documentElement.dataset.theme;
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: -1, backgroundColor: CREAM }}
    />
  );
}
