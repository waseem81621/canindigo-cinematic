import { motion } from "framer-motion";
import {
  PaintRoller,
  Layers,
  Palette,
  Hammer,
  Lamp,
  ArrowUpRight,
} from "lucide-react";

/*
 * Image credits (Unsplash, license-permissive):
 * - interiors-hero-timber-hallway.jpg: Diego Marín (photo-1741639629213-77e5de17b22d)
 * - false-ceilings-baffle-curved.jpg: Olga Iacovlenco (photo-1663993719970-4efee771203f)
 * - wall-treatments-slatted-veneer.jpg: Jan Kořiva (photo-1675528030748-d463ab87e8d5)
 * - flooring-marble-hotel-lobby.jpg: Andy Wang (photo-1768270181430-3e3672a32283)
 * - lighting-linear-led-grid.jpg: Wayee Tan (photo-1570005616859-784c0e1644c5)
 * TODO: Replace with own project photography once available.
 */

const trades = [
  {
    index: "01",
    icon: Layers,
    title: "False Ceilings",
    body: "Gypsum and timber baffle ceiling systems — from linear corporate fit-outs to curved acoustic features in hospitality interiors.",
    bullets: [
      "Gypsum plasterboard with skim finish",
      "Timber slat & baffle ceiling systems",
      "Acoustic baffles & integrated lighting coves",
    ],
    image: "/images/interiors/false-ceilings-baffle-curved.jpg",
    imageAlt: "Curved timber baffle ceiling with hidden cove lighting",
  },
  {
    index: "02",
    icon: Palette,
    title: "Painting & Wall Treatments",
    body: "Premium paint finishes, decorative wall treatments, and timber veneer installation for executive and residential interiors.",
    bullets: [
      "High-build emulsion & specialist paint",
      "Veneer panelling & feature walls",
      "Decorative finishes (textured, metallic, fabric)",
    ],
    image: "/images/interiors/wall-treatments-slatted-veneer.jpg",
    imageAlt: "Vertical slatted timber wall, premium veneer detail",
  },
  {
    index: "03",
    icon: Hammer,
    title: "Flooring & Tiling",
    body: "Marble, porcelain, engineered timber, and luxury vinyl tile installation across executive and hospitality interiors.",
    bullets: [
      "Polished marble & porcelain stone",
      "Engineered timber & parquet",
      "Luxury vinyl tile (LVT) & carpet",
    ],
    image: "/images/interiors/flooring-marble-hotel-lobby.jpg",
    imageAlt: "Polished marble flooring in hospitality lobby",
  },
  {
    index: "04",
    icon: Lamp,
    title: "Lighting & Decorative",
    body: "Architectural lighting design, recessed coves, linear LED systems, and pendant installation aligned with each interior's mood and function.",
    bullets: [
      "Architectural linear LED & cove",
      "Pendant & decorative fixtures",
      "Concealed cabling & clean terminations",
    ],
    image: "/images/interiors/lighting-linear-led-grid.jpg",
    imageAlt: "Architectural linear LED lighting installation",
  },
];

// Shared motion variants — fade + translate-y-8, 0.65s, cubic-bezier(0.22, 1, 0.36, 1)
const revealVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0 },
};

const cardContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
};

export function InteriorsDivision() {
  return (
    <main>
      {/* ─────────────────────────────────────────────────────
          BLOCK 1 — Split-Screen Hero
          ───────────────────────────────────────────────────── */}
      <section className="pt-32 md:pt-40 pb-20 md:pb-28">
        <div className="max-w-[1440px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Left — text column (5/12) */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={revealVariants}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-5 px-6 md:px-12 lg:pl-20 lg:pr-0"
            >
              <PaintRoller
                size={28}
                className="text-indigo-mid mb-6"
                strokeWidth={1.5}
              />
              <div className="flex items-center gap-2 mb-5">
                <span className="block w-6 h-px bg-indigo-accent" />
                <span className="text-[11px] uppercase tracking-[0.18em] text-text-muted">
                  Division 02
                </span>
              </div>
              <h1 className="font-display text-[56px] md:text-[72px] lg:text-[88px] font-medium text-text-primary leading-[0.95] tracking-[-0.02em]">
                Interior
                <br />
                Decoration.
              </h1>
              <p className="mt-7 text-[17px] text-text-secondary leading-relaxed max-w-[460px]">
                From false ceilings and premium finishes to lighting and
                decorative joinery — we deliver complete interior fit-outs for
                Oman's most demanding executive and residential clients.
              </p>
              <p className="mt-4 text-[15px] text-text-muted leading-relaxed max-w-[460px]">
                Single point of contact across all four trades. One contract,
                one timeline, one accountability.
              </p>

              {/* Stats strip */}
              <div className="mt-10 grid grid-cols-3 gap-6 max-w-[480px]">
                <div>
                  <div
                    className="font-display text-4xl md:text-5xl font-medium text-text-primary leading-none tracking-[-0.02em]"
                    style={{ fontVariantNumeric: "tabular-nums" }}
                  >
                    04
                  </div>
                  <div className="mt-2 text-[11px] uppercase tracking-[0.15em] text-text-muted">
                    Core trades
                  </div>
                </div>
                <div>
                  <div className="font-display text-2xl md:text-3xl font-medium text-text-primary leading-tight tracking-[-0.01em]">
                    Single contractor
                  </div>
                  <div className="mt-2 text-[11px] uppercase tracking-[0.15em] text-text-muted">
                    Full-scope delivery
                  </div>
                </div>
                <div>
                  <div className="font-display text-2xl md:text-3xl font-medium text-text-primary leading-tight tracking-[-0.01em]">
                    Riyada
                  </div>
                  <div className="mt-2 text-[11px] uppercase tracking-[0.15em] text-text-muted">
                    SME registered
                  </div>
                </div>
              </div>

              {/* CTA row */}
              <div className="mt-10 flex flex-col sm:flex-row gap-3">
                <a
                  href="/#contact"
                  className="inline-flex items-center justify-center px-6 py-3 text-[14px] font-medium text-text-primary border border-border rounded-full hover:border-indigo-mid hover:bg-indigo-mid/5 transition-colors duration-200 ease-out"
                >
                  Get a Quote
                </a>
                <a
                  href="https://wa.me/96898540055"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center justify-center gap-1.5 px-6 py-3 text-[14px] font-medium text-white bg-indigo-mid rounded-full hover:bg-indigo-light transition-colors duration-200 ease-out"
                >
                  WhatsApp Us
                  <ArrowUpRight
                    size={16}
                    className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200 ease-out"
                  />
                </a>
              </div>
            </motion.div>

            {/* Right — image column (7/12), bleeds right margin */}
            <motion.div
              initial={{ opacity: 0, x: 32 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
              className="lg:col-span-7 relative"
            >
              <div className="relative aspect-[16/12] overflow-hidden rounded-l-2xl lg:rounded-l-3xl">
                <img
                  src="/images/interiors/interiors-hero-timber-hallway.jpg"
                  alt="Premium slatted timber hallway interior with herringbone wood floor"
                  className="w-full h-full object-cover"
                />
                {/* Left-edge gradient dissolves into text column on lg+ */}
                <div className="hidden lg:block absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-bg to-transparent pointer-events-none" />
                {/* Corner label */}
                <div className="absolute top-6 right-6 md:top-8 md:right-8">
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-bg/85 backdrop-blur-sm">
                    <span className="block w-1.5 h-1.5 rounded-full bg-indigo-mid" />
                    <span className="text-[11px] uppercase tracking-[0.15em] text-text-primary">
                      Fit-out · Muscat
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────
          BLOCK 2 — Four Trade Cards (2×2)
          ───────────────────────────────────────────────────── */}
      <section className="py-20 md:py-28">
        <div className="max-w-[1280px] mx-auto px-6 md:px-12 lg:px-20">
          <div className="mb-12 md:mb-16 max-w-[680px]">
            <div className="flex items-center gap-2 mb-5">
              <span className="block w-6 h-px bg-indigo-accent" />
              <span className="text-[11px] uppercase tracking-[0.18em] text-text-muted">
                Four trades
              </span>
            </div>
            <h2 className="font-display text-[36px] md:text-[48px] lg:text-[56px] font-medium text-text-primary leading-[1.05] tracking-[-0.02em]">
              Every surface, end to end.
            </h2>
            <p className="mt-5 text-[17px] text-text-secondary leading-relaxed">
              Four disciplines coordinated under one contract. Single point of
              accountability, sequenced delivery, no inter-trade handover gaps.
            </p>
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            variants={cardContainer}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8"
          >
            {trades.map((t) => {
              const Icon = t.icon;
              return (
                <motion.article
                  key={t.index}
                  variants={revealVariants}
                  transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                  className="group rounded-2xl overflow-hidden border border-border bg-bg-pure transition-colors duration-300 ease-out hover:border-indigo-accent/40"
                >
                  {/* Image */}
                  <div className="relative aspect-[16/10] overflow-hidden bg-bg">
                    <img
                      src={t.image}
                      alt={t.imageAlt}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                    />
                  </div>

                  {/* Body */}
                  <div className="p-7 md:p-8">
                    {/* Index + eyebrow */}
                    <div className="flex items-center gap-3 mb-5">
                      <span
                        className="font-display text-2xl font-medium text-indigo-mid leading-none"
                        style={{ fontVariantNumeric: "tabular-nums" }}
                      >
                        {t.index}
                      </span>
                      <span className="block w-6 h-px bg-indigo-accent" />
                      <Icon
                        size={16}
                        strokeWidth={1.5}
                        className="text-text-muted"
                      />
                      <span className="text-[11px] uppercase tracking-[0.15em] text-text-muted">
                        Trade {t.index}
                      </span>
                    </div>

                    <h3 className="font-display text-2xl md:text-3xl font-medium text-text-primary tracking-[-0.01em] mb-3">
                      {t.title}
                    </h3>
                    <p className="text-[15px] text-text-secondary leading-relaxed mb-6">
                      {t.body}
                    </p>

                    {/* Bullets — indigo hairlines, not dots */}
                    <ul className="pt-5 border-t border-border space-y-3">
                      {t.bullets.map((b) => (
                        <li
                          key={b}
                          className="flex items-start gap-3 text-[14px] text-text-secondary leading-relaxed"
                        >
                          <span className="block w-4 h-px bg-indigo-accent mt-2.5 shrink-0" />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.article>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────
          BLOCK 3 — Bundle CTA Strip
          ───────────────────────────────────────────────────── */}
      <section className="bg-bg-dark py-20 md:py-28 border-t border-b border-border-dark">
        <div className="max-w-[1280px] mx-auto px-6 md:px-12 lg:px-20">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={revealVariants}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center"
          >
            <div className="lg:col-span-7">
              <div className="flex items-center gap-2 mb-5">
                <span className="block w-6 h-px bg-indigo-accent" />
                <span className="text-[11px] uppercase tracking-[0.18em] text-text-light/60">
                  One contractor, full scope
                </span>
              </div>
              <h2 className="font-display text-[36px] md:text-[48px] lg:text-[56px] font-medium text-text-light leading-[1.05] tracking-[-0.02em]">
                Four trades. One handover.
              </h2>
              <p className="mt-5 text-[17px] text-text-light/70 leading-relaxed max-w-[560px]">
                From ceiling to floor, lighting to finish — one contract delivers
                the complete fit-out. Single point of accountability, sequenced
                trades, predictable handover.
              </p>
            </div>

            <div className="lg:col-span-5 flex flex-col sm:flex-row lg:justify-end gap-3">
              <a
                href="/#contact"
                className="inline-flex items-center justify-center px-6 py-3 text-[14px] font-medium text-text-light border border-text-light/30 rounded-full hover:border-text-light hover:bg-text-light/5 transition-colors duration-200 ease-out"
              >
                Get a Quote
              </a>
              <a
                href="https://wa.me/96898540055"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-center gap-1.5 px-6 py-3 text-[14px] font-medium text-white bg-indigo-mid rounded-full hover:bg-indigo-light transition-colors duration-200 ease-out"
              >
                WhatsApp Us
                <ArrowUpRight
                  size={16}
                  className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200 ease-out"
                />
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
