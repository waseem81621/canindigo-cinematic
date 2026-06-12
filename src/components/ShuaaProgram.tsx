import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Sparkles } from "lucide-react";
import { LineReveal } from "./TextReveal";
import { shuaaContent } from "../data/siteData";

/**
 * ShuaaProgram — THE RESURFACE (Act II → Act III).
 *
 * Shuaa (شعاع) is Arabic for "a ray of light" — and this section IS the
 * site's dark→light transition: the section opens continuous with the dark
 * act, and as the visitor scrolls through it the fixed act layer scrubs
 * back to cream (the data-act-boundary attributes on the section drive
 * ActBackground). Dawn breaks while the human story plays. A soft light
 * beam sweeps across the video card on the same scroll.
 *
 * `act-dark` keeps the copy on light tokens and provides the opaque dark
 * fallback under reduced motion.
 */
export function ShuaaProgram() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // The dawn ray: a soft diagonal beam sweeping across the video card as
  // the section scrolls through the viewport.
  const beamX = useTransform(scrollYProgress, [0.15, 0.75], ["-80%", "180%"]);

  return (
    <section
      ref={sectionRef}
      data-act-boundary="light"
      data-act-start="top 45%"
      data-act-end="bottom 30%"
      className="act-dark py-20 md:py-28 relative overflow-hidden"
    >
      <div
        className="absolute inset-0 opacity-25 pointer-events-none"
        style={{
          backgroundImage: `url(${shuaaContent.ambientImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "blur(40px) saturate(0.6)",
        }}
      />
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      <div className="relative z-10 max-w-[1280px] mx-auto px-6 md:px-12 lg:px-20">
        <div className="text-center mb-12 md:mb-16">
          {/* The narrative key of the whole resurface. */}
          <LineReveal direction="up">
            <p className="font-display text-[18px] md:text-[22px] text-indigo-light/90 tracking-wide mb-7">
              Shuaa — شعاع — &ldquo;a ray of light.&rdquo;
            </p>
          </LineReveal>

          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6">
            <Sparkles size={14} className="text-indigo-accent" />
            <span className="text-[11px] font-semibold text-white/50 uppercase tracking-[0.15em]">
              {shuaaContent.badge}
            </span>
          </div>
          <h2 className="text-[32px] md:text-[48px] lg:text-[56px] font-bold text-white leading-[1.05] tracking-[-0.02em]">
            {shuaaContent.headline}
          </h2>
          <p className="mt-4 text-[15px] md:text-[17px] text-white/40 max-w-[520px] mx-auto leading-relaxed">
            {shuaaContent.subheadline}
          </p>
        </div>

        <div>
          <div className="relative mx-auto max-w-[900px]">
            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-[70%] h-32 bg-indigo-mid/15 blur-[80px] rounded-full" />
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-[50%] h-20 bg-indigo-light/10 blur-[60px] rounded-full" />

            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="relative"
            >
              <div className="relative rounded-xl md:rounded-2xl overflow-hidden bg-black border border-white/10 shadow-2xl">
                <div className="relative aspect-video overflow-hidden">
                  <video
                    controls
                    preload="none"
                    playsInline
                    poster="/images/shuaa-poster.jpg"
                    className="absolute inset-0 w-full h-full object-contain bg-black"
                  >
                    <source src={shuaaContent.videoUrl} type="video/mp4" />
                  </video>

                  {/* The dawn beam — sweeps with the scroll, never blocks
                      the video controls. */}
                  <motion.div
                    aria-hidden="true"
                    className="absolute inset-y-[-20%] w-[34%] pointer-events-none"
                    style={{
                      x: beamX,
                      rotate: 14,
                      background:
                        "linear-gradient(90deg, transparent 0%, rgba(248,246,243,0.13) 45%, rgba(138,109,232,0.10) 55%, transparent 100%)",
                      filter: "blur(6px)",
                    }}
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        <div>
          <div className="mt-14 md:mt-20 max-w-[720px] mx-auto text-center">
            <div className="p-8 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-sm">
              <p className="text-[17px] md:text-lg text-white/60 leading-[1.8] font-light">
                {shuaaContent.description}
              </p>
              <div className="mt-6 flex items-center justify-center gap-3">
                <div className="w-5 h-3 rounded-sm bg-gradient-to-r from-red-600 to-red-500" />
                <span className="text-[12px] text-white/30">
                  {shuaaContent.badgeBottom}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
