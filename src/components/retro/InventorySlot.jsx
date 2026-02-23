import { useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { animate } from 'animejs';

/* ─── Inventory Slot — Enhanced with Anime.js equip animation ─── */
const InventorySlot = ({ item, index }) => {
  if (!item) return null;
  const ref = useRef(null);
  const imgRef = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-30px" });

  // Anime.js — staggered item entry (equip bounce)
  useEffect(() => {
    if (!isInView || !ref.current) return;

    animate(ref.current, {
      translateY: [30, -5, 0],
      opacity: [0, 1],
      scale: [0.8, 1.05, 1],
      duration: 600,
      delay: index * 80,
      ease: 'outExpo',
    });
  }, [isInView, index]);

  // Hover — icon bounce + glow pulse
  const handleMouseEnter = () => {
    if (!imgRef.current) return;
    animate(imgRef.current, {
      scale: [1, 1.3, 1.1],
      rotate: [0, -15, 10, 0],
      duration: 500,
      ease: 'outElastic(1, .6)',
    });
  };

  return (
    <motion.div
      ref={ref}
      style={{ opacity: 0 }}
      whileHover={{
        y: -4,
        boxShadow: '0 0 15px rgba(74,222,128,0.3), inset 0 0 15px rgba(74,222,128,0.1)',
      }}
      onMouseEnter={handleMouseEnter}
      className="group relative pixel-border bg-gray-900/80 p-3 md:p-4 text-center cursor-pointer transition-all duration-300 hover:border-green-500/50"
    >
      {/* Item rarity glow */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ background: 'radial-gradient(circle at 50% 30%, rgba(74,222,128,0.1) 0%, transparent 70%)' }}
      />

      <img
        ref={imgRef}
        src={item.gambar}
        alt={item.nama}
        className="w-8 h-8 md:w-10 md:h-10 mx-auto mb-2 md:mb-3 pixelated"
      />
      <p className="font-pixel text-[7px] md:text-[8px] text-gray-400 mb-2 truncate">{item.nama}</p>

      {/* Skill level bar */}
      <div className="h-1.5 bg-gray-800 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={isInView ? { width: `${60 + index * 7}%` } : {}}
          transition={{ duration: 1, delay: 0.3 + index * 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="h-full bg-green-500/60"
        />
      </div>

      {/* Tooltip */}
      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-black border-2 border-green-500/50 p-2 md:p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-50 min-w-[120px] md:min-w-[140px]">
        <p className="font-pixel text-[7px] md:text-[8px] text-green-400 mb-1">{item.nama}</p>
        <p className="font-pixel text-[6px] md:text-[7px] text-gray-500">{item.ket}</p>
        <div className="mt-1 flex items-center gap-1">
          <span className="font-pixel text-[6px] text-yellow-400">★</span>
          <span className="font-pixel text-[6px] text-gray-600">LVL {Math.min(99, 60 + index * 7)}</span>
        </div>
        <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-green-500/50" />
      </div>
    </motion.div>
  );
};

export default InventorySlot;
