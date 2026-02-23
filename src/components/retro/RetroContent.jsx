import { useRef, useState, Suspense, useEffect, useCallback } from "react";
import { motion, useScroll, useTransform, useSpring, useInView } from "framer-motion";
import { listTools, listProyek } from "../../data";
import ProjectModal from "../ProjectModal/ProjectModal";
import Aurora from "../Aurora/Aurora";
import ScrollToTop from "../ScrollToTop";
import Cursor from "./Cursor";
import DialogBox from "./DialogBox";
import HPBar from "./HPBar";
import PixelMarquee from "./PixelMarquee";
import InventorySlot from "./InventorySlot";
import MiniMap from "./MiniMap";
import ScrollytellingSection from "./ScrollytellingSection";
import HeroParallax from "./HeroParallax";
import PortalReveal from "./PortalReveal";
import { animate } from 'animejs';









/* ═══════════════════════════════════════════ */
/* ─── MAIN RETRO CONTENT ─── */
/* ═══════════════════════════════════════════ */
const RetroContent = () => {
  const containerRef = useRef(null);
  const [activeSection, setActiveSection] = useState('home');
  const [selectedProject, setSelectedProject] = useState(null);
  const [bossHP, setBossHP] = useState(100);
  const [damageText, setDamageText] = useState(null);
  const bossBarRef = useRef(null);
  const bossContainerRef = useRef(null);

  /* ─── Parallax layers ─── */
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  const yBack  = useTransform(smoothProgress, [0, 0.15], [0, -100]);   // slowest
  const yMid   = useTransform(smoothProgress, [0, 0.15], [0, -220]);   // medium
  const yFront = useTransform(smoothProgress, [0, 0.15], [0, -380]);   // fastest
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });



  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'skills', 'projects', 'contact'];
      const current = sections.find(section => {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Boss fight — attack handler
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

    // Boss HP bar flash red
    if (bossBarRef.current) {
      animate(bossBarRef.current, {
        opacity: [1, 0.3, 1],
        duration: 200,
        ease: 'inOutQuad',
      });
    }

    // Floating damage text
    setDamageText({ value: damage, id: Date.now() });
    setTimeout(() => setDamageText(null), 1000);
  }, []);

  return (
    <div className="crt-overlay min-h-screen selection:bg-white selection:text-black overflow-x-hidden">
      {/* XP Progress Bar */}
      <motion.div className="fixed top-0 left-0 right-0 h-1 md:h-1.5 bg-green-500 z-[100] origin-left" style={{ scaleX }} />
      <div className="fixed top-1 md:top-1.5 right-2 md:right-4 z-[100] font-pixel text-[6px] md:text-[7px] text-gray-600">XP</div>

      {/* Aurora Background */}
      <div className="fixed top-0 left-0 w-full h-full -z-20 bg-[#050505]" />
      <div className="fixed top-0 left-0 w-full h-full -z-10 opacity-20">
        <Suspense fallback={null}>
          <Aurora colorStops={["#0a0a2e", "#000000", "#1a0a2e"]} blend={0.5} amplitude={1.0} speed={0.15} />
        </Suspense>
      </div>

      <MiniMap activeSection={activeSection} />

      {/* Top HUD */}
      <div className="fixed top-4 left-4 md:top-6 md:left-8 z-[101] hidden md:block">
        <div className="pixel-border bg-black/90 px-3 py-2 md:px-4 md:py-2">
          <span className="font-pixel text-[7px] md:text-[8px] text-gray-500">PLAYER: </span>
          <span className="font-pixel text-[7px] md:text-[8px] text-white">ARYA_K</span>
        </div>
      </div>

      <main ref={containerRef} className="relative overflow-x-hidden">

        <HeroParallax yBack={yBack} yMid={yMid} yFront={yFront} />
        <PortalReveal />

        <PixelMarquee text="★ LOADING_PLAYER_DATA ★ INITIALIZING ★ PLEASE_WAIT" />

        {/* ═══════════════════════════════════════ */}
        {/* ═══ ABOUT — Character Sheet (Scrollytelling) ═══ */}
        {/* ═══════════════════════════════════════ */}
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
                      <div className="bg-gray-900 p-2"><span className="text-gray-600 block">STR</span><span className="text-white">90</span></div>
                      <div className="bg-gray-900 p-2"><span className="text-gray-600 block">INT</span><span className="text-white">95</span></div>
                      <div className="bg-gray-900 p-2"><span className="text-gray-600 block">AGI</span><span className="text-white">85</span></div>
                    </div>
                  </motion.div>
                </div>

                {/* Stats */}
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

        <PixelMarquee text="★ INVENTORY ★ EQUIPMENT ★ SKILL_TREE ★ UPGRADE_AVAILABLE" />

        {/* ═══════════════════════════════════════ */}
        {/* ═══ SKILLS — Inventory Grid (Scrollytelling) ═══ */}
        {/* ═══════════════════════════════════════ */}
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

              <div className="mt-8 md:mt-12 grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
                {[
                  { icon: "🏆", title: "FIRST_COMMIT", year: "2022" },
                  { icon: "⚡", title: "SPEED_RUNNER", year: "2023" },
                  { icon: "🧠", title: "AI_PIONEER", year: "2023" },
                  { icon: "🔥", title: "FULL_STACK", year: "2024" },
                ].map((ach, i) => (
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

        <PixelMarquee text="★ QUEST_LOG ★ ACTIVE_MISSIONS ★ SIDE_QUESTS ★ COMPLETED" />

        {/* ═══════════════════════════════════════ */}
        {/* ═══ PROJECTS — Quest Log (Scrollytelling) ═══ */}
        {/* ═══════════════════════════════════════ */}
        <ScrollytellingSection>
          <section id="projects" className="py-16 md:py-24 px-4 bg-[#0a0a0a]">
            <div className="max-w-5xl mx-auto">
              <motion.div initial={{ y: 20, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true }} className="text-center mb-10 md:mb-16">
                <h2 className="font-pixel text-2xl sm:text-3xl md:text-4xl text-white mb-2 md:mb-3">QUEST LOG</h2>
                <p className="font-pixel text-[8px] md:text-[10px] text-gray-600">COMPLETED MISSIONS</p>
              </motion.div>

              <div className="space-y-4 md:space-y-6">
                {listProyek.map((project, i) => (
                  <motion.div key={project.id}
                    initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    whileHover={{ x: 8 }}
                    onClick={() => setSelectedProject(project)}
                    className="pixel-border bg-black p-4 sm:p-5 md:p-6 cursor-pointer group hover:bg-gray-950 transition-colors"
                  >
                    <div className="flex flex-col sm:flex-row items-start gap-4 md:gap-6">
                      <div className="pixel-border bg-gray-900 p-2 md:p-3 flex-shrink-0 group-hover:bg-yellow-500 transition-colors">
                        <span className="text-2xl md:text-3xl">{['⚔️', '🛡️', '🔮', '📜'][i]}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2 md:gap-3 mb-2">
                          <h3 className="font-pixel text-[10px] sm:text-xs md:text-sm text-white">{project.title}</h3>
                          <span className="font-pixel text-[7px] md:text-[8px] text-green-400 border border-green-800 px-1.5 py-0.5 md:px-2">COMPLETED</span>
                        </div>
                        <p className="font-pixel text-[7px] sm:text-[8px] md:text-[10px] text-gray-500 mb-3">{project.desc}</p>
                        <div className="flex flex-wrap gap-1.5 md:gap-2">
                          {project.tech.map(t => (
                            <span key={t} className="font-pixel text-[6px] md:text-[7px] text-gray-600 bg-gray-900 px-2 py-0.5 md:py-1">{t}</span>
                          ))}
                        </div>
                      </div>
                      <div className="flex-shrink-0 self-center hidden sm:block">
                        <span className="font-pixel text-[8px] text-gray-700 group-hover:text-white transition-colors">VIEW →</span>
                      </div>
                    </div>
                    <div className="mt-3 md:mt-4 h-1 md:h-1.5 bg-gray-900 overflow-hidden">
                      <motion.div initial={{ width: 0 }} whileInView={{ width: "100%" }}
                        viewport={{ once: true }} transition={{ duration: 1.5, delay: i * 0.2 }}
                        className="h-full bg-gradient-to-r from-yellow-600 to-yellow-400" />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        </ScrollytellingSection>

        <PixelMarquee text="★ FINAL_STAGE ★ BOSS_ARENA ★ PREPARE_FOR_BATTLE" />

        {/* ═══════════════════════════════════════ */}
        {/* ═══ CONTACT — Boss Encounter (Scrollytelling) ═══ */}
        {/* ═══════════════════════════════════════ */}
        <ScrollytellingSection>
          <section id="contact" className="py-16 md:py-32 px-4 relative">
            <div className="absolute inset-0 opacity-10 -z-10 pointer-events-none">
              <motion.div animate={{ backgroundPosition: ["0% 0%", "100% 100%"] }}
                transition={{ duration: 20, repeat: Infinity, repeatType: "reverse" }}
                className="w-full h-full"
                style={{ background: "radial-gradient(circle at 50% 50%, rgba(255,0,0,0.3), transparent 60%)" }} />
            </div>

            <div className="max-w-3xl mx-auto relative z-10">
              <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10 md:mb-16">
                <motion.div animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 2, repeat: Infinity }} className="mb-4 md:mb-6">
                  <span className="font-pixel text-[8px] md:text-[10px] text-red-500 tracking-[0.3em]">⚠ WARNING ⚠</span>
                </motion.div>
                <h2 className="font-pixel text-2xl sm:text-3xl md:text-5xl text-white mb-3 md:mb-4">FINAL BOSS</h2>
                <p className="font-pixel text-[8px] md:text-[10px] text-gray-500">SEND_MESSAGE TO DEFEAT</p>
              </motion.div>

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

            <footer className="mt-16 md:mt-24 text-center py-6 md:py-8 border-t-2 border-white/5">
              <p className="font-pixel text-[6px] md:text-[7px] text-gray-700">© 2026 ARYAKUSUMA · BUILT WITH PIXELS AND PASSION</p>
            </footer>
          </section>
        </ScrollytellingSection>
      </main>

      <ScrollToTop />
      <ProjectModal isOpen={!!selectedProject} onClose={() => setSelectedProject(null)} project={selectedProject} />
    </div>
  );
};

export default RetroContent;
