import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import React, { useEffect, useLayoutEffect, useState } from 'react';

import AboutGrid from './components/AboutGrid';
import AboutPage from './components/AboutPage';
import ClientLogos from './components/ClientLogos';
import Contact from './components/Contact';
import CustomCursor from './components/CustomCursor';
import DeviceShowcase from './components/DeviceShowcase';
import Footer from './components/Footer';
import Hero from './components/Hero';
import Marquee from './components/Marquee';
import Navbar from './components/Navbar';
import Preloader from './components/Preloader';
import Services from './components/Services';
import ServicesPage from './components/ServicesPage';
import StrategicPillars from './components/StrategicPillars';
import VideoManifesto from './components/VideoManifesto';
import WorkPage from './components/WorkPage';
import WorkScroll from './components/WorkScroll';

gsap.registerPlugin(ScrollTrigger);

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState<'home' | 'services' | 'work' | 'about' | 'contact'>('home');

  /* --------------------------------------------
     PRELOADER SCROLL CONTROL (BODY ONLY)
  --------------------------------------------- */
  useEffect(() => {
    if (loading) {
      document.body.style.overflow = 'hidden';
      window.scrollTo(0, 0);
    } else {
      document.body.style.overflow = 'auto';
      ScrollTrigger.refresh();
    }
  }, [loading]);

  /* --------------------------------------------
     LENIS – DESKTOP ONLY
  --------------------------------------------- */
  useEffect(() => {
    const isTouchDevice =
      'ontouchstart' in window ||
      navigator.maxTouchPoints > 0;

    // ❌ NO Lenis on Android / iOS
    if (isTouchDevice) return;

    const lenis = new Lenis({
      smoothWheel: true,
      smoothTouch: false,
    });

    lenis.on('scroll', ScrollTrigger.update);

    let rafId: number;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  /* --------------------------------------------
     VIEW CHANGE RESET
  --------------------------------------------- */
  useLayoutEffect(() => {
    window.scrollTo(0, 0);

    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);

    return () => clearTimeout(timer);
  }, [view]);

  return (
    <main className="bg-[#0a0a0a] text-[#E8E8E8] w-full min-h-screen relative overflow-x-hidden selection:bg-[#ff4d00] selection:text-white">
      {loading && <Preloader onComplete={() => setLoading(false)} />}

      <CustomCursor />
      <Navbar onNavigate={setView} />

      {view === 'home' && (
        <>
          <Hero onNavigate={setView} />
          <Services />
          <ClientLogos />
          <VideoManifesto />
          <Marquee />
          <AboutGrid onNavigate={setView} />
          <DeviceShowcase />
          <WorkScroll />
          <StrategicPillars onNavigate={setView} />
          <Footer onNavigate={setView} />
        </>
      )}

      {view === 'services' && (
        <>
          <ServicesPage onNavigate={setView} />
          <Footer onNavigate={setView} />
        </>
      )}

      {view === 'work' && (
        <>
          <WorkPage />
          <Footer onNavigate={setView} />
        </>
      )}

      {view === 'about' && (
        <>
          <AboutPage />
          <Footer onNavigate={setView} />
        </>
      )}

      {view === 'contact' && (
        <>
          <Contact />
          <Footer onNavigate={setView} showCta={false} />
        </>
      )}

      {/* Grain Overlay */}
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.03] z-[9999]"
        style={{
          backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")',
        }}
      />
    </main>
  );
};

export default App;
