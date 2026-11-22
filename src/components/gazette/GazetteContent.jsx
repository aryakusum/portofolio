import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { listProyek, listTools } from '../../data';
import { soundFx } from '../../utils/soundFx';
import GazetteStamper from './GazetteStamper';
import { ExternalLink, ArrowUp, Send, CheckCircle, Radio } from 'lucide-react';

export default function GazetteContent() {
  const [telegramSent, setTelegramSent] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleTelegram = (e) => {
    e.preventDefault();
    soundFx.telegraphBeep();
    soundFx.rubberStamp();
    setTelegramSent(true);
  };

  const scrollToSection = (id) => {
    soundFx.rubberStamp();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative bg-[#f4ecd8] text-[#181512] min-h-screen selection:bg-[#181512] selection:text-[#f4ecd8] p-3 sm:p-6 md:p-10 font-serif">
      {/* Interactive Rubber Stamper Tool */}
      <GazetteStamper />

      {/* Main Broadsheet Paper Container */}
      <article className="max-w-6xl mx-auto border-4 border-[#181512] bg-[#fdfaf3] p-4 sm:p-8 md:p-12 shadow-2xl relative">
        
        {/* ==================== BROADSHEET MASTHEAD ==================== */}
        <header className="border-b-4 border-double border-[#181512] pb-6 mb-8">
          {/* Top Ear & Weather Bar */}
          <div className="flex flex-wrap items-center justify-between gap-2 text-[10px] sm:text-xs border-b-2 border-[#181512] pb-2 mb-4 text-[#4a4237] tracking-wider uppercase">
            <span>WEATHER: FAIR // PROPICE FOR INTELLECTUAL COMMERCE</span>
            <span className="font-bold text-[#181512]">ESTABLISHED MCMXXIV // PRINTED IN JAKARTA</span>
            <span>PRICE: THREE CENTS (NO CREDIT)</span>
          </div>

          {/* Giant Broadsheet Masthead Title */}
          <div className="text-center py-2 sm:py-4">
            <h1 className="text-4xl sm:text-7xl md:text-8xl lg:text-9xl uppercase font-black tracking-tight leading-none text-[#181512] select-none break-words">
              THE DAILY GAZETTE
            </h1>
            <p className="text-[10px] sm:text-xs italic tracking-widest text-[#554c3d] mt-2 uppercase">
              The Chronicle of Record for Modern Engineering, Architecture &amp; Industrial Silicon
            </p>
          </div>

          {/* Date, Edition & Volume Bar */}
          <div className="flex flex-wrap items-center justify-between text-[10px] sm:text-xs italic border-t-2 border-b border-[#181512] py-1.5 mt-4 text-[#332e26]">
            <span>VOL. XCIV NO. 312</span>
            <span className="font-bold uppercase tracking-widest text-[#b91c1c] text-center">
              ★★ SPECIAL CONTINUOUS BROADSHEET EDITION ★★
            </span>
            <span>NOVEMBER 21, 1934</span>
          </div>

          {/* Quick-Jump Index Bar (Scrollable on mobile) */}
          <nav className="mt-4 pt-2 border-t border-[#181512]/40 flex flex-wrap items-center justify-between gap-2 text-xs uppercase tracking-wider bg-[#ede4ce] p-2 border border-[#181512]">
            <span className="font-black text-[10px] text-[#b91c1c] uppercase flex items-center gap-1">
              <Radio size={12} className="text-[#b91c1c]" /> DISPATCH INDEX:
            </span>
            <div className="flex flex-wrap gap-1 sm:gap-2 text-[10px] sm:text-xs">
              {[
                { id: 'headline', label: '1. FRONT PAGE' },
                { id: 'commercial', label: '2. COMMERCIAL' },
                { id: 'patents', label: '3. PATENT GAZETTE' },
                { id: 'wire', label: '4. TELEGRAPH WIRE' },
              ].map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className="px-2.5 py-1 bg-white hover:bg-[#181512] hover:text-[#f4ecd8] border border-[#181512] font-bold transition-colors cursor-pointer"
                >
                  {link.label}
                </button>
              ))}
            </div>
            <span className="text-[9px] italic text-[#666] hidden md:inline">
              [SCROLL DOWN TO READ COMPLETE NEWSPAPER]
            </span>
          </nav>
        </header>

        {/* ==================== SECTION 1: FRONT PAGE (HEADLINE & EDITORIAL) ==================== */}
        <section id="headline" className="scroll-mt-6 mb-12">
          {/* Breaking News Ribbon */}
          <div className="flex items-center gap-2 mb-3">
            <span className="bg-[#b91c1c] text-white text-[10px] sm:text-xs font-black px-3 py-0.5 uppercase tracking-widest">
              EXTRA! EXTRA! SPECIAL DISPATCH
            </span>
            <span className="text-[10px] italic text-[#666] uppercase">
              WIRE TRANSMISSION RECEIVED VIA JAKARTA TERMINAL
            </span>
          </div>

          {/* Massive Headline */}
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight leading-[0.95] text-[#181512] mb-6">
            ARYA KUSUMA DEPLOYS UNPRECEDENTED FULLSTACK DIGITAL SPEED TO THE COMMERCE SECTOR.
          </h2>

          {/* Subheading */}
          <p className="text-base sm:text-xl italic font-serif text-[#3e372e] leading-snug border-b-2 border-[#181512] pb-4 mb-6">
            Remarkable engineering breakthroughs registered in web architecture; sub-second transactional performance achieved across Laravel microservices, Python automation, and ergonomic client interfaces.
          </p>

          {/* Multi-Column Newspaper Article Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Story Text (Column 1 & 2 - 8 cols on desktop) */}
            <div className="lg:col-span-8 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm leading-relaxed text-[#2a241e] text-justify">
                <p>
                  <span className="float-left text-6xl font-bold font-serif leading-none pr-3 pt-1 text-[#181512]">
                    I
                  </span>
                  N AN ASTONISHING triumph of software engineering that has captivated technologists across the capital, Arya Kusuma has officially brought online a suite of high-performance digital platforms. By combining strict modular programming with resilient architectural design, latency figures have plunged to near-zero thresholds across demanding production workloads.
                </p>
                <p>
                  Special observers at the Jakarta Exchange report flawless reliability during heavy concurrency. The applications—spanning automated enterprise Point of Sales, algorithmic personal capital tracking, and generative computer vision—have operated without a single dropped packet or runtime defect.
                </p>
              </div>

              {/* Second Story Paragraph */}
              <div className="border-t border-[#181512]/30 pt-4 text-sm leading-relaxed text-[#2a241e]">
                <p className="mb-4">
                  "The objective of our studio is straightforward," stated Kusuma during an exclusive dispatch with The Gazette. "We reject flimsy boilerplate and superficial embellishment. Every line of code must function like precision-machined brass clockwork: durable under stress, pleasant to navigate, and purpose-built to solve tangible human problems."
                </p>
              </div>

              {/* Editorial Proclamation Box */}
              <div className="p-4 sm:p-5 bg-[#ede4ce] border-2 border-[#181512] relative shadow-sm">
                <span className="text-[10px] font-black uppercase tracking-widest text-[#b91c1c] block mb-1">
                  EDITORIAL PROCLAMATION &amp; CREED
                </span>
                <blockquote className="text-xs sm:text-sm italic text-[#262018] leading-relaxed">
                  “Software is not mere mathematical instructions passed into silicon chips; it is an enduring artisanal craft. When rigor in the backend unites with clarity in the interface, computing becomes an instrument of genuine empowerment.”
                </blockquote>
                <div className="text-[10px] text-right font-bold text-[#555] mt-2 uppercase">
                  — The Editors, The Daily Gazette
                </div>
              </div>

              {/* Highlights & Vital Figures */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 border-t-2 border-b-2 border-[#181512] py-3 text-center">
                <div className="p-2 border sm:border-r sm:border-l-0 sm:border-y-0 border-[#181512]/30">
                  <div className="text-2xl font-black text-[#181512]">{listProyek.length}+</div>
                  <div className="text-[10px] uppercase font-bold text-[#666]">Production Enterprises</div>
                </div>
                <div className="p-2 border sm:border-r sm:border-l-0 sm:border-y-0 border-[#181512]/30">
                  <div className="text-2xl font-black text-[#181512]">100%</div>
                  <div className="text-[10px] uppercase font-bold text-[#666]">Operational Integrity</div>
                </div>
                <div className="p-2 border sm:border-0 border-[#181512]/30">
                  <div className="text-2xl font-black text-[#b91c1c]">&lt; 100ms</div>
                  <div className="text-[10px] uppercase font-bold text-[#666]">Target Dispatch Latency</div>
                </div>
              </div>
            </div>

            {/* Press Photo & Captions (Column 3 - 4 cols on desktop) */}
            <div className="lg:col-span-4 bg-[#ede4ce] p-4 border-2 border-[#181512] shadow-sm">
              <div className="aspect-[4/5] bg-[#222] border-2 border-[#181512] overflow-hidden mb-3 relative group">
                <img
                  src="./profile.jpg"
                  alt="Press Photo - Arya Kusuma"
                  className="w-full h-full object-cover filter grayscale contrast-125"
                  onError={(e) => {
                    e.currentTarget.src = "https://placehold.co/400x500/181512/f4ecd8?text=PRESS+PHOTO";
                  }}
                />
                <div className="absolute top-2 left-2 bg-[#181512] text-[#f4ecd8] text-[9px] font-black px-2 py-0.5 uppercase tracking-wider">
                  PRESS ARCHIVE NO. 441
                </div>
              </div>

              <div className="text-[11px] italic text-[#3a3227] leading-snug border-b border-[#181512]/30 pb-2 mb-3">
                <strong className="text-[#181512] not-italic block uppercase text-[10px]">FIG. 1 — CHIEF SYSTEM ARCHITECT</strong>
                Arya Kusuma photographed at the Jakarta laboratory following successful deployment of high-throughput distributed systems.
              </div>

              {/* Bio Summary Inset */}
              <div className="space-y-1.5 text-[11px] text-[#443c31]">
                <div className="flex justify-between border-b border-dotted border-[#181512]/40 pb-1">
                  <span className="font-bold">STATUS:</span>
                  <span className="text-[#b91c1c] font-black uppercase">AVAILABLE FOR HIRE</span>
                </div>
                <div className="flex justify-between border-b border-dotted border-[#181512]/40 pb-1">
                  <span className="font-bold">DOMAINS:</span>
                  <span>Fullstack, AI, Cloud</span>
                </div>
                <div className="flex justify-between border-b border-dotted border-[#181512]/40 pb-1">
                  <span className="font-bold">RESIDENCE:</span>
                  <span>Jakarta, Indonesia</span>
                </div>
                <div className="flex justify-between pb-1">
                  <span className="font-bold">CREDENTIALS:</span>
                  <span>Informatics Engineering</span>
                </div>
              </div>

              <button
                onClick={() => scrollToSection('wire')}
                className="w-full mt-4 py-2 bg-[#181512] text-[#f4ecd8] text-[10px] font-black uppercase tracking-widest hover:bg-[#b91c1c] transition-colors border border-[#181512] cursor-pointer"
              >
                TELEGRAPH ARYA KUSUMA ↓
              </button>
            </div>
          </div>
        </section>

        {/* ==================== SECTION RULE DIVIDER ==================== */}
        <div className="my-10 border-t-4 border-b-2 border-[#181512] py-2 text-center text-xs font-black uppercase tracking-widest text-[#181512] bg-[#ede4ce] select-none">
          ◆ ◆ ◆ SECTION TWO // COMMERCIAL DEVELOPMENTS &amp; INDUSTRIAL ENTERPRISES ◆ ◆ ◆
        </div>

        {/* ==================== SECTION 2: COMMERCIAL DEVELOPMENTS (PROJECTS) ==================== */}
        <section id="commercial" className="scroll-mt-6 mb-12">
          <div className="border-b-2 border-[#181512] pb-3 mb-6 flex flex-wrap items-end justify-between gap-2">
            <div>
              <span className="text-xs uppercase font-black text-[#b91c1c] tracking-widest block">
                BUSINESS &amp; INDUSTRIAL GAZETTE
              </span>
              <h3 className="text-2xl sm:text-4xl font-black uppercase tracking-tight">
                MAJOR WORKS &amp; COMMERCIAL DISPATCHES
              </h3>
            </div>
            <span className="text-[10px] italic text-[#666]">
              ALL WORKS TESTED &amp; OPERATIONAL IN FIELD RUNTIMES
            </span>
          </div>

          {/* Project Broadsheet Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {listProyek.map((p, idx) => (
              <article
                key={p.id}
                className="border-2 border-[#181512] bg-[#ede4ce] p-5 shadow-md flex flex-col justify-between transition-transform hover:-translate-y-1 duration-200"
              >
                <div>
                  {/* Dispatch Header */}
                  <div className="flex flex-wrap justify-between items-center gap-1.5 text-[10px] font-black text-[#b91c1c] border-b border-[#181512]/30 pb-1.5 mb-3">
                    <span className="tracking-widest">DISPATCH NO. 0{idx + 1}</span>
                    <div className="flex items-center gap-1.5">
                      {p.contributed && (
                        <span className="uppercase text-white bg-[#b91c1c] px-2 py-0.5 text-[8px] font-black border border-[#181512] tracking-wider">
                          ★ CONTRIBUTOR
                        </span>
                      )}
                      <span className="uppercase text-[#181512] bg-white px-2 py-0.5 border border-[#181512]">
                        {p.subtitle}
                      </span>
                    </div>
                  </div>

                  {/* Project Image in Halftone Frame */}
                  <div className="aspect-[16/10] bg-[#111] border-2 border-[#181512] mb-3 overflow-hidden relative group">
                    <img
                      src={p.image}
                      alt={p.title}
                      className="w-full h-full object-cover filter grayscale contrast-125 group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute bottom-2 right-2 bg-white/90 text-[#181512] text-[8px] font-bold px-1.5 py-0.5 border border-[#181512] uppercase">
                      PLATE #{idx + 1}
                    </div>
                  </div>

                  {/* Title & Description */}
                  <h4 className="text-xl sm:text-2xl font-black uppercase text-[#181512] mb-2 leading-tight">
                    {p.title}
                  </h4>
                  <p className="text-xs leading-relaxed text-[#3a3227] mb-4 text-justify">
                    {p.fullDescription || p.desc}
                  </p>
                </div>

                {/* Tech Chips & Action Link */}
                <div className="pt-3 border-t border-[#181512]/40 flex flex-wrap justify-between items-center gap-2">
                  <div className="flex flex-wrap gap-1.5">
                    {p.tech.map((t, i) => (
                      <span
                        key={i}
                        className="text-[9px] font-bold uppercase bg-white px-2 py-0.5 border border-[#181512] text-[#181512]"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <a
                    href={p.url}
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => soundFx.rubberStamp()}
                    className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#181512] text-[#f4ecd8] text-[10px] font-black uppercase tracking-wider hover:bg-[#b91c1c] transition-colors cursor-pointer"
                  >
                    <span>INSPECT BLUEPRINT</span>
                    <ExternalLink size={12} />
                  </a>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* ==================== SECTION RULE DIVIDER ==================== */}
        <div className="my-10 border-t-4 border-b-2 border-[#181512] py-2 text-center text-xs font-black uppercase tracking-widest text-[#181512] bg-[#ede4ce] select-none">
          ◆ ◆ ◆ SECTION THREE // THE PATENT GAZETTE OF INDUSTRIAL MACHINERY ◆ ◆ ◆
        </div>

        {/* ==================== SECTION 3: PATENT GAZETTE (SKILLS & TOOLS) ==================== */}
        <section id="patents" className="scroll-mt-6 mb-12">
          <div className="border-b-2 border-[#181512] pb-3 mb-6 flex flex-wrap items-end justify-between gap-2">
            <div>
              <span className="text-xs uppercase font-black text-[#b91c1c] tracking-widest block">
                OFFICIAL REGISTRY OF INVENTIONS &amp; UTILITIES
              </span>
              <h3 className="text-2xl sm:text-4xl font-black uppercase tracking-tight">
                CERTIFIED INDUSTRIAL APPARATUS &amp; COMPILERS
              </h3>
            </div>
            <span className="text-[10px] italic text-[#666]">
              RIGOROUSLY BENCHMARKED AND LICENSED FOR HIGH PRODUCTION LOADS
            </span>
          </div>

          {/* Patent Cards Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {listTools.map((tool, idx) => (
              <div
                key={tool.id}
                className="border-2 border-[#181512] bg-[#ede4ce] p-4 text-center flex flex-col justify-between shadow-sm hover:border-[#b91c1c] transition-colors"
              >
                <div>
                  <span className="text-[8px] font-bold text-[#666] tracking-widest block mb-2 uppercase">
                    PATENT NO. {tool.dad},00{idx + 1}
                  </span>
                  
                  {/* Tool Icon in Print Press Inset */}
                  <div className="w-12 h-12 mx-auto p-2 bg-white border border-[#181512] mb-2 flex items-center justify-center">
                    <img
                      src={tool.gambar}
                      alt={tool.nama}
                      className="w-full h-full object-contain filter grayscale"
                    />
                  </div>

                  <h5 className="text-base font-black uppercase mb-0.5 text-[#181512]">{tool.nama}</h5>
                  <p className="text-[10px] italic text-[#555] mb-3">Classification: {tool.ket}</p>
                </div>

                <div className="pt-2 border-t border-[#181512]/30 text-[8px] font-black text-[#b91c1c] uppercase tracking-wider">
                  ★ TESTED &amp; PROVEN ★
                </div>
              </div>
            ))}
          </div>

          {/* Patent Gazette Footer Notice */}
          <div className="mt-6 p-3 bg-white border border-[#181512] text-[11px] italic text-[#4a4237] text-center">
            All listed industrial mechanisms have undergone exhaustive stress tests under active web concurrency. Inquiries regarding custom silicon integration may be dispatched via the Telegraph Office below.
          </div>
        </section>

        {/* ==================== SECTION RULE DIVIDER ==================== */}
        <div className="my-10 border-t-4 border-b-2 border-[#181512] py-2 text-center text-xs font-black uppercase tracking-widest text-[#181512] bg-[#ede4ce] select-none">
          ◆ ◆ ◆ SECTION FOUR // CLASSIFIED NOTICES &amp; TELEGRAPH WIRE SERVICE ◆ ◆ ◆
        </div>

        {/* ==================== SECTION 4: CLASSIFIED NOTICES & TELEGRAPH WIRE ==================== */}
        <section id="wire" className="scroll-mt-6 mb-8">
          <div className="border-b-2 border-[#181512] pb-3 mb-6">
            <span className="text-xs uppercase font-black text-[#b91c1c] tracking-widest block">
              CONTINENTAL &amp; OVERSEAS WIRE SERVICE
            </span>
            <h3 className="text-2xl sm:text-4xl font-black uppercase tracking-tight">
              CLASSIFIED NOTICES &amp; DIRECT TELEGRAPH TRANSMISSION
            </h3>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Classified Notices Column (Left 5 Cols) */}
            <div className="lg:col-span-5 space-y-4">
              <div className="border-2 border-[#181512] bg-[#ede4ce] p-4 shadow-sm">
                <span className="text-[10px] font-black uppercase tracking-widest bg-[#181512] text-[#f4ecd8] px-2 py-0.5 inline-block mb-3">
                  CLASSIFIED: SITUATIONS WANTED
                </span>
                <h5 className="font-black text-sm uppercase mb-1">
                  FULLSTACK ARCHITECT &amp; SOFTWARE CONSULTANT
                </h5>
                <p className="text-xs text-[#3a3227] leading-relaxed mb-3">
                  Technologist of sound constitution and proven track record offers immediate capacity for enterprise development, database optimization, and high-velocity web products. Capable of working independently or coordinating engineering syndicates.
                </p>
                <div className="text-[10px] font-bold text-[#b91c1c] border-t border-[#181512]/30 pt-1 uppercase">
                  RATE: COMPETITIVE &amp; COMMENSURATE WITH EXCELLENCE
                </div>
              </div>

              {/* Direct Telegraph Links */}
              <div className="border-2 border-[#181512] bg-[#ede4ce] p-4 shadow-sm">
                <span className="text-[10px] font-black uppercase tracking-widest bg-[#b91c1c] text-white px-2 py-0.5 inline-block mb-3">
                  OFFICIAL WIRE STATIONS
                </span>
                <div className="space-y-2 text-xs">
                  <a
                    href="https://github.com/aryakusum"
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => soundFx.rubberStamp()}
                    className="flex justify-between items-center p-2 bg-white border border-[#181512] hover:bg-[#181512] hover:text-[#f4ecd8] transition-colors"
                  >
                    <span className="font-black">GITHUB WIRE REPOSITORY</span>
                    <span className="text-[10px] font-serif uppercase">aryakusum ↗</span>
                  </a>
                  <a
                    href="mailto:aryakusuma.dev@gmail.com"
                    onClick={() => soundFx.rubberStamp()}
                    className="flex justify-between items-center p-2 bg-white border border-[#181512] hover:bg-[#181512] hover:text-[#f4ecd8] transition-colors"
                  >
                    <span className="font-black">POSTAL EMAIL SERVICE</span>
                    <span className="text-[10px] font-serif uppercase">SEND MAIL ↗</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Interactive Morse Code Telegraph Form (Right 7 Cols) */}
            <div className="lg:col-span-7 border-2 border-[#181512] bg-[#ede4ce] p-6 sm:p-8 shadow-md">
              <div className="border-b-2 border-[#181512] pb-3 mb-4 flex items-center justify-between">
                <div>
                  <span className="text-[9px] font-bold uppercase tracking-widest text-[#666] block">
                    PACIFIC TELEGRAPH TRANSMISSION APPARATUS
                  </span>
                  <h4 className="text-xl sm:text-2xl font-black uppercase">
                    DISPATCH A TELEGRAPH WIRE
                  </h4>
                </div>
                <div className="text-right text-[9px] font-bold text-[#b91c1c] uppercase">
                  ● MORSE SOUND ACTIVE
                </div>
              </div>

              {telegramSent ? (
                <div className="py-8 text-center space-y-4 bg-white border-2 border-[#181512] p-6">
                  <CheckCircle size={40} className="mx-auto text-emerald-800" />
                  <div className="inline-block bg-[#181512] text-[#f4ecd8] text-[10px] font-black px-3 py-1 uppercase tracking-widest">
                    TELEGRAPH TRANSMISSION LOGGED &amp; DISPATCHED
                  </div>
                  <h5 className="text-2xl font-black uppercase">
                    MESSAGE REACHED ARYA KUSUMA'S RECEIVER
                  </h5>
                  <p className="text-xs italic text-[#4a4237] max-w-md mx-auto leading-relaxed">
                    “Your wire inquiry has been encoded, stamped, and delivered to the central terminal. A formal correspondence will follow with utmost promptitude.”
                  </p>
                  <div className="text-[10px] text-[#666] border-t border-[#181512]/30 pt-2 uppercase">
                    RECEIPT SERIAL: #{Date.now().toString().slice(-6)} // JAKARTA WIRE DISPATCH
                  </div>
                  <button
                    onClick={() => {
                      soundFx.rubberStamp();
                      setTelegramSent(false);
                      setFormData({ name: '', email: '', message: '' });
                    }}
                    className="px-4 py-2 bg-[#181512] text-[#f4ecd8] text-[10px] font-bold uppercase tracking-widest hover:bg-[#b91c1c] transition-colors"
                  >
                    SEND ANOTHER WIRE
                  </button>
                </div>
              ) : (
                <form onSubmit={handleTelegram} className="space-y-4">
                  <p className="text-xs italic text-[#554c3d]">
                    Type your correspondence below. Every keystroke generates an authentic high-frequency Morse code pulse across the wire:
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-black uppercase mb-1">
                        1. SENDER IDENTITY / FIRM
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Sterling &amp; Partners Syndicate"
                        value={formData.name}
                        onChange={(e) => {
                          soundFx.telegraphBeep();
                          setFormData({ ...formData, name: e.target.value });
                        }}
                        className="w-full bg-white border border-[#181512] p-2.5 text-xs text-[#181512] focus:outline-none focus:border-[#b91c1c] font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-black uppercase mb-1">
                        2. RETURN WIRE ADDRESS
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="syndicate@wire.org"
                        value={formData.email}
                        onChange={(e) => {
                          soundFx.telegraphBeep();
                          setFormData({ ...formData, email: e.target.value });
                        }}
                        className="w-full bg-white border border-[#181512] p-2.5 text-xs text-[#181512] focus:outline-none focus:border-[#b91c1c] font-mono"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-black uppercase mb-1">
                      3. TELEGRAM INQUIRY PARTICULARS
                    </label>
                    <textarea
                      rows={4}
                      required
                      placeholder="State engineering objectives, parameters, or contract invitation..."
                      value={formData.message}
                      onChange={(e) => {
                        soundFx.telegraphBeep();
                        setFormData({ ...formData, message: e.target.value });
                      }}
                      className="w-full bg-white border border-[#181512] p-2.5 text-xs text-[#181512] focus:outline-none focus:border-[#b91c1c] resize-none font-mono"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 bg-[#181512] text-[#f4ecd8] font-black text-xs uppercase tracking-widest hover:bg-[#b91c1c] transition-colors border border-[#181512] flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                  >
                    <Send size={14} />
                    <span>★ TRANSMIT TELEGRAPH WIRE TO ARYA KUSUMA ★</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </section>

        {/* ==================== BROADSHEET COLOPHON & FOOTER ==================== */}
        <footer className="mt-12 pt-6 border-t-4 border-double border-[#181512] flex flex-wrap justify-between items-center gap-4 text-xs text-[#554c3d]">
          <div className="space-y-0.5">
            <span className="font-black text-[#181512] uppercase block">
              THE DAILY GAZETTE // PRINTED &amp; PUBLISHED IN THE CAPITAL
            </span>
            <span className="text-[10px] italic">
              All dispatches certified reliable by the Board of Software Examiners. © 1934–2026 Arya Kusuma.
            </span>
          </div>

          <button
            onClick={() => {
              soundFx.rubberStamp();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-[#181512] text-[#f4ecd8] font-black text-[10px] uppercase tracking-wider hover:bg-[#b91c1c] transition-colors cursor-pointer"
          >
            <ArrowUp size={12} />
            <span>RETURN TO FRONT PAGE</span>
          </button>
        </footer>
      </article>
    </div>
  );
}