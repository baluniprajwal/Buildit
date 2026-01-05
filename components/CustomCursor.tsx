import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const CustomCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const moveCursor = (e: MouseEvent) => {
        if (!cursorRef.current || !followerRef.current) return;

        gsap.to(cursorRef.current, {
          x: e.clientX,
          y: e.clientY,
          duration: 0.1,
          ease: 'power2.out'
        });
        gsap.to(followerRef.current, {
          x: e.clientX,
          y: e.clientY,
          duration: 0.5,
          ease: 'power2.out'
        });
      };

      window.addEventListener('mousemove', moveCursor);


      const handleMouseEnter = () => {
          if (!followerRef.current) return;
          gsap.to(followerRef.current, { scale: 3, opacity: 0.3, duration: 0.3 });
      };
      const handleMouseLeave = () => {
          if (!followerRef.current) return;
          gsap.to(followerRef.current, { scale: 1, opacity: 1, duration: 0.3 });
      };

      document.querySelectorAll('a, button, input, select, .cursor-pointer').forEach(el => {
          el.addEventListener('mouseenter', handleMouseEnter);
          el.addEventListener('mouseleave', handleMouseLeave);
      });

      return () => window.removeEventListener('mousemove', moveCursor);

    });

    return () => ctx.revert();
  }, []);


  if (typeof window !== 'undefined' && window.matchMedia("(pointer: coarse)").matches) {
      return null;
  }

  return (
    <>
      <div ref={cursorRef} className="fixed top-0 left-0 w-3 h-3 bg-[#ff4d00] rounded-full pointer-events-none z-[100] -translate-x-1/2 -translate-y-1/2 mix-blend-difference hidden md:block"></div>
      <div ref={followerRef} className="fixed top-0 left-0 w-8 h-8 border border-[#ff4d00] rounded-full pointer-events-none z-[99] -translate-x-1/2 -translate-y-1/2 transition-opacity hidden md:block"></div>
    </>
  );
};

export default CustomCursor;