import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const works = [
  { id: 1, name: "Neon Flux", category: "Social Campaign", img: "https://picsum.photos/800/600?random=1" },
  { id: 2, name: "Cyber Realty", category: "Web Platform", img: "https://picsum.photos/800/600?random=2" },
  { id: 3, name: "Apex Fashion", category: "Content Production", img: "https://picsum.photos/800/600?random=3" },
  { id: 4, name: "Vanguard Tech", category: "Rebranding", img: "https://picsum.photos/800/600?random=4" },
  { id: 5, name: "Echo Audio", category: "App Design", img: "https://picsum.photos/800/600?random=5" },
];

const WorkScroll: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx: gsap.Context;


    const timer = setTimeout(() => {
        if (!triggerRef.current || !sectionRef.current) return;

        ctx = gsap.context(() => {

          ScrollTrigger.defaults({ preventOverlaps: true });


          gsap.fromTo(
            sectionRef.current,
            { xPercent: 0 },
            {
              xPercent: -80,
              ease: "none",
              scrollTrigger: {
                trigger: triggerRef.current,
                start: "top top",
                end: "+=3000",
                scrub: 1,
                pin: true,
                pinSpacing: true,
                anticipatePin: 1,
                invalidateOnRefresh: true,
                onUpdate: (self) => {
                    if (sectionRef.current) {

                        const skew = self.getVelocity() / 300;
                        gsap.to(sectionRef.current, {
                            skewX: skew,
                            duration: 0.1,
                            overwrite: 'auto',
                            ease: "power3.out"
                        });
                    }
                }
              },
            }
          );
        }, triggerRef);
    }, 100);

    return () => {
        clearTimeout(timer);
        if (ctx) ctx.revert();
    };
  }, []);

  return (
    <div
      ref={triggerRef}
      className="bg-[#E8E8E8] text-black overflow-hidden relative"
    >
      <div className="absolute top-0 left-0 w-full pt-24 px-6 md:px-12 z-10 pointer-events-none mix-blend-difference">
        <h2 className="text-5xl md:text-8xl font-black uppercase tracking-tighter text-[#E8E8E8]">
          Selected <span className="text-[#ff4d00]">Works</span>
        </h2>
      </div>

      {}
      <div
        ref={sectionRef}
        className="h-screen flex will-change-transform"
        style={{ width: "500vw", maxWidth: "500vw" }}
      >
        {works.map((work) => (
          <div key={work.id} className="w-screen h-full flex items-center justify-center p-8 md:p-16 relative border-r border-gray-300/50">
             <div className="relative w-full md:w-[80%] h-[60vh] md:h-[70vh] group overflow-hidden bg-gray-200 shadow-2xl">
                <div className="w-full h-full overflow-hidden">
                    <img
                        src={work.img}
                        alt={work.name}
                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 grayscale group-hover:grayscale-0"
                    />
                </div>

                {}
                <div className="absolute bottom-0 left-0 p-8 md:p-12 w-full translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out bg-[#000000]">
                    <span className="text-[#ff4d00] font-mono text-sm uppercase tracking-widest mb-2 block">{work.category}</span>
                    <div className="flex justify-between items-center">
                        <h3 className="text-3xl md:text-5xl font-bold text-white uppercase">{work.name}</h3>
                        <div className="text-white text-sm font-mono border border-white/30 px-4 py-2 rounded-full uppercase">View Case</div>
                    </div>
                </div>
             </div>

             {}
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[15vw] font-black text-black/5 pointer-events-none whitespace-nowrap z-[-1]">
                {work.name}
             </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WorkScroll;