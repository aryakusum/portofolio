import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * ParticleField — Reusable Three.js particle system.
 *
 * @param {number}   count     - Number of particles
 * @param {number}   size      - Particle size
 * @param {string}   color     - Particle color
 * @param {number}   spread    - XYZ spread radius
 * @param {number}   speed     - Animation speed multiplier
 * @param {string}   shape     - 'sphere'|'cube'|'vortex'
 * @param {object}   scrollRef - Optional ref with .current for scroll-linked motion
 */
const ParticleField = ({
  count = 200,
  size = 0.02,
  color = '#ffffff',
  spread = 5,
  speed = 1,
  shape = 'sphere',
  scrollRef = null,
  opacity = 0.6,
}) => {
  const meshRef = useRef();

  const [positions, velocities] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const vel = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;

      if (shape === 'vortex') {
        const angle = (i / count) * Math.PI * 8;
        const radius = (i / count) * spread;
        pos[i3]     = Math.cos(angle) * radius;
        pos[i3 + 1] = (Math.random() - 0.5) * spread;
        pos[i3 + 2] = Math.sin(angle) * radius;
      } else if (shape === 'cube') {
        pos[i3]     = (Math.random() - 0.5) * spread * 2;
        pos[i3 + 1] = (Math.random() - 0.5) * spread * 2;
        pos[i3 + 2] = (Math.random() - 0.5) * spread * 2;
      } else {
        // Sphere distribution
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);
        const r = Math.cbrt(Math.random()) * spread;
        pos[i3]     = r * Math.sin(phi) * Math.cos(theta);
        pos[i3 + 1] = r * Math.sin(phi) * Math.sin(theta);
        pos[i3 + 2] = r * Math.cos(phi);
      }

      vel[i3]     = (Math.random() - 0.5) * 0.01;
      vel[i3 + 1] = (Math.random() - 0.5) * 0.01;
      vel[i3 + 2] = (Math.random() - 0.5) * 0.01;
    }
    return [pos, vel];
  }, [count, spread, shape]);

  const sizes = useMemo(() => {
    const s = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      s[i] = size * (0.5 + Math.random());
    }
    return s;
  }, [count, size]);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const geo = meshRef.current.geometry;
    const pos = geo.attributes.position.array;
    const t = clock.getElapsedTime() * speed;
    const scrollVal = scrollRef?.current || 0;

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;

      if (shape === 'vortex') {
        const angle = (i / count) * Math.PI * 8 + t * 0.5;
        const radius = (i / count) * spread + Math.sin(t + i) * 0.3;
        pos[i3]     = Math.cos(angle) * radius;
        pos[i3 + 1] = positions[i3 + 1] + Math.sin(t * 0.5 + i * 0.1) * 0.5;
        pos[i3 + 2] = Math.sin(angle) * radius;
      } else {
        pos[i3]     = positions[i3] + Math.sin(t + i * 0.1) * 0.1 + scrollVal * velocities[i3] * 20;
        pos[i3 + 1] = positions[i3 + 1] + Math.cos(t * 0.7 + i * 0.05) * 0.1;
        pos[i3 + 2] = positions[i3 + 2] + Math.sin(t * 0.5 + i * 0.08) * 0.1;
      }
    }
    geo.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-size"
          count={count}
          array={sizes}
          itemSize={1}
        />
      </bufferGeometry>
      <pointsMaterial
        color={color}
        size={size}
        transparent
        opacity={opacity}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};

export default ParticleField;
