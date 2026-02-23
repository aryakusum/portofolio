import { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';

/* ─── HP/Status Bar — Enhanced with animated counter ─── */
const HPBar = ({ label, value, max = 100, color = '#4ade80' }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [displayValue, setDisplayValue] = useState(0);

  // Check if color is a tailwind class
  const isTailwindClass = color.startsWith('bg-');

  // Animated number counter using requestAnimationFrame
  useEffect(() => {
    if (!isInView) return;
    let startTime = null;
    const duration = 1500;
    const startVal = 0;

    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setDisplayValue(Math.round(startVal + (value - startVal) * eased));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [isInView, value]);

  return (
    <div ref={ref} className="mb-4 md:mb-6">
      <div className="flex justify-between items-center mb-1 md:mb-2">
        <span className="font-pixel text-[8px] md:text-[10px] text-gray-400 uppercase tracking-wider">{label}</span>
        <span className="font-pixel text-[8px] md:text-[10px] text-gray-500">
          {displayValue}/{max}
        </span>
      </div>
      <div className="h-3 md:h-4 bg-gray-900 border-2 border-gray-700 relative overflow-hidden pixel-border shadow-[0_0_10px_rgba(0,0,0,0.5)]">
        <motion.div
          className={`h-full ${isTailwindClass ? color : ''} relative`}
          initial={{ width: 0 }}
          animate={isInView ? { width: `${(value / max) * 100}%` } : {}}
          transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          style={!isTailwindClass ? { backgroundColor: color } : {}}
        >
          {/* Animated Shine Effect */}
          <motion.div
            animate={{ x: ['-100%', '200%'] }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear", delay: 1 }}
            className="absolute inset-0 w-1/2 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-[-20deg]"
          />
        </motion.div>
        {/* Scanline overlay */}
        <div className="absolute inset-0 opacity-20 pointer-events-none"
          style={{
            backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 1px, rgba(0,0,0,0.3) 1px, rgba(0,0,0,0.3) 2px)',
          }}
        />
      </div>
    </div>
  );
};

export default HPBar;
