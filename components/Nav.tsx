"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

const links = [
  { href: "#about", label: "About" },
  { href: "#tracks", label: "Tracks" },
  { href: "#schedule", label: "Schedule" },
  { href: "#butwal", label: "Butwal Round" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [isDark, setIsDark] = useState(() => {
    if (typeof window === "undefined") return false;
    const saved = localStorage.getItem("theme");
    return saved === "dark" || (!saved && window.matchMedia("(prefers-color-scheme: dark)").matches);
  });

  useEffect(() => {
    const handler = (e: MediaQueryListEvent) => setIsDark(e.matches);
    window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", handler);
    return () => window.matchMedia("(prefers-color-scheme: dark)").removeEventListener("change", handler);
  }, []);

  function toggleTheme() {
    const next = !isDark;
    setIsDark(next);
    document.documentElement.setAttribute("data-theme", next ? "dark" : "light");
    localStorage.setItem("theme", next ? "dark" : "light");
  }

  return (
    <>
      <nav className="atlas-header" role="navigation" aria-label="Main navigation">
        <Link className="atlas-mark" href="/" aria-label="CyberUtsav Home">
          <Image src="/CUlogo.jpg" alt="CyberUtsav Logo" width={34} height={34} style={{ borderRadius: "9px" }} />
          <strong>CyberUtsav</strong>
        </Link>

        <div className="atlas-nav">
          {links.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
        </div>

        <a href="https://registration.cyberutsav.com/butwal" target="_blank" rel="noopener noreferrer" className="header-ticket">
          Register Now
        </a>

        <button type="button" className="theme-toggle" onClick={toggleTheme} aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}>
          {isDark ? (
            <svg style={{ width: 18, height: 18 }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          ) : (
            <svg style={{ width: 18, height: 18 }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
          )}
        </button>

        <button
          type="button"
          className="menu-toggle"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
        >
          <svg style={{ width: 22, height: 22 }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            {open ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </nav>

      {open && (
        <div id="mobile-menu" className="atlas-mobile">
          {links.map((link) => (
            <a key={link.href} href={link.href} onClick={() => setOpen(false)}>
              {link.label}
            </a>
          ))}
          <a
            href="https://registration.cyberutsav.com/butwal"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
            className="atlas-button dark"
          >
            Register Now
          </a>
        </div>
      )}
    </>
  );
}
