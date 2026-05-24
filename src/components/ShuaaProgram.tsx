import { useState, useEffect, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Play, Pause, Sparkles, Volume2, VolumeX } from "lucide-react";
import { shuaaContent } from "../data/siteData";

function FloatingParticle({ delay, x, duration }: { delay: number; x: string; duration: number }) {
  return (
    <motion.div
      className="absolute w-1 h-1 rounded-full bg-indigo-light/40"
      style={{ left: x, bottom: "20%" }}
      animate={{
        y: [0, -120, -200],
        opacity: [0, 0.8, 0],
        scale: [0.5, 1.2, 0.3],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "easeOut",
      }}
    />
  );
}

function DataNode({ x, y, delay }: { x: string; y: string; delay: number }) {
  return (
    <motion.div
      className="absolute flex items-center gap-1.5 px-2 py-1 rounded-md bg-white/5 backdrop-blur-sm border border-white/10"
      style={{ left: x, top: y }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: [0, 1, 1, 0], scale: [0.8, 1, 1, 0.8] }}
      transition={{
        duration: 4,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      <div className="w-1.5 h-1.5 rounded-full bg-indigo-light/70" />
      <div className="w-12 h-1 rounded-full bg-white/20" />
      <div className="w-6 h-1 rounded-full bg-white/10" />
    </motion.div>
  );
}

export function ShuaaProgram() {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [time, setTime] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const ambientMotion = isPlaying && !shouldReduceMotion;

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (isPlaying) {
      v.play().catch(() => setIsPlaying(false));
    } else {
      v.pause();
    }
  }, [isPlaying]);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const onTime = () => setTime(Math.floor(v.currentTime));
    v.addEventListener("timeupdate", onTime);
    return () => v.removeEventListener("timeupdate", onTime);
  }, []);

  return (
    <section className="py-20 md:py-28 relative overflow-hidden">
      <div className="absolute inset-0 bg-bg-dark" />
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `url(${shuaaContent.ambientImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "blur(40px) saturate(0.6)",
        }}
      />
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      <div className="relative z-10 max-w-[1280px] mx-auto px-6 md:px-12 lg:px-20">
        <div className="text-center mb-12 md:mb-16">
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
                      ref={videoRef}
                      src={shuaaContent.videoUrl}
                      poster={shuaaContent.screenImage}
                      autoPlay
                      muted={isMuted}
                      loop
                      playsInline
                      preload="metadata"
                      className="absolute inset-0 w-full h-full object-contain bg-black"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent pointer-events-none" />

                    {ambientMotion && (
                      <>
                        <DataNode x="8%" y="15%" delay={0} />
                        <DataNode x="65%" y="25%" delay={1.5} />
                        <DataNode x="45%" y="55%" delay={3} />
                        <DataNode x="75%" y="70%" delay={2} />
                      </>
                    )}

                    {ambientMotion && (
                      <>
                        <FloatingParticle delay={0} x="15%" duration={5} />
                        <FloatingParticle delay={1.2} x="35%" duration={6} />
                        <FloatingParticle delay={2.5} x="55%" duration={4.5} />
                        <FloatingParticle delay={0.8} x="75%" duration={5.5} />
                        <FloatingParticle delay={3} x="85%" duration={4} />
                      </>
                    )}

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsMuted((m) => !m);
                      }}
                      aria-label={isMuted ? "Unmute video" : "Mute video"}
                      className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 hover:bg-white/20 transition-colors"
                    >
                      {isMuted ? (
                        <VolumeX size={16} className="text-white" />
                      ) : (
                        <Volume2 size={16} className="text-white" />
                      )}
                    </button>

                    <button
                      onClick={() => setIsPlaying(!isPlaying)}
                      aria-label={isPlaying ? "Pause video" : "Play video"}
                      className="absolute inset-0 flex items-center justify-center group cursor-pointer"
                    >
                      <motion.div
                        className="w-14 h-14 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20
                          group-hover:bg-white/20 group-hover:scale-110 transition-all duration-300"
                        whileTap={{ scale: 0.95 }}
                      >
                        {isPlaying ? (
                          <Pause size={20} className="text-white" />
                        ) : (
                          <Play size={20} className="text-white ml-0.5" />
                        )}
                      </motion.div>
                    </button>

                    <div className="absolute bottom-0 left-0 right-0 px-5 py-4 flex items-end justify-between">
                      <div>
                        <p className="text-[10px] font-semibold text-white/40 uppercase tracking-[0.15em] mb-1">
                          Shuaa Program — Cohort 2024
                        </p>
                        <p className="text-sm font-medium text-white/80">
                          Empowering the next generation of Omani technologists
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-[10px] text-white/30 font-mono">
                          {String(Math.floor(time / 60)).padStart(2, "0")}:
                          {String(time % 60).padStart(2, "0")}
                        </p>
                      </div>
                    </div>
                  </div>
              </div>
            </motion.div>
          </div>
        </div>

        <div>
          <div className="mt-14 md:mt-20 max-w-[720px] mx-auto text-center">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
              {shuaaContent.stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.15 }}
                  className="text-center"
                >
                  <p className="text-4xl md:text-5xl font-bold text-white mb-2">
                    {stat.value}
                  </p>
                  <p className="text-[13px] text-white/40 uppercase tracking-[0.1em]">
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </div>

            <div className="mt-14 p-8 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-sm">
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
