'use client';

import { useEffect, useRef, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Github, 
  Linkedin, 
  Download,
  Send,
  Clock,
  CheckCircle
} from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const Contact = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const [formStatus, setFormStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const cards = cardsRef.current?.children || [];
    
    gsap.fromTo(cards,
      { y: 80, opacity: 0, scale: 0.9 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.8,
        stagger: 0.2,
        ease: "back.out(1.7)",
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus('loading');
    
    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      subject: formData.get('subject') as string,
      message: formData.get('message') as string,
    };

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        setFormStatus('success');
        // Reset form
        e.currentTarget.reset();
        setTimeout(() => setFormStatus('idle'), 5000);
      } else {
        console.error('Email send error:', result.error);
        setFormStatus('error');
        setTimeout(() => setFormStatus('idle'), 3000);
      }
    } catch (error) {
      console.error('Network error:', error);
      setFormStatus('error');
      setTimeout(() => setFormStatus('idle'), 3000);
    }
  };

  const contactMethods = [
    {
      icon: Mail,
      title: "Email",
      description: "Drop me a line anytime",
      value: "your.email@example.com",
      action: "mailto:your.email@example.com",
      primary: true
    },
    {
      icon: Phone,
      title: "Phone",
      description: "Let's have a conversation",
      value: "+1 (555) 123-4567",
      action: "tel:+15551234567",
      primary: false
    },
    {
      icon: MapPin,
      title: "Location",
      description: "Currently based in",
      value: "Your City, Country",
      action: "#",
      primary: false
    }
  ];

  const socialLinks = [
    {
      icon: Github,
      name: "GitHub",
      url: "https://github.com",
      description: "Check out my repositories"
    },
    {
      icon: Linkedin,
      name: "LinkedIn",
      url: "https://linkedin.com",
      description: "Connect professionally"
    }
  ];

  return (
    <section id="contact" ref={sectionRef} className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
            Get In Touch
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            I&apos;m always interested in discussing new opportunities, challenging projects, 
            or just connecting with fellow developers and security enthusiasts. 
            Let&apos;s build something amazing together!
          </p>
        </div>

        <div ref={cardsRef} className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <Card className="border-2 hover:border-primary/30 transition-colors duration-300">
              <CardHeader>
                <CardTitle className="text-2xl">Let&apos;s Connect</CardTitle>
                <CardDescription>
                  Multiple ways to reach me. I typically respond within 24 hours.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {contactMethods.map((method, index) => (
                  <div key={index} className="flex items-center gap-4 p-4 rounded-lg hover:bg-muted/50 transition-colors">
                    <div className={`p-3 rounded-lg ${method.primary ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                      <method.icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold">{method.title}</h4>
                      <p className="text-sm text-muted-foreground mb-1">{method.description}</p>
                      <a 
                        href={method.action}
                        className="text-primary hover:underline font-medium"
                      >
                        {method.value}
                      </a>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Social Links */}
            <Card className="border-2 hover:border-primary/30 transition-colors duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-primary" />
                  Social & Professional
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {socialLinks.map((social, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="lg"
                    asChild
                    className="w-full justify-start hover:border-primary/50"
                  >
                    <a href={social.url} target="_blank" rel="noopener noreferrer" title={social.description}>
                      <social.icon className="w-5 h-5 mr-3" />
                      <div className="text-left">
                        <div className="font-semibold">{social.name}</div>
                        <div className="text-xs text-muted-foreground">{social.description}</div>
                      </div>
                    </a>
                  </Button>
                ))}
                
                <Button variant="outline" size="lg" className="w-full justify-start hover:border-primary/50">
                  <Download className="w-5 h-5 mr-3" />
                  <div className="text-left">
                    <div className="font-semibold">Download Resume</div>
                    <div className="text-xs text-muted-foreground">Latest version (PDF)</div>
                  </div>
                </Button>
              </CardContent>
            </Card>

            {/* Availability */}
            <Card className="border-2 border-green-200 bg-green-50 dark:bg-green-900/10 dark:border-green-800">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-green-600" />
                  <div>
                    <h4 className="font-semibold text-green-800 dark:text-green-400">Available for Projects</h4>
                    <p className="text-sm text-green-700 dark:text-green-300">
                      Currently accepting freelance and full-time opportunities
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <Card className="border-2 hover:border-primary/30 transition-colors duration-300">
            <CardHeader>
              <CardTitle className="text-2xl">Send a Message</CardTitle>
              <CardDescription>
                Have a project in mind? I&apos;d love to hear about it. 
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-background"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-background"
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    required
                    className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-background"
                    placeholder="Project inquiry, collaboration, etc."
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    required
                    className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-background resize-none"
                    placeholder="Tell me about your project, requirements, timeline, etc."
                  />
                </div>

                <div className="flex gap-2">
                  <Badge variant="secondary" className="text-xs">
                    Frontend Development
                  </Badge>
                  <Badge variant="secondary" className="text-xs">
                    Security Consulting
                  </Badge>
                  <Badge variant="secondary" className="text-xs">
                    Network Solutions
                  </Badge>
                </div>

                <Button 
                  type="submit" 
                  size="lg" 
                  className="w-full"
                  disabled={formStatus === 'loading'}
                  variant={formStatus === 'error' ? 'destructive' : 'default'}
                >
                  {formStatus === 'loading' && (
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary-foreground mr-2" />
                  )}
                  {formStatus === 'success' ? (
                    <>
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Message Sent!
                    </>
                  ) : formStatus === 'error' ? (
                    <>
                      <Mail className="w-4 h-4 mr-2" />
                      Try Again
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      Send Message
                    </>
                  )}
                </Button>

                {formStatus === 'success' && (
                  <p className="text-sm text-green-600 text-center">
                    Thank you for your message! I&apos;ll get back to you soon.
                  </p>
                )}
                {formStatus === 'error' && (
                  <p className="text-sm text-red-600 text-center">
                    Failed to send message. Please try again or contact me directly via email.
                  </p>
                )}
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Contact;