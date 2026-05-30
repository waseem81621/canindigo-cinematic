import { useRef, useState, useId } from "react";
import { motion } from "framer-motion";

/**
 * CardDeck — native port of the Framer Marketplace component at
 * https://framer.com/m/Card-component-container-YW2R.js
 *
 * The Framer original is a compiled Framer Sites component using
 * `useVariantState`, `LayoutGroup`, and a separate `CardComponent` from
 * another framerusercontent URL — none of which is portable. So this port
 * reproduces the *visible* behaviour from the marketplace preview, which
 * is the relevant part:
 *
 *   - N cards stacked horizontally with heavy overlap (~70-80% per step)
 *   - rightmost card fully visible; left cards peek out at their left edge
 *   - hover any card → that card slides UP (y: -28px) and raises z-index
 *   - other cards stay in place
 *   - spring transition matches the source: stiffness ~300, damping ~24
 *
 * Cards accept any React content as children. Each card is colored by its
 * `accentColor` prop (defaults to indigo brand).
 */

interface CardDeckCard {
  /** Optional id used for React keys. Falls back to index. */
  id?: string;
  /** Background color or gradient for the card. Falls back to indigo. */
  accentColor?: string;
  /** Content rendered inside the card. */
  content: React.ReactNode;
}

interface CardDeckProps {
  cards: CardDeckCard[];
  /** Width of each card, px. Default 240. */
  cardWidth?: number;
  /** Height of each card, px. Default 340. */
  cardHeight?: number;
  /** Fraction of cardWidth that each next card is offset by (0..1). 0.18 = each
   *  card peeks 18% of its width from behind the previous. Default 0.18. */
  step?: number;
  /** How much the hovered card lifts vertically, px. Default 28. */
  hoverLift?: number;
  /** Radius on each card corner, px. Default 18. */
  borderRadius?: number;
  className?: string;
}

export function CardDeck({
  cards,
  cardWidth = 240,
  cardHeight = 340,
  step = 0.18,
  hoverLift = 28,
  borderRadius = 18,
  className = "",
}: CardDeckProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const groupId = useId();
  // Anti-flicker: when the cursor leaves a card we defer the reset by a few
  // ms. If the cursor immediately enters another card, the new index simply
  // replaces the old one and no transitional "null" state ever renders.
  // This prevents the cursor-crosses-overlap → both cards rapidly toggle bug.
  const leaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleEnter = (i: number) => {
    if (leaveTimer.current) {
      clearTimeout(leaveTimer.current);
      leaveTimer.current = null;
    }
    setHoveredIndex(i);
  };

  const handleLeave = () => {
    // 80ms is enough for the browser to fire mouseenter on the next card if
    // the cursor is actively crossing one. If it doesn't, the card lowers.
    if (leaveTimer.current) clearTimeout(leaveTimer.current);
    leaveTimer.current = setTimeout(() => {
      setHoveredIndex(null);
      leaveTimer.current = null;
    }, 80);
  };

  // Total horizontal footprint = cardWidth + (N - 1) * cardWidth * step
  const stepPx = cardWidth * step;
  const totalWidth = cardWidth + stepPx * (cards.length - 1);

  return (
    <div
      className={`relative mx-auto ${className}`}
      style={{
        width: totalWidth,
        height: cardHeight + hoverLift + 20,
      }}
    >
      {cards.map((card, i) => {
        const isHovered = hoveredIndex === i;
        const left = i * stepPx;
        const bg =
          card.accentColor ||
          "linear-gradient(135deg, var(--color-indigo-deep) 0%, var(--color-indigo-mid) 60%, var(--color-indigo-light) 100%)";

        return (
          <motion.button
            key={card.id ?? `${groupId}-${i}`}
            type="button"
            onMouseEnter={() => handleEnter(i)}
            onMouseLeave={handleLeave}
            onFocus={() => handleEnter(i)}
            onBlur={handleLeave}
            aria-label={`Card ${i + 1}`}
            className="absolute top-2 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-mid focus-visible:ring-offset-4 focus-visible:ring-offset-bg"
            style={{
              left,
              width: cardWidth,
              height: cardHeight,
              borderRadius,
              // Inactive cards keep their order in z; hovered card jumps to top.
              zIndex: isHovered ? cards.length + 10 : i + 1,
            }}
            initial={false}
            animate={{ y: isHovered ? -hoverLift : 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 24 }}
          >
            <div
              className="relative w-full h-full overflow-hidden flex items-center justify-center"
              style={{
                borderRadius,
                background: bg,
                boxShadow: isHovered
                  ? "0 30px 60px -15px rgba(25,22,45,0.45)"
                  : "0 12px 30px -10px rgba(25,22,45,0.30)",
              }}
            >
              {card.content}
            </div>
          </motion.button>
        );
      })}
    </div>
  );
}
