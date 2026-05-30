import { Hero } from "../components/Hero";
import { VerticalsSelector } from "../components/VerticalsSelector";
import { ClientStrip } from "../components/ClientStrip";
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
      <ClientStrip />
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
