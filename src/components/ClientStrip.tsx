import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { partners } from "../data/siteData";

export function ClientStrip() {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  const duplicated = [...partners, ...partners, ...partners, ...partners];

  return (
    <motion.section
      ref={containerRef}
      style={{ opacity }}
      className="py-14 md:py-20 border-y border-border/30 overflow-hidden"
    >
      <div className="max-w-[1280px] mx-auto px-6 md:px-12 lg:px-20 mb-8">
        <p className="text-[11px] font-medium text-text-muted uppercase tracking-[0.2em] text-center">
          Trusted by Oman&apos;s leading organizations
        </p>
      </div>

      <div className="overflow-hidden py-3">
        <motion.div
          className="flex items-center gap-16 md:gap-24 whitespace-nowrap"
          animate={shouldReduceMotion ? undefined : { x: ["0%", "-25%"] }}
          transition={{
            x: { duration: 40, repeat: Infinity, ease: "linear" },
          }}
        >
          {duplicated.map((partner, i) => (
            <img
              key={`${partner.name}-${i}`}
              src={partner.logo}
              alt={partner.name}
              className="h-10 md:h-12 w-auto shrink-0 object-contain grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-500"
            />
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}
