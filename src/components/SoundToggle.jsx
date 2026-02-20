import { motion } from 'framer-motion';
import { Volume2, VolumeX } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const SoundToggle = ({ isPlaying, onToggle }) => {
  const { theme } = useTheme();

  return (
    <motion.button
      onClick={onToggle}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className={`relative flex items-center justify-center w-9 h-9 md:w-10 md:h-10 border-2 transition-all duration-300 z-[200]
        ${theme === 'retro'
          ? 'bg-gray-800 border-white text-white shadow-[3px_3px_0_#000] md:shadow-[4px_4px_0_#000]'
          : 'bg-[#f4f4f0] border-black text-black shadow-[2px_2px_10px_rgba(0,0,0,0.1)] rounded-full'
        }`}
      title={isPlaying ? 'Mute' : 'Play Music'}
    >
      {isPlaying ? <Volume2 size={14} /> : <VolumeX size={14} />}
      
      {/* Sound wave animation when playing */}
      {isPlaying && (
        <motion.div
          className={`absolute -top-1 -right-1 w-3 h-3 rounded-full ${
            theme === 'retro' ? 'bg-green-400' : 'bg-[#1a1a1a]'
          }`}
          animate={{ scale: [1, 1.5, 1], opacity: [1, 0, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
      )}
    </motion.button>
  );
};

export default SoundToggle;
