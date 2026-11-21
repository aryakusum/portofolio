import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { soundFx } from '../../utils/soundFx';

const STAMP_TYPES = [
  { id: 'extra', label: 'EXTRA! EXTRA!', color: 'border-[#b91c1c] text-[#b91c1c]' },
  { id: 'approved', label: '★ APPROVED FOR PRESS ★', color: 'border-emerald-800 text-emerald-800' },
  { id: 'censored', label: '■ TOP SECRET / CONFIDENTIAL ■', color: 'border-black text-black' },
];

export default function GazetteStamper() {
  const [selectedStamp, setSelectedStamp] = useState(STAMP_TYPES[0]);
  const [stamps, setStamps] = useState([]);

  useEffect(() => {
    const handleClick = (e) => {
      if (['BUTTON', 'A', 'INPUT', 'TEXTAREA'].includes(e.target.tagName)) return;

      soundFx.rubberStamp();
      const newStamp = {
        id: Date.now() + Math.random(),
        text: selectedStamp.label,
        color: selectedStamp.color,
        x: e.clientX,
        y: e.clientY + window.scrollY,
        rotate: (Math.random() - 0.5) * 20,
      };

      setStamps((prev) => [...prev.slice(-12), newStamp]);
    };

    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, [selectedStamp]);

  return (
    <>
      {/* Floating Stamp Selector Palette */}
      <div className="fixed bottom-6 right-6 z-40 bg-[#ede4ce] border-2 border-[#181512] p-3 shadow-md flex flex-col gap-2 font-serif">
        <span className="text-[9px] font-bold uppercase tracking-wider text-[#555] border-b border-[#181512]/30 pb-1">
          PRINT PRESS RUBBER STAMPER
        </span>
        <div className="flex gap-2">
          {STAMP_TYPES.map((stamp) => (
            <button
              key={stamp.id}
              onClick={(e) => {
                e.stopPropagation();
                soundFx.rubberStamp();
                setSelectedStamp(stamp);
              }}
              className={`px-2 py-1 text-[9px] font-bold uppercase border transition-all ${
                selectedStamp.id === stamp.id
                  ? 'bg-[#181512] text-[#f4ecd8] border-[#181512]'
                  : 'bg-white text-[#181512] border-[#181512]/40 hover:border-[#181512]'
              }`}
            >
              {stamp.id.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Rendered Rubber Ink Stamps on the Newspaper */}
      <div className="absolute inset-0 pointer-events-none z-30 overflow-hidden">
        <AnimatePresence>
          {stamps.map((s) => (
            <motion.div
              key={s.id}
              initial={{ scale: 2, opacity: 0 }}
              animate={{ scale: 1, opacity: 0.85 }}
              style={{ left: s.x, top: s.y, transform: `translate(-50%, -50%) rotate(${s.rotate}deg)` }}
              className={`absolute px-4 py-1.5 border-4 border-dashed font-serif font-black text-xs uppercase tracking-widest ${s.color} mix-blend-multiply select-none shadow-sm`}
            >
              {s.text}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </>
  );
}
