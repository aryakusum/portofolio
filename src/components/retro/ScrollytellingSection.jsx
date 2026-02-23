import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

/* ─── Scrollytelling Wrapper — scroll-driven fade/scale/translate ─── */
const ScrollytellingSection = ({ children }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const opacity = useTransform(scrollYProgress, [0.05, 0.25, 0.75, 0.95], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0.05, 0.25], [100, 0]);
  const scale = useTransform(scrollYProgress, [0.05, 0.25, 0.75, 0.95], [0.92, 1, 1, 0.92]);

  return (
    <div ref={ref} className="min-h-[110vh] relative flex items-center">
      <motion.div style={{ opacity, y, scale }} className="w-full">
        {children}
      </motion.div>
    </div>
  );
};

export default ScrollytellingSection;
