import { useEffect, useRef } from "react";

interface NodeNetworkCanvasProps {
  className?: string;
  /** Number of nodes. The SVG original ran 20; canvas handles 100+ easily. */
  density?: number;
  /** Concrete color (canvas can't resolve CSS vars per-frame cheaply). */
  color?: string;
  /** Multiplier on line/node alpha, 0..1. */
  intensity?: number;
  seed?: number;
}

type CNode = {
  fx: number; // fractional base position (0..1 of canvas size)
  fy: number;
  ampX: number;
  ampY: number;
  freqX: number;
  freqY: number;
  phaseX: number;
  phaseY: number;
  ox: number; // smoothed mouse-repulsion offset
  oy: number;
};

const CONNECT_R = 150; // px, CSS space
const MOUSE_R = 170;
const MOUSE_PUSH = 52;

function seededNodes(seed: number, count: number): CNode[] {
  let s = seed;
  const rand = () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
  const nodes: CNode[] = [];
  for (let i = 0; i < count; i++) {
    nodes.push({
      fx: 0.04 + rand() * 0.92,
      fy: 0.04 + rand() * 0.92,
      ampX: 8 + rand() * 16,
      ampY: 8 + rand() * 16,
      freqX: 0.0004 + rand() * 0.0006,
      freqY: 0.0004 + rand() * 0.0006,
      phaseX: rand() * Math.PI * 2,
      phaseY: rand() * Math.PI * 2,
      ox: 0,
      oy: 0,
    });
  }
  return nodes;
}

/**
 * NodeNetworkCanvas — Canvas-2D evolution of the SVG NodeNetwork.
 *
 * Same drifting-constellation algorithm, but: an order of magnitude more
 * nodes, devicePixelRatio-sharp, and mouse-aware (nodes shy away from the
 * cursor and ease back). Pauses when the tab is hidden or the canvas is
 * scrolled out of view. Renders one static frame under reduced motion.
 */
export function NodeNetworkCanvas({
  className = "",
  density = 120,
  color = "#8A6DE8",
  intensity = 1,
  seed = 47,
}: NodeNetworkCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const nodes = seededNodes(seed, density);
    let w = 0;
    let h = 0;
    let dpr = 1;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.max(1, Math.round(w * dpr));
      canvas.height = Math.max(1, Math.round(h * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    // Mouse in canvas CSS coords; far away by default.
    let mx = -9999;
    let my = -9999;
    const onPointerMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      mx = e.clientX - rect.left;
      my = e.clientY - rect.top;
    };
    const onPointerLeave = () => {
      mx = -9999;
      my = -9999;
    };
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    document.addEventListener("pointerleave", onPointerLeave);

    const xs = new Float32Array(density);
    const ys = new Float32Array(density);

    function frame(t: number) {
      ctx.clearRect(0, 0, w, h);

      for (let i = 0; i < density; i++) {
        const n = nodes[i];
        let x = n.fx * w + n.ampX * Math.cos(t * n.freqX + n.phaseX);
        let y = n.fy * h + n.ampY * Math.sin(t * n.freqY + n.phaseY);

        // Mouse repulsion, critically damped so nodes glide, never twitch.
        const dx = x - mx;
        const dy = y - my;
        const d = Math.hypot(dx, dy);
        let tx = 0;
        let ty = 0;
        if (d < MOUSE_R && d > 0.001) {
          const f = (1 - d / MOUSE_R) * MOUSE_PUSH;
          tx = (dx / d) * f;
          ty = (dy / d) * f;
        }
        n.ox += (tx - n.ox) * 0.06;
        n.oy += (ty - n.oy) * 0.06;
        xs[i] = x + n.ox;
        ys[i] = y + n.oy;
      }

      // Lines (under nodes)
      ctx.strokeStyle = color;
      ctx.lineWidth = 0.7;
      ctx.lineCap = "round";
      for (let i = 0; i < density; i++) {
        for (let j = i + 1; j < density; j++) {
          const dx = xs[i] - xs[j];
          const dy = ys[i] - ys[j];
          const dist2 = dx * dx + dy * dy;
          if (dist2 < CONNECT_R * CONNECT_R) {
            const dist = Math.sqrt(dist2);
            ctx.globalAlpha = (1 - dist / CONNECT_R) * 0.32 * intensity;
            ctx.beginPath();
            ctx.moveTo(xs[i], ys[i]);
            ctx.lineTo(xs[j], ys[j]);
            ctx.stroke();
          }
        }
      }

      // Nodes
      ctx.fillStyle = color;
      ctx.globalAlpha = 0.6 * intensity;
      for (let i = 0; i < density; i++) {
        ctx.beginPath();
        ctx.arc(xs[i], ys[i], 2.2, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    }

    if (prefersReduced) {
      frame(0);
      return () => {
        ro.disconnect();
        window.removeEventListener("pointermove", onPointerMove);
        document.removeEventListener("pointerleave", onPointerLeave);
      };
    }

    let rafId = 0;
    let running = false;
    let inView = true;

    const loop = (t: number) => {
      if (!running) return;
      frame(t);
      rafId = requestAnimationFrame(loop);
    };
    const start = () => {
      if (!running && inView && !document.hidden) {
        running = true;
        rafId = requestAnimationFrame(loop);
      }
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(rafId);
    };

    const io = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      if (inView) start();
      else stop();
    });
    io.observe(canvas);

    const onVisibility = () => {
      if (document.hidden) stop();
      else start();
    };
    document.addEventListener("visibilitychange", onVisibility);
    start();

    return () => {
      stop();
      io.disconnect();
      ro.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("pointerleave", onPointerLeave);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [density, color, intensity, seed]);

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none ${className}`}
      aria-hidden="true"
    />
  );
}
