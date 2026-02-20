import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ThemeProvider, useTheme } from './context/ThemeContext';
import ThemeToggle from './components/ThemeToggle';
import SoundToggle from './components/SoundToggle';
import EditorialContent from './components/editorial/EditorialContent';
import RetroContent from './components/retro/RetroContent';
import SmoothScroll from "./components/SmoothScroll";
import { useBackgroundAudio } from './hooks/useBackgroundAudio';
import '@fontsource/playfair-display';
import '@fontsource/inter';

const PortfolioContent = () => {
  const { theme } = useTheme();
  const containerRef = useRef(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [displayTheme, setDisplayTheme] = useState(theme);
  const { isPlaying, toggle: toggleAudio } = useBackgroundAudio(theme);

  useEffect(() => {
    if (theme !== displayTheme) {
      setIsTransitioning(true);
      const timer = setTimeout(() => {
        setDisplayTheme(theme);
        window.scrollTo(0, 0);
      }, 600);
      const revealTimer = setTimeout(() => {
        setIsTransitioning(false);
      }, 1200);
      return () => {
        clearTimeout(timer);
        clearTimeout(revealTimer);
      };
    }
  }, [theme]);

  return (
    <SmoothScroll>
      <div className="min-h-screen selection:bg-white selection:text-black overflow-x-hidden">
        {/* Floating Controls - Responsive */}
        <div className="fixed top-4 right-4 md:top-8 md:right-8 z-[200] flex items-center gap-2 md:gap-3">
          <SoundToggle isPlaying={isPlaying} onToggle={toggleAudio} />
          <ThemeToggle />
        </div>

        {/* Theme Transition Overlay */}
        <AnimatePresence>
          {isTransitioning && (
            <motion.div
              key="transition-overlay"
              className="fixed inset-0 z-[300] flex items-center justify-center pointer-events-none"
            >
              <motion.div
                initial={{ clipPath: "circle(0% at 50% 50%)" }}
                animate={{ clipPath: "circle(150% at 50% 50%)" }}
                exit={{ clipPath: "circle(0% at 50% 50%)" }}
                transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
                className={`absolute inset-0 ${
                  theme === 'editorial' ? 'bg-[#f4f4f0]' : 'bg-[#050505]'
                }`}
              />
              <motion.span
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ delay: 0.2, duration: 0.4 }}
                className={`relative z-10 text-[10px] md:text-xs tracking-[0.3em] md:tracking-[0.5em] uppercase ${
                  theme === 'editorial'
                    ? 'font-serif text-[#1a1a1a]'
                    : 'font-pixel text-white'
                }`}
              >
                {theme === 'editorial' ? 'MODE: EDITORIAL' : 'MODE: 8-BIT'}
              </motion.span>
            </motion.div>
          )}
        </AnimatePresence>

        <main ref={containerRef} className="relative overflow-x-hidden">
          {displayTheme === 'editorial' ? <EditorialContent /> : <RetroContent />}
        </main>
      </div>
    </SmoothScroll>
  );
};

const App = () => {
  return (
    <ThemeProvider>
      <PortfolioContent />
    </ThemeProvider>
  );
};

export default App;
