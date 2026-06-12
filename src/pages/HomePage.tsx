import { Hero } from "../components/Hero";
import { ActBackground } from "../components/ActBackground";
import { ThesisManifesto } from "../components/ThesisManifesto";
import { TheDescent } from "../components/TheDescent";
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
      {/* The thesis: why Oman, why the Canadian+Omani hybrid — pinned,
          word-by-word scrub. Absorbs the retired ClientStrip's logos as
          its proof coda. */}
      <ThesisManifesto />
      <VerticalsSelector />

      {/* Act I → II boundary — the pinned submersion scene. Carries its own
          data-act-boundary marker (owned: ActBackground only binds it below
          lg, where the scene doesn't pin). */}
      <TheDescent />

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
