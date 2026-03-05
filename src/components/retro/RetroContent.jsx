import { useRef, useState, Suspense, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import ProjectModal from "../ProjectModal/ProjectModal";
import Aurora from "../Aurora/Aurora";
import ScrollToTop from "../ScrollToTop";
import MiniMap from "./MiniMap";
import PixelMarquee from "./PixelMarquee";
import HeroParallax from "./HeroParallax";
import PortalReveal from "./PortalReveal";
import RetroAbout from "./RetroAbout";
import RetroSkills from "./RetroSkills";
import RetroProjects from "./RetroProjects";
import RetroContact from "./RetroContact";

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

  const yBack  = useTransform(smoothProgress, [0, 0.15], [0, -100]);
  const yMid   = useTransform(smoothProgress, [0, 0.15], [0, -220]);
  const yFront = useTransform(smoothProgress, [0, 0.15], [0, -380]);
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
        <HeroParallax yBack={yBack} yMid={yMid} yFront={yFront} />
        <PortalReveal />

        <PixelMarquee text="★ LOADING_PLAYER_DATA ★ INITIALIZING ★ PLEASE_WAIT" />
        <RetroAbout />

        <PixelMarquee text="★ INVENTORY ★ EQUIPMENT ★ SKILL_TREE ★ UPGRADE_AVAILABLE" />
        <RetroSkills />

        <PixelMarquee text="★ QUEST_LOG ★ ACTIVE_MISSIONS ★ SIDE_QUESTS ★ COMPLETED" />
        <RetroProjects onSelectProject={setSelectedProject} />

        <PixelMarquee text="★ FINAL_STAGE ★ BOSS_ARENA ★ PREPARE_FOR_BATTLE" />
        <RetroContact />
      </main>

      <ScrollToTop />
      <ProjectModal isOpen={!!selectedProject} onClose={() => setSelectedProject(null)} project={selectedProject} />
    </div>
  );
};

export default RetroContent;
