import { useRef, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { animate } from 'animejs';
import ScrollytellingSection from './ScrollytellingSection';

const RetroContact = () => {
  const [bossHP, setBossHP] = useState(100);
  const [damageText, setDamageText] = useState(null);
  const bossBarRef = useRef(null);
  const bossContainerRef = useRef(null);

  const attackBoss = useCallback(() => {
    const damage = 15 + Math.floor(Math.random() * 20);
    setBossHP(prev => Math.max(0, prev - damage));

    // Screen shake
    if (bossContainerRef.current) {
      animate(bossContainerRef.current, {
        translateX: [0, -8, 12, -6, 4, 0],
        translateY: [0, 4, -6, 3, 0],
        duration: 400,
        ease: 'inOutQuad',
      });
    }

    // Boss HP bar flash
    if (bossBarRef.current) {
      animate(bossBarRef.current, {
        opacity: [1, 0.3, 1],
        duration: 200,
        ease: 'inOutQuad',
      });
    }

    setDamageText({ value: damage, id: Date.now() });
    setTimeout(() => setDamageText(null), 1000);
  }, []);

  return (
    <ScrollytellingSection>
      <section id="contact" className="py-16 md:py-32 px-4 relative">
        <div className="absolute inset-0 opacity-10 -z-10 pointer-events-none">
          <motion.div animate={{ backgroundPosition: ["0% 0%", "100% 100%"] }}
            transition={{ duration: 20, repeat: Infinity, repeatType: "reverse" }}
            className="w-full h-full"
            style={{ background: "radial-gradient(circle at 50% 50%, rgba(255,0,0,0.3), transparent 60%)" }} />
        </div>

        <div className="max-w-3xl mx-auto relative z-10">
          {/* Header */}
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10 md:mb-16">
            <motion.div animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 2, repeat: Infinity }} className="mb-4 md:mb-6">
              <span className="font-pixel text-[8px] md:text-[10px] text-red-500 tracking-[0.3em]">⚠ WARNING ⚠</span>
            </motion.div>
            <h2 className="font-pixel text-2xl sm:text-3xl md:text-5xl text-white mb-3 md:mb-4">FINAL BOSS</h2>
            <p className="font-pixel text-[8px] md:text-[10px] text-gray-500">SEND_MESSAGE TO DEFEAT</p>
          </motion.div>

          {/* Boss HP Bar */}
          <motion.div initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }}
            transition={{ duration: 1 }} className="mb-8 md:mb-12 origin-left">
            <div className="flex justify-between font-pixel text-[8px] md:text-[10px] mb-2">
              <span className="text-red-500">BOSS_HP</span>
              <span className="text-white">{Math.round(bossHP * 99.99)}/9999</span>
            </div>
            <div className="h-4 md:h-6 bg-gray-900 border-4 border-white overflow-hidden">
              <motion.div
                ref={bossBarRef}
                animate={{ width: `${bossHP}%` }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="h-full bg-gradient-to-r from-red-700 to-red-500 relative">
                <div className="absolute inset-0" style={{ backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 3px, rgba(0,0,0,0.3) 3px, rgba(0,0,0,0.3) 4px)' }} />
              </motion.div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <div ref={bossContainerRef}>
            <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ delay: 0.3 }} className="pixel-border bg-gray-950 p-5 sm:p-6 md:p-10">
              <div className="flex items-start gap-4 md:gap-6 mb-6 md:mb-8">
                <div className="pixel-border bg-white p-1.5 md:p-2 flex-shrink-0">
                  <img src="./profile.jpg" alt="NPC" className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 pixelated" />
                </div>
                <div>
                  <span className="font-pixel text-[8px] md:text-[10px] text-yellow-400 block mb-1">ARYA_NPC:</span>
                  <p className="font-pixel text-[7px] sm:text-[8px] md:text-[10px] text-gray-300 leading-relaxed">
                    "GREETINGS, ADVENTURER! YOU'VE MADE IT TO THE FINAL STAGE. LEAVE YOUR COORDINATES AND I SHALL RESPOND..."
                  </p>
                </div>
              </div>

              <div className="space-y-4 md:space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                  <div>
                    <label className="font-pixel text-[7px] md:text-[8px] text-gray-600 block mb-1 md:mb-2">PLAYER_NAME</label>
                    <input type="text" placeholder="ENTER_NAME..."
                      className="w-full bg-black border-2 border-gray-700 focus:border-white p-3 md:p-4 font-pixel text-[8px] md:text-[10px] text-white outline-none transition-colors" />
                  </div>
                  <div>
                    <label className="font-pixel text-[7px] md:text-[8px] text-gray-600 block mb-1 md:mb-2">CONTACT_SCAN</label>
                    <input type="email" placeholder="ENTER_EMAIL..."
                      className="w-full bg-black border-2 border-gray-700 focus:border-white p-3 md:p-4 font-pixel text-[8px] md:text-[10px] text-white outline-none transition-colors" />
                  </div>
                </div>
                <div>
                  <label className="font-pixel text-[7px] md:text-[8px] text-gray-600 block mb-1 md:mb-2">QUEST_DETAILS</label>
                  <textarea rows="3" placeholder="DESCRIBE_YOUR_QUEST..."
                    className="w-full bg-black border-2 border-gray-700 focus:border-white p-3 md:p-4 font-pixel text-[8px] md:text-[10px] text-white outline-none transition-colors resize-none" />
                </div>
                <div className="relative">
                  <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                    onClick={attackBoss}
                    className="w-full pixel-button !bg-red-600 !text-white !shadow-[inset_-4px_-4px_0_#8b0000,4px_4px_0_#000] py-4 md:py-5 text-[10px] md:text-sm">
                    {bossHP <= 0 ? '✦ VICTORY! ✦' : '⚔ ATTACK (SEND MESSAGE) ⚔'}
                  </motion.button>
                  {damageText && (
                    <motion.div
                      key={damageText.id}
                      initial={{ opacity: 1, y: 0, scale: 1 }}
                      animate={{ opacity: 0, y: -60, scale: 1.5 }}
                      transition={{ duration: 1 }}
                      className="absolute -top-8 left-1/2 -translate-x-1/2 font-pixel text-xl text-yellow-400 pointer-events-none z-50"
                    >
                      -{damageText.value}
                    </motion.div>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-16 md:mt-24 text-center py-6 md:py-8 border-t-2 border-white/5">
          <p className="font-pixel text-[6px] md:text-[7px] text-gray-700">© 2026 ARYAKUSUMA · BUILT WITH PIXELS AND PASSION</p>
        </footer>
      </section>
    </ScrollytellingSection>
  );
};

export default RetroContact;
