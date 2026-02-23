import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

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

export default SectionMarker;
