import type Lenis from "lenis";

/**
 * Module-level handle to the single Lenis instance created in App.tsx.
 * Lets deep components (e.g. the case-study modal) call lenis.stop()/start()
 * without prop-drilling or context. Null when reduced-motion skipped init.
 */
let instance: Lenis | null = null;

export function setLenis(lenis: Lenis | null) {
  instance = lenis;
}

export function getLenis(): Lenis | null {
  return instance;
}
