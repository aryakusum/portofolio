import React from 'react';
import { motion } from 'framer-motion';
import { listProyek } from '../../data';
import { ExternalLink } from 'lucide-react';
import { soundFx } from '../../utils/soundFx';

export default function GazetteProjects() {
  return (
    <section id="gazette-projects" className="relative w-full bg-[#f4ecd8] text-[#181512] py-24 px-4 sm:px-8 md:px-14 border-b-4 border-[#181512]">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="border-b-4 border-double border-[#181512] pb-4 mb-16 text-center">
          <span className="text-xs font-serif uppercase tracking-widest text-[#b91c1c] block mb-1">
            SPECIAL FINANCIAL &amp; COMMERCIAL SUPPLEMENT
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-black uppercase text-[#181512]">
            MAJOR COMMERCIAL ENDEAVORS &amp; ENTERPRISES
          </h2>
        </div>

        {/* Project News Spreads */}
        <div className="space-y-16">
          {listProyek.map((project, idx) => (
            <motion.article
              key={project.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="border-2 border-[#181512] bg-[#ede4ce] p-6 md:p-8 shadow-md"
            >
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-3 mb-6 border-b border-[#181512] gap-2">
                <div>
                  <span className="text-[10px] font-serif uppercase tracking-widest text-[#b91c1c] block">
                    SPECIAL DISPATCH NO. 0{idx + 1}
                  </span>
                  <h3 className="font-serif text-2xl sm:text-3xl font-black uppercase text-[#181512]">
                    {project.title}
                  </h3>
                </div>
                <span className="text-xs font-serif italic text-[#555] bg-white px-3 py-1 border border-[#181512]">
                  {project.subtitle}
                </span>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                {/* News Photo Engraving */}
                <div className="lg:col-span-5 bg-white p-2 border border-[#181512] shadow-sm">
                  <div className="aspect-[16/10] bg-[#333] overflow-hidden border border-[#181512]">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover filter grayscale contrast-150 transition-all duration-700 hover:scale-105"
                    />
                  </div>
                  <div className="text-[9px] font-serif italic text-center text-[#666] mt-1.5">
                    Plate {idx + 1}. Operational view of {project.title}.
                  </div>
                </div>

                {/* Article Narrative */}
                <div className="lg:col-span-7 flex flex-col justify-between">
                  <p className="font-serif text-sm sm:text-base leading-relaxed text-[#2a241e] mb-6">
                    {project.fullDescription || project.desc}
                  </p>

                  <div className="pt-4 border-t border-[#181512]/30 flex flex-wrap items-center justify-between gap-4">
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((t, i) => (
                        <span
                          key={i}
                          className="px-2.5 py-0.5 text-[10px] font-serif uppercase bg-white border border-[#181512] text-[#181512]"
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => soundFx.newspaperCrank()}
                      className="inline-flex items-center gap-2 px-5 py-2 bg-[#181512] text-[#f4ecd8] font-serif text-xs font-bold uppercase tracking-widest hover:bg-[#b91c1c] transition-colors"
                    >
                      <span>INSPECT ARCHIVE (REPO)</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
