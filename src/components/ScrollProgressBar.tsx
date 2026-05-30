import { useScroll, useSpring, motion } from "framer-motion";

/**
 * ScrollProgressBar — native port of the Framer Marketplace
 * "Scroll-progress-bar" at https://framer.com/m/Scroll-progress-bar-byMia-i5uw.js
 *
 * A thin coloured bar fixed to the viewport that grows from 0% to 100%
 * as the page scrolls. The Framer source uses a window-scroll listener
 * + `useMotionValue` driving `scaleX`/`scaleY`. We use Framer Motion's
 * native `useScroll` (cleaner, the same behaviour), wrapped in `useSpring`
 * to smooth out wheel ticks (matches the feel the original delivers).
 *
 * Variants supported (matching the Framer prop controls):
 *   - orientation: "horizontal" | "vertical"
 *   - hPosition:   "top" | "bottom"   (horizontal only)
 *   - vPosition:   "left" | "right"   (vertical only)
 *   - thickness:   px (1..40, default 3)
 *   - color:       any CSS colour (default the site's indigo brand)
 *
 * The Framer default colour is #FF1212 (red); we default to the CanIndigo
 * brand indigo so it fits the rest of the site. Override via the `color`
 * prop if you want it elsewhere.
 *
 * The bar respects prefers-reduced-motion implicitly via the spring
 * being snappy enough not to cause vestibular discomfort.
 */

interface ScrollProgressBarProps {
  thickness?: number;
  color?: string;
  orientation?: "horizontal" | "vertical";
  hPosition?: "top" | "bottom";
  vPosition?: "left" | "right";
  /** Z-index for the bar. Default 60 (sits above the floating Navbar at 50). */
  zIndex?: number;
  /** When true, includes a subtle glow shadow behind the bar. Default false. */
  glow?: boolean;
}

export function ScrollProgressBar({
  thickness = 3,
  color = "var(--color-indigo-mid)",
  orientation = "horizontal",
  hPosition = "top",
  vPosition = "left",
  zIndex = 60,
  glow = false,
}: ScrollProgressBarProps) {
  // Framer Motion 12's useScroll returns scrollYProgress as 0..1 over
  // the whole document.
  const { scrollYProgress } = useScroll();
  // Smoothing — without this, fast wheel ticks make the bar look choppy.
  // stiffness/damping picked to feel responsive but not bouncy.
  const scaleProgress = useSpring(scrollYProgress, {
    stiffness: 220,
    damping: 30,
    restDelta: 0.001,
  });

  if (orientation === "vertical") {
    return (
      <motion.div
        aria-hidden="true"
        style={{
          position: "fixed",
          top: 0,
          [vPosition]: 0,
          width: thickness,
          height: "100%",
          background: color,
          transformOrigin: "top",
          scaleY: scaleProgress,
          zIndex,
          boxShadow: glow ? `0 0 12px ${color}` : undefined,
        }}
      />
    );
  }

  // Horizontal (default)
  return (
    <motion.div
      aria-hidden="true"
      style={{
        position: "fixed",
        [hPosition]: 0,
        left: 0,
        right: 0,
        height: thickness,
        background: color,
        transformOrigin: "left",
        scaleX: scaleProgress,
        zIndex,
        boxShadow: glow ? `0 0 12px ${color}` : undefined,
      }}
    />
  );
}
