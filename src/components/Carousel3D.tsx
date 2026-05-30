import { useMemo } from "react";

/**
 * Carousel3D — native port of the Framer Marketplace "Carousel 3D" component
 * at https://framer.com/m/Carousel-3D-xTrd.js. The Framer original imports
 * from the `framer` runtime package (not available on npm), but the visual
 * pattern is pure CSS 3D transforms: cards arranged around a vertical Y axis,
 * the whole ring auto-rotating on a CSS keyframe animation.
 *
 * Behaviour matches the source 1:1:
 *   - cards laid out at angle = i * (360 / N) around the Y axis
 *   - each card pulled outward from center by `translateZ(radius)`
 *   - parent ring rotates 360° over `rotateSpeed` seconds, linear, infinite
 *   - hover the container → pauses the animation
 *   - `showBackface` controls whether back-facing cards are visible
 *   - respects prefers-reduced-motion (animation disabled)
 *
 * One namespacing detail: every Carousel3D instance gets a unique animation
 * name based on `useId()` so multiple instances on the same page can rotate
 * at different speeds without name collisions.
 */

interface Carousel3DProps {
  images: Array<{ src: string; alt?: string }>;
  imageWidth?: number;
  imageHeight?: number;
  rotateSpeed?: number;
  translateZ?: number;
  borderRadius?: number;
  pauseOnHover?: boolean;
  showBackface?: boolean;
  className?: string;
}

export function Carousel3D({
  images,
  imageWidth = 186,
  imageHeight = 116,
  rotateSpeed = 20,
  translateZ = 288,
  borderRadius = 5,
  pauseOnHover = true,
  showBackface = true,
  className = "",
}: Carousel3DProps) {
  const count = images.length;
  // Memoise the per-image transforms so layout doesn't recompute every frame.
  const cardTransforms = useMemo(
    () => images.map((_, i) => `rotateY(${(i * 360) / count}deg) translateZ(${translateZ}px)`),
    [images, count, translateZ]
  );

  // Height of the spinner: image height + headroom for the perspective
  // distortion (front-facing cards lean toward camera, so the bbox extends
  // slightly above/below cardHeight).
  const stageHeight = Math.max(imageHeight + 80, translateZ * 0.6);

  return (
    <div
      className={`relative w-full ${className}`}
      style={{
        perspective: "1000px",
        height: stageHeight,
      }}
    >
      <div
        className={`relative w-full h-full mx-auto carousel-3d-spinner ${
          pauseOnHover ? "hover:[animation-play-state:paused]" : ""
        }`}
        style={{
          transformStyle: "preserve-3d",
          // CSS variable wiring — the keyframe `carousel3dRotate` is defined
          // in index.css and reads --carousel-3d-duration.
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          ["--carousel-3d-duration" as any]: `${rotateSpeed}s`,
        }}
      >
        {images.map((img, i) => (
          <div
            key={i}
            className="absolute"
            style={{
              width: imageWidth,
              height: imageHeight,
              left: "50%",
              top: "50%",
              marginLeft: -imageWidth / 2,
              marginTop: -imageHeight / 2,
              transform: cardTransforms[i],
              transformStyle: "preserve-3d",
              backfaceVisibility: showBackface ? "visible" : "hidden",
            }}
          >
            <img
              src={img.src}
              alt={img.alt || `Carousel image ${i + 1}`}
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover"
              style={{
                borderRadius,
                boxShadow:
                  "0 10px 30px -8px rgba(25,22,45,0.35), 0 0 0 1px rgba(255,255,255,0.06)",
              }}
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).style.display = "none";
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
