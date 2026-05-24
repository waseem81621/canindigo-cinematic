import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Server,
  Shield,
  Cpu,
  ArrowRight,
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
import { StaggerContainer, StaggerItem } from "./AnimatedSection";
import { BreathingHeadline } from "./BreathingText";
import { MagneticButton } from "./MagneticButton";
import { GlassButton } from "./GlassButton";
import { ImageReveal } from "./ImageReveal";
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
      <div ref={imageRef} className={`${isReversed ? "lg:order-2" : ""} opacity-0`}>
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
                className="flex items-center gap-3 text-[14px] text-text-secondary"
              >
                <span
                  className="w-1.5 h-1.5 rounded-full shrink-0"
                  style={{ backgroundColor: service.accent }}
                />
                {feature}
              </li>
            ))}
          </ul>

          <MagneticButton>
            <GlassButton variant="secondary" size="md" icon={<ArrowRight size={15} />}>
              Learn more
            </GlassButton>
          </MagneticButton>
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
          <div className="mb-12">
            <h2 className="text-[28px] md:text-[36px] font-bold text-text-primary leading-[1.1] tracking-[-0.01em]">
              Tailored for your environment.
            </h2>
          </div>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {detailedServices.map((service) => {
              const Icon = iconMap[service.icon];
              return (
                <StaggerItem key={service.title}>
                  <motion.div
                    className="group flex items-center gap-5 md:gap-8 bg-bg-pure rounded-2xl border border-border p-7 md:p-8 transition-colors duration-300 ease-out hover:border-indigo-accent/30 hover:shadow-[0_8px_30px_-10px_rgba(25,22,45,0.08)]"
                    whileHover={{ x: 4 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="w-12 h-12 rounded-xl bg-bg flex items-center justify-center shrink-0 transition-colors duration-300 ease-out group-hover:bg-indigo-mid/10">
                      {Icon && (
                        <Icon
                          size={22}
                          className="text-text-secondary transition-colors duration-300 ease-out group-hover:text-indigo-mid"
                          strokeWidth={1.5}
                        />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-semibold text-text-primary mb-1 tracking-tight">
                        {service.title}
                      </h3>
                      <p className="text-[14px] text-text-secondary leading-relaxed">
                        {service.tagline}
                      </p>
                      <p className="mt-1.5 text-[11px] text-text-muted">
                        {service.clients}
                      </p>
                    </div>
                    <ArrowRight
                      size={18}
                      className="hidden md:block text-text-muted/30 group-hover:text-indigo-mid group-hover:translate-x-1 transition-colors duration-300 ease-out shrink-0"
                    />
                  </motion.div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </div>
    </section>
  );
}
