import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import EditorialGrid from './EditorialGrid';

/* ─── Sticky Quote Section ─── */
const StickyQuote = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const opacity = useTransform(scrollYProgress, [0.25, 0.45, 0.65, 0.85], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0.25, 0.45], [80, 0]);
  const rotate = useTransform(scrollYProgress, [0.25, 0.45], [3, 0]);

  return (
    <div ref={ref} className="h-[180vh] md:h-[220vh] relative">
      <div className="sticky top-0 h-screen flex items-center justify-center bg-editorial-text text-editorial-bg overflow-hidden">
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

        <EditorialGrid className="w-full z-10">
          <motion.div style={{ opacity, y, rotate }} className="col-span-4 md:col-start-3 md:col-span-8 text-center relative w-full">
            <span className="font-sans text-[8px] md:text-[10px] tracking-[0.4em] uppercase opacity-30 block mb-6 md:mb-10">
              ✦ Philosophy ✦
            </span>
            <blockquote className="font-serif text-editorial-display leading-[1.1] italic">
              "Code is poetry —<br className="hidden sm:block" /> every function<br className="hidden md:block" /> a stanza."
            </blockquote>
            <div className="mt-8 md:mt-14 flex items-center justify-center gap-4">
              <div className="w-6 md:w-10 h-px bg-[#f4f4f0]/20" />
              <span className="font-sans text-[8px] md:text-[9px] tracking-[0.3em] uppercase opacity-20">AK</span>
              <div className="w-6 md:w-10 h-px bg-[#f4f4f0]/20" />
            </div>
          </motion.div>
        </EditorialGrid>
      </div>
    </div>
  );
};

export default StickyQuote;
