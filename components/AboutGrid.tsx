import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Globe, Users, Trophy, Zap, ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface AboutGridProps {
    onNavigate: (view: string) => void;
}

const AboutGrid: React.FC<AboutGridProps> = ({ onNavigate }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    
    const ctx = gsap.context(() => {
        // 1. Entrance Animation
        gsap.fromTo(".bento-item", 
            { 
                y: 60, 
                autoAlpha: 0, 
                scale: 0.95
            },
            {
                y: 0,
                autoAlpha: 1, 
                scale: 1,
                duration: 1,
                stagger: 0.15,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 80%", 
                    toggleActions: "play none none reverse" 
                }
            }
        );

        // 2. Title Parallax
        if (titleRef.current) {
            gsap.to(titleRef.current, {
                x: -50,
                ease: "none",
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 1
                }
            });
        }

        // 3. Image Item Parallax
        gsap.to(".bento-parallax-img", {
            yPercent: 15,
            ease: "none",
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top bottom",
                end: "bottom top",
                scrub: 1
            }
        });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="w-full bg-[#0a0a0a] py-32 px-6 md:px-12 relative z-30 overflow-hidden">
        <div className="container mx-auto">
            <div className="mb-16 relative flex flex-col md:flex-row justify-between items-end">
                <h2 ref={titleRef} className="text-4xl md:text-6xl font-black uppercase text-[#E8E8E8] leading-[0.9] will-change-transform">
                    The <span className="text-[#ff4d00]">Agency</span> <br/> Ecosystem
                </h2>
                <button 
                    onClick={() => onNavigate('about')}
                    className="group flex items-center gap-2 text-sm font-mono uppercase tracking-widest text-gray-500 hover:text-[#ff4d00] transition-colors mt-8 md:mt-0"
                >
                    Full Briefing
                    <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[minmax(250px,auto)]">
                
                {/* Large Text Block - Takes 2x2 */}
                <div className="bento-item md:col-span-2 md:row-span-2 bg-[#111] border border-[#222] p-8 md:p-12 flex flex-col justify-between group hover:border-[#ff4d00] transition-colors duration-500 min-h-[400px]">
                    <div>
                        <Zap className="w-12 h-12 text-[#ff4d00] mb-8" />
                        <h3 className="text-2xl md:text-4xl font-bold text-[#E8E8E8] uppercase leading-tight mb-6">
                            We don't chase trends. <br/> We engineer them.
                        </h3>
                        <p className="text-gray-400 leading-relaxed text-lg">
                            Buildit is a collective of strategists, developers, and creators obsessed with performance. We operate at the intersection of culture and code.
                        </p>
                    </div>
                    <div className="mt-8 flex gap-4 flex-wrap">
                        {['SMM', 'DEV', 'CGI'].map(tag => (
                            <span key={tag} className="px-4 py-2 border border-[#333] rounded-full text-xs font-mono uppercase text-gray-500 group-hover:text-[#E8E8E8] group-hover:border-[#ff4d00] transition-all">
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Stat 1 */}
                <div className="bento-item bg-[#E8E8E8] text-black p-8 flex flex-col justify-center items-center text-center group min-h-[250px]">
                    <h4 className="text-6xl md:text-7xl font-black tracking-tighter mb-2 group-hover:scale-110 transition-transform duration-300">
                        450+
                    </h4>
                    <span className="font-mono text-xs uppercase tracking-widest text-[#ff4d00]">Projects Shipped</span>
                </div>

                {/* Stat 2 */}
                <div className="bento-item bg-[#111] border border-[#222] p-8 flex flex-col justify-between group hover:bg-[#ff4d00] hover:text-black transition-colors duration-500 min-h-[250px]">
                    <Globe className="w-8 h-8 text-[#555] group-hover:text-black transition-colors" />
                    <div>
                        <h4 className="text-4xl font-bold mb-1">Global</h4>
                        <p className="text-xs font-mono opacity-60 uppercase">Clients across 12 countries</p>
                    </div>
                </div>

                {/* Stat 3 */}
                <div className="bento-item bg-[#111] border border-[#222] p-8 flex flex-col justify-between group hover:bg-[#ff4d00] hover:text-black transition-colors duration-500 min-h-[250px]">
                    <Trophy className="w-8 h-8 text-[#555] group-hover:text-black transition-colors" />
                    <div>
                        <h4 className="text-4xl font-bold mb-1">24</h4>
                        <p className="text-xs font-mono opacity-60 uppercase">Industry Awards</p>
                    </div>
                </div>

                {/* Image / Visual */}
                <div onClick={() => onNavigate('about')} className="bento-item bento-parallax-img bg-[#111] border border-[#222] relative overflow-hidden group min-h-[250px] will-change-transform cursor-pointer">
                     <img 
                        src="https://picsum.photos/600/600?random=99" 
                        alt="Office" 
                        className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700 grayscale group-hover:grayscale-0"
                     />
                     <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80"></div>
                     <div className="absolute bottom-6 left-6 z-10">
                        <span className="flex items-center gap-2 text-[#E8E8E8] font-bold uppercase group-hover:text-[#ff4d00] transition-colors">
                            <Users className="w-4 h-4" />
                            Meet The Team
                        </span>
                     </div>
                </div>

            </div>
        </div>
    </section>
  );
};

export default AboutGrid;