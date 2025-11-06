import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Skills from '@/components/Skills';
import Projects from '@/components/Projects';
import SecuritySection from '@/components/SecuritySection';
import NetworkingSection from '@/components/NetworkingSection';
import Testimonials from '@/components/Testimonials';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <SecuritySection />
        <NetworkingSection />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
