import { useState, useEffect, lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { MotionConfig } from "framer-motion";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Mobile browsers fire resize when the URL bar collapses/expands during
// scroll; recomputing every pin on each of those is both janky and wrong.
ScrollTrigger.config({ ignoreMobileResize: true });
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { Preloader } from "./components/Preloader";
import { PageTransition } from "./components/PageTransition";
import { ScrollToTop } from "./components/ScrollToTop";
import { ScrollProgressBar } from "./components/ScrollProgressBar";
import { CustomCursor } from "./components/CustomCursor";
import { HomePage } from "./pages/HomePage";
import { setLenis } from "./utils/lenis-store";
import { ErrorBoundary } from "./components/ErrorBoundary";

// Route code-split — /interiors, /automotive, and the 404 page are pulled
// out of the homepage bundle. Wrapped in Suspense at the <Routes> level.
const InteriorsPage = lazy(() =>
  import("./pages/InteriorsPage").then((m) => ({ default: m.InteriorsPage }))
);
const AutomotivePage = lazy(() =>
  import("./pages/AutomotivePage").then((m) => ({ default: m.AutomotivePage }))
);
const NotFoundPage = lazy(() =>
  import("./pages/NotFoundPage").then((m) => ({ default: m.NotFoundPage }))
);

function App() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // Respect prefers-reduced-motion — skip Lenis init entirely.
    // Browser falls back to native instant scroll for users who opted out
    // of motion. framer-motion handles its own reduced-motion via hooks.
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const lenis = new Lenis({
      // Phase 3.3 (2026-05-26): 1.2 → 0.9. The longer duration made fast
      // wheel-scroll feel like it kept coasting after the user stopped.
      // 0.9s keeps the buttery feel without the "drunk" coast — power
      // users (the audience here) get more direct response.
      duration: 0.9,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 2,
    });

    // Lenis + GSAP ScrollTrigger integration. Without this, ScrollTrigger
    // caches trigger positions but never gets notified when Lenis updates the
    // scroll position — so triggers that depend on `start: "top 75%"` etc.
    // never fire, leaving any GSAP-driven entrance animations stuck in their
    // initial (often opacity:0) state. The Services pillar image columns hit
    // exactly this bug. Pattern from https://lenis.darkroom.engineering/
    lenis.on("scroll", ScrollTrigger.update);
    setLenis(lenis);

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Refresh once after mount so ScrollTrigger picks up the correct trigger
    // positions now that Lenis is the scroll driver.
    ScrollTrigger.refresh();

    // Pins measure their positions when created — anything that shifts layout
    // afterwards (web font swap, late images) silently breaks every pin's
    // start/end. Re-measure on both signals.
    document.fonts?.ready.then(() => ScrollTrigger.refresh());
    const onLoad = () => ScrollTrigger.refresh();
    window.addEventListener("load", onLoad);

    return () => {
      window.removeEventListener("load", onLoad);
      setLenis(null);
      lenis.destroy();
    };
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      <ErrorBoundary>
        <ScrollToTop />
        {!loaded && (
          <Preloader
            onComplete={() => {
              setLoaded(true);
              // The app content was fading in behind the preloader; pins must
              // re-measure now that the real layout is interactive.
              ScrollTrigger.refresh();
            }}
          />
        )}
        {/* No bg here — body carries the cream, and the homepage's fixed
            ActBackground layer (z -1) must not be buried under an opaque
            wrapper background. */}
        <div className={`min-h-screen transition-opacity duration-700 ${loaded ? "opacity-100" : "opacity-0"}`}>
          <CustomCursor />
          <ScrollProgressBar thickness={3} />
          <Navbar />
          <PageTransition>
            <Suspense fallback={<LoadingFallback />}>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/interiors" element={<InteriorsPage />} />
                <Route path="/automotive" element={<AutomotivePage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </Suspense>
          </PageTransition>
          <Footer />
        </div>
      </ErrorBoundary>
    </MotionConfig>
  );
}

function LoadingFallback() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-indigo-accent/20 border-t-indigo-accent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-text-secondary font-medium">Loading...</p>
      </div>
    </div>
  );
}

export default App;
