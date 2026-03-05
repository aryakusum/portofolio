import { motion } from 'framer-motion';
import InventorySlot from './InventorySlot';
import ScrollytellingSection from './ScrollytellingSection';
import { listTools } from '../../data';

const ACHIEVEMENTS = [
  { icon: "🏆", title: "FIRST_COMMIT", year: "2022" },
  { icon: "⚡", title: "SPEED_RUNNER", year: "2023" },
  { icon: "🧠", title: "AI_PIONEER", year: "2023" },
  { icon: "🔥", title: "FULL_STACK", year: "2024" },
];

const RetroSkills = () => (
  <ScrollytellingSection>
    <section id="skills" className="py-16 md:py-24 px-4 relative">
      <div className="max-w-4xl mx-auto">
        <motion.div initial={{ y: 20, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true }} className="text-center mb-10 md:mb-16">
          <h2 className="font-pixel text-2xl sm:text-3xl md:text-4xl text-white mb-2 md:mb-3">INVENTORY</h2>
          <p className="font-pixel text-[8px] md:text-[10px] text-gray-600">EQUIPPED ITEMS & SKILLS</p>
        </motion.div>

        <div className="pixel-border bg-black/80 p-4 sm:p-6 md:p-8">
          <div className="flex justify-between items-center mb-4 md:mb-6">
            <span className="font-pixel text-[8px] md:text-[10px] text-gray-500">SLOT: {listTools.length}/{listTools.length + 2}</span>
            <span className="font-pixel text-[8px] md:text-[10px] text-yellow-500">★ RARE ITEMS</span>
          </div>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-3 md:gap-4">
            {listTools.map((tool, i) => (
              <InventorySlot key={tool.id || i} item={tool} index={i} />
            ))}
          </div>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-3 md:gap-4 mt-3 md:mt-4 opacity-30">
            {[1, 2].map(i => (
              <div key={`empty-${i}`} className="border-2 border-dashed border-gray-800 aspect-square flex items-center justify-center">
                <span className="font-pixel text-[8px] text-gray-700">EMPTY</span>
              </div>
            ))}
          </div>
        </div>

        {/* Achievements */}
        <div className="mt-8 md:mt-12 grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {ACHIEVEMENTS.map((ach, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(255,215,0,0.2)" }}
              className="pixel-border bg-gray-950 p-3 md:p-4 text-center cursor-pointer">
              <div className="text-2xl md:text-3xl mb-2">{ach.icon}</div>
              <h4 className="font-pixel text-[7px] md:text-[8px] text-white mb-1">{ach.title}</h4>
              <span className="font-pixel text-[6px] md:text-[7px] text-gray-700">{ach.year}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  </ScrollytellingSection>
);

export default RetroSkills;
