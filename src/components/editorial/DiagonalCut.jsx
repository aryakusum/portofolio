/* ─── Diagonal Section Cut ─── */
const DiagonalCut = ({ dark = false }) => (
  <div className={`relative h-24 md:h-40 ${dark ? 'bg-[#1a1a1a]' : 'bg-[#f4f4f0]'}`}>
    <svg viewBox="0 0 1440 100" preserveAspectRatio="none" className="absolute bottom-0 left-0 w-full h-full">
      <polygon fill={dark ? "#f4f4f0" : "#1a1a1a"} points="0,100 1440,0 1440,100" />
    </svg>
  </div>
);

export default DiagonalCut;
