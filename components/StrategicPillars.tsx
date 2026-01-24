import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Share2, Monitor, Camera, ArrowUpRight, Zap } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const pillars = [
  {
    id: "smm",
    label: "Social Media",
    title: "Grow",
    icon: Share2,
    description: "We handle your social media so you don't have to. We create plans to help you reach more people and turn followers into customers.",
    stats: ["Higher Engagement", "Content Strategy", "Community Support"],
    img: "https://images.pexels.com/photos/1616403/pexels-photo-1616403.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1", 
    fallbackGradient: "from-orange-900 to-black",
    accent: "text-[#ff4d00]"
  },
  {
    id: "web",
    label: "Web Design",
    title: "Build",
    icon: Monitor,
    description: "Your website is your digital storefront. We build fast, professional sites and online stores that look great and work perfectly on all devices.",
    stats: ["Fast Loading", "Modern Design", "Online Stores"],
    img: "https://images.pexels.com/photos/1148820/pexels-photo-1148820.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1", 
    fallbackGradient: "from-blue-900 to-black",
    accent: "text-white"
  },
  {
    id: "content",
    label: "Content Creation",
    title: "Create",
    icon: Camera,
    description: "Good visuals sell. We produce high-quality videos, photos, and graphics that tell your story and make your brand stand out.",
    stats: ["Video Production", "Photography", "Graphic Design"],
    img: "https://images.pexels.com/photos/2543262/pexels-photo-2543262.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1", 
    fallbackGradient: "from-purple-900 to-black",
    accent: "text-[#ff4d00]"
  }
];

type StrategicPillarsProps = {
  onNavigate?: (view: string) => void;
};

const StrategicPillars: React.FC<StrategicPillarsProps> = ({ onNavigate }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  // Default to first item active on mount for better UX
  const [activeId, setActiveId] = useState<string | null>("smm"); 
  const isMobileRef = useRef(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    isMobileRef.current = window.innerWidth < 768;
    setIsMobile(isMobileRef.current);
    
    if (window.innerWidth < 768) {
        setActiveId(null);
    }
  }, []);

  const handleMouseEnter = (id: string) => {
    if (!isMobileRef.current) {
        setActiveId(id);
    }
  };

  const handleMouseLeave = () => {
    
  };

  const handleMobileClick = (_id: string) => {
  };

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
        // Clear any existing styles first to prevent conflicts
        gsap.set(".pillar-card", { clearProps: "all" });

        // Robust Entrance Animation
        gsap.fromTo(".pillar-card", 
            { 
                y: 100, 
                opacity: 0 
            },
            {
                y: 0,
                opacity: 1,
                duration: 1,
                stagger: 0.2,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 85%", // Trigger earlier
                    end: "bottom 20%",
                    toggleActions: "play none none reverse"
                }
            }
        );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="bg-[#0a0a0a] text-[#E8E8E8] w-full py-16 md:py-20 px-4 md:px-12 relative border-t border-[#222] min-h-screen">
      
      {/* Header */}
      <div className="container mx-auto mb-8 md:mb-12 flex flex-col md:flex-row justify-between items-start md:items-end z-10 relative text-left">
        <div>
            <div className="flex items-center gap-2 text-[#ff4d00] font-mono text-sm tracking-widest uppercase mb-4">
                <span className="w-2 h-2 bg-[#ff4d00] rounded-full animate-pulse"></span>
                Our Services
            </div>
            <h2 className="text-3xl md:text-5xl font-black uppercase leading-[0.95] tracking-tight">
                Simple & <br/> <span className="text-transparent stroke-white" style={{ WebkitTextStroke: '1px white' }}>Effective</span>
            </h2>
        </div>
        <div className="mt-6 md:mt-0 max-w-sm text-gray-400 text-sm md:text-base leading-relaxed">
            Everything you need to grow your business online, all in one place.
        </div>
      </div>

      <div className="w-full flex flex-col md:flex-row gap-4 md:gap-2 h-auto md:h-[75vh]">
        {pillars.map((pillar) => {
            const isActive = isMobile ? true : activeId === pillar.id;

            return (
                <div 
                    key={pillar.id}
                    className="pillar-card relative group overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] cursor-pointer border border-[#222] hover:border-[#ff4d00] bg-[#111] md:aspect-square"
                    style={{
                    
                        flex: typeof window !== 'undefined' && window.innerWidth >= 768 
                            ? (isActive ? 2 : 1) 
                            : 'none',
                        height: isMobile
                            ? '600px' // Keep expanded on mobile
                            : 'auto'
                    }}
                    onMouseEnter={() => handleMouseEnter(pillar.id)}
                    onMouseLeave={handleMouseLeave}
                    onClick={() => handleMobileClick(pillar.id)}
                >
                    <div className={`absolute inset-0 z-0 bg-gradient-to-br ${pillar.fallbackGradient}`}>
                        <img 
                            src={pillar.img} 
                            alt={pillar.title} 
                            className={`w-full h-full object-cover transition-transform duration-1000 opacity-60 mix-blend-overlay ${isActive ? 'scale-110' : 'scale-100 grayscale'}`}
                        />
                        <div className={`absolute inset-0 bg-black/80 transition-opacity duration-500 ${isActive ? 'opacity-30' : 'opacity-70'}`}></div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
                    </div>

                    {/* Content Wrapper */}
                    <div className="relative z-10 w-full h-full p-6 md:p-12 flex flex-col justify-between">
                        
                        <div className="flex justify-between items-start">
                            <div className={`p-3 rounded-full bg-black/50 backdrop-blur-md border border-white/10 ${pillar.accent}`}>
                                <pillar.icon className="w-6 h-6 md:w-8 md:h-8" />
                            </div>
                            <ArrowUpRight className={`w-6 h-6 md:w-10 md:h-10 text-white transition-all duration-300 ${isActive ? 'rotate-45 opacity-100' : 'opacity-50'}`} />
                        </div>

                        <div className="mt-auto">
                            <span className="inline-block font-mono text-[#ff4d00] text-[10px] md:text-xs uppercase tracking-widest mb-3 border border-[#ff4d00]/30 px-2 py-1 bg-black/50 rounded backdrop-blur-sm">
                                {pillar.label}
                            </span>
                            
                            <h3 className="text-3xl md:text-4xl font-black uppercase mb-4 leading-[0.95] text-white drop-shadow-xl">
                                {pillar.title}
                            </h3>

                            <div className={`overflow-hidden md:overflow-y-auto md:pr-2 transition-all duration-500 ${isActive ? 'max-h-[1200px] opacity-100 translate-y-0' : 'max-h-0 opacity-0 translate-y-4'}`}>
                                <p className="text-sm md:text-lg text-gray-200 mb-6 md:mb-8 leading-relaxed max-w-lg drop-shadow-md">
                                    {pillar.description}
                                </p>
                                
                                <div className="space-y-3 mb-6">
                                    {pillar.stats.map((stat, i) => (
                                        <div key={i} className="flex items-center gap-3">
                                            <Zap className="w-4 h-4 text-[#ff4d00]" />
                                            <span className="font-mono text-xs md:text-sm uppercase tracking-wide text-white">{stat}</span>
                                        </div>
                                    ))}
                                </div>
                                
                                <button
                                    type="button"
                                    onClick={() => onNavigate?.('services')}
                                    className="px-5 py-2 md:px-6 md:py-3 bg-[#ff4d00] text-black text-sm md:text-base font-bold uppercase tracking-widest hover:bg-white transition-colors"
                                >
                                    Learn More
                                </button>
                            </div>
                            
                            {/* Collapsed Hint: Visible if NOT Active */}
                            <div className={`absolute bottom-8 md:bottom-12 transition-all duration-300 ${isActive ? 'opacity-0 translate-y-4 pointer-events-none' : 'opacity-100 translate-y-0'}`}>
                                <span className="font-mono text-[10px] md:text-xs text-gray-400 uppercase tracking-widest">
                                    [ View Details ]
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Vertical Divider Line (Visual Aid for Desktop) */}
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[1px] h-[80%] bg-white/10 hidden md:block"></div>
                </div>
            );
        })}
      </div>
      
    </section>
  );
};

export default StrategicPillars;
