import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const EditorialHero = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.9]);
  const clipPath = useTransform(scrollYProgress, [0, 0.8], ["inset(0%)", "inset(10% 5% 10% 5% round 20px)"]);

  return (
    <section ref={containerRef} id="home" className="h-[150vh] w-full relative">
      <motion.div 
        style={{ clipPath }}
        className="sticky top-0 h-screen w-full flex items-center overflow-hidden bg-[#f4f4f0] text-[#1a1a1a]"
      >
        {/* Noise texture */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-multiply"
          style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/cream-paper.png')" }}
        />

        {/* Left Column - Title */}
        <motion.div style={{ y, opacity, scale }} className="relative z-10 flex flex-col md:flex-row items-center justify-between w-full h-full px-6 md:px-16 lg:px-24">
          {/* Left side */}
          <div className="flex flex-col justify-center h-full pt-20 md:pt-0 md:w-1/2">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "60px" }}
              transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="h-px bg-black/40 mb-6 md:mb-8"
            />
            
            <motion.span 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="font-sans text-[9px] md:text-[10px] tracking-[0.4em] uppercase opacity-50 mb-4 md:mb-6"
            >
              Portfolio — 2024
            </motion.span>

            <h1 className="font-serif text-[3rem] sm:text-[4rem] md:text-[6rem] lg:text-[8rem] xl:text-[10rem] tracking-[-0.04em] leading-[0.82] mb-6">
              <div className="overflow-hidden">
                <motion.span 
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                  className="block"
                >
                  Arya
                </motion.span>
              </div>
              <div className="overflow-hidden">
                <motion.span 
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.35 }}
                  className="block italic font-light text-[#1a1a1a]/60"
                >
                  Kusuma
                </motion.span>
              </div>
            </h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex items-center gap-4 md:gap-6"
            >
              <div className="w-8 h-8 md:w-10 md:h-10 rounded-full border border-black/20 flex items-center justify-center">
                <span className="text-[8px] md:text-[9px] font-sans tracking-wider">01</span>
              </div>
              <p className="font-sans text-[10px] md:text-xs tracking-wide opacity-50 max-w-[200px] md:max-w-[250px]">
                Backend Engineer, AI Enthusiast, and Digital Craftsman based in Bandung.
              </p>
            </motion.div>
          </div>

          {/* Right side - Profile Image with Overlapping Text */}
          <div className="relative md:w-2/5 flex items-center justify-center mt-8 md:mt-0">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, delay: 0.6 }}
              className="relative"
            >
              <div className="w-[200px] h-[260px] sm:w-[240px] sm:h-[320px] md:w-[280px] md:h-[370px] lg:w-[320px] lg:h-[420px] overflow-hidden">
                <img src="./profile.jpg" alt="Arya" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000" />
              </div>
              {/* Overlapping label */}
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 1 }}
                className="absolute -bottom-4 -left-4 md:-bottom-6 md:-left-8 bg-[#1a1a1a] text-[#f4f4f0] px-4 py-2 md:px-6 md:py-3"
              >
                <span className="font-sans text-[8px] md:text-[9px] tracking-[0.3em] uppercase">Bandung, ID</span>
              </motion.div>
              {/* Border frame */}
              <div className="absolute -top-3 -right-3 md:-top-4 md:-right-4 w-full h-full border border-black/20 pointer-events-none" />
            </motion.div>
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-6 md:left-16 lg:left-24 flex items-center gap-4 cursor-pointer group"
          onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
        >
          <motion.div 
            animate={{ height: [30, 50, 30] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-px bg-black/30"
          />
          <span className="font-sans text-[8px] md:text-[9px] tracking-[0.3em] uppercase opacity-30 group-hover:opacity-70 transition-opacity">
            Scroll
          </span>
        </motion.div>

        {/* Large decorative number */}
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.03 }}
          transition={{ delay: 1 }}
          className="absolute -right-4 md:right-8 top-1/2 -translate-y-1/2 font-serif text-[20rem] md:text-[30rem] lg:text-[40rem] leading-none pointer-events-none select-none"
        >
          A
        </motion.span>
      </motion.div>
    </section>
  );
};

export default EditorialHero;
