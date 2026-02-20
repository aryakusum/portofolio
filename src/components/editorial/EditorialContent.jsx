import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion';
import EditorialHero from './EditorialHero';
import ImageSequence from './ImageSequence';
import { listTools, listProyek } from '../../data';
import { ArrowUpRight, ArrowDown } from 'lucide-react';

/* ─── Giant Number Marker ─── */
const SectionMarker = ({ number, label }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  return (
    <div ref={ref} className="relative mb-12 md:mb-20 overflow-hidden">
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={isInView ? { y: 0, opacity: 1 } : {}}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="flex items-end gap-4 md:gap-8"
      >
        <span className="font-serif text-[6rem] sm:text-[8rem] md:text-[12rem] lg:text-[16rem] leading-none tracking-tighter text-[#1a1a1a]/[0.06]">
          {number}
        </span>
        <div className="pb-4 md:pb-8">
          <div className="h-px w-12 md:w-20 bg-black/20 mb-3 md:mb-4" />
          <h2 className="font-serif text-2xl sm:text-3xl md:text-5xl tracking-tight">{label}</h2>
        </div>
      </motion.div>
    </div>
  );
};

/* ─── Horizontal Scroll Ticker ─── */
const ScrollTicker = ({ text, speed = 20 }) => (
  <div className="overflow-hidden py-6 md:py-10 border-y border-black/[0.06]">
    <motion.div
      animate={{ x: ["0%", "-50%"] }}
      transition={{ duration: speed, repeat: Infinity, ease: "linear" }}
      className="flex gap-12 md:gap-20 whitespace-nowrap"
    >
      {Array(8).fill(null).map((_, i) => (
        <span key={i} className="font-serif text-4xl sm:text-6xl md:text-8xl lg:text-[10rem] text-black/[0.03] italic select-none">
          {text} —
        </span>
      ))}
    </motion.div>
  </div>
);

/* ─── Bento Skill Card ─── */
const BentoCard = ({ tool, index, size = "normal" }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const sizeClasses = {
    large: "col-span-2 row-span-2",
    tall: "row-span-2",
    wide: "col-span-2",
    normal: ""
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -6 }}
      className={`group relative border border-black/[0.08] p-5 sm:p-6 md:p-8 cursor-pointer transition-all duration-700 hover:bg-[#1a1a1a] hover:text-[#f4f4f0] overflow-hidden ${sizeClasses[size]}`}
    >
      {/* Hover diagonal  */}
      <motion.div className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] bg-[#1a1a1a] rotate-12 origin-center
        translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] -z-10" />
      
      <div className="relative z-10 h-full flex flex-col justify-between">
        <div className="flex justify-between items-start mb-4 md:mb-6">
          <span className="font-sans text-[8px] md:text-[9px] tracking-[0.3em] opacity-30 group-hover:opacity-70 transition-opacity">
            0{index + 1}
          </span>
          <motion.div whileHover={{ rotate: 45 }} className="opacity-0 group-hover:opacity-80 transition-opacity">
            <ArrowUpRight size={14} />
          </motion.div>
        </div>

        <div>
          <img src={tool.gambar} alt={tool.nama} className="w-8 h-8 md:w-10 md:h-10 mb-3 md:mb-4 grayscale group-hover:grayscale-0 transition-all duration-500 opacity-60 group-hover:opacity-100" />
          <h3 className="font-serif text-xl sm:text-2xl md:text-3xl mb-1 md:mb-2 group-hover:italic transition-all duration-500">{tool.nama}</h3>
          <p className="font-sans text-[9px] md:text-[10px] opacity-40 group-hover:opacity-80 tracking-wider uppercase">{tool.ket}</p>
        </div>
      </div>
    </motion.div>
  );
};

/* ─── Staggered Project Card ─── */
const ProjectShowcase = ({ project, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-150px" });
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const imageY = useTransform(scrollYProgress, [0, 1], ["15%", "-15%"]);
  const isEven = index % 2 === 0;

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ duration: 1 }}
      className="relative"
    >
      <div className={`flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} gap-6 md:gap-0 items-center`}>
        {/* Image Side - Offset */}
        <motion.div 
          initial={{ x: isEven ? -60 : 60, opacity: 0 }}
          animate={isInView ? { x: 0, opacity: 1 } : {}}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className={`w-full md:w-3/5 relative ${isEven ? 'md:pr-8' : 'md:pl-8'}`}
        >
          <div className="relative overflow-hidden aspect-[16/10] group">
            <motion.img
              style={{ y: imageY }}
              src={project.image}
              alt={project.title}
              className="absolute inset-0 w-full h-[130%] object-cover grayscale group-hover:grayscale-0 transition-all duration-1000"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            {/* Floating project number */}
            <motion.div
              initial={{ scale: 0 }}
              animate={isInView ? { scale: 1 } : {}}
              transition={{ delay: 0.5, type: "spring" }}
              className={`absolute ${isEven ? '-right-4 md:-right-8' : '-left-4 md:-left-8'} -bottom-4 md:-bottom-6 w-16 h-16 md:w-24 md:h-24 bg-[#1a1a1a] text-[#f4f4f0] rounded-full flex items-center justify-center z-10`}
            >
              <span className="font-serif text-xl md:text-3xl italic">0{index + 1}</span>
            </motion.div>
          </div>
        </motion.div>

        {/* Text Side */}
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className={`w-full md:w-2/5 flex flex-col justify-center ${isEven ? 'md:pl-8 lg:pl-16' : 'md:pr-8 lg:pr-16'}`}
        >
          <span className="font-sans text-[9px] md:text-[10px] tracking-[0.3em] uppercase opacity-40 mb-3 md:mb-4 block">
            {project.subtitle}
          </span>
          <h3 className="font-serif text-3xl sm:text-4xl md:text-5xl tracking-tight leading-[0.95] mb-4 md:mb-6">
            {project.title}
          </h3>
          <p className="font-sans text-xs md:text-sm opacity-50 leading-relaxed mb-6 md:mb-8 max-w-sm">
            {project.fullDescription || project.desc}
          </p>
          <div className="flex flex-wrap gap-2 mb-6 md:mb-8">
            {project.tech.map((t, i) => (
              <span key={t} className="px-3 py-1 md:px-4 md:py-1.5 bg-[#1a1a1a]/[0.04] font-sans text-[8px] md:text-[9px] uppercase tracking-[0.15em] hover:bg-[#1a1a1a] hover:text-[#f4f4f0] transition-all duration-300 cursor-default">
                {t}
              </span>
            ))}
          </div>
          <motion.a
            href={project.url} target="_blank" rel="noopener noreferrer"
            whileHover={{ x: 6 }}
            className="inline-flex items-center gap-2 group/link font-sans text-[10px] md:text-xs uppercase tracking-[0.2em] font-medium"
          >
            <span className="relative">
              View Project
              <span className="absolute bottom-0 left-0 w-0 h-px bg-[#1a1a1a] group-hover/link:w-full transition-all duration-500" />
            </span>
            <ArrowUpRight size={12} className="group-hover/link:rotate-45 transition-transform duration-300" />
          </motion.a>
        </motion.div>
      </div>
    </motion.article>
  );
};

/* ─── Diagonal Section Cut ─── */
const DiagonalCut = ({ dark = false }) => (
  <div className={`relative h-24 md:h-40 ${dark ? 'bg-[#1a1a1a]' : 'bg-[#f4f4f0]'}`}>
    <svg viewBox="0 0 1440 100" preserveAspectRatio="none" className="absolute bottom-0 left-0 w-full h-full">
      <polygon fill={dark ? "#f4f4f0" : "#1a1a1a"} points="0,100 1440,0 1440,100" />
    </svg>
  </div>
);

/* ─── Sticky Quote Section ─── */
const StickyQuote = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const opacity = useTransform(scrollYProgress, [0.25, 0.45, 0.65, 0.85], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0.25, 0.45], [80, 0]);
  const rotate = useTransform(scrollYProgress, [0.25, 0.45], [3, 0]);

  return (
    <div ref={ref} className="h-[180vh] md:h-[220vh] relative">
      <div className="sticky top-0 h-screen flex items-center justify-center bg-[#1a1a1a] text-[#f4f4f0] overflow-hidden">
        {/* Animated circles */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          className="absolute w-[60vw] h-[60vw] md:w-[40vw] md:h-[40vw] border border-[#f4f4f0]/5 rounded-full"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="absolute w-[80vw] h-[80vw] md:w-[55vw] md:h-[55vw] border border-[#f4f4f0]/[0.03] rounded-full"
        />

        <motion.div style={{ opacity, y, rotate }} className="text-center px-6 max-w-xs sm:max-w-lg md:max-w-4xl relative z-10">
          <span className="font-sans text-[8px] md:text-[10px] tracking-[0.4em] uppercase opacity-30 block mb-6 md:mb-10">
            ✦ Philosophy ✦
          </span>
          <blockquote className="font-serif text-xl sm:text-3xl md:text-5xl lg:text-7xl leading-[1.1] italic">
            "Code is poetry —<br className="hidden sm:block" /> every function<br className="hidden md:block" /> a stanza."
          </blockquote>
          <div className="mt-8 md:mt-14 flex items-center justify-center gap-4">
            <div className="w-6 md:w-10 h-px bg-[#f4f4f0]/20" />
            <span className="font-sans text-[8px] md:text-[9px] tracking-[0.3em] uppercase opacity-20">AK</span>
            <div className="w-6 md:w-10 h-px bg-[#f4f4f0]/20" />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

/* ─── Horizontal Showcase ─── */
const HorizontalShowcase = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"] });
  const x = useTransform(scrollYProgress, [0, 1], ["5%", "-55%"]);

  const items = [
    { title: "Laravel", num: "01", desc: "My backbone. Building robust APIs and elegant backend systems." },
    { title: "Python", num: "02", desc: "From AI models to automation scripts. The Swiss Army knife." },
    { title: "React", num: "03", desc: "Crafting immersive user interfaces with modern patterns." },
    { title: "MySQL", num: "04", desc: "Structuring data that scales. Query optimization expert." },
    { title: "Git", num: "05", desc: "Version-controlled workflows. Clean history, clean code." },
  ];

  return (
    <div ref={containerRef} className="h-[150vh] md:h-[200vh] relative bg-[#f4f4f0]">
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        <motion.div style={{ x }} className="flex gap-4 md:gap-6 pl-6 md:pl-16">
          {items.map((item, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -10 }}
              className="flex-shrink-0 w-[260px] sm:w-[300px] md:w-[380px] h-[340px] sm:h-[380px] md:h-[480px] relative group cursor-pointer"
            >
              {/* Card */}
              <div className="absolute inset-0 border border-black/[0.08] p-6 sm:p-8 md:p-10 flex flex-col justify-between bg-[#f4f4f0] group-hover:bg-[#1a1a1a] group-hover:text-[#f4f4f0] transition-all duration-700">
                <div>
                  <span className="font-sans text-[8px] md:text-[9px] tracking-[0.3em] opacity-30 group-hover:opacity-60">{item.num}</span>
                  <div className="mt-3 md:mt-4 w-8 md:w-12 h-px bg-black/10 group-hover:bg-white/20 transition-colors" />
                </div>
                <div>
                  <h3 className="font-serif text-4xl sm:text-5xl md:text-6xl mb-3 md:mb-4 tracking-tight group-hover:italic transition-all duration-500">
                    {item.title}
                  </h3>
                  <p className="font-sans text-[9px] md:text-[10px] opacity-40 group-hover:opacity-70 tracking-wide leading-relaxed max-w-[220px]">
                    {item.desc}
                  </p>
                </div>
                <ArrowUpRight size={16} className="opacity-20 group-hover:opacity-80 group-hover:rotate-45 transition-all duration-500" />
              </div>
              {/* Shadow card behind */}
              <div className="absolute inset-0 border border-black/5 translate-x-2 translate-y-2 md:translate-x-3 md:translate-y-3 -z-10 group-hover:translate-x-4 group-hover:translate-y-4 transition-transform duration-500" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════════ */
/* ─── MAIN EDITORIAL CONTENT ─── */
/* ═══════════════════════════════════════════ */
const EditorialContent = () => {
  const mainRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: mainRef });
  const progressWidth = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  const bentoSizes = ["large", "normal", "tall", "normal", "wide", "normal"];

  return (
    <div ref={mainRef} className="bg-[#f4f4f0] text-[#1a1a1a] min-h-screen selection:bg-black selection:text-white overflow-x-hidden">
      {/* Progress Bar */}
      <motion.div style={{ scaleX: progressWidth }}
        className="fixed top-0 left-0 right-0 h-[2px] bg-[#1a1a1a] z-[100] origin-left"
      />

      <EditorialHero />
      <ImageSequence />

      <ScrollTicker text="About" speed={25} />

      {/* ═══ ABOUT ═══ */}
      <section id="about" className="py-20 md:py-32 lg:py-48 px-6 md:px-12 lg:px-24 max-w-[1400px] mx-auto">
        <SectionMarker number="01" label="Profile" />
        
        {/* Asymmetric Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 items-start">
          {/* Left Column - wider text */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="md:col-span-7"
          >
            <p className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-[2.8rem] leading-[1.25] mb-8 md:mb-12">
              I craft digital experiences with a focus on
              <span className="italic text-[#1a1a1a]/50"> robust backend architecture</span>.
              Combining the precision of Laravel with the intelligence of Python.
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
            className="md:col-span-5 relative"
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
        </div>
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
                className="font-serif text-4xl sm:text-5xl md:text-7xl leading-[0.95] mb-8"
              >
                Let's build<br />
                <span className="italic text-[#f4f4f0]/50">something</span><br />
                iconic.
              </motion.h2>
              <motion.a
                href="mailto:aryasatriawinata@gmail.com"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                whileHover={{ scale: 1.03, backgroundColor: "#f4f4f0", color: "#1a1a1a" }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-3 border border-[#f4f4f0]/20 px-6 py-3 md:px-8 md:py-4 rounded-full font-sans text-xs md:text-sm transition-all duration-500"
              >
                Start a Collaboration
                <ArrowUpRight size={14} />
              </motion.a>
            </div>

            {/* Right - Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="space-y-8 md:space-y-10"
            >
              {[
                { label: "Email", value: "aryasatriawinata@gmail.com" },
                { label: "Location", value: "Bandung, Indonesia" },
                { label: "GitHub", value: "github.com/aryakusum" },
              ].map((item, i) => (
                <div key={i} className="border-b border-[#f4f4f0]/10 pb-4 md:pb-6">
                  <h4 className="font-sans text-[8px] md:text-[9px] tracking-[0.3em] uppercase opacity-30 mb-2 md:mb-3">{item.label}</h4>
                  <p className="font-sans text-xs md:text-sm opacity-70">{item.value}</p>
                </div>
              ))}
            </motion.div>
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
