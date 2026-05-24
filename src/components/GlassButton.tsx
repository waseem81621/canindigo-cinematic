import { useState, ReactNode } from "react";
import { motion } from "framer-motion";

interface GlassButtonProps {
  children: ReactNode;
  onClick?: () => void;
  href?: string;
  target?: string;
  rel?: string;
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  className?: string;
  icon?: ReactNode;
}

export function GlassButton({
  children,
  onClick,
  href,
  target,
  rel,
  variant = "primary",
  size = "md",
  className = "",
  icon,
}: GlassButtonProps) {
  const [pressed, setPressed] = useState(false);

  const sizeClass = size === "sm" ? "px-5 py-2 text-[12px]" : size === "lg" ? "px-8 py-3.5 text-[14px]" : "px-7 py-3 text-[13px]";

  const variantClass =
    variant === "primary"
      ? "glass-btn-primary"
      : variant === "secondary"
      ? "glass-btn-secondary"
      : "glass-btn-ghost";

  const handlePointerDown = () => setPressed(true);
  const handlePointerUp = () => setPressed(false);
  const handlePointerLeave = () => setPressed(false);

  const motionProps = {
    onPointerDown: handlePointerDown,
    onPointerUp: handlePointerUp,
    onPointerLeave: handlePointerLeave,
    animate: pressed ? { scale: 0.96, y: 1 } : { scale: 1, y: 0 },
    transition: { type: "spring" as const, stiffness: 500, damping: 25 },
    "data-pressed": pressed,
    className: `relative inline-flex items-center justify-center gap-2 font-semibold rounded-full select-none ${sizeClass} ${variantClass} ${className}`,
  };

  if (href) {
    return (
      <motion.a href={href} target={target} rel={rel} {...motionProps}>
        <span>{children}</span>
        {icon}
      </motion.a>
    );
  }

  return (
    <motion.button onClick={onClick} {...motionProps}>
      <span>{children}</span>
      {icon}
    </motion.button>
  );
}
