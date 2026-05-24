import { useState, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { X, Quote, ArrowUpRight, TrendingUp } from "lucide-react";
import { AnimatedSection, StaggerContainer, StaggerItem } from "./AnimatedSection";
import { TiltCard } from "./TiltCard";
import { caseStudies } from "../data/siteData";

function CaseStudyModal({
  study,
  onClose,
}: {
  study: (typeof caseStudies)[0];
  onClose: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-text-primary/40 backdrop-blur-xl" />

      <motion.div
        initial={{ scale: 0.92, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.92, opacity: 0, y: 20 }}
        transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-[800px] max-h-[92vh] overflow-y-auto bg-bg-pure rounded-3xl border border-border shadow-2xl"
      >
        <div className="relative h-56 md:h-72 overflow-hidden rounded-t-3xl">
          <img
            src={study.image}
            alt={study.client}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-text-primary/80 via-text-primary/30 to-transparent" />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-bg-pure/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-bg-pure/40 transition-colors z-10"
          >
            <X size={18} />
          </button>
          <div className="absolute bottom-6 left-8 md:left-10 right-8 md:right-10">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-[11px] font-semibold text-white/60 uppercase tracking-[0.2em] mb-2"
            >
              {study.category}
            </motion.p>
            <motion.h3
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-3xl md:text-4xl font-bold text-white tracking-tight"
            >
              {study.client}
            </motion.h3>
          </div>
        </div>

        <div className="p-8 md:p-10">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.35 }}
            className="text-lg md:text-xl text-text-primary font-medium mb-8"
          >
            {study.title}
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {[
              { label: "Challenge", text: study.challenge },
              { label: "Solution", text: study.solution },
              { label: "Result", text: study.result },
            ].map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + i * 0.1 }}
                className="p-5 rounded-2xl bg-bg border border-border/60"
              >
                <p className="text-[10px] font-bold text-accent-gold uppercase tracking-[0.15em] mb-2">
                  {item.label}
                </p>
                <p className="text-[14px] text-text-secondary leading-relaxed">
                  {item.text}
                </p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.65 }}
            className="flex items-center gap-5 py-6 px-7 rounded-2xl border border-border/60 mb-8"
            style={{ backgroundColor: `${study.accentColor}08` }}
          >
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
              style={{ backgroundColor: `${study.accentColor}15` }}
            >
              <TrendingUp size={22} style={{ color: study.accentColor }} />
            </div>
            <div>
              <p className="text-[11px] font-medium text-text-muted uppercase tracking-[0.1em] mb-0.5">
                Key Metric
              </p>
              <p className="text-2xl font-bold text-text-primary">
                {study.metric}{" "}
                <span className="text-base font-normal text-text-secondary">
                  {study.metricLabel}
                </span>
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.75 }}
            className="flex gap-5 p-6 rounded-2xl bg-bg border border-border/40"
          >
            <Quote
              size={28}
              className="text-accent-gold/25 shrink-0 mt-1"
              strokeWidth={1.5}
            />
            <div>
              <p className="text-lg md:text-xl text-text-primary font-light italic leading-relaxed">
                &ldquo;{study.quote}&rdquo;
              </p>
              <p className="mt-4 text-[13px] font-semibold text-text-secondary">
                {study.quoteAuthor}
              </p>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function CaseStudyCard({
  study,
  onClick,
}: {
  study: (typeof caseStudies)[0];
  onClick: () => void;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLButtonElement>(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], [30, -30]);

  return (
    <TiltCard tiltAmount={5} className="w-full">
      <motion.button
        ref={cardRef}
        onClick={onClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="group relative w-full aspect-[16/10] rounded-2xl overflow-hidden text-left cursor-pointer"
        whileHover={{ scale: 1.015 }}
        transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <motion.div
          className="absolute inset-[-15%]"
          style={{ y: imageY }}
          animate={{ scale: isHovered ? 1.08 : 1 }}
          transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <img
            src={study.image}
            alt={study.client}
            className="w-full h-full object-cover"
          />
        </motion.div>

        <motion.div
          className="absolute inset-0"
          animate={{
            background: isHovered
              ? "linear-gradient(0deg, rgba(26,26,28,0.92) 0%, rgba(26,26,28,0.5) 50%, rgba(26,26,28,0.2) 100%)"
              : "linear-gradient(0deg, rgba(26,26,28,0.85) 0%, rgba(26,26,28,0.3) 45%, rgba(26,26,28,0.05) 100%)",
          }}
          transition={{ duration: 0.5 }}
        />

        <motion.div
          className="absolute top-0 left-0 right-0 h-[2px]"
          style={{ backgroundColor: study.accentColor }}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: isHovered ? 1 : 0 }}
          transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
        />

        <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <motion.span
              animate={{
                backgroundColor: isHovered
                  ? `${study.accentColor}25`
                  : "rgba(255,255,255,0.08)",
                color: isHovered ? study.accentColor : "rgba(255,255,255,0.5)",
              }}
              transition={{ duration: 0.3 }}
              className="px-3 py-1.5 rounded-full text-[10px] font-semibold uppercase tracking-[0.15em] backdrop-blur-sm border border-white/10"
            >
              {study.category}
            </motion.span>

            <motion.div
              animate={{
                opacity: isHovered ? 1 : 0,
                scale: isHovered ? 1 : 0.8,
                rotate: isHovered ? 0 : -45,
              }}
              transition={{ duration: 0.3 }}
              className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center"
            >
              <ArrowUpRight size={18} className="text-white" />
            </motion.div>
          </div>

          <div>
            <motion.p
              animate={{
                y: isHovered ? -4 : 0,
                opacity: isHovered ? 1 : 0.7,
              }}
              transition={{ duration: 0.4 }}
              className="text-[13px] md:text-[15px] text-white/80 leading-snug mb-2 max-w-[90%]"
            >
              {study.title}
            </motion.p>

            <motion.h3
              animate={{ y: isHovered ? -2 : 0 }}
              transition={{ duration: 0.4 }}
              className="text-2xl md:text-3xl font-bold text-white tracking-tight"
            >
              {study.client}
            </motion.h3>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{
                opacity: isHovered ? 1 : 0,
                y: isHovered ? 0 : 10,
              }}
              transition={{ duration: 0.35, delay: 0.05 }}
              className="mt-3 flex items-center gap-2"
            >
              <span
                className="text-xl font-bold"
                style={{ color: study.accentColor }}
              >
                {study.metric}
              </span>
              <span className="text-[12px] text-white/50">
                {study.metricLabel}
              </span>
            </motion.div>
          </div>
        </div>

        <motion.div
          className="absolute bottom-0 right-0 w-24 h-24 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: `radial-gradient(circle at bottom right, ${study.accentColor}20 0%, transparent 70%)`,
          }}
        />
      </motion.button>
    </TiltCard>
  );
}

export function CaseStudies() {
  const [selectedStudy, setSelectedStudy] = useState<
    (typeof caseStudies)[0] | null
  >(null);

  return (
    <section id="case-studies" className="py-20 md:py-28 bg-bg-pure">
      <div className="max-w-[1280px] mx-auto px-6 md:px-12 lg:px-20">
        <AnimatedSection className="mb-12 md:mb-16">
          <p className="text-[11px] font-medium text-accent-gold uppercase tracking-[0.2em] mb-4">
            Case Studies
          </p>
          <h2 className="text-[32px] md:text-[42px] lg:text-[48px] font-semibold text-text-primary leading-[1.1] tracking-[-0.01em] max-w-[600px]">
            Proof without desperation.
          </h2>
        </AnimatedSection>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
          {caseStudies.map((study) => (
            <StaggerItem key={study.client}>
              <CaseStudyCard
                study={study}
                onClick={() => setSelectedStudy(study)}
              />
            </StaggerItem>
          ))}
        </StaggerContainer>
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
