import { motion } from "framer-motion";
import {
  Wrench,
  Activity,
  Disc,
  Building2,
  ArrowUpRight,
} from "lucide-react";

/*
 * Image credits (Unsplash, license-permissive):
 * - automotive-hero-onuk-lift.jpg: Mehmet Talha Onuk (photo-1727893304219-063d142ce6f3)
 * - routine-servicing-oil-filter.jpg: Jimmy Nilsson Masth (photo-1642075223291-f9ec545889fa)
 * - diagnostics-modern-engine-bay.jpg: Cemrecan Yurtman (photo-1717068341695-9d33ffb66968)
 * - tires-impact-wrench-wheel.jpg: Tekton (photo-1593699199342-59b40e08f0ac)
 * - corporate-maintenance-multi-bay.jpg: Mehmet Talha Onuk (photo-1727893294198-e85137574f5b)
 * TODO: Replace with own project photography once available.
 */

const capabilities = [
  {
    index: "01",
    icon: Wrench,
    title: "Routine Servicing",
    body: "Oil & filter changes, fluid top-ups, brake and suspension checks, multi-point inspections — scheduled service on European, Japanese, and Korean vehicles.",
    bullets: [
      "Engine oil & filter changes",
      "Fluid services (brake, coolant, transmission)",
      "Multi-point inspections & written reports",
    ],
    image: "/images/automotive/routine-servicing-oil-filter.jpg",
    imageAlt: "Gloved hand holding oil filter mid-removal during routine service",
  },
  {
    index: "02",
    icon: Activity,
    title: "Diagnostics & Repair",
    body: "OBD diagnostic scans, electrical troubleshooting, and mechanical repair across petrol and diesel passenger vehicles.",
    bullets: [
      "OBD-II diagnostic scan & report",
      "Electrical & ECU troubleshooting",
      "Engine, transmission, and suspension repair",
    ],
    image: "/images/automotive/diagnostics-modern-engine-bay.jpg",
    imageAlt: "Modern car engine bay with intake manifold and hoses exposed during diagnostic work",
  },
  {
    index: "03",
    icon: Disc,
    title: "Tires, Battery & Detailing",
    body: "Tire fitting and rotation, battery testing and replacement, professional detailing — keeping every vehicle road-ready and presentable.",
    bullets: [
      "Tire fitting, balancing, rotation",
      "Battery test & replacement",
      "Interior & exterior detailing",
    ],
    image: "/images/automotive/tires-impact-wrench-wheel.jpg",
    imageAlt: "Impact wrench socket driving onto a wheel lug nut during tire service",
  },
  {
    index: "04",
    icon: Building2,
    title: "Corporate Maintenance",
    body: "Scheduled maintenance contracts for company vehicle pools, with single-invoice billing and SLA-backed turnaround.",
    bullets: [
      "Single-invoice billing",
      "Priority bay allocation",
      "SLA-backed turnaround times",
    ],
    image: "/images/automotive/corporate-maintenance-multi-bay.jpg",
    imageAlt: "Wide-angle workshop interior with multiple service bays and vehicles being serviced",
  },
];

const pickupSteps = [
  {
    index: "01",
    title: "Book",
    body: "WhatsApp, call, or email us with your service request. We confirm a collection window the same day.",
  },
  {
    index: "02",
    title: "Collect",
    body: "A uniformed driver collects your vehicle from your office or home anywhere across Muscat. No extra fee.",
  },
  {
    index: "03",
    title: "Service & report",
    body: "Your vehicle is serviced at our facility. You get a written report with photos before any additional work is authorised.",
  },
  {
    index: "04",
    title: "Return",
    body: "We return the vehicle washed and tested to your address — same day for routine work, scheduled for major repairs.",
  },
];

const revealVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0 },
};

const cardContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
};

export function AutomotiveDivision() {
  return (
    <main>
      {/* ─────────────────────────────────────────────────────
          BLOCK 1 — Split-Screen Hero (mirrored: image LEFT, text RIGHT)
          ───────────────────────────────────────────────────── */}
      <section className="pt-32 md:pt-40 pb-20 md:pb-28">
        <div className="max-w-[1440px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Left — image column (7/12), bleeds LEFT margin */}
            <motion.div
              initial={{ opacity: 0, x: -32 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
              className="lg:col-span-7 lg:order-1 relative"
            >
              <div className="relative aspect-[16/12] overflow-hidden rounded-r-2xl lg:rounded-r-3xl">
                <img
                  src="/images/automotive/automotive-hero-onuk-lift.jpg"
                  alt="Silver Renault Mégane raised on a 2-post hoist in a modern industrial workshop"
                  className="w-full h-full object-cover"
                />
                {/* Right-edge gradient dissolves into text column on lg+ */}
                <div className="hidden lg:block absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-bg to-transparent pointer-events-none" />
                {/* Corner label */}
                <div className="absolute top-6 left-6 md:top-8 md:left-8">
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-bg/85 backdrop-blur-sm">
                    <span className="block w-1.5 h-1.5 rounded-full bg-indigo-mid" />
                    <span className="text-[11px] uppercase tracking-[0.15em] text-text-primary">
                      Garage · Muscat
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right — text column (5/12) */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={revealVariants}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-5 lg:order-2 px-6 md:px-12 lg:pr-20 lg:pl-0"
            >
              <Wrench
                size={28}
                className="text-indigo-mid mb-6"
                strokeWidth={1.5}
              />
              <div className="flex items-center gap-2 mb-5">
                <span className="block w-6 h-px bg-indigo-accent" />
                <span className="text-[11px] uppercase tracking-[0.18em] text-text-muted">
                  Division 03
                </span>
              </div>
              <h1 className="font-display text-[56px] md:text-[72px] lg:text-[88px] font-medium text-text-primary leading-[0.95] tracking-[-0.02em]">
                Automotive
                <br />
                Servicing.
              </h1>
              <p className="mt-7 text-[17px] text-text-secondary leading-relaxed max-w-[460px]">
                Full-service garage operating across Muscat — routine
                maintenance, diagnostic repair, tires, battery, and
                detailing for petrol and diesel passenger vehicles.
              </p>
              <p className="mt-4 text-[15px] text-text-muted leading-relaxed max-w-[460px]">
                Free pickup and delivery within Muscat. Corporate maintenance
                contracts available for fleet operators.
              </p>

              {/* Stats strip */}
              <div className="mt-10 grid grid-cols-3 gap-6 max-w-[480px]">
                <div>
                  <div className="font-display text-2xl md:text-3xl font-medium text-text-primary leading-tight tracking-[-0.01em]">
                    Full service
                  </div>
                  <div className="mt-2 text-[11px] uppercase tracking-[0.15em] text-text-muted">
                    Routine to repair
                  </div>
                </div>
                <div>
                  <div className="font-display text-2xl md:text-3xl font-medium text-text-primary leading-tight tracking-[-0.01em]">
                    Pickup
                  </div>
                  <div className="mt-2 text-[11px] uppercase tracking-[0.15em] text-text-muted">
                    & delivery, Muscat
                  </div>
                </div>
                <div>
                  <div className="font-display text-2xl md:text-3xl font-medium text-text-primary leading-tight tracking-[-0.01em]">
                    Corporate
                  </div>
                  <div className="mt-2 text-[11px] uppercase tracking-[0.15em] text-text-muted">
                    Contracts available
                  </div>
                </div>
              </div>

              {/* CTA row */}
              <div className="mt-10 flex flex-col sm:flex-row gap-3">
                <a
                  href="/#contact"
                  className="inline-flex items-center justify-center px-6 py-3 text-[14px] font-medium text-text-primary border border-border rounded-full hover:border-indigo-mid hover:bg-indigo-mid/5 transition-colors duration-200 ease-out"
                >
                  Book a Service
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
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────
          BLOCK 2 — Four Service Capability Cards (2×2)
          ───────────────────────────────────────────────────── */}
      <section className="py-20 md:py-28">
        <div className="max-w-[1280px] mx-auto px-6 md:px-12 lg:px-20">
          <div className="mb-12 md:mb-16 max-w-[680px]">
            <div className="flex items-center gap-2 mb-5">
              <span className="block w-6 h-px bg-indigo-accent" />
              <span className="text-[11px] uppercase tracking-[0.18em] text-text-muted">
                Service capabilities
              </span>
            </div>
            <h2 className="font-display text-[36px] md:text-[48px] lg:text-[56px] font-medium text-text-primary leading-[1.05] tracking-[-0.02em]">
              Every service, one workshop.
            </h2>
            <p className="mt-5 text-[17px] text-text-secondary leading-relaxed">
              Four disciplines delivered under one roof. Pickup and delivery
              across Muscat means you don't need to leave your office.
            </p>
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            variants={cardContainer}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8"
          >
            {capabilities.map((c) => {
              const Icon = c.icon;
              return (
                <motion.article
                  key={c.index}
                  variants={revealVariants}
                  transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                  className="group rounded-2xl overflow-hidden border border-border bg-bg-pure transition-colors duration-300 ease-out hover:border-indigo-accent/40"
                >
                  {/* Image */}
                  <div className="relative aspect-[16/10] overflow-hidden bg-bg">
                    <img
                      src={c.image}
                      alt={c.imageAlt}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                    />
                  </div>

                  {/* Body */}
                  <div className="p-7 md:p-8">
                    <div className="flex items-center gap-3 mb-5">
                      <span
                        className="font-display text-2xl font-medium text-indigo-mid leading-none"
                        style={{ fontVariantNumeric: "tabular-nums" }}
                      >
                        {c.index}
                      </span>
                      <span className="block w-6 h-px bg-indigo-accent" />
                      <Icon
                        size={16}
                        strokeWidth={1.5}
                        className="text-text-muted"
                      />
                      <span className="text-[11px] uppercase tracking-[0.15em] text-text-muted">
                        Service {c.index}
                      </span>
                    </div>

                    <h3 className="font-display text-2xl md:text-3xl font-medium text-text-primary tracking-[-0.01em] mb-3">
                      {c.title}
                    </h3>
                    <p className="text-[15px] text-text-secondary leading-relaxed mb-6">
                      {c.body}
                    </p>

                    <ul className="pt-5 border-t border-border space-y-3">
                      {c.bullets.map((b) => (
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
          BLOCK 3 — Pickup & Delivery: 4 horizontal steps
          ───────────────────────────────────────────────────── */}
      <section className="py-20 md:py-28 bg-bg-pure">
        <div className="max-w-[1280px] mx-auto px-6 md:px-12 lg:px-20">
          <div className="mb-12 md:mb-16 max-w-[760px]">
            <div className="flex items-center gap-2 mb-5">
              <span className="block w-6 h-px bg-indigo-accent" />
              <span className="text-[11px] uppercase tracking-[0.18em] text-text-muted">
                Pickup & delivery
              </span>
            </div>
            <h2 className="font-display text-[36px] md:text-[48px] lg:text-[56px] font-medium text-text-primary leading-[1.05] tracking-[-0.02em]">
              From your office to ours. And back.
            </h2>
            <p className="mt-5 text-[17px] text-text-secondary leading-relaxed">
              Free pickup and delivery across Muscat. Same-day return for
              routine work; scheduled for major repairs.
            </p>
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={cardContainer}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 md:gap-6"
          >
            {pickupSteps.map((step) => (
              <motion.div
                key={step.index}
                variants={revealVariants}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <span
                    className="font-display text-xl font-medium text-indigo-mid leading-none"
                    style={{ fontVariantNumeric: "tabular-nums" }}
                  >
                    {step.index}
                  </span>
                  <span className="block w-6 h-px bg-indigo-accent" />
                </div>
                <h3 className="font-display text-xl md:text-2xl font-medium text-text-primary tracking-[-0.01em] mb-3">
                  {step.title}
                </h3>
                <p className="text-[14px] text-text-secondary leading-relaxed">
                  {step.body}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────
          BLOCK 4 — Corporate Maintenance CTA Strip
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
                  For companies
                </span>
              </div>
              <h2 className="font-display text-[36px] md:text-[48px] lg:text-[56px] font-medium text-text-light leading-[1.05] tracking-[-0.02em]">
                Service that scales with your fleet.
              </h2>
              <p className="mt-5 text-[17px] text-text-light/70 leading-relaxed max-w-[560px]">
                We service mixed-make vehicle pools across Muscat — pool cars,
                light commercial fleets, executive fleets. One contract,
                predictable invoicing, accountable turnaround.
              </p>
            </div>

            <div className="lg:col-span-5 flex flex-col sm:flex-row lg:justify-end gap-3">
              {/* TODO: Replace href="#" with real /docs/corporate-brief.pdf
                  once the brochure exists. */}
              <a
                href="#"
                className="inline-flex items-center justify-center px-6 py-3 text-[14px] font-medium text-text-light border border-text-light/30 rounded-full hover:border-text-light hover:bg-text-light/5 transition-colors duration-200 ease-out"
              >
                Download Corporate Brief
              </a>
              <a
                href="https://wa.me/96898540055"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-center gap-1.5 px-6 py-3 text-[14px] font-medium text-white bg-indigo-mid rounded-full hover:bg-indigo-light transition-colors duration-200 ease-out"
              >
                Talk to Us
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
