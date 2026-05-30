import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Folder } from "lucide-react";

/**
 * AKservices — native port of the Framer Marketplace "AKservices" section
 * at https://framer.com/m/AKservices-oJwgp8.js
 *
 * A 3-column services grid. Each card has:
 *   - icon at the top-left (defaults to a folder icon)
 *   - title
 *   - 2-column bullet list of tags (each with a small coloured dot)
 *   - image (or image slider) at the bottom of the card
 *
 * Section header has:
 *   - eyebrow badge (e.g. "SERVICES") with a small accent dot
 *   - large display heading (e.g. "What We Do.")
 *   - small description on the right
 *
 * Multi-image cards get an auto-swipeable image slider with dot indicators
 * below; the Framer source implements this with touch + drag events on
 * the image container. We use the same approach.
 *
 * All visual props (colours, gaps, paddings, font sizes) are exposed so
 * the section can be tuned to match the surrounding page style.
 */

export interface AKService {
  /** Path to an icon image OR a React node (e.g. a Lucide icon). When
   *  null, the default folder icon is used. */
  icon?: string | React.ReactNode | null;
  iconPosition?: "left" | "right";
  title: string;
  description?: string;
  /** Bullet-list tags rendered as pills inside the card. */
  tags?: string[];
  /** One or more image URLs. Multiple → renders as a swipeable slider. */
  images?: string[];
}

interface AKservicesProps {
  /** Eyebrow badge shown above the heading. */
  badgeLabel?: string;
  /** Show the eyebrow badge. */
  showBadge?: boolean;
  /** Color of the small dot in the badge. */
  badgeAccentColor?: string;
  /** Large display heading. */
  heading?: string;
  /** Short subheading text shown to the right of the heading. */
  subheading?: string;
  showSubheading?: boolean;
  /** Number of grid columns on desktop. Default 3. */
  columns?: 1 | 2 | 3;
  /** Padding inside the section, px. */
  paddingH?: number;
  paddingV?: number;
  /** Card background colour. */
  cardBg?: string;
  /** Card border radius, px. */
  cardRadius?: number;
  /** Tag pill background, text, and dot colours. */
  tagBg?: string;
  tagColor?: string;
  tagDotColor?: string;
  /** Section background colour. */
  sectionBg?: string;
  /** Heading + body colours. */
  headingColor?: string;
  subheadingColor?: string;
  /** The actual service cards. */
  services: AKService[];
  className?: string;
}

/**
 * Image slider sub-component. Single image → static. Multiple images →
 * swipeable carousel with dot indicators. Matches the touch/drag pattern
 * in the Framer source.
 */
function ImageSlider({ images, radius }: { images: string[]; radius: number }) {
  const [active, setActive] = useState(0);
  const startX = useRef(0);
  const startY = useRef(0);
  const dragging = useRef(false);

  // Reset when the image array changes (matches Framer behaviour)
  useEffect(() => {
    setActive(0);
  }, [images]);

  if (!images || images.length === 0) return null;

  if (images.length === 1) {
    return (
      <div className="relative w-full overflow-hidden" style={{ borderRadius: radius, aspectRatio: "4/3" }}>
        <img
          src={images[0]}
          alt=""
          className="w-full h-full object-cover"
          loading="lazy"
          decoding="async"
          onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
        />
      </div>
    );
  }

  const onTouchStart = (e: React.TouchEvent | React.MouseEvent) => {
    dragging.current = true;
    if ("touches" in e) {
      startX.current = e.touches[0].clientX;
      startY.current = e.touches[0].clientY;
    } else {
      startX.current = e.clientX;
      startY.current = e.clientY;
    }
  };

  const onTouchEnd = (e: React.TouchEvent | React.MouseEvent) => {
    if (!dragging.current) return;
    dragging.current = false;
    let endX: number, endY: number;
    if ("changedTouches" in e) {
      endX = e.changedTouches[0].clientX;
      endY = e.changedTouches[0].clientY;
    } else {
      endX = e.clientX;
      endY = e.clientY;
    }
    const dx = endX - startX.current;
    const dy = endY - startY.current;
    // Only react to mostly-horizontal swipes (>40px) to avoid catching
    // vertical scroll gestures.
    if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)) {
      if (dx < 0) setActive((i) => Math.min(images.length - 1, i + 1));
      else setActive((i) => Math.max(0, i - 1));
    }
  };

  return (
    <div className="space-y-3">
      <div
        className="relative w-full overflow-hidden cursor-grab active:cursor-grabbing select-none"
        style={{ borderRadius: radius, aspectRatio: "4/3" }}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        onMouseDown={onTouchStart}
        onMouseUp={onTouchEnd}
      >
        <motion.div
          className="flex w-full h-full"
          animate={{ x: `-${active * 100}%` }}
          transition={{ type: "spring", stiffness: 260, damping: 30 }}
        >
          {images.map((src, i) => (
            <img
              key={i}
              src={src}
              alt=""
              draggable={false}
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover shrink-0"
              style={{ flex: "0 0 100%" }}
              onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
            />
          ))}
        </motion.div>
      </div>
      <div className="flex justify-center gap-1.5">
        {images.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setActive(i)}
            aria-label={`Show image ${i + 1}`}
            className="h-1.5 rounded-full transition-all duration-300"
            style={{
              width: i === active ? 20 : 6,
              background: i === active ? "var(--color-text-primary)" : "rgba(0,0,0,0.2)",
            }}
          />
        ))}
      </div>
    </div>
  );
}

export function AKservices({
  badgeLabel = "SERVICES",
  showBadge = true,
  badgeAccentColor = "#22c55e",
  heading = "What We Do.",
  subheading = "We combine strategy, speed, and skill to deliver exceptional design — every time.",
  showSubheading = true,
  columns = 3,
  paddingH = 40,
  paddingV = 56,
  cardBg = "#ffffff",
  cardRadius = 20,
  tagBg = "#f2f2f2",
  tagColor = "#222222",
  tagDotColor = "#e5392a",
  sectionBg = "var(--color-bg)",
  headingColor = "var(--color-text-primary)",
  subheadingColor = "var(--color-text-muted)",
  services,
  className = "",
}: AKservicesProps) {
  // Clamp columns to a sane range to match the Framer source's behaviour
  const cols = Math.min(3, Math.max(1, columns));
  // On mobile we always stack to single column; on tablet we use 2; on desktop we use the configured value.
  const gridColsClass = {
    1: "grid-cols-1",
    2: "grid-cols-1 md:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
  }[cols];

  return (
    <section
      className={className}
      style={{
        background: sectionBg,
        paddingTop: paddingV * 2,
        paddingBottom: paddingV * 2,
        paddingLeft: paddingH,
        paddingRight: paddingH,
      }}
    >
      <div className="max-w-[1280px] mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12 md:mb-16">
          <div>
            {showBadge && (
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.4 }}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-border/60 mb-5"
                style={{ background: "var(--color-surface-light)" }}
              >
                <span
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ background: badgeAccentColor }}
                />
                <span
                  className="text-[11px] font-semibold uppercase tracking-[0.15em]"
                  style={{ color: headingColor }}
                >
                  {badgeLabel}
                </span>
              </motion.div>
            )}
            <motion.h2
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: 0.05 }}
              className="font-display text-[36px] md:text-[44px] lg:text-[52px] font-bold leading-[1.05] tracking-[-0.02em]"
              style={{ color: headingColor }}
            >
              {heading}
            </motion.h2>
          </div>
          {showSubheading && subheading && (
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-[14px] md:text-[15px] leading-relaxed max-w-[280px]"
              style={{ color: subheadingColor }}
            >
              {subheading}
            </motion.p>
          )}
        </div>

        {/* Card grid */}
        <div
          className={`grid ${gridColsClass}`}
          style={{ gap: 20, alignItems: "stretch" }}
        >
          {services.map((svc, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.45, delay: 0.1 + i * 0.07 }}
              className="flex flex-col p-6 md:p-7"
              style={{
                background: cardBg,
                borderRadius: cardRadius,
                border: "1px solid var(--color-border)",
              }}
            >
              {/* Icon row */}
              <div
                className="flex items-start mb-5"
                style={{
                  justifyContent: svc.iconPosition === "right" ? "flex-end" : "flex-start",
                }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{ background: tagBg }}
                >
                  {svc.icon === null || svc.icon === undefined ? (
                    <Folder size={22} strokeWidth={1.5} style={{ color: tagColor }} />
                  ) : typeof svc.icon === "string" ? (
                    <img src={svc.icon} alt="" className="w-6 h-6 object-contain" />
                  ) : (
                    svc.icon
                  )}
                </div>
              </div>

              {/* Title */}
              <h3
                className="text-xl md:text-2xl font-bold tracking-tight leading-tight mb-3"
                style={{ color: headingColor }}
              >
                {svc.title}
              </h3>

              {/* Description (optional) */}
              {svc.description && (
                <p
                  className="text-[13px] md:text-[14px] leading-relaxed mb-5"
                  style={{ color: subheadingColor }}
                >
                  {svc.description}
                </p>
              )}

              {/* Tag pills — 2-column layout */}
              {svc.tags && svc.tags.length > 0 && (
                <div className="grid grid-cols-2 gap-2 mb-6">
                  {svc.tags.map((tag, ti) => (
                    <div
                      key={ti}
                      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] md:text-[12px] font-medium"
                      style={{ background: tagBg, color: tagColor }}
                    >
                      <span
                        className="w-1.5 h-1.5 rounded-full shrink-0"
                        style={{ background: tagDotColor }}
                      />
                      <span className="truncate">{tag}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Image (or slider) — pushed to the bottom of the card */}
              {svc.images && svc.images.length > 0 && (
                <div className="mt-auto">
                  <ImageSlider images={svc.images} radius={Math.max(cardRadius - 6, 8)} />
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
