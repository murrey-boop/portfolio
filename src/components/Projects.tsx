'use client';

import { useEffect, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Github, 
  Globe, 
  Shield, 
  Network, 
  Code2,
  Database,
  Smartphone,
  Lock
} from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const Projects = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const projects = projectsRef.current?.children || [];
    
    gsap.fromTo(projects,
      { y: 100, opacity: 0, scale: 0.9 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          toggleActions: "play none none reverse"
        }
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const projects = [
    {
      title: "SecureWeb Dashboard",
      description: "A comprehensive web application with built-in security features, user authentication, and real-time monitoring. Implements security best practices and penetration testing methodologies.",
      icon: Shield,
      image: "/api/placeholder/400/250",
      technologies: ["React", "TypeScript", "Node.js", "PostgreSQL", "JWT", "OWASP"],
      category: "Full Stack Security",
      liveUrl: "#",
      githubUrl: "#",
      highlights: [
        "Multi-factor authentication",
        "SQL injection protection", 
        "XSS prevention",
        "Real-time threat monitoring"
      ]
    },
    {
      title: "NetworkViz Pro",
      description: "Network topology visualization tool with real-time monitoring capabilities. Built for network administrators to manage and analyze network infrastructure efficiently.",
      icon: Network,
      image: "/api/placeholder/400/250",
      technologies: ["Next.js", "D3.js", "WebSockets", "Python", "SNMP"],
      category: "Network Management",
      liveUrl: "#",
      githubUrl: "#",
      highlights: [
        "Real-time network mapping",
        "SNMP integration",
        "Performance analytics",
        "Automated alerts"
      ]
    },
    {
      title: "ModernUI Component Library",
      description: "A comprehensive React component library with TypeScript support, featuring modern animations and accessibility compliance. Built with shadcn/ui and Tailwind CSS.",
      icon: Code2,
      image: "/api/placeholder/400/250",
      technologies: ["React", "TypeScript", "Tailwind", "Storybook", "GSAP"],
      category: "Frontend Development",
      liveUrl: "#",
      githubUrl: "#",
      highlights: [
        "50+ reusable components",
        "Full TypeScript support",
        "WCAG 2.1 AA compliant",
        "Smooth GSAP animations"
      ]
    },
    {
      title: "CyberSec Audit Tool",
      description: "Automated security auditing tool for web applications. Performs vulnerability scans, generates detailed reports, and provides remediation recommendations.",
      icon: Lock,
      image: "/api/placeholder/400/250",
      technologies: ["Python", "React", "Docker", "Nmap", "SQLMap"],
      category: "Cybersecurity",
      liveUrl: "#",
      githubUrl: "#",
      highlights: [
        "Automated vulnerability scanning",
        "Comprehensive reporting",
        "Risk assessment matrix",
        "Remediation guidance"
      ]
    },
    {
      title: "DataFlow API",
      description: "High-performance REST API with advanced caching, rate limiting, and monitoring. Designed to handle enterprise-level data processing with security in mind.",
      icon: Database,
      image: "/api/placeholder/400/250",
      technologies: ["Python", "FastAPI", "Redis", "PostgreSQL", "Docker"],
      category: "Backend Development",
      liveUrl: "#",
      githubUrl: "#",
      highlights: [
        "Sub-100ms response times",
        "Advanced caching strategy",
        "Comprehensive API docs",
        "Horizontal scaling ready"
      ]
    },
    {
      title: "MobileFirst PWA",
      description: "Progressive Web App with offline capabilities, push notifications, and native-like performance. Built with modern web standards and responsive design principles.",
      icon: Smartphone,
      image: "/api/placeholder/400/250",
      technologies: ["React", "PWA", "Service Workers", "IndexedDB", "WebPush"],
      category: "Mobile Development",
      liveUrl: "#",
      githubUrl: "#",
      highlights: [
        "Offline functionality",
        "Push notifications",
        "App-like experience",
        "99% Lighthouse score"
      ]
    }
  ];

  return (
    <section id="projects" ref={sectionRef} className="py-20 bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Featured Projects
          </h2>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed">
            A showcase of my technical expertise across frontend development, cybersecurity, 
            networking, and full-stack solutions. Each project demonstrates real-world 
            problem-solving and modern development practices.
          </p>
        </div>

        <div ref={projectsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <Card 
              key={index} 
              className="group hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-500 hover:-translate-y-3 border-2 border-gray-700/50 hover:border-blue-400/50 overflow-hidden bg-gray-800/80 backdrop-blur-sm"
            >
              {/* Project Image Placeholder */}
              <div className="relative h-48 bg-gradient-to-br from-blue-600/30 to-purple-600/30 overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <project.icon className="w-16 h-16 text-blue-300/80" />
                </div>
                <div className="absolute top-4 left-4">
                  <Badge variant="secondary" className="text-xs bg-black/40 text-white border-white/20">
                    {project.category}
                  </Badge>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-gray-800/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              <CardHeader className="pb-4">
                <CardTitle className="text-xl text-white group-hover:text-blue-300 transition-colors duration-300">
                  {project.title}
                </CardTitle>
                <CardDescription className="text-sm leading-relaxed text-gray-300">
                  {project.description}
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Key Highlights */}
                <div>
                  <h4 className="font-semibold text-sm mb-2 text-blue-300">Key Features:</h4>
                  <ul className="text-xs text-gray-400 space-y-1">
                    {project.highlights.map((highlight, idx) => (
                      <li key={idx} className="flex items-center">
                        <span className="w-1 h-1 bg-primary rounded-full mr-2" />
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Technologies */}
                <div>
                  <h4 className="font-semibold text-sm mb-2">Technologies:</h4>
                  <div className="flex flex-wrap gap-1">
                    {project.technologies.map((tech, techIndex) => (
                      <Badge key={techIndex} variant="outline" className="text-xs px-2 py-1 bg-blue-900/30 text-blue-200 border-blue-500/30 hover:bg-blue-800/40">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 pt-4">
                  <Button size="sm" asChild className="flex-1">
                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" title="View Live Project">
                      <Globe className="w-4 h-4 mr-2" />
                      Live Demo
                    </a>
                  </Button>
                  <Button variant="outline" size="sm" asChild>
                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" title="View Source Code">
                      <Github className="w-4 h-4" />
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <h3 className="text-2xl font-bold mb-4 text-white">Want to see more?</h3>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            These are just a few examples of my work. I have additional projects in cybersecurity 
            research, network automation, and full-stack development.
          </p>
          <Button size="lg" asChild className="bg-blue-600 hover:bg-blue-700 text-white">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" title="View All Projects on GitHub">
              <Github className="w-5 h-5 mr-2" />
              View All Projects
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Projects;