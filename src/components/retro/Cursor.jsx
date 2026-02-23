import { motion } from 'framer-motion';

/* ─── Blinking cursor ─── */
const Cursor = () => (
  <motion.span 
    animate={{ opacity: [1, 0, 1] }} 
    transition={{ duration: 1, repeat: Infinity }} 
    className="inline-block w-2 h-3 md:w-3 md:h-4 bg-white ml-1 align-middle" 
  />
);

export default Cursor;
