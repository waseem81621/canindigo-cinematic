import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { MapPin, Award } from "lucide-react";
import { aboutContent } from "../data/siteData";

function CounterStat({
  value,
  label,
  delay,
}: {
  value: string;
  label: string;
  delay: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay }}
      className="text-center"
    >
      <p
        className="text-4xl md:text-5xl font-bold text-text-primary tracking-tight"
        style={{ fontVariantNumeric: "tabular-nums" }}
      >
        {value}
      </p>
      <p className="mt-2 text-[12px] text-text-muted uppercase tracking-[0.15em]">
        {label}
      </p>
    </motion.div>
  );
}

export function About() {
  const storyRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: storyRef,
    offset: ["start end", "end start"],
  });

  const storyY = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <section id="about" className="py-20 md:py-28">
      <div className="max-w-[1280px] mx-auto px-6 md:px-12 lg:px-20">
        {/* Stats bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 py-10 mb-14 md:mb-20 border-y border-border/30">
          {aboutContent.stats.map((stat, i) => (
            <CounterStat
              key={stat.label}
              value={stat.value}
              label={stat.label}
              delay={i * 0.1}
            />
          ))}
        </div>

        {/* Story */}
        <div
          ref={storyRef}
          className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-20 mb-20 md:mb-28"
        >
          <motion.div style={{ y: storyY }}>
            <div className="space-y-6">
              {aboutContent.paragraphs.map((para, i) => (
                <p key={i} className="text-[17px] text-text-secondary leading-[1.8]">
                  {para}
                </p>
              ))}
            </div>
          </motion.div>

          <div>
            <div className="bg-bg-pure rounded-2xl border border-border p-8 md:p-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded-lg bg-indigo-mid/10 flex items-center justify-center">
                  <MapPin size={16} className="text-indigo-mid" />
                </div>
                <span className="text-sm font-semibold text-text-primary">
                  Our Presence
                </span>
              </div>
              <div className="space-y-4">
                {aboutContent.locations.map((loc, i) => (
                  <div key={loc.city} className={i > 0 ? "border-t border-border/50 pt-4" : ""}>
                    <p className="text-[13px] font-medium text-text-primary">
                      {loc.city}
                    </p>
                    <p className="text-[13px] text-text-muted">{loc.detail}</p>
                  </div>
                ))}
              </div>

              <div className="mt-8 pt-6 border-t border-border/50">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded-lg bg-indigo-accent/10 flex items-center justify-center">
                    <Award size={16} className="text-indigo-accent" />
                  </div>
                  <span className="text-sm font-semibold text-text-primary">
                    Certifications & Partnerships
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {aboutContent.certifications.map((cert) => (
                    <span
                      key={cert}
                      className="px-3 py-1.5 text-[11px] font-medium text-text-secondary bg-bg rounded-full border border-border/60"
                    >
                      {cert}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
