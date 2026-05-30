import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { MotionConfig } from "framer-motion";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { Preloader } from "./components/Preloader";
import { PageTransition } from "./components/PageTransition";
import { ScrollToTop } from "./components/ScrollToTop";
import { ScrollProgressBar } from "./components/ScrollProgressBar";
import { HomePage } from "./pages/HomePage";
import { InteriorsPage } from "./pages/InteriorsPage";
import { AutomotivePage } from "./pages/AutomotivePage";
import { NotFoundPage } from "./pages/NotFoundPage";

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

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Refresh once after mount so ScrollTrigger picks up the correct trigger
    // positions now that Lenis is the scroll driver.
    ScrollTrigger.refresh();

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      <ScrollToTop />
      {!loaded && <Preloader onComplete={() => setLoaded(true)} />}
      <div className={`min-h-screen bg-bg transition-opacity duration-700 ${loaded ? "opacity-100" : "opacity-0"}`}>
        <ScrollProgressBar thickness={3} />
        <Navbar />
        <PageTransition>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/interiors" element={<InteriorsPage />} />
            <Route path="/automotive" element={<AutomotivePage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </PageTransition>
        <Footer />
      </div>
    </MotionConfig>
  );
}

export default App;
