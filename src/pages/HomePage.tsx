import { Hero } from "../components/Hero";
import { VerticalsSelector } from "../components/VerticalsSelector";
import { Services } from "../components/Services";
import { BoutiqueApps } from "../components/BoutiqueApps";
import { CaseStudies } from "../components/CaseStudies";
import { ShuaaProgram } from "../components/ShuaaProgram";
import { About } from "../components/About";
import { Contact } from "../components/Contact";

export function HomePage() {
  return (
    <main>
      <Hero />
      {/* ClientStrip retired — the partner logos return as the proof coda
          inside the Thesis manifesto (Act I, Phase 3). Data stays in
          siteData.partners. */}
      <VerticalsSelector />
      <section id="ict">
        <Services />
        <BoutiqueApps />
        <CaseStudies />
      </section>
      <ShuaaProgram />
      <About />
      <Contact />
    </main>
  );
}
