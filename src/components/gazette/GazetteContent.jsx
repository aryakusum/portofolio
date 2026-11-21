import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { listProyek, listTools } from '../../data';
import { soundFx } from '../../utils/soundFx';
import GazetteStamper from './GazetteStamper';
import { ExternalLink } from 'lucide-react';

export default function GazetteContent() {
  const [currentPage, setCurrentPage] = useState(1);
  const [telegramSent, setTelegramSent] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const switchPage = (pageNum) => {
    soundFx.rubberStamp();
    setCurrentPage(pageNum);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleTelegram = (e) => {
    e.preventDefault();
    soundFx.telegraphBeep();
    soundFx.rubberStamp();
    setTelegramSent(true);
  };

  return (
    <div className="relative bg-[#f4ecd8] text-[#181512] min-h-screen selection:bg-[#181512] selection:text-[#f4ecd8] p-4 sm:p-6 md:p-10 font-serif">
      {/* Interactive Rubber Stamper Tool */}
      <GazetteStamper />

      {/* Broadsheet Container */}
      <div className="max-w-6xl mx-auto border-4 border-[#181512] bg-[#f9f4e8] p-6 sm:p-8 md:p-12 shadow-2xl relative">
        {/* Newspaper Top Ear & Weather Bar */}
        <div className="flex flex-wrap items-center justify-between text-[11px] border-b-2 border-[#181512] pb-1 mb-4 text-[#554c3d]">
          <span>WEATHER: PROPITIOUS &amp; BRISK // FAIR CIRCULATION</span>
          <span>ESTABLISHED MCMXXIV // PRINTED IN JAKARTA</span>
          <span>PRICE: THREE CENTS</span>
        </div>

        {/* Newspaper Massive Masthead */}
        <div className="text-center border-b-4 border-double border-[#181512] pb-4 mb-6">
          <h1 className="text-5xl sm:text-7xl md:text-9xl uppercase font-black tracking-tight leading-none text-[#181512] select-none">
            THE DAILY GAZETTE
          </h1>
          <div className="flex items-center justify-between text-[10px] md:text-xs italic border-t border-[#181512] pt-1 mt-2 text-[#4a4237]">
            <span>VOL. XCIV NO. 312</span>
            <span className="font-bold uppercase tracking-widest text-[#b91c1c]">★★ LATE CITY FINAL SPECIAL ★★</span>
            <span>NOVEMBER 21, 1934</span>
          </div>
        </div>

        {/* Broadsheet Page Tabs Navigation */}
        <div className="border-b-2 border-t-2 border-[#181512] py-2 mb-8 flex flex-wrap items-center justify-between gap-2 text-xs font-serif uppercase tracking-widest bg-[#ede4ce]">
          <div className="flex gap-2 sm:gap-4">
            {[
              { num: 1, title: 'PAGE 1: FRONT PAGE' },
              { num: 2, title: 'PAGE 2: COMMERCIAL' },
              { num: 3, title: 'PAGE 3: PATENTS' },
              { num: 4, title: 'PAGE 4: CLASSIFIEDS' },
            ].map((p) => (
              <button
                key={p.num}
                onClick={() => switchPage(p.num)}
                className={`px-3 py-1 font-bold border transition-all ${
                  currentPage === p.num
                    ? 'bg-[#181512] text-[#f4ecd8] border-[#181512]'
                    : 'bg-white/60 text-[#181512] border-[#181512]/30 hover:border-[#181512]'
                }`}
              >
                {p.title}
              </button>
            ))}
          </div>
          <span className="text-[10px] text-[#b91c1c] font-bold hidden md:inline">
            [PAGE {currentPage} OF 4 // CLICK TABS TO TURN PAGES]
          </span>
        </div>

        {/* PAGE CONTENTS (SWITCHABLE LIKE A REAL BROADSHEET) */}
        <AnimatePresence mode="wait">
          {/* ==================== PAGE 1: FRONT PAGE ==================== */}
          {currentPage === 1 && (
            <motion.div
              key="page-1"
              initial={{ opacity: 0, x: -15 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 15 }}
              transition={{ duration: 0.3 }}
              className="space-y-8"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Lead Headline Story (8 Cols) */}
                <div className="lg:col-span-8">
                  <div className="inline-block bg-[#b91c1c] text-white text-[10px] font-bold px-2.5 py-0.5 uppercase tracking-widest mb-2">
                    EXTRA! EXTRA! SPECIAL DISPATCH
                  </div>
                  <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight leading-[0.95] text-[#181512] mb-4">
                    ARYA KUSUMA DEPLOYS UNPRECEDENTED FULLSTACK SPEED TO THE COMMERCE SECTOR.
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t-2 border-[#181512] text-sm leading-relaxed text-[#2a241e]">
                    <p>
                      <span className="float-left text-5xl font-bold font-serif leading-none pr-3 pt-1 text-[#181512]">
                        I
                      </span>
                      N AN ASTONISHING triumph of software engineering, local technologist Arya Kusuma has unveiled a suite of digital architectures that reduce latency to sub-second thresholds while upholding uncompromising aesthetic command.
                    </p>
                    <p>
                      Eyewitnesses report seamless transitions across three runtime universes, leveraging high-throughput Laravel microservices and mathematical real-time simulations without a solitary dropped frame.
                    </p>
                  </div>

                  <div className="mt-8 p-4 bg-[#ede4ce] border border-[#181512] text-xs leading-relaxed text-[#3a3227]">
                    <span className="font-bold text-[#b91c1c] uppercase block mb-1">EDITORIAL PROCLAMATION:</span>
                    “Software is not mere instructions sent to silicon; it is a sculpted sensory canvas where ergonomics and performance coalesce into meaningful emotion.”
                  </div>
                </div>

                {/* Press Photo & Captions (4 Cols) */}
                <div className="lg:col-span-4 bg-[#ede4ce] p-4 border-2 border-[#181512] shadow-sm">
                  <div className="aspect-[4/5] bg-[#222] border border-[#181512] overflow-hidden mb-3">
                    <img
                      src="./profile.jpg"
                      alt="Press Photo"
                      className="w-full h-full object-cover filter grayscale contrast-150"
                      onError={(e) => {
                        e.currentTarget.src = "https://placehold.co/400x500/181512/f4ecd8?text=PRESS+PHOTO";
                      }}
                    />
                  </div>
                  <div className="text-[10px] italic text-center text-[#555] leading-tight">
                    FIG. 1 — Chief Architect Arya Kusuma photographed moments after deployment in the capital.
                  </div>
                  <div className="mt-4 pt-3 border-t border-[#181512]/30 text-center">
                    <button
                      onClick={() => switchPage(2)}
                      className="px-4 py-2 bg-[#181512] text-[#f4ecd8] text-[10px] font-bold uppercase tracking-widest hover:bg-[#b91c1c] transition-colors"
                    >
                      TURN TO PAGE 2 (COMMERCIAL) →
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* ==================== PAGE 2: COMMERCIAL & BUSINESS ==================== */}
          {currentPage === 2 && (
            <motion.div
              key="page-2"
              initial={{ opacity: 0, x: -15 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 15 }}
              transition={{ duration: 0.3 }}
              className="space-y-8"
            >
              <div className="border-b-2 border-[#181512] pb-2 mb-6">
                <span className="text-xs uppercase font-bold text-[#b91c1c] block">SECTION TWO // COMMERCIAL DISPATCH</span>
                <h3 className="text-3xl sm:text-4xl font-black uppercase">MAJOR ENTERPRISES &amp; COMMERCIAL DEVELOPMENTS</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {listProyek.map((p, idx) => (
                  <div key={p.id} className="border-2 border-[#181512] bg-[#ede4ce] p-5 shadow-sm flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-center text-[10px] font-bold text-[#b91c1c] border-b border-[#181512]/30 pb-1 mb-2">
                        <span>DISPATCH NO. 0{idx + 1}</span>
                        <span>{p.subtitle}</span>
                      </div>
                      <div className="aspect-[16/10] bg-white border border-[#181512] mb-3 overflow-hidden">
                        <img src={p.image} alt={p.title} className="w-full h-full object-cover filter grayscale contrast-125" />
                      </div>
                      <h4 className="text-xl font-black uppercase text-[#181512] mb-2">{p.title}</h4>
                      <p className="text-xs leading-relaxed text-[#3a3227] mb-4">
                        {p.fullDescription || p.desc}
                      </p>
                    </div>
                    <div className="pt-3 border-t border-[#181512]/30 flex justify-between items-center">
                      <div className="flex gap-1.5">
                        {p.tech.map((t, i) => (
                          <span key={i} className="text-[9px] bg-white px-2 py-0.5 border border-[#181512]">
                            {t}
                          </span>
                        ))}
                      </div>
                      <a
                        href={p.url}
                        target="_blank"
                        rel="noreferrer"
                        onClick={() => soundFx.rubberStamp()}
                        className="inline-flex items-center gap-1.5 text-xs font-bold uppercase text-[#181512] hover:text-[#b91c1c]"
                      >
                        <span>INSPECT</span>
                        <ExternalLink size={12} />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* ==================== PAGE 3: MACHINERY & PATENTS ==================== */}
          {currentPage === 3 && (
            <motion.div
              key="page-3"
              initial={{ opacity: 0, x: -15 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 15 }}
              transition={{ duration: 0.3 }}
              className="space-y-8"
            >
              <div className="border-b-2 border-[#181512] pb-2 mb-6">
                <span className="text-xs uppercase font-bold text-[#b91c1c] block">SECTION THREE // PATENT GAZETTE</span>
                <h3 className="text-3xl sm:text-4xl font-black uppercase">OFFICIAL REGISTRY OF INDUSTRIAL MACHINERY</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {listTools.map((tool, idx) => (
                  <div key={tool.id} className="border-2 border-[#181512] bg-[#ede4ce] p-5 text-center flex flex-col justify-between">
                    <div>
                      <span className="text-[9px] font-bold text-[#666] tracking-widest block mb-2 uppercase">
                        PATENT NO. {tool.dad},00{idx + 1}
                      </span>
                      <div className="w-12 h-12 mx-auto p-1.5 bg-white border border-[#181512] mb-3 flex items-center justify-center">
                        <img src={tool.gambar} alt={tool.nama} className="w-full h-full object-contain filter grayscale" />
                      </div>
                      <h4 className="text-xl font-black uppercase mb-1">{tool.nama}</h4>
                      <p className="text-xs italic text-[#555] mb-4">Classification: {tool.ket}</p>
                    </div>
                    <div className="pt-2 border-t border-[#181512]/30 text-[10px] font-bold text-[#b91c1c] uppercase">
                      TESTED &amp; OPERATIONAL
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* ==================== PAGE 4: CLASSIFIEDS & TELEGRAM ==================== */}
          {currentPage === 4 && (
            <motion.div
              key="page-4"
              initial={{ opacity: 0, x: -15 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 15 }}
              transition={{ duration: 0.3 }}
              className="space-y-8"
            >
              <div className="border-b-2 border-[#181512] pb-2 mb-6">
                <span className="text-xs uppercase font-bold text-[#b91c1c] block">SECTION FOUR // TELEGRAPH WIRE SERVICE</span>
                <h3 className="text-3xl sm:text-4xl font-black uppercase">CLASSIFIED ADVERTISEMENTS &amp; NOTICES</h3>
              </div>

              <div className="border-2 border-[#181512] bg-[#ede4ce] p-6 md:p-8">
                {telegramSent ? (
                  <div className="py-12 text-center space-y-3">
                    <div className="text-4xl">📜</div>
                    <h4 className="text-2xl font-black uppercase">TELEGRAPH TRANSMISSION LOGGED</h4>
                    <p className="text-xs italic text-[#4a4237] max-w-md mx-auto">
                      “Your telegraphic inquiry has reached Arya Kusuma's wire terminal. Expect correspondence forthwith.”
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleTelegram} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold uppercase mb-1">1. SENDER IDENTITY / FIRM</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Sterling &amp; Cooper Syndicate"
                          value={formData.name}
                          onChange={(e) => {
                            soundFx.telegraphBeep();
                            setFormData({ ...formData, name: e.target.value });
                          }}
                          className="w-full bg-white border border-[#181512] p-2.5 text-xs text-[#181512] focus:outline-none focus:border-[#b91c1c]"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase mb-1">2. RETURN WIRE ADDRESS</label>
                        <input
                          type="email"
                          required
                          placeholder="syndicate@wire.org"
                          value={formData.email}
                          onChange={(e) => {
                            soundFx.telegraphBeep();
                            setFormData({ ...formData, email: e.target.value });
                          }}
                          className="w-full bg-white border border-[#181512] p-2.5 text-xs text-[#181512] focus:outline-none focus:border-[#b91c1c]"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase mb-1">3. TELEGRAM INQUIRY PARTICULARS</label>
                      <textarea
                        rows={3}
                        required
                        placeholder="State parameters, engineering inquiry, or contract scope..."
                        value={formData.message}
                        onChange={(e) => {
                          soundFx.telegraphBeep();
                          setFormData({ ...formData, message: e.target.value });
                        }}
                        className="w-full bg-white border border-[#181512] p-2.5 text-xs text-[#181512] focus:outline-none focus:border-[#b91c1c] resize-none"
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full py-3 bg-[#181512] text-[#f4ecd8] font-bold text-xs uppercase tracking-widest hover:bg-[#b91c1c] transition-colors"
                    >
                      ★ TRANSMIT TELEGRAPH WIRE TO ARYA KUSUMA ★
                    </button>
                  </form>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Newspaper Bottom Margin */}
        <div className="mt-12 pt-4 border-t-2 border-[#181512] flex flex-wrap justify-between text-[10px] text-[#6e6658] uppercase">
          <span>THE DAILY GAZETTE // PRINTED IN THE CAPITAL</span>
          <span>CIRCULATION CERTIFIED 100% RELIABLE</span>
        </div>
      </div>
    </div>
  );
}
