import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { Menu, X, Instagram, Linkedin } from "lucide-react";

interface NavbarProps {
  onNavigate: (view: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ onNavigate }) => {
  const navRef = useRef<HTMLElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    gsap.from(navRef.current, {
      y: -80,
      opacity: 0,
      duration: 1,
      ease: "power4.out",
      delay: 1.8,
    });
  }, []);

  /* LOCK SCROLL */
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
  }, [isOpen]);

  /* MENU ANIMATION */
  useEffect(() => {
    if (!menuRef.current) return;

    gsap.to(menuRef.current, {
      autoAlpha: isOpen ? 1 : 0,
      y: isOpen ? 0 : -20,
      pointerEvents: isOpen ? "auto" : "none",
      duration: 0.5,
      ease: "power3.out",
    });
  }, [isOpen]);

  const handleNavClick = (view: string) => {
    onNavigate(view);
    window.scrollTo({ top: 0, behavior: "instant" });
    setIsOpen(false);
  };

  return (
    <>
      {/* NAVBAR */}
      <nav
        ref={navRef}
        className={`fixed top-0 left-0 w-full z-50 px-6 py-6
        flex justify-between items-center text-white
        ${!isOpen ? "md:mix-blend-difference" : ""}`}
      >
        <div
          className="text-2xl font-bold uppercase tracking-tighter cursor-pointer"
          onClick={() => handleNavClick("home")}
        >
          buildit<span className="text-[#ff4d00]">.</span>
        </div>

        {/* DESKTOP */}
        <ul className="hidden md:flex space-x-12 text-sm font-bold uppercase tracking-widest">
          {["services", "work", "about", "contact"].map((item) => (
            <li
              key={item}
              className="cursor-pointer hover:text-[#ff4d00]"
              onClick={() => handleNavClick(item)}
            >
              {item}
            </li>
          ))}
        </ul>

        {/* MOBILE TOGGLE */}
        <button
          className="md:hidden"
          onClick={() => setIsOpen((p) => !p)}
        >
          {isOpen ? <X /> : <Menu />}
        </button>
      </nav>

      {/* MOBILE MENU */}
      <div
        ref={menuRef}
        className="fixed inset-0 z-40 bg-[#0a0a0a]
        flex flex-col items-center justify-center gap-8
        opacity-0 pointer-events-none"
      >
        {["services", "work", "about", "contact"].map((item) => (
          <div
            key={item}
            className="text-4xl font-black uppercase cursor-pointer hover:text-[#ff4d00]"
            onClick={() => handleNavClick(item)}
          >
            {item}
          </div>
        ))}

        {/* SOCIALS */}
        <div className="absolute bottom-10 flex gap-8 items-center">
          <a
            href="https://www.instagram.com/builditservices/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram profile"
            className="hover:text-[#ff4d00] transition-colors"
          >
            <Instagram />
          </a>
          <Linkedin />
          <a
            href="https://x.com/build_it51632"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="X profile"
            className="hover:opacity-80 transition-opacity"
          >
            <img src="/x-logo.svg" alt="X" className="w-6 h-6 brightness-0 invert" />
          </a>
        </div>
      </div>
    </>
  );
};

export default Navbar;
