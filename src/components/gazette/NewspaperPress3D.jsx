import React, { useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, Sparkles } from '@react-three/drei';
import * as THREE from 'three';

// 3D Vintage Cylindrical Printing Press Roller
function PressCylinder() {
  const cylinderRef = useRef();
  const roller1Ref = useRef();
  const roller2Ref = useRef();
  const { pointer } = useThree();

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();
    if (cylinderRef.current) {
      // Continuous press rolling rotation
      cylinderRef.current.rotation.x += delta * 0.8;
      cylinderRef.current.rotation.y = pointer.x * 0.4;
    }

    if (roller1Ref.current) {
      roller1Ref.current.rotation.x -= delta * 1.6;
    }

    if (roller2Ref.current) {
      roller2Ref.current.rotation.x -= delta * 1.6;
    }
  });

  return (
    <group position={[0, 0, 0]}>
      {/* Main Newspaper Print Drum */}
      <Float speed={2} rotationIntensity={0.3} floatIntensity={0.6}>
        <group ref={cylinderRef}>
          {/* Main Printing Press Cylinder */}
          <mesh castShadow receiveShadow>
            <cylinderGeometry args={[1.5, 1.5, 3.6, 32]} />
            <meshStandardMaterial
              color="#3a3630"
              metalness={0.8}
              roughness={0.3}
            />
          </mesh>

          {/* Embossed Newsprint Typeset Plates */}
          <mesh scale={1.02}>
            <cylinderGeometry args={[1.5, 1.5, 3.4, 32]} />
            <meshStandardMaterial
              color="#d4af37"
              wireframe
              opacity={0.35}
              transparent
            />
          </mesh>
        </group>
      </Float>

      {/* Counter-Rotating Inking Rollers */}
      <mesh ref={roller1Ref} position={[2.2, 0.8, 0]}>
        <cylinderGeometry args={[0.5, 0.5, 3.6, 24]} />
        <meshStandardMaterial color="#1a1815" roughness={0.5} metalness={0.9} />
      </mesh>

      <mesh ref={roller2Ref} position={[-2.2, -0.8, 0]}>
        <cylinderGeometry args={[0.5, 0.5, 3.6, 24]} />
        <meshStandardMaterial color="#1a1815" roughness={0.5} metalness={0.9} />
      </mesh>

      {/* Floating Ink Droplets & Flying Paper Ash */}
      <Sparkles count={45} scale={6} size={3} speed={0.4} color="#181512" />
      <Sparkles count={25} scale={5} size={2} speed={0.6} color="#b91c1c" />
    </group>
  );
}

export default function NewspaperPress3D() {
  return (
    <div className="w-full h-full relative cursor-grab active:cursor-grabbing">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        className="w-full h-full"
      >
        <ambientLight intensity={1.2} />
        <directionalLight position={[6, 8, 5]} intensity={2.2} color="#fef08a" />
        <directionalLight position={[-6, -5, -4]} intensity={1.0} color="#78716c" />
        <pointLight position={[0, 4, 2]} intensity={1.5} color="#ffffff" />
        <PressCylinder />
      </Canvas>
    </div>
  );
}
