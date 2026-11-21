import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { soundFx } from '../../utils/soundFx';

export default function GazetteContact() {
  const [transmitted, setTransmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleTransmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;
    soundFx.newspaperCrank();
    setTransmitted(true);
  };

  return (
    <section id="gazette-contact" className="relative w-full bg-[#f4ecd8] text-[#181512] py-28 px-4 sm:px-8 md:px-14 border-b-4 border-[#181512]">
      <div className="max-w-4xl mx-auto">
        <div className="border-4 border-[#181512] bg-[#ede4ce] p-8 md:p-12 shadow-lg">
          {/* Masthead */}
          <div className="border-b-4 border-double border-[#181512] pb-4 mb-8 text-center">
            <span className="text-[10px] font-serif uppercase tracking-widest text-[#b91c1c] block mb-1">
              SECTION FOUR // CLASSIFIED ADVERTISEMENTS &amp; NOTICES
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-black uppercase text-[#181512]">
              TRANSMIT TELEGRAPHIC INQUIRY
            </h2>
          </div>

          {transmitted ? (
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="py-16 text-center space-y-4"
            >
              <div className="text-4xl font-serif">📜</div>
              <h3 className="font-serif text-3xl font-black uppercase text-[#181512]">
                TELEGRAM DELIVERED &amp; LOGGED
              </h3>
              <p className="font-serif text-sm text-[#4a4237] max-w-md mx-auto italic">
                “Your correspondence has been received by the editorial wire service. Expect a formal response forthwith.”
              </p>
            </motion.div>
          ) : (
            <form onSubmit={handleTransmit} className="space-y-6">
              <div className="border border-[#181512] p-4 bg-white text-xs font-serif italic text-[#4a4237] text-center">
                “Parties desirous of contracting architectural engineering or commissioned inquiries are requested to state particulars below.”
              </div>

              <div>
                <label className="block font-serif font-black text-xs uppercase tracking-wider text-[#181512] mb-1.5">
                  1. SENDER IDENTITY / FIRM
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Sterling &amp; Cooper Syndicate"
                  value={formData.name}
                  onChange={(e) => {
                    soundFx.telegraphBeep();
                    setFormData({ ...formData, name: e.target.value });
                  }}
                  className="w-full bg-white border-2 border-[#181512] p-3 font-serif text-sm text-[#181512] focus:outline-none focus:border-[#b91c1c]"
                />
              </div>

              <div>
                <label className="block font-serif font-black text-xs uppercase tracking-wider text-[#181512] mb-1.5">
                  2. RETURN WIRE ADDRESS (EMAIL)
                </label>
                <input
                  type="email"
                  required
                  placeholder="syndicate@broadsheet.org"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-white border-2 border-[#181512] p-3 font-serif text-sm text-[#181512] focus:outline-none focus:border-[#b91c1c]"
                />
              </div>

              <div>
                <label className="block font-serif font-black text-xs uppercase tracking-wider text-[#181512] mb-1.5">
                  3. INQUIRY PARTICULARS (MESSAGE)
                </label>
                <textarea
                  rows={4}
                  placeholder="State project scope, requirements, or proposed timeline..."
                  value={formData.message}
                  onChange={(e) => {
                    soundFx.telegraphBeep();
                    setFormData({ ...formData, message: e.target.value });
                  }}
                  className="w-full bg-white border-2 border-[#181512] p-3 font-serif text-sm text-[#181512] focus:outline-none focus:border-[#b91c1c] resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-[#181512] text-[#f4ecd8] font-serif text-sm font-black uppercase tracking-widest hover:bg-[#b91c1c] transition-colors"
              >
                ★ TRANSMIT WIRE TO ARYA KUSUMA ★
              </button>
            </form>
          )}

          {/* Gazette Footer Seal */}
          <div className="mt-8 pt-4 border-t border-[#181512]/40 flex justify-between font-serif text-[10px] text-[#6e6658] uppercase">
            <span>PRINTED IN THE REPUBLIC // ALL RIGHTS RESERVED</span>
            <span>END OF SECTION FOUR</span>
          </div>
        </div>
      </div>
    </section>
  );
}
