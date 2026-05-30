import { useState } from "react";
import { motion } from "framer-motion";
import { easeUI, durQuick } from "../utils/motion-tokens";

/**
 * FlowStack — native port of the Framer Marketplace "Fluid Card Stack"
 * component at https://framer.com/m/Fluid-Card-Stack-qBHE.js
 *
 * Behaviour faithful to the source's hover-driven variant transitions:
 *   - all panels closed: every panel is equal-width via `flex: 1 0 0`
 *   - hover any panel: that panel grows via `flex-grow` to fill remaining
 *     space; siblings collapse to a fixed 15% width
 *   - mouse leaves the container entirely → all panels return to equal width
 *   - closed panels show only icon (top) and title (bottom)
 *   - open panel shows icon, full title, description, and optional CTA
 *
 * Mobile fallback (<md): panels stack vertically equal-height with all
 * content always visible (no hover state on touch).
 */

export interface FlowStackPanel {
  /** Lucide icon component (or any React node) shown at top of each panel */
  icon: React.ReactNode;
  /** Panel title — visible in both closed and open states */
  title: string;
  /** Description shown only in the open (active) state */
  description: string;
  /** Optional CTA label. If provided + ctaHref given, renders a "Learn More" link */
  ctaLabel?: string;
  ctaHref?: string;
  ctaOnClick?: () => void;
  /** Accent color for the icon background. Defaults to indigo brand. */
  accent?: string;
}

interface FlowStackProps {
  panels: FlowStackPanel[];
  /** Height of the flow container, px. Default 480. */
  height?: number;
  /** Border radius on each panel, px. Default 16. */
  borderRadius?: number;
  className?: string;
}

export function FlowStack({
  panels,
  height = 480,
  borderRadius = 16,
  className = "",
}: FlowStackProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <>
      {/* DESKTOP: horizontal flow (md+) */}
      <div
        className={`hidden md:flex gap-3 w-full ${className}`}
        style={{ height }}
        onMouseLeave={() => setHoveredIndex(null)}
      >
        {panels.map((panel, i) => {
          const isOpen = hoveredIndex === i;
          const anyOpen = hoveredIndex !== null;
          const accent = panel.accent || "var(--color-indigo-mid)";

          return (
            <motion.div
              key={i}
              onMouseEnter={() => setHoveredIndex(i)}
              animate={{
                // When a panel is open: it gets flex-grow 5; siblings get 0.
                // When no panel is open: all panels get equal flex-grow 1.
                flexGrow: isOpen ? 5 : anyOpen ? 0 : 1,
                flexBasis: anyOpen && !isOpen ? "15%" : "0%",
              }}
              transition={{
                duration: durQuick,
                ease: easeUI,
              }}
              className="relative overflow-hidden cursor-pointer border border-border bg-bg-pure transition-colors duration-200"
              style={{
                borderRadius,
                minWidth: 0,
                borderColor: isOpen ? accent : undefined,
                boxShadow: isOpen
                  ? "0 20px 60px -20px rgba(89,64,184,0.25)"
                  : "0 4px 16px -8px rgba(25,22,45,0.08)",
              }}
            >
              {/* Soft accent glow in the bottom-right when open */}
              <motion.div
                className="absolute -bottom-32 -right-32 w-64 h-64 rounded-full pointer-events-none"
                style={{
                  background: `radial-gradient(circle, ${accent}25 0%, transparent 70%)`,
                  filter: "blur(40px)",
                }}
                initial={false}
                animate={{ opacity: isOpen ? 1 : 0 }}
                transition={{ duration: durQuick }}
              />

              <div className="relative h-full p-6 md:p-7 flex flex-col justify-between">
                {/* TOP: icon */}
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center transition-colors duration-300 shrink-0"
                  style={{
                    background: isOpen
                      ? `color-mix(in srgb, ${accent} 18%, transparent)`
                      : `color-mix(in srgb, ${accent} 10%, transparent)`,
                    color: accent,
                  }}
                >
                  {panel.icon}
                </div>

                {/* MIDDLE+BOTTOM block */}
                <div className="min-w-0">
                  {/* Open-state content fades in */}
                  <motion.div
                    initial={false}
                    animate={{ opacity: isOpen ? 1 : 0 }}
                    transition={{
                      duration: durQuick,
                      delay: isOpen ? 0.1 : 0,
                      ease: easeUI,
                    }}
                    className="mb-4"
                    style={{ pointerEvents: isOpen ? "auto" : "none" }}
                  >
                    <p
                      className="text-[14px] md:text-[15px] text-text-secondary leading-relaxed max-w-[440px] whitespace-nowrap-none"
                      style={{
                        // Description is hidden when panel is collapsed; revealed when open.
                        // We avoid `whitespace-nowrap` so it wraps naturally inside the panel.
                        display: isOpen ? "block" : "none",
                      }}
                    >
                      {panel.description}
                    </p>
                  </motion.div>

                  {/* Title — always visible. Closed state: title sits at bottom.
                      Open state: it sits above the description with a larger size. */}
                  <h3
                    className="text-text-primary font-bold tracking-tight leading-tight transition-all duration-300"
                    style={{
                      fontSize: isOpen ? "28px" : "20px",
                      marginBottom: isOpen ? "8px" : "0",
                    }}
                  >
                    {panel.title}
                  </h3>

                  {/* CTA — only visible when open */}
                  {panel.ctaLabel && isOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: durQuick, delay: 0.15, ease: easeUI }}
                      className="mt-5"
                    >
                      {panel.ctaHref ? (
                        <a
                          href={panel.ctaHref}
                          className="inline-flex items-center px-4 py-2 rounded-full text-[12px] font-semibold border border-border hover:border-indigo-mid hover:bg-indigo-mid/5 transition-colors"
                        >
                          {panel.ctaLabel}
                        </a>
                      ) : (
                        <button
                          type="button"
                          onClick={panel.ctaOnClick}
                          className="inline-flex items-center px-4 py-2 rounded-full text-[12px] font-semibold border border-border hover:border-indigo-mid hover:bg-indigo-mid/5 transition-colors"
                        >
                          {panel.ctaLabel}
                        </button>
                      )}
                    </motion.div>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* MOBILE: stacked vertical panels (<md), all content visible */}
      <div className={`md:hidden grid grid-cols-1 gap-3 ${className}`}>
        {panels.map((panel, i) => {
          const accent = panel.accent || "var(--color-indigo-mid)";
          return (
            <div
              key={i}
              className="relative overflow-hidden border border-border bg-bg-pure p-6"
              style={{ borderRadius }}
            >
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center mb-5"
                style={{
                  background: `color-mix(in srgb, ${accent} 12%, transparent)`,
                  color: accent,
                }}
              >
                {panel.icon}
              </div>
              <h3 className="text-2xl font-bold text-text-primary tracking-tight mb-2">
                {panel.title}
              </h3>
              <p className="text-[14px] text-text-secondary leading-relaxed mb-4">
                {panel.description}
              </p>
              {panel.ctaLabel && panel.ctaHref && (
                <a
                  href={panel.ctaHref}
                  className="inline-flex items-center px-4 py-2 rounded-full text-[12px] font-semibold border border-border"
                >
                  {panel.ctaLabel}
                </a>
              )}
            </div>
          );
        })}
      </div>
    </>
  );
}
