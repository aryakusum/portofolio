import { useRef, useState, useEffect, Suspense } from "react";
import ProfileCard from "./components/ProfileCard/ProfileCard";
import Lanyard from "./components/Lanyard/Lanyard";
import { listTools, listProyek } from "./data";
import ChromaGrid from "./components/ChromaGrid/ChromaGrid";
import ProjectModal from "./components/ProjectModal/ProjectModal";
import Aurora from "./components/Aurora/Aurora";
import ContactForm from "./components/ContactForm";
import ScrollToTop from "./components/ScrollToTop";
import AOS from 'aos';
import 'aos/dist/aos.css';

AOS.init();

function App() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeSection, setActiveSection] = useState('home');

  const handleProjectClick = (project) => {
    setSelectedProject(project);
  };

  const handleCloseModal = () => {
    setSelectedProject(null);
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'skills', 'projects', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Subtle Background Gradient */}
      <div className="fixed top-0 left-0 w-full h-full -z-10 bg-[#050505] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-900 via-[#050505] to-black"></div>

      {/* Subtle Aurora Effect */}
      <div className="fixed top-0 left-0 w-full h-full -z-10 opacity-40">
        <Aurora
          colorStops={["#1a1a1a", "#000000", "#333333"]}
          blend={0.5}
          amplitude={1.0}
          speed={0.2}
        />
      </div>

      {/* Floating Navigation */}
      <nav className="fixed top-8 left-1/2 transform -translate-x-1/2 z-50 animate__animated animate__fadeInDown">
        <div className="bg-black/50 backdrop-blur-xl border border-white/10 rounded-full px-6 py-3 flex gap-6 shadow-2xl shadow-black/50">
          {['home', 'about', 'skills', 'projects', 'contact'].map((section) => (
            <a
              key={section}
              href={`#${section}`}
              className={`text-sm font-medium transition-all duration-300 ${activeSection === section
                ? 'text-white scale-110 font-bold drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]'
                : 'text-gray-400 hover:text-white'
                }`}
            >
              {section.charAt(0).toUpperCase() + section.slice(1)}
            </a>
          ))}
        </div>
      </nav>

      <main className="relative">
        {/* HERO SECTION */}
        <section id="home" className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden">
          <div className="absolute top-20 left-20 w-96 h-96 bg-gray-600/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-gray-700/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>

          <div className="max-w-6xl mx-auto text-center relative z-10">
            {/* Interactive Profile Image */}
            <div className="mb-8 inline-block" data-aos="zoom-in">
              <div className="relative group cursor-pointer">
                <div className="absolute inset-0 bg-gradient-to-r from-gray-700 via-gray-500 to-gray-700 rounded-full blur-xl opacity-30 animate-pulse group-hover:opacity-50 transition-opacity duration-500"></div>
                <div className="relative w-40 h-40 rounded-full border-4 border-gray-800 shadow-2xl overflow-hidden">
                  <img
                    src="/profile.jpg"
                    alt="Profile 1"
                    className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500 opacity-100 group-hover:opacity-0"
                  />
                  <img
                    src="/profile2.jpg"
                    alt="Profile 2"
                    className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500 opacity-0 group-hover:opacity-100"
                  />
                </div>
              </div>
            </div>

            <div data-aos="fade-up" data-aos-delay="200">
              <h1 className="text-7xl md:text-8xl font-black mb-4 bg-gradient-to-r from-white via-gray-400 to-gray-600 bg-clip-text text-transparent drop-shadow-lg">
                MUHAMAD<br />ARYAKUSUMA
              </h1>
              <div className="flex items-center justify-center gap-4 mb-6">
                <div className="h-px w-16 bg-gradient-to-r from-transparent to-gray-500"></div>
                <p className="text-2xl text-gray-400 font-light tracking-wider">BACK-END DEVELOPER</p>
                <div className="h-px w-16 bg-gradient-to-l from-transparent to-gray-500"></div>
              </div>
            </div>

            <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-12" data-aos="fade-up" data-aos-delay="400">
              Building scalable systems with <span className="text-white font-semibold">Laravel</span> & <span className="text-gray-300 font-semibold">Python</span>.<br />
              Specializing in AI integration and automation.
            </p>

            <div className="flex flex-wrap gap-4 justify-center mb-16" data-aos="fade-up" data-aos-delay="600">
              <a href="#contact" className="group relative px-10 py-5 bg-white text-black rounded-full font-bold text-lg overflow-hidden transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:scale-105">
                <span className="relative z-10">Hire Me</span>
                <div className="absolute inset-0 bg-gray-200 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </a>
              <a href="#projects" className="px-10 py-5 border-2 border-white/20 rounded-full font-bold text-lg text-white hover:bg-white/10 transition-all duration-300 hover:border-white/40 hover:scale-105">
                View Work
              </a>
            </div>

            <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto" data-aos="fade-up" data-aos-delay="800">
              <div className="text-center">
                <div className="text-4xl font-bold text-white mb-2">10+</div>
                <div className="text-sm text-gray-500 uppercase tracking-wider">Projects</div>
              </div>
              <div className="text-center border-x border-gray-800">
                <div className="text-4xl font-bold text-white mb-2">3+</div>
                <div className="text-sm text-gray-500 uppercase tracking-wider">Years</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-white mb-2">AI</div>
                <div className="text-sm text-gray-500 uppercase tracking-wider">Ready</div>
              </div>
            </div>

            <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
              <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </div>
          </div>
        </section>

        {/* ABOUT SECTION */}
        <section id="about" className="min-h-screen flex items-center py-20 px-4">
          <div className="max-w-7xl mx-auto w-full">
            <div className="text-center mb-16" data-aos="fade-up">
              <h2 className="text-5xl md:text-6xl font-black mb-4 text-white">ABOUT ME</h2>
              <p className="text-gray-400 text-lg">Get to know who I am</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div data-aos="fade-right" className="flex justify-center">
                <ProfileCard
                  name="Muhamad Aryakusuma"
                  title="Back-End Developer"
                  handle="aryakusuma"
                  avatarUrl="/profile.jpg"
                  miniAvatarUrl="/profile2.jpg"
                  status="Open to Work"
                  contactText="Hire Me"
                  onContactClick={() => window.location.href = '#contact'}
                  enableTilt={true}
                  className="w-full max-w-sm"
                />
              </div>

              <div className="relative h-[600px] flex items-center justify-center w-full" data-aos="fade-left">
                <div className="absolute inset-0 bg-gray-800/30 rounded-3xl blur-xl opacity-0 group-hover:opacity-100"></div>
                <div className="relative w-full h-full flex items-center justify-center">
                  <Lanyard position={[0, 0, 15]} gravity={[0, -40, 0]} />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SKILLS SECTION */}
        <section id="skills" className="min-h-screen flex items-center py-20 px-4">
          <div className="max-w-7xl mx-auto w-full">
            <div className="text-center mb-16" data-aos="fade-up">
              <h2 className="text-5xl md:text-6xl font-black mb-4 text-white">TECH STACK</h2>
              <p className="text-gray-400 text-lg">Tools & technologies I work with</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {listTools.map((tool, index) => (
                <div key={tool.id} data-aos="flip-left" data-aos-delay={index * 50} className="group relative">
                  <div className="absolute inset-0 bg-white/5 rounded-2xl blur-lg group-hover:blur-xl transition-all opacity-0 group-hover:opacity-50"></div>
                  <div className="relative bg-[#0a0a0a] backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-all hover:scale-105 cursor-pointer">
                    <div className="flex flex-col items-center text-center gap-4">
                      <div className="w-20 h-20 bg-white/5 rounded-xl flex items-center justify-center p-3 group-hover:scale-110 transition-transform border border-white/5 grayscale group-hover:grayscale-0">
                        <img src={tool.gambar} alt={tool.nama} className="w-full h-full object-contain" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-white mb-1">{tool.nama}</h3>
                        <p className="text-sm text-gray-500">{tool.ket}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PROJECTS SECTION */}
        <section id="projects" className="min-h-screen flex items-center py-20 px-4">
          <div className="max-w-7xl mx-auto w-full">
            <div className="text-center mb-16" data-aos="fade-up">
              <h2 className="text-5xl md:text-6xl font-black mb-4 text-white">FEATURED WORK</h2>
              <p className="text-gray-400 text-lg">Projects that showcase my expertise</p>
            </div>
            <div className="relative">
              <ChromaGrid items={listProyek} onItemClick={handleProjectClick} radius={500} damping={0.45} />
            </div>
          </div>
        </section>

        {/* CONTACT SECTION */}
        <section id="contact" className="min-h-screen flex items-center py-20 px-4 relative">
          <div className="max-w-4xl mx-auto w-full relative z-10">
            <div className="text-center mb-16" data-aos="fade-up">
              <h2 className="text-5xl md:text-6xl font-black mb-4 text-white">GET IN TOUCH</h2>
              <p className="text-gray-400 text-lg">Let's work together</p>
            </div>
            <div data-aos="zoom-in-up">
              <ContactForm />
            </div>
            <div className="mt-16 flex justify-center gap-8" data-aos="fade-up" data-aos-delay="200">
              <a href="https://github.com/aryakusum" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transform hover:scale-125 transition-all">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>
              </a>
              <a href="mailto:aryasatriawinata@gmail.com" className="text-gray-400 hover:text-white transform hover:scale-125 transition-all">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
              </a>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="py-8 border-t border-white/10">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <p className="text-gray-500">© 2024 Muhamad Aryakusuma. Crafted with 🖤 by Me.</p>
          </div>
        </footer>
      </main>

      <ScrollToTop />
      <ProjectModal isOpen={!!selectedProject} onClose={handleCloseModal} project={selectedProject} />
    </>
  );
}

export default App;
