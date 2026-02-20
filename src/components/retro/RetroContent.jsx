import { useRef, useState, Suspense, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring, useInView } from "framer-motion";
import { listTools, listProyek } from "../../data";
import ProjectModal from "../ProjectModal/ProjectModal";
import Aurora from "../Aurora/Aurora";
import ScrollToTop from "../ScrollToTop";

/* ─── Blinking cursor ─── */
const Cursor = () => (
  <motion.span animate={{ opacity: [1, 0, 1] }} transition={{ duration: 1, repeat: Infinity }} className="inline-block w-2 h-3 md:w-3 md:h-4 bg-white ml-1 align-middle" />
);

/* ─── RPG Dialog Box ─── */
const DialogBox = ({ speaker, text, portrait = null }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.5, type: "spring" }}
      className="pixel-border bg-black p-4 md:p-6 relative"
    >
      {portrait && (
        <div className="absolute -top-5 -left-3 md:-top-6 md:-left-4 pixel-border bg-white p-1 w-10 h-10 md:w-14 md:h-14">
          <img src={portrait} alt={speaker} className="w-full h-full object-cover pixelated" />
        </div>
      )}
      <div className={portrait ? "ml-6 md:ml-10" : ""}>
        <span className="font-pixel text-[8px] md:text-[10px] text-yellow-400 block mb-2">{speaker}:</span>
        <p className="font-pixel text-[8px] md:text-[10px] text-white leading-relaxed">{text}</p>
      </div>
      <div className="absolute -bottom-2 right-4 md:right-6">
        <motion.span animate={{ y: [0, 4, 0] }} transition={{ duration: 1, repeat: Infinity }} className="font-pixel text-[8px] text-gray-600">▼</motion.span>
      </div>
    </motion.div>
  );
};

/* ─── RPG Inventory Slot ─── */
const InventorySlot = ({ tool, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, scale: 0.5, rotateY: 90 }}
      animate={isInView ? { opacity: 1, scale: 1, rotateY: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1, type: "spring" }}
      whileHover={{ scale: 1.1, y: -8 }}
      className="pixel-border bg-gray-900 p-3 md:p-4 flex flex-col items-center justify-center gap-2 md:gap-3 cursor-pointer 
        group hover:bg-white hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] transition-all duration-300 relative aspect-square"
    >
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ boxShadow: "inset 0 0 20px rgba(255,215,0,0.2)" }} />
      <img src={tool.gambar} alt={tool.nama} className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 pixelated group-hover:scale-110 transition-transform" />
      <span className="font-pixel text-[7px] sm:text-[8px] md:text-[10px] text-gray-400 group-hover:text-black text-center transition-colors">{tool.nama}</span>
      <div className="w-full h-1.5 md:h-2 bg-gray-800 group-hover:bg-gray-300 transition-colors overflow-hidden">
        <motion.div initial={{ width: 0 }} animate={isInView ? { width: `${70 + index * 5}%` } : {}}
          transition={{ duration: 1, delay: 0.5 + index * 0.1 }} className="h-full bg-green-500 group-hover:bg-green-700" />
      </div>
      <div className="absolute -top-12 md:-top-14 left-1/2 -translate-x-1/2 bg-black border-2 border-yellow-500 px-2 py-1 md:px-3 md:py-1.5 font-pixel text-[7px] md:text-[8px] text-yellow-400 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-20">
        {tool.ket} — LVL {10 - index}
        <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-yellow-500" />
      </div>
    </motion.div>
  );
};

/* ─── HP Bar ─── */
const HPBar = ({ label, value, max, color = "bg-red-500", delay = 0 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  return (
    <div ref={ref} className="space-y-1">
      <div className="flex justify-between font-pixel text-[7px] md:text-[8px]">
        <span className="text-gray-500">{label}</span>
        <span className="text-white">{value}/{max}</span>
      </div>
      <div className="h-3 md:h-4 bg-gray-900 border-2 border-gray-700 relative overflow-hidden">
        <motion.div initial={{ width: 0 }} animate={isInView ? { width: `${(value / max) * 100}%` } : {}}
          transition={{ duration: 1.2, delay, ease: [0.16, 1, 0.3, 1] }} className={`h-full ${color}`}>
          <div className="absolute inset-0" style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 1px, rgba(0,0,0,0.2) 1px, rgba(0,0,0,0.2) 2px)' }} />
        </motion.div>
      </div>
    </div>
  );
};

/* ─── Pixel Marquee ─── */
const PixelMarquee = ({ text }) => (
  <div className="overflow-hidden py-3 md:py-6 border-y-4 border-white/5 bg-[#050505]">
    <motion.div animate={{ x: [0, -1500] }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} className="flex gap-8 md:gap-16 whitespace-nowrap">
      {Array(10).fill(null).map((_, i) => (
        <span key={i} className="font-pixel text-lg sm:text-2xl md:text-4xl text-white/[0.04]">{text} ·</span>
      ))}
    </motion.div>
  </div>
);

/* ─── Mini Map ─── */
const MiniMap = ({ activeSection }) => (
  <motion.div initial={{ x: 100 }} animate={{ x: 0 }} className="fixed right-4 top-1/2 -translate-y-1/2 z-[101] hidden lg:block">
    <div className="pixel-border bg-black/90 p-3 space-y-2">
      <span className="font-pixel text-[6px] text-gray-600 block text-center mb-2">MAP</span>
      {[
        { id: 'home', icon: '🏠', label: 'START' },
        { id: 'about', icon: '👤', label: 'STATS' },
        { id: 'skills', icon: '⚔️', label: 'ITEMS' },
        { id: 'projects', icon: '📜', label: 'QUESTS' },
        { id: 'contact', icon: '🏰', label: 'BOSS' },
      ].map(item => (
        <a key={item.id} href={`#${item.id}`}
          className={`flex items-center gap-1.5 px-2 py-1 transition-all duration-200 ${
            activeSection === item.id ? 'bg-white text-black' : 'text-gray-600 hover:text-white'
          }`}>
          <span className="text-[10px]">{item.icon}</span>
          <span className="font-pixel text-[6px]">{item.label}</span>
        </a>
      ))}
    </div>
  </motion.div>
);

/* ─── Scrollytelling Wrapper — scroll-driven fade/scale/translate ─── */
const ScrollytellingSection = ({ children }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const opacity = useTransform(scrollYProgress, [0.05, 0.25, 0.75, 0.95], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0.05, 0.25], [100, 0]);
  const scale = useTransform(scrollYProgress, [0.05, 0.25, 0.75, 0.95], [0.92, 1, 1, 0.92]);

  return (
    <div ref={ref} className="min-h-[110vh] relative flex items-center">
      <motion.div style={{ opacity, y, scale }} className="w-full">
        {children}
      </motion.div>
    </div>
  );
};

/* ═══════════════════════════════════════════ */
/* ─── MAIN RETRO CONTENT ─── */
/* ═══════════════════════════════════════════ */
const RetroContent = () => {
  const containerRef = useRef(null);
  const [activeSection, setActiveSection] = useState('home');
  const [selectedProject, setSelectedProject] = useState(null);

  /* ─── Parallax layers ─── */
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  const yBack  = useTransform(smoothProgress, [0, 0.15], [0, -100]);   // slowest
  const yMid   = useTransform(smoothProgress, [0, 0.15], [0, -220]);   // medium
  const yFront = useTransform(smoothProgress, [0, 0.15], [0, -380]);   // fastest

  /* ─── Portal reveal ─── */
  const portalRef = useRef(null);
  const { scrollYProgress: portalProgress } = useScroll({ target: portalRef, offset: ["start end", "end start"] });
  const portalClip = useTransform(portalProgress, [0, 0.35, 0.6], [
    "circle(0% at 50% 50%)", "circle(70% at 50% 50%)", "circle(100% at 50% 50%)"
  ]);
  const portalScale = useTransform(portalProgress, [0, 0.5], [0.9, 1]);
  const portalOpacity = useTransform(portalProgress, [0, 0.25], [0, 1]);

  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'skills', 'projects', 'contact'];
      const current = sections.find(section => {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="crt-overlay min-h-screen selection:bg-white selection:text-black overflow-x-hidden">
      {/* XP Progress Bar */}
      <motion.div className="fixed top-0 left-0 right-0 h-1 md:h-1.5 bg-green-500 z-[100] origin-left" style={{ scaleX }} />
      <div className="fixed top-1 md:top-1.5 right-2 md:right-4 z-[100] font-pixel text-[6px] md:text-[7px] text-gray-600">XP</div>

      {/* Aurora Background */}
      <div className="fixed top-0 left-0 w-full h-full -z-20 bg-[#050505]" />
      <div className="fixed top-0 left-0 w-full h-full -z-10 opacity-20">
        <Suspense fallback={null}>
          <Aurora colorStops={["#0a0a2e", "#000000", "#1a0a2e"]} blend={0.5} amplitude={1.0} speed={0.15} />
        </Suspense>
      </div>

      <MiniMap activeSection={activeSection} />

      {/* Top HUD */}
      <div className="fixed top-4 left-4 md:top-6 md:left-8 z-[101] hidden md:block">
        <div className="pixel-border bg-black/90 px-3 py-2 md:px-4 md:py-2">
          <span className="font-pixel text-[7px] md:text-[8px] text-gray-500">PLAYER: </span>
          <span className="font-pixel text-[7px] md:text-[8px] text-white">ARYA_K</span>
        </div>
      </div>

      <main ref={containerRef} className="relative overflow-x-hidden">

        {/* ═══════════════════════════════════════ */}
        {/* ═══ HERO — 3-Layer Parallax ═══ */}
        {/* ═══════════════════════════════════════ */}
        <section id="home" className="h-[250vh] relative">
          <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">

            {/* PARALLAX LAYER 1 — BACK: Twinkling stars (slowest) */}
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

            {/* PARALLAX LAYER 2 — MID: Grid floor + floating shapes (medium) */}
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

            {/* PARALLAX LAYER 3 — FRONT: Title content (fastest) */}
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

              <h1 className="font-pixel text-3xl sm:text-4xl md:text-6xl lg:text-7xl text-white mb-3 md:mb-4 leading-none">
                ARYA<br/><span className="text-gray-500 text-xl sm:text-2xl md:text-4xl">KUSUMA</span>
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

        {/* ═══════════════════════════════════════ */}
        {/* ═══ PORTAL — Explosion + Color Shift ═══ */}
        {/* ═══════════════════════════════════════ */}
        <div ref={portalRef} className="h-[200vh] relative">
          <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">

            {/* Color-shifting background — cycles red → purple → cyan → green */}
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

            {/* Explosion blast waves — multiple expanding rings */}
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

            {/* Particle debris — flying outward from center */}
            {Array(20).fill(null).map((_, i) => {
              const angle = (i / 20) * 360;
              const rad = (angle * Math.PI) / 180;
              const dist = 300 + Math.random() * 200;
              const tx = Math.cos(rad) * dist;
              const ty = Math.sin(rad) * dist;
              const colors = ["bg-red-400", "bg-purple-400", "bg-cyan-400", "bg-yellow-400", "bg-green-400"];
              return (
                <motion.div key={`particle-${i}`}
                  animate={{
                    x: [0, tx],
                    y: [0, ty],
                    opacity: [1, 0],
                    scale: [1, 0.3],
                  }}
                  transition={{
                    duration: 2 + Math.random() * 2,
                    repeat: Infinity,
                    delay: Math.random() * 2,
                    ease: "easeOut",
                  }}
                  className={`absolute top-1/2 left-1/2 w-1 h-1 md:w-1.5 md:h-1.5 rounded-full ${colors[i % colors.length]} pointer-events-none`}
                />
              );
            })}

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
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 md:w-24 md:h-24 rounded-full pointer-events-none"
              style={{ background: "radial-gradient(circle, rgba(255,255,255,0.3), transparent 70%)" }}
            />

            {/* Rotating portal rings with color shift */}
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150px] h-[150px] md:w-[250px] md:h-[250px] rounded-full pointer-events-none"
              style={{ border: "2px solid rgba(255,100,100,0.3)" }}
            />
            <motion.div animate={{ rotate: -360 }} transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] md:w-[350px] md:h-[350px] rounded-full pointer-events-none"
              style={{ border: "2px dashed rgba(150,100,255,0.2)" }}
            />
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] h-[280px] md:w-[480px] md:h-[480px] rounded-full pointer-events-none"
              style={{ border: "1px solid rgba(100,200,255,0.15)" }}
            />

            {/* Screen shake wrapper for text */}
            <motion.div
              animate={{ x: [0, -2, 3, -1, 0], y: [0, 1, -2, 1, 0] }}
              transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 2 }}
              className="text-center relative z-10 px-4"
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

        <PixelMarquee text="★ LOADING_PLAYER_DATA ★ INITIALIZING ★ PLEASE_WAIT" />

        {/* ═══════════════════════════════════════ */}
        {/* ═══ ABOUT — Character Sheet (Scrollytelling) ═══ */}
        {/* ═══════════════════════════════════════ */}
        <ScrollytellingSection>
          <section id="about" className="py-16 md:py-24 px-4 bg-[#0a0a0a] relative">
            <div className="max-w-5xl mx-auto">
              <motion.div initial={{ y: 20, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true }} className="text-center mb-10 md:mb-16">
                <h2 className="font-pixel text-2xl sm:text-3xl md:text-4xl text-white mb-2 md:mb-3">CHARACTER SHEET</h2>
                <p className="font-pixel text-[8px] md:text-[10px] text-gray-600">PLAYER PROFILE & STATS</p>
              </motion.div>

              <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 md:gap-6">
                {/* Profile Card */}
                <div className="lg:col-span-2">
                  <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                    className="pixel-border bg-black p-4 md:p-6 text-center h-full">
                    <div className="pixel-border bg-white p-2 md:p-3 inline-block mb-4 md:mb-6">
                      <img src="./profile.jpg" alt="Player" className="w-32 h-32 sm:w-36 sm:h-36 md:w-40 md:h-40 pixelated" />
                    </div>
                    <h3 className="font-pixel text-sm md:text-lg text-white mb-2">ARYA_KUSUMA</h3>
                    <p className="font-pixel text-[8px] md:text-[10px] text-gray-500 mb-4">CLASS: BACKEND_MAGE</p>
                    <div className="grid grid-cols-3 gap-2 font-pixel text-[7px] md:text-[8px]">
                      <div className="bg-gray-900 p-2"><span className="text-gray-600 block">STR</span><span className="text-white">90</span></div>
                      <div className="bg-gray-900 p-2"><span className="text-gray-600 block">INT</span><span className="text-white">95</span></div>
                      <div className="bg-gray-900 p-2"><span className="text-gray-600 block">AGI</span><span className="text-white">85</span></div>
                    </div>
                  </motion.div>
                </div>

                {/* Stats */}
                <div className="lg:col-span-3 space-y-4 md:space-y-6">
                  <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                    className="pixel-border bg-black p-4 md:p-6 space-y-3 md:space-y-4">
                    <HPBar label="HP (LARAVEL)" value={90} max={100} color="bg-red-500" delay={0} />
                    <HPBar label="MP (PYTHON)" value={85} max={100} color="bg-blue-500" delay={0.15} />
                    <HPBar label="STAMINA (REACT)" value={75} max={100} color="bg-green-500" delay={0.3} />
                    <HPBar label="MANA (AI / ML)" value={80} max={100} color="bg-purple-500" delay={0.45} />
                  </motion.div>
                  <DialogBox speaker="SYSTEM" text="PLAYER HAS COMPLETED EDUCATION AT TELKOM UNIVERSITY. SPECIALIZES IN BACKEND ENGINEERING AND AI/ML." />
                  <DialogBox speaker="ARYA" text="MY QUEST IS TO BUILD SYSTEMS THAT STAND THE TEST OF TIME. EVERY LINE OF CODE IS A STEP FORWARD." portrait="./profile.jpg" />
                </div>
              </div>
            </div>
          </section>
        </ScrollytellingSection>

        <PixelMarquee text="★ INVENTORY ★ EQUIPMENT ★ SKILL_TREE ★ UPGRADE_AVAILABLE" />

        {/* ═══════════════════════════════════════ */}
        {/* ═══ SKILLS — Inventory Grid (Scrollytelling) ═══ */}
        {/* ═══════════════════════════════════════ */}
        <ScrollytellingSection>
          <section id="skills" className="py-16 md:py-24 px-4 relative">
            <div className="max-w-4xl mx-auto">
              <motion.div initial={{ y: 20, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true }} className="text-center mb-10 md:mb-16">
                <h2 className="font-pixel text-2xl sm:text-3xl md:text-4xl text-white mb-2 md:mb-3">INVENTORY</h2>
                <p className="font-pixel text-[8px] md:text-[10px] text-gray-600">EQUIPPED ITEMS & SKILLS</p>
              </motion.div>

              <div className="pixel-border bg-black/80 p-4 sm:p-6 md:p-8">
                <div className="flex justify-between items-center mb-4 md:mb-6">
                  <span className="font-pixel text-[8px] md:text-[10px] text-gray-500">SLOT: {listTools.length}/{listTools.length + 2}</span>
                  <span className="font-pixel text-[8px] md:text-[10px] text-yellow-500">★ RARE ITEMS</span>
                </div>
                <div className="grid grid-cols-3 md:grid-cols-6 gap-3 md:gap-4">
                  {listTools.map((tool, i) => (
                    <InventorySlot key={tool.id} tool={tool} index={i} />
                  ))}
                </div>
                <div className="grid grid-cols-3 md:grid-cols-6 gap-3 md:gap-4 mt-3 md:mt-4 opacity-30">
                  {[1, 2].map(i => (
                    <div key={`empty-${i}`} className="border-2 border-dashed border-gray-800 aspect-square flex items-center justify-center">
                      <span className="font-pixel text-[8px] text-gray-700">EMPTY</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 md:mt-12 grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
                {[
                  { icon: "🏆", title: "FIRST_COMMIT", year: "2022" },
                  { icon: "⚡", title: "SPEED_RUNNER", year: "2023" },
                  { icon: "🧠", title: "AI_PIONEER", year: "2023" },
                  { icon: "🔥", title: "FULL_STACK", year: "2024" },
                ].map((ach, i) => (
                  <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                    whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(255,215,0,0.2)" }}
                    className="pixel-border bg-gray-950 p-3 md:p-4 text-center cursor-pointer">
                    <div className="text-2xl md:text-3xl mb-2">{ach.icon}</div>
                    <h4 className="font-pixel text-[7px] md:text-[8px] text-white mb-1">{ach.title}</h4>
                    <span className="font-pixel text-[6px] md:text-[7px] text-gray-700">{ach.year}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        </ScrollytellingSection>

        <PixelMarquee text="★ QUEST_LOG ★ ACTIVE_MISSIONS ★ SIDE_QUESTS ★ COMPLETED" />

        {/* ═══════════════════════════════════════ */}
        {/* ═══ PROJECTS — Quest Log (Scrollytelling) ═══ */}
        {/* ═══════════════════════════════════════ */}
        <ScrollytellingSection>
          <section id="projects" className="py-16 md:py-24 px-4 bg-[#0a0a0a]">
            <div className="max-w-5xl mx-auto">
              <motion.div initial={{ y: 20, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true }} className="text-center mb-10 md:mb-16">
                <h2 className="font-pixel text-2xl sm:text-3xl md:text-4xl text-white mb-2 md:mb-3">QUEST LOG</h2>
                <p className="font-pixel text-[8px] md:text-[10px] text-gray-600">COMPLETED MISSIONS</p>
              </motion.div>

              <div className="space-y-4 md:space-y-6">
                {listProyek.map((project, i) => (
                  <motion.div key={project.id}
                    initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    whileHover={{ x: 8 }}
                    onClick={() => setSelectedProject(project)}
                    className="pixel-border bg-black p-4 sm:p-5 md:p-6 cursor-pointer group hover:bg-gray-950 transition-colors"
                  >
                    <div className="flex flex-col sm:flex-row items-start gap-4 md:gap-6">
                      <div className="pixel-border bg-gray-900 p-2 md:p-3 flex-shrink-0 group-hover:bg-yellow-500 transition-colors">
                        <span className="text-2xl md:text-3xl">{['⚔️', '🛡️', '🔮', '📜'][i]}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2 md:gap-3 mb-2">
                          <h3 className="font-pixel text-[10px] sm:text-xs md:text-sm text-white">{project.title}</h3>
                          <span className="font-pixel text-[7px] md:text-[8px] text-green-400 border border-green-800 px-1.5 py-0.5 md:px-2">COMPLETED</span>
                        </div>
                        <p className="font-pixel text-[7px] sm:text-[8px] md:text-[10px] text-gray-500 mb-3">{project.desc}</p>
                        <div className="flex flex-wrap gap-1.5 md:gap-2">
                          {project.tech.map(t => (
                            <span key={t} className="font-pixel text-[6px] md:text-[7px] text-gray-600 bg-gray-900 px-2 py-0.5 md:py-1">{t}</span>
                          ))}
                        </div>
                      </div>
                      <div className="flex-shrink-0 self-center hidden sm:block">
                        <span className="font-pixel text-[8px] text-gray-700 group-hover:text-white transition-colors">VIEW →</span>
                      </div>
                    </div>
                    <div className="mt-3 md:mt-4 h-1 md:h-1.5 bg-gray-900 overflow-hidden">
                      <motion.div initial={{ width: 0 }} whileInView={{ width: "100%" }}
                        viewport={{ once: true }} transition={{ duration: 1.5, delay: i * 0.2 }}
                        className="h-full bg-gradient-to-r from-yellow-600 to-yellow-400" />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        </ScrollytellingSection>

        <PixelMarquee text="★ FINAL_STAGE ★ BOSS_ARENA ★ PREPARE_FOR_BATTLE" />

        {/* ═══════════════════════════════════════ */}
        {/* ═══ CONTACT — Boss Encounter (Scrollytelling) ═══ */}
        {/* ═══════════════════════════════════════ */}
        <ScrollytellingSection>
          <section id="contact" className="py-16 md:py-32 px-4 relative">
            <div className="absolute inset-0 opacity-10 -z-10 pointer-events-none">
              <motion.div animate={{ backgroundPosition: ["0% 0%", "100% 100%"] }}
                transition={{ duration: 20, repeat: Infinity, repeatType: "reverse" }}
                className="w-full h-full"
                style={{ background: "radial-gradient(circle at 50% 50%, rgba(255,0,0,0.3), transparent 60%)" }} />
            </div>

            <div className="max-w-3xl mx-auto relative z-10">
              <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10 md:mb-16">
                <motion.div animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 2, repeat: Infinity }} className="mb-4 md:mb-6">
                  <span className="font-pixel text-[8px] md:text-[10px] text-red-500 tracking-[0.3em]">⚠ WARNING ⚠</span>
                </motion.div>
                <h2 className="font-pixel text-2xl sm:text-3xl md:text-5xl text-white mb-3 md:mb-4">FINAL BOSS</h2>
                <p className="font-pixel text-[8px] md:text-[10px] text-gray-500">SEND_MESSAGE TO DEFEAT</p>
              </motion.div>

              <motion.div initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }}
                transition={{ duration: 1 }} className="mb-8 md:mb-12 origin-left">
                <div className="flex justify-between font-pixel text-[8px] md:text-[10px] mb-2">
                  <span className="text-red-500">BOSS_HP</span>
                  <span className="text-white">9999/9999</span>
                </div>
                <div className="h-4 md:h-6 bg-gray-900 border-4 border-white overflow-hidden">
                  <motion.div animate={{ width: ["100%", "95%", "100%"] }} transition={{ duration: 3, repeat: Infinity }}
                    className="h-full bg-gradient-to-r from-red-700 to-red-500 relative">
                    <div className="absolute inset-0" style={{ backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 3px, rgba(0,0,0,0.3) 3px, rgba(0,0,0,0.3) 4px)' }} />
                  </motion.div>
                </div>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: 0.3 }} className="pixel-border bg-gray-950 p-5 sm:p-6 md:p-10">
                <div className="flex items-start gap-4 md:gap-6 mb-6 md:mb-8">
                  <div className="pixel-border bg-white p-1.5 md:p-2 flex-shrink-0">
                    <img src="./profile.jpg" alt="NPC" className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 pixelated" />
                  </div>
                  <div>
                    <span className="font-pixel text-[8px] md:text-[10px] text-yellow-400 block mb-1">ARYA_NPC:</span>
                    <p className="font-pixel text-[7px] sm:text-[8px] md:text-[10px] text-gray-300 leading-relaxed">
                      "GREETINGS, ADVENTURER! YOU'VE MADE IT TO THE FINAL STAGE. LEAVE YOUR COORDINATES AND I SHALL RESPOND..."
                    </p>
                  </div>
                </div>

                <div className="space-y-4 md:space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                    <div>
                      <label className="font-pixel text-[7px] md:text-[8px] text-gray-600 block mb-1 md:mb-2">PLAYER_NAME</label>
                      <input type="text" placeholder="ENTER_NAME..."
                        className="w-full bg-black border-2 border-gray-700 focus:border-white p-3 md:p-4 font-pixel text-[8px] md:text-[10px] text-white outline-none transition-colors" />
                    </div>
                    <div>
                      <label className="font-pixel text-[7px] md:text-[8px] text-gray-600 block mb-1 md:mb-2">CONTACT_SCAN</label>
                      <input type="email" placeholder="ENTER_EMAIL..."
                        className="w-full bg-black border-2 border-gray-700 focus:border-white p-3 md:p-4 font-pixel text-[8px] md:text-[10px] text-white outline-none transition-colors" />
                    </div>
                  </div>
                  <div>
                    <label className="font-pixel text-[7px] md:text-[8px] text-gray-600 block mb-1 md:mb-2">QUEST_DETAILS</label>
                    <textarea rows="3" placeholder="DESCRIBE_YOUR_QUEST..."
                      className="w-full bg-black border-2 border-gray-700 focus:border-white p-3 md:p-4 font-pixel text-[8px] md:text-[10px] text-white outline-none transition-colors resize-none" />
                  </div>
                  <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                    className="w-full pixel-button !bg-red-600 !text-white !shadow-[inset_-4px_-4px_0_#8b0000,4px_4px_0_#000] py-4 md:py-5 text-[10px] md:text-sm">
                    ⚔ ATTACK (SEND MESSAGE) ⚔
                  </motion.button>
                </div>
              </motion.div>
            </div>

            <footer className="mt-16 md:mt-24 text-center py-6 md:py-8 border-t-2 border-white/5">
              <p className="font-pixel text-[6px] md:text-[7px] text-gray-700">© 2026 ARYAKUSUMA · BUILT WITH PIXELS AND PASSION</p>
            </footer>
          </section>
        </ScrollytellingSection>
      </main>

      <ScrollToTop />
      <ProjectModal isOpen={!!selectedProject} onClose={() => setSelectedProject(null)} project={selectedProject} />
    </div>
  );
};

export default RetroContent;
