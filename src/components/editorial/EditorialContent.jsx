import { useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import EditorialHero from './EditorialHero';
import ImageSequence from './ImageSequence';
import ScrollTicker from './ScrollTicker';
import DiagonalCut from './DiagonalCut';
import StickyQuote from './StickyQuote';
import HorizontalShowcase from './HorizontalShowcase';
import CustomCursor from './CustomCursor';
import AboutSection from './AboutSection';
import SkillsSection from './SkillsSection';
import ProjectsSection from './ProjectsSection';
import ContactSection from './ContactSection';

/* ═══════════════════════════════════════════ */
/* ─── MAIN EDITORIAL CONTENT ─── */
/* ═══════════════════════════════════════════ */
const EditorialContent = () => {
  const mainRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: mainRef });
  const progressWidth = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  return (
    <div ref={mainRef} className="bg-editorial-bg text-editorial-text min-h-screen selection:bg-black selection:text-white cursor-none overflow-x-hidden">
      <CustomCursor />
      {/* Progress Bar */}
      <motion.div style={{ scaleX: progressWidth }}
        className="fixed top-0 left-0 right-0 h-[2px] bg-[#1a1a1a] z-[100] origin-left"
      />

      <EditorialHero />
      <ImageSequence />

      <ScrollTicker text="About" speed={25} />
      <AboutSection />

      <StickyQuote />

      <ScrollTicker text="Expertise" speed={18} />
      <SkillsSection />

      <HorizontalShowcase />

      <ScrollTicker text="Selected Works" speed={22} />
      <ProjectsSection />

      <DiagonalCut />
      <ContactSection />
    </div>
  );
};

export default EditorialContent;
