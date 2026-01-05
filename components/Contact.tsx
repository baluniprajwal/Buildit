import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Instagram, Linkedin, Twitter, Dribbble } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const projectTypes = [
  "Web Dev",
  "Social Media",
  "Content",
  "Branding",
  "Partner"
];

const Contact: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [activeType, setActiveType] = useState<string | null>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {

      const tl = gsap.timeline({
        scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 60%",
            end: "bottom bottom",
            toggleActions: "play none none reverse"
        }
      });

      tl.from(".contact-header-text", {
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power4.out"
      })
      .from(".contact-field", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.05,
        ease: "power2.out"
      }, "-=0.5");

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full min-h-screen bg-[#E8E8E8] text-black py-24 md:py-20 px-6 md:px-12 overflow-hidden border-t border-black/10 flex items-center">
      {}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none"></div>

      <div className="container mx-auto max-w-7xl relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">

        {}
        <div className="flex flex-col justify-center h-full">
            <div>
                <span className="contact-header-text block text-[#ff4d00] font-mono text-xs tracking-widest uppercase mb-4">

                </span>
                <h2 className="contact-header-text text-5xl md:text-7xl font-black uppercase tracking-tighter leading-[0.9] mb-6 text-black">
                    Let's <br/> Build <br/> The <span className="text-transparent stroke-black" style={{ WebkitTextStroke: '1px black', color: 'transparent' }}>Future</span>
                </h2>
                <p className="contact-header-text text-lg text-gray-500 max-w-md leading-relaxed font-medium">
                    Ready to elevate your brand? Fill out the brief and we'll create the strategy.
                </p>
            </div>

            <div className="hidden lg:block space-y-6 contact-header-text mt-10">
                <div className="border-l-2 border-black/20 pl-6 hover:border-[#ff4d00] transition-colors duration-300">
                    <p className="font-mono text-[10px] text-gray-400 uppercase mb-1">Email Us</p>
                    <a href="mailto:hello@buildit.agency" className="text-xl font-bold text-black hover:text-[#ff4d00] transition-colors">hello@buildit.agency</a>
                </div>
                <div className="border-l-2 border-black/20 pl-6 hover:border-[#ff4d00] transition-colors duration-300">
                    <p className="font-mono text-[10px] text-gray-400 uppercase mb-1">Call Us</p>
                    <a href="tel:+15550000000" className="text-xl font-bold text-black hover:text-[#ff4d00] transition-colors">+1 (555) 000-0000</a>
                </div>
                <div className="border-l-2 border-black/20 pl-6 hover:border-[#ff4d00] transition-colors duration-300">
                    <p className="font-mono text-[10px] text-gray-400 uppercase mb-1">Visit HQ</p>
                    <p className="text-lg font-bold text-black">Los Angeles • New York • London</p>
                </div>
                <div className="border-l-2 border-black/20 pl-6 hover:border-[#ff4d00] transition-colors duration-300">
                    <p className="font-mono text-[10px] text-gray-400 uppercase mb-2">Network</p>
                    <div className="flex gap-4">
                        <a href="#" className="group flex items-center gap-2">
                             <Linkedin className="w-4 h-4 text-black group-hover:text-[#ff4d00] transition-colors" />
                             <span className="font-bold uppercase text-xs group-hover:text-[#ff4d00] transition-colors">LinkedIn</span>
                        </a>
                        <a href="#" className="group flex items-center gap-2">
                             <Instagram className="w-4 h-4 text-black group-hover:text-[#ff4d00] transition-colors" />
                             <span className="font-bold uppercase text-xs group-hover:text-[#ff4d00] transition-colors">Instagram</span>
                        </a>
                        <a href="#" className="group flex items-center gap-2">
                             <Twitter className="w-4 h-4 text-black group-hover:text-[#ff4d00] transition-colors" />
                             <span className="font-bold uppercase text-xs group-hover:text-[#ff4d00] transition-colors">X</span>
                        </a>
                    </div>
                </div>
            </div>
        </div>

        {}
        <form ref={formRef} className="space-y-8 lg:pt-0">

            {}
            <div className="space-y-6">
                <div className="contact-field group">
                    <label className="block font-mono text-[10px] text-[#ff4d00] uppercase tracking-widest mb-1 group-focus-within:text-black transition-colors">01 / Name</label>
                    <input type="text" placeholder="John Doe" className="w-full bg-transparent border-b border-black/20 py-2 text-xl md:text-2xl font-bold text-black focus:outline-none focus:border-black transition-colors placeholder-black/30" />
                </div>
                <div className="contact-field group">
                    <label className="block font-mono text-[10px] text-[#ff4d00] uppercase tracking-widest mb-1 group-focus-within:text-black transition-colors">02 / Email</label>
                    <input type="email" placeholder="john@company.com" className="w-full bg-transparent border-b border-black/20 py-2 text-xl md:text-2xl font-bold text-black focus:outline-none focus:border-black transition-colors placeholder-black/30" />
                </div>
                <div className="contact-field group">
                    <label className="block font-mono text-[10px] text-[#ff4d00] uppercase tracking-widest mb-1 group-focus-within:text-black transition-colors">03 / Company</label>
                    <input type="text" placeholder="Acme Inc." className="w-full bg-transparent border-b border-black/20 py-2 text-xl md:text-2xl font-bold text-black focus:outline-none focus:border-black transition-colors placeholder-black/30" />
                </div>
            </div>

            {}
            <div className="contact-field">
                <label className="block font-mono text-[10px] text-[#ff4d00] uppercase tracking-widest mb-4">04 / Project Type</label>
                <div className="flex flex-wrap gap-2">
                    {projectTypes.map(type => (
                        <button
                            key={type}
                            type="button"
                            onClick={() => setActiveType(type)}
                            className={`px-4 py-2 border rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 ${activeType === type ? 'bg-black border-black text-white' : 'border-black/20 text-gray-500 hover:border-black hover:text-black bg-transparent'}`}
                        >
                            {type}
                        </button>
                    ))}
                </div>
            </div>

            {}
            <div className="contact-field pt-4">
                <button type="submit" className="group relative w-full h-16 bg-black overflow-hidden border border-black transition-colors shadow-xl">
                    <div className="absolute inset-0 bg-[#ff4d00] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)]"></div>
                    <div className="relative h-full flex items-center justify-between px-6">
                        <span className="text-lg font-black uppercase tracking-widest text-white group-hover:text-black transition-colors z-10">Send Brief</span>
                        <div className="flex items-center gap-2 text-white group-hover:text-black transition-colors z-10">
                            <span className="font-mono text-[10px] opacity-60 hidden md:inline-block">SEND MESSAGE</span>
                            <ArrowRight className="w-5 h-5 transform group-hover:translate-x-2 transition-transform" />
                        </div>
                    </div>
                </button>
            </div>

        </form>
      </div>
    </section>
  );
};

export default Contact;