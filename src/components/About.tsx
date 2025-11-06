'use client';

import { useEffect, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { GraduationCap, Code2, Shield, Network, Building, Award } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const About = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const cards = cardsRef.current?.children || [];
    
    gsap.fromTo(cards,
      { y: 80, opacity: 0, scale: 0.8 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.8,
        stagger: 0.2,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const achievements = [
    {
      icon: Code2,
      title: "Frontend Excellence",
      description: "Specialized in React, TypeScript, and Next.js with a focus on modern, performant web applications",
      skills: ["React", "TypeScript", "Next.js", "Tailwind CSS", "GSAP"]
    },
    {
      icon: Shield,
      title: "Cybersecurity Focus",
      description: "Intermediate penetration testing skills with knowledge of security best practices and vulnerability assessment",
      skills: ["Penetration Testing", "Security Auditing", "Risk Assessment", "Ethical Hacking"]
    },
    {
      icon: Network,
      title: "Network Infrastructure",
      description: "CCNA certified with solid understanding of networking protocols, configuration, and troubleshooting",
      skills: ["CCNA Certified", "Network Config", "Protocol Analysis", "Infrastructure"]
    },
    {
      icon: Building,
      title: "Business & Technology",
      description: "Graduate degree in Business and IT, bridging the gap between technical excellence and business strategy",
      skills: ["Business Strategy", "IT Management", "Project Planning", "Stakeholder Communication"]
    }
  ];

  return (
    <section id="about" ref={sectionRef} className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
            About Me
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            A passionate fullstack developer with a frontend focus, combining technical expertise 
            with business acumen to create impactful digital solutions. My unique blend of 
            development skills, cybersecurity knowledge, and networking expertise allows me to 
            build secure, scalable, and user-centric applications.
          </p>
        </div>

        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {achievements.map((achievement, index) => (
            <Card key={index} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-2 border-2 hover:border-primary/20">
              <CardHeader className="pb-4">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                    <achievement.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-xl group-hover:text-primary transition-colors">
                      {achievement.title}
                    </CardTitle>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base mb-4 leading-relaxed">
                  {achievement.description}
                </CardDescription>
                <div className="flex flex-wrap gap-2">
                  {achievement.skills.map((skill, skillIndex) => (
                    <Badge key={skillIndex} variant="secondary" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Technical Background */}
        <div className="bg-card rounded-2xl p-8 border-2 border-primary/10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-4 flex items-center gap-3">
                <GraduationCap className="w-6 h-6 text-primary" />
                Educational Foundation
              </h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                My academic background in Business and IT provides me with a unique perspective 
                that combines technical proficiency with strategic thinking. This foundation 
                enables me to understand both the technical requirements and business implications 
                of every project I work on.
              </p>
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline" className="flex items-center gap-1">
                  <Award className="w-3 h-3" />
                  Business Graduate
                </Badge>
                <Badge variant="outline" className="flex items-center gap-1">
                  <Award className="w-3 h-3" />
                  IT Specialist
                </Badge>
                <Badge variant="outline" className="flex items-center gap-1">
                  <Award className="w-3 h-3" />
                  CCNA Certified
                </Badge>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="bg-muted/50 rounded-lg p-6">
                <h4 className="font-semibold mb-2 text-primary">Core Strengths</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Frontend development with modern frameworks</li>
                  <li>• Security-first development approach</li>
                  <li>• Network infrastructure understanding</li>
                  <li>• Business requirements analysis</li>
                  <li>• Cross-functional team collaboration</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;