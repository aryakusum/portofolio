import React from 'react';
import { motion } from 'framer-motion';
import { listTools } from '../../data';
import { soundFx } from '../../utils/soundFx';

const PATENTS = {
  Laravel: { patent: "U.S. PAT. NO. 8,421,902", status: "OPERATIONAL &amp; CERTIFIED", duty: "Heavy Server Engine" },
  PHP: { patent: "U.S. PAT. NO. 4,119,834", status: "CORE FOUNDRY", duty: "Backend Execution" },
  Python: { patent: "U.S. PAT. NO. 9,002,117", status: "MACHINE INTELLIGENCE", duty: "Vision &amp; Tensors" },
  MySql: { patent: "U.S. PAT. NO. 6,881,204", status: "STRUCTURED ARCHIVE", duty: "Relational Ledger" },
  Vite: { patent: "U.S. PAT. NO. 11,240,551", status: "ACCELERATED COMBUSTION", duty: "High-Speed Bundler" },
  Git: { patent: "U.S. PAT. NO. 5,490,118", status: "VERSIONING APPARATUS", duty: "Branching Safety" },
};

export default function GazetteSkills() {
  return (
    <section id="gazette-skills" className="relative w-full bg-[#f4ecd8] text-[#181512] py-24 px-4 sm:px-8 md:px-14 border-b-4 border-[#181512]">
      <div className="max-w-6xl mx-auto">
        {/* Masthead Ribbon */}
        <div className="border-b-4 border-double border-[#181512] pb-2 mb-12 text-center">
          <span className="text-xs font-serif uppercase tracking-widest text-[#b91c1c] block mb-1">
            OFFICIAL GAZETTE REGISTRY OF INDUSTRIAL ARTS
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-black uppercase text-[#181512]">
            MACHINERY &amp; TECHNICAL PATENTS
          </h2>
        </div>

        {/* Patent Registry Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {listTools.map((tool, idx) => {
            const patent = PATENTS[tool.nama] || { patent: "PATENT PENDING", status: "IN DEVELOPMENT", duty: "General Instrument" };

            return (
              <motion.div
                key={tool.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08, duration: 0.5 }}
                onClick={() => soundFx.newspaperCrank()}
                className="bg-[#ede4ce] border-2 border-[#181512] p-6 shadow-sm hover:border-[#b91c1c] hover:bg-white transition-all cursor-pointer flex flex-col justify-between min-h-[220px] relative group"
              >
                <div>
                  <div className="flex justify-between items-start mb-4 border-b border-[#181512]/30 pb-2">
                    <span className="font-serif text-[10px] text-[#666] tracking-widest uppercase">
                      {patent.patent}
                    </span>
                    <div className="w-8 h-8 p-1 bg-white border border-[#181512] flex items-center justify-center filter grayscale group-hover:grayscale-0 transition-all">
                      <img src={tool.gambar} alt={tool.nama} className="w-full h-full object-contain" />
                    </div>
                  </div>

                  <h3 className="font-serif text-2xl font-black uppercase text-[#181512] mb-1">
                    {tool.nama}
                  </h3>
                  <div className="font-serif italic text-xs text-[#555] mb-4">
                    Classification: {tool.ket}
                  </div>
                </div>

                <div className="pt-3 border-t border-[#181512]/20 text-[10px] font-serif uppercase flex justify-between text-[#444]">
                  <span>DUTY: {patent.duty}</span>
                  <span className="font-bold text-[#b91c1c]">TESTED</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
