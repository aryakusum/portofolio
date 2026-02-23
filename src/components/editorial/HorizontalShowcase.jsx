import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

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

export default HorizontalShowcase;
