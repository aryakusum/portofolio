import { useRef, Suspense } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import PortalVortex from './PortalVortex';
import useDeviceCapability from '../../hooks/useDeviceCapability';

const PortalReveal = () => {
  const portalRef = useRef(null);
  const scrollRef = useRef(0);
  const { tier, dpr, isMobile } = useDeviceCapability();
  const { scrollYProgress: portalProgress } = useScroll({ target: portalRef, offset: ["start end", "end start"] });

  // Track scroll for Three.js
  portalProgress.on('change', (v) => { scrollRef.current = v; });

  return (
    <div ref={portalRef} className="h-[200vh] relative">
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        {/* Color-shifting background */}
        <motion.div
          animate={{
            background: [
              "radial-gradient(circle at 50% 50%, #1a0000 0%, #050505 70%)",
              "radial-gradient(circle at 50% 50%, #1a001a 0%, #050505 70%)",
              "radial-gradient(circle at 50% 50%, #001a1a 0%, #050505 70%)",
              "radial-gradient(circle at 50% 50%, #001a00 0%, #050505 70%)",
              "radial-gradient(circle at 50% 50%, #1a0000 0%, #050505 70%)",
            ]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0"
        />

        {/* Three.js Portal Vortex (replaces 2D particles on capable devices) */}
        {tier !== 'low' ? (
          <div className="absolute inset-0 z-[5]">
            <Suspense fallback={null}>
              <Canvas
                camera={{ position: [0, 0, 8], fov: 50 }}
                gl={{ antialias: tier === 'high', alpha: true }}
                style={{ background: 'transparent' }}
                dpr={dpr}
              >
                <ambientLight intensity={0.2} />
                <PortalVortex scrollProgress={scrollRef} />
              </Canvas>
            </Suspense>
          </div>
        ) : (
          <>
            {/* Fallback: 2D explosion blast waves */}
            {[0, 0.8, 1.6, 2.4].map((delay, i) => (
              <motion.div key={`blast-${i}`}
                animate={{
                  scale: [0, 3, 6],
                  opacity: [0.6, 0.3, 0],
                  borderColor: [
                    "rgba(255,100,100,0.8)",
                    "rgba(200,100,255,0.5)",
                    "rgba(100,200,255,0.0)"
                  ]
                }}
                transition={{ duration: 3, repeat: Infinity, delay, ease: "easeOut" }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60px] h-[60px] md:w-[100px] md:h-[100px] rounded-full border-2 pointer-events-none"
              />
            ))}
            {/* Fallback: 2D particles */}
            {Array(20).fill(null).map((_, i) => {
              const angle = (i / 20) * 360;
              const rad = (angle * Math.PI) / 180;
              const dist = 300 + Math.random() * 200;
              const tx = Math.cos(rad) * dist;
              const ty = Math.sin(rad) * dist;
              const colors = ["bg-red-400", "bg-purple-400", "bg-cyan-400", "bg-yellow-400", "bg-green-400"];
              return (
                <motion.div key={`particle-${i}`}
                  animate={{ x: [0, tx], y: [0, ty], opacity: [1, 0], scale: [1, 0.3] }}
                  transition={{ duration: 2 + Math.random() * 2, repeat: Infinity, delay: Math.random() * 2, ease: "easeOut" }}
                  className={`absolute top-1/2 left-1/2 w-1 h-1 md:w-1.5 md:h-1.5 rounded-full ${colors[i % colors.length]} pointer-events-none`}
                />
              );
            })}
          </>
        )}

        {/* Glowing energy core */}
        <motion.div
          animate={{
            scale: [1, 1.5, 1],
            boxShadow: [
              "0 0 30px rgba(255,50,50,0.5), 0 0 80px rgba(255,50,50,0.2)",
              "0 0 50px rgba(150,50,255,0.6), 0 0 120px rgba(150,50,255,0.3)",
              "0 0 40px rgba(50,200,255,0.5), 0 0 100px rgba(50,200,255,0.2)",
              "0 0 30px rgba(255,50,50,0.5), 0 0 80px rgba(255,50,50,0.2)",
            ]
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 md:w-24 md:h-24 rounded-full pointer-events-none z-10"
          style={{ background: "radial-gradient(circle, rgba(255,255,255,0.3), transparent 70%)" }}
        />

        {/* Rotating CSS portal rings (always visible, overlay) */}
        <motion.div animate={{ rotate: 360 }} transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150px] h-[150px] md:w-[250px] md:h-[250px] rounded-full pointer-events-none z-[6]"
          style={{ border: "2px solid rgba(255,100,100,0.3)" }}
        />
        <motion.div animate={{ rotate: -360 }} transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] md:w-[350px] md:h-[350px] rounded-full pointer-events-none z-[6]"
          style={{ border: "2px dashed rgba(150,100,255,0.2)" }}
        />

        {/* Screen shake text */}
        <motion.div
          animate={{ x: [0, -2, 3, -1, 0], y: [0, 1, -2, 1, 0] }}
          transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 2 }}
          className="text-center relative z-20 px-4"
        >
          <motion.div
            animate={{
              color: ["#ff6464", "#c864ff", "#64c8ff", "#64ff64", "#ff6464"],
              textShadow: [
                "0 0 20px rgba(255,100,100,0.5)",
                "0 0 20px rgba(200,100,255,0.5)",
                "0 0 20px rgba(100,200,255,0.5)",
                "0 0 20px rgba(100,255,100,0.5)",
                "0 0 20px rgba(255,100,100,0.5)",
              ]
            }}
            transition={{ duration: 4, repeat: Infinity }}
            className="mb-4"
          >
            <span className="font-pixel text-[8px] md:text-[10px] tracking-[0.3em]">✦ PORTAL OPENED ✦</span>
          </motion.div>

          <motion.h2
            animate={{
              textShadow: [
                "0 0 40px rgba(255,50,50,0.4), 0 0 80px rgba(255,50,50,0.2)",
                "0 0 40px rgba(150,50,255,0.4), 0 0 80px rgba(150,50,255,0.2)",
                "0 0 40px rgba(50,200,255,0.4), 0 0 80px rgba(50,200,255,0.2)",
                "0 0 40px rgba(255,50,50,0.4), 0 0 80px rgba(255,50,50,0.2)",
              ]
            }}
            transition={{ duration: 4, repeat: Infinity }}
            className="font-pixel text-xl sm:text-2xl md:text-4xl text-white mb-3"
          >
            ENTERING_DUNGEON
          </motion.h2>

          <p className="font-pixel text-[7px] md:text-[9px] text-gray-500 max-w-xs mx-auto">
            THE PORTAL IS UNSTABLE... KEEP SCROLLING...
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default PortalReveal;
