import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { Menu, X, Instagram, Linkedin, Twitter } from 'lucide-react';

interface NavbarProps {
  onNavigate: (view: string) => void;
}


const ScrambleLink: React.FC<{ text: string; onClick: () => void }> = ({ text, onClick }) => {
    const [display, setDisplay] = useState(text);
    const chars = "!@#$%^&*()_+-=[]{}|;:,.<>?/1234567890";
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);


    useEffect(() => {
        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, []);

    const scramble = () => {
        let iteration = 0;
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
        }

        intervalRef.current = setInterval(() => {
            setDisplay(
                text
                    .split("")
                    .map((letter, index) => {
                        if (index < iteration) {
                            return text[index];
                        }
                        return chars[Math.floor(Math.random() * chars.length)];
                    })
                    .join("")
            );

            if (iteration >= text.length) {
                if (intervalRef.current) {
                    clearInterval(intervalRef.current);
                }
            }

            iteration += 1 / 2;
        }, 30);
    };

    const reset = () => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
        }
        setDisplay(text);
    };

    return (
        <span
            onMouseEnter={scramble}
            onMouseLeave={reset}
            onClick={onClick}
            className="cursor-pointer block"
        >
            {display}
        </span>
    );
};

const Navbar: React.FC<NavbarProps> = ({ onNavigate }) => {
  const navRef = useRef<HTMLElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!navRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from(navRef.current, {
        y: -100,
        opacity: 0,
        duration: 1,
        ease: 'power4.out',
        delay: 2.5
      });
    }, navRef);
    return () => ctx.revert();
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);

  useEffect(() => {
    if (isOpen) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = '';
    }
  }, [isOpen]);

  const handleNavClick = (item: string) => {
      let view = 'home';
      if (item === 'Services') view = 'services';
      if (item === 'Work') view = 'work';
      if (item === 'About Us') view = 'about';
      if (item === 'Contact') view = 'contact';

      onNavigate(view);

      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      setIsOpen(false);
  };

  return (
    <nav ref={navRef} className="fixed top-0 left-0 w-full z-50 px-6 py-6 mix-blend-difference text-white flex justify-between items-center">
      <div
        className="text-2xl font-bold tracking-tighter uppercase cursor-pointer hover:text-[#ff4d00] transition-colors"
        onClick={() => handleNavClick('home')}
      >
        buildit<span className="text-[#ff4d00]">.</span>
      </div>

      <div className="hidden md:block">
        <ul className="flex space-x-12 text-sm font-bold uppercase tracking-widest">
          {['Services', 'Work', 'About Us', 'Contact'].map((item) => (
            <li key={item} className="relative group hover:text-[#ff4d00] transition-colors">
              <ScrambleLink
                text={item}
                onClick={() => handleNavClick(item)}
              />
            </li>
          ))}
        </ul>
      </div>

      <div className="md:hidden">
        <button onClick={toggleMenu} className="focus:outline-none text-white">
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {}
      {isOpen && (
        <div className="fixed inset-0 bg-[#0a0a0a] flex flex-col items-center justify-center space-y-8 z-40">
           {['Services', 'Work', 'About Us', 'Contact'].map((item) => (
            <div
                key={item}
                className="text-5xl font-black uppercase hover:text-[#ff4d00] cursor-pointer"
                onClick={() => handleNavClick(item)}
            >
              {item}
            </div>
          ))}

           {}
           <div className="absolute bottom-12 flex gap-8">
                <a href="#" className="text-gray-500 hover:text-[#ff4d00] transition-colors">
                    <Linkedin className="w-6 h-6" />
                </a>
                <a href="#" className="text-gray-500 hover:text-[#ff4d00] transition-colors">
                    <Instagram className="w-6 h-6" />
                </a>
                <a href="#" className="text-gray-500 hover:text-[#ff4d00] transition-colors">
                    <Twitter className="w-6 h-6" />
                </a>
           </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;