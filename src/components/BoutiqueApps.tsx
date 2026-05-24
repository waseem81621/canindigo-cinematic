import { useState } from "react";
import { motion } from "framer-motion";
import {
  Users,
  Building2,
  ClipboardList,
  Zap,
  Truck,
  Receipt,
  ArrowUpRight,
  ExternalLink,
} from "lucide-react";
import { AnimatedSection, StaggerContainer, StaggerItem } from "./AnimatedSection";
import { TiltCard } from "./TiltCard";
import { boutiqueApps } from "../data/siteData";

const iconMap: Record<string, React.ComponentType<any>> = {
  Users,
  Building2,
  ClipboardList,
  Zap,
  Truck,
  Receipt,
};

function GlowingLine({ active }: { active: boolean }) {
  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none z-20 overflow-visible"
      preserveAspectRatio="none"
    >
      <defs>
        <filter id="lineGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="2.5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#D4AF37" stopOpacity="0.9" />
          <stop offset="50%" stopColor="#E8D5A3" stopOpacity="1" />
          <stop offset="100%" stopColor="#D4AF37" stopOpacity="0.9" />
        </linearGradient>
      </defs>
      <motion.path
        d="M 48 72 C 80 72, 100 90, 130 110 S 200 140, 280 160"
        stroke="url(#lineGrad)"
        strokeWidth="1.5"
        fill="none"
        filter="url(#lineGlow)"
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={
          active
            ? { pathLength: 1, opacity: 1 }
            : { pathLength: 0, opacity: 0 }
        }
        transition={{ duration: 0.7, ease: "easeInOut" }}
      />
      {active && (
        <motion.circle
          r="2.5"
          fill="#E8D5A3"
          filter="url(#lineGlow)"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 1, 0] }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
        >
          <animateMotion
            dur="0.7s"
            repeatCount="1"
            path="M 48 72 C 80 72, 100 90, 130 110 S 200 140, 280 160"
          />
        </motion.circle>
      )}
    </svg>
  );
}

function AppCard({ app }: { app: (typeof boutiqueApps)[0] }) {
  const [hovered, setHovered] = useState(false);
  const Icon = iconMap[app.icon];
  const isLarge = app.span === "large";
  const isWide = app.span === "wide";
  const isComingSoon = app.comingSoon === true;

  return (
    <TiltCard
      className={`group relative block rounded-2xl overflow-hidden transition-all duration-500
        ${isLarge ? "md:row-span-2" : ""}
        ${isWide ? "md:col-span-2" : ""}
      `}
      tiltAmount={6}
    >
      <a
        href={isComingSoon ? undefined : app.href}
        target={isComingSoon ? undefined : "_blank"}
        rel={isComingSoon ? undefined : "noopener noreferrer"}
        aria-disabled={isComingSoon || undefined}
        tabIndex={isComingSoon ? -1 : undefined}
        onClick={isComingSoon ? (e) => e.preventDefault() : undefined}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="block h-full"
      >
        <div
          className={`relative h-full min-h-[200px] md:min-h-[220px] p-6 md:p-8 flex flex-col justify-between
            bg-white/60 backdrop-blur-xl border border-white/40
            transition-all duration-500
            ${isComingSoon ? "" : "group-hover:bg-white/75 group-hover:border-white/60 group-hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.12)]"}`}
          style={{
            boxShadow: hovered && !isComingSoon
              ? `0 20px 60px -15px ${app.accent}20, inset 0 1px 0 rgba(255,255,255,0.5)`
              : "inset 0 1px 0 rgba(255,255,255,0.3)",
          }}
        >
          <div
            className="absolute -top-20 -right-20 w-40 h-40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-[60px]"
            style={{ backgroundColor: app.accent }}
          />

          <GlowingLine active={hovered} />

          <div className="relative z-10">
            <div className="flex items-start justify-between mb-4">
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-500
                  bg-text-primary/5 group-hover:shadow-lg"
                style={{
                  boxShadow: hovered ? `0 4px 20px ${app.accent}30` : "none",
                }}
              >
                {Icon && (
                  <Icon
                    size={20}
                    className="transition-colors duration-500"
                    style={{ color: hovered ? app.accent : "#6E6E73" }}
                    strokeWidth={1.5}
                  />
                )}
              </div>
              {!isComingSoon && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={
                    hovered
                      ? { opacity: 1, scale: 1 }
                      : { opacity: 0, scale: 0.8 }
                  }
                  transition={{ duration: 0.3 }}
                  className="w-8 h-8 rounded-full bg-text-primary/5 flex items-center justify-center"
                >
                  <ExternalLink size={14} className="text-text-muted" />
                </motion.div>
              )}
            </div>

            <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-text-muted mb-1.5">
              {app.subtitle}
            </p>
            <h3
              className={`font-bold text-text-primary tracking-tight transition-colors duration-500
                ${isLarge ? "text-2xl md:text-3xl" : "text-xl md:text-2xl"}
                group-hover:text-text-primary`}
            >
              {app.name}
            </h3>
          </div>

          <div className="relative z-10 mt-4">
            <p
              className={`text-text-secondary leading-relaxed mb-5 transition-all duration-500
                ${isLarge ? "text-[15px] max-w-[320px]" : "text-[14px]"}
                ${isWide ? "max-w-[500px]" : "max-w-[280px]"}`}
            >
              {app.description}
            </p>

            <div className="flex items-center gap-2">
              <span
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-[12px] font-semibold
                  border transition-all duration-500"
                style={{
                  borderColor: hovered && !isComingSoon ? app.accent : "#E5E5E7",
                  color: hovered && !isComingSoon ? app.accent : "#6E6E73",
                  backgroundColor:
                    hovered && !isComingSoon ? `${app.accent}08` : "transparent",
                }}
              >
                {isComingSoon ? (
                  "Coming Soon"
                ) : (
                  <>
                    View Live Demo
                    <ArrowUpRight
                      size={13}
                      className="transition-transform duration-300"
                      style={{
                        transform: hovered ? "translate(1px, -1px)" : "none",
                      }}
                    />
                  </>
                )}
              </span>
            </div>
          </div>

          <div
            className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
            style={{
              boxShadow: `inset 0 0 0 1px ${app.accent}30, 0 0 40px ${app.accent}10`,
            }}
          />
        </div>
      </a>
    </TiltCard>
  );
}

export function BoutiqueApps() {
  return (
    <section className="py-20 md:py-28 relative overflow-hidden">
      <div className="absolute inset-0 bg-bg" />
      <div
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, #1A1A1C 1px, transparent 0)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative z-10 max-w-[1280px] mx-auto px-6 md:px-12 lg:px-20">
        <AnimatedSection className="mb-12 md:mb-16">
          <p className="text-[11px] font-medium text-accent-gold uppercase tracking-[0.2em] mb-4">
            Product Suite
          </p>
          <h2 className="text-[32px] md:text-[42px] lg:text-[48px] font-semibold text-text-primary leading-[1.1] tracking-[-0.01em] max-w-[700px]">
            Boutique apps built for Omani enterprise.
          </h2>
          <p className="mt-5 text-[17px] text-text-secondary leading-relaxed max-w-[560px]">
            Six production-ready platforms. Each crafted for a specific
            operational need — deployed, maintained, and supported by our team.
          </p>
        </AnimatedSection>

        <StaggerContainer
          className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-5"
          staggerDelay={0.08}
        >
          <StaggerItem className="md:col-span-2 md:row-span-2">
            <AppCard app={boutiqueApps[0]} />
          </StaggerItem>
          <StaggerItem className="md:col-span-2">
            <AppCard app={boutiqueApps[1]} />
          </StaggerItem>
          <StaggerItem className="md:col-span-2">
            <AppCard app={boutiqueApps[2]} />
          </StaggerItem>
          <StaggerItem className="md:col-span-2">
            <AppCard app={boutiqueApps[3]} />
          </StaggerItem>
          <StaggerItem className="md:col-span-2">
            <AppCard app={boutiqueApps[4]} />
          </StaggerItem>
          <StaggerItem className="md:col-span-4">
            <AppCard app={boutiqueApps[5]} />
          </StaggerItem>
        </StaggerContainer>
      </div>
    </section>
  );
}
