import { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface ImageRevealProps {
  src: string;
  alt: string;
  className?: string;
  direction?: "left" | "right" | "up" | "down";
  delay?: number;
  duration?: number;
}

export function ImageReveal({
  src,
  alt,
  className = "",
  direction = "left",
  delay = 0,
  duration = 1.2,
}: ImageRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const clipPaths = {
    left: {
      hidden: "polygon(0 0, 0 0, 0 100%, 0 100%)",
      visible: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
    },
    right: {
      hidden: "polygon(100% 0, 100% 0, 100% 100%, 100% 100%)",
      visible: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
    },
    up: {
      hidden: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)",
      visible: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
    },
    down: {
      hidden: "polygon(0 0, 100% 0, 100% 0, 0 0)",
      visible: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
    },
  };

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <motion.div
        className="w-full h-full"
        initial={{ clipPath: clipPaths[direction].hidden }}
        animate={
          isInView
            ? { clipPath: clipPaths[direction].visible }
            : { clipPath: clipPaths[direction].hidden }
        }
        transition={{
          duration,
          delay,
          ease: [0.25, 0.1, 0.25, 1],
        }}
      >
        <motion.img
          src={src}
          alt={alt}
          className="w-full h-full object-cover"
          initial={{ scale: 1.3 }}
          animate={isInView ? { scale: 1 } : { scale: 1.3 }}
          transition={{
            duration: duration * 1.3,
            delay: delay + 0.1,
            ease: [0.25, 0.1, 0.25, 1],
          }}
        />
      </motion.div>
    </div>
  );
}
