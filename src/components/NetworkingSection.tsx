'use client';

import { useEffect, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Network, 
  Wifi, 
  Cable, 
  Router, 
  Settings, 
  Activity,
  Globe,
  Shield,
  Zap,
  MonitorSpeaker,
  Layers,
  Radio
} from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const NetworkingSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const expertiseRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const cards = cardsRef.current?.children || [];
    const expertiseItems = expertiseRef.current?.children || [];
    
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

    gsap.fromTo(expertiseItems,
      { x: 30, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: expertiseRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse"
        }
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const networkingServices = [
    {
      icon: Router,
      title: "Network Infrastructure",
      description: "Design, implementation, and maintenance of enterprise network infrastructure with CCNA certification",
      skills: ["Routing & Switching", "Network Design", "Protocol Configuration", "Infrastructure Planning"],
      level: "CCNA Certified"
    },
    {
      icon: Wifi,
      title: "Wireless Networks",
      description: "Local WiFi installation and setup with experience in wireless network optimization and security",
      skills: ["WiFi Installation", "Wireless Security", "Signal Optimization", "Access Point Setup"],
      level: "Hands-on Experience"
    },
    {
      icon: Cable,
      title: "Fiber Networks",
      description: "Fiber optic network installations and configurations for high-speed connectivity solutions",
      skills: ["Fiber Installation", "Optical Networks", "High-Speed Connectivity", "Cable Management"],
      level: "Field Experience"
    }
  ];

  const networkingExpertise = [
    {
      category: "Network Protocols",
      items: ["TCP/IP", "HTTP/HTTPS", "DNS", "DHCP", "SNMP", "OSPF", "BGP", "VLAN"],
      icon: Globe
    },
    {
      category: "Switching & Routing",
      items: ["Cisco Switches", "Layer 2/3 Switching", "VLAN Configuration", "Spanning Tree", "Route Tables"],
      icon: Layers
    },
    {
      category: "Subnetting & VLSM",
      items: ["IP Subnetting", "VLSM", "CIDR", "Network Segmentation", "Address Planning"],
      icon: Network
    },
    {
      category: "Wireless Technologies",
      items: ["802.11 Standards", "WPA/WPA2/WPA3", "Mesh Networks", "Signal Analysis", "Site Surveys"],
      icon: Radio
    },
    {
      category: "Network Security",
      items: ["Firewall Config", "Access Control", "Network Monitoring", "Intrusion Detection"],
      icon: Shield
    },
    {
      category: "Troubleshooting",
      items: ["Network Diagnostics", "Performance Analysis", "Issue Resolution", "Monitoring Tools"],
      icon: Activity
    }
  ];



  return (
    <section id="networking" ref={sectionRef} className="py-20 bg-gradient-to-br from-blue-50/50 via-background to-cyan-50/50 dark:from-blue-950/10 dark:via-background dark:to-cyan-950/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-4">
            <Network className="w-12 h-12 text-blue-600 mr-4" />
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              Network Engineering
            </h2>
          </div>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            CCNA certified network professional with hands-on experience in switches, subnetting, 
            wireless network installations, and fiber optic implementations. Expertise in designing 
            and maintaining robust network infrastructure.
          </p>
        </div>

        {/* CCNA Certification Highlight */}
        <div className="mb-12">
          <Card className="border-2 border-blue-200 dark:border-blue-800 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-950/20 dark:to-cyan-950/20">
            <CardContent className="pt-6">
              <div className="flex items-center justify-center gap-4">
                <div className="p-4 rounded-full bg-blue-600 text-white">
                  <Settings className="w-8 h-8" />
                </div>
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-blue-800 dark:text-blue-400 mb-2">
                    CCNA Certified Professional
                  </h3>
                  <p className="text-blue-700 dark:text-blue-300">
                    Cisco Certified Network Associate - Routing and Switching
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div ref={cardsRef} className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {networkingServices.map((service, index) => (
            <Card key={index} className="group hover:shadow-xl transition-all duration-500 hover:-translate-y-2 border-2 hover:border-blue-200 dark:hover:border-blue-800">
              <CardHeader className="pb-4">
                <div className="flex items-center gap-4 mb-3">
                  <div className="p-3 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 text-white group-hover:scale-110 transition-transform duration-300">
                    <service.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <CardTitle className="text-xl group-hover:text-blue-600 transition-colors">
                      {service.title}
                    </CardTitle>
                    <Badge variant="outline" className="mt-1 text-xs border-blue-200 text-blue-700">
                      {service.level}
                    </Badge>
                  </div>
                </div>
                <CardDescription className="text-sm leading-relaxed">
                  {service.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <h4 className="font-semibold text-sm mb-3 text-blue-600">Expertise Areas:</h4>
                <div className="grid grid-cols-1 gap-2">
                  {service.skills.map((skill, skillIndex) => (
                    <div key={skillIndex} className="flex items-center text-sm">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mr-2" />
                      <span className="text-muted-foreground">{skill}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Technical Expertise Grid */}
        <div className="bg-card rounded-2xl p-8 border-2 border-blue-100 dark:border-blue-900 mb-12">
          <h3 className="text-2xl font-bold mb-8 text-center flex items-center justify-center gap-3">
            <MonitorSpeaker className="w-6 h-6 text-blue-600" />
            Technical Expertise
          </h3>
          <div ref={expertiseRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {networkingExpertise.map((category, index) => (
              <div
                key={index}
                className="group p-4 rounded-lg bg-muted/50 hover:bg-blue-50 dark:hover:bg-blue-950/20 transition-all duration-300 border hover:border-blue-200 dark:hover:border-blue-800"
              >
                <div className="flex items-center gap-3 mb-4">
                  <category.icon className="w-5 h-5 text-blue-600 group-hover:scale-110 transition-transform" />
                  <h4 className="font-semibold text-blue-800 dark:text-blue-400">{category.category}</h4>
                </div>
                <div className="grid grid-cols-1 gap-2">
                  {category.items.map((item, itemIndex) => (
                    <div key={itemIndex} className="flex items-center text-sm">
                      <div className="w-1 h-1 bg-blue-500 rounded-full mr-2" />
                      <span className="text-muted-foreground">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Real-world Experience */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <Card className="border-2 border-green-200 dark:border-green-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-green-800 dark:text-green-400">
                <Wifi className="w-6 h-6" />
                Local WiFi Installations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Hands-on experience with local WiFi network installations and setup, including:
              </p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center"><Zap className="w-4 h-4 text-green-600 mr-2" /> Wireless access point configuration</li>
                <li className="flex items-center"><Zap className="w-4 h-4 text-green-600 mr-2" /> Network security implementation</li>
                <li className="flex items-center"><Zap className="w-4 h-4 text-green-600 mr-2" /> Coverage optimization and testing</li>
                <li className="flex items-center"><Zap className="w-4 h-4 text-green-600 mr-2" /> Client device connectivity troubleshooting</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-2 border-orange-200 dark:border-orange-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-orange-800 dark:text-orange-400">
                <Cable className="w-6 h-6" />
                Fiber Network Experience
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Practical experience with fiber optic networks and high-speed connectivity:
              </p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center"><Zap className="w-4 h-4 text-orange-600 mr-2" /> Fiber cable installation and termination</li>
                <li className="flex items-center"><Zap className="w-4 h-4 text-orange-600 mr-2" /> Optical network equipment configuration</li>
                <li className="flex items-center"><Zap className="w-4 h-4 text-orange-600 mr-2" /> High-speed connectivity solutions</li>
                <li className="flex items-center"><Zap className="w-4 h-4 text-orange-600 mr-2" /> Network performance optimization</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">Network Infrastructure Consulting</h3>
            <p className="mb-6 max-w-2xl mx-auto opacity-90">
              Need help with network design, implementation, or troubleshooting? 
              Let&apos;s discuss your networking requirements and build a robust solution.
            </p>
            <Button 
              size="lg" 
              variant="secondary"
              onClick={() => {
                const element = document.querySelector('#contact');
                element?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              <Network className="w-5 h-5 mr-2" />
              Discuss Network Needs
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NetworkingSection;