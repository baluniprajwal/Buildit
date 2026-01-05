import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const DeviceShowcase: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const laptopRef = useRef<HTMLDivElement>(null);
  const phoneRef = useRef<HTMLDivElement>(null);
  const glareRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
        const mm = gsap.matchMedia();

        // Desktop Animation
        mm.add("(min-width: 768px)", () => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 1
                }
            });

            gsap.set(laptopRef.current, { rotationX: 10, scale: 0.9 });
            gsap.set(phoneRef.current, { rotationY: -10, y: 150 });

            tl.to(laptopRef.current, { rotationX: 0, y: -50, scale: 1, ease: "none" }, 0);
            tl.to(phoneRef.current, { rotationY: 0, y: -200, ease: "none" }, 0);
            
            if (glareRef.current) {
                gsap.to(glareRef.current, {
                    xPercent: 200,
                    ease: "none",
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: "top bottom",
                        end: "bottom top",
                        scrub: 1.5
                    }
                });
            }
        });

        // Mobile Animation (Simplified)
        mm.add("(max-width: 767px)", () => {
             const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 80%",
                    end: "bottom 20%",
                    scrub: 1
                }
            });
            
            // Just simple movement for mobile
            gsap.set(laptopRef.current, { y: 50 });
            gsap.set(phoneRef.current, { y: 100 });

            tl.to(laptopRef.current, { y: 0 }, 0);
            tl.to(phoneRef.current, { y: -50 }, 0);
        });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="w-full min-h-[100vh] md:min-h-[120vh] bg-[#050505] relative overflow-hidden flex flex-col items-center justify-center py-24">
        
        {/* Background Grid/Glow */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,black,transparent)] pointer-events-none"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] bg-[#ff4d00] blur-[200px] opacity-10 rounded-full pointer-events-none"></div>

        {/* Text Header */}
        <div className="relative z-10 text-center mb-8 md:mb-32 px-6">
            <h2 className="text-4xl md:text-7xl font-black uppercase text-[#E8E8E8] tracking-tighter mb-4">
                Agency <br/> <span className="text-[#ff4d00]">Showreel</span>
            </h2>
            <p className="text-gray-400 text-lg md:text-xl max-w-xl mx-auto">
                Experience the collision of strategy and aesthetics.
            </p>
        </div>

        {/* Devices Container */}
        <div className="relative w-full max-w-7xl h-[50vh] md:h-[80vh] flex items-center justify-center perspective-[2000px]">
            
            {/* LAPTOP */}
            <div 
                ref={laptopRef}
                className="absolute w-[90vw] md:w-[65vw] aspect-[16/10] bg-[#1a1a1a] rounded-[1rem] md:rounded-[2rem] shadow-[0_30px_60px_rgba(0,0,0,0.5)] z-10 transform-style-3d overflow-hidden top-1/4 md:top-auto"
            >
                {/* Laptop Frame */}
                <div className="absolute inset-0 rounded-[1rem] md:rounded-[2rem] border-[1px] border-white/10 pointer-events-none z-50"></div>
                <div className="absolute inset-[-2px] bg-gradient-to-b from-[#444] to-[#111] rounded-[1.1rem] md:rounded-[2.1rem] -z-10"></div>

                {/* Camera Dot */}
                <div className="absolute top-2 md:top-3 left-1/2 -translate-x-1/2 flex gap-2 z-40">
                    <div className="w-1 h-1 md:w-1.5 md:h-1.5 rounded-full bg-black border border-white/20"></div>
                </div>
                
                {/* Screen Content */}
                <div className="w-full h-full bg-[#050505] overflow-hidden relative group">
                    <video 
                        autoPlay muted loop playsInline 
                        className="w-full h-full object-cover"
                        src="https://videos.pexels.com/video-files/5473806/5473806-hd_1920_1080_25fps.mp4"
                    />
                    <div ref={glareRef} className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent -translate-x-full pointer-events-none z-50 skew-x-12 hidden md:block"></div>
                </div>
            </div>

            {/* PHONE */}
            <div 
                ref={phoneRef}
                className="absolute right-[2%] md:right-[15%] bottom-0 md:bottom-0 w-[35vw] md:w-[18vw] aspect-[9/19] bg-black rounded-[2rem] md:rounded-[3rem] shadow-[0_20px_50px_rgba(0,0,0,0.8)] z-20 overflow-hidden transform-style-3d translate-y-12 md:translate-y-0"
            >
                 {/* Titanium Frame */}
                 <div className="absolute inset-[-3px] md:inset-[-4px] bg-gradient-to-tr from-gray-400 via-gray-100 to-gray-500 rounded-[2.2rem] md:rounded-[3.3rem] -z-10"></div>
                 <div className="absolute inset-[-1px] bg-black rounded-[2rem] md:rounded-[3rem] -z-5"></div>

                 {/* Dynamic Island */}
                 <div className="absolute top-2 left-1/2 -translate-x-1/2 w-[30%] h-5 md:h-7 bg-black rounded-full z-40 flex items-center justify-center gap-2">
                     <div className="w-1 h-1 md:w-1.5 md:h-1.5 rounded-full bg-[#111] border border-gray-800"></div>
                 </div>

                 {/* Screen Content */}
                 <div className="w-full h-full bg-[#111] relative overflow-hidden rounded-[2rem] md:rounded-[3rem]">
                    <video 
                        autoPlay muted loop playsInline 
                        className="w-full h-full object-cover"
                        src="https://videos.pexels.com/video-files/6112966/6112966-uhd_1440_2732_25fps.mp4"
                    />
                 </div>
            </div>

        </div>
    </section>
  );
};

export default DeviceShowcase;