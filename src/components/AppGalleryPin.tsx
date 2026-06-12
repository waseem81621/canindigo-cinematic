import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Users,
  Building2,
  ClipboardList,
  Zap,
  Truck,
  Receipt,
  ArrowUpRight,
} from "lucide-react";
import { boutiqueApps, appsGalleryContent } from "../data/siteData";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const iconMap: Record<
  string,
  React.ComponentType<{ size?: number; strokeWidth?: number; className?: string }>
> = { Users, Building2, ClipboardList, Zap, Truck, Receipt };

function AppPanel({
  app,
  panelClass = "",
}: {
  app: (typeof boutiqueApps)[0];
  panelClass?: string;
}) {
  const Icon = iconMap[app.icon];
  const isComingSoon = app.comingSoon === true;

  return (
    <div
      className={`relative shrink-0 rounded-2xl overflow-hidden border border-border bg-bg-pure ${panelClass}`}
    >
      {/* Upper: screenshot or brand gradient */}
      <div className="relative h-[58%] overflow-hidden">
        {app.image ? (
          <img
            src={app.image}
            alt={`${app.name} screenshot`}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover"
          />
        ) : (
          <div
            className="w-full h-full"
            style={{
              background:
                "linear-gradient(135deg, var(--color-indigo-deep) 0%, var(--color-indigo-mid) 60%, var(--color-indigo-light) 100%)",
            }}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-bg-dark/55 to-transparent pointer-events-none" />

        {/* Pillar tag — the narrative bridge back to the chapters. */}
        <span className="absolute top-4 left-4 px-3 py-1.5 rounded-full text-[10px] font-semibold uppercase tracking-[0.14em] bg-bg-dark/55 text-text-light backdrop-blur-sm border border-white/10">
          {app.pillar}
        </span>
        {isComingSoon && (
          <span className="absolute top-4 right-4 px-3 py-1.5 rounded-full text-[10px] font-semibold uppercase tracking-[0.14em] bg-white/15 text-white backdrop-blur-sm border border-white/20">
            Coming Soon
          </span>
        )}
      </div>

      {/* Lower: content */}
      <div className="h-[42%] p-6 xl:p-7 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-3 mb-2.5">
            <div className="w-9 h-9 rounded-lg bg-indigo-mid/15 flex items-center justify-center">
              {Icon && (
                <Icon size={17} strokeWidth={1.5} className="text-indigo-light" />
              )}
            </div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-text-muted">
              {app.subtitle}
            </p>
          </div>
          <h3 className="font-display text-[22px] xl:text-[26px] font-bold text-text-primary tracking-tight leading-tight mb-2">
            {app.name}
          </h3>
          <p className="text-[13px] text-text-secondary leading-snug line-clamp-2">
            {app.description}
          </p>
        </div>

        {!isComingSoon && app.href !== "#" && (
          <a
            href={app.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-indigo-light hover:text-indigo-accent transition-colors w-fit"
          >
            View Live Demo
            <ArrowUpRight size={13} />
          </a>
        )}
      </div>
    </div>
  );
}

/**
 * AppGalleryPin — Act II's horizontal gallery. The section pins for the
 * width of the track while the six app panels translate horizontally —
 * vertical scroll becomes lateral motion. Each panel carries a pillar tag
 * tying the product back to its service chapter.
 *
 * Desktop + motion-safe only; below lg (or reduced motion) the same panels
 * render as a scroll-snap row — the proven CardDeckSpread mobile pattern.
 */
export function AppGalleryPin() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(
        "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
        () => {
          const track = trackRef.current;
          const stage = sectionRef.current?.querySelector(".gallery-stage");
          if (!track || !stage) return;

          const distance = () => track.scrollWidth - window.innerWidth;

          gsap.to(track, {
            x: () => -distance(),
            ease: "none",
            scrollTrigger: {
              trigger: stage,
              start: "top top",
              end: () => "+=" + distance(),
              pin: true,
              scrub: true,
              anticipatePin: 1,
              invalidateOnRefresh: true,
            },
          });
        }
      );
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="relative">
      {/* ── Desktop: pinned horizontal track ── */}
      <div className="gallery-stage hidden lg:motion-safe:flex h-[100dvh] flex-col justify-center overflow-hidden">
        <div className="max-w-[1280px] mx-auto px-6 md:px-12 lg:px-20 w-full mb-10">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-text-muted mb-3">
            {appsGalleryContent.eyebrow}
          </p>
          <h2 className="font-display text-[36px] xl:text-[44px] font-semibold text-text-primary leading-[1.1] tracking-[-0.01em]">
            {appsGalleryContent.heading}
          </h2>
          <p className="mt-3 text-[15px] text-text-secondary max-w-[560px]">
            {appsGalleryContent.sub}
          </p>
        </div>

        <div
          ref={trackRef}
          className="flex gap-6 pl-[max(1.5rem,calc((100vw-1280px)/2+5rem))] pr-24 will-change-transform"
        >
          {boutiqueApps.map((app) => (
            <AppPanel
              key={app.id}
              app={app}
              panelClass="w-[clamp(380px,30vw,560px)] h-[min(58vh,560px)]"
            />
          ))}
        </div>
      </div>

      {/* ── Mobile / reduced-motion: scroll-snap row ── */}
      <div className="lg:motion-safe:hidden py-20 md:py-24">
        <div className="max-w-[1280px] mx-auto px-6 md:px-12 lg:px-20 mb-10">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-text-muted mb-3">
            {appsGalleryContent.eyebrow}
          </p>
          <h2 className="font-display text-[30px] md:text-[38px] font-semibold text-text-primary leading-[1.1] tracking-[-0.01em]">
            {appsGalleryContent.heading}
          </h2>
          <p className="mt-3 text-[15px] text-text-secondary max-w-[560px]">
            {appsGalleryContent.sub}
          </p>
        </div>
        <div
          className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 px-6"
          style={{ scrollPaddingLeft: "1.5rem" }}
        >
          {boutiqueApps.map((app) => (
            <AppPanel
              key={app.id}
              app={app}
              panelClass="snap-start w-[78vw] max-w-[420px] h-[480px]"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
