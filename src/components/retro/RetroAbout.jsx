import { motion } from 'framer-motion';
import HPBar from './HPBar';
import DialogBox from './DialogBox';
import ScrollytellingSection from './ScrollytellingSection';

const PLAYER_STATS = [
  { label: "STR", value: "90" },
  { label: "INT", value: "95" },
  { label: "AGI", value: "85" },
];

const RetroAbout = () => (
  <ScrollytellingSection>
    <section id="about" className="py-16 md:py-24 px-4 bg-[#0a0a0a] relative">
      <div className="max-w-5xl mx-auto">
        <motion.div initial={{ y: 20, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true }} className="text-center mb-10 md:mb-16">
          <h2 className="font-pixel text-2xl sm:text-3xl md:text-4xl text-white mb-2 md:mb-3">CHARACTER SHEET</h2>
          <p className="font-pixel text-[8px] md:text-[10px] text-gray-600">PLAYER PROFILE & STATS</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 md:gap-6">
          {/* Profile Card */}
          <div className="lg:col-span-2">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
              className="pixel-border bg-black p-4 md:p-6 text-center h-full">
              <div className="pixel-border bg-white p-2 md:p-3 inline-block mb-4 md:mb-6">
                <img src="./profile.jpg" alt="Player" className="w-32 h-32 sm:w-36 sm:h-36 md:w-40 md:h-40 pixelated" />
              </div>
              <h3 className="font-pixel text-sm md:text-lg text-white mb-2">ARYA_KUSUMA</h3>
              <p className="font-pixel text-[8px] md:text-[10px] text-gray-500 mb-4">CLASS: BACKEND_MAGE</p>
              <div className="grid grid-cols-3 gap-2 font-pixel text-[7px] md:text-[8px]">
                {PLAYER_STATS.map((s) => (
                  <div key={s.label} className="bg-gray-900 p-2">
                    <span className="text-gray-600 block">{s.label}</span>
                    <span className="text-white">{s.value}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Stats & Dialog */}
          <div className="lg:col-span-3 space-y-4 md:space-y-6">
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
              className="pixel-border bg-black p-4 md:p-6 space-y-3 md:space-y-4">
              <HPBar label="HP (LARAVEL)" value={90} max={100} color="bg-red-500" delay={0} />
              <HPBar label="MP (PYTHON)" value={85} max={100} color="bg-blue-500" delay={0.15} />
              <HPBar label="STAMINA (REACT)" value={75} max={100} color="bg-green-500" delay={0.3} />
              <HPBar label="MANA (AI / ML)" value={80} max={100} color="bg-purple-500" delay={0.45} />
            </motion.div>
            <DialogBox speaker="SYSTEM" text="PLAYER HAS COMPLETED EDUCATION AT TELKOM UNIVERSITY. SPECIALIZES IN BACKEND ENGINEERING AND AI/ML." />
            <DialogBox speaker="ARYA" text="MY QUEST IS TO BUILD SYSTEMS THAT STAND THE TEST OF TIME. EVERY LINE OF CODE IS A STEP FORWARD." portrait="./profile.jpg" />
          </div>
        </div>
      </div>
    </section>
  </ScrollytellingSection>
);

export default RetroAbout;
