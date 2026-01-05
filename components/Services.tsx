import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Zap, ArrowRight } from 'lucide-react';
import { ServiceItem } from '../types';

gsap.registerPlugin(ScrollTrigger);

const services: ServiceItem[] = [
  {
    id: 1,
    title: "Web Technologies",
    category: "Development",
    description: "Next-gen websites, WebGL experiences, and robust e-commerce platforms built for speed and conversion.",
  },
  {
    id: 2,
    title: "Social Strategy",
    category: "Marketing",
    description: "Data-driven community management and viral campaign architectures that turn followers into advocates.",
  },
  {
    id: 3,
    title: "Content Creation",
    category: "Production",
    description: "High-fidelity video, photography, and motion graphics designed to stop the scroll and engage instantly.",
  },
  {
    id: 4,
    title: "Brand Identity",
    category: "Design",
    description: "Visual systems that speak louder than words. We craft logos, typography, and color theories that stick.",
  }
];

const Services: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
        // Only enable complex scroll logic on larger screens
        const mm = gsap.matchMedia();
        
        mm.add("(min-width: 768px)", () => {
            if (!leftColRef.current) return;
            
            // Pin the left column
            ScrollTrigger.create({
                trigger: containerRef.current,
                start: "top top",
                end: "bottom bottom",
                pin: leftColRef.current,
                pinSpacing: false,
                scrub: true,
            });

            // Subtle parallax for the "Growth" text
            gsap.to(".growth-text", {
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top top",
                    end: "bottom bottom",
                    scrub: 1
                },
                color: "#ff4d00",
                letterSpacing: "0.1em"
            });
        });
        
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative w-full bg-[#0f0f0f] py-12 md:py-24 px-6 md:px-12 flex flex-col md:flex-row items-start overflow-hidden">
      
      {/* Left Column - Fixed via GSAP on desktop, static on mobile */}
      <div ref={leftColRef} className="w-full md:w-1/3 flex flex-col justify-center min-h-[50vh] md:h-screen z-10 will-change-transform pb-12 md:pb-0">
        <h2 className="text-[#ff4d00] font-bold text-sm tracking-[0.2em] mb-4 uppercase flex items-center gap-2">
            <span className="w-8 h-[1px] bg-[#ff4d00]"></span>
            Our Expertise
        </h2>
        <h3 className="text-5xl md:text-7xl font-bold text-[#E8E8E8] leading-tight">
          Systems <br/> for <br/> <span className="growth-text italic font-light text-gray-500 transition-colors">Growth</span>
        </h3>
        <p className="mt-8 text-gray-500 max-w-xs leading-relaxed">
          We don't just make things look good. We engineer digital ecosystems that perform.
        </p>
      </div>

      {/* Right Column - Scrolling Content */}
      <div 
        ref={rightColRef} 
        className="w-full md:w-2/3 flex flex-col gap-0 md:pl-24 py-0 md:py-32"
      >
        {services.map((service, index) => (
          <div 
            key={service.id} 
            className="service-card group border-t border-white/10 py-12 md:py-16 transition-colors duration-500 hover:bg-white/5 relative"
          >
            <div className="flex flex-col md:flex-row md:items-baseline justify-between mb-6 relative z-10">
                <div className="flex items-baseline gap-4">
                    <span className="text-xs font-mono text-[#ff4d00]">0{index + 1}</span>
                    <h4 className="text-3xl md:text-6xl font-bold text-[#E8E8E8] group-hover:text-white transition-colors duration-300">
                    {service.title}
                    </h4>
                </div>
                <ArrowRight className="w-6 h-6 md:w-8 md:h-8 text-[#ff4d00] opacity-100 md:opacity-0 md:-translate-x-4 md:group-hover:opacity-100 md:group-hover:translate-x-0 transition-all duration-300 mt-4 md:mt-0" />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pl-0 md:pl-10 relative z-10">
                <p className="text-base md:text-lg text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors">
                    {service.description}
                </p>
                <div className="flex items-end justify-start md:justify-end mt-4 md:mt-0">
                     <span className="text-[#ff4d00] text-xs font-mono uppercase tracking-widest opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300">
                        Explore {service.category}
                     </span>
                </div>
            </div>
          </div>
        ))}
        <div className="border-t border-white/10"></div>
      </div>
    </section>
  );
};

export default Services;