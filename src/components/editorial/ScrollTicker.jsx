import { motion } from 'framer-motion';

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

export default ScrollTicker;
