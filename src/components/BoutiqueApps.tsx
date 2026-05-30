import {
  Users,
  Building2,
  ClipboardList,
  Zap,
  Truck,
  Receipt,
  ArrowUpRight,
} from "lucide-react";
import { CardDeck } from "./CardDeck";
import { boutiqueApps } from "../data/siteData";

const iconMap: Record<string, React.ComponentType<{ size?: number; strokeWidth?: number; className?: string }>> = {
  Users,
  Building2,
  ClipboardList,
  Zap,
  Truck,
  Receipt,
};

/**
 * 2026-05-26 (v2): Boutique Apps section rebuilt around CardDeck.
 *
 * The earlier StudioShowcaseStack pass overlapped cards too aggressively
 * with text-heavy content — the middle of the fan became an unreadable
 * pile-up, and the hover zones between overlapping cards caused flicker
 * (cursor crossing two cards toggled `hoveredIndex` rapidly between them).
 *
 * CardDeck solves both: each card peeks a fixed amount from behind the
 * previous one (~18% of width), so the visible hover strip per card is
 * its own column with no overlap fighting. Hover any card and it lifts
 * straight UP — the others stay put — so there's no chain-reaction or
 * cross-talk between adjacent hover zones.
 *
 * Sized for 6 cards: 280×400 each, total deck ~531px wide (well inside
 * the 1280px container). Coming-Soon WPS/VAT card gets a "Coming Soon"
 * pill instead of the live-demo button.
 */
export function BoutiqueApps() {
  const cards = boutiqueApps.map((app) => {
    const Icon = iconMap[app.icon];
    const isComingSoon = app.comingSoon === true;
    const hasImage = !!app.image;

    return {
      id: app.id,
      content: (
        <div className="relative w-full h-full overflow-hidden">
          {/* Background: app screenshot if available, otherwise the indigo
              gradient supplied by CardDeck (no extra layer needed since
              the CardDeck parent paints the gradient). */}
          {hasImage && (
            <img
              src={app.image as string}
              alt={`${app.name} screenshot`}
              loading="lazy"
              decoding="async"
              className="absolute inset-0 w-full h-full object-cover"
              onError={(e) => {
                // If image fails, hide it so the gradient shows through.
                (e.currentTarget as HTMLImageElement).style.display = "none";
              }}
            />
          )}

          {/* Dark gradient at the bottom for text legibility over the image.
              When there's no image, the indigo gradient already provides
              enough contrast — but the dark overlay helps with the icon
              badge readability too, so we keep it light on gradient cards. */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: hasImage
                ? "linear-gradient(to top, rgba(25,22,45,0.92) 0%, rgba(25,22,45,0.55) 45%, rgba(25,22,45,0.15) 100%)"
                : "linear-gradient(to top, rgba(25,22,45,0.35) 0%, rgba(25,22,45,0.10) 50%, transparent 100%)",
            }}
          />

          {/* Foreground content */}
          <div className="relative h-full flex flex-col justify-between p-6 md:p-7 text-white">
            {/* Top: icon + status pill */}
            <div className="flex items-start justify-between">
              <div className="w-11 h-11 rounded-xl bg-white/15 backdrop-blur-md flex items-center justify-center border border-white/20">
                {Icon && <Icon size={20} strokeWidth={1.5} className="text-white" />}
              </div>
              {isComingSoon && (
                <span className="px-2.5 py-1 rounded-full text-[9px] font-semibold uppercase tracking-[0.15em] bg-white/15 backdrop-blur-sm border border-white/20">
                  Soon
                </span>
              )}
            </div>

            {/* Bottom: subtitle + name + description + CTA */}
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/80 mb-1.5">
                {app.subtitle}
              </p>
              <h3 className="text-[22px] md:text-2xl font-bold tracking-tight leading-[1.1] mb-3">
                {app.name}
              </h3>
              <p className="text-[11px] md:text-[12px] text-white/90 leading-snug mb-4 line-clamp-3">
                {app.description}
              </p>

              {!isComingSoon && app.href !== "#" && (
                <a
                  href={app.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-semibold bg-white text-indigo-mid hover:bg-white/95 transition-colors"
                >
                  View Live Demo
                  <ArrowUpRight size={11} />
                </a>
              )}
            </div>
          </div>
        </div>
      ),
    };
  });

  return (
    <section className="py-20 md:py-28 relative overflow-hidden">
      <div className="absolute inset-0 bg-bg" />
      <div
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, var(--color-text-primary) 1px, transparent 0)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative z-10 max-w-[1280px] mx-auto px-6 md:px-12 lg:px-20">
        <div className="mb-12 md:mb-16">
          <h2 className="text-[32px] md:text-[42px] lg:text-[48px] font-semibold text-text-primary leading-[1.1] tracking-[-0.01em] max-w-[700px]">
            Boutique apps built for Omani enterprise.
          </h2>
          <p className="mt-5 text-[17px] text-text-secondary leading-relaxed max-w-[560px]">
            Six production-ready platforms. Each crafted for a specific
            operational need — deployed, maintained, and supported by our team.
            Hover any card to lift it.
          </p>
        </div>

        <CardDeck
          cards={cards}
          cardWidth={280}
          cardHeight={400}
          step={0.6}
          hoverLift={36}
          borderRadius={20}
        />
      </div>
    </section>
  );
}
