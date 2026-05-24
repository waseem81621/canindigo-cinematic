import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const PARTICLE_COUNT = 3000;

function Particles() {
  const meshRef = useRef<THREE.Points>(null);

  const { positions, velocities, colors } = useMemo(() => {
    const pos = new Float32Array(PARTICLE_COUNT * 3);
    const vel = new Float32Array(PARTICLE_COUNT * 3);
    const col = new Float32Array(PARTICLE_COUNT * 3);

    const colorPalette = [
      new THREE.Color("#D4AF37"),
      new THREE.Color("#2B6E6F"),
      new THREE.Color("#C9A96E"),
      new THREE.Color("#E8D5A3"),
    ];

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const i3 = i * 3;
      pos[i3] = (Math.random() - 0.5) * 20;
      pos[i3 + 1] = (Math.random() - 0.5) * 20;
      pos[i3 + 2] = (Math.random() - 0.5) * 10;

      vel[i3] = (Math.random() - 0.5) * 0.002;
      vel[i3 + 1] = (Math.random() - 0.5) * 0.002;
      vel[i3 + 2] = (Math.random() - 0.5) * 0.001;

      const color = colorPalette[Math.floor(Math.random() * colorPalette.length)];
      col[i3] = color.r;
      col[i3 + 1] = color.g;
      col[i3 + 2] = color.b;
    }

    return { positions: pos, velocities: vel, colors: col };
  }, []);

  const posAttr = useMemo(() => new THREE.BufferAttribute(positions, 3), [positions]);
  const colAttr = useMemo(() => new THREE.BufferAttribute(colors, 3), [colors]);

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.elapsedTime;
    const posArray = meshRef.current.geometry.attributes.position.array as Float32Array;

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const i3 = i * 3;
      posArray[i3] += velocities[i3] + Math.sin(time * 0.3 + i * 0.1) * 0.0005;
      posArray[i3 + 1] += velocities[i3 + 1] + Math.cos(time * 0.2 + i * 0.1) * 0.0005;
      posArray[i3 + 2] += velocities[i3 + 2];

      if (posArray[i3] > 10) posArray[i3] = -10;
      if (posArray[i3] < -10) posArray[i3] = 10;
      if (posArray[i3 + 1] > 10) posArray[i3 + 1] = -10;
      if (posArray[i3 + 1] < -10) posArray[i3 + 1] = 10;
    }

    meshRef.current.geometry.attributes.position.needsUpdate = true;
    meshRef.current.rotation.y = time * 0.02;
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <primitive object={posAttr} attach="attributes-position" />
        <primitive object={colAttr} attach="attributes-color" />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        vertexColors
        transparent
        opacity={0.6}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function ConnectionLines() {
  const lineRef = useRef<THREE.LineSegments>(null);

  const lineGeo = useMemo(() => {
    const pos = new Float32Array(500 * 6);
    for (let i = 0; i < 500; i++) {
      const i6 = i * 6;
      pos[i6] = (Math.random() - 0.5) * 15;
      pos[i6 + 1] = (Math.random() - 0.5) * 15;
      pos[i6 + 2] = (Math.random() - 0.5) * 8;
      pos[i6 + 3] = pos[i6] + (Math.random() - 0.5) * 2;
      pos[i6 + 4] = pos[i6 + 1] + (Math.random() - 0.5) * 2;
      pos[i6 + 5] = pos[i6 + 2] + (Math.random() - 0.5) * 2;
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    return geo;
  }, []);

  useFrame((state) => {
    if (!lineRef.current) return;
    const time = state.clock.elapsedTime;
    lineRef.current.rotation.y = time * 0.01;
    lineRef.current.rotation.x = Math.sin(time * 0.1) * 0.05;
  });

  return (
    <lineSegments ref={lineRef} geometry={lineGeo}>
      <lineBasicMaterial color="#D4AF37" transparent opacity={0.08} />
    </lineSegments>
  );
}

export function ParticleField() {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        dpr={[1, 1.5]}
        gl={{ antialias: false, alpha: true }}
        style={{ background: "transparent" }}
      >
        <Particles />
        <ConnectionLines />
        <ambientLight intensity={0.5} />
      </Canvas>
    </div>
  );
}
