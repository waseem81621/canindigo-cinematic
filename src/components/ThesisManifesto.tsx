import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { thesisContent, partners } from "../data/siteData";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/**
 * ThesisManifesto — Act I, Scene 2. The first pinned scene of the site.
 *
 * The page locks for +=120% of scroll while the company thesis ignites
 * word-by-word: every word starts as a faint ghost (opacity 0.12) and
 * scrubs to full ink as the visitor's scroll passes it — they "read with
 * the scroll wheel". The final beat fades in the proof coda: the three
 * partner logos, folding the retired ClientStrip into the thesis as its
 * evidence.
 *
 * Desktop + no-reduced-motion only (gsap.matchMedia). Below lg / under
 * reduced motion the section renders un-pinned and fully legible — words
 * default to opacity 1 in the DOM; GSAP only dims them inside the
 * matchMedia context.
 */
export function ThesisManifesto() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(
        "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
        () => {
          const words = gsap.utils.toArray<HTMLElement>(
            ".thesis-word",
            sectionRef.current
          );

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top top",
              end: "+=120%",
              pin: true,
              scrub: true,
              anticipatePin: 1,
            },
          });

          tl.fromTo(
            words,
            { opacity: 0.12 },
            { opacity: 1, ease: "none", duration: 0.6, stagger: 0.08 }
          ).fromTo(
            ".thesis-coda",
            { opacity: 0, y: 28 },
            { opacity: 1, y: 0, ease: "none", duration: 1.4 },
            ">-0.2"
          );
        }
      );
    },
    { scope: sectionRef }
  );

  const renderWords = (text: string, accent?: boolean) =>
    text
      .split(" ")
      .filter(Boolean)
      .map((word, wi) => (
        <span
          key={`${word}-${wi}`}
          className={`thesis-word inline-block mr-[0.28em] ${
            accent ? "text-indigo-mid" : ""
          }`}
        >
          {word}
        </span>
      ));

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[100dvh] flex items-center overflow-hidden"
      aria-label="Why CanIndigo"
    >
      <div className="max-w-[1280px] mx-auto px-6 md:px-12 lg:px-20 w-full py-24 md:py-28">
        <div className="flex items-center gap-2 mb-8 md:mb-10">
          <span className="block w-6 h-px bg-indigo-accent" />
          <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-text-muted">
            {thesisContent.eyebrow}
          </span>
        </div>

        <h2 className="font-display text-[32px] sm:text-[42px] md:text-[52px] lg:text-[58px] leading-[1.22] tracking-[-0.01em] text-text-primary max-w-[1100px]">
          {thesisContent.statement.map((seg, si) => (
            <span key={si}>{renderWords(seg.text, seg.accent)}</span>
          ))}
        </h2>

        <p className="font-display text-[32px] sm:text-[42px] md:text-[52px] lg:text-[58px] leading-[1.2] tracking-[-0.01em] text-indigo-mid mt-6 md:mt-8">
          {renderWords(thesisContent.punch)}
        </p>

        {/* Proof coda — the old ClientStrip, reborn as the thesis's evidence. */}
        <div className="thesis-coda mt-14 md:mt-16">
          <p className="text-[13px] md:text-[14px] text-text-muted mb-6">
            {thesisContent.coda}
          </p>
          <div className="flex items-center gap-8 md:gap-12 flex-wrap">
            {partners.map((p) => (
              <img
                key={p.name}
                src={p.logo}
                alt={p.name}
                loading="lazy"
                decoding="async"
                className="h-7 md:h-9 w-auto object-contain grayscale opacity-60"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
