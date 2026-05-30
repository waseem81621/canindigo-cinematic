import { useEffect, useRef } from "react";

interface NodeNetworkProps {
  className?: string;
}

const VB_W = 600;
const VB_H = 800;
const NODE_COUNT = 20;
const CONNECT_R = 140;
const NODE_RADIUS = 2.5;
const SEED = 47;

type Node = {
  x0: number;
  y0: number;
  ampX: number;
  ampY: number;
  freqX: number;
  freqY: number;
  phaseX: number;
  phaseY: number;
};

function seededNodes(seed: number, count: number, w: number, h: number): Node[] {
  let s = seed;
  const rand = () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
  const nodes: Node[] = [];
  const m = 40;
  for (let i = 0; i < count; i++) {
    nodes.push({
      x0: m + rand() * (w - 2 * m),
      y0: m + rand() * (h - 2 * m),
      ampX: 6 + rand() * 12,
      ampY: 6 + rand() * 12,
      freqX: 0.0004 + rand() * 0.0006,
      freqY: 0.0004 + rand() * 0.0006,
      phaseX: rand() * Math.PI * 2,
      phaseY: rand() * Math.PI * 2,
    });
  }
  return nodes;
}

function buildPairs(count: number): [number, number][] {
  const pairs: [number, number][] = [];
  for (let i = 0; i < count; i++) {
    for (let j = i + 1; j < count; j++) {
      pairs.push([i, j]);
    }
  }
  return pairs;
}

const NODES = seededNodes(SEED, NODE_COUNT, VB_W, VB_H);
const PAIRS = buildPairs(NODE_COUNT);

export function NodeNetwork({ className = "" }: NodeNetworkProps) {
  const circleRefs = useRef<(SVGCircleElement | null)[]>([]);
  const lineRefs = useRef<(SVGLineElement | null)[]>([]);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const positions: { x: number; y: number }[] = new Array(NODE_COUNT);

    function applyFrame(t: number) {
      for (let i = 0; i < NODE_COUNT; i++) {
        const n = NODES[i];
        positions[i] = {
          x: n.x0 + n.ampX * Math.cos(t * n.freqX + n.phaseX),
          y: n.y0 + n.ampY * Math.sin(t * n.freqY + n.phaseY),
        };
        const c = circleRefs.current[i];
        if (c) {
          c.setAttribute("cx", positions[i].x.toFixed(2));
          c.setAttribute("cy", positions[i].y.toFixed(2));
        }
      }
      for (let p = 0; p < PAIRS.length; p++) {
        const [a, b] = PAIRS[p];
        const dx = positions[a].x - positions[b].x;
        const dy = positions[a].y - positions[b].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const l = lineRefs.current[p];
        if (!l) continue;
        if (dist < CONNECT_R) {
          l.setAttribute("x1", positions[a].x.toFixed(2));
          l.setAttribute("y1", positions[a].y.toFixed(2));
          l.setAttribute("x2", positions[b].x.toFixed(2));
          l.setAttribute("y2", positions[b].y.toFixed(2));
          const opacity = (1 - dist / CONNECT_R) * 0.35;
          l.setAttribute("stroke-opacity", opacity.toFixed(3));
        } else {
          l.setAttribute("stroke-opacity", "0");
        }
      }
    }

    if (prefersReduced) {
      applyFrame(0);
      return;
    }

    let rafId = 0;
    let running = true;

    function loop(t: number) {
      if (!running) return;
      applyFrame(t);
      rafId = requestAnimationFrame(loop);
    }

    const onVisibility = () => {
      if (document.hidden) {
        running = false;
        cancelAnimationFrame(rafId);
      } else if (!running) {
        running = true;
        rafId = requestAnimationFrame(loop);
      }
    };

    document.addEventListener("visibilitychange", onVisibility);
    rafId = requestAnimationFrame(loop);

    return () => {
      running = false;
      cancelAnimationFrame(rafId);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <svg
      className={className}
      viewBox={`0 0 ${VB_W} ${VB_H}`}
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <g>
        {PAIRS.map((_, i) => (
          <line
            key={`l${i}`}
            ref={(el) => {
              lineRefs.current[i] = el;
            }}
            x1={0}
            y1={0}
            x2={0}
            y2={0}
            stroke="var(--color-indigo-mid)"
            strokeWidth={0.6}
            strokeOpacity={0}
            strokeLinecap="round"
          />
        ))}
        {NODES.map((n, i) => (
          <circle
            key={`c${i}`}
            ref={(el) => {
              circleRefs.current[i] = el;
            }}
            cx={n.x0}
            cy={n.y0}
            r={NODE_RADIUS}
            fill="var(--color-indigo-mid)"
            fillOpacity={0.55}
          />
        ))}
      </g>
    </svg>
  );
}
