import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Marquee: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!textRef.current || !containerRef.current) return;


    const content = textRef.current.innerHTML;
    textRef.current.innerHTML = content + content + content + content;

    const ctx = gsap.context(() => {

        gsap.fromTo(textRef.current,
            { xPercent: 0 },
            {
                xPercent: -50,
                ease: "none",
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 1
                }
            }
        );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="w-full bg-[#ff4d00] text-black overflow-hidden py-4 md:py-6 border-y border-black relative z-20 rotate-1 md:-rotate-1 scale-105 origin-center transform">
        <div ref={textRef} className="flex whitespace-nowrap will-change-transform font-black text-4xl md:text-6xl uppercase tracking-tighter">
            <span className="mx-8">Digital Dominance</span>
            <span className="mx-8">•</span>
            <span className="mx-8">Viral Engineering</span>
            <span className="mx-8">•</span>
            <span className="mx-8">System Architecture</span>
            <span className="mx-8">•</span>
            <span className="mx-8">Next-Gen Creative</span>
            <span className="mx-8">•</span>
        </div>
    </div>
  );
};

export default Marquee;