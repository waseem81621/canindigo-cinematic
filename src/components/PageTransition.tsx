import { motion, AnimatePresence } from "framer-motion";
import { ReactNode } from "react";
import { useLocation } from "react-router-dom";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { easeEnter } from "../utils/motion-tokens";

interface PageTransitionProps {
  children: ReactNode;
}

/**
 * Fades each route in/out. `location.key` re-keys the motion.div on every
 * navigation so the exit/enter pair fires on route change, not just on
 * first mount.
 *
 * OPACITY ONLY — no y/x transform. A transform on this wrapper makes it the
 * containing block for every `position: fixed` descendant, which breaks all
 * GSAP ScrollTrigger pins (pinned scenes would scroll away mid-animation).
 * The refresh on enter-complete re-measures pin positions once the route
 * has settled.
 */
export function PageTransition({ children }: PageTransitionProps) {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.key}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5, ease: easeEnter }}
        onAnimationComplete={(definition) => {
          if ((definition as { opacity?: number }).opacity === 1) {
            ScrollTrigger.refresh();
          }
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
