import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Lenis from "lenis";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { Preloader } from "./components/Preloader";
import { PageTransition } from "./components/PageTransition";
import { ScrollToTop } from "./components/ScrollToTop";
import { HomePage } from "./pages/HomePage";
import { InteriorsPage } from "./pages/InteriorsPage";
import { AutomotivePage } from "./pages/AutomotivePage";
import { NotFoundPage } from "./pages/NotFoundPage";

function App() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 2,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <>
      <ScrollToTop />
      {!loaded && <Preloader onComplete={() => setLoaded(true)} />}
      <div className={`min-h-screen bg-bg transition-opacity duration-700 ${loaded ? "opacity-100" : "opacity-0"}`}>
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
    </>
  );
}

export default App;
