import React from 'react';
import GazetteContent from './components/gazette/GazetteContent';
import SmoothScroll from './components/SmoothScroll';
import '@fontsource/playfair-display';
import '@fontsource/inter';

export default function App() {
  return (
    <SmoothScroll>
      <main className="min-h-screen bg-[#f4ecd8] text-[#181512] overflow-x-hidden selection:bg-[#181512] selection:text-[#f4ecd8]">
        <GazetteContent />
      </main>
    </SmoothScroll>
  );
}
