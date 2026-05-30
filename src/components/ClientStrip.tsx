import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { partners } from "../data/siteData";
import { easeEnter, durCalm } from "../utils/motion-tokens";

/**
 * 2026-05-27: Rebuilt as a static "Trusted Technology Partners" section.
 *
 * Previously this was a scrolling marquee of duplicated client logos under
 * the hero. That treatment now lives in the hero trust bar itself
 * (`<HeroTrustBar />` after the CTAs), so duplicating it here was
 * redundant and noisy.
 *
 * This new version is a calm partner-row treatment: heading on top, then
 * a centered horizontal row of partner logos separated by thin vertical
 * dividers — visually similar to the "Trusted Technology Partners" pattern
 * the user referenced, but on the cream site background (not dark) so it
 * fits the surrounding sections.
 *
 * The logos render in the brand's grayscale-on-rest / color-on-hover
 * treatment used elsewhere in the site.
 */
export function ClientStrip() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      className="py-16 md:py-24 border-y border-border/40"
    >
      <div className="max-w-[1280px] mx-auto px-6 md:px-12 lg:px-20">
        {/* Heading — eyebrow only, no subhead. The 3 logos beneath carry the
            visual weight. */}
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
          transition={{ duration: durCalm, ease: easeEnter }}
          className="text-[11px] font-semibold text-indigo-mid uppercase tracking-[0.25em] text-center mb-10 md:mb-14"
        >
          Trusted Technology Partners
        </motion.p>

        {/* Partner logos — equal-width cells separated by thin dividers */}
        <div className="grid grid-cols-3 gap-0 border-t border-b border-border/50">
          {partners.map((partner, i) => (
            <motion.div
              key={partner.name}
              initial={{ opacity: 0, y: 8 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
              transition={{
                duration: durCalm,
                delay: 0.15 + i * 0.08,
                ease: easeEnter,
              }}
              className={`flex items-center justify-center py-10 md:py-14 px-6 ${
                i < partners.length - 1 ? "border-r border-border/50" : ""
              }`}
            >
              <img
                src={partner.logo}
                alt={partner.name}
                className="h-10 md:h-12 w-auto object-contain grayscale opacity-55 hover:grayscale-0 hover:opacity-100 transition-all duration-500"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
