import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const VideoManifesto: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {

        gsap.to(videoRef.current, {
            yPercent: 20,
            ease: "none",
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top bottom",
                end: "bottom top",
                scrub: true
            }
        });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="w-full h-screen relative overflow-hidden bg-black text-[#E8E8E8] flex flex-col justify-center items-center">

        <div className="absolute inset-0 opacity-40"></div>
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none"></div>
        <div className="relative z-10 text-center px-6">
            <div className="inline-flex items-center gap-2 border border-[#ff4d00] px-4 py-1 rounded-full mb-8 bg-black/50 backdrop-blur-sm">
                <div className="w-2 h-2 bg-[#ff4d00] animate-pulse rounded-full"></div>
                <span className="text-xs font-mono uppercase tracking-widest text-[#ff4d00]">Global Showreel 2024</span>
            </div>

            <h2 className="text-3xl md:text-9xl font-black uppercase tracking-tighter leading-[0.85] mix-blend-exclusion">
                We Don't <br/> Just Create. <br/> <span className="text-transparent stroke-white" style={{ WebkitTextStroke: '2px white' }}>We Buildit.</span>
            </h2>
        </div>
    </section>
  );
};

export default VideoManifesto;
