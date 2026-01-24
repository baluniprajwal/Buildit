import React, { useEffect, useRef } from 'react';
import type { View } from '../App';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Monitor, Share2, Camera, ArrowUpRight, ArrowDown } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface ServicesPageProps {
  onNavigate: (view: View) => void;
}

const serviceSections = [
  {
    id: "smm",
    title: "Social Strategy",
    subtitle: "Growth & Distribution",
    icon: Share2,
    description: "We build social ecosystems, not just feeds. By tracking platform trends, decoding algorithms, and understanding audience psychology, we plan, create, edit, and publish content with intent—backed by continuous analytics and optimization. From ideation and posting to performance tracking and iteration, every move is designed to turn casual scrollers into loyal, engaged brand communities.",
    theme: "bg-[#0a0a0a] text-[#E8E8E8]",
    accent: "text-[#ff4d00]",
    border: "border-[#333]",
    tags: ["Audience Growth", "Community Management", "Trend Forecasting"]
  },
  {
    id: "web",
    title: "Web Development",
    subtitle: "Web & Interactive",
    icon: Monitor,
    description: "We engineer digital foundations that perform under pressure. By combining thoughtful UX, modern frameworks, and performance-driven architecture, we design, build, and optimize websites and e-commerce platforms from the ground up. From clean code and responsive design to speed optimization, scalability, and continuous improvement, every element is crafted to deliver seamless experiences and measurable business growth.",
    theme: "bg-[#E8E8E8] text-[#0a0a0a]",
    accent: "text-[#ff4d00]",
    border: "border-[#ccc]",
    tags: ["React / Next.js", "WebGL / Three.js", "Headless CMS"]
  },
  {
    id: "content",
    title: "Content Production",
    subtitle: "Production & Motion",
    icon: Camera,
    description: "We create content with purpose, not noise. By blending storytelling, visual craft, and platform-aware execution, we ideate, produce, and refine content that captures attention and holds it. From concept development and scripting to shooting, editing, and optimization, every asset is designed to resonate emotionally, align with brand identity, and perform across platforms—turning moments into memorable brand narratives.",
    theme: "bg-[#1a1a1a] text-[#E8E8E8]",
    accent: "text-[#ff4d00]",
    border: "border-[#333]",
    tags: ["4K Production", "Motion Systems", "Brand Identity"]
  },

];

const ServicesPage: React.FC<ServicesPageProps> = ({ onNavigate }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx: gsap.Context;

    const timer = setTimeout(() => {
        if (!containerRef.current) return;

        ctx = gsap.context((self) => {
            if (!self.selector) return;

            const mm = gsap.matchMedia();


            const tl = gsap.timeline();


            tl.from(self.selector('.hero-word'), {
                yPercent: 120,
                rotateX: -45,
                duration: 1.5,
                stagger: 0.1,
                ease: "power4.out",
                skewY: 5
            })

            .from(self.selector('.hero-decor'), {
                opacity: 0,
                x: 20,
                duration: 1,
                stagger: 0.1,
                ease: "power2.out"
            }, "-=1")

            .from(self.selector('.hero-desc'), {
                opacity: 0,
                y: 20,
                duration: 1,
                ease: "power2.out"
            }, "-=0.8");


            mm.add("(min-width: 768px)", () => {
                if (heroRef.current) {
                    const onMouseMove = (e: MouseEvent) => {
                         const { clientX, clientY } = e;

                         const x = (clientX / window.innerWidth - 0.5) * 2;
                         const y = (clientY / window.innerHeight - 0.5) * 2;

                         gsap.to('.hero-title-1', {
                             x: x * 20,
                             y: y * 10,
                             duration: 1,
                             ease: 'power2.out'
                         });
                         gsap.to('.hero-title-2', {
                             x: x * -30,
                             y: y * -20,
                             duration: 1,
                             ease: 'power2.out'
                         });
                         gsap.to('.hero-glow', {
                             x: x * 50,
                             y: y * 50,
                             duration: 2,
                             ease: 'power2.out'
                         });
                    };
                    window.addEventListener('mousemove', onMouseMove);
                    return () => window.removeEventListener('mousemove', onMouseMove);
                }
            });


            const cards = self.selector('.service-card');

            cards.forEach((card, i) => {
                const cardInner = card.querySelector('.card-inner');
                const cardContent = card.querySelector('.service-content');


                if (i !== cards.length - 1) {

                    gsap.to(cardInner, {
                        scale: 0.85,
                        yPercent: -10,
                        transformOrigin: "center top",
                        ease: "none",
                        force3D: true,
                        scrollTrigger: {
                            trigger: card,
                            start: "top top",
                            end: "bottom top",
                            scrub: 0.5,
                            invalidateOnRefresh: true
                        }
                    });

                    if (cardContent) {
                        gsap.to(cardContent, {
                            y: -50,
                            opacity: 0.6,
                            ease: "none",
                            force3D: true,
                            scrollTrigger: {
                                trigger: card,
                                start: "top top",
                                end: "bottom top",
                                scrub: 0.5
                            }
                        });
                    }
                }


                const titleText = card.querySelector('.title-text');
                if (titleText) {
                    gsap.fromTo(titleText,
                        { yPercent: 120, rotateX: -20 },
                        {
                            yPercent: 0,
                            rotateX: 0,
                            duration: 1.2,
                            ease: "power3.out",
                            scrollTrigger: {
                                trigger: card,
                                start: "top 80%",
                                toggleActions: "play none none reverse"
                            }
                        }
                    );
                }

                const details = card.querySelectorAll('.animate-detail');
                gsap.fromTo(details,
                    {
                        y: 30,
                        opacity: 0
                    },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 0.8,
                        stagger: 0.1,
                        ease: "power2.out",
                        scrollTrigger: {
                            trigger: card,
                            start: "top 70%",
                            toggleActions: "play none none reverse"
                        }
                    }
                );
            });

            ScrollTrigger.refresh();
        }, containerRef);
    }, 100);

    return () => {
        clearTimeout(timer);
        if (ctx) ctx.revert();
    };
  }, []);

  return (
    <div ref={containerRef} className="bg-[#050505] min-h-screen w-full relative pt-20 md:pt-24 pb-0">

      {}
      <div ref={heroRef} className="relative w-full min-h-[85vh] md:min-h-[90vh] flex flex-col justify-center px-6 md:px-12 mb-16 md:mb-32 z-10 overflow-hidden">

        {}
        <div className="hero-glow absolute top-0 right-0 w-[80vw] h-[80vw] bg-[radial-gradient(circle_at_center,rgba(255,77,0,0.12)_0%,transparent_60%)] blur-[80px] md:blur-[100px] pointer-events-none rounded-full translate-x-1/2 -translate-y-1/2" />

        {}
        <div className="absolute top-8 right-6 md:top-12 md:right-12 font-mono text-[10px] md:text-xs text-[#ff4d00] text-right space-y-2 md:space-y-3 z-20 mix-blend-screen opacity-80">
             <div className="hero-decor overflow-hidden">
                <div className="flex items-center gap-2 justify-end">
                    <span className="w-1.5 h-1.5 md:w-2 md:h-2 bg-[#ff4d00] rounded-full animate-pulse"></span>
                    <span>ONLINE</span>
                </div>
             </div>
             <div className="hero-decor overflow-hidden"><div>EST. 2024</div></div>
        </div>

        <div className="relative z-10 py-8 md:py-12 mt-12 md:mt-0 flex flex-col items-center md:block">
             {}
             {}
             <div className="overflow-hidden py-6 md:py-4 mb-[-4vw] md:mb-[-2vw] relative z-20 mix-blend-difference pointer-events-none w-full flex justify-center md:justify-start">
                <h1 className="hero-title-1 hero-word text-[9vw] md:text-[9vw] leading-[0.85] font-black uppercase text-transparent tracking-tighter text-center md:text-left"
                    style={{ WebkitTextStroke: '1px #666' }}>
                    DIGITAL
                </h1>
             </div>

             <div className="overflow-hidden py-6 md:py-4 pl-0 md:pl-[8vw] relative z-10 w-full flex justify-center md:justify-start">
                 <h1 className="hero-title-2 hero-word text-[9vw] md:text-[9vw] leading-[0.85] font-black uppercase text-[#E8E8E8] tracking-tighter text-center md:text-left">
                    EXPERTISE
                 </h1>
             </div>
        </div>

        <div className="hero-desc mt-8 md:mt-12 max-w-xl flex items-start gap-6 border-l border-[#333] pl-4 md:pl-8 ml-2 md:ml-0 md:ml-0 mx-auto md:mx-0">
             <p className="text-[#888] text-base md:text-xl font-normal leading-relaxed uppercase tracking-wide">
                We fuse <span className="text-[#ff4d00] font-bold">Strategy</span>, <span className="text-white font-bold">Code</span>, and <span className="text-[#ff4d00] font-bold">Content</span> to create impactful digital experiences.
             </p>
        </div>

        {}
        <div className="absolute bottom-8 left-6 md:bottom-12 md:left-12 flex items-center gap-4 opacity-40 hero-decor">
             <ArrowDown className="animate-bounce w-4 h-4 md:w-5 md:h-5 text-[#ff4d00]" />
             <span className="font-mono text-[10px] md:text-xs tracking-[0.2em] text-[#E8E8E8]">SCROLL TO EXPLORE</span>
        </div>
      </div>

      {}
      <div className="relative w-full px-0 md:px-4">
        {serviceSections.map((section, index) => {
          const Icon = section.icon;

          return (
            <div
              key={section.id}
              className="service-card sticky top-0 w-full h-screen flex flex-col justify-center overflow-hidden"
              style={{ zIndex: index + 1 }}
            >
              {}
              <div className={`card-inner w-full h-full relative ${section.theme} border-t ${section.border} shadow-[0_-10px_40px_rgba(0,0,0,0.5)] flex flex-col justify-center md:rounded-t-[3rem] overflow-hidden`}>

                  {}
                  <div className="absolute inset-0 opacity-[0.04] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

                  {}
                  {section.id === 'smm' && (
                    <div className="absolute top-0 right-0 w-[80vw] h-[80vw] bg-white opacity-[0.03] blur-[120px] rounded-full translate-x-1/2 -translate-y-1/2 pointer-events-none" />
                  )}
                  {section.id === 'content' && (
                    <div className="absolute bottom-0 left-0 w-[60vw] h-[60vw] bg-black opacity-[0.1] blur-[100px] rounded-full -translate-x-1/2 translate-y-1/2 pointer-events-none" />
                  )}

                  <div className="service-content container mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-12 gap-y-6 md:gap-16 items-center h-full max-h-[90vh] py-8 md:py-12 relative z-10">

                    {}
                    <div className="md:col-span-5 flex flex-col justify-end md:justify-between h-auto md:h-[60vh]">
                        <div className="animate-detail">
                            <div className={`flex items-center gap-3 mb-4 md:mb-6 ${section.accent} font-mono text-xs md:text-sm tracking-widest uppercase`}>
                                <span>0{index + 1}</span>
                                <span className="h-[1px] w-8 md:w-12 bg-current opacity-50"></span>
                                <span>{section.subtitle}</span>
                            </div>

                            {}
                            <div className="overflow-hidden py-1">
                                <h2 className="title-text text-[3.8vw] md:text-3xl lg:text-4xl font-black uppercase leading-[0.95] tracking-tight mb-2 origin-bottom-left">
                                    {section.title.split(' ').map((word, i, arr) => (
                                        <React.Fragment key={`${section.id}-word-${i}`}>
                                            <span className="block md:inline">{word}</span>
                                            {i < arr.length - 1 && <span className="hidden md:inline"> </span>}
                                        </React.Fragment>
                                    ))}
                                </h2>
                            </div>
                        </div>

                        {}
                        <div className="hidden md:flex items-end overflow-hidden">
                             <Icon className={`service-icon w-32 h-32 ${section.accent} opacity-0`} strokeWidth={0.5} />
                        </div>
                    </div>

                    {}
                    <div className="md:col-span-7 flex flex-col justify-start md:justify-center border-l-0 md:border-l border-current/10 pl-0 md:pl-16 h-auto md:h-[60vh] pb-8 md:pb-0">
                        <div className="animate-detail mb-6 md:mb-10">
                             <p className="text-sm md:text-lg lg:text-2xl font-normal leading-relaxed opacity-90 max-w-2xl">
                                {section.description}
                            </p>
                        </div>

                         <div className="animate-detail flex flex-wrap gap-2 md:gap-3 mb-8 md:mb-12">
                            {section.tags.map((tag, i) => (
                                <span 
                                  key={i} 
                                  className={`
                                    px-3 py-1.5 md:px-4 md:py-2 border rounded-full text-[10px] md:text-sm font-medium uppercase tracking-wide transition-all duration-300 cursor-default
                                    ${section.id === 'content' 
                                      ? 'border-black/20 bg-black/5 text-white hover:bg-black hover:text-white' 
                                      : 'border-white/20 bg-white/5 text-current hover:bg-white hover:text-black'}
                                  `}
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>

                        <div className="animate-detail">
                            <button
                              onClick={() => {
                                onNavigate('contact');
                                window.scrollTo({ top: 0, behavior: 'instant' });
                              }}
                              className={`group w-max flex items-center gap-4 text-sm md:text-base font-bold uppercase tracking-widest hover:opacity-70 transition-opacity ${section.accent}`}
                            >
                                <span className="relative">
                                    Contact Us
                                    <span className="absolute left-0 -bottom-1 w-full h-[2px] bg-current scale-x-100 group-hover:scale-x-0 transition-transform origin-right duration-300"></span>
                                    <span className="absolute left-0 -bottom-1 w-full h-[2px] bg-current scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300 delay-75"></span>
                                </span>
                                <ArrowUpRight className="w-4 h-4 md:w-5 md:h-5 transform group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" />
                            </button>
                        </div>
                    </div>

                  </div>

                  {}
                   {index !== serviceSections.length - 1 && (
                      <div className="absolute bottom-4 md:bottom-8 left-1/2 -translate-x-1/2 animate-bounce opacity-30 pointer-events-none">
                        <ArrowDown className="w-5 h-5 md:w-6 md:h-6" />
                      </div>
                   )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ServicesPage;
