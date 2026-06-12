import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { CaseStudyCard, CaseStudyModal } from "./CaseStudies";
import { StatCounter } from "./StatCounter";
import { LineReveal } from "./TextReveal";
import { caseStudies, proofContent } from "../data/siteData";

/**
 * ProofChapter — Act II's closing scene. Sticky-editorial, deliberately
 * un-pinned (two case studies are too thin for a card-stack pin; CSS sticky
 * gives the engineered feel with zero jank risk): the left column holds —
 * heading + rolling counters — while the case cards scroll past on the
 * right, ending on a "your operation next" CTA card.
 */
export function ProofChapter() {
  const [selectedStudy, setSelectedStudy] = useState<
    (typeof caseStudies)[0] | null
  >(null);

  return (
    <section id="case-studies" className="py-20 md:py-28">
      <div className="max-w-[1280px] mx-auto px-6 md:px-12 lg:px-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Sticky rail — heading + the numbers that hold while proof
              scrolls past. */}
          <div className="lg:col-span-5 lg:sticky lg:top-32 self-start">
            <LineReveal direction="up">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-text-muted mb-3">
                {proofContent.eyebrow}
              </p>
              <h2 className="font-display text-[34px] md:text-[42px] xl:text-[48px] font-semibold text-text-primary leading-[1.08] tracking-[-0.01em]">
                {proofContent.heading}
              </h2>
              <p className="mt-4 text-[15px] md:text-[16px] text-text-secondary leading-relaxed max-w-[400px]">
                {proofContent.sub}
              </p>
            </LineReveal>

            <div className="mt-10 space-y-7">
              {proofContent.stats.map((stat) => (
                <div
                  key={stat.label}
                  className="border-l-2 border-indigo-mid/50 pl-5"
                >
                  <StatCounter
                    value={stat.value}
                    suffix={stat.suffix ?? ""}
                    className="font-display text-[40px] md:text-[48px] font-bold text-text-primary leading-none"
                  />
                  <p className="mt-1.5 text-[13px] text-text-muted">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Proof feed — case cards + the handoff CTA. */}
          <div className="lg:col-span-7 flex flex-col gap-8 md:gap-10">
            {caseStudies.map((study) => (
              <CaseStudyCard
                key={study.client}
                study={study}
                onClick={() => setSelectedStudy(study)}
              />
            ))}

            <a
              href={proofContent.cta.href}
              className="group relative block rounded-2xl border border-border bg-bg-pure p-8 md:p-10 overflow-hidden hover:border-indigo-mid/50 transition-colors duration-300"
            >
              <div className="flex items-center justify-between gap-6">
                <div>
                  <h3 className="font-display text-[26px] md:text-[32px] font-bold text-text-primary tracking-tight mb-1.5">
                    {proofContent.cta.title}
                  </h3>
                  <p className="text-[14px] text-text-secondary">
                    {proofContent.cta.sub}
                  </p>
                </div>
                <div className="w-12 h-12 shrink-0 rounded-full bg-indigo-mid/15 flex items-center justify-center transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
                  <ArrowUpRight size={20} className="text-indigo-light" />
                </div>
              </div>
              <div
                className="absolute bottom-0 right-0 w-40 h-40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background:
                    "radial-gradient(circle at bottom right, rgba(138,109,232,0.18) 0%, transparent 70%)",
                }}
              />
            </a>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {selectedStudy && (
          <CaseStudyModal
            study={selectedStudy}
            onClose={() => setSelectedStudy(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
