import { useState, useEffect } from "react";
import Lenis from "lenis";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { ClientStrip } from "./components/ClientStrip";
import { Services } from "./components/Services";
import { BoutiqueApps } from "./components/BoutiqueApps";
import { CaseStudies } from "./components/CaseStudies";
import { ShuaaProgram } from "./components/ShuaaProgram";
import { About } from "./components/About";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";
import { Preloader } from "./components/Preloader";
import { PageTransition } from "./components/PageTransition";

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
      {!loaded && <Preloader onComplete={() => setLoaded(true)} />}
      <div className={`min-h-screen bg-bg transition-opacity duration-700 ${loaded ? "opacity-100" : "opacity-0"}`}>
        <Navbar />
        <PageTransition>
          <main>
            <Hero />
            <ClientStrip />
            <Services />
            <BoutiqueApps />
            <CaseStudies />
            <ShuaaProgram />
            <About />
            <Contact />
          </main>
        </PageTransition>
        <Footer />
      </div>
    </>
  );
}

export default App;
