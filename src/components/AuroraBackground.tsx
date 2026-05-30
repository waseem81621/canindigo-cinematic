/**
 * Two large soft-blurred indigo blobs drifting slowly across the
 * background — gives the hero visual presence without requiring
 * photography or video. Pure CSS animation, ~3KB inline SVG-free
 * implementation. Respects prefers-reduced-motion (no drift).
 *
 * Drop-in replacement for the static gradient glow that lived
 * inline in Hero.tsx pre-Phase-2.
 */
export function AuroraBackground() {
  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 pointer-events-none overflow-hidden"
    >
      {/* Blob 1 — drifts top-left to bottom-right slowly */}
      <div
        className="absolute aurora-blob-1"
        style={{
          top: "10%",
          left: "5%",
          width: "55%",
          height: "70%",
          background:
            "radial-gradient(circle at center, var(--color-indigo-mid) 0%, transparent 65%)",
          opacity: 0.18,
          filter: "blur(80px)",
          willChange: "transform",
        }}
      />
      {/* Blob 2 — drifts bottom-right to top-left (counter-direction) */}
      <div
        className="absolute aurora-blob-2"
        style={{
          bottom: "5%",
          right: "10%",
          width: "45%",
          height: "60%",
          background:
            "radial-gradient(circle at center, var(--color-indigo-deep) 0%, transparent 70%)",
          opacity: 0.14,
          filter: "blur(100px)",
          willChange: "transform",
        }}
      />
    </div>
  );
}
