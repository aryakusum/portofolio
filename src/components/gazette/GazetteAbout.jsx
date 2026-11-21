import React from 'react';
import { motion } from 'framer-motion';

export default function GazetteAbout() {
  return (
    <section id="gazette-about" className="relative w-full bg-[#f4ecd8] text-[#181512] py-24 px-4 sm:px-8 md:px-14 border-b-4 border-[#181512]">
      <div className="max-w-6xl mx-auto">
        {/* Column Banner */}
        <div className="border-b-2 border-t-2 border-[#181512] py-2 mb-12 flex justify-between items-center text-xs font-serif uppercase tracking-widest text-[#4a4237]">
          <span>EDITORIAL OPINION &amp; BIOGRAPHICAL SUMMARY</span>
          <span>SECTION TWO — FEATURE ARTICLE</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Bold Editorial Callout Box */}
          <div className="lg:col-span-4 bg-[#ede4ce] p-6 border-2 border-[#181512] shadow-sm">
            <span className="text-[10px] font-serif font-bold uppercase tracking-widest text-[#b91c1c] block mb-2">
              CRITIC'S OBSERVATION
            </span>
            <h3 className="font-serif text-2xl font-black italic mb-4 leading-tight">
              “The machine must obey the hand, and the code must serve the human experience.”
            </h3>
            <p className="font-serif text-xs leading-relaxed text-[#3a3227] mb-6">
              In an era overwhelmed by disposable digital novelties, Arya Kusuma adheres to the enduring principles of classical engineering: rigorous structure, enduring performance, and deliberate aesthetic command.
            </p>
            <div className="pt-3 border-t border-[#181512]/30 text-[10px] font-serif uppercase text-[#666]">
              PRINTED UNDER PERMIT NO. 4882
            </div>
          </div>

          {/* Right Column: 3-Column Broadsheet Narrative */}
          <div className="lg:col-span-8">
            <h2 className="font-serif text-3xl sm:text-4xl font-black uppercase mb-6 tracking-tight">
              A Discipline Forged in the Furnace of High-Concurrency Systems.
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-serif text-sm leading-relaxed text-[#2a241e]">
              <p>
                <span className="float-left text-6xl font-bold font-serif leading-none pr-3 pt-1 text-[#181512]">
                  W
                </span>
                HETHER orchestrating enterprise-grade point-of-sale platforms in Laravel or training computer-vision models in Python, the objective remains uncompromised: to eliminate friction and render complex computations utterly seamless.
              </p>
              <p>
                The craftsmanship on display in this journal reflects years of dedicated practice. By combining solid database relations with real-time WebGL canvas shaders, each digital artifact operates as a harmonious mechanical press.
              </p>
            </div>

            <div className="mt-8 pt-4 border-t-2 border-dashed border-[#181512]/40 flex flex-wrap justify-between text-xs font-serif uppercase text-[#5a5042]">
              <span>PRIMARY DISCIPLINES: ENTERPRISE ARCHITECTURE / AI ENGINEERING</span>
              <span>READERSHIP CERTIFIED: 100% RELIABLE</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
