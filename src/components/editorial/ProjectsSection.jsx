import SectionMarker from './SectionMarker';
import ProjectShowcase from './ProjectShowcase';
import { listProyek } from '../../data';

const ProjectsSection = () => (
  <section id="projects" className="py-20 md:py-32 lg:py-48 px-6 md:px-12 lg:px-24">
    <div className="max-w-[1400px] mx-auto">
      <SectionMarker number="03" label="Selected Works" />
      <div className="space-y-24 md:space-y-40 lg:space-y-56">
        {listProyek.map((project, i) => (
          <ProjectShowcase key={project.id} project={project} index={i} />
        ))}
      </div>
    </div>
  </section>
);

export default ProjectsSection;
