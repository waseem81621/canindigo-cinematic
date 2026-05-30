import { motion } from "framer-motion";
import { Home } from "lucide-react";

/**
 * GlassyButton — native port of the Framer Marketplace "Glassy button"
 * component at https://framer.com/m/Glassy-button-wkgf.js
 *
 * Faithfully reproduces the pillowy, lightly-pressed look of the Framer
 * original: a soft 3D-ish button with a double-layered chrome gradient
 * (outer rim + inner face) and multi-layer drop shadows for elevation.
 *
 * The Framer source imports a "ClickSound" module that fires on press —
 * we omit that here. If you want the click sound back, we can add a
 * Web Audio call on tap, but most enterprise sites prefer silent buttons.
 *
 * States (matching the source):
 *   - default: full elevation, neutral gradient
 *   - hover:   inner face brightens at the centre, shadow softens
 *   - pressed: shadow compresses, icon dims to 0.8 opacity
 *   - disabled: flat grey with inset shadow, icon at 0.4 opacity
 */

interface GlassyButtonProps {
  /** Icon component (Lucide or any other React component with size/strokeWidth props). */
  icon?: React.ComponentType<{ size?: number; strokeWidth?: number; color?: string; className?: string }>;
  /** Stroke width for the icon. Default 1.5 (matches Framer source). */
  strokeWidth?: number;
  /** Icon color. Default black. */
  color?: string;
  /** Disabled state — flat grey with inset shadow, no hover/press response. */
  disabled?: boolean;
  /** Button size, px. Default 149×146 (matches Framer defaults). */
  size?: number;
  /** Click handler. */
  onClick?: () => void;
  /** Accessibility label — required since the button is icon-only. */
  "aria-label": string;
  className?: string;
}

// Verbose multi-layer drop-shadow stacks ported from the Framer source.
// Stacking many low-alpha shadows is how the soft "floating pillow" look
// is built — a single shadow can't replicate the ambient occlusion feel.
const elevationShadow = [
  "0.067px 1.008px 0.505px 0px rgba(0, 0, 0, 0)",
  "0.159px 2.389px 1.197px 0px rgba(0, 0, 0, 0)",
  "0.290px 4.357px 2.183px 0px rgba(0, 0, 0, 0.01)",
  "0.487px 7.319px 3.667px 0px rgba(0, 0, 0, 0.02)",
  "0.799px 12.025px 6.025px 0px rgba(0, 0, 0, 0.03)",
  "1.378px 20.726px 10.387px 0px rgba(0, 0, 0, 0.05)",
  "2.776px 41.731px 20.911px 0px rgba(0, 0, 0, 0.07)",
  "4px 60px 30.067px 0px rgba(0, 0, 0, 0.10)",
].join(", ");

const elevationShadowHover = [
  "0.067px 1.008px 0.505px 0px rgba(0, 0, 0, 0)",
  "0.159px 2.389px 1.197px 0px rgba(0, 0, 0, 0)",
  "0.290px 4.357px 2.183px 0px rgba(0, 0, 0, 0.01)",
  "0.487px 7.319px 3.667px 0px rgba(0, 0, 0, 0.01)",
  "0.799px 12.025px 6.025px 0px rgba(0, 0, 0, 0.02)",
  "1.378px 20.726px 10.387px 0px rgba(0, 0, 0, 0.04)",
  "2.776px 41.731px 20.911px 0px rgba(0, 0, 0, 0.05)",
  "4px 60px 30.067px 0px rgba(0, 0, 0, 0.07)",
].join(", ");

const pressedShadow = [
  "0.067px 1.008px 0.404px -0.375px rgba(0, 0, 0, 0.03)",
  "0.159px 2.389px 0.957px -0.75px rgba(0, 0, 0, 0.03)",
  "0.290px 4.357px 1.747px -1.125px rgba(0, 0, 0, 0.03)",
  "0.487px 7.319px 2.934px -1.5px rgba(0, 0, 0, 0.03)",
  "0.799px 12.025px 4.820px -1.875px rgba(0, 0, 0, 0.03)",
  "1.378px 20.726px 8.310px -2.25px rgba(0, 0, 0, 0.03)",
  "2.776px 41.731px 16.729px -2.625px rgba(0, 0, 0, 0.03)",
  "4px 60px 24.053px -3px rgba(0, 0, 0, 0.02)",
].join(", ");

const disabledShadow = [
  "inset 3px 3px 3px 0px rgba(0, 0, 0, 0.16)",
  "inset 0px 0px 1px 2px rgba(0, 0, 0, 0.08)",
  "inset 1px 1px 0px 0px rgba(0, 0, 0, 0.10)",
].join(", ");

export function GlassyButton({
  icon: Icon = Home,
  strokeWidth = 1.5,
  color = "rgb(0, 0, 0)",
  disabled = false,
  size = 149,
  onClick,
  "aria-label": ariaLabel,
  className = "",
}: GlassyButtonProps) {
  // The outer button has slightly different proportions than perfectly
  // square — the Framer defaults are 149 wide / 146 tall. Keep that ratio.
  const height = Math.round((size * 146) / 149);

  // Border radius scales with size: at the default 149×146, the outer
  // radius is 40 and the inner content radius is 37 (slightly tighter).
  const outerRadius = Math.round((size * 40) / 149);
  const innerRadius = Math.round((size * 37) / 149);

  // Icon size ~ 35% of the button width (Framer source has the icon
  // rendered at roughly that proportion within the inner face).
  const iconSize = Math.round(size * 0.36);
  const innerPadding = Math.round(size * 0.04); // tight inner gap so the rim ring is thin

  if (disabled) {
    return (
      <button
        type="button"
        disabled
        aria-label={ariaLabel}
        className={`relative inline-flex items-center justify-center cursor-not-allowed ${className}`}
        style={{
          width: size,
          height,
          borderRadius: outerRadius,
          background: "linear-gradient(180deg, rgb(207,207,207) 0%, rgb(207,207,207) 100%)",
          boxShadow: disabledShadow,
          border: "none",
          padding: innerPadding,
        }}
      >
        <div
          className="w-full h-full flex items-center justify-center"
          style={{
            borderRadius: innerRadius,
            background: "linear-gradient(150deg, rgb(208,208,208) 0%, rgb(204,204,204) 50.17%, rgb(200,200,200) 100%)",
            opacity: 0.6,
          }}
        >
          <Icon size={iconSize} strokeWidth={strokeWidth} color={color} className="opacity-40" />
        </div>
      </button>
    );
  }

  return (
    <motion.button
      type="button"
      onClick={onClick}
      aria-label={ariaLabel}
      initial={false}
      whileHover={{
        boxShadow: elevationShadowHover,
      }}
      whileTap={{
        boxShadow: pressedShadow,
      }}
      transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
      className={`relative inline-flex items-center justify-center cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-mid focus-visible:ring-offset-4 focus-visible:ring-offset-bg ${className}`}
      style={{
        width: size,
        height,
        borderRadius: outerRadius,
        // Outer rim — vertical chrome gradient creates the metallic 3D bevel
        background:
          "linear-gradient(180deg, rgb(255,255,255) 0%, rgb(201,201,201) 8.99%, rgb(161,161,161) 31.88%, rgb(117,117,117) 73%, rgb(255,255,255) 100%)",
        boxShadow: elevationShadow,
        border: "none",
        padding: innerPadding,
      }}
    >
      <motion.div
        className="w-full h-full flex items-center justify-center"
        style={{
          borderRadius: innerRadius,
          // Inner face — diagonal gradient gives the soft 3D pillow look
          background:
            "linear-gradient(150deg, rgb(208,208,208) 0%, rgb(204,204,204) 50.17%, rgb(200,200,200) 100%)",
        }}
        // Inner face brightens at the centre on hover (Framer source does
        // this by swapping the middle stop from 204 → 232 on hover).
        whileHover={{
          background:
            "linear-gradient(150deg, rgb(208,208,208) 0%, rgb(232,232,232) 50.17%, rgb(200,200,200) 100%)",
        }}
        transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
      >
        <motion.span
          initial={false}
          whileTap={{ opacity: 0.8 }}
          transition={{ duration: 0.1 }}
          className="inline-flex"
        >
          <Icon size={iconSize} strokeWidth={strokeWidth} color={color} />
        </motion.span>
      </motion.div>
    </motion.button>
  );
}
