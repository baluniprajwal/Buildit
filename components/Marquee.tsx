import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const marqueeItems = [
  'Digital Dominance',
  '*',
  'Viral Engineering',
  '*',
  'System Architecture',
  '*',
  'Next-Gen Creative',
  '*',
];

const repeatedMarqueeItems = [
  ...marqueeItems,
  ...marqueeItems,
  ...marqueeItems,
  ...marqueeItems,
];

const Marquee: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!textRef.current || !containerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        textRef.current,
        { xPercent: 0 },
        {
          xPercent: -50,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1,
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full bg-[#ff4d00] text-black overflow-hidden py-4 md:py-6 border-y border-black relative z-20 rotate-1 md:-rotate-1 scale-105 origin-center transform"
    >
      <div
        ref={textRef}
        className="flex whitespace-nowrap will-change-transform font-black text-4xl md:text-6xl uppercase tracking-tighter"
      >
        {repeatedMarqueeItems.map((item, index) => (
          <span key={`marquee-${index}-${item}`} className="mx-8">
            {item}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Marquee;
