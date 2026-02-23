import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

/* ─── RPG Dialog Box ─── */
const DialogBox = ({ speaker, text, portrait = null }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.5, type: "spring" }}
      className="pixel-border bg-black p-4 md:p-6 relative"
    >
      {portrait && (
        <div className="absolute -top-5 -left-3 md:-top-6 md:-left-4 pixel-border bg-white p-1 w-10 h-10 md:w-14 md:h-14">
          <img src={portrait} alt={speaker} className="w-full h-full object-cover pixelated" />
        </div>
      )}
      <div className={portrait ? "ml-6 md:ml-10" : ""}>
        <span className="font-pixel text-[8px] md:text-[10px] text-yellow-400 block mb-2">{speaker}:</span>
        <p className="font-pixel text-[8px] md:text-[10px] text-white leading-relaxed">{text}</p>
      </div>
      <div className="absolute -bottom-2 right-4 md:right-6">
        <motion.span animate={{ y: [0, 4, 0] }} transition={{ duration: 1, repeat: Infinity }} className="font-pixel text-[8px] text-gray-600">▼</motion.span>
      </div>
    </motion.div>
  );
};

export default DialogBox;
