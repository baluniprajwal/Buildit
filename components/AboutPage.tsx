import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowDownRight, Globe, Users, Zap, Target, Layers, Cpu, Hash, Terminal, Award, ChevronRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const team = [
  { id: 1, name: "ALEX MERCER", role: "FOUNDER / STRATEGY", img: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" },
  { id: 2, name: "SARAH JENKINS", role: "HEAD OF CREATIVE", img: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" },
  { id: 3, name: "DAVIDE ROSSI", role: "TECH LEAD", img: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" },
  { id: 4, name: "YUKI TANAKA", role: "ART DIRECTOR", img: "https://images.pexels.com/photos/1704488/pexels-photo-1704488.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" },
  { id: 5, name: "MARCUS COLE", role: "OPS DIRECTOR", img: "https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" },
];

const timeline = [
  {
    year: "Nov 2025",
    title: "Foundation",
    desc: "Founded with a clear intent to merge engineering, culture, and growth. BuildIt launched as a focused digital studio, assembling a small but execution-driven team obsessed with performance and originality."
  },
  {
    year: "Dec 2025",
    title: "Early Traction",
    desc: "Secured our first 5 active clients within weeks of launch. Delivered end-to-end solutions across web development, social media management, and content creation—establishing trust through results, not promises."
  },
  {
    year: "2026",
    title: "Expansion Phase",
    desc: "Expanded service depth across e-commerce, social growth systems, and high-impact content production. Introduced performance analytics, scalable workflows, and modular design systems to support faster brand growth."
  }
];


const protocols = [
    {
        id: "01",
        title: "Cultural Intelligence",
        desc: "We don’t observe culture from the outside we live in it. By deeply understanding subcultures, audience psychology, and platform behavior, we create strategies that feel timely, authentic, and impossible to ignore.",
    },
    {
        id: "02",
        title: "Strategic Content",
        desc: "Creativity without intent is noise. We design bold ideas backed by insight, data, and systems thinking executed with precision to outmaneuver the status quo and build brands that move people.",
    },
    {
        id: "03",
        title: "Performance-Driven Execution",
        desc: "Design must perform. From content and campaigns to websites and platforms, we build custom solutions engineered for scale, efficiency, and measurable impact constantly optimizing for growth and longevity.",
    }
];

const galleryImages = [
    "/aboutus/aboutUs2.jpeg",
    "/aboutus/aboutUs4.jpeg",
    "/aboutus/aboutUs5.jpeg",
    "/aboutus/aboutUs3.jpeg"
];

const AboutPage: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const manifestoRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {


        const tl = gsap.timeline();
        tl.from(".hero-char", {
            y: 100,
            opacity: 0,
            stagger: 0.05,
            duration: 1,
            ease: "power4.out",
            delay: 0.5
        })
        .from(".hero-sub", {
            opacity: 0,
            y: 20,
            duration: 0.8
        }, "-=0.5");


        if (manifestoRef.current) {
            const text = manifestoRef.current;
            const words = text.innerText.split(" ");
            text.innerHTML = words.map(word => `<span class="word opacity-20 transition-opacity duration-300">${word}</span>`).join(" ");

            gsap.to(".word", {
                opacity: 1,
                stagger: 0.1,
                scrollTrigger: {
                    trigger: text,
                    start: "top 80%",
                    end: "bottom 20%",
                    scrub: 1
                }
            });
        }


        gsap.from(".timeline-line", {
            scaleY: 0,
            transformOrigin: "top",
            ease: "none",
            scrollTrigger: {
                trigger: ".timeline-section",
                start: "top 70%",
                end: "bottom 70%",
                scrub: 1
            }
        });


        gsap.utils.toArray(".timeline-item").forEach((item: any) => {
            gsap.from(item, {
                opacity: 0,
                x: -50,
                duration: 0.8,
                scrollTrigger: {
                    trigger: item,
                    start: "top 85%"
                }
            });
        });


        gsap.utils.toArray(".gallery-img").forEach((img: any, i) => {
            gsap.to(img, {
                y: -50,
                ease: "none",
                scrollTrigger: {
                    trigger: img,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: true
                }
            });
        });


        gsap.from(".protocol-row", {
            y: 50,
            opacity: 0,
            stagger: 0.1,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
                trigger: ".protocols-section",
                start: "top 70%"
            }
        });


        const teamItems = document.querySelectorAll('.team-item');
        const imgReveal = document.querySelector('.team-img-reveal') as HTMLDivElement;
        const imgElement = imgReveal?.querySelector('img');

        teamItems.forEach(item => {
            item.addEventListener('mouseenter', () => {
                const imgUrl = item.getAttribute('data-img');
                if (imgElement && imgUrl) {
                    imgElement.src = imgUrl;
                    gsap.to(imgReveal, { scale: 1, opacity: 1, duration: 0.4, ease: "power2.out" });
                }
            });

            item.addEventListener('mousemove', (e: any) => {
                gsap.to(imgReveal, {
                    x: e.clientX,
                    y: e.clientY,
                    duration: 0.2,
                    ease: "power2.out"
                });
            });

            item.addEventListener('mouseleave', () => {
                gsap.to(imgReveal, { scale: 0.5, opacity: 0, duration: 0.4 });
            });
        });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="bg-[#050505] text-[#E8E8E8] min-h-screen w-full relative cursor-default overflow-hidden">

        {}
        <div className="relative w-full h-screen flex items-center justify-center overflow-hidden">
            {}
            <div className="absolute inset-0 z-0 opacity-40">
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-[#050505] z-10"></div>
                <div className="absolute inset-0 bg-black/40 z-10"></div>
                <video
                    autoPlay muted loop playsInline
                    className="w-full h-full object-cover"
                    src="https://videos.pexels.com/video-files/852421/852421-hd_1920_1080_25fps.mp4"
                />
            </div>

            {}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:3rem_3rem] pointer-events-none z-10"></div>

            <div className="relative z-20 text-center px-4">
                <div className="flex justify-center gap-2 mb-6 hero-sub">
                    <span className="px-3 py-1 border border-white/20 text-white/60 font-mono text-xs uppercase tracking-widest bg-black/50 backdrop-blur-md">
                        Est. 2019
                    </span>
                </div>
                <h1 className="text-[10vw] md:text-[12vw] font-black leading-[0.85] tracking-tighter uppercase mix-blend-screen">
                    <div className="overflow-hidden flex justify-center">
                        {"AGENCY".split("").map((char, i) => (
                            <span key={i} className="hero-char inline-block">{char}</span>
                        ))}
                    </div>
                    <div className="overflow-hidden flex justify-center text-transparent stroke-white" style={{ WebkitTextStroke: '2px white', color: 'transparent' }}>
                         {"VISION".split("").map((char, i) => (
                            <span key={`b-${i}`} className="hero-char inline-block">{char}</span>
                        ))}
                    </div>
                </h1>
            </div>
        </div>

        
        <section className="container mx-auto px-6 md:px-12 py-32 md:py-48 flex flex-col md:flex-row gap-12 md:gap-24 relative z-10">
            <div className="w-full md:w-1/4 pt-4">
                <div className="sticky top-32">
                    <Target className="w-8 h-8 text-[#ff4d00] mb-4" />
                    <span className="font-mono text-sm uppercase tracking-widest text-gray-500 block mb-2">// Our Mission</span>
                    <div className="h-[1px] w-12 bg-[#ff4d00]"></div>
                </div>
            </div>
            <div className="w-full md:w-3/4">
                <p ref={manifestoRef} className="text-3xl md:text-6xl font-bold uppercase leading-[1.2] tracking-tight text-[#E8E8E8]">
                    Original by design. Enduring by intent.
                    We craft brands and digital experiences that break patterns and build relevance.            
                </p>
            </div>
        </section>

        
        <section className="protocols-section w-full bg-[#0a0a0a] py-32 border-y border-[#222] relative z-10">
            <div className="container mx-auto px-6 md:px-12">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-24 text-left">
                    <div>
                        <h2 className="text-3xl md:text-6xl font-black uppercase leading-none mb-4">
                            Core <br/> <span className="text-[#ff4d00]">Values</span>
                        </h2>
                        <p className="font-mono text-gray-500 text-sm">/// OUR PHILOSOPHY</p>
                    </div>
                </div>

                <div className="flex flex-col">
                    {protocols.map((p, index) => (
                        <div key={index} className="protocol-row group border-t border-[#222] py-12 md:py-16 hover:bg-[#111] transition-colors duration-500 cursor-pointer relative overflow-hidden">
                            <div className="flex flex-col md:flex-row items-start md:items-center justify-between relative z-10">
                                <div className="flex items-baseline gap-8 md:gap-16">
                                    <span className="font-mono text-[#ff4d00] text-xl opacity-50 group-hover:opacity-100 transition-opacity">0{index + 1}</span>
                                    <h3 className="text-3xl md:text-6xl font-bold uppercase text-[#E8E8E8] group-hover:text-[#ff4d00] group-hover:translate-x-4 transition-all duration-500">
                                        {p.title}
                                    </h3>
                                </div>
                                <div className="mt-6 md:mt-0 pl-0 md:pl-0 max-w-lg flex items-start gap-4">
                                    <div className="hidden md:block w-[1px] h-12 bg-[#333] group-hover:bg-[#ff4d00] transition-colors"></div>
                                    <p className="text-gray-500 group-hover:text-gray-300 transition-colors leading-relaxed text-sm md:text-base">
                                        {p.desc}
                                    </p>
                                </div>
                                <div className="absolute right-0 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-x-10 group-hover:translate-x-[-20px] hidden md:block">
                                    <ChevronRight className="w-8 h-8 text-[#ff4d00]" />
                                </div>
                            </div>
                            {}
                            <div className="absolute inset-0 bg-gradient-to-r from-[#ff4d00]/5 to-transparent transform -translate-x-full group-hover:translate-x-0 transition-transform duration-700 ease-out"></div>
                        </div>
                    ))}
                    <div className="border-t border-[#222]"></div>
                </div>
            </div>
        </section>
        
        <section className="timeline-section container mx-auto px-6 md:px-12 py-32 md:py-48 flex flex-col md:flex-row gap-12">
            <div className="w-full md:w-1/3">
                 <h2 className="text-4xl md:text-6xl font-black uppercase sticky top-32">
                    Our <br/> <span className="text-[#ff4d00]">History</span>
                </h2>
            </div>
            <div className="w-full md:w-2/3 relative pl-8 md:pl-16">
                {}
                <div className="timeline-line absolute left-0 top-0 bottom-0 w-[1px] bg-[#333]"></div>

                <div className="space-y-24">
                    {timeline.map((item, i) => (
                        <div key={i} className="timeline-item relative">
                            {}
                            <div className="absolute -left-[41px] md:-left-[73px] top-2 w-4 h-4 bg-[#050505] border-2 border-[#ff4d00] rounded-full z-10"></div>

                            <span className="font-mono text-[#ff4d00] text-sm tracking-widest mb-2 block">{item.year}</span>
                            <h3 className="text-3xl font-bold uppercase mb-4">{item.title}</h3>
                            <p className="text-gray-400 text-lg leading-relaxed max-w-md border-l-2 border-[#222] pl-6">
                                {item.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>

        
        <section className="w-full py-24 bg-[#111] overflow-hidden">
            <div className="container mx-auto px-6 md:px-12 mb-12 flex justify-between items-end">
                <h2 className="text-3xl font-black uppercase">Our Culture</h2>
                <div className="flex gap-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                    <span className="font-mono text-xs uppercase text-gray-500">Behind the Scenes</span>
                </div>
            </div>

            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 px-4 h-[60vh] md:h-[80vh]">
                <div className="md:col-span-2 md:row-span-2 relative overflow-hidden group">
                    <img src={galleryImages[0]} alt="Office" className="gallery-img w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                    <div className="absolute bottom-4 left-4 bg-black/80 px-4 py-2 border border-white/10 backdrop-blur-md">
                        <span className="font-mono text-xs text-[#ff4d00]">WAR ROOM</span>
                    </div>
                </div>
                <div className="relative overflow-hidden group">
                    <img src={galleryImages[1]} alt="Meeting" className="gallery-img w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                </div>
                <div className="relative overflow-hidden group">
                     <img src={galleryImages[2]} alt="Code" className="gallery-img w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                </div>
                <div className="md:col-span-2 relative overflow-hidden group">
                     <img src={galleryImages[3]} alt="Studio" className="gallery-img w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                     <div className="absolute bottom-4 right-4 bg-black/80 px-4 py-2 border border-white/10 backdrop-blur-md">
                        <span className="font-mono text-xs text-[#ff4d00]">STUDIO A</span>
                    </div>
                </div>
            </div>
        </section>

        {/*
        <div className="container mx-auto px-6 md:px-12 py-32 relative">
            <div className="flex justify-between items-end mb-16 border-b border-[#333] pb-6">
                <h3 className="text-4xl md:text-6xl font-black uppercase">The Team</h3>
                <span className="font-mono text-[#ff4d00] text-xs">OUR EXPERTS</span>
            </div>

            <div className="space-y-0">
                {team.map((member) => (
                    <div
                        key={member.id}
                        data-img={member.img}
                        className="team-item group relative py-8 md:py-12 border-b border-[#222] flex items-center justify-between cursor-none hover:bg-white/5 transition-colors px-4"
                    >
                        <h4 className="text-3xl md:text-6xl font-bold uppercase text-gray-500 group-hover:text-white transition-colors group-hover:translate-x-4 duration-300">
                            {member.name}
                        </h4>
                        <div className="flex items-center gap-4">
                            <span className="font-mono text-xs md:text-sm uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity text-[#ff4d00]">
                                {member.role}
                            </span>
                            <ArrowDownRight className="w-6 h-6 text-[#ff4d00] opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                    </div>
                ))}
            </div>
            <div className="team-img-reveal fixed top-0 left-0 w-[250px] h-[350px] pointer-events-none z-50 opacity-0 scale-50 -translate-x-1/2 -translate-y-1/2 overflow-hidden border border-[#ff4d00] bg-black hidden md:block shadow-[0_0_30px_rgba(255,77,0,0.3)]">
                <img src="" alt="Team Member" className="w-full h-full object-cover grayscale" />
                <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.5)_50%)] bg-[size:100%_4px] opacity-20 pointer-events-none"></div>
                <div className="absolute bottom-2 left-2 font-mono text-[10px] text-[#ff4d00] bg-black px-1">TEAM</div>
            </div>
        </div>
            */}
    </div>
  );
};

export default AboutPage;
