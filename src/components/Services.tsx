import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Server,
  Shield,
  Cpu,
  Wifi,
  Lock,
  Cloud,
  BarChart3,
  Globe,
  Database,
  HardDrive,
  Package,
  LifeBuoy,
} from "lucide-react";
import { BreathingHeadline } from "./BreathingText";
import { ImageReveal } from "./ImageReveal";
import { CardDeckSpread } from "./CardDeckSpread";
import { mainServices, detailedServices } from "../data/siteData";

gsap.registerPlugin(ScrollTrigger);

const iconMap: Record<string, React.ComponentType<any>> = {
  Server,
  Shield,
  Cpu,
  Wifi,
  Lock,
  Cloud,
  BarChart3,
  Globe,
  Database,
  HardDrive,
  Package,
  LifeBuoy,
};

function ServicePillar({
  service,
  index,
}: {
  service: (typeof mainServices)[0];
  index: number;
}) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const isReversed = index % 2 === 1;
  const Icon = iconMap[service.icon];

  useEffect(() => {
    const section = sectionRef.current;
    const image = imageRef.current;
    const content = contentRef.current;
    if (!section || !image || !content) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        image,
        { x: isReversed ? 80 : -80, opacity: 0, scale: 0.95 },
        {
          x: 0,
          opacity: 1,
          scale: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 75%",
            toggleActions: "play none none none",
          },
        }
      );

      gsap.fromTo(
        content.children,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section,
            start: "top 70%",
            toggleActions: "play none none none",
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, [isReversed]);

  return (
    <div
      ref={sectionRef}
      className={`grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center ${
        index > 0 ? "mt-16 md:mt-24" : ""
      }`}
    >
      <div ref={imageRef} className={isReversed ? "lg:order-2" : ""}>
        <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
          <ImageReveal
            src={service.image}
            alt={service.title}
            className="absolute inset-0"
            direction={isReversed ? "right" : "left"}
            delay={0.2}
            duration={1.4}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-text-primary/30 to-transparent pointer-events-none" />
        </div>
      </div>

      <div className={isReversed ? "lg:order-1" : ""}>
        <div ref={contentRef}>
          <div className="flex items-center gap-3 mb-5">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ backgroundColor: `${service.accent}12` }}
            >
              {Icon && <Icon size={20} style={{ color: service.accent }} strokeWidth={1.5} />}
            </div>
            <span
              className="text-[11px] font-bold uppercase tracking-[0.15em]"
              style={{ color: service.accent }}
            >
              Pillar {String(index + 1).padStart(2, "0")}
            </span>
          </div>

          <h3 className="text-3xl md:text-4xl font-bold text-text-primary tracking-tight mb-4">
            {service.title}
          </h3>

          <p className="text-[16px] md:text-[17px] text-text-secondary leading-[1.7] mb-6">
            {service.description}
          </p>

          <ul className="space-y-3 mb-8">
            {service.features.map((feature) => (
              <li
                key={feature}
                className="flex items-center gap-3 text-[16px] md:text-[17px] text-text-secondary"
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
      </div>
    </div>
  );
}

export function Services() {
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        header.querySelectorAll(".gsap-reveal"),
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: header,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );
    }, header);

    return () => ctx.revert();
  }, []);

  return (
    <section id="services" className="py-20 md:py-28 overflow-x-hidden">
      <div className="max-w-[1280px] mx-auto px-6 md:px-12 lg:px-20">
        <div ref={headerRef} className="mb-14 md:mb-20">
          <div className="gsap-reveal">
            <BreathingHeadline className="text-[32px] md:text-[48px] lg:text-[56px] text-text-primary leading-[1.05] tracking-[-0.02em] max-w-[700px]">
              Three pillars of enterprise technology excellence.
            </BreathingHeadline>
          </div>
        </div>

        <div>
          {mainServices.map((service, i) => (
            <ServicePillar key={service.title} service={service} index={i} />
          ))}
        </div>

        <div className="mt-20 md:mt-28">
          <div className="mb-10 md:mb-12 flex flex-col md:flex-row md:items-end md:justify-between gap-3">
            <h2 className="text-[28px] md:text-[36px] font-bold text-text-primary leading-[1.1] tracking-[-0.01em]">
              Tailored for your environment.
            </h2>
            <p className="text-[13px] text-text-muted hidden md:block">
              Hover any card to expand.
            </p>
          </div>

          <CardDeckSpread
            cards={detailedServices.map((svc) => ({
              src: svc.image,
              alt: svc.title,
              title: svc.title,
              subtitle: svc.tagline,
            }))}
          />
        </div>
      </div>
    </section>
  );
}
