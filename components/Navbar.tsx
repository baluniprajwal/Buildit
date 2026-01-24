import React, { useLayoutEffect, useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { Menu, X, Instagram, Linkedin } from "lucide-react";
import ScrambleText from "./ScrambleText";
import type { View } from "../App";

interface NavbarProps {
  onNavigate: (view: View) => void;
}

const Navbar: React.FC<NavbarProps> = ({ onNavigate }) => {
  const navRef = useRef<HTMLElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  /* NAVBAR INTRO ANIMATION (STRICT MODE SAFE) */
  useLayoutEffect(() => {
    if (!navRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from(navRef.current!, {
        y: -80,
        opacity: 0,
        duration: 1,
        ease: "power4.out",
        delay: 1.8,
        clearProps: "transform,opacity",
      });
    });

    return () => ctx.revert();
  }, []);

  /* LOCK SCROLL */
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  /* MOBILE MENU ANIMATION */
  useLayoutEffect(() => {
    if (!menuRef.current) return;

    gsap.to(menuRef.current, {
      autoAlpha: isOpen ? 1 : 0,
      y: isOpen ? 0 : -20,
      pointerEvents: isOpen ? "auto" : "none",
      duration: 0.5,
      ease: "power3.out",
    });
  }, [isOpen]);

  const handleNavClick = (view: View) => {
    onNavigate(view);
    window.scrollTo({ top: 0, behavior: "instant" });
    setIsOpen(false);
  };

  const navItems: View[] = ["services", "work", "about", "contact"];

  return (
    <>
      {/* NAVBAR */}
      <nav
        ref={navRef}
        className="fixed top-0 left-0 w-full z-50 px-4 py-4 md:px-6 md:py-6
        flex justify-between items-center text-white
        md:mix-blend-difference"
        style={{ opacity: 1 }}
      >
        {/* LOGO */}
        <div className="flex items-center gap-1">
          <ScrambleText
            text="buildit"
            onClick={() => handleNavClick("home")}
            className="text-2xl font-bold uppercase tracking-tighter"
          />
          <span className="text-[#ff4d00] text-2xl font-bold">.</span>
        </div>

        {/* DESKTOP NAV */}
        <ul className="hidden md:flex space-x-12 text-sm font-bold uppercase tracking-widest">
          {navItems.map((item) => (
            <li key={item}>
              <ScrambleText
                text={item}
                onClick={() => handleNavClick(item)}
                className="hover:text-[#ff4d00] transition-colors duration-300"
              />
            </li>
          ))}
        </ul>

        {/* MOBILE TOGGLE */}
        <button className="md:hidden" onClick={() => setIsOpen((p) => !p)}>
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
        {navItems.map((item) => (
          <ScrambleText
            key={item}
            text={item}
            onClick={() => handleNavClick(item)}
            className="text-4xl font-black uppercase hover:text-[#ff4d00]"
          />
        ))}

        {/* SOCIALS */}
        <div className="absolute bottom-10 flex gap-8 items-center">
          <a
            href="https://www.instagram.com/builditservices/"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-all duration-300 hover:text-[#ff4d00] hover:scale-110"
          >
            <Instagram />
          </a>

          <a
            href="https://www.linkedin.com/company/buildit-services/"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-all duration-300 hover:text-[#ff4d00] hover:scale-110"
          >
            <Linkedin />
          </a>

          <a
            href="https://x.com/build_it51632"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:opacity-80"
          >
            <img
              src="/x-logo.svg"
              alt="X"
              className="w-6 h-6 brightness-0 invert"
            />
          </a>
        </div>
      </div>
    </>
  );
};

export default Navbar;
