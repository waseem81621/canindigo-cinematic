import { Hero } from "../components/Hero";
import { ActBackground } from "../components/ActBackground";
import { ThesisManifesto } from "../components/ThesisManifesto";
import { TheDescent } from "../components/TheDescent";
import { VerticalsSelector } from "../components/VerticalsSelector";
import { Services } from "../components/Services";
import { AppGalleryPin } from "../components/AppGalleryPin";
import { ProofChapter } from "../components/ProofChapter";
import { ShuaaProgram } from "../components/ShuaaProgram";
import { About } from "../components/About";
import { Contact } from "../components/Contact";

export function HomePage() {
  return (
    <main id="main-content">
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
        <AppGalleryPin />
        <ProofChapter />
      </section>

      {/* ───────── THE RESURFACE → ACT III (cream) ─────────
          Shuaa carries the light boundary itself — dawn breaks across the
          section's own height ("a ray of light", literally). */}
      <ShuaaProgram />
      <About />
      <Contact />
    </main>
  );
}
