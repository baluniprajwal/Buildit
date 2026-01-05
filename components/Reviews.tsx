import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Star, Quote, AlignLeft } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const reviews = [
  {
    id: 1,
    text: "The ROI was outstanding. We scaled from 10k to 1M users in 3 months.",
    author: "Alex V.",
    role: "CEO, FinTech Inc.",
    color: "bg-[#E8E8E8]",
    textColor: "text-black"
  },
  {
    id: 2,
    text: "They don't just build websites. They build conversion engines. Absolute mastery.",
    author: "Sarah J.",
    role: "CMO, LuxBrand",
    color: "bg-[#111]",
    textColor: "text-[#E8E8E8]"
  },
  {
    id: 3,
    text: "Buildit feels like an extension of our brain. They knew what we needed before we did.",
    author: "Marcus T.",
    role: "Founder, Stealth Startup",
    color: "bg-[#ff4d00]",
    textColor: "text-black"
  },
  {
    id: 4,
    text: "The aesthetic is unmatched. Everyone asks who did our branding. I hesitate to tell them.",
    author: "Elena R.",
    role: "Director, ArtHouse",
    color: "bg-[#E8E8E8]",
    textColor: "text-black"
  }
];

const Reviews: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const wrappersRef = useRef<(HTMLDivElement | null)[]>([]); // Refs for the sticky containers
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]); // Refs for the animated inner cards

  useLayoutEffect(() => {
    if (!containerRef.current) return;

    // A small delay ensures the DOM layout is final before ScrollTrigger calculates positions
    const timer = setTimeout(() => ScrollTrigger.refresh(), 200);

    const ctx = gsap.context(() => {
        cardsRef.current.forEach((card, index) => {
            if (!card) return;
            
            // 1. Initial State: Rotate the INNER card
            gsap.set(card, { 
                rotation: index % 2 === 0 ? 1 : -1, 
                transformOrigin: "center top" 
            });

            // 2. Animation Trigger
            // We watch the NEXT sticky wrapper. When it scrolls into view, we shrink the CURRENT card.
            const nextWrapper = wrappersRef.current[index + 1];
            
            if (nextWrapper) {
                gsap.to(card, {
                    scale: 0.9,
                    opacity: 0.6,
                    filter: "blur(5px)", 
                    ease: "none",
                    scrollTrigger: {
                        trigger: nextWrapper, 
                        start: "top bottom-=100", // Start shrinking before it overlaps
                        end: "top top+=100",      // Finish shrinking when it's fully on top
                        scrub: true,
                        invalidateOnRefresh: true,
                    }
                });
            }
        });
    }, containerRef);

    return () => {
        ctx.revert();
        clearTimeout(timer);
    };
  }, []);

  return (
    <section ref={containerRef} className="bg-[#050505] relative w-full pt-24 pb-48 px-6 md:px-12">
        
        {/* Header */}
        <div className="container mx-auto mb-24 flex flex-col md:flex-row justify-between items-end border-b border-[#333] pb-8">
            <div>
                <div className="flex items-center gap-2 text-[#ff4d00] font-mono text-sm tracking-widest uppercase mb-4">
                    <span className="w-2 h-2 bg-[#ff4d00] rounded-full animate-pulse"></span>
                    Testimonials
                </div>
                <h2 className="text-5xl md:text-7xl font-black uppercase text-[#E8E8E8] leading-[0.9]">
                    Client <br/> Stories
                </h2>
            </div>
            <div className="hidden md:block text-right">
                <p className="text-gray-500 font-mono text-sm max-w-xs uppercase">
                    / Proven Results <br/>
                    / Trusted Partners
                </p>
            </div>
        </div>

        {/* Stacking Cards Container */}
        <div className="container mx-auto max-w-4xl relative">
            {reviews.map((review, i) => (
                <div 
                    key={review.id}
                    // Outer Wrapper handles the Sticky Positioning
                    ref={(el) => { wrappersRef.current[i] = el; }}
                    className="sticky top-[15vh] md:top-[20vh] w-full mb-12"
                    style={{ zIndex: i + 1 }}
                >
                    {/* Inner Div handles the Style & Animation */}
                    <div
                        ref={(el) => { cardsRef.current[i] = el; }}
                        className={`w-full min-h-[50vh] md:min-h-[60vh] rounded-3xl border border-black/10 shadow-2xl p-8 md:p-16 flex flex-col justify-between ${review.color} ${review.textColor} will-change-transform`}
                    >
                        <div className="flex justify-between items-start opacity-60">
                             <Quote className="w-12 h-12 md:w-20 md:h-20" />
                             <span className="font-mono text-xs md:text-sm tracking-widest border border-current px-3 py-1 rounded-full">
                                0{i + 1}
                             </span>
                        </div>

                        <div className="relative">
                            <p className="text-2xl md:text-5xl font-bold uppercase leading-tight md:leading-[1.1]">
                                "{review.text}"
                            </p>
                        </div>

                        <div className="flex items-center justify-between border-t border-current/20 pt-8 mt-8">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-current opacity-20 rounded-full flex items-center justify-center">
                                    <AlignLeft className="w-6 h-6 opacity-50" />
                                </div>
                                <div>
                                    <p className="font-bold uppercase tracking-wide text-lg">{review.author}</p>
                                    <p className="font-mono text-xs opacity-60 uppercase">{review.role}</p>
                                </div>
                            </div>
                            <div className="flex gap-1">
                                {[1, 2, 3, 4, 5].map((s) => (
                                    <Star key={s} className="w-4 h-4 fill-current text-current" />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
        
        {/* Footer Filler */}
        <div className="h-[20vh] w-full flex items-center justify-center mt-24">
             <button className="text-[#ff4d00] font-mono uppercase text-sm tracking-[0.3em] hover:text-white transition-colors">
                • Read More •
             </button>
        </div>

    </section>
  );
};

export default Reviews;