import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

/**
 * DrawerModal — native port of the Framer Marketplace "Drawer-Modal"
 * (a.k.a. "ProductCard") at https://framer.com/m/Drawer-Modal-4yet.js
 *
 * Visual pattern (from the source + reference video):
 *   - Compact state: a rounded card showing a background image with a
 *     single label (title) in a corner, fading-out gradient overlay at
 *     the bottom for legibility. Hover lifts the image slightly (1.04).
 *   - Click → modal expands FROM the card's current viewport position
 *     to centered, showing the same image at the top and rich content
 *     (modalHeading + modalDescription paragraphs) below.
 *   - Close X at top-right; backdrop click also dismisses.
 *   - Escape key dismisses; body scroll locks while open.
 *
 * Animation matches the Framer source's signature easing:
 *   initial: { scale: cardWidth/600, x: cardX-vw/2, y: cardY-vh/2, opacity: 0 }
 *   animate: { scale: 1, x: 0, y: 0, opacity: 1 }
 *   transition: { duration: 0.4, ease: [0.32, 0.72, 0, 1] }
 *
 * Renders as a self-contained card; pass an array via children/loop to
 * make a grid of these.
 */

interface DrawerModalProps {
  image: { src: string; alt?: string };
  /** Short label visible on the compact card. */
  title: string;
  /** Heading shown inside the expanded modal. */
  modalHeading: string;
  /** Body text shown inside the expanded modal. Supports newline-separated
   *  paragraphs (each line becomes its own <p>). */
  modalDescription: string;
  /** Compact-card border radius, px. Default 32. */
  borderRadius?: number;
  /** Card aspect ratio. Default "3/4" (portrait). */
  aspectRatio?: string;
  /** Where the title sits on the compact card. */
  textPosition?: "bottom-left" | "bottom-center" | "top-left" | "top-center";
  /** Text color on the compact card. Default white. */
  cardTextColor?: string;
  /** Modal body text color. Default near-black. */
  modalTextColor?: string;
  /** Modal background color behind the body text. Default cream. */
  modalBackgroundColor?: string;
  /** Backdrop overlay color. Default semi-dark. */
  modalOverlayColor?: string;
  /** Show fading overlay at the bottom of the compact card for label legibility. Default true. */
  showOverlay?: boolean;
  className?: string;
}

const textPositionStyles: Record<NonNullable<DrawerModalProps["textPosition"]>, string> = {
  "bottom-left": "left-6 right-6 bottom-6 text-left",
  "bottom-center": "left-6 right-6 bottom-6 text-center",
  "top-left": "left-6 right-6 top-6 text-left",
  "top-center": "left-6 right-6 top-6 text-center",
};

export function DrawerModal({
  image,
  title,
  modalHeading,
  modalDescription,
  borderRadius = 32,
  aspectRatio = "3/4",
  textPosition = "bottom-left",
  cardTextColor = "#FFFFFF",
  modalTextColor = "#1D1D1F",
  modalBackgroundColor = "#F5EDE4",
  modalOverlayColor = "rgba(0, 0, 0, 0.6)",
  showOverlay = true,
  className = "",
}: DrawerModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [cardRect, setCardRect] = useState({ x: 0, y: 0, width: 0, height: 0 });
  const [viewport, setViewport] = useState({ w: 0, h: 0 });
  const cardRef = useRef<HTMLButtonElement>(null);

  // When opening, capture the card's current viewport-rect so the modal
  // animation can FLIP-scale from where the card actually sits.
  const open = () => {
    if (cardRef.current) {
      const r = cardRef.current.getBoundingClientRect();
      setCardRect({ x: r.left + r.width / 2, y: r.top + r.height / 2, width: r.width, height: r.height });
      setViewport({ w: window.innerWidth, h: window.innerHeight });
    }
    setIsOpen(true);
  };

  // Close on Escape + body scroll lock while open
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setIsOpen(false); };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [isOpen]);

  // Paragraphs: newline-separated → array
  const paragraphs = modalDescription.split(/\n\s*\n|\n/).map(p => p.trim()).filter(Boolean);

  // Where the card's centre sits, expressed as offset from viewport centre.
  // Drives the modal's initial transform so it animates FROM the card.
  const initialX = cardRect.x - viewport.w / 2;
  const initialY = cardRect.y - viewport.h / 2;
  // The compact card is typically ~280-400px; the modal target width is 600.
  // Scale-from-card ratio = card width / target width.
  const initialScale = cardRect.width / 600;

  return (
    <>
      {/* Compact card */}
      <motion.button
        ref={cardRef}
        type="button"
        onClick={open}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onFocus={() => setIsHovered(true)}
        onBlur={() => setIsHovered(false)}
        aria-label={`Open: ${title}`}
        className={`relative overflow-hidden cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-mid focus-visible:ring-offset-4 focus-visible:ring-offset-bg ${className}`}
        style={{
          aspectRatio,
          borderRadius,
        }}
      >
        {/* Image */}
        <motion.img
          src={image.src}
          alt={image.alt || title}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 w-full h-full object-cover"
          animate={{ scale: isHovered ? 1.04 : 1 }}
          transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).style.display = "none";
          }}
        />

        {/* Gradient overlay for label legibility */}
        {showOverlay && (
          <div
            className="absolute inset-x-0 bottom-0 pointer-events-none"
            style={{
              height: "50%",
              background:
                "linear-gradient(to top, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.25) 50%, transparent 100%)",
            }}
          />
        )}

        {/* Title label */}
        <h3
          className={`absolute font-semibold text-base md:text-lg tracking-tight ${textPositionStyles[textPosition]}`}
          style={{ color: cardTextColor }}
        >
          {title}
        </h3>
      </motion.button>

      {/* Modal (portal-less; rendered as sibling, sits z-50 over everything) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
            style={{ backgroundColor: modalOverlayColor }}
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{
                scale: initialScale || 0.6,
                x: initialX,
                y: initialY,
                opacity: 0,
              }}
              animate={{ scale: 1, x: 0, y: 0, opacity: 1 }}
              exit={{
                scale: initialScale || 0.6,
                x: initialX,
                y: initialY,
                opacity: 0,
              }}
              transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-[600px] max-h-[88vh] overflow-y-auto shadow-[0_40px_120px_-20px_rgba(0,0,0,0.45)]"
              style={{
                borderRadius,
                background: modalBackgroundColor,
              }}
            >
              {/* Image at the top */}
              <div
                className="relative w-full overflow-hidden"
                style={{
                  aspectRatio: "4/3",
                  borderTopLeftRadius: borderRadius,
                  borderTopRightRadius: borderRadius,
                }}
              >
                <img
                  src={image.src}
                  alt={image.alt || title}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                {/* Soft fade at the bottom so the body content reads cleanly */}
                <div
                  className="absolute inset-x-0 bottom-0 h-1/3 pointer-events-none"
                  style={{
                    background: `linear-gradient(to top, ${modalBackgroundColor} 0%, transparent 100%)`,
                  }}
                />
              </div>

              {/* Close button */}
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                aria-label="Close"
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/30 backdrop-blur-md hover:bg-black/45 text-white flex items-center justify-center transition-colors z-10"
              >
                <X size={18} />
              </button>

              {/* Body */}
              <div className="p-8 md:p-10" style={{ color: modalTextColor }}>
                <motion.h3
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                  className="text-2xl md:text-[28px] font-semibold tracking-tight mb-5 leading-tight"
                >
                  {modalHeading}
                </motion.h3>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.3 }}
                  className="space-y-4"
                >
                  {paragraphs.map((p, i) => (
                    <p key={i} className="text-[14px] md:text-[15px] leading-relaxed opacity-85">
                      {p}
                    </p>
                  ))}
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
