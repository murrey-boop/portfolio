'use client';

import { useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Code2, 
  Database, 
  Shield, 
  Network, 
  Container, 
  Globe
} from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const Skills = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const skillCards = skillsRef.current?.children || [];
    
    gsap.fromTo(skillCards,
      { y: 60, opacity: 0, rotateX: 15 },
      {
        y: 0,
        opacity: 1,
        rotateX: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          toggleActions: "play none none reverse"
        }
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const skillCategories = [
    {
      icon: Code2,
      title: "Frontend Development",
      level: "Expert",
      description: "Modern web applications with React ecosystem",
      skills: [
        { name: "JavaScript", proficiency: 95 },
        { name: "React", proficiency: 92 },
        { name: "TypeScript", proficiency: 88 },
        { name: "Next.js", proficiency: 90 },
        { name: "Tailwind CSS", proficiency: 85 },
        { name: "GSAP", proficiency: 80 }
      ],
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      icon: Database,
      title: "Backend & Systems",
      level: "Intermediate",
      description: "Server-side development and system programming",
      skills: [
        { name: "Python", proficiency: 75 },
        { name: "C/C++", proficiency: 70 },
        { name: "Rust", proficiency: 60 },
        { name: "Node.js", proficiency: 75 },
        { name: "REST APIs", proficiency: 80 },
        { name: "Database Design", proficiency: 70 }
      ],
      gradient: "from-green-500 to-emerald-500"
    },
    {
      icon: Shield,
      title: "Cybersecurity",
      level: "Intermediate",
      description: "Penetration testing and security analysis",
      skills: [
        { name: "Penetration Testing", proficiency: 75 },
        { name: "Vulnerability Assessment", proficiency: 80 },
        { name: "Security Auditing", proficiency: 70 },
        { name: "Ethical Hacking", proficiency: 65 },
        { name: "Risk Analysis", proficiency: 75 },
        { name: "OWASP", proficiency: 70 }
      ],
      gradient: "from-red-500 to-pink-500"
    },
    {
      icon: Network,
      title: "Networking",
      level: "Certified",
      description: "CCNA certified network infrastructure expertise",
      skills: [
        { name: "Network Configuration", proficiency: 85 },
        { name: "Protocol Analysis", proficiency: 80 },
        { name: "Routing & Switching", proficiency: 85 },
        { name: "Network Security", proficiency: 75 },
        { name: "Troubleshooting", proficiency: 90 },
        { name: "Infrastructure Design", proficiency: 75 }
      ],
      gradient: "from-purple-500 to-violet-500"
    },
    {
      icon: Container,
      title: "DevOps & Tools",
      level: "Intermediate",
      description: "Development workflow and containerization",
      skills: [
        { name: "Docker", proficiency: 75 },
        { name: "Git/GitHub", proficiency: 90 },
        { name: "CI/CD", proficiency: 70 },
        { name: "Linux", proficiency: 80 },
        { name: "AWS Basics", proficiency: 60 },
        { name: "Deployment", proficiency: 75 }
      ],
      gradient: "from-orange-500 to-yellow-500"
    },
    {
      icon: Globe,
      title: "Business & Soft Skills",
      level: "Graduate",
      description: "Business acumen and professional communication",
      skills: [
        { name: "Project Management", proficiency: 85 },
        { name: "Business Analysis", proficiency: 80 },
        { name: "Client Communication", proficiency: 90 },
        { name: "Team Collaboration", proficiency: 88 },
        { name: "Problem Solving", proficiency: 92 },
        { name: "Strategic Planning", proficiency: 75 }
      ],
      gradient: "from-teal-500 to-cyan-500"
    }
  ];

  const ProficiencyBar = ({ skill }: { skill: { name: string; proficiency: number } }) => {
    const widthClass = `w-[${skill.proficiency}%]`;
    
    return (
      <div className="mb-3">
        <div className="flex justify-between items-center mb-1">
          <span className="text-sm font-medium text-foreground">{skill.name}</span>
          <span className="text-xs text-muted-foreground">{skill.proficiency}%</span>
        </div>
        <div className="w-full bg-muted rounded-full h-2">
          <div
            className={`bg-gradient-to-r from-primary to-primary/80 h-2 rounded-full transition-all duration-1000 ease-out ${widthClass}`}
          />
        </div>
      </div>
    );
  };

  return (
    <section id="skills" ref={sectionRef} className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
            Technical Expertise
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            A comprehensive skill set spanning frontend development, cybersecurity, networking, 
            and business analysis. Continuously learning and adapting to emerging technologies.
          </p>
        </div>

        <div ref={skillsRef} className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {skillCategories.map((category, index) => (
            <Card key={index} className="group hover:shadow-xl transition-all duration-500 hover:-translate-y-1 border-2 hover:border-primary/20">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-lg bg-gradient-to-br ${category.gradient} text-white group-hover:scale-110 transition-transform duration-300`}>
                      <category.icon className="w-6 h-6" />
                    </div>
                    <div>
                      <CardTitle className="text-xl group-hover:text-primary transition-colors">
                        {category.title}
                      </CardTitle>
                      <Badge variant="outline" className="mt-1 text-xs">
                        {category.level}
                      </Badge>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mt-3">
                  {category.description}
                </p>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {category.skills.map((skill, skillIndex) => (
                    <ProficiencyBar key={skillIndex} skill={skill} />
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Additional Tools & Technologies */}
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-bold mb-8">Tools & Technologies</h3>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              'VS Code', 'Git', 'Figma', 'Postman', 'Docker', 'Linux', 
              'Wireshark', 'Burp Suite', 'Metasploit', 'Nmap', 'Vercel', 'Netlify'
            ].map((tool, index) => (
              <Badge 
                key={index} 
                variant="secondary" 
                className="px-4 py-2 hover:bg-primary hover:text-primary-foreground transition-colors cursor-default"
              >
                {tool}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;