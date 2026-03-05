import SectionMarker from './SectionMarker';
import BentoCard from './BentoCard';
import { listTools } from '../../data';

const BENTO_SIZES = ["large", "normal", "tall", "normal", "wide", "normal"];

const SkillsSection = () => (
  <section id="skills" className="py-20 md:py-32 lg:py-48 px-6 md:px-12 lg:px-24 max-w-[1400px] mx-auto">
    <SectionMarker number="02" label="Expertise" />
    <div className="grid grid-cols-2 md:grid-cols-4 auto-rows-[140px] sm:auto-rows-[160px] md:auto-rows-[180px] gap-3 md:gap-4">
      {listTools.map((tool, i) => (
        <BentoCard key={tool.id} tool={tool} index={i} size={BENTO_SIZES[i]} />
      ))}
    </div>
  </section>
);

export default SkillsSection;
