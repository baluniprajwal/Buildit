import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

// Replaced brands with service/value keywords as requested
const logosTop = ["STRATEGY", "DESIGN", "SOCIAL", "CONTENT", "WEB", "BRANDING", "MEDIA"];
const logosBottom = ["GROWTH", "SCALE", "IMPACT", "SPEED", "CULTURE", "VISION", "FUTURE"];

const ClientLogos: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const row1Ref = useRef<HTMLDivElement>(null);
  const row2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !row1Ref.current || !row2Ref.current) return;

    const ctx = gsap.context(() => {
        // Row 1 - Left
        const content1 = row1Ref.current?.innerHTML || "";
        if (row1Ref.current) row1Ref.current.innerHTML = content1 + content1 + content1 + content1;

        gsap.to(row1Ref.current, {
            xPercent: -25,
            ease: "none",
            duration: 25,
            repeat: -1
        });

        // Row 2 - Right
        const content2 = row2Ref.current?.innerHTML || "";
        if (row2Ref.current) row2Ref.current.innerHTML = content2 + content2 + content2 + content2;

        gsap.fromTo(row2Ref.current, { xPercent: -25 }, {
            xPercent: 0,
            ease: "none",
            duration: 25,
            repeat: -1
        });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="w-full bg-[#E8E8E8] py-16 md:py-24 overflow-hidden relative z-10 border-b border-black">
        <div className="container mx-auto px-6 mb-12 text-center">
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-black/60 mb-2">Agency DNA</p>
        </div>

        {/* Row 1 */}
        <div className="w-full flex overflow-hidden mb-4 md:mb-8 opacity-40 hover:opacity-100 transition-opacity duration-500">
            <div ref={row1Ref} className="flex whitespace-nowrap will-change-transform">
                {logosTop.map((logo, i) => (
                    <div key={i} className="mx-8 md:mx-16 flex items-center">
                        <span className="text-4xl md:text-6xl font-black text-black uppercase tracking-tighter">{logo}</span>
                    </div>
                ))}
            </div>
        </div>

        {/* Row 2 */}
        <div className="w-full flex overflow-hidden opacity-40 hover:opacity-100 transition-opacity duration-500">
            <div ref={row2Ref} className="flex whitespace-nowrap will-change-transform">
                {logosBottom.map((logo, i) => (
                    <div key={i} className="mx-8 md:mx-16 flex items-center">
                        <span className="text-4xl md:text-6xl font-black text-transparent stroke-black uppercase tracking-tighter" style={{ WebkitTextStroke: '1px black' }}>{logo}</span>
                    </div>
                ))}
            </div>
        </div>
        
        {/* Vignette Gradients */}
        <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#E8E8E8] to-transparent pointer-events-none"></div>
        <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#E8E8E8] to-transparent pointer-events-none"></div>
    </section>
  );
};

export default ClientLogos;