import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ChapterNumeral } from "./ChapterNumeral";
import { ACT_BG_ID, ACT_COLORS, setActTheme } from "./ActBackground";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const KICKER = "Beneath every operation, an engine room.";

/**
 * TheDescent — the Act I → Act II transition scene. The page pins for
 * +=150% while the visitor "submerges": the fixed act layer scrubs cream →
 * deep indigo, a hollow Roman numeral II swells out of the dark, and the
 * kicker line rises word-by-word. The navbar flips to its dark skin at the
 * 35% point.
 *
 * Owns its act boundary on desktop (drives the #act-bg layer inside its own
 * pinned timeline — perfect sync). The internal data-act-owned marker hands
 * the same scrub to ActBackground below lg, where nothing pins.
 */
export function TheDescent() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(
        "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
        () => {
          const bg = document.getElementById(ACT_BG_ID);

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top top",
              end: "+=150%",
              pin: true,
              scrub: true,
              anticipatePin: 1,
              onUpdate: (self) =>
                setActTheme(self.progress > 0.35 ? "dark" : "light"),
            },
          });

          if (bg) {
            tl.to(
              bg,
              { backgroundColor: ACT_COLORS.dark, ease: "none", duration: 0.6 },
              0
            );
          }

          tl.fromTo(
            ".descent-numeral",
            { scale: 0.8, autoAlpha: 0 },
            { scale: 1, autoAlpha: 1, ease: "none", duration: 0.65 },
            0.05
          )
            .fromTo(
              ".descent-act-label",
              { autoAlpha: 0, y: 16 },
              { autoAlpha: 1, y: 0, ease: "none", duration: 0.2 },
              0.42
            )
            .fromTo(
              ".descent-word",
              { yPercent: 120 },
              { yPercent: 0, ease: "none", duration: 0.35, stagger: 0.05 },
              0.5
            )
            // Slow push past full scale while the visitor reads — the scene
            // keeps breathing instead of freezing.
            .to(
              ".descent-numeral",
              { scale: 1.07, ease: "none", duration: 0.5 },
              0.65
            );
        }
      );
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="act-dark relative min-h-[70vh] lg:min-h-[100dvh] overflow-hidden flex items-center justify-center"
      aria-label="Act two — the engine room"
    >
      {/* Below lg this marker hands the cream→dark scrub to ActBackground. */}
      <div
        data-act-boundary="dark"
        data-act-owned="true"
        data-act-start="top 75%"
        data-act-end="bottom 80%"
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
      />

      <ChapterNumeral
        value="II"
        className="descent-numeral absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        size="min(38vw, 64vh)"
        stroke="rgba(242, 237, 230, 0.16)"
      />

      <div className="relative z-10 text-center px-6">
        <p className="descent-act-label text-[11px] font-semibold uppercase tracking-[0.3em] text-text-muted mb-6">
          Act II — The Engine Room
        </p>
        <p className="font-display text-[28px] sm:text-[36px] md:text-[44px] lg:text-[52px] leading-[1.15] tracking-[-0.01em] text-text-primary max-w-[820px] mx-auto">
          {KICKER.split(" ").map((word, i) => (
            <span key={i} className="inline-block overflow-hidden align-bottom">
              <span className="descent-word inline-block mr-[0.26em]">
                {word}
              </span>
            </span>
          ))}
        </p>
      </div>
    </section>
  );
}
