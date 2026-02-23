import { useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { animate } from 'animejs';

/* ─── Bento Skill Card — Enhanced with Anime.js ─── */
const BentoCard = ({ tool, index, size = "normal" }) => {
  const ref = useRef(null);
  const iconRef = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const sizeClasses = {
    large: "col-span-2 row-span-2",
    tall: "row-span-2",
    wide: "col-span-2",
    normal: ""
  };

  // Anime.js cascade entry
  useEffect(() => {
    if (!isInView || !ref.current) return;

    animate(ref.current, {
      translateY: [40, 0],
      opacity: [0, 1],
      scale: [0.92, 1],
      duration: 800,
      delay: index * 80,
      ease: 'outExpo',
    });
  }, [isInView, index]);

  // Icon hover animation
  const handleMouseEnter = () => {
    if (!iconRef.current) return;
    animate(iconRef.current, {
      scale: [1, 1.3, 1.1],
      rotate: [0, -10, 5, 0],
      duration: 600,
      ease: 'outElastic(1, .6)',
    });
  };

  return (
    <motion.div
      ref={ref}
      style={{ opacity: 0 }}
      whileHover={{ y: -6 }}
      onMouseEnter={handleMouseEnter}
      className={`group relative border border-black/[0.08] p-5 sm:p-6 md:p-8 cursor-pointer transition-all duration-700 hover:bg-[#1a1a1a] hover:text-[#f4f4f0] overflow-hidden ${sizeClasses[size]}`}
    >
      {/* Hover diagonal fill */}
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
          <img
            ref={iconRef}
            src={tool.gambar}
            alt={tool.nama}
            className="w-8 h-8 md:w-10 md:h-10 mb-3 md:mb-4 grayscale group-hover:grayscale-0 transition-all duration-500 opacity-60 group-hover:opacity-100"
          />
          <h3 className="font-serif text-xl sm:text-2xl md:text-3xl mb-1 md:mb-2 group-hover:italic transition-all duration-500">{tool.nama}</h3>
          <p className="font-sans text-[9px] md:text-[10px] opacity-40 group-hover:opacity-80 tracking-wider uppercase">{tool.ket}</p>
        </div>

        {/* Skill level indicator */}
        <div className="mt-3 md:mt-4">
          <div className="h-[2px] bg-black/[0.06] group-hover:bg-white/10 overflow-hidden transition-colors">
            <motion.div
              initial={{ width: 0 }}
              animate={isInView ? { width: `${70 + index * 5}%` } : {}}
              transition={{ duration: 1.2, delay: 0.5 + index * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="h-full bg-black/20 group-hover:bg-white/40 transition-colors"
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default BentoCard;
