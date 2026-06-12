import { useState, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { X, ArrowUpRight } from "lucide-react";
import { StaggerContainer, StaggerItem } from "./AnimatedSection";
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
            className="text-lg md:text-xl text-text-primary font-medium mb-6"
          >
            {study.title}
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.45 }}
            className="text-[15px] md:text-base text-text-secondary leading-[1.7]"
          >
            {study.description}
          </motion.p>
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
    // Transparent over ActBackground — sits inside the dark act.
    <section id="case-studies" className="py-20 md:py-28">
      <div className="max-w-[1280px] mx-auto px-6 md:px-12 lg:px-20">
        <div className="mb-12 md:mb-16">
          <h2 className="text-[32px] md:text-[42px] lg:text-[48px] font-semibold text-text-primary leading-[1.1] tracking-[-0.01em] max-w-[600px]">
            Proof without desperation.
          </h2>
        </div>

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
