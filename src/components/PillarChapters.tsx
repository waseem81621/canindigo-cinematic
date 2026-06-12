import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Server, Shield, Cpu } from "lucide-react";
import { mainServices } from "../data/siteData";
import { ChapterNumeral } from "./ChapterNumeral";
import { NodeNetworkCanvas } from "./NodeNetworkCanvas";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const iconMap: Record<
  string,
  React.ComponentType<{ size?: number; strokeWidth?: number; style?: React.CSSProperties }>
> = { Server, Shield, Cpu };

// Relative timeline units — scrub normalizes them across the +=300% pin.
const HOLD = 1;
const SWAP = 0.8;

/**
 * PillarChapters — the engine room's pinned chapter sequence (desktop).
 *
 * One viewport-height stage pins for +=300% of scroll while the three
 * service pillars play as scrubbed chapters: a hollow ~30vw numeral drifts
 * behind, content staggers in, the pillar image wipes open from a masked
 * panel, and a 3-dot rail tracks progress. Chapter handoffs slide the
 * outgoing content up while the next rises.
 *
 * Rendered ONLY at lg + motion-safe (Services.tsx gates the markup with the
 * same condition this component's gsap.matchMedia uses). Mobile and
 * reduced-motion users get the original alternating ServicePillar layout.
 */
export function PillarChapters() {
  const stageRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(
        "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
        () => {
          const chapters = gsap.utils.toArray<HTMLElement>(
            ".pillar-chapter",
            stageRef.current
          );
          const numerals = gsap.utils.toArray<HTMLElement>(
            ".pillar-numeral",
            stageRef.current
          );
          const dots = gsap.utils.toArray<HTMLElement>(
            ".pillar-dot",
            stageRef.current
          );

          // Initial stage: chapter 1 visible, the rest waiting.
          chapters.forEach((ch, i) => {
            if (i > 0) gsap.set(ch, { autoAlpha: 0, y: 60 });
          });
          numerals.forEach((n, i) => {
            if (i > 0) gsap.set(n, { autoAlpha: 0, xPercent: 8 });
          });
          gsap.set(dots[0], { opacity: 1, scale: 1.4 });

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: stageRef.current,
              start: "top top",
              end: "+=300%",
              pin: true,
              scrub: true,
              anticipatePin: 1,
            },
          });

          chapters.forEach((ch, i) => {
            const content = ch.querySelectorAll(".chapter-stagger");
            const imgWrap = ch.querySelector(".chapter-image");
            const at = i * (HOLD + SWAP);

            if (i === 0) {
              // Opening chapter: image wipes open as the pin catches.
              if (imgWrap) {
                tl.fromTo(
                  imgWrap,
                  { clipPath: "inset(0% 40% 0% 0%)", scale: 1.1 },
                  {
                    clipPath: "inset(0% 0% 0% 0%)",
                    scale: 1,
                    ease: "none",
                    duration: 0.45,
                  },
                  0
                );
              }
            } else {
              const prev = chapters[i - 1];
              tl.to(
                prev,
                { autoAlpha: 0, y: -60, ease: "none", duration: SWAP * 0.5 },
                at
              )
                .to(
                  numerals[i - 1],
                  {
                    autoAlpha: 0,
                    xPercent: -8,
                    ease: "none",
                    duration: SWAP * 0.5,
                  },
                  at
                )
                .to(
                  dots[i - 1],
                  { opacity: 0.3, scale: 1, ease: "none", duration: 0.1 },
                  at
                )
                .to(
                  dots[i],
                  { opacity: 1, scale: 1.4, ease: "none", duration: 0.1 },
                  at
                )
                .fromTo(
                  ch,
                  { autoAlpha: 0, y: 60 },
                  { autoAlpha: 1, y: 0, ease: "none", duration: SWAP * 0.5 },
                  at + SWAP * 0.4
                )
                .fromTo(
                  numerals[i],
                  { autoAlpha: 0, xPercent: 8 },
                  {
                    autoAlpha: 1,
                    xPercent: 0,
                    ease: "none",
                    duration: SWAP * 0.5,
                  },
                  at + SWAP * 0.4
                );

              if (imgWrap) {
                tl.fromTo(
                  imgWrap,
                  { clipPath: "inset(0% 40% 0% 0%)", scale: 1.08 },
                  {
                    clipPath: "inset(0% 0% 0% 0%)",
                    scale: 1,
                    ease: "none",
                    duration: 0.45,
                  },
                  at + SWAP * 0.5
                );
              }
              tl.fromTo(
                content,
                { y: 36, autoAlpha: 0 },
                {
                  y: 0,
                  autoAlpha: 1,
                  ease: "none",
                  stagger: 0.05,
                  duration: 0.35,
                },
                at + SWAP * 0.5
              );
            }

            // Slow horizontal drift on the active numeral during its hold —
            // the chapter keeps breathing while the visitor reads.
            tl.to(
              numerals[i],
              { xPercent: -6, ease: "none", duration: HOLD },
              at + (i === 0 ? 0 : SWAP)
            );
          });

          // Tail beat so the last chapter holds before the pin releases.
          tl.to({}, { duration: 0.5 });
        }
      );
    },
    { scope: stageRef }
  );

  return (
    <div
      ref={stageRef}
      className="relative h-[100dvh] overflow-hidden"
      aria-label="Service pillars"
    >
      {/* Ambient constellation — denser, mouse-aware canvas evolution of the
          hero's node network. */}
      <NodeNetworkCanvas
        className="absolute inset-0 w-full h-full opacity-30"
        density={130}
        color="#8A6DE8"
        intensity={0.8}
        seed={61}
      />

      {/* Oversized hollow numerals, stacked in the same spot behind the
          content; the timeline crossfades them per chapter. */}
      <div
        className="absolute right-[3vw] top-1/2 -translate-y-1/2 h-[52vh] flex items-center pointer-events-none"
        aria-hidden="true"
      >
        {mainServices.map((s, i) => (
          <ChapterNumeral
            key={s.title}
            value={`0${i + 1}`}
            className="pillar-numeral absolute right-0 top-1/2 -translate-y-1/2"
          />
        ))}
      </div>

      {/* Chapters — absolutely stacked compositions. */}
      {mainServices.map((service, i) => {
        const Icon = iconMap[service.icon];
        return (
          <div
            key={service.title}
            className="pillar-chapter absolute inset-0 flex items-center"
          >
            <div className="max-w-[1280px] mx-auto px-6 md:px-12 lg:px-20 w-full grid grid-cols-12 gap-8 items-center">
              <div className="col-span-5">
                <div className="chapter-stagger flex items-center gap-3 mb-6">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: `${service.accent}1f` }}
                  >
                    {Icon && (
                      <Icon
                        size={20}
                        strokeWidth={1.5}
                        style={{ color: service.accent }}
                      />
                    )}
                  </div>
                  <span
                    className="text-[11px] font-bold uppercase tracking-[0.2em]"
                    style={{ color: service.accent }}
                  >
                    Chapter {String(i + 1).padStart(2, "0")}
                  </span>
                </div>

                <h3 className="chapter-stagger font-display text-[40px] xl:text-[48px] font-bold text-text-primary tracking-tight leading-[1.05] mb-5">
                  {service.title}
                </h3>

                <p className="chapter-stagger text-[16px] xl:text-[17px] text-text-secondary leading-[1.7] mb-7 max-w-[460px]">
                  {service.description}
                </p>

                <ul className="space-y-3">
                  {service.features.map((feature) => (
                    <li
                      key={feature}
                      className="chapter-stagger flex items-center gap-3 text-[15px] xl:text-[16px] text-text-secondary"
                    >
                      <span
                        className="w-1.5 h-1.5 rounded-full shrink-0"
                        style={{ backgroundColor: service.accent }}
                      />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="col-span-6 col-start-7">
                <div
                  className="chapter-image relative aspect-[4/3] rounded-2xl overflow-hidden max-h-[56vh]"
                  style={{ clipPath: "inset(0% 0% 0% 0%)" }}
                >
                  <img
                    src={service.image}
                    alt={service.title}
                    loading={i === 0 ? "eager" : "lazy"}
                    decoding="async"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-bg-dark/45 to-transparent pointer-events-none" />
                </div>
              </div>
            </div>
          </div>
        );
      })}

      {/* Progress rail */}
      <div
        className="absolute right-7 top-1/2 -translate-y-1/2 flex flex-col items-center gap-3"
        aria-hidden="true"
      >
        {mainServices.map((s) => (
          <span
            key={s.title}
            className="pillar-dot w-2 h-2 rounded-full bg-text-light opacity-30"
          />
        ))}
      </div>
    </div>
  );
}
