import { motion, useInView } from "framer-motion";
import { useRef, ReactNode } from "react";
import { easeEnter } from "../utils/motion-tokens";

interface TextRevealProps {
  children: string;
  className?: string;
  delay?: number;
  stagger?: number;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  once?: boolean;
}

export function TextReveal({
  children,
  className = "",
  delay = 0,
  stagger = 0.04,
  once = true,
}: TextRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, margin: "-100px" });

  const words = children.split(" ");

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: stagger, delayChildren: delay },
    },
  };

  const child = {
    hidden: {
      opacity: 0,
      y: 40,
      rotateX: -40,
    },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        duration: 0.6,
        ease: easeEnter,
      },
    },
  };

  return (
    <div ref={ref} style={{ perspective: "1000px" }}>
      <motion.div
        className={`${className} flex flex-wrap`}
        variants={container}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        {words.map((word, i) => (
          <motion.span
            key={i}
            variants={child}
            className="mr-[0.25em] inline-block"
            style={{ transformStyle: "preserve-3d" }}
          >
            {word}
          </motion.span>
        ))}
      </motion.div>
    </div>
  );
}

interface LineRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
}

export function LineReveal({
  children,
  className = "",
  delay = 0,
  direction = "up",
}: LineRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  const clipPaths = {
    up: "inset(100% 0 0 0)",
    down: "inset(0 0 100% 0)",
    left: "inset(0 100% 0 0)",
    right: "inset(0 0 0 100%)",
  };

  return (
    <div ref={ref} className="overflow-hidden">
      <motion.div
        initial={{ clipPath: clipPaths[direction], y: direction === "up" ? 20 : direction === "down" ? -20 : 0 }}
        animate={
          isInView
            ? { clipPath: "inset(0 0 0 0)", y: 0 }
            : { clipPath: clipPaths[direction], y: direction === "up" ? 20 : direction === "down" ? -20 : 0 }
        }
        transition={{
          duration: 0.8,
          delay,
          ease: easeEnter,
        }}
        className={className}
      >
        {children}
      </motion.div>
    </div>
  );
}
