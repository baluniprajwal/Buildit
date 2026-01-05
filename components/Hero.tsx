import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowDownRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const maskRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  // Content Component to ensure exact alignment between layers
  const HeroContent = ({ isOverlay }: { isOverlay: boolean }) => (
    <div className="absolute inset-0 flex flex-col justify-between pt-32 pb-12 px-6 md:px-12 pointer-events-none">
      {/* Main Title Area */}
      <div className="w-full md:max-w-[85vw] flex-grow flex flex-col justify-center items-start perspective-1000">
        <h1 className="text-[10vw] md:text-[9vw] leading-[0.85] font-black uppercase tracking-tighter">
          <div className="overflow-hidden">
            {/* Line 1: Buildit (Accent) */}
            <span className={`hero-line hero-parallax-1 block ${isOverlay ? 'text-black' : 'text-[#ff4d00]'}`}>
              Buildit
            </span>
          </div>
          
          <div className="overflow-hidden">
            {/* Line 3: Agency (Normal with Arrow) */}
            <div className={`hero-line hero-parallax-2 flex items-center gap-2 md:gap-6 ${isOverlay ? 'text-[#E8E8E8]' : 'text-black'}`}>
              <span>Agency</span>
              <ArrowDownRight className={`w-[8vw] h-[8vw] md:w-[5vw] md:h-[5vw] stroke-[2px] md:stroke-[3px] mt-2`} />
            </div>
          </div>
        </h1>
      </div>

      {/* Bottom Bar */}
      <div className={`w-full flex flex-col md:flex-row justify-between items-start md:items-end border-t pt-6 md:pt-8 mt-8 md:mt-0 ${isOverlay ? 'border-[#E8E8E8]' : 'border-black'}`}>
        <div className="max-w-xl">
          <p className={`text-lg md:text-xl font-normal leading-relaxed ${isOverlay ? 'text-[#E8E8E8]/90' : 'text-[#333]'}`}>
            We fuse <span className={`${isOverlay ? 'text-black' : 'text-black'} font-medium`}>Social Strategy</span>, <span className={`${isOverlay ? 'text-black' : 'text-black'} font-medium`}>Web Technology</span>, and <span className={`${isOverlay ? 'text-black' : 'text-black'} font-medium`}>Content Creation</span>.
          </p>
        </div>
        <div className="mt-8 md:mt-0 pointer-events-auto">
          {/* 
             Button Logic:
             Base: Black Text, Black Border, Orange Hover Fill
             Overlay: Light Text, Light Border, Black Hover Fill
          */}
          <button className={`group relative px-8 py-4 bg-transparent border overflow-hidden transition-colors ${isOverlay ? 'border-[#E8E8E8] hover:border-black' : 'border-black hover:border-[#ff4d00]'}`}>
            <span className={`relative z-10 font-bold uppercase tracking-wider transition-colors duration-300 ${isOverlay ? 'text-[#E8E8E8] group-hover:text-[#E8E8E8]' : 'text-black group-hover:text-[#E8E8E8]'}`}>
              Start Project
            </span>
            
            {/* Hover Fill Effect */}
            <div className={`absolute inset-0 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out ${isOverlay ? 'bg-black' : 'bg-[#ff4d00]'}`}></div>
          </button>
        </div>
      </div>
    </div>
  );

  useEffect(() => {
    if (!containerRef.current || !maskRef.current) return;

    const ctx = gsap.context(() => {
      // Set initial state
      gsap.set(maskRef.current, { clipPath: "circle(0px at 50% 50%)" });
      
      const mm = gsap.matchMedia();

      // Mobile: Auto-expand mask so content is visible without interaction
      mm.add("(max-width: 767px)", () => {
          gsap.to(maskRef.current, {
              clipPath: "circle(150% at 50% 50%)", // Reveal everything
              duration: 2,
              ease: "power2.out",
              delay: 1.5
          });
      });

      // Desktop: Interactive Mask
      mm.add("(min-width: 768px)", () => {
          // Entrance Sequence
          const tl = gsap.timeline();

          tl.from(".hero-line", {
            y: 200,
            opacity: 0,
            duration: 1.2,
            stagger: 0.15,
            ease: "power4.out",
            skewY: 7
          })
          // Expand mask to show a preview then let it follow mouse
          .to(maskRef.current, {
            clipPath: "circle(200px at 50% 50%)",
            duration: 1.5,
            ease: "expo.out"
          }, "-=0.8");

          const handleMouseMove = (e: MouseEvent) => {
            if (!containerRef.current || !maskRef.current) return;
            const rect = containerRef.current.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            gsap.to(maskRef.current, {
              clipPath: `circle(250px at ${x}px ${y}px)`,
              duration: 0.4,
              ease: "power2.out"
            });
          };

          window.addEventListener('mousemove', handleMouseMove);
          return () => window.removeEventListener('mousemove', handleMouseMove);
      });

      // --- SCROLL PARALLAX LOGIC (Global) ---
      gsap.to(".hero-parallax-1", {
        yPercent: 50,
        ease: "none",
        scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true
        }
      });

      gsap.to(".hero-parallax-2", {
        yPercent: 20,
        ease: "none",
        scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true
        }
      });
      
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative h-screen w-full overflow-hidden bg-[#E8E8E8]">
      <div ref={textRef} className="relative w-full h-full">
         <HeroContent isOverlay={false} />
      </div>
      
      <div 
        ref={maskRef} 
        className="absolute inset-0 z-10 pointer-events-auto bg-[#ff4d00]"
        style={{ willChange: 'clip-path' }}
      >
        <HeroContent isOverlay={true} />
      </div>
    </section>
  );
};

export default Hero;