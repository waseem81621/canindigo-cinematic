/**
 * VerticalsSelector — "Three divisions. One standard."
 *
 * Sits directly below the hero. Three cards in a md:grid-cols-3 layout:
 *  - Card 1 (ICT)        → anchor scroll to #ict on the homepage
 *  - Card 2 (Interiors)  → /interiors  (Phase 5.5 will upgrade <a> → <Link>)
 *  - Card 3 (Automotive) → /automotive (Phase 5.5 will upgrade <a> → <Link>)
 */

/*
 * Image credits (Unsplash, license-permissive):
 * - ict-servers.jpg: Taylor Vick (photo-1558494949-ef010cbdcc31)
 * - interiors-timber-ceiling.jpg: R Architecture (photo-1618220179428-22790b461013)
 * - automotive-workshop-hoist.jpg: Mehmet Talha Onuk (photo-1727893119356-1702fe921cf9)
 * TODO: Replace with own project photography once available.
 */
const verticals = [
  {
    number: "Division 01",
    name: "ICT Services",
    sub: "Managed infrastructure, cybersecurity, and digital transformation for Oman's enterprises.",
    href: "#ict",
    kind: "anchor" as const,
    imageAlt: "Server rack / data centre detail",
    imageSrc: "/images/verticals/ict-servers.jpg" as string | null,
  },
  {
    number: "Division 02",
    name: "Interior Decoration",
    sub: "False ceilings, premium finishes, lighting, and decorative joinery for executive and residential interiors.",
    href: "/interiors",
    // TODO Phase 5.5: replace <a> with <Link to={href}> from react-router-dom
    kind: "route" as const,
    imageAlt: "Warm timber-clad interior detail",
    imageSrc: "/images/verticals/interiors-timber-ceiling.jpg" as string | null,
  },
  {
    number: "Division 03",
    name: "Automotive Servicing",
    sub: "Full-service garage with collection and delivery across Muscat. Corporate maintenance contracts available.",
    href: "/automotive",
    // TODO Phase 5.5: replace <a> with <Link to={href}> from react-router-dom
    kind: "route" as const,
    imageAlt: "Clean workshop / vehicle on hoist",
    imageSrc: "/images/verticals/automotive-workshop-hoist.jpg" as string | null,
  },
];

export function VerticalsSelector() {
  return (
    <section className="py-20 md:py-28">
      <div className="max-w-[1280px] mx-auto px-6 md:px-12 lg:px-20">
        <div className="mb-12 md:mb-16 max-w-[680px]">
          <h2 className="text-[32px] md:text-[42px] lg:text-[48px] font-semibold text-text-primary leading-[1.1] tracking-[-0.01em]">
            Three divisions. One standard.
          </h2>
          <p className="mt-5 text-[17px] text-text-secondary leading-relaxed">
            From enterprise IT systems to executive interiors to corporate
            vehicle maintenance — built and operated under one Riyada SME
            registration.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
          {verticals.map((v) => (
            <a
              key={v.number}
              href={v.href}
              className="group relative block aspect-[4/5] rounded-2xl overflow-hidden border border-border bg-bg-pure transition-colors duration-300 ease-out hover:border-indigo-accent/40"
            >
              {/* Image / placeholder */}
              <div className="absolute inset-0 overflow-hidden">
                {v.imageSrc ? (
                  <img
                    src={v.imageSrc}
                    alt={v.imageAlt}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-bg">
                    <span className="text-[11px] uppercase tracking-[0.15em] text-text-muted/60 text-center px-6">
                      {v.imageAlt} — image pending
                    </span>
                  </div>
                )}
              </div>

              {/* Bottom-up dark overlay so caption stays readable */}
              <div className="absolute inset-0 bg-gradient-to-t from-text-primary/85 via-text-primary/30 to-transparent pointer-events-none" />

              {/* Caption — bottom-left */}
              <div className="absolute inset-x-0 bottom-0 p-6 md:p-7">
                <div className="flex items-center gap-2 mb-3">
                  <span className="block w-6 h-px bg-indigo-accent" />
                  <span className="text-[11px] uppercase tracking-[0.15em] text-white/70">
                    {v.number}
                  </span>
                </div>
                <h3 className="font-display text-2xl md:text-3xl font-medium text-white tracking-tight mb-2">
                  {v.name}
                </h3>
                <p className="text-[13px] text-white/70 leading-relaxed max-w-[280px]">
                  {v.sub}
                </p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
