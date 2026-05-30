import { useRef, useState, useId } from "react";
import { motion, useInView } from "framer-motion";
import {
  easeEnter,
  easeUI,
  durInstant,
  durCalm,
} from "../utils/motion-tokens";

/**
 * CardDeckSpread — native React/Framer Motion port of the Framer Marketplace
 * pattern at https://framer.com/m/CardDeckSpread-i9eD.js (the marketplace
 * component depends on a `framer` package that only exists inside Framer's
 * runtime, so we reproduce the visual + interaction here using our own stack).
 *
 * Behaviour:
 *  - Desktop (md+): cards laid out absolutely along a horizontal axis with
 *    configurable overlap. Hovering or focusing a card lifts it (scale +
 *    z-index + shadow), blurs the others, and reveals a title overlay.
 *    Entrance animation triggers when the deck enters the viewport — each
 *    card animates from a stacked collapsed position out to its spread slot.
 *  - Mobile (<md): falls back to a horizontal scroll-snap track. Cards are
 *    70vw wide, snap one at a time, and the overlap/blur pattern is dropped
 *    because it doesn't translate to portrait viewports.
 *  - prefers-reduced-motion: entrance + hover scale disabled; cards render
 *    in their final positions as a static deck.
 */

interface Card {
  src: string;
  alt: string;
  title: string;
  subtitle?: string;
}

interface CardDeckSpreadProps {
  cards: Card[];
  cardWidth?: number;
  cardHeight?: number;
  overlap?: number;
  hoverScale?: number;
  blurIntensity?: number;
  className?: string;
}

export function CardDeckSpread({
  cards,
  cardWidth = 240,
  cardHeight = 340,
  overlap = 0.55,
  hoverScale = 1.08,
  blurIntensity = 2,
  className = "",
}: CardDeckSpreadProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-80px" });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const groupId = useId();

  // Horizontal step between adjacent cards. With overlap = 0.55, each card
  // sits cardWidth * (1 - 0.55) = 45% of cardWidth right of the previous one.
  const step = cardWidth * (1 - overlap);
  const totalWidth = cardWidth + step * (cards.length - 1);

  return (
    <div className={className}>
      {/* DESKTOP: spread deck */}
      <div
        ref={containerRef}
        className="hidden md:flex relative items-center justify-center"
        style={{
          // Reserve space for the spread, plus a little breathing room for
          // the hovered card's scaled-up footprint.
          height: cardHeight * hoverScale + 40,
        }}
      >
        <div
          className="relative"
          style={{ width: totalWidth, height: cardHeight }}
        >
          {cards.map((card, i) => {
            const isHovered = hoveredIndex === i;
            const someoneElseHovered =
              hoveredIndex !== null && hoveredIndex !== i;

            return (
              <motion.button
                key={`${groupId}-${i}`}
                type="button"
                aria-label={card.title}
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
                onFocus={() => setHoveredIndex(i)}
                onBlur={() => setHoveredIndex(null)}
                className="absolute top-0 rounded-2xl overflow-hidden cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-mid focus-visible:ring-offset-4 focus-visible:ring-offset-bg"
                style={{
                  width: cardWidth,
                  height: cardHeight,
                  left: i * step,
                }}
                // Initial: stacked + hidden. Animate to spread positions
                // when the container enters viewport.
                initial={{
                  x: -i * step,
                  opacity: 0,
                  scale: 0.92,
                }}
                animate={
                  isInView
                    ? { x: 0, opacity: 1, scale: 1 }
                    : { x: -i * step, opacity: 0, scale: 0.92 }
                }
                transition={{
                  duration: durCalm,
                  delay: i * 0.06,
                  ease: easeEnter,
                }}
              >
                <motion.div
                  className="relative w-full h-full"
                  animate={{
                    scale: isHovered ? hoverScale : 1,
                    filter: someoneElseHovered
                      ? `blur(${blurIntensity}px) brightness(0.85)`
                      : "blur(0px) brightness(1)",
                    zIndex: isHovered ? 30 : 10,
                  }}
                  transition={{ duration: durInstant, ease: easeUI }}
                  style={{
                    transformOrigin: "center bottom",
                    boxShadow: isHovered
                      ? "0 25px 60px -15px rgba(25,22,45,0.45), 0 0 0 2px var(--color-indigo-mid)"
                      : "0 10px 30px -10px rgba(25,22,45,0.18), 0 0 0 1px var(--color-border)",
                    borderRadius: 16,
                  }}
                >
                  {/* Card background — gradient placeholder + image overlay.
                      Gradient renders even when the image is still loading
                      or fails (Unsplash redirect can be slow). */}
                  <div
                    className="absolute inset-0 rounded-2xl"
                    style={{
                      background:
                        "linear-gradient(135deg, var(--color-indigo-deep) 0%, var(--color-indigo-mid) 60%, var(--color-indigo-light) 100%)",
                    }}
                  />
                  <img
                    src={card.src}
                    alt={card.alt}
                    loading="lazy"
                    decoding="async"
                    className="absolute inset-0 w-full h-full object-cover rounded-2xl"
                    onError={(e) => {
                      // If the image fails, hide it so the indigo gradient
                      // beneath shows through.
                      (e.currentTarget as HTMLImageElement).style.display =
                        "none";
                    }}
                  />

                  {/* Permanent dark gradient at the bottom for legibility of
                      the title overlay (visible even when not hovered, just
                      faint). */}
                  <div
                    className="absolute inset-x-0 bottom-0 h-2/5 rounded-b-2xl pointer-events-none"
                    style={{
                      background:
                        "linear-gradient(to top, rgba(25,22,45,0.85) 0%, rgba(25,22,45,0.4) 60%, transparent 100%)",
                    }}
                  />

                  {/* Title overlay — fades in on hover */}
                  <motion.div
                    className="absolute inset-x-0 bottom-0 p-4 md:p-5"
                    initial={false}
                    animate={{
                      opacity: isHovered ? 1 : 0,
                      y: isHovered ? 0 : 8,
                    }}
                    transition={{ duration: durInstant, ease: easeUI }}
                  >
                    <h3 className="text-white text-[15px] md:text-base font-bold tracking-tight leading-tight mb-1">
                      {card.title}
                    </h3>
                    {card.subtitle && (
                      <p className="text-white/80 text-[12px] leading-snug line-clamp-2">
                        {card.subtitle}
                      </p>
                    )}
                  </motion.div>
                </motion.div>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* MOBILE: horizontal scroll-snap fallback */}
      <div className="md:hidden">
        <div
          className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 -mx-6 px-6"
          style={{
            scrollPaddingLeft: "1.5rem",
          }}
        >
          {cards.map((card, i) => (
            <motion.div
              key={`${groupId}-mobile-${i}`}
              className="shrink-0 snap-start rounded-2xl overflow-hidden relative"
              style={{
                width: "70vw",
                height: cardHeight,
                maxWidth: cardWidth * 1.2,
                boxShadow:
                  "0 10px 30px -10px rgba(25,22,45,0.18), 0 0 0 1px var(--color-border)",
              }}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{
                duration: durCalm,
                delay: i * 0.04,
                ease: easeEnter,
              }}
            >
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(135deg, var(--color-indigo-deep) 0%, var(--color-indigo-mid) 60%, var(--color-indigo-light) 100%)",
                }}
              />
              <img
                src={card.src}
                alt={card.alt}
                loading="lazy"
                decoding="async"
                className="absolute inset-0 w-full h-full object-cover"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).style.display = "none";
                }}
              />
              <div
                className="absolute inset-x-0 bottom-0 h-2/5 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(to top, rgba(25,22,45,0.9) 0%, rgba(25,22,45,0.5) 60%, transparent 100%)",
                }}
              />
              <div className="absolute inset-x-0 bottom-0 p-4">
                <h3 className="text-white text-[15px] font-bold tracking-tight leading-tight mb-1">
                  {card.title}
                </h3>
                {card.subtitle && (
                  <p className="text-white/80 text-[12px] leading-snug line-clamp-2">
                    {card.subtitle}
                  </p>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
