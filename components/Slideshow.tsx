"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export type Slide = { src: string; alt: string };

/** Auto-advancing photo carousel. Pauses on hover or keyboard focus and respects reduced motion. */
export default function Slideshow({ slides, label, interval = 4000 }: { slides: Slide[]; label: string; interval?: number }) {
  const [active, setActive] = useState(0);
  // Hover and keyboard focus pause independently; rotate only when neither applies.
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const paused = hovered || focused;

  useEffect(() => {
    if (paused) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // Re-created whenever `active` changes, so a manual pick restarts the timer.
    const id = setTimeout(() => setActive((prev) => (prev + 1) % slides.length), interval);
    return () => clearTimeout(id);
  }, [active, paused, slides.length, interval]);

  return (
    <div
      className="slideshow-container"
      role="region"
      aria-roledescription="carousel"
      aria-label={label}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setFocused(true)}
      onBlur={(e) => {
        // Stay paused while focus moves between photo buttons.
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setFocused(false);
      }}
    >
      {slides.map((slide, i) => (
        <div key={slide.src} className={`slide${i === active ? " slide-active" : ""}`} aria-hidden={i !== active}>
          <Image src={slide.src} alt={slide.alt} fill sizes="(max-width: 980px) 100vw, 640px" />
        </div>
      ))}
      <div className="slide-dots">
        {slides.map((slide, i) => (
          <button
            key={slide.src}
            type="button"
            className="slide-dot"
            onClick={() => setActive(i)}
            aria-label={`Show photo ${i + 1} of ${slides.length}`}
            aria-current={i === active}
          />
        ))}
      </div>
    </div>
  );
}
