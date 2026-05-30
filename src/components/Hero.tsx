import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { TextScramble } from "./TextScramble";
import { NodeNetwork } from "./NodeNetwork";
import { heroContent } from "../data/siteData";
import { easeEnter, durCalm, durCinematic } from "../utils/motion-tokens";

export function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-[100dvh] flex items-center pt-28 md:pt-32 pb-20 md:pb-24 overflow-hidden"
    >
      {/* Hero background video (Gemini-generated, text-free). Muted autoplay
          loop, full-bleed, even across the whole frame. A uniform cream veil
          at 35% (below) lifts the video lighter — that's the scrim — and the
          headline + subhead carry their own cream glow (text-shadow) for the
          legibility lift. */}
      <video
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        autoPlay
        muted
        loop
        playsInline
        poster="/images/hero-poster.jpg"
        aria-hidden="true"
      >
        <source src="/videos/hero-bg.mp4" type="video/mp4" />
      </video>

      {/* Uniform cream veil — lifts the whole video lighter by the same amount
          everywhere (no gradient, no asymmetry). Tune via opacity. */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "var(--color-bg)", opacity: 0.35 }}
      />

      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(var(--color-text-primary) 1px, transparent 1px), linear-gradient(90deg, var(--color-text-primary) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      {/* IT node-network: drifting constellation in the empty left area.
          Sits above the cream veil (z 0) and below the text content (z 10).
          Hidden on mobile — text fills that space there. */}
      <div
        className="absolute inset-y-0 left-0 w-1/2 pointer-events-none z-[5] hidden lg:block"
        aria-hidden="true"
      >
        <NodeNetwork className="w-full h-full" />
      </div>

      <motion.div
        style={{ y, opacity }}
        className="relative z-10 max-w-[1280px] mx-auto px-6 md:px-12 lg:px-20 w-full"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-end">
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: durCalm, ease: easeEnter }}
              className="mb-6"
            >
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-bg/70 backdrop-blur-md border border-text-primary/10">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-accent animate-pulse" />
                <TextScramble
                  text={heroContent.eyebrow}
                  className="text-[11px] font-semibold text-text-secondary uppercase tracking-[0.15em]"
                  trigger="mount"
                  duration={800}
                />
              </span>
            </motion.div>

            {/* Single semantic <h1> containing all three headline lines.
                Each line still slides up from below — preserved via per-line
                motion.spans inside an overflow-hidden wrapper. The last
                line gets the indigo accent color to emphasize the outcome. */}
            <h1
              className="text-[48px] sm:text-[64px] md:text-[72px] lg:text-[80px] font-bold leading-[1.1] tracking-[-0.03em] pb-[0.05em] break-words"
              style={{
                textShadow:
                  "0 2px 32px rgba(248,246,243,0.95), 0 0 16px rgba(248,246,243,0.9), 0 0 6px rgba(248,246,243,0.85)",
              }}
            >
              {heroContent.headline.map((line, i) => (
                <span key={i} className="block overflow-hidden">
                  <motion.span
                    initial={{ y: "100%" }}
                    animate={{ y: 0 }}
                    transition={{
                      duration: durCinematic,
                      delay: 0.2 + i * 0.15,
                      ease: easeEnter,
                    }}
                    className={`block ${
                      i === heroContent.headline.length - 1
                        ? "text-indigo-mid"
                        : "text-text-primary"
                    }`}
                  >
                    {line}
                  </motion.span>
                </span>
              ))}
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: durCalm, delay: 0.7, ease: easeEnter }}
              className="mt-8 md:mt-10 text-lg md:text-xl text-text-secondary max-w-[480px] leading-relaxed font-light"
              style={{
                textShadow:
                  "0 1px 18px rgba(248,246,243,0.95), 0 0 8px rgba(248,246,243,0.9)",
              }}
            >
              {heroContent.subheadline}
            </motion.p>

          </div>

        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: durCinematic }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2"
        >
          <span className="text-[10px] font-medium text-text-muted uppercase tracking-[0.2em]">
            Scroll
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-[1px] h-8 bg-gradient-to-b from-text-muted to-transparent"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
