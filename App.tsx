import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
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
import ContentPage from './components/ContentPage';
import StrategicPillars from './components/StrategicPillars';
import VideoManifesto from './components/VideoManifesto';
import WorkPage from './components/WorkPage';
import WorkScroll from './components/WorkScroll';


gsap.registerPlugin(ScrollTrigger);

const HomePage: React.FC = () => (
  <>
    <Hero />
    <Services />
    <ClientLogos />
    <VideoManifesto />
    <Marquee />
    <AboutGrid />
    <DeviceShowcase />
    <WorkScroll />
    <StrategicPillars />
    <Footer />
  </>
);

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const isContentPage = location.pathname === '/content-archive' || location.pathname === '/content';

  useEffect(() => {
    if (loading) {
      document.documentElement.style.overflow = 'hidden';
      document.body.style.overflow = 'hidden';

      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    } else {
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';

      ScrollTrigger.refresh();
    }
  }, [loading]);

  useEffect(() => {
    const isCoarsePointer = typeof window !== 'undefined'
      ? window.matchMedia('(pointer: coarse)').matches
      : false;
    const hasTouchPoints = typeof navigator !== 'undefined' && navigator.maxTouchPoints > 0;
    if (isCoarsePointer || hasTouchPoints) return;

    const lenis = new Lenis({
      smoothWheel: true,
    });

    lenis.on('scroll', ScrollTrigger.update);

    let rafId = 0;
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


  useLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    document.documentElement.style.overflow = '';
    document.body.style.overflow = '';

    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);

    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <main className="bg-[#0a0a0a] text-[#E8E8E8] w-full min-h-screen selection:bg-[#ff4d00] selection:text-white relative">
      {loading && <Preloader onComplete={() => setLoading(false)} />}

      {!isContentPage && <CustomCursor />}
      <Navbar />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/services" element={<><ServicesPage /><Footer /></>} />
        <Route path="/work" element={<><WorkPage /><Footer /></>} />
        <Route path="/content-archive" element={<><ContentPage /><Footer showCta={false} /></>} />
        <Route path="/content" element={<Navigate to="/content-archive" replace />} />
        <Route path="/about" element={<><AboutPage /><Footer /></>} />
        <Route path="/contact" element={<><Contact /><Footer showCta={false} /></>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      {!isContentPage && (
        <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-[9999]"
          style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")' }}>
        </div>
      )}
    </main>
  );
};

export default App;
