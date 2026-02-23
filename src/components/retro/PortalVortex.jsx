import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/* ─── 3D Swirling Portal Vortex for Retro Theme ─── */
const PortalVortex = ({ scrollProgress, color = '#c084fc' }) => {
  const groupRef = useRef();
  const particlesRef = useRef();

  const PARTICLE_COUNT = 120;

  // Generate spiral vortex positions
  const [positions, velocities] = useMemo(() => {
    const pos = new Float32Array(PARTICLE_COUNT * 3);
    const vel = new Float32Array(PARTICLE_COUNT * 3);

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const i3 = i * 3;
      const angle = (i / PARTICLE_COUNT) * Math.PI * 6;
      const radius = (i / PARTICLE_COUNT) * 3;
      const z = (i / PARTICLE_COUNT - 0.5) * 4;

      pos[i3]     = Math.cos(angle) * radius;
      pos[i3 + 1] = Math.sin(angle) * radius;
      pos[i3 + 2] = z;

      vel[i3]     = (Math.random() - 0.5) * 0.02;
      vel[i3 + 1] = (Math.random() - 0.5) * 0.02;
      vel[i3 + 2] = (Math.random() - 0.5) * 0.01;
    }
    return [pos, vel];
  }, []);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const scroll = scrollProgress?.current || 0;

    if (groupRef.current) {
      groupRef.current.rotation.z = t * 0.3 + scroll * Math.PI;
    }

    if (particlesRef.current) {
      const pos = particlesRef.current.geometry.attributes.position.array;
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const i3 = i * 3;
        const angle = (i / PARTICLE_COUNT) * Math.PI * 6 + t * 0.5;
        const radius = (i / PARTICLE_COUNT) * 3 + Math.sin(t + i * 0.1) * 0.3;
        const z = positions[i3 + 2] + Math.sin(t * 0.5 + i * 0.05) * 0.5;

        pos[i3]     = Math.cos(angle) * radius;
        pos[i3 + 1] = Math.sin(angle) * radius;
        pos[i3 + 2] = z;
      }
      particlesRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Portal ring — outer */}
      <mesh>
        <torusGeometry args={[3, 0.12, 8, 32]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.5}
          flatShading
          transparent
          opacity={0.8}
        />
      </mesh>

      {/* Portal ring — inner */}
      <mesh>
        <torusGeometry args={[2.2, 0.08, 6, 24]} />
        <meshStandardMaterial
          color="#facc15"
          emissive="#f59e0b"
          emissiveIntensity={0.3}
          flatShading
          transparent
          opacity={0.5}
        />
      </mesh>

      {/* Center glow */}
      <mesh>
        <sphereGeometry args={[0.5, 8, 8]} />
        <meshBasicMaterial
          color="#ffffff"
          transparent
          opacity={0.3}
        />
      </mesh>

      {/* Spiral particles */}
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={PARTICLE_COUNT}
            array={positions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          color={color}
          size={0.06}
          transparent
          opacity={0.8}
          sizeAttenuation
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* Light sources */}
      <pointLight position={[0, 0, 2]} intensity={1} color={color} />
      <pointLight position={[0, 0, -2]} intensity={0.5} color="#facc15" />
    </group>
  );
};

export default PortalVortex;
