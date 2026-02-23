import { motion } from 'framer-motion';

/* ─── Mini Map ─── */
const MiniMap = ({ activeSection }) => (
  <motion.div initial={{ x: 100 }} animate={{ x: 0 }} className="fixed right-4 top-1/2 -translate-y-1/2 z-[101] hidden lg:block">
    <div className="pixel-border bg-black/90 p-3 space-y-2">
      <span className="font-pixel text-[6px] text-gray-600 block text-center mb-2">MAP</span>
      {[
        { id: 'home', icon: '🏠', label: 'START' },
        { id: 'about', icon: '👤', label: 'STATS' },
        { id: 'skills', icon: '⚔️', label: 'ITEMS' },
        { id: 'projects', icon: '📜', label: 'QUESTS' },
        { id: 'contact', icon: '🏰', label: 'BOSS' },
      ].map(item => (
        <a key={item.id} href={`#${item.id}`}
          className={`flex items-center gap-1.5 px-2 py-1 transition-all duration-200 ${
            activeSection === item.id ? 'bg-white text-black' : 'text-gray-600 hover:text-white'
          }`}>
          <span className="text-[10px]">{item.icon}</span>
          <span className="font-pixel text-[6px]">{item.label}</span>
        </a>
      ))}
    </div>
  </motion.div>
);

export default MiniMap;
