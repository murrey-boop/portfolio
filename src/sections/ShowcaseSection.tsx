import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { projects } from "../constants";
import { Globe, Github } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const ShowcaseSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  const featured = projects.find((p) => p.featured);
  const others = projects.filter((p) => !p.featured);

  useGSAP(() => {
    gsap.fromTo(
      sectionRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 1.5 }
    );

    cardsRef.current.forEach((card, index) => {
      if (!card) return;
      gsap.fromTo(
        card,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          delay: 0.15 * (index + 1),
          scrollTrigger: {
            trigger: card,
            start: "top bottom-=100",
          },
        }
      );
    });
  }, []);

  return (
    <div id="work" ref={sectionRef} className="app-showcase">
      <div className="w-full">
        <div className="flex flex-col items-center gap-5 mb-16">
          <div className="hero-badge">
            <p>My Projects</p>
          </div>
          <h1 className="font-semibold md:text-5xl text-3xl text-center">
            Real Projects I've Built
          </h1>
        </div>

        {/* Featured project */}
        {featured && (
          <div
            ref={(el) => {
              cardsRef.current[0] = el;
            }}
            className="card-border rounded-xl p-6 md:p-10 mb-10"
          >
            <div className="flex flex-col lg:flex-row gap-8">
              <div className="lg:w-2/3 space-y-5">
                <div className="flex items-center gap-3">
                  <span className="hero-badge">{featured.category}</span>
                  {featured.liveUrl !== "#" && (
                    <span className="text-sm text-green-400 flex items-center gap-1">
                      <span className="w-2 h-2 bg-green-400 rounded-full" />
                      Live
                    </span>
                  )}
                </div>
                <h2 className="text-3xl md:text-4xl font-bold">
                  {featured.title}
                </h2>
                <p className="text-white-50 text-lg leading-relaxed">
                  {featured.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {featured.tech.map((t) => (
                    <span
                      key={t}
                      className="px-3 py-1 bg-blue-100 rounded-full text-sm text-white-50"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <div className="flex gap-4 pt-4">
                  {featured.liveUrl !== "#" && (
                    <a
                      href={featured.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-6 py-3 bg-white text-black rounded-lg font-semibold hover:bg-white-50 transition-colors"
                    >
                      <Globe className="w-4 h-4" /> Visit Site
                    </a>
                  )}
                  <a
                    href={featured.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-6 py-3 border border-black-50 rounded-lg text-white-50 hover:bg-black-200 transition-colors"
                  >
                    <Github className="w-4 h-4" /> GitHub
                  </a>
                </div>
              </div>
              <div className="lg:w-1/3 flex items-center justify-center">
                <div className="w-full h-64 lg:h-full bg-gradient-to-br from-purple-600/20 to-cyan-600/20 rounded-xl flex items-center justify-center">
                  <Globe className="w-20 h-20 text-white-50/50" />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Other projects grid */}
        <div className="projects-grid">
          {others.map((project, index) => (
            <div
              key={project.title}
              ref={(el) => {
                cardsRef.current[index + 1] = el;
              }}
              className="project-card"
            >
              <div className="project-image bg-gradient-to-br from-purple-600/20 to-cyan-600/20 flex items-center justify-center">
                <span className="text-4xl font-bold text-white/10">
                  {project.title.charAt(0)}
                </span>
                <div className="absolute top-3 left-3">
                  <span className="px-2 py-1 bg-black/60 rounded-full text-xs text-white-50">
                    {project.category}
                  </span>
                </div>
              </div>
              <div className="project-content">
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <div className="project-tech">
                  {project.tech.slice(0, 4).map((t) => (
                    <span
                      key={t}
                      className="px-2 py-1 bg-blue-100 rounded text-xs text-white-50"
                    >
                      {t}
                    </span>
                  ))}
                  {project.tech.length > 4 && (
                    <span className="px-2 py-1 text-xs text-white-50">
                      +{project.tech.length - 4}
                    </span>
                  )}
                </div>
                <div className="project-links">
                  {project.liveUrl !== "#" && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-sm text-white-50 hover:text-white transition-colors"
                    >
                      <Globe className="w-4 h-4" /> Live
                    </a>
                  )}
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-sm text-white-50 hover:text-white transition-colors"
                  >
                    <Github className="w-4 h-4" /> Code
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ShowcaseSection;
