import { useRef } from 'react';
import { motion } from 'framer-motion';
import SectionMarker from './SectionMarker';
import EditorialGrid from './EditorialGrid';
import useAnimeOnView, { animeStagger } from '../../hooks/useAnimeOnView';

const STATS = [
  { label: "Education", value: "Telkom University" },
  { label: "Focus", value: "AI / Machine Learning" },
  { label: "Location", value: "Bandung, ID" },
];

const ABOUT_TEXT = 'I craft digital experiences with a focus on robust backend architecture. Combining the precision of Laravel with the intelligence of Python.';
const HIGHLIGHT_WORDS = ['robust', 'backend', 'architecture.'];

const AboutSection = () => {
  const aboutTextRef = useAnimeOnView(
    (el) => ({
      targets: el.querySelectorAll('.word'),
      opacity: [0, 1],
      translateY: [8, 0],
      delay: (_, i) => i * 30,
      duration: 400,
      ease: 'outExpo',
    }),
    { threshold: 0.3 }
  );

  return (
    <section id="about" className="py-20 md:py-32 lg:py-48 px-6 md:px-12 lg:px-24 max-w-[1600px] mx-auto">
      <SectionMarker number="01" label="Profile" />

      <EditorialGrid className="!px-0 mx-0 max-w-none items-start">
        {/* Left Column — text */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="col-span-4 md:col-span-7"
        >
          <p ref={aboutTextRef} className="font-serif text-editorial-display leading-[1.25] mb-8 md:mb-12">
            {ABOUT_TEXT.split(' ').map((word, i) => (
              <span key={i} className="word inline-block mr-[0.3em]" style={{ opacity: 0 }}>
                {HIGHLIGHT_WORDS.includes(word) ? (
                  <span className="italic text-[#1a1a1a]/50">{word}</span>
                ) : word}
              </span>
            ))}
          </p>

          {/* Stats Bar */}
          <div className="grid grid-cols-3 gap-4 md:gap-8 border-t border-b border-black/[0.08] py-6 md:py-8">
            {STATS.map((stat, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 + 0.3 }}
              >
                <h4 className="font-sans text-[8px] md:text-[9px] tracking-[0.2em] uppercase opacity-30 mb-2 md:mb-3">{stat.label}</h4>
                <p className="font-sans text-[10px] md:text-xs">{stat.value}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Right Column — image */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2 }}
          className="col-span-4 md:col-span-5 relative"
        >
          <div className="relative">
            <div className="aspect-[3/4] overflow-hidden max-w-sm mx-auto md:max-w-none">
              <img src="./profile.jpg" alt="Arya" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000" />
            </div>
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
              className="absolute -bottom-6 -left-4 md:-left-8 bg-[#1a1a1a] text-[#f4f4f0] p-4 md:p-6 max-w-[200px] md:max-w-[240px]"
            >
              <p className="font-sans text-[9px] md:text-[10px] leading-relaxed opacity-80">
                Backend Engineer · AI Enthusiast · Digital Craftsman
              </p>
            </motion.div>
          </div>
        </motion.div>
      </EditorialGrid>
    </section>
  );
};

export default AboutSection;
