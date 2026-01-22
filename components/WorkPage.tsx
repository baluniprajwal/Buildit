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
      {
        id: 1,
        client: "SetuStore",
        service: "Social Media Management + Content Creation",
        img: "/work/setustore.jpeg",
        link: "https://www.instagram.com/setustore_/"
      },
      {
        id: 2,
        client: "Sabor Fashhion",
        service: "Social Media Management",
        img: "/work/saborFashion.jpeg",
        link: "https://www.instagram.com/saborfashhion/"
      },
      {
        id: 3,
        client: "Uruj Collection",
        service: "Social Media Management",
        img: "/work/uruj.jpeg",
        link: "https://www.instagram.com/urujcollection/"
      },
    ]
  },
  {
    id: "web",
    title: "Web Tech",
    description: "Immersive digital environments built for performance.",
    projects: [
      {
        id: 4,
        client: "Uphoria",
        service: "Event Website Design & Development",
        year: "2026",
        img: "/work/uphoriaWork.jpeg",
        link: "https://uphoria.co.in"
      },
      {
        id: 5,
        client: "Velour",
        service: "Fashion E-Commerce Website",
        img: "/work/velour.png",
        link: "https://velour-rho.vercel.app/"
      },
      {
        id: 6,
        client: "Thriftify India",
        service: "Ecommerce Store",
        img: "/work/thriftify.png",
        link: "https://thriftify-india.vercel.app/"
      },
      {
        id: 7,
        client: "Millionwires",
        service: "Portfolio Website Design & Development",
        img: "/work/millionwires.png",
        link: "https://millionwires.pages.dev/"
      },
    ]
  },
  {
    id: "content",
    title: "Content Creation",
    description: "High-fidelity visuals that stop the scroll.",
    projects: [
      {
        id: 7,
        client: "LUMEN OPTICS",
        service: "Brand Film",
        img: "https://picsum.photos/1600/900?random=16",
        link: "https://vimeo.com"
      },
      {
        id: 8,
        client: "SONIC WAVE",
        service: "3D Motion",
        img: "https://picsum.photos/1600/900?random=17",
        link: "https://behance.net"
      },
      {
        id: 9,
        client: "URBAN DRIFT",
        service: "Photography",
        img: "https://picsum.photos/1600/900?random=18",
        link: "https://instagram.com"
      },
    ]
  }
];

const WorkPage: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const timer = setTimeout(() => {
      const ctx = gsap.context(() => {
        gsap.from(".page-header-text", {
          y: 150,
          opacity: 0,
          duration: 1.5,
          ease: "power4.out",
          stagger: 0.1
        });

        const sections = document.querySelectorAll('.category-section');
        const mm = gsap.matchMedia();

        mm.add("(min-width: 768px)", () => {
          sections.forEach((section) => {
            const q = gsap.utils.selector(section);

            ScrollTrigger.create({
              trigger: section,
              start: "top top",
              end: "bottom bottom",
              pin: q(".category-header"),
              pinSpacing: false,
              scrub: true
            });
          });
        });

        sections.forEach((section) => {
          const q = gsap.utils.selector(section);
          const projects = q(".project-card");

          projects.forEach((card) => {
            const img = card.querySelector("img");

            gsap.fromTo(
              card,
              { clipPath: "inset(100% 0% 0% 0%)" },
              {
                clipPath: "inset(0% 0% 0% 0%)",
                duration: 1.2,
                ease: "power4.out",
                scrollTrigger: {
                  trigger: card,
                  start: "top 85%",
                }
              }
            );

            if (img) {
              gsap.fromTo(
                img,
                { scale: 1.1, yPercent: -10 },
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
    <div ref={containerRef} className="bg-[#0a0a0a] text-[#E8E8E8] min-h-screen w-full pt-32 pb-24">
      <div className="container mx-auto px-6 md:px-12 mb-32">
        <div className="overflow-hidden">
          <h1 className="page-header-text text-[10vw] md:text-[12vw] font-black leading-[0.85] tracking-tighter uppercase text-[#ff4d00]">
            Select
          </h1>
        </div>
        <div className="overflow-hidden">
          <h1 className="page-header-text text-[10vw] md:text-[12vw] font-black leading-[0.85] tracking-tighter uppercase">
            Works
          </h1>
        </div>
        <div className="mt-8 flex justify-between items-end overflow-hidden">
          <p className="page-header-text text-xl md:text-2xl text-gray-400 max-w-lg">
            A curated archive of digital dominance. From viral campaigns to immersive platforms.
          </p>
          <ArrowDown className="page-header-text animate-bounce w-8 h-8 text-[#ff4d00] hidden md:block" />
        </div>
      </div>

      <div className="flex flex-col gap-20 md:gap-32">
        {categories.map((cat, index) => (
          <section key={cat.id} className="category-section relative min-h-screen">
            <div className="container mx-auto px-6 md:px-12 flex flex-col md:flex-row gap-10 md:gap-24">
              <div className="category-header w-full md:w-1/3 md:h-screen md:sticky md:top-0 pt-6 md:pt-12 mb-6 md:mb-0">
                <span className="text-[#ff4d00] font-mono text-sm uppercase">0{index + 1} / Category</span>
                <h2 className="font-black uppercase tracking-tighter text-4xl lg:text-5xl mt-4">
                  {cat.title}
                </h2>
                <p className="text-gray-400 text-lg border-l border-[#ff4d00] pl-6 mt-6 max-w-xs">
                  {cat.description}
                </p>
              </div>

              <div className="w-full md:w-2/3 flex flex-col gap-24 pb-24">
                {cat.projects.map((project) => (
                  <a
                    key={project.id}
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-card group block cursor-pointer relative"
                    aria-label={`View ${project.client} project`}
                  >
                    <div className="w-full aspect-[16/9] overflow-hidden bg-[#1a1a1a] relative mb-6">
                      <img
                        src={project.img}
                        alt={project.client}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="flex justify-between items-end border-b border-[#333] pb-6 group-hover:border-[#ff4d00] transition">
                      <div>
                        <h3 className="text-3xl md:text-5xl font-bold uppercase mb-2 group-hover:text-[#ff4d00]">
                          {project.client}
                        </h3>
                        <p className="text-gray-400 font-mono text-sm uppercase">
                          {project.service}
                        </p>
                      </div>
                      <div className="w-12 h-12 rounded-full border border-[#333] flex items-center justify-center group-hover:bg-[#ff4d00] group-hover:text-black">
                        <ArrowUpRight className="w-6 h-6 group-hover:rotate-45 transition-transform" />
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </section>
        ))}
      </div>
    </div>
  );
};

export default WorkPage;
