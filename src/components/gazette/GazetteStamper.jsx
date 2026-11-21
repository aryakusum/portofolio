import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { soundFx } from '../../utils/soundFx';

const STAMP_TYPES = [
  { id: 'extra', label: 'EXTRA! EXTRA!', color: 'border-[#b91c1c] text-[#b91c1c]' },
  { id: 'approved', label: '★ APPROVED FOR PRESS ★', color: 'border-emerald-800 text-emerald-800' },
  { id: 'confidential', label: '■ CONFIDENTIAL ■', color: 'border-black text-black' },
];

export default function GazetteStamper() {
  const [selectedStamp, setSelectedStamp] = useState(STAMP_TYPES[0]);
  const [stamps, setStamps] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleClick = (e) => {
      // Don't stamp when interacting with controls or inputs
      if (e.target.closest('button') || e.target.closest('a') || e.target.closest('input') || e.target.closest('textarea')) {
        return;
      }

      soundFx.rubberStamp();
      const newStamp = {
        id: Date.now() + Math.random(),
        text: selectedStamp.label,
        color: selectedStamp.color,
        x: e.pageX,
        y: e.pageY,
        rotate: (Math.random() - 0.5) * 20,
      };

      setStamps((prev) => [...prev.slice(-15), newStamp]);
    };

    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, [selectedStamp]);

  return (
    <>
      {/* Floating Stamp Selector Tool */}
      <div className="fixed bottom-4 right-4 z-50 font-serif">
        <div className="bg-[#ede4ce] border-2 border-[#181512] shadow-2xl p-2.5 max-w-[280px]">
          <div className="flex items-center justify-between gap-2 border-b border-[#181512]/30 pb-1 mb-2">
            <span className="text-[9px] font-black uppercase tracking-wider text-[#181512]">
              PRESS RUBBER STAMPER
            </span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsOpen(!isOpen);
              }}
              className="text-[9px] underline uppercase font-bold text-[#b91c1c]"
            >
              {isOpen ? 'HIDE' : 'STAMP CHOOSER'}
            </button>
          </div>

          {isOpen && (
            <div className="flex flex-col gap-1.5 mb-1">
              <p className="text-[9px] italic text-[#554c3d] leading-tight">
                Click anywhere on the newspaper broadsheet to imprint your seal:
              </p>
              <div className="flex flex-wrap gap-1">
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
                    {stamp.label.slice(0, 14)}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="text-[8px] text-[#666] italic flex items-center justify-between">
            <span>ACTIVE: <strong className="uppercase text-[#181512]">{selectedStamp.id}</strong></span>
            {stamps.length > 0 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setStamps([]);
                }}
                className="underline text-[#b91c1c]"
              >
                Clear Seals
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Rendered Rubber Ink Stamps on the Document */}
      <div className="absolute inset-0 pointer-events-none z-30 overflow-hidden">
        <AnimatePresence>
          {stamps.map((s) => (
            <motion.div
              key={s.id}
              initial={{ scale: 2, opacity: 0 }}
              animate={{ scale: 1, opacity: 0.85 }}
              exit={{ opacity: 0 }}
              style={{
                left: s.x,
                top: s.y,
                transform: `translate(-50%, -50%) rotate(${s.rotate}deg)`,
              }}
              className={`absolute px-3 py-1 sm:px-4 sm:py-1.5 border-2 sm:border-4 border-dashed font-serif font-black text-[10px] sm:text-xs uppercase tracking-widest ${s.color} mix-blend-multiply select-none shadow-sm`}
            >
              {s.text}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </>
  );
}
