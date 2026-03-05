import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import MagneticButton from './MagneticButton';
import useAnimeOnView from '../../hooks/useAnimeOnView';

const CONTACT_INFO = [
  { label: "Email", value: "aryasatriawinata@gmail.com" },
  { label: "Location", value: "Bandung, Indonesia" },
  { label: "GitHub", value: "github.com/aryakusum" },
];

const ContactSection = () => {
  const contactInfoRef = useAnimeOnView(
    (el) => ({
      targets: el.querySelectorAll('.contact-item'),
      translateX: [30, 0],
      opacity: [0, 1],
      delay: (_, i) => 200 + i * 120,
      duration: 700,
      ease: 'outExpo',
    }),
    { threshold: 0.3 }
  );

  return (
    <section id="contact" className="min-h-[80vh] py-20 md:py-32 lg:py-48 px-6 md:px-12 lg:px-24 bg-[#1a1a1a] text-[#f4f4f0] relative overflow-hidden">
      {/* Animated gradient circle */}
      <motion.div
        animate={{ scale: [1, 1.3, 1], opacity: [0.02, 0.05, 0.02] }}
        transition={{ duration: 10, repeat: Infinity }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100vw] md:w-[60vw] aspect-square rounded-full border border-[#f4f4f0]/5"
      />

      <div className="max-w-[1000px] mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">
          {/* Left — CTA */}
          <div>
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 0.3 }}
              viewport={{ once: true }}
              className="font-sans text-[8px] md:text-[9px] tracking-[0.4em] uppercase block mb-6 md:mb-8"
            >
              Get in Touch
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="font-serif text-editorial-hero leading-[0.95] mb-8"
            >
              Let's build<br />
              <span className="italic text-[#f4f4f0]/50">something</span><br />
              iconic.
            </motion.h2>
            <MagneticButton>
              <motion.a
                href="mailto:aryasatriawinata@gmail.com"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                whileHover={{ scale: 1.03, backgroundColor: "#f4f4f0", color: "#1a1a1a" }}
                whileTap={{ scale: 0.97 }}
                className="interactive inline-flex items-center gap-3 border border-[#f4f4f0]/20 px-6 py-3 md:px-8 md:py-4 rounded-full font-sans text-xs md:text-sm transition-all duration-500"
              >
                Start a Collaboration
                <ArrowUpRight size={14} />
              </motion.a>
            </MagneticButton>
          </div>

          {/* Right — Info */}
          <div ref={contactInfoRef} className="space-y-8 md:space-y-10">
            {CONTACT_INFO.map((item, i) => (
              <div key={i} className="contact-item border-b border-[#f4f4f0]/10 pb-4 md:pb-6" style={{ opacity: 0 }}>
                <h4 className="font-sans text-[8px] md:text-[9px] tracking-[0.3em] uppercase opacity-30 mb-2 md:mb-3">{item.label}</h4>
                <p className="font-sans text-xs md:text-sm opacity-70">{item.value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-24 md:mt-40 border-t border-[#f4f4f0]/10 pt-6 md:pt-8 flex flex-col md:flex-row justify-between font-sans text-[7px] md:text-[8px] tracking-[0.2em] uppercase opacity-20 gap-2">
          <span>© 2024 Arya Kusuma</span>
          <span>Crafted with precision</span>
        </footer>
      </div>
    </section>
  );
};

export default ContactSection;
