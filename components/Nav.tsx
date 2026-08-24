"use client";

import { useState } from "react";

export default function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <nav
      className="sticky top-0 z-50 bg-[#111111] border-b-2 border-[#00D4FF]"
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <a href="/" className="flex items-center gap-3 group" aria-label="CyberUtsav Home">
          <div className="w-10 h-10 bg-[#00D4FF] border-2 border-black flex items-center justify-center font-black text-black text-lg neo-shadow-sm">
            C3
          </div>
          <div className="leading-tight">
            <span className="font-black text-xl tracking-tight block">CYBER UTSAV</span>
            <span className="text-[#00D4FF] font-bold text-xs tracking-[0.2em]">LUMBINI CHAPTER</span>
          </div>
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8 text-sm font-bold">
          <a href="#about" className="hover:text-[#00D4FF] transition-colors">ABOUT</a>
          <a href="#tracks" className="hover:text-[#00D4FF] transition-colors">TRACKS</a>
          <a href="#schedule" className="hover:text-[#00D4FF] transition-colors">SCHEDULE</a>
          <a href="#cities" className="hover:text-[#00D4FF] transition-colors">CITIES</a>
          <a
            href="#register"
            className="px-4 py-2 bg-[#00D4FF] text-black border-2 border-black neo-shadow-sm neo-hover font-black"
          >
            PRE-REGISTER
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden w-10 h-10 bg-[#1A1A1A] border-2 border-[#333] flex flex-col items-center justify-center gap-1.5"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
        >
          <span
            className={`block w-5 h-0.5 bg-[#00D4FF] transition-transform ${
              open ? "rotate-45 translate-y-2" : ""
            }`}
          />
          <span
            className={`block w-5 h-0.5 bg-[#00D4FF] transition-opacity ${
              open ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block w-5 h-0.5 bg-[#00D4FF] transition-transform ${
              open ? "-rotate-45 -translate-y-2" : ""
            }`}
          />
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div id="mobile-menu" className="md:hidden border-t border-[#222] bg-[#0A0A0A]">
          <div className="px-4 py-6 flex flex-col gap-4 text-sm font-bold">
            <a href="#about" onClick={() => setOpen(false)} className="hover:text-[#00D4FF] py-2">
              ABOUT
            </a>
            <a href="#tracks" onClick={() => setOpen(false)} className="hover:text-[#00D4FF] py-2">
              TRACKS
            </a>
            <a href="#schedule" onClick={() => setOpen(false)} className="hover:text-[#00D4FF] py-2">
              SCHEDULE
            </a>
            <a href="#cities" onClick={() => setOpen(false)} className="hover:text-[#00D4FF] py-2">
              CITIES
            </a>
            <a
              href="#register"
              onClick={() => setOpen(false)}
              className="mt-2 px-4 py-3 bg-[#00D4FF] text-black border-2 border-black neo-shadow-sm text-center font-black"
            >
              PRE-REGISTER
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
