import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';

/* ─── 3D Geometric Object ─── */
const GeometricObject = ({ scrollProgress }) => {
  const meshRef = useRef();
  const wireRef = useRef();

  useFrame(() => {
    if (meshRef.current && scrollProgress?.current !== undefined) {
      const progress = scrollProgress.current;
      meshRef.current.rotation.y = progress * Math.PI * 4;
      meshRef.current.rotation.x = Math.sin(progress * Math.PI * 2) * 0.5;
      meshRef.current.rotation.z = Math.cos(progress * Math.PI) * 0.3;
      
      const s = 0.8 + Math.sin(progress * Math.PI) * 0.4;
      meshRef.current.scale.setScalar(s);
    }
    if (wireRef.current && scrollProgress?.current !== undefined) {
      const progress = scrollProgress.current;
      wireRef.current.rotation.y = -progress * Math.PI * 3;
      wireRef.current.rotation.x = Math.cos(progress * Math.PI * 2) * 0.4;
    }
  });

  return (
    <group>
      <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.3}>
        <mesh ref={meshRef} castShadow>
          <dodecahedronGeometry args={[1.5, 0]} />
          <meshStandardMaterial
            color="#1a1a1a"
            metalness={0.3}
            roughness={0.4}
            flatShading
          />
        </mesh>
      </Float>

      <Float speed={1} rotationIntensity={0.3} floatIntensity={0.2}>
        <mesh ref={wireRef}>
          <icosahedronGeometry args={[2.2, 1]} />
          <meshBasicMaterial
            color="#1a1a1a"
            wireframe
            transparent
            opacity={0.15}
          />
        </mesh>
      </Float>

      <OrbitingSphere scrollProgress={scrollProgress} />
    </group>
  );
};

/* ─── Orbiting Sphere ─── */
const OrbitingSphere = ({ scrollProgress }) => {
  const ref = useRef();

  useFrame(({ clock }) => {
    if (ref.current) {
      const t = clock.getElapsedTime();
      const progress = scrollProgress?.current || 0;
      const radius = 3;
      ref.current.position.x = Math.cos(t * 0.5 + progress * Math.PI * 4) * radius;
      ref.current.position.z = Math.sin(t * 0.5 + progress * Math.PI * 4) * radius;
      ref.current.position.y = Math.sin(t * 0.3) * 0.5;
    }
  });

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[0.12, 16, 16]} />
      <meshStandardMaterial color="#000" metalness={0.8} roughness={0.2} />
    </mesh>
  );
};

/* ─── Main ImageSequence Component ─── */
const ImageSequence = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const textOpacity = useTransform(smoothProgress, [0.2, 0.4, 0.6, 0.8], [0, 1, 1, 0]);
  const lineWidth = useTransform(smoothProgress, [0.1, 0.5], ["0%", "100%"]);

  return (
    <div ref={containerRef} className="h-[200vh] relative">
      <div className="sticky top-0 h-screen flex items-center justify-center w-full overflow-hidden bg-[#f4f4f0]">
        
        {/* Grid Background */}
        <div className="absolute inset-0 z-0 opacity-[0.03]"
          style={{
            backgroundImage: 'linear-gradient(#1a1a1a 1px, transparent 1px), linear-gradient(90deg, #1a1a1a 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />

        {/* 3D Canvas - Responsive camera */}
        <div className="absolute inset-0 z-10">
          <Canvas
            camera={{ position: [0, 0, 8], fov: 45 }}
            gl={{ antialias: true, alpha: true }}
            style={{ background: 'transparent' }}
            dpr={[1, 2]}
          >
            <ambientLight intensity={0.6} />
            <directionalLight position={[5, 5, 5]} intensity={1} />
            <directionalLight position={[-3, -3, 2]} intensity={0.3} />
            <pointLight position={[0, 3, 0]} intensity={0.5} color="#ffffff" />
            <GeometricObject scrollProgress={smoothProgress} />
          </Canvas>
        </div>

        {/* Editorial Text Overlay - Responsive */}
        <div className="absolute inset-0 flex flex-col justify-between p-4 sm:p-6 md:p-12 pointer-events-none z-20">
          <div className="flex justify-between items-start gap-4">
            <motion.h2 
              style={{ opacity: textOpacity }}
              className="text-3xl sm:text-5xl md:text-8xl font-serif tracking-tighter leading-[0.8] text-[#1a1a1a]"
            >
              OBJECT<br/>STUDY
            </motion.h2>
            <motion.span 
              style={{ opacity: textOpacity }}
              className="hidden sm:inline-block font-sans text-[10px] tracking-widest border border-black/20 px-3 py-1.5 rounded-full text-[#1a1a1a]/60 flex-shrink-0"
            >
              FIG. 01
            </motion.span>
          </div>
          <div className="flex justify-between items-end gap-4">
            <motion.span 
              style={{ opacity: textOpacity }}
              className="font-sans text-[8px] sm:text-[10px] max-w-[200px] sm:max-w-xs uppercase tracking-wider text-[#1a1a1a]/50 leading-relaxed"
            >
              Scroll to rotate.<br/>Observation of digital artifacts in 3D space.
            </motion.span>
            <motion.h3 
              style={{ opacity: textOpacity }}
              className="text-xl sm:text-3xl md:text-4xl font-serif italic text-[#1a1a1a]/40"
            >
              ( 360° )
            </motion.h3>
          </div>
        </div>

        {/* Animated Line */}
        <motion.div
          style={{ width: lineWidth }}
          className="absolute top-1/2 left-0 h-px bg-black/10 z-[15]"
        />
      </div>
    </div>
  );
};

export default ImageSequence;
