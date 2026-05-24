import { motion } from "framer-motion";
import { networkRing } from "../data/siteData";

export function NetworkHealthRing() {
  return (
    <div className="relative w-[240px] h-[240px] md:w-[280px] md:h-[280px]">
      {/* Outer ring */}
      <svg viewBox="0 0 200 200" className="w-full h-full -rotate-90">
        {/* Background track */}
        <circle
          cx="100"
          cy="100"
          r="85"
          fill="none"
          stroke="#E5E5E7"
          strokeWidth="1"
        />
        {/* Animated progress ring */}
        <motion.circle
          cx="100"
          cy="100"
          r="85"
          fill="none"
          stroke="#D4AF37"
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray={`${2 * Math.PI * 85}`}
          initial={{ strokeDashoffset: 2 * Math.PI * 85 }}
          animate={{ strokeDashoffset: 2 * Math.PI * 85 * 0.02 }}
          transition={{ duration: 2, delay: 0.8, ease: [0.25, 0.1, 0.25, 1] as const }}
          className="pulse-ring"
        />
        {/* Secondary ring */}
        <motion.circle
          cx="100"
          cy="100"
          r="70"
          fill="none"
          stroke="#2B6E6F"
          strokeWidth="1"
          strokeLinecap="round"
          strokeDasharray={`${2 * Math.PI * 70}`}
          initial={{ strokeDashoffset: 2 * Math.PI * 70 }}
          animate={{ strokeDashoffset: 2 * Math.PI * 70 * 0.15 }}
          transition={{ duration: 2.2, delay: 1, ease: [0.25, 0.1, 0.25, 1] as const }}
          opacity={0.6}
        />
      </svg>

      {/* Center content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.6 }}
          className="text-[42px] md:text-[48px] font-bold text-text-primary tracking-[-0.02em]"
        >
          {networkRing.uptime}
          <span className="text-lg font-medium text-text-muted">%</span>
        </motion.span>
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.7, duration: 0.6 }}
          className="text-[11px] font-medium text-text-secondary uppercase tracking-[0.15em] mt-1"
        >
          {networkRing.label}
        </motion.span>
      </div>

      {/* Orbiting dots */}
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="absolute w-1.5 h-1.5 rounded-full bg-accent-gold"
          style={{ top: "50%", left: "50%" }}
          animate={{
            x: [
              Math.cos((i * 120 * Math.PI) / 180) * 85 - 3,
              Math.cos(((i * 120 + 360) * Math.PI) / 180) * 85 - 3,
            ],
            y: [
              Math.sin((i * 120 * Math.PI) / 180) * 85 - 3,
              Math.sin(((i * 120 + 360) * Math.PI) / 180) * 85 - 3,
            ],
          }}
          transition={{
            duration: 8 + i * 2,
            repeat: Infinity,
            ease: "linear",
            delay: i * 1.5,
          }}
        />
      ))}
    </div>
  );
}
