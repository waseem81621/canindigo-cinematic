import { useEffect, useRef, useState } from "react";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";

interface TextScrambleProps {
  text: string;
  className?: string;
  trigger?: "mount" | "hover" | "inview";
  duration?: number;
  delay?: number;
}

export function TextScramble({
  text,
  className = "",
  trigger = "mount",
  duration = 1200,
  delay = 0,
}: TextScrambleProps) {
  const [display, setDisplay] = useState(text);
  const [hasPlayed, setHasPlayed] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);
  const frameRef = useRef<number>(0);

  const scramble = () => {
    if (hasPlayed && trigger !== "hover") return;
    setHasPlayed(true);

    const length = text.length;
    const startTime = performance.now() + delay;

    const animate = (now: number) => {
      if (now < startTime) {
        frameRef.current = requestAnimationFrame(animate);
        return;
      }

      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const revealedCount = Math.floor(eased * length);

      let result = "";
      for (let i = 0; i < length; i++) {
        if (text[i] === " ") {
          result += " ";
        } else if (i < revealedCount) {
          result += text[i];
        } else {
          result += CHARS[Math.floor(Math.random() * CHARS.length)];
        }
      }

      setDisplay(result);

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(animate);
      } else {
        setDisplay(text);
      }
    };

    frameRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    if (trigger === "mount") {
      scramble();
    }
    return () => cancelAnimationFrame(frameRef.current);
  }, []);

  useEffect(() => {
    if (trigger !== "inview" || !ref.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          scramble();
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [trigger]);

  return (
    <span
      ref={ref}
      className={`inline-block font-mono ${className}`}
      onMouseEnter={trigger === "hover" ? scramble : undefined}
    >
      {display}
    </span>
  );
}
