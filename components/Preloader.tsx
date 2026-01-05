import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const words = ["STRATEGY", "CREATIVITY", "TECHNOLOGY", "IMMERSION", "DIGITAL", "BUILDIT"];

const Preloader: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
           // Lift the curtain
            gsap.to(containerRef.current, {
                yPercent: -100,
                duration: 1.2,
                ease: "expo.inOut",
                onComplete: onComplete
            });
        }
      });

      // 1. Progress Bar fills up
      tl.to(progressRef.current, {
        scaleX: 1,
        duration: 2,
        ease: "power2.inOut",
        transformOrigin: "left"
      });
      
      // 2. Text exit animation
      tl.to(textRef.current, {
          y: -100,
          opacity: 0,
          duration: 0.5,
          ease: "power2.in"
      }, "-=0.5");

    }, containerRef);

    // Word cycler independent of timeline for that "glitch/rapid" feel
    const interval = setInterval(() => {
        setIndex(prev => {
            if (prev >= words.length - 1) return prev;
            return prev + 1;
        });
    }, 280);

    return () => {
        clearInterval(interval);
        ctx.revert();
    };
  }, [onComplete]);

  return (
    <div ref={containerRef} className="fixed inset-0 z-[9999] bg-[#050505] flex flex-col justify-between p-6 md:p-12 text-[#E8E8E8]">
       <div className="flex justify-between items-start opacity-50">
          <div className="font-mono text-xs md:text-sm tracking-widest">LOADING EXPERIENCE</div>
          <div className="font-mono text-xs md:text-sm tracking-widest">2025 ©</div>
       </div>

       <div className="overflow-hidden h-[20vw] flex items-center justify-center md:justify-start">
         <h1 ref={textRef} className="text-[15vw] md:text-[12vw] font-black leading-none uppercase tracking-tighter text-[#E8E8E8]">
            {words[index]}
         </h1>
       </div>

       <div className="w-full">
         <div className="flex justify-between font-mono text-xs mb-2 text-[#ff4d00]">
            <span>LOADING</span>
            <span>PLEASE WAIT</span>
         </div>
         <div className="w-full h-[2px] bg-[#222] relative overflow-hidden">
            <div ref={progressRef} className="absolute top-0 left-0 h-full bg-[#ff4d00] w-full scale-x-0 origin-left"></div>
         </div>
       </div>
    </div>
  );
};

export default Preloader;