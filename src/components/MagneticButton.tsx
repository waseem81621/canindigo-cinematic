import { useRef, useState } from "react";
import { motion } from "framer-motion";

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  strength?: number;
  href?: string;
  target?: string;
  rel?: string;
}

/**
 * Wraps children in a magnetic pointer-following effect.
 * - When `href` is provided: renders motion.a (anchor semantics).
 * - Otherwise: renders motion.div (no implicit button semantics).
 *   The child is expected to be the actual interactive element (e.g., a GlassButton).
 *   This avoids invalid <button> inside <button> HTML.
 */
export function MagneticButton({
  children,
  className = "",
  strength = 0.3,
  href,
  target,
  rel,
}: MagneticButtonProps) {
  const ref = useRef<HTMLAnchorElement | HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const x = (e.clientX - centerX) * strength;
    const y = (e.clientY - centerY) * strength;
    setPosition({ x, y });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  const sharedProps = {
    onMouseMove: handleMouseMove,
    onMouseLeave: handleMouseLeave,
    animate: { x: position.x, y: position.y },
    transition: {
      type: "spring" as const,
      stiffness: 350,
      damping: 15,
      mass: 0.5,
    },
    className,
  };

  if (href) {
    return (
      <motion.a
        ref={ref as React.RefObject<HTMLAnchorElement>}
        href={href}
        target={target}
        rel={rel}
        {...sharedProps}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <motion.div
      ref={ref as React.RefObject<HTMLDivElement>}
      {...sharedProps}
    >
      {children}
    </motion.div>
  );
}
