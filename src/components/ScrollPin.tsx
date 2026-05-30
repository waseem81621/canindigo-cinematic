import { useRef, useEffect, ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ScrollPinProps {
  children: ReactNode;
  className?: string;
  pinDuration?: number;
}

export function ScrollPin({ children, className = "", pinDuration = 1 }: ScrollPinProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;
    if (!section || !content) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        content,
        { opacity: 0.3, scale: 0.92, y: 60 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            end: `+=${pinDuration * 100}%`,
            scrub: 1,
            pin: false,
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, [pinDuration]);

  return (
    <div ref={sectionRef} className={className}>
      <div ref={contentRef}>{children}</div>
    </div>
  );
}

interface HorizontalScrollProps {
  children: ReactNode[];
  className?: string;
}

export function HorizontalScroll({ children, className = "" }: HorizontalScrollProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const track = trackRef.current;
    if (!container || !track) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const cards = track.children;
    const totalWidth = track.scrollWidth - container.offsetWidth;

    const ctx = gsap.context(() => {
      gsap.to(track, {
        x: -totalWidth,
        ease: "none",
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: () => `+=${totalWidth}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      gsap.fromTo(
        cards,
        { opacity: 0.4, scale: 0.9 },
        {
          opacity: 1,
          scale: 1,
          stagger: 0.1,
          scrollTrigger: {
            trigger: container,
            start: "top center",
            end: () => `+=${totalWidth * 0.5}`,
            scrub: 1,
          },
        }
      );
    }, container);

    return () => ctx.revert();
  }, [children.length]);

  return (
    <div ref={containerRef} className={`overflow-hidden ${className}`}>
      <div ref={trackRef} className="flex gap-6 w-max">
        {children}
      </div>
    </div>
  );
}
