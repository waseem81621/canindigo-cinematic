import { Hero } from "../components/Hero";
import { ActBackground } from "../components/ActBackground";
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
      {/* Fixed color layer behind everything — scrubs cream→dark→cream at
          the [data-act-boundary] markers below. */}
      <ActBackground />

      {/* ───────── ACT I — ARRIVAL (cream) ───────── */}
      <Hero />
      {/* ClientStrip retired — the partner logos return as the proof coda
          inside the Thesis manifesto (Act I, Phase 3). Data stays in
          siteData.partners. */}
      {/* Phase 3: <ThesisManifesto /> lands here. */}
      <VerticalsSelector />

      {/* Act I → II boundary. Phase 4 replaces this marker with the pinned
          TheDescent scene (the scene carries the data attribute itself). */}
      <div data-act-boundary="dark" className="h-px" aria-hidden="true" />

      {/* ───────── ACT II — ENGINE ROOM (dark) ─────────
          .act-dark remaps the design tokens for everything inside (see
          index.css). The #ict anchor must stay — the ICT vertical card
          links to it. */}
      <section id="ict" className="act-dark">
        <Services />
        <BoutiqueApps />
        <CaseStudies />
      </section>

      {/* Act II → III boundary: dawn breaks behind Shuaa. Phase 6 moves the
          scrub inside the section itself for the full resurface moment. */}
      <div
        data-act-boundary="light"
        data-act-start="top 70%"
        data-act-end="top 10%"
        className="h-px"
        aria-hidden="true"
      />

      {/* ───────── ACT III — HUMAN ENDING (cream) ───────── */}
      <ShuaaProgram />
      <About />
      <Contact />
    </main>
  );
}
