import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const ACT_BG_ID = "act-bg";
export const ACT_COLORS = {
  cream: "#F8F6F3", // --color-bg
  dark: "#15102A", //  --color-bg-dark
} as const;

/** Flip the chrome theme. Writers: ActBackground (plain markers) and pinned
 *  boundary scenes like TheDescent (inside their own scrub timelines). */
export function setActTheme(theme: "light" | "dark") {
  document.documentElement.dataset.theme = theme;
}

/**
 * The page's color story — Act I (cream) → Act II (dark) → Act III (cream).
 *
 * A fixed full-viewport layer behind all homepage content. Boundaries are
 * `[data-act-boundary="dark"|"light"]` markers rendered by HomePage (or by
 * the boundary scenes themselves):
 *
 * - Plain markers: ActBackground scrubs the layer across the marker's
 *   viewport travel (`data-act-start`/`data-act-end` override the window)
 *   and flips `html[data-theme]` at the midpoint.
 * - `data-act-owned="true"` markers: a pinned scene (TheDescent) drives the
 *   layer inside its own pinned timeline on desktop — perfect sync with its
 *   choreography. ActBackground binds these markers only in the mobile
 *   context, where the scene doesn't pin.
 *
 * Reduced motion: nothing scrubs — `.act-dark` sections paint their own
 * opaque background via the media query in index.css.
 */
export function ActBackground() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const bindMarkers = (includeOwned: boolean) => {
      const markers = gsap.utils.toArray<HTMLElement>("[data-act-boundary]");
      let from: string = ACT_COLORS.cream;

      markers.forEach((marker) => {
        const to =
          marker.dataset.actBoundary === "dark"
            ? ACT_COLORS.dark
            : ACT_COLORS.cream;
        const tweenFrom = from;
        from = to; // chain continues across ALL markers, bound or not

        if (marker.dataset.actOwned === "true" && !includeOwned) return;

        gsap.fromTo(
          el,
          { backgroundColor: tweenFrom },
          {
            backgroundColor: to,
            ease: "none",
            // Without this, a later boundary's `from` would paint on load
            // and stomp the earlier one.
            immediateRender: false,
            scrollTrigger: {
              trigger: marker,
              start: marker.dataset.actStart ?? "top bottom",
              end: marker.dataset.actEnd ?? "top 30%",
              scrub: true,
              onUpdate: (self) => {
                const pastMidpoint = self.progress > 0.5;
                setActTheme(
                  (to === ACT_COLORS.dark) === pastMidpoint ? "dark" : "light"
                );
              },
            },
          }
        );
      });
    };

    const mm = gsap.matchMedia();
    // Desktop: pinned boundary scenes own their markers.
    mm.add("(min-width: 1024px)", () => bindMarkers(false));
    // Below lg: scenes don't pin, so ActBackground drives every boundary.
    mm.add("(max-width: 1023.98px)", () => bindMarkers(true));

    return () => {
      mm.revert();
      delete document.documentElement.dataset.theme;
    };
  }, []);

  return (
    <div
      id={ACT_BG_ID}
      ref={ref}
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: -1, backgroundColor: ACT_COLORS.cream }}
    />
  );
}
