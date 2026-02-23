import { motion } from 'framer-motion';

/* ─── Pixel Marquee ─── */
const PixelMarquee = ({ text }) => (
  <div className="overflow-hidden py-3 md:py-6 border-y-4 border-white/5 bg-[#050505]">
    <motion.div 
      animate={{ x: [0, -1500] }} 
      transition={{ duration: 20, repeat: Infinity, ease: "linear" }} 
      className="flex gap-8 md:gap-16 whitespace-nowrap"
    >
      {Array(10).fill(null).map((_, i) => (
        <span key={i} className="font-pixel text-lg sm:text-2xl md:text-4xl text-white/[0.04]">
          {text} ·
        </span>
      ))}
    </motion.div>
  </div>
);

export default PixelMarquee;
