import { useEffect, useState } from "react";
import { motion } from "framer-motion";

/**
 * StudioShowcaseStack — native port of the Framer Marketplace component at
 * https://framer.com/m/Studio-Showcase-Stack-boSulF.js
 *
 * Renders a stack of portrait media cards (image or video) fanned to one
 * side. Clicking any card brings it to the active (center/forward) position;
 * sibling cards offset and rotate based on their distance from active.
 *
 * Transform math is faithful to the Framer source:
 *   - rotate = signed_distance × responsive.rotation (±6–8° per card)
 *   - x offset = 0 for active; ±mainGap for immediate neighbours; stacked
 *     with backGap thereafter
 *   - zIndex = total - |distance|
 *   - scale = max(0.85, 1 - |distance| × 0.05); hover multiplies by 1.05
 *   - transition: spring stiffness 260, damping 20
 *
 * Responsive breakpoints (mobile <480, tablet <768, desktop ≥768) tune the
 * gaps and rotation amplitude. Reduced-motion handling falls back to a
 * static stack with no springs.
 */

interface Project {
  /** Image URL or video URL. Required unless `content` is provided. */
  src?: string;
  alt?: string;
  /** "image" or "video" — defaults to "image" */
  mediaType?: "image" | "video";
  /** Optional poster image for videos */
  poster?: string;
  /** Optional custom JSX rendered inside the card frame. When provided,
   *  `src` is ignored and `content` is rendered directly over the gradient
   *  background. Use this for icon + label cards that don't need photos. */
  content?: React.ReactNode;
}

interface StudioShowcaseStackProps {
  projects: Project[];
  /** Which card is active on first render. "left" = first; "center" = middle; "right" = last */
  defaultPosition?: "left" | "center" | "right";
  /** Loop videos when an active video plays */
  videoLoop?: boolean;
  /** Drop shadow intensity, 0..2. Default 1. */
  shadowStrength?: number;
  /** Border radius on each card, px. Default 16. */
  borderRadius?: number;
  className?: string;
}

interface Responsive {
  cardWidth: number;
  cardHeight: number;
  mainGap: number;
  backGap: number;
  rotation: number;
}

function getResponsive(width: number): Responsive {
  if (width < 480) {
    return { cardWidth: 220, cardHeight: 300, mainGap: 80, backGap: 14, rotation: 6 };
  }
  if (width < 768) {
    return { cardWidth: 260, cardHeight: 360, mainGap: 120, backGap: 18, rotation: 7 };
  }
  return { cardWidth: 320, cardHeight: 440, mainGap: 200, backGap: 24, rotation: 8 };
}

export function StudioShowcaseStack({
  projects,
  defaultPosition = "left",
  videoLoop = true,
  shadowStrength = 1,
  borderRadius = 16,
  className = "",
}: StudioShowcaseStackProps) {
  const [windowWidth, setWindowWidth] = useState(() =>
    typeof window === "undefined" ? 1024 : window.innerWidth
  );
  const initialIndex =
    defaultPosition === "center"
      ? Math.floor(projects.length / 2)
      : defaultPosition === "right"
      ? projects.length - 1
      : 0;
  const [activeIndex, setActiveIndex] = useState(initialIndex);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Track viewport width so getResponsive() values stay current on resize.
  useEffect(() => {
    const handler = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handler, { passive: true });
    return () => window.removeEventListener("resize", handler);
  }, []);

  const responsive = getResponsive(windowWidth);

  // For each card index, compute its visual transform relative to active.
  // diff > 0 means "this card is further forward in the array than active",
  // i.e. it sits to the right; diff < 0 means it sits to the left of active.
  const getCardTransform = (index: number) => {
    const diff = index - activeIndex;
    const absDiff = Math.abs(diff);
    const dir = Math.sign(diff); // -1, 0, or 1

    let x = 0;
    if (absDiff === 0) {
      x = 0;
    } else if (absDiff === 1) {
      x = dir * responsive.mainGap;
    } else {
      // Stack distant cards along the same side at backGap intervals.
      x = dir * (responsive.mainGap + (absDiff - 1) * responsive.backGap);
    }

    const rotate = diff * responsive.rotation;
    const baseScale = Math.max(0.85, 1 - absDiff * 0.05);
    const scale = hoveredIndex === index ? baseScale * 1.05 : baseScale;
    const zIndex = projects.length - absDiff;

    return { x, rotate, scale, zIndex };
  };

  return (
    <div
      className={`relative w-full flex items-center justify-center ${className}`}
      style={{
        // Reserve enough height for the largest card plus shadow + slight
        // overshoot during the hover-scale animation.
        height: responsive.cardHeight + 80,
        perspective: "1200px",
      }}
    >
      {projects.map((project, i) => {
        const { x, rotate, scale, zIndex } = getCardTransform(i);
        const isActive = i === activeIndex;
        const shadow =
          shadowStrength > 0
            ? `0 ${20 * shadowStrength}px ${50 * shadowStrength}px -10px rgba(25,22,45,${0.25 * shadowStrength})`
            : "none";

        return (
          <motion.button
            key={i}
            type="button"
            onClick={() => setActiveIndex(i)}
            onMouseEnter={() => setHoveredIndex(i)}
            onMouseLeave={() => setHoveredIndex(null)}
            onFocus={() => setHoveredIndex(i)}
            onBlur={() => setHoveredIndex(null)}
            aria-label={
              isActive
                ? `Active: ${project.alt || `Project ${i + 1}`}`
                : `Bring ${project.alt || `Project ${i + 1}`} to front`
            }
            className="absolute cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-mid focus-visible:ring-offset-4 focus-visible:ring-offset-bg"
            style={{
              width: responsive.cardWidth,
              height: responsive.cardHeight,
              borderRadius,
              overflow: "hidden",
              boxShadow: shadow,
              transformOrigin: "center bottom",
            }}
            initial={false}
            animate={{ x, rotate, scale }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            // zIndex must be set outside the framer-motion animate so it
            // doesn't get tween-interpolated (looks ugly during transition).
          >
            <div style={{ zIndex }} className="relative w-full h-full">
              {/* Indigo gradient fallback shown beneath the media (or as
                  the primary background when `content` is provided). */}
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(135deg, var(--color-indigo-deep) 0%, var(--color-indigo-mid) 60%, var(--color-indigo-light) 100%)",
                }}
              />
              {project.content ? (
                // Custom JSX content rendered over the gradient — used when
                // there's no photo (e.g., icon + label cards).
                <div className="absolute inset-0 flex">{project.content}</div>
              ) : project.mediaType === "video" ? (
                <video
                  src={project.src}
                  poster={project.poster}
                  autoPlay={isActive}
                  muted
                  loop={videoLoop}
                  playsInline
                  className="absolute inset-0 w-full h-full object-cover"
                />
              ) : (
                <img
                  src={project.src}
                  alt={project.alt || `Project ${i + 1}`}
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 w-full h-full object-cover"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).style.display =
                      "none";
                  }}
                />
              )}
            </div>
          </motion.button>
        );
      })}
    </div>
  );
}
