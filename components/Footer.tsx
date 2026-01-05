import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { Instagram, Linkedin, Twitter, ArrowUpRight } from 'lucide-react';

interface FooterProps {
  onNavigate: (view: string) => void;
  showCta?: boolean;
}

const Footer: React.FC<FooterProps> = ({ onNavigate, showCta = true }) => {
  const ctaSectionRef = useRef<HTMLElement>(null);
  const footerRef = useRef<HTMLElement>(null);
  const ctaTextRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {

    if (!ctaSectionRef.current || !ctaTextRef.current || !showCta) return;

    const ctx = gsap.context(() => {

        const handleMouseMove = (e: MouseEvent) => {
            if (!ctaSectionRef.current || !ctaTextRef.current) return;
            const rect = ctaSectionRef.current.getBoundingClientRect();


            const isHovering = e.clientY >= rect.top - 100 && e.clientY <= rect.bottom + 100;

            if (isHovering) {
                 const x = e.clientX - rect.left - rect.width / 2;
                 const y = e.clientY - rect.top - rect.height / 2;

                 gsap.to(ctaTextRef.current, {
                    x: x * 0.1,
                    y: y * 0.1,
                    duration: 1,
                    ease: "power2.out"
                });
            } else {
                 gsap.to(ctaTextRef.current, {
                    x: 0,
                    y: 0,
                    duration: 1,
                    ease: "elastic.out(1, 0.3)"
                });
            }
        };

        const handleMouseLeave = () => {
             if (!ctaTextRef.current) return;
             gsap.to(ctaTextRef.current, {
                x: 0,
                y: 0,
                duration: 1,
                ease: "elastic.out(1, 0.3)"
            });
        };

        window.addEventListener('mousemove', handleMouseMove);
        ctaSectionRef.current.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, ctaSectionRef);

    return () => ctx.revert();
  }, [showCta]);

  return (
    <>
      {}
      {showCta && (
        <section ref={ctaSectionRef} className="bg-black text-[#E8E8E8] py-32 px-6 md:px-12 relative overflow-hidden z-40">
            {}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none"></div>

            <div className="container mx-auto flex flex-col items-center text-center relative z-10">
                <h2
                    ref={ctaTextRef}
                    className="text-[12vw] leading-[0.8] font-black uppercase tracking-tighter mb-8 hover:text-[#ff4d00] transition-colors cursor-pointer select-none will-change-transform"
                    onClick={() => {
                        onNavigate('contact');
                        window.scrollTo({ top: 0, behavior: 'instant' });
                    }}
                >
                Let's Talk
                </h2>
                <button
                    onClick={() => {
                        onNavigate('contact');
                        window.scrollTo({ top: 0, behavior: 'instant' });
                    }}
                    className="group flex items-center gap-4 text-xl md:text-2xl font-mono uppercase tracking-widest border border-white/20 px-10 py-5 rounded-full hover:bg-[#ff4d00] hover:text-white hover:border-[#ff4d00] transition-all duration-300"
                >
                    Start Project
                    <ArrowUpRight className="w-6 h-6 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </button>
            </div>
        </section>
      )}

      {}
      <footer ref={footerRef} className="bg-black text-[#E8E8E8] pt-24 pb-12 px-6 md:px-12 border-t border-white/10 relative overflow-hidden z-40">

        {}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none"></div>

        <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 relative z-10">
            {}
            <div className="md:col-span-1">
                 <div
                    className="text-2xl font-bold tracking-tighter uppercase cursor-pointer mb-6 inline-block hover:text-[#ff4d00] transition-colors"
                    onClick={() => {
                        onNavigate('home');
                        window.scrollTo({ top: 0, behavior: 'instant' });
                    }}
                  >
                    buildit<span className="text-[#ff4d00]">.</span>
                  </div>
                  <p className="text-gray-400 text-sm leading-relaxed max-w-xs font-mono">
                    Crafting digital excellence through strategy, code, and content.
                  </p>
            </div>

            {}
            <div>
                <h4 className="font-mono text-xs text-[#ff4d00] uppercase tracking-widest mb-6">Sitemap</h4>
                <ul className="space-y-4">
                    {['Home', 'Services', 'Work', 'About Us', 'Contact'].map((item) => (
                        <li key={item}>
                            <button
                                onClick={() => {
                                    let view = 'home';
                                    if (item === 'Services') view = 'services';
                                    if (item === 'Work') view = 'work';
                                    if (item === 'About Us') view = 'about';
                                    if (item === 'Contact') view = 'contact';
                                    onNavigate(view);
                                    window.scrollTo({ top: 0, behavior: 'instant' });
                                }}
                                className="text-gray-400 hover:text-white uppercase font-bold text-sm tracking-wider transition-colors"
                            >
                                {item}
                            </button>
                        </li>
                    ))}
                </ul>
            </div>

            {}
            <div>
                 <h4 className="font-mono text-xs text-[#ff4d00] uppercase tracking-widest mb-6">Social</h4>
                 <ul className="space-y-4">
                    <li><a href="#" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors uppercase font-bold text-sm"><Linkedin className="w-4 h-4" /> LinkedIn</a></li>
                    <li><a href="#" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors uppercase font-bold text-sm"><Instagram className="w-4 h-4" /> Instagram</a></li>
                    <li><a href="#" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors uppercase font-bold text-sm"><Twitter className="w-4 h-4" /> Twitter</a></li>
                 </ul>
            </div>

            {}
            <div>
                 <h4 className="font-mono text-xs text-[#ff4d00] uppercase tracking-widest mb-6">Contact</h4>
                 <a href="mailto:hello@buildit.agency" className="text-lg font-bold text-[#E8E8E8] hover:text-[#ff4d00] transition-colors">hello@buildit.agency</a>
            </div>
        </div>

        <div className="container mx-auto mt-24 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500 font-mono uppercase relative z-10">
            <p>© 2025 BUILDIT AGENCY. ALL RIGHTS RESERVED.</p>
            <div className="flex gap-8 mt-4 md:mt-0">
                <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;