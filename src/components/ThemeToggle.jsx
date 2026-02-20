import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { Sun, Gamepad2 } from 'lucide-react';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <motion.button
      onClick={toggleTheme}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`relative flex items-center gap-1.5 md:gap-2 px-3 py-1.5 md:px-4 md:py-2 border-2 transition-all duration-300 z-[200]
        ${theme === 'retro' 
          ? 'bg-gray-800 border-white text-white font-pixel text-[8px] md:text-[10px] shadow-[3px_3px_0_#000] md:shadow-[4px_4px_0_#000]' 
          : 'bg-[#f4f4f0] border-black text-black font-serif text-xs md:text-sm shadow-[2px_2px_10px_rgba(0,0,0,0.1)] rounded-full'
        }`}
    >
      <div className="relative w-4 h-4 md:w-6 md:h-6 flex items-center justify-center">
        <motion.div
          animate={{ opacity: theme === 'retro' ? 1 : 0, rotate: theme === 'retro' ? 0 : -90 }}
          className="absolute"
        >
          <Gamepad2 size={14} className="md:w-4 md:h-4" />
        </motion.div>
        <motion.div
          animate={{ opacity: theme === 'editorial' ? 1 : 0, rotate: theme === 'editorial' ? 0 : 90 }}
          className="absolute"
        >
          <Sun size={14} className="md:w-4 md:h-4" />
        </motion.div>
      </div>
      <span className="hidden sm:inline">
        {theme === 'retro' ? 'MODE: 8-BIT' : 'MODE: EDITORIAL'}
      </span>
      <span className="sm:hidden">
        {theme === 'retro' ? '8-BIT' : 'EDIT'}
      </span>
    </motion.button>
  );
};

export default ThemeToggle;
