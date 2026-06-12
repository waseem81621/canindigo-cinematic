import { useEffect, useRef } from "react";
import { useInView, animate } from "framer-motion";
import { easeEnter } from "../utils/motion-tokens";

interface StatCounterProps {
  /** Display value, e.g. "5", "OMR 380K+", "15–20", "3+". The LAST number
   *  in the string rolls up from 0; everything around it stays literal. */
  value: string;
  /** Extra literal text after the parsed value (e.g. "-year"). */
  suffix?: string;
  className?: string;
  duration?: number;
}

const VALUE_RE = /^(.*?)(\d+(?:\.\d+)?)([^\d]*)$/;

/**
 * StatCounter — rolling count-up that triggers once on viewport entry.
 * Parses mixed strings ("OMR 380K+") so callers keep human-readable data.
 * Renders the final value statically by default (no-JS, reduced motion,
 * never-in-view) and only animates when allowed.
 */
export function StatCounter({
  value,
  suffix = "",
  className = "",
  duration = 1.6,
}: StatCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  useEffect(() => {
    const el = ref.current;
    if (!el || !inView) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const match = value.match(VALUE_RE);
    if (!match) return;
    const [, prefix, num, tail] = match;
    const target = parseFloat(num);
    const decimals = num.includes(".") ? num.split(".")[1].length : 0;

    const controls = animate(0, target, {
      duration,
      ease: easeEnter,
      onUpdate: (v) => {
        el.textContent = `${prefix}${v.toFixed(decimals)}${tail}${suffix}`;
      },
    });
    return () => controls.stop();
  }, [inView, value, suffix, duration]);

  return (
    <span ref={ref} className={`tabular-nums ${className}`}>
      {value}
      {suffix}
    </span>
  );
}
