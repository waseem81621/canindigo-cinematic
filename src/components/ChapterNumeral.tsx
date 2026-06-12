interface ChapterNumeralProps {
  value: string;
  className?: string;
  /** Stroke color — defaults to the light token at low alpha (dark acts). */
  stroke?: string;
  /** Font size clamp; sized in vw/vh so wide-short viewports don't clip. */
  size?: string;
}

/**
 * ChapterNumeral — oversized hollow display numeral for the cinematic
 * chapter scenes. Transparent fill + WebkitTextStroke outline; purely
 * decorative (aria-hidden) — the chapter's real label lives in its content.
 */
export function ChapterNumeral({
  value,
  className = "",
  stroke = "rgba(242, 237, 230, 0.2)",
  size = "min(30vw, 52vh)",
}: ChapterNumeralProps) {
  return (
    <span
      aria-hidden="true"
      className={`font-display font-bold leading-none select-none pointer-events-none ${className}`}
      style={{
        fontSize: size,
        color: "transparent",
        WebkitTextStroke: `1.5px ${stroke}`,
      }}
    >
      {value}
    </span>
  );
}
