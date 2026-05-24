import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { MagneticButton } from "./MagneticButton";
import { GlassButton } from "./GlassButton";
import { TextScramble } from "./TextScramble";
import { heroContent } from "../data/siteData";

export function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const scrollToContact = () => {
    const el = document.querySelector("#contact");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToServices = () => {
    const el = document.querySelector("#services");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      ref={containerRef}
      className="relative min-h-[100dvh] flex items-end pt-32 md:pt-40 pb-16 md:pb-28 overflow-hidden"
    >
      {/* Subtle indigo gradient glow behind the headline — 12% opacity */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: "20%",
          left: "0",
          width: "70%",
          height: "60%",
          background: "var(--gradient-brand)",
          opacity: 0.12,
          filter: "blur(120px)",
        }}
      />
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(var(--color-text-primary) 1px, transparent 1px), linear-gradient(90deg, var(--color-text-primary) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      <motion.div
        style={{ y, opacity }}
        className="relative z-10 max-w-[1280px] mx-auto px-6 md:px-12 lg:px-20 w-full"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-end">
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] as const }}
              className="mb-6"
            >
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-text-primary/[0.04] border border-text-primary/10">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-accent animate-pulse" />
                <TextScramble
                  text={heroContent.eyebrow}
                  className="text-[11px] font-semibold text-text-secondary uppercase tracking-[0.15em]"
                  trigger="mount"
                  duration={800}
                />
              </span>
            </motion.div>

            {heroContent.headline.map((line, i) => (
              <div key={i} className="overflow-hidden">
                <motion.h1
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  transition={{
                    duration: 1,
                    delay: 0.2 + i * 0.15,
                    ease: [0.25, 0.1, 0.25, 1] as const,
                  }}
                  className="text-[48px] sm:text-[64px] md:text-[72px] lg:text-[80px] font-bold leading-[1.1] tracking-[-0.03em] pb-[0.05em] break-words"
                >
                  {i === heroContent.headline.length - 1 ? (
                    <span className="text-indigo-mid">{line}</span>
                  ) : (
                    <span className="text-text-primary">{line}</span>
                  )}
                </motion.h1>
              </div>
            ))}

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7, ease: [0.25, 0.1, 0.25, 1] as const }}
              className="mt-8 md:mt-10 text-lg md:text-xl text-text-secondary max-w-[480px] leading-relaxed font-light"
            >
              {heroContent.subheadline}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9, ease: [0.25, 0.1, 0.25, 1] as const }}
              className="mt-10 md:mt-12 flex flex-wrap items-center gap-4"
            >
              <MagneticButton>
                <GlassButton
                  onClick={scrollToContact}
                  variant="primary"
                  size="lg"
                  icon={<ArrowRight size={16} />}
                >
                  {heroContent.ctaPrimary}
                </GlassButton>
              </MagneticButton>
              <MagneticButton>
                <GlassButton
                  onClick={scrollToServices}
                  variant="ghost"
                  size="lg"
                >
                  {heroContent.ctaSecondary}
                </GlassButton>
              </MagneticButton>
            </motion.div>
          </div>

        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
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
