'use client';

import { useEffect, useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Quote } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const testimonials = [
  {
    id: 1,
    quote: "I thought it was impossible to make a website as beautiful as our product, but Rick proved me wrong.",
    author: "Sara Lee",
    position: "CEO of Acme Co",
    avatar: "/api/placeholder/40/40",
    initials: "SL"
  },
  {
    id: 2,
    quote: "I've never met a web developer who truly cared about their clients' success like Rick does.",
    author: "Chris Brown",
    position: "COO of DEF Corp",
    avatar: "/api/placeholder/40/40",
    initials: "CB"
  },
  {
    id: 3,
    quote: "After Rick optimized our website, our traffic increased by 50%. We can't thank them enough!",
    author: "Lisa Wang",
    position: "CTO of 456 Enterprises",
    avatar: "/api/placeholder/40/40",
    initials: "LW"
  }
];

const Testimonials = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo(titleRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Subtitle animation
      gsap.fromTo(subtitleRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          delay: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: subtitleRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Cards animation
      gsap.fromTo(cardsRef.current?.children || [],
        { y: 60, opacity: 0, scale: 0.9 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: cardsRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="testimonials"
      ref={sectionRef}
      className="py-20 bg-gradient-to-br from-purple-900 via-violet-800 to-indigo-900 relative overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(120,119,198,0.4),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(167,139,250,0.3),transparent_50%)]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge 
            ref={subtitleRef}
            variant="secondary" 
            className="mb-4 px-4 py-2 text-sm font-medium bg-white/10 text-white border-white/20"
          >
            WHAT OTHERS SAY
          </Badge>
          <h2
            ref={titleRef}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 text-white"
          >
            Testimonials.
          </h2>
        </div>

        {/* Testimonial Cards */}
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <Card
              key={testimonial.id}
              className="bg-black/40 backdrop-blur-sm border-white/10 hover:bg-black/50 transition-all duration-300 group"
            >
              <CardContent className="p-8">
                {/* Quote Icon */}
                <Quote className="w-8 h-8 text-white/60 mb-6 group-hover:text-white/80 transition-colors" />
                
                {/* Quote Text */}
                <blockquote className="text-white/90 text-lg leading-relaxed mb-8 italic">
                  &ldquo;{testimonial.quote}&rdquo;
                </blockquote>
                
                {/* Author Info */}
                <div className="flex items-center">
                  <Avatar className="h-12 w-12 mr-4 border-2 border-white/20">
                    <AvatarImage src={testimonial.avatar} alt={testimonial.author} />
                    <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white font-semibold">
                      {testimonial.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-semibold text-white text-lg">
                      {testimonial.author}
                    </div>
                    <div className="text-white/70 text-sm">
                      {testimonial.position}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;