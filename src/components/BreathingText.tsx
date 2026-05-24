import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface BreathingHeadlineProps {
  children: string;
  className?: string;
}

export function BreathingHeadline({ children, className = "" }: BreathingHeadlineProps) {
  const ref = useRef<HTMLHeadingElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.9", "start 0.2"],
  });

  const weight = useTransform(scrollYProgress, [0, 1], [750, 350]);

  return (
    <motion.h2
      ref={ref}
      className={`${className}`}
      style={{ fontWeight: weight }}
    >
      {children}
    </motion.h2>
  );
}
