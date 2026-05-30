import { useId, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

/**
 * GradientFlowButton — native port of the Framer Marketplace
 * "GradientFlowButton" / "GravityButton" at
 * https://framer.com/m/GradientFlowButton-4o1R5s.js
 *
 * Visual structure (4 stacked layers, matching the Framer source):
 *   1. Glow halo  — blurred linear-gradient behind the whole button, pulses
 *                   between 0.6× and 1.0× opacity on a slow cycle
 *   2. Gradient border — animated linear-gradient with 400% background-size
 *                   that scrolls horizontally to create the "flow"
 *   3. Dark interior — semi-transparent dark with backdrop-filter:blur
 *   4. Subtle gradient overlay inside — slow shifting tint for liveliness
 *
 * Hover state: scale 1.03, halo opacity boosts to 0.9, gradient speed
 *              increases (we drop from 6s to 3s loop time).
 * Tap state:   scale 0.96 quick spring.
 *
 * 7 colour presets are supported (aurora is the default — pink → purple
 * → indigo, matching the reference screenshot). Each preset is a tuple
 * of [bg, gradient1, gradient2, gradient3, text]. `custom` lets you
 * pass any 5 colours via the `colors` prop.
 */

type Preset =
  | "aurora"
  | "sunset"
  | "ocean"
  | "neon"
  | "emerald"
  | "monochrome"
  | "indigo-brand"
  | "custom";

interface Theme {
  bg: string;
  g1: string;
  g2: string;
  g3: string;
  text: string;
}

const PRESETS: Record<Exclude<Preset, "custom">, Theme> = {
  aurora: {
    bg: "rgba(12, 8, 28, 0.92)",
    g1: "#ec4899", // pink
    g2: "#a855f7", // purple
    g3: "#6366f1", // indigo
    text: "#ffffff",
  },
  sunset: {
    bg: "rgba(28, 12, 8, 0.92)",
    g1: "#f59e0b",
    g2: "#ef4444",
    g3: "#ec4899",
    text: "#ffffff",
  },
  ocean: {
    bg: "rgba(8, 18, 28, 0.92)",
    g1: "#06b6d4",
    g2: "#3b82f6",
    g3: "#6366f1",
    text: "#ffffff",
  },
  neon: {
    bg: "rgba(10, 10, 20, 0.92)",
    g1: "#22d3ee",
    g2: "#a3e635",
    g3: "#facc15",
    text: "#ffffff",
  },
  emerald: {
    bg: "rgba(8, 24, 18, 0.92)",
    g1: "#10b981",
    g2: "#14b8a6",
    g3: "#06b6d4",
    text: "#ffffff",
  },
  monochrome: {
    bg: "rgba(16, 16, 20, 0.92)",
    g1: "#e5e7eb",
    g2: "#9ca3af",
    g3: "#4b5563",
    text: "#ffffff",
  },
  // On-brand preset that pairs with the rest of the CanIndigo site
  "indigo-brand": {
    bg: "rgba(25, 22, 45, 0.92)", // matches --color-text-primary
    g1: "#3C248C", // indigo-deep
    g2: "#5940B8", // indigo-mid
    g3: "#8A6DE8", // indigo-light
    text: "#ffffff",
  },
};

interface GradientFlowButtonProps {
  text?: string;
  /** When provided, the button renders as an <a>. Otherwise as a <button>. */
  href?: string;
  openInNewTab?: boolean;
  preset?: Preset;
  /** Custom colours used when `preset === "custom"`. */
  colors?: Theme;
  /** Lucide icon (or any React component with size + className props). */
  icon?: React.ComponentType<{ size?: number; className?: string }> | null;
  iconPosition?: "left" | "right";
  /** How fast the gradient flow loop is. Default "medium" (6s loop). */
  flowSpeed?: "slow" | "medium" | "fast";
  /** Glow intensity multiplier 0..1. Default 0.7. */
  glowIntensity?: number;
  onClick?: () => void;
  /** Extra outer-class for layout (margins, sizing). */
  className?: string;
  /** Sizing knobs that match the Framer source. */
  paddingX?: number;
  paddingY?: number;
  borderRadius?: number;
  fontSize?: number;
}

export function GradientFlowButton({
  text = "Get Started",
  href,
  openInNewTab = false,
  preset = "aurora",
  colors,
  icon: Icon = ArrowRight,
  iconPosition = "right",
  flowSpeed = "medium",
  glowIntensity = 0.7,
  onClick,
  className = "",
  paddingX = 28,
  paddingY = 14,
  borderRadius = 12,
  fontSize = 15,
}: GradientFlowButtonProps) {
  const [isHovered, setIsHovered] = useState(false);
  const uid = useId().replace(/[^a-zA-Z0-9_-]/g, "");

  const theme: Theme = preset === "custom" && colors ? colors : PRESETS[preset as Exclude<Preset, "custom">] ?? PRESETS.aurora;

  // Flow duration per speed setting. On hover we scale this DOWN by 50%
  // (faster animation) for liveliness — matches the Framer source.
  const baseDur = flowSpeed === "fast" ? 3 : flowSpeed === "slow" ? 8 : 6;
  const dur = isHovered ? baseDur * 0.5 : baseDur;

  // Border thickness: 2px gradient ring around the inner content.
  const borderWidth = 2;

  const content = (
    <>
      {/* Layer 1 — outermost glow halo (blurred copy of the gradient) */}
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-0 gfb-glow-${uid}`}
        style={{
          background: `linear-gradient(135deg, ${theme.g1}, ${theme.g2}, ${theme.g3})`,
          filter: "blur(18px)",
          borderRadius,
          // pulse loop is independent of the flow loop, longer cycle
          animation: `gfb-glow-${uid} ${dur * 1.5}s ease-in-out infinite`,
          opacity: isHovered ? glowIntensity * 1.3 : glowIntensity * 0.5,
          transition: "opacity 0.25s ease",
        }}
      />

      {/* Layer 2 — animated gradient border (the visible ring) */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `linear-gradient(90deg, ${theme.g1}, ${theme.g2}, ${theme.g3}, ${theme.g2}, ${theme.g1})`,
          backgroundSize: "400% 100%",
          borderRadius,
          animation: `gfb-flow-${uid} ${dur}s linear infinite`,
        }}
      />

      {/* Layer 3 — dark interior, sits ON TOP of the gradient leaving only a
          thin ring visible. backdrop-filter blurs whatever sits behind. */}
      <div
        aria-hidden="true"
        className="absolute pointer-events-none"
        style={{
          inset: borderWidth,
          background: theme.bg,
          borderRadius: Math.max(borderRadius - borderWidth, 0),
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
        }}
      />

      {/* Layer 4 — subtle moving gradient INSIDE the dark area, for life */}
      <div
        aria-hidden="true"
        className="absolute pointer-events-none"
        style={{
          inset: borderWidth,
          background: `linear-gradient(90deg, ${theme.g1}18, ${theme.g2}12, ${theme.g3}18, ${theme.g2}12, ${theme.g1}18)`,
          backgroundSize: "400% 100%",
          borderRadius: Math.max(borderRadius - borderWidth, 0),
          animation: `gfb-flow-${uid} ${dur * 1.2}s linear infinite`,
          opacity: isHovered ? 0.7 : 0.35,
          transition: "opacity 0.25s ease",
        }}
      />

      {/* Layer 5 — top highlight hairline */}
      <div
        aria-hidden="true"
        className="absolute pointer-events-none"
        style={{
          top: borderWidth,
          left: "10%",
          right: "10%",
          height: 1,
          background: `linear-gradient(90deg, transparent, rgba(255,255,255,${isHovered ? 0.3 : 0.12}), transparent)`,
          borderRadius: 999,
        }}
      />

      {/* Content — label + icon. Sits above all decorative layers. */}
      <span
        className="relative inline-flex items-center gap-2 font-semibold whitespace-nowrap"
        style={{
          color: theme.text,
          fontSize,
          paddingLeft: paddingX,
          paddingRight: paddingX,
          paddingTop: paddingY,
          paddingBottom: paddingY,
        }}
      >
        {Icon && iconPosition === "left" && (
          <motion.span
            initial={false}
            animate={{ x: isHovered ? -3 : 0, scale: isHovered ? 1.12 : 1 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            className="inline-flex"
          >
            <Icon size={fontSize + 1} />
          </motion.span>
        )}
        <motion.span
          initial={false}
          animate={{ y: isHovered ? -1 : 0 }}
          transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
        >
          {text}
        </motion.span>
        {Icon && iconPosition === "right" && (
          <motion.span
            initial={false}
            animate={{ x: isHovered ? 4 : 0, scale: isHovered ? 1.12 : 1 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            className="inline-flex"
          >
            <Icon size={fontSize + 1} />
          </motion.span>
        )}
      </span>

      {/* Component-scoped keyframes — uses useId-derived unique names so
          multiple GradientFlowButton instances on the same page don't
          collide. Defined in a <style> tag at the end of the JSX. */}
      <style>{`
        @keyframes gfb-flow-${uid} {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes gfb-glow-${uid} {
          0%, 100% { opacity: ${glowIntensity * 0.6}; transform: scale(1); }
          50% { opacity: ${glowIntensity}; transform: scale(1.05); }
        }
        @media (prefers-reduced-motion: reduce) {
          .gfb-glow-${uid} { animation: none !important; }
        }
      `}</style>
    </>
  );

  const sharedMotionProps = {
    initial: false,
    whileHover: { scale: 1.03 },
    whileTap: { scale: 0.96 },
    transition: { type: "spring" as const, stiffness: 400, damping: 25 },
    onHoverStart: () => setIsHovered(true),
    onHoverEnd: () => setIsHovered(false),
    onFocus: () => setIsHovered(true),
    onBlur: () => setIsHovered(false),
  };

  // Render as <a> when href is provided, otherwise <button>
  if (href) {
    return (
      <motion.a
        href={href}
        target={openInNewTab ? "_blank" : undefined}
        rel={openInNewTab ? "noopener noreferrer" : undefined}
        onClick={onClick}
        className={`relative inline-flex items-center justify-center cursor-pointer no-underline ${className}`}
        style={{ borderRadius }}
        {...sharedMotionProps}
      >
        {content}
      </motion.a>
    );
  }

  return (
    <motion.button
      type="button"
      onClick={onClick}
      className={`relative inline-flex items-center justify-center cursor-pointer ${className}`}
      style={{ borderRadius, border: "none", background: "transparent" }}
      {...sharedMotionProps}
    >
      {content}
    </motion.button>
  );
}
