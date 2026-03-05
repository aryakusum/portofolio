import { motion } from 'framer-motion';
import ScrollytellingSection from './ScrollytellingSection';
import { listProyek } from '../../data';

const QUEST_ICONS = ['⚔️', '🛡️', '🔮', '📜'];

const RetroProjects = ({ onSelectProject }) => (
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
              onClick={() => onSelectProject(project)}
              className="pixel-border bg-black p-4 sm:p-5 md:p-6 cursor-pointer group hover:bg-gray-950 transition-colors"
            >
              <div className="flex flex-col sm:flex-row items-start gap-4 md:gap-6">
                <div className="pixel-border bg-gray-900 p-2 md:p-3 flex-shrink-0 group-hover:bg-yellow-500 transition-colors">
                  <span className="text-2xl md:text-3xl">{QUEST_ICONS[i]}</span>
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
);

export default RetroProjects;
