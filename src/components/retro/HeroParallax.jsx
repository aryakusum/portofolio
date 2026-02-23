import { motion } from 'framer-motion';
import { useRef, useEffect } from 'react';
import { animate, stagger } from 'animejs';
import useDeviceCapability from '../../hooks/useDeviceCapability';

const HeroParallax = ({ yBack, yMid, yFront }) => {
  const titleRef = useRef(null);
  const scrollRef = useRef(0);
  const { tier, dpr, isMobile } = useDeviceCapability();

  // Anime.js — Glitch text effect on title
  useEffect(() => {
    if (!titleRef.current) return;
    const letters = titleRef.current.querySelectorAll('.glitch-letter');
    if (!letters.length) return;

    animate(letters, {
      opacity: [0, 1],
      translateY: [20, 0],
      delay: stagger(80, { start: 600 }),
      duration: 500,
      ease: 'outExpo',
    });

    // Glitch flicker — random letters briefly shift
    const glitchInterval = setInterval(() => {
      const randomIdx = Math.floor(Math.random() * letters.length);
      const letter = letters[randomIdx];
      if (!letter) return;
      animate(letter, {
        translateX: [0, (Math.random() - 0.5) * 6, 0],
        opacity: [1, 0.3, 1],
        duration: 150,
        ease: 'inOutQuad',
      });
    }, 2000);

    return () => clearInterval(glitchInterval);
  }, []);

  const renderGlitchText = (text) => {
    return text.split('').map((char, i) => (
      <span key={i} className="glitch-letter inline-block" style={{ opacity: 0 }}>
        {char === ' ' ? '\u00A0' : char}
      </span>
    ));
  };

  return (
    <section id="home" className="h-[250vh] relative">
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        {/* PARALLAX LAYER 1 — BACK: 2D Twinkling Stars */}
        <motion.div style={{ y: yBack }} className="absolute inset-0 z-0">
          {Array(40).fill(null).map((_, i) => (
            <motion.div key={i}
              animate={{ opacity: [0.15, 0.7, 0.15] }}
              transition={{ duration: 1.5 + Math.random() * 3, repeat: Infinity, delay: Math.random() * 2 }}
              className="absolute w-0.5 h-0.5 md:w-1 md:h-1 bg-white rounded-full"
              style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
            />
          ))}
        </motion.div>

        {/* PARALLAX LAYER 2 — MID: Grid floor + floating shapes */}
        <motion.div style={{ y: yMid }} className="absolute inset-0 z-10">
          <div className="absolute bottom-0 left-0 right-0 h-1/2 opacity-10">
            <motion.div
              animate={{ backgroundPositionY: ["0px", "40px"] }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="w-full h-full"
              style={{
                backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
                backgroundSize: '40px 40px',
                transform: 'rotateX(60deg)',
                transformOrigin: 'bottom center',
              }}
            />
          </div>
          {[
            { x: '10%', y: '20%', s: 3, d: 4 },
            { x: '85%', y: '30%', s: 2, d: 5 },
            { x: '75%', y: '70%', s: 4, d: 3 },
            { x: '20%', y: '75%', s: 2, d: 6 },
          ].map((p, i) => (
            <motion.div key={i}
              animate={{ y: [0, -15, 0], rotate: [0, 180, 360] }}
              transition={{ duration: p.d, repeat: Infinity, ease: "easeInOut" }}
              className="absolute opacity-20"
              style={{ left: p.x, top: p.y, width: `${p.s * 8}px`, height: `${p.s * 8}px` }}
            >
              <div className="w-full h-full border-2 border-white/30" style={{ transform: `rotate(${i * 45}deg)` }} />
            </motion.div>
          ))}
        </motion.div>

        {/* PARALLAX LAYER 3 — FRONT: Title content with glitch effect */}
        <motion.div style={{ y: yFront }} className="relative z-20 text-center px-4">
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="mb-4 md:mb-6">
            <span className="font-pixel text-[8px] md:text-[10px] text-gray-600 tracking-[0.5em]">— PRESS START —</span>
          </motion.div>

          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 200, damping: 15 }} className="inline-block mb-6 md:mb-10">
            <div className="pixel-border p-2 md:p-3 bg-white relative">
              <img src="./profile.jpg" alt="Player" className="w-28 h-28 sm:w-36 sm:h-36 md:w-44 md:h-44 object-cover pixelated" />
              <motion.div animate={{ opacity: [0, 1, 0] }} transition={{ duration: 2, repeat: Infinity }}
                className="absolute -top-3 -right-3 md:-top-4 md:-right-4 bg-yellow-400 text-black px-2 py-0.5 md:px-3 md:py-1 font-pixel text-[7px] md:text-[8px] border-2 border-black">
                NEW!
              </motion.div>
            </div>
          </motion.div>

          <h1 ref={titleRef} className="font-pixel text-3xl sm:text-4xl md:text-6xl lg:text-7xl text-white mb-3 md:mb-4 leading-none">
            <div>{renderGlitchText('ARYA')}</div>
            <div className="text-gray-500 text-xl sm:text-2xl md:text-4xl mt-1">
              {renderGlitchText('KUSUMA')}
            </div>
          </h1>
          <p className="font-pixel text-[8px] md:text-[10px] text-gray-600 mb-8 md:mb-10 tracking-wider">
            BACKEND_DEV · AI_ENTHUSIAST · LVL 99
          </p>

          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center items-center">
            <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
              onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
              className="pixel-button">▶ NEW GAME</motion.button>
            <motion.a href="https://github.com/aryakusum" target="_blank" rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
              className="pixel-button !bg-gray-700 !text-white !shadow-[inset_-4px_-4px_0_#444,4px_4px_0_#000]">⚙ GITHUB</motion.a>
          </div>

          <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 2, repeat: Infinity }} className="mt-10 md:mt-16">
            <span className="font-pixel text-[7px] text-gray-700 tracking-widest">SCROLL_DOWN</span>
            <div className="mt-2 mx-auto w-3 h-6 border border-gray-700 rounded-full relative">
              <motion.div animate={{ y: [0, 12, 0] }} transition={{ duration: 1.5, repeat: Infinity }}
                className="w-1 h-1 bg-gray-600 rounded-full mx-auto mt-1" />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroParallax;
