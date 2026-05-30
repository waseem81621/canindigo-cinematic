import { motion, AnimatePresence } from "framer-motion";
import { ReactNode } from "react";
import { useLocation } from "react-router-dom";
import { easeEnter } from "../utils/motion-tokens";

interface PageTransitionProps {
  children: ReactNode;
}

/**
 * Fades and lifts each route in/out. `location.key` re-keys the motion.div
 * on every navigation so the exit/enter pair fires on route change, not
 * just on first mount.
 */
export function PageTransition({ children }: PageTransitionProps) {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.key}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.6, ease: easeEnter }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
