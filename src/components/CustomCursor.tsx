import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/**
 * CustomCursor — agency-grade cursor: a precise dot + a trailing ring in
 * mix-blend-difference (self-inverting on both the cream and dark acts).
 * Elements carrying [data-cursor="view|drag|..."] grow the ring into a
 * labelled indigo chip.
 *
 * Mouse-only (pointer: fine) and motion-safe; touch devices and
 * reduced-motion users never see it (and keep the native cursor).
 */
export function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [label, setLabel] = useState<string | null>(null);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 300, damping: 30, mass: 0.6 });
  const ringY = useSpring(y, { stiffness: 300, damping: 30, mass: 0.6 });

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const motionOK = !window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (!fine || !motionOK) return;

    setEnabled(true);
    document.documentElement.classList.add("custom-cursor-active");

    const onMove = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    const onOver = (e: PointerEvent) => {
      const target = (e.target as Element).closest?.("[data-cursor]");
      setLabel(target ? ((target as HTMLElement).dataset.cursor ?? null) : null);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerover", onOver, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerover", onOver);
      document.documentElement.classList.remove("custom-cursor-active");
    };
  }, [x, y]);

  if (!enabled) return null;

  return (
    <>
      {/* Dot — pixel-locked to the pointer. */}
      <motion.div
        aria-hidden="true"
        className="fixed top-0 left-0 z-[100] pointer-events-none w-2 h-2 -ml-1 -mt-1 rounded-full bg-white mix-blend-difference"
        style={{ x, y }}
      />
      {/* Ring — trails on a spring; grows into a labelled chip over
          [data-cursor] targets. */}
      <motion.div
        aria-hidden="true"
        className="fixed top-0 left-0 z-[100] pointer-events-none"
        style={{ x: ringX, y: ringY }}
      >
        <motion.div
          className={`-translate-x-1/2 -translate-y-1/2 rounded-full flex items-center justify-center ${
            label
              ? "bg-indigo-mid"
              : "border border-white mix-blend-difference"
          }`}
          animate={{
            width: label ? 74 : 36,
            height: label ? 74 : 36,
          }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
        >
          {label && (
            <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-white">
              {label}
            </span>
          )}
        </motion.div>
      </motion.div>
    </>
  );
}
