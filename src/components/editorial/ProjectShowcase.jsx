import { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { animate, stagger } from 'animejs';

/* ─── Enhanced Project Showcase with Anime.js ─── */
const ProjectShowcase = ({ project, index }) => {
  const ref = useRef(null);
  const techRef = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-150px" });
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const imageY = useTransform(scrollYProgress, [0, 1], ["15%", "-15%"]);
  const isEven = index % 2 === 0;

  // Anime.js — staggered tech tags
  useEffect(() => {
    if (!isInView || !techRef.current) return;
    const tags = techRef.current.querySelectorAll('.tech-tag');
    if (!tags.length) return;

    animate(tags, {
      translateY: [15, 0],
      opacity: [0, 1],
      scale: [0.8, 1],
      delay: stagger(60, { start: 600 }),
      duration: 500,
      ease: 'outExpo',
    });
  }, [isInView]);

  // Anime.js — progress bar
  useEffect(() => {
    if (!isInView || !ref.current) return;
    const bar = ref.current.querySelector('.progress-fill');
    if (!bar) return;

    animate(bar, {
      width: ['0%', '100%'],
      duration: 1500,
      delay: 800,
      ease: 'inOutExpo',
    });
  }, [isInView]);

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ duration: 1 }}
      className="relative"
    >
      <div className={`flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} gap-6 md:gap-0 items-center`}>
        {/* Image Side */}
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
            {/* Floating number */}
            <motion.div
              initial={{ scale: 0 }}
              animate={isInView ? { scale: 1 } : {}}
              transition={{ delay: 0.5, type: "spring" }}
              className={`absolute ${isEven ? '-right-4 md:-right-8' : '-left-4 md:-left-8'} -bottom-4 md:-bottom-6 w-16 h-16 md:w-24 md:h-24 bg-[#1a1a1a] text-[#f4f4f0] rounded-full flex items-center justify-center z-10`}
            >
              <span className="font-serif text-xl md:text-3xl italic">0{index + 1}</span>
            </motion.div>
          </div>

          {/* Progress bar under image */}
          <div className="mt-3 h-[2px] bg-black/[0.06] overflow-hidden">
            <div className="progress-fill h-full bg-[#1a1a1a]/20" style={{ width: 0 }} />
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
          <div ref={techRef} className="flex flex-wrap gap-2 mb-6 md:mb-8">
            {project.tech.map((t) => (
              <span
                key={t}
                className="tech-tag px-3 py-1 md:px-4 md:py-1.5 bg-[#1a1a1a]/[0.04] font-sans text-[8px] md:text-[9px] uppercase tracking-[0.15em] hover:bg-[#1a1a1a] hover:text-[#f4f4f0] transition-all duration-300 cursor-default"
                style={{ opacity: 0 }}
              >
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

export default ProjectShowcase;
