import { useRef, useEffect } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import EditorialHero from './EditorialHero';
import ImageSequence from './ImageSequence';
import SectionMarker from './SectionMarker';
import ScrollTicker from './ScrollTicker';
import DiagonalCut from './DiagonalCut';
import BentoCard from './BentoCard';
import ProjectShowcase from './ProjectShowcase';
import StickyQuote from './StickyQuote';
import HorizontalShowcase from './HorizontalShowcase';
import EditorialGrid from './EditorialGrid';
import CustomCursor from './CustomCursor';
import MagneticButton from './MagneticButton';
import { listTools, listProyek } from '../../data';
import { ArrowUpRight } from 'lucide-react';
import { animate, stagger } from 'animejs';













/* ═══════════════════════════════════════════ */
/* ─── MAIN EDITORIAL CONTENT ─── */
/* ═══════════════════════════════════════════ */
const EditorialContent = () => {
  const mainRef = useRef(null);
  const aboutTextRef = useRef(null);
  const contactInfoRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: mainRef });
  const progressWidth = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  const bentoSizes = ["large", "normal", "tall", "normal", "wide", "normal"];

  // Anime.js — typewriter effect on About paragraph
  useEffect(() => {
    if (!aboutTextRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const words = aboutTextRef.current.querySelectorAll('.word');
          animate(words, {
            opacity: [0, 1],
            translateY: [8, 0],
            delay: stagger(30),
            duration: 400,
            ease: 'outExpo',
          });
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(aboutTextRef.current);
    return () => observer.disconnect();
  }, []);

  // Anime.js — contact info stagger
  useEffect(() => {
    if (!contactInfoRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const items = contactInfoRef.current.querySelectorAll('.contact-item');
          animate(items, {
            translateX: [30, 0],
            opacity: [0, 1],
            delay: stagger(120, { start: 200 }),
            duration: 700,
            ease: 'outExpo',
          });
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(contactInfoRef.current);
    return () => observer.disconnect();
  }, []);

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

      {/* ═══ ABOUT ═══ */}
      <section id="about" className="py-20 md:py-32 lg:py-48 px-6 md:px-12 lg:px-24 max-w-[1600px] mx-auto">
        <SectionMarker number="01" label="Profile" />
        
        {/* Asymmetric Layout using EditorialGrid */}
        <EditorialGrid className="!px-0 mx-0 max-w-none items-start">
          {/* Left Column - wider text */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="col-span-4 md:col-span-7"
          >
            <p ref={aboutTextRef} className="font-serif text-editorial-display leading-[1.25] mb-8 md:mb-12">
              {'I craft digital experiences with a focus on robust backend architecture. Combining the precision of Laravel with the intelligence of Python.'.split(' ').map((word, i) => (
                <span key={i} className="word inline-block mr-[0.3em]" style={{ opacity: 0 }}>
                  {word.includes('robust') || word.includes('backend') || word.includes('architecture.') ? (
                    <span className="italic text-[#1a1a1a]/50">{word}</span>
                  ) : word}
                </span>
              ))}
            </p>
            
            {/* Stats Bar */}
            <div className="grid grid-cols-3 gap-4 md:gap-8 border-t border-b border-black/[0.08] py-6 md:py-8">
              {[
                { label: "Education", value: "Telkom University" },
                { label: "Focus", value: "AI / Machine Learning" },
                { label: "Location", value: "Bandung, ID" },
              ].map((stat, i) => (
                <motion.div key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 + 0.3 }}
                >
                  <h4 className="font-sans text-[8px] md:text-[9px] tracking-[0.2em] uppercase opacity-30 mb-2 md:mb-3">{stat.label}</h4>
                  <p className="font-sans text-[10px] md:text-xs">{stat.value}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Column - stacked images */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
            className="col-span-4 md:col-span-5 relative"
          >
            <div className="relative">
              <div className="aspect-[3/4] overflow-hidden max-w-sm mx-auto md:max-w-none">
                <img src="./profile.jpg" alt="Arya" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000" />
              </div>
              {/* Overlapping caption box */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 }}
                className="absolute -bottom-6 -left-4 md:-left-8 bg-[#1a1a1a] text-[#f4f4f0] p-4 md:p-6 max-w-[200px] md:max-w-[240px]"
              >
                <p className="font-sans text-[9px] md:text-[10px] leading-relaxed opacity-80">
                  Backend Engineer · AI Enthusiast · Digital Craftsman
                </p>
              </motion.div>
            </div>
          </motion.div>
        </EditorialGrid>
      </section>

      <StickyQuote />

      <ScrollTicker text="Expertise" speed={18} />

      {/* ═══ SKILLS — Bento Grid ═══ */}
      <section id="skills" className="py-20 md:py-32 lg:py-48 px-6 md:px-12 lg:px-24 max-w-[1400px] mx-auto">
        <SectionMarker number="02" label="Expertise" />
        <div className="grid grid-cols-2 md:grid-cols-4 auto-rows-[140px] sm:auto-rows-[160px] md:auto-rows-[180px] gap-3 md:gap-4">
          {listTools.map((tool, i) => (
            <BentoCard key={tool.id} tool={tool} index={i} size={bentoSizes[i]} />
          ))}
        </div>
      </section>

      <HorizontalShowcase />

      <ScrollTicker text="Selected Works" speed={22} />

      {/* ═══ PROJECTS ═══ */}
      <section id="projects" className="py-20 md:py-32 lg:py-48 px-6 md:px-12 lg:px-24">
        <div className="max-w-[1400px] mx-auto">
          <SectionMarker number="03" label="Selected Works" />
          <div className="space-y-24 md:space-y-40 lg:space-y-56">
            {listProyek.map((project, i) => (
              <ProjectShowcase key={project.id} project={project} index={i} />
            ))}
          </div>
        </div>
      </section>

      <DiagonalCut />

      {/* ═══ CONTACT ═══ */}
      <section id="contact" className="min-h-[80vh] py-20 md:py-32 lg:py-48 px-6 md:px-12 lg:px-24 bg-[#1a1a1a] text-[#f4f4f0] relative overflow-hidden">
        {/* Animated gradient circles */}
        <motion.div
          animate={{ scale: [1, 1.3, 1], opacity: [0.02, 0.05, 0.02] }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100vw] md:w-[60vw] aspect-square rounded-full border border-[#f4f4f0]/5"
        />

        <div className="max-w-[1000px] mx-auto relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">
            {/* Left - Big CTA */}
            <div>
              <motion.span
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 0.3 }}
                viewport={{ once: true }}
                className="font-sans text-[8px] md:text-[9px] tracking-[0.4em] uppercase block mb-6 md:mb-8"
              >
                Get in Touch
              </motion.span>
              <motion.h2
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className="font-serif text-editorial-hero leading-[0.95] mb-8"
              >
                Let's build<br />
                <span className="italic text-[#f4f4f0]/50">something</span><br />
                iconic.
              </motion.h2>
              <MagneticButton>
                <motion.a
                  href="mailto:aryasatriawinata@gmail.com"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                  whileHover={{ scale: 1.03, backgroundColor: "#f4f4f0", color: "#1a1a1a" }}
                  whileTap={{ scale: 0.97 }}
                  className="interactive inline-flex items-center gap-3 border border-[#f4f4f0]/20 px-6 py-3 md:px-8 md:py-4 rounded-full font-sans text-xs md:text-sm transition-all duration-500"
                >
                  Start a Collaboration
                  <ArrowUpRight size={14} />
                </motion.a>
              </MagneticButton>
            </div>

            {/* Right - Info */}
            <div
              ref={contactInfoRef}
              className="space-y-8 md:space-y-10"
            >
              {[
                { label: "Email", value: "aryasatriawinata@gmail.com" },
                { label: "Location", value: "Bandung, Indonesia" },
                { label: "GitHub", value: "github.com/aryakusum" },
              ].map((item, i) => (
                <div key={i} className="contact-item border-b border-[#f4f4f0]/10 pb-4 md:pb-6" style={{ opacity: 0 }}>
                  <h4 className="font-sans text-[8px] md:text-[9px] tracking-[0.3em] uppercase opacity-30 mb-2 md:mb-3">{item.label}</h4>
                  <p className="font-sans text-xs md:text-sm opacity-70">{item.value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Footer */}
          <footer className="mt-24 md:mt-40 border-t border-[#f4f4f0]/10 pt-6 md:pt-8 flex flex-col md:flex-row justify-between font-sans text-[7px] md:text-[8px] tracking-[0.2em] uppercase opacity-20 gap-2">
            <span>© 2024 Arya Kusuma</span>
            <span>Crafted with precision</span>
          </footer>
        </div>
      </section>
    </div>
  );
};

export default EditorialContent;
