import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, ArrowDown, FolderOpen } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const categories = [
  {
    id: "smm",
    title: "Social Media",
    description: "Architecting viral moments and community cults.",
    projects: [
      { id: 1, client: "VELOCITY HYPE", service: "Viral Campaign", year: "2024", img: "https://picsum.photos/1600/900?random=10" },
      { id: 2, client: "ECHO CHAMBER", service: "Community Growth", year: "2024", img: "https://picsum.photos/1600/900?random=11" },
      { id: 3, client: "PULSE NETWORK", service: "Influencer Ops", year: "2023", img: "https://picsum.photos/1600/900?random=12" },
    ]
  },
  {
    id: "web",
    title: "Web Tech",
    description: "Immersive digital environments built for performance.",
    projects: [
      { id: 4, client: "CYBER DOCKS", service: "WebGL Experience", year: "2024", img: "https://picsum.photos/1600/900?random=13" },
      { id: 5, client: "NEXUS TRADE", service: "Fintech Dashboard", year: "2023", img: "https://picsum.photos/1600/900?random=14" },
      { id: 6, client: "VOID MARKET", service: "Headless Commerce", year: "2022", img: "https://picsum.photos/1600/900?random=15" },
    ]
  },
  {
    id: "content",
    title: "Content Creation",
    description: "High-fidelity visuals that stop the scroll.",
    projects: [
      { id: 7, client: "LUMEN OPTICS", service: "Brand Film", year: "2024", img: "https://picsum.photos/1600/900?random=16" },
      { id: 8, client: "SONIC WAVE", service: "3D Motion", year: "2023", img: "https://picsum.photos/1600/900?random=17" },
      { id: 9, client: "URBAN DRIFT", service: "Photography", year: "2022", img: "https://picsum.photos/1600/900?random=18" },
    ]
  }
];

const WorkPage: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    
    // Slight delay to ensure DOM is ready for ScrollTrigger
    const timer = setTimeout(() => {
        const ctx = gsap.context(() => {
            
            // Header Entrance
            gsap.from(".page-header-text", {
                y: 150,
                opacity: 0,
                duration: 1.5,
                ease: "power4.out",
                stagger: 0.1
            });

            // ---------------------------------------------------------
            // STICKY SECTION LOGIC
            // ---------------------------------------------------------
            const sections = document.querySelectorAll('.category-section');
            
            sections.forEach((section) => {
                const q = gsap.utils.selector(section);
                
                // Pin the Category Title on the left while projects scroll
                ScrollTrigger.create({
                    trigger: section,
                    start: "top top",
                    end: "bottom bottom",
                    pin: q(".category-header"),
                    pinSpacing: false, // Allows content to flow next to it naturally if using flex
                    scrub: true
                });

                // -----------------------------------------------------
                // IMAGE PARALLAX & REVEAL
                // -----------------------------------------------------
                const projects = q(".project-card");
                
                projects.forEach((card) => {
                    const img = card.querySelector("img");
                    
                    // Reveal animation (Scale up + Fade In)
                    gsap.fromTo(card, 
                        { clipPath: "inset(100% 0% 0% 0%)" },
                        { 
                            clipPath: "inset(0% 0% 0% 0%)",
                            duration: 1.2,
                            ease: "power4.out",
                            scrollTrigger: {
                                trigger: card,
                                start: "top 85%", // Start animation when top of card hits 85% of viewport
                            }
                        }
                    );

                    // Parallax effect for the image inside the container
                    if (img) {
                        gsap.fromTo(img,
                            { scale: 1.2, yPercent: -10 },
                            {
                                scale: 1,
                                yPercent: 10,
                                ease: "none",
                                scrollTrigger: {
                                    trigger: card,
                                    start: "top bottom",
                                    end: "bottom top",
                                    scrub: true
                                }
                            }
                        );
                    }
                });
            });

        }, containerRef);
        
        ScrollTrigger.refresh();
        return () => ctx.revert();
    }, 200);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div ref={containerRef} className="bg-[#0a0a0a] text-[#E8E8E8] min-h-screen relative w-full pt-32 pb-24">
        
        {/* Main Page Header */}
        <div className="container mx-auto px-6 md:px-12 mb-32">
            <div className="overflow-hidden">
                <h1 className="page-header-text text-[10vw] md:text-[12vw] font-black leading-[0.85] tracking-tighter uppercase text-[#ff4d00]">
                    Select
                </h1>
            </div>
            <div className="overflow-hidden">
                <h1 className="page-header-text text-[10vw] md:text-[12vw] font-black leading-[0.85] tracking-tighter uppercase text-[#E8E8E8]">
                    Works
                </h1>
            </div>
            <div className="mt-8 flex justify-between items-end overflow-hidden">
                <p className="page-header-text text-xl md:text-2xl text-gray-400 max-w-lg leading-relaxed">
                    A curated archive of digital dominance. From viral campaigns to immersive platforms.
                </p>
                <ArrowDown className="page-header-text animate-bounce w-8 h-8 text-[#ff4d00] hidden md:block" />
            </div>
        </div>

        {/* Categories Sections */}
        <div className="flex flex-col gap-32">
            {categories.map((cat, index) => (
                <section key={cat.id} className="category-section relative w-full min-h-screen">
                    <div className="container mx-auto px-6 md:px-12 flex flex-col md:flex-row items-start gap-12 md:gap-24">
                        
                        {/* Sticky Header (Left Column on Desktop) */}
                        <div className="category-header w-full md:w-1/3 flex flex-col justify-start md:h-screen pt-0 md:pt-12 z-10 sticky top-0">
                             <div className="mb-8">
                                <span className="text-[#ff4d00] font-mono text-sm tracking-widest uppercase mb-2 block">0{index + 1} / Category</span>
                                <h2 className={`font-black uppercase tracking-tighter leading-none mb-6 break-words ${cat.id === 'content' ? 'text-4xl md:text-5xl lg:text-6xl' : 'text-5xl md:text-6xl lg:text-7xl'}`}>
                                    {cat.title}
                                </h2>
                                <p className="text-gray-400 text-lg border-l border-[#ff4d00] pl-6 max-w-xs">
                                    {cat.description}
                                </p>
                                
                                {/* Category Portfolio Button */}
                                <div className="mt-8 pl-6">
                                    <button className="group relative px-6 py-3 border border-[#333] hover:border-[#ff4d00] transition-colors overflow-hidden">
                                        <span className="relative z-10 text-xs font-mono uppercase tracking-widest text-[#E8E8E8] group-hover:text-black transition-colors flex items-center gap-2">
                                            <FolderOpen className="w-4 h-4" />
                                            View {cat.title}
                                        </span>
                                        <div className="absolute inset-0 bg-[#ff4d00] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out"></div>
                                    </button>
                                </div>
                             </div>
                             
                             {/* Decorative vertical line */}
                             <div className="hidden md:block w-[1px] h-[200px] bg-gradient-to-b from-[#ff4d00] to-transparent mt-12"></div>
                        </div>

                        {/* Projects Grid (Right Column) */}
                        <div className="w-full md:w-2/3 flex flex-col gap-24 md:pt-12 pb-24">
                            {cat.projects.map((project) => (
                                <div key={project.id} className="project-card group cursor-pointer relative">
                                    {/* Image Container */}
                                    <div className="w-full aspect-[4/3] md:aspect-[16/9] overflow-hidden bg-[#1a1a1a] relative mb-6">
                                        <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors z-10 duration-500"></div>
                                        <img 
                                            src={project.img} 
                                            alt={project.client} 
                                            className="w-full h-full object-cover will-change-transform"
                                        />
                                        
                                        {/* Floating Badge */}
                                        <div className="absolute top-6 right-6 z-20 bg-black/80 backdrop-blur-md px-4 py-2 border border-[#333]">
                                            <span className="text-xs font-mono text-[#ff4d00] uppercase tracking-wider">{project.year}</span>
                                        </div>
                                    </div>

                                    {/* Project Info */}
                                    <div className="flex justify-between items-end border-b border-[#333] pb-6 group-hover:border-[#ff4d00] transition-colors duration-500">
                                        <div>
                                            <h3 className="text-3xl md:text-5xl font-bold uppercase mb-2 group-hover:text-[#ff4d00] transition-colors duration-300">
                                                {project.client}
                                            </h3>
                                            <p className="text-gray-400 font-mono text-sm uppercase tracking-widest">
                                                {project.service}
                                            </p>
                                        </div>
                                        <div className="w-12 h-12 rounded-full border border-[#333] flex items-center justify-center group-hover:bg-[#ff4d00] group-hover:border-[#ff4d00] group-hover:text-black transition-all duration-300 transform group-hover:scale-110">
                                            <ArrowUpRight className="w-6 h-6 transform group-hover:rotate-45 transition-transform" />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            ))}
        </div>

        <div className="container mx-auto px-6 md:px-12 mt-24 pb-24 text-center">
            <p className="text-gray-500 mb-8 font-mono text-sm">END OF SELECTED WORKS</p>
            <button className="group relative inline-flex items-center gap-4 px-12 py-6 bg-[#1a1a1a] hover:bg-[#ff4d00] transition-colors duration-500 rounded-full overflow-hidden border border-[#333] hover:border-[#ff4d00]">
                <span className="relative z-10 text-xl md:text-2xl font-black uppercase text-[#E8E8E8] group-hover:text-black transition-colors">
                    Access Full Portfolio
                </span>
                <ArrowUpRight className="relative z-10 w-6 h-6 text-[#ff4d00] group-hover:text-black transition-colors" />
                <div className="absolute inset-0 bg-[#ff4d00] transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out"></div>
            </button>
        </div>
    </div>
  );
};

export default WorkPage;