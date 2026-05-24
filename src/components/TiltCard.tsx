import { useRef, useState, ReactNode } from "react";
import { motion } from "framer-motion";

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  tiltAmount?: number;
}

export function TiltCard({
  children,
  className = "",
  tiltAmount = 6,
}: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setRotate({
      x: y * -tiltAmount * 2,
      y: x * tiltAmount * 2,
    });
  };

  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
    setIsHovered(false);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className={`relative ${className}`}
      style={{ perspective: 1000 }}
      animate={{
        rotateX: rotate.x,
        rotateY: rotate.y,
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 20,
      }}
    >
      {children}
      {isHovered && (
        <div
          className="absolute inset-0 rounded-[inherit] pointer-events-none"
          style={{
            background: `radial-gradient(circle at ${50 + rotate.y * 3}% ${50 - rotate.x * 3}%, rgba(255,255,255,0.12), transparent 60%)`,
          }}
        />
      )}
    </motion.div>
  );
}
