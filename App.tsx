import React, { useState, useEffect, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import ServicesPage from './components/ServicesPage';
import WorkScroll from './components/WorkScroll';
import WorkPage from './components/WorkPage';
import Contact from './components/Contact';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';
import Preloader from './components/Preloader';
import Marquee from './components/Marquee';
import AboutGrid from './components/AboutGrid';
import DeviceShowcase from './components/DeviceShowcase';
import ClientLogos from './components/ClientLogos';
import VideoManifesto from './components/VideoManifesto';
import Reviews from './components/Reviews';
import AboutPage from './components/AboutPage';

// Register globally to ensure plugins are available
gsap.registerPlugin(ScrollTrigger);

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState('home'); // 'home' | 'services' | 'work' | 'about' | 'contact'

  // Prevent scrolling during load
  useEffect(() => {
    if (loading) {
      document.body.style.overflow = 'hidden';
      // Force instant scroll to top on load
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    } else {
      document.body.style.overflow = '';
      // Refresh ScrollTrigger once loading is done to ensure positions are correct
      ScrollTrigger.refresh();
    }
  }, [loading]);

  // Handle View Transitions
  useLayoutEffect(() => {
    // Reset scroll position immediately without animation (instant)
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    
    // Force a refresh after a slight delay to allow React to render the new DOM
    const timer = setTimeout(() => {
        ScrollTrigger.refresh();
    }, 100);

    return () => clearTimeout(timer);
  }, [view]);

  return (
    <main className="bg-[#0a0a0a] text-[#E8E8E8] w-full min-h-screen selection:bg-[#ff4d00] selection:text-white relative">
      {loading && <Preloader onComplete={() => setLoading(false)} />}
      
      <CustomCursor />
      <Navbar onNavigate={setView} />
      
      {view === 'home' && (
        <div key="home-view">
          <Hero />
          <Services />
          <ClientLogos />
          <VideoManifesto />
          <Marquee />
          <AboutGrid onNavigate={setView} />
          <DeviceShowcase />
          <WorkScroll />
          <Reviews />
          <Footer onNavigate={setView} />
        </div>
      )}

      {view === 'services' && (
        <div key="services-view">
          <ServicesPage />
          <Footer onNavigate={setView} />
        </div>
      )}

      {view === 'work' && (
        <div key="work-view">
          <WorkPage />
          <Footer onNavigate={setView} />
        </div>
      )}

      {view === 'about' && (
        <div key="about-view">
          <AboutPage />
          <Footer onNavigate={setView} />
        </div>
      )}

      {view === 'contact' && (
        <div key="contact-view">
          <Contact />
          <Footer onNavigate={setView} showCta={false} />
        </div>
      )}
      
      {/* Texture Overlay for Gritty Feel */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-[9999]" 
        style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")' }}>
      </div>
    </main>
  );
};

export default App;