'use client';

import { useEffect, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Shield, 
  Lock, 
  Search, 
  AlertTriangle, 
  FileX, 
  Network,
  Key,
  Eye,
  Bug,
  Zap
} from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const SecuritySection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const cards = cardsRef.current?.children || [];
    const gridItems = gridRef.current?.children || [];
    
    gsap.fromTo(cards,
      { y: 60, opacity: 0, scale: 0.9 },
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

    gsap.fromTo(gridItems,
      { x: -30, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: gridRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse"
        }
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const securityServices = [
    {
      icon: Search,
      title: "Penetration Testing",
      description: "Comprehensive security assessments to identify vulnerabilities before attackers do",
      skills: ["Network Scanning", "Vulnerability Assessment", "Social Engineering", "Reporting"],
      level: "Intermediate"
    },
    {
      icon: Shield,
      title: "Security Auditing",
      description: "Systematic evaluation of security policies, procedures, and implementations",
      skills: ["Risk Assessment", "Compliance Check", "Security Policies", "Documentation"],
      level: "Intermediate"
    },
    {
      icon: Lock,
      title: "Secure Development",
      description: "Building applications with security-first approach and best practices",
      skills: ["OWASP Top 10", "Secure Coding", "Authentication", "Data Protection"],
      level: "Advanced"
    }
  ];

  const securityTools = [
    { name: "Nmap", category: "Network Discovery", icon: Network },
    { name: "Burp Suite", category: "Web App Testing", icon: Bug },
    { name: "Metasploit", category: "Penetration Testing", icon: Zap },
    { name: "Wireshark", category: "Traffic Analysis", icon: Eye },
    { name: "OWASP ZAP", category: "Security Scanner", icon: Search },
    { name: "Hashcat", category: "Password Recovery", icon: Key },
    { name: "Nessus", category: "Vulnerability Scanner", icon: AlertTriangle },
    { name: "John the Ripper", category: "Password Cracking", icon: FileX },
  ];

  return (
    <section id="security" ref={sectionRef} className="py-20 bg-gradient-to-br from-red-50/50 via-background to-orange-50/50 dark:from-red-950/10 dark:via-background dark:to-orange-950/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-4">
            <Shield className="w-12 h-12 text-red-600 mr-4" />
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
              Cybersecurity Expertise
            </h2>
          </div>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Intermediate-level penetration testing and security assessment capabilities. 
            Focused on identifying vulnerabilities and implementing security best practices 
            in web applications and network infrastructure.
          </p>
        </div>

        <div ref={cardsRef} className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {securityServices.map((service, index) => (
            <Card key={index} className="group hover:shadow-xl transition-all duration-500 hover:-translate-y-2 border-2 hover:border-red-200 dark:hover:border-red-800">
              <CardHeader className="pb-4">
                <div className="flex items-center gap-4 mb-3">
                  <div className="p-3 rounded-lg bg-gradient-to-br from-red-500 to-orange-500 text-white group-hover:scale-110 transition-transform duration-300">
                    <service.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <CardTitle className="text-xl group-hover:text-red-600 transition-colors">
                      {service.title}
                    </CardTitle>
                    <Badge variant="outline" className="mt-1 text-xs border-red-200 text-red-700">
                      {service.level}
                    </Badge>
                  </div>
                </div>
                <CardDescription className="text-sm leading-relaxed">
                  {service.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <h4 className="font-semibold text-sm mb-3 text-red-600">Key Skills:</h4>
                <div className="grid grid-cols-2 gap-2">
                  {service.skills.map((skill, skillIndex) => (
                    <div key={skillIndex} className="flex items-center text-sm">
                      <div className="w-2 h-2 bg-red-500 rounded-full mr-2" />
                      <span className="text-muted-foreground">{skill}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Security Tools Grid */}
        <div className="bg-card rounded-2xl p-8 border-2 border-red-100 dark:border-red-900">
          <h3 className="text-2xl font-bold mb-6 text-center flex items-center justify-center gap-3">
            <Key className="w-6 h-6 text-red-600" />
            Security Tools & Technologies
          </h3>
          <div ref={gridRef} className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {securityTools.map((tool, index) => (
              <div
                key={index}
                className="group p-4 rounded-lg bg-muted/50 hover:bg-red-50 dark:hover:bg-red-950/20 transition-all duration-300 cursor-default border hover:border-red-200 dark:hover:border-red-800"
              >
                <div className="flex items-center gap-3">
                  <tool.icon className="w-5 h-5 text-red-600 group-hover:scale-110 transition-transform" />
                  <div>
                    <div className="font-semibold text-sm">{tool.name}</div>
                    <div className="text-xs text-muted-foreground">{tool.category}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <div className="bg-gradient-to-r from-red-600 to-orange-600 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">Security Consultation Available</h3>
            <p className="mb-6 max-w-2xl mx-auto opacity-90">
              Need a security assessment for your application or network? 
              I can help identify vulnerabilities and recommend security improvements.
            </p>
            <Button 
              size="lg" 
              variant="secondary"
              onClick={() => {
                const element = document.querySelector('#contact');
                element?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              <Shield className="w-5 h-5 mr-2" />
              Discuss Security Needs
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SecuritySection;