"use client";

import { useEffect, useState } from "react";
import { registerUrl } from "@/lib/data";

/**
 * Mobile-only bottom bar with the primary CTA. Appears once the hero CTA has
 * scrolled away and hides again when the final register section is on screen,
 * so it never duplicates a CTA the visitor can already see.
 */
export default function StickyCta() {
  const [heroGone, setHeroGone] = useState(false);
  const [endInView, setEndInView] = useState(false);

  useEffect(() => {
    const hero = document.querySelector(".hero-cta-row");
    const ends = [document.getElementById("register"), document.querySelector(".atlas-footer")].filter(
      (el): el is HTMLElement => el instanceof HTMLElement
    );
    const inView = new Set<Element>();
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.target === hero) {
          // Only "gone" once scrolled past it, not before reaching it.
          setHeroGone(!e.isIntersecting && e.boundingClientRect.top < 0);
        } else {
          if (e.isIntersecting) inView.add(e.target);
          else inView.delete(e.target);
          setEndInView(inView.size > 0);
        }
      }
    });
    if (hero) io.observe(hero);
    ends.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const show = heroGone && !endInView;

  return (
    <div className={`sticky-cta${show ? " is-visible" : ""}`} aria-hidden={!show}>
      <div className="sticky-cta-copy">
        <strong>Jan 15–17 · Free</strong>
        <span>150 seats · team of 3</span>
      </div>
      <a
        href={registerUrl("sticky_mobile")}
        target="_blank"
        rel="noopener noreferrer"
        className="atlas-button dark"
        tabIndex={show ? 0 : -1}
      >
        Register
        <span className="sr-only"> (opens in a new tab)</span>
      </a>
    </div>
  );
}
