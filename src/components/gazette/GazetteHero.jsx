import React from 'react';
import { motion } from 'framer-motion';
import { soundFx } from '../../utils/soundFx';

export default function GazetteHero() {
  return (
    <section className="relative min-h-screen bg-[#f4ecd8] text-[#181512] flex flex-col justify-between px-4 sm:px-8 md:px-14 pt-24 pb-12 overflow-hidden border-b-4 border-[#181512]">
      {/* Weathered Newsprint Texture Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#181512_0.75px,transparent_0.75px)] [background-size:20px_20px] opacity-[0.08] pointer-events-none" />

      {/* Broadsheet Masthead Header */}
      <div className="relative z-10 max-w-6xl mx-auto w-full border-b-4 border-double border-[#181512] pb-4 mb-6">
        {/* Top Newsprint Utility Bar */}
        <div className="flex flex-wrap items-center justify-between text-[11px] font-serif border-b border-[#181512] pb-1 mb-3 text-[#4a4237]">
          <span>WEATHER: BRISK &amp; PROPITIOUS</span>
          <span>ESTABLISHED MCMXXIV // NATIONWIDE CIRCULATION</span>
          <span>PRICE: THREE CENTS</span>
        </div>

        {/* Massive Gazette Broadsheet Title */}
        <h1 className="font-serif text-5xl sm:text-7xl md:text-9xl text-center uppercase tracking-tight font-black leading-none text-[#181512] my-2 select-none">
          THE DAILY GAZETTE
        </h1>

        <div className="flex items-center justify-between text-[10px] md:text-xs font-serif italic border-t border-[#181512] pt-1 text-[#4a4237]">
          <span>VOL. XCIV NO. 312</span>
          <span className="font-bold uppercase tracking-widest text-[#b91c1c]">★★ LATE CITY FINAL EDITION ★★</span>
          <span>NOVEMBER 21, 1934</span>
        </div>
      </div>

      {/* Front Page Lead Story Spread */}
      <div className="relative z-10 max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-start my-auto py-4">
        {/* Left Column: Big Lead Story Headline */}
        <div className="lg:col-span-8 flex flex-col">
          <div className="inline-block bg-[#b91c1c] text-white font-serif font-black text-xs uppercase px-3 py-1 self-start mb-3 tracking-widest">
            EXTRA! EXTRA! SPECIAL DISPATCH
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl font-black uppercase leading-[0.95] tracking-tight mb-4 text-[#181512]">
            ARYA KUSUMA DEPLOYS UNPRECEDENTED FULLSTACK SPEED TO COMMERCE.
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t-2 border-[#181512] font-serif text-sm leading-relaxed text-[#2a241e]">
            <p>
              <span className="float-left text-5xl font-bold font-serif leading-none pr-3 pt-1 text-[#181512]">
                I
              </span>
              N AN ASTONISHING triumph of software engineering, local technologist Arya Kusuma has unveiled a suite of digital architectures that reduce latency to sub-second thresholds while upholding uncompromising visual fidelity.
            </p>
            <p>
              Eyewitnesses report seamless transitions across three runtime universes, leveraging high-throughput Laravel microservices and mathematical Three.js spatial simulations without a solitary dropped frame.
            </p>
          </div>

          <div className="flex flex-wrap gap-4 mt-8 pt-4 border-t border-[#181512]/40 font-serif text-xs uppercase">
            <a
              href="#gazette-projects"
              onClick={() => soundFx.newspaperCrank()}
              className="px-6 py-2.5 bg-[#181512] text-[#f4ecd8] font-bold tracking-widest hover:bg-[#b91c1c] transition-colors"
            >
              READ CASE REPORTS →
            </a>
            <a
              href="#gazette-contact"
              onClick={() => soundFx.newspaperCrank()}
              className="px-6 py-2.5 border-2 border-[#181512] font-bold tracking-widest hover:bg-[#181512] hover:text-[#f4ecd8] transition-colors"
            >
              TRANSMIT TELEGRAM
            </a>
          </div>
        </div>

        {/* Right Column: Framed Press Photograph */}
        <div className="lg:col-span-4 flex flex-col items-center">
          <div className="p-3 bg-white border-2 border-[#181512] shadow-md w-full max-w-[320px]">
            <div className="aspect-[4/5] bg-[#333] overflow-hidden border border-[#181512] mb-3">
              <img
                src="./profile.jpg"
                alt="Arya Kusuma Press Photo"
                className="w-full h-full object-cover filter grayscale contrast-150 transition-transform duration-700 hover:scale-105"
                onError={(e) => {
                  e.currentTarget.src = "https://placehold.co/400x500/181512/f4ecd8?text=PRESS+PHOTO";
                }}
              />
            </div>
            <div className="text-[10px] font-serif italic text-center text-[#555] leading-tight">
              FIG. 1 — Chief Architect Arya Kusuma photographed moments after deployment in the capital.
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Newsprint Footnote */}
      <div className="relative z-10 max-w-6xl mx-auto w-full pt-4 border-t-2 border-[#181512] flex flex-col sm:flex-row items-center justify-between text-[11px] font-serif text-[#5a5042] gap-2">
        <span>ENTERED AS SECOND CLASS MATTER AT POST OFFICE</span>
        <span className="italic font-bold">CONTINUED ON PAGE 2 — MACHINERY &amp; COMMERCIAL WORKS</span>
      </div>
    </section>
  );
}
