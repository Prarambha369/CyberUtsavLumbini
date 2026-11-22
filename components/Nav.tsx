"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { registerUrl } from "@/lib/data";

const links = [
  { href: "#about", label: "About" },
  { href: "#tracks", label: "Tracks" },
  { href: "#schedule", label: "Schedule" },
  { href: "#butwal", label: "Butwal Round" },
  { href: "#faq", label: "FAQ" },
];

type Theme = "light" | "dark";

function readStoredTheme(): Theme | null {
  try {
    const saved = localStorage.getItem("theme");
    return saved === "dark" || saved === "light" ? saved : null;
  } catch {
    return null;
  }
}

function applyTheme(theme: Theme) {
  document.documentElement.setAttribute("data-theme", theme);
}

export default function Nav() {
  const [open, setOpen] = useState(false);
  // Start as null so server and first client render match; the real value is
  // read from <html data-theme> (set by the inline script in layout) after mount.
  const [theme, setTheme] = useState<Theme | null>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- sync with pre-hydration theme script
    setTheme(document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light");

    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const onSystemChange = (e: MediaQueryListEvent) => {
      // Follow the OS only when the visitor hasn't picked a theme themselves.
      if (readStoredTheme()) return;
      const next: Theme = e.matches ? "dark" : "light";
      applyTheme(next);
      setTheme(next);
    };
    mq.addEventListener("change", onSystemChange);
    return () => mq.removeEventListener("change", onSystemChange);
  }, []);

  // Close the mobile menu on Escape or when resizing up to desktop.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      // If focus is inside the menu it's about to be removed — hand it back to the toggle.
      if (document.activeElement?.closest("#mobile-menu")) toggleRef.current?.focus();
      setOpen(false);
    };
    const onResize = () => window.innerWidth > 980 && setOpen(false);
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [open]);

  function toggleTheme() {
    const next: Theme = theme === "dark" ? "light" : "dark";
    setTheme(next);
    applyTheme(next);
    try {
      localStorage.setItem("theme", next);
    } catch {
      /* storage unavailable — theme still applies for this visit */
    }
  }

  const isDark = theme === "dark";

  return (
    <>
      <nav className="atlas-header" aria-label="Main navigation">
        <Link className="atlas-mark" href="/" aria-label="CyberUtsav Lumbini — home">
          <Image src="/CUlogo.jpg" alt="" width={34} height={34} style={{ borderRadius: "9px" }} priority />
          <strong>CyberUtsav</strong>
        </Link>

        <div className="atlas-nav">
          {links.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
        </div>

        <a href={registerUrl("nav")} target="_blank" rel="noopener noreferrer" className="header-ticket">
          Register
          <span className="sr-only"> (opens in a new tab)</span>
        </a>

        <button
          type="button"
          className="theme-toggle"
          onClick={toggleTheme}
          aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
          title={isDark ? "Light mode" : "Dark mode"}
        >
          {/* Render nothing until mounted to avoid a wrong icon flash / hydration mismatch */}
          {theme === null ? null : isDark ? (
            <svg aria-hidden="true" style={{ width: 18, height: 18 }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          ) : (
            <svg aria-hidden="true" style={{ width: 18, height: 18 }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
          )}
        </button>

        <button
          ref={toggleRef}
          type="button"
          className="menu-toggle"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
        >
          <svg aria-hidden="true" style={{ width: 22, height: 22 }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
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
            href={registerUrl("nav_mobile")}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
            className="atlas-button dark"
          >
            Register
          </a>
        </div>
      )}
    </>
  );
}
