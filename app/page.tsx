"use client";

import { useState, useEffect, type JSX } from "react";
import Image from "next/image";
import Nav from "@/components/Nav";
import { tracks, hostCityDetails, timeline, steps, prizes, faqs, team, REGISTER_URL, CONTACT_EMAIL } from "@/lib/data";

/* ─── SVG Icon helper ─── */
function Icon({ name, className = "w-6 h-6", style }: { name: string; className?: string; style?: React.CSSProperties }) {
  const s = style || {};
  const a = { "aria-hidden": true as const, focusable: "false" as const };
  const icons: Record<string, JSX.Element> = {
    shield: <svg className={className} style={s} {...a} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>,
    terminal: <svg className={className} style={s} {...a} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>,
    globe: <svg className={className} style={s} {...a} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
    users: <svg className={className} style={s} {...a} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>,
    heart: <svg className={className} style={s} {...a} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>,
    sparkles: <svg className={className} style={s} {...a} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>,
    arrow: <svg className={className} style={s} {...a} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>,
    check: <svg className={className} style={s} {...a} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>,
    chevDown: <svg className={className} style={s} {...a} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>,
    mapPin: <svg className={className} style={s} {...a} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>,
    trophy: <svg className={className} style={s} {...a} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
    bolt: <svg className={className} style={s} {...a} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>,
    calendar: <svg className={className} style={s} {...a} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>,
    github: <svg className={className} style={s} {...a} fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>,
  };
  return icons[name] || null;
}

const trackAccents = ["var(--red)", "var(--mint)", "var(--purple)", "var(--red)", "var(--mint)", "var(--purple)"];

const slides = [
  { src: "/Slideshow/winner.jpg", alt: "Winning team celebrating with medals and trophy at a previous CyberUtsav round" },
  { src: "/Slideshow/winner2.jpg", alt: "Prize winners on stage at a previous CyberUtsav event" },
  { src: "/Slideshow/winner3.png", alt: "Participants receiving awards at a previous CyberUtsav round" },
  { src: "/Slideshow/winner4.png", alt: "Team photo of winners at a previous CyberUtsav hackathon" },
  { src: "/Slideshow/winner5.png", alt: "Award ceremony moment from a previous CyberUtsav hackathon" },
];

/** Opens in a new tab; announces that to screen readers. */
function RegisterLink({ className, children, style }: { className: string; children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <a href={REGISTER_URL} target="_blank" rel="noopener noreferrer" className={className} style={style}>
      {children}
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  );
}

/* ─── Slideshow Hook ─── */
function useSlideshow(count: number, interval = 4000) {
  const [active, setActive] = useState(0);
  // Hover and keyboard focus pause independently; rotate only when neither applies.
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const paused = hovered || focused;

  useEffect(() => {
    if (paused) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // Re-created whenever `active` changes, so a manual pick restarts the timer.
    const id = setTimeout(() => setActive((prev) => (prev + 1) % count), interval);
    return () => clearTimeout(id);
  }, [active, paused, count, interval]);

  return { active, goTo: setActive, setHovered, setFocused };
}

/* ─── Scroll Reveal Hook ─── */
function useScrollReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.05, rootMargin: "0px 0px -20px 0px" }
    );
    document.querySelectorAll("[data-reveal]").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

/* ═══════════════════════════════════════
   MAIN PAGE
   ═══════════════════════════════════════ */
/** The main home page for CyberUtsav Lumbini, featuring hero, tracks, schedule, team, FAQ, and registration CTAs. */
export default function CyberUtsavLumbini() {
  useScrollReveal();
  const { active, goTo, setHovered, setFocused } = useSlideshow(slides.length);

  return (
    <>
      <a href="#main" className="skip-link">Skip to content</a>
      <Nav />

      {/* ═══ HERO POSTER ═══ */}
      <header className="poster-hero">
        <span className="poster-word" aria-hidden="true">
          UTSAV
        </span>

        <div>
          <div className="hero-meta">
            <span className="stamp stamp-red">Lumbini Provincial Chapter</span>
            <span className="stamp stamp-blue">Host City: Butwal</span>
          </div>
          <h1 className="poster-title">
            CyberUtsav<br />
            <span style={{ color: "var(--red)" }}>Lumbini</span>
          </h1>
          <p className="hero-lede">
            The Lumbini Provincial Chapter of Nepal&apos;s biggest student hackathon.
            A selection round where regional winning teams secure direct entry to the
            Kathmandu Grand Finale.
            <span className="hero-org-tag">Co-organized by ButwalHacks</span>
          </p>
          <div className="hero-cta-row">
            <RegisterLink className="atlas-button dark">
              Pre-Register Free <Icon name="arrow" className="w-5 h-5" />
            </RegisterLink>
            <a href="#tracks" className="atlas-button light">
              Explore Tracks
            </a>
          </div>
          <p className="hero-status">
            <span className="live-dot" aria-hidden="true" />
            Pre-registration is open · Dates &amp; venue announced soon
          </p>
        </div>

        {/* Event ticket — at-a-glance facts */}
        <aside className="hero-ticket" aria-label="Event at a glance">
          <div className="hero-ticket-head">
            <span>Admit One Team</span>
            <span>N&deg; L01</span>
          </div>
          <div className="hero-ticket-body">
            <div className="hero-ticket-row">
              <strong>Butwal</strong>
              <span>Venue &mdash; Lumbini Province</span>
              <em>TBA</em>
            </div>
            <div className="hero-ticket-row">
              <strong>3 Days</strong>
              <span>Format &mdash; 12 hrs of building</span>
              <em>On-site</em>
            </div>
            <div className="hero-ticket-row">
              <strong>Team of 3</strong>
              <span>Eligibility &mdash; Students &amp; grads</span>
              <em>All tracks</em>
            </div>
          </div>
          <div className="hero-ticket-foot">
            <span>CyberUtsav Lumbini</span>
            <span>Entry Free</span>
          </div>
        </aside>

        {/* Stats strip */}
        <div className="hero-stat-strip">
          {[
            { value: "6", label: "Competition tracks" },
            { value: "150", label: "Max participants" },
            { value: "3", label: "Days of building" },
            { value: "Rs. 0", label: "Registration cost" },
          ].map((stat) => (
            <article key={stat.label}>
              <strong>{stat.value}</strong>
              <span>{stat.label}</span>
            </article>
          ))}
        </div>
      </header>

      <main id="main">
        {/* ═══ ABOUT / MANIFESTO ═══ */}
        <section id="about" className="section-pad" style={{ background: "var(--paper-2)" }} data-reveal>
          <div className="section-label">
            <span>01</span>
            <p>About the Event</p>
          </div>
          <div className="manifesto-grid">
            <div>
              <h2 className="poster-title">Lumbini Chapter</h2>
              <div className="manifesto-copy">
                <p>
                  CyberUtsav Lumbini is the Lumbini Provincial Chapter of CyberUtsav,
                  Nepal&apos;s largest student-focused hackathon series organized by
                  Tech Gurkha Digital Services.
                </p>
                <p>
                  This provincial selection round brings the national platform home
                  to Butwal — giving western Nepal&apos;s student builders a local stage
                  to build, pitch, and earn a direct route to the Kathmandu Grand Finale.
                </p>
              </div>
              <ul className="manifesto-checklist">
                {["150 Max Participants", "Hosted in Butwal, Lumbini Province", "Grand Finale in Kathmandu", "Free Registration"].map((item) => (
                  <li key={item}>
                    <Icon name="check" /> {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="receipt">
              <h3 style={{ fontSize: "26px" }}>Why Pre-Register?</h3>
              <ol className="receipt-lines numbered" style={{ listStyle: "none", padding: 0, margin: "34px 0 0" }}>
                {[
                  { num: "01", text: "Early access to workshop schedules and mentor matching." },
                  { num: "02", text: "Priority seating for limited-capacity technical sessions." },
                  { num: "03", text: "Exclusive digital certificate of interest upon registration." },
                ].map((item) => (
                  <li key={item.num}>
                    <article>
                      <em aria-hidden="true">{item.num}</em>
                      <strong>{item.text}</strong>
                    </article>
                  </li>
                ))}
              </ol>
              <RegisterLink className="atlas-button dark" style={{ marginTop: "30px" }}>
                Pre-Register Free <Icon name="arrow" className="w-4 h-4" />
              </RegisterLink>
            </div>
          </div>

          {/* Network / Build / Pitch panels */}
          <div className="manifesto-panels stagger-children">
            {[
              { title: "Network", desc: "Regional rounds make innovation local before it becomes national.", icon: "users" },
              { title: "Build", desc: "Teams move from idea to working prototype under real event pressure.", icon: "terminal" },
              { title: "Pitch", desc: "Students learn to tell the story behind the solution, not just ship code.", icon: "sparkles" },
            ].map((f) => (
              <article key={f.title}>
                <Icon name={f.icon} className="w-8 h-8" />
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
              </article>
            ))}
          </div>
        </section>

        {/* ═══ TRACKS ═══ */}
        <section id="tracks" className="track-wall section-pad" data-reveal>
          <div className="section-label">
            <span>02</span>
            <p>Hackathon Tracks</p>
          </div>
          <div className="wall-heading">
            <h2 className="poster-title">
              Competition<br />Tracks
            </h2>
            <p>
              Build in the track that fits your idea. CyberUtsav welcomes projects across software, hardware, AI, web, cybersecurity, and impact-driven innovation.
            </p>
          </div>
          <div className="track-posters stagger-children">
            {tracks.map((track, i) => (
              <article key={track.id} className="track-poster" style={{ "--accent": trackAccents[i % trackAccents.length] } as React.CSSProperties}>
                <div className="track-number" aria-hidden="true">{`0${i + 1}`}</div>
                <h3>{track.title}</h3>
                <p>{track.description}</p>
                <ul aria-label={`${track.title} project ideas`}>
                  {track.examples.map((ex) => (
                    <li key={ex}>{ex}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        {/* ═══ PROCESS + TIMELINE ═══ */}
        <section id="schedule" className="route-section section-pad" data-reveal>
          <div className="section-label">
            <span>03</span>
            <p>Process + Event Format</p>
          </div>
          <div className="route-header">
            <h2 className="poster-title">How It Runs</h2>
            <p>
              Three phases take teams from first idea to the national stage — the Butwal round sends its champions straight to Kathmandu.
            </p>
          </div>
          <div className="route-board">
            {steps.map((s) => (
              <article key={s.step}>
                <span aria-hidden="true">{s.step}</span>
                <h3>{s.title}</h3>
                <p>{s.description}</p>
              </article>
            ))}
          </div>

          <div className="format-tickets stagger-children">
            {timeline.map((t) => (
              <article key={t.phase}>
                <span>{t.phase}</span>
                <h3>{t.title}</h3>
                <p>{t.description}</p>
              </article>
            ))}
          </div>
        </section>

        {/* ═══ SPONSORS ═══ */}
        <section id="sponsors" className="section-pad" data-reveal>
          <div className="section-label">
            <span>04</span>
            <p>Sponsors &amp; Partners</p>
          </div>
          <div className="section-intro-center">
            <h2 className="poster-title">
              Backed By <span style={{ color: "var(--purple)" }}>The Best</span>
            </h2>
            <p>
              CyberUtsav Lumbini is made possible by organizations and communities
              that believe in empowering Nepal&apos;s next generation of builders.
            </p>
          </div>
          <div className="sponsor-tiers">
            {[
              { label: "Title Sponsor", cls: "stamp stamp-red", style: undefined, size: "sponsor-card-lg" },
              { label: "Gold Partners", cls: "stamp stamp-blue", style: undefined, size: "sponsor-card-lg" },
              { label: "Community Partners", cls: "stamp", style: { color: "var(--mint-text)" }, size: "sponsor-card-lg" },
            ].map((tier) => (
              <div key={tier.label} className="sponsor-tier">
                <span className={tier.cls} style={tier.style}>{tier.label}</span>
                <div className={`sponsor-card ${tier.size}`}>
                  <p>Partners announced soon.<br />This spot could be yours.</p>
                </div>
              </div>
            ))}
          </div>
          <div style={{ textAlign: "center", marginTop: "48px" }}>
            <p style={{ color: "var(--muted)", fontWeight: 700, marginBottom: "20px" }}>
              Interested in sponsoring CyberUtsav Lumbini?
            </p>
            <a href={`mailto:${CONTACT_EMAIL}?subject=Sponsoring%20CyberUtsav%20Lumbini`} className="atlas-button dark">
              Become a Sponsor <Icon name="arrow" className="w-4 h-4" />
            </a>
          </div>
        </section>

        {/* ═══ PRIZES ═══ */}
        <section id="prizes" className="section-pad" data-reveal>
          <div className="section-label">
            <span>05</span>
            <p>Prizes</p>
          </div>
          <div className="rewards-grid">
            <div>
              <h2 className="poster-title">
                Rewards for<br />Innovation
              </h2>
              <p style={{ marginTop: "20px", color: "var(--muted)", fontSize: "17px", fontWeight: 650, lineHeight: 1.7, maxWidth: "560px" }}>
                Cash prizes, professional mentorship, and career-boosting opportunities await the winning teams.
              </p>
              <div
                className="slideshow-container"
                role="region"
                aria-roledescription="carousel"
                aria-label="Winners from previous CyberUtsav rounds"
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
                onFocus={() => setFocused(true)}
                onBlur={(e) => {
                  // Stay paused while focus moves between photo buttons.
                  if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setFocused(false);
                }}
              >
                {slides.map((slide, i) => (
                  <div
                    key={slide.src}
                    className={`slide${i === active ? " slide-active" : ""}`}
                    aria-hidden={i !== active}
                  >
                    <Image src={slide.src} alt={slide.alt} fill sizes="(max-width: 980px) 100vw, 640px" />
                  </div>
                ))}
                <div className="slide-dots">
                  {slides.map((slide, i) => (
                    <button
                      key={slide.src}
                      type="button"
                      className="slide-dot"
                      onClick={() => goTo(i)}
                      aria-label={`Show photo ${i + 1} of ${slides.length}`}
                      aria-current={i === active}
                    />
                  ))}
                </div>
              </div>
            </div>
            <div className="receipt">
              <h3 style={{ fontSize: "26px" }}>Prize Ledger</h3>
              <div className="receipt-lines">
                {prizes.map((p) => (
                  <article key={p.title}>
                    <Icon name="trophy" />
                    <span>{p.title}</span>
                    <strong>{p.value}</strong>
                    <em className="is-tba">{p.note}</em>
                  </article>
                ))}
              </div>
              <p className="receipt-note">
                Prize details will be published here once confirmed with sponsors.
              </p>
            </div>
          </div>
        </section>

        {/* ═══ HOST CITY (Butwal round) ═══ */}
        <section id="butwal" className="passport section-pad" style={{ background: "var(--paper-2)" }} data-reveal>
          <div className="section-label">
            <span>06</span>
            <p>The Butwal Round</p>
          </div>
          <div className="passport-heading">
            <h2 className="poster-title">
              One Province.<br /><span style={{ color: "var(--red)" }}>One Host City.</span>
            </h2>
            <p>
              The entire Lumbini chapter converges in Butwal for a 3-day provincial qualifier where winning teams advance directly to the Kathmandu Grand Finale.
            </p>
          </div>
          <div className="city-details-grid">
            {hostCityDetails.map((detail) => {
              const isTBD = /TBA|To be announced/.test(detail.value);
              return (
                <article key={detail.label}>
                  <span>{detail.label}</span>
                  <strong className={isTBD ? "is-tba" : undefined}>{detail.value}</strong>
                </article>
              );
            })}
          </div>
          <div style={{ marginTop: "48px", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(280px, 100%), 1fr))", gap: "20px" }}>
            <div className="receipt info-card">
              <h3><Icon name="calendar" /> Format</h3>
              <p>
                A 3-day hackathon with 12 total hours of project building. Teams of 3 will develop, pitch, and compete for the championship title.
              </p>
            </div>
            <div className="receipt info-card">
              <h3><Icon name="trophy" /> What&apos;s at Stake</h3>
              <p>
                Winners advance directly to the Kathmandu Grand Finale competing for the champion trophy, cash prizes, and career-boosting opportunities.
              </p>
            </div>
            <div className="receipt info-card">
              <h3><Icon name="mapPin" /> Where</h3>
              <p>
                Butwal, Lumbini Province, Nepal. The venue is a partner institution — details confirmed closer to the event date.
              </p>
            </div>
          </div>
        </section>

        {/* ═══ ORGANIZING TEAM ═══ */}
        <section id="team" className="team-roster section-pad" data-reveal>
          <div className="section-label">
            <span>07</span>
            <p>Organizing Team</p>
          </div>
          <div className="team-roster-head">
            <h2 className="poster-title">
              The People <span style={{ color: "var(--red)" }}>Behind It</span>
            </h2>
            <p>
              A cross-organizational team of students, developers, and community builders making CyberUtsav Lumbini happen.
            </p>
          </div>

          {/* ButwalHacks spotlight */}
          <div className="butwalhacks-spotlight">
            <div className="butwalhacks-spotlight-badge">
              <Image src="/BHlogo.jpg" alt="ButwalHacks logo" width={64} height={64} />
            </div>
            <div>
              <span className="stamp stamp-blue">Co-Organizer</span>
              <h3 className="poster-title butwalhacks-spotlight-title">ButwalHacks</h3>
              <p className="butwalhacks-spotlight-copy">
                The driving force behind the Lumbini Chapter. ButwalHacks is Butwal&apos;s
                student developer community — building, teaching, and organizing hackathons
                to put western Nepal on the innovation map.
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", marginTop: "20px" }}>
                <a href="https://github.com/butwalhacks" target="_blank" rel="noopener noreferrer" className="team-socials-link">
                  <Icon name="github" /> GitHub
                </a>
                <a href="https://butwalhacks.com" target="_blank" rel="noopener noreferrer" className="team-socials-link">
                  <svg aria-hidden="true" style={{ width: 14, height: 14 }} fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C6.48 0 2 4.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 0 12 0zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg> Website
                </a>
                <a href="https://www.linkedin.com/company/butwalhacks" target="_blank" rel="noopener noreferrer" className="team-socials-link">
                  <svg aria-hidden="true" style={{ width: 14, height: 14 }} fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg> LinkedIn
                </a>
              </div>
            </div>
          </div>

          {/* Team grid */}
          <div className="team-grid" style={{ marginTop: "42px" }}>
            {team.map((member) => (
              <article key={member.name}>
                <div style={{ position: "relative", display: "grid", placeItems: "center", aspectRatio: "1 / 0.95", borderBottom: "3px solid var(--ink)", background: "var(--paper-2)", overflow: "hidden" }}>
                  {member.photo ? (
                    <Image src={member.photo} alt={`Portrait of ${member.name}`} fill sizes="(max-width: 640px) 100vw, (max-width: 1100px) 50vw, 300px" style={{ objectFit: "cover", objectPosition: "center top" }} />
                  ) : (
                    <span style={{ fontFamily: "var(--font-archivo), 'Archivo Black', Impact, sans-serif", fontSize: "52px", color: member.color }} aria-hidden="true">
                      {member.initials}
                    </span>
                  )}
                </div>
                <div style={{ padding: "22px" }}>
                  <h3 style={{ marginTop: 0, fontSize: "clamp(22px, 2vw, 28px)" }}>
                    {member.name}
                  </h3>
                  <p className="team-role">{member.role}</p>
                  <span style={{ display: "inline-block", marginTop: "10px", color: "var(--muted)", fontFamily: "var(--font-space), 'Space Grotesk', Inter, sans-serif", fontSize: "12px", fontWeight: 900, textTransform: "uppercase", letterSpacing: "0.08em" }}>
                    {member.org}
                  </span>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* ═══ CODE OF CONDUCT ═══ */}
        <section id="coc" className="section-pad" style={{ background: "var(--paper-2)" }} data-reveal>
          <div className="section-label">
            <span>08</span>
            <p>Code of Conduct &amp; Links</p>
          </div>
          <div style={{ maxWidth: "960px", margin: "0 auto" }}>
            <h2 className="poster-title" style={{ marginBottom: "32px" }}>
              Code of <span style={{ color: "var(--red)" }}>Conduct</span>
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(280px, 100%), 1fr))", gap: "24px", alignItems: "start" }}>
              <div className="receipt info-card">
                <h3 style={{ fontSize: "22px" }}>Our Commitment</h3>
                <p style={{ marginTop: "16px" }}>
                  CyberUtsav Lumbini is dedicated to providing a harassment-free
                  experience for everyone. We do not tolerate harassment of
                  participants in any form.
                </p>
                <p>
                  <strong>Tech Gurkha Digital Services</strong> commits to maintaining
                  a safe, inclusive, and respectful environment for all participants,
                  mentors, volunteers, and sponsors. Any form of discrimination,
                  harassment, or abusive behavior will not be tolerated.
                </p>
                <p>
                  <strong>ButwalHacks</strong> upholds the same standard of conduct
                  for all its events and community members. Participants are expected
                  to follow the Code of Conduct at all times during the event.
                </p>
                <p>
                  Reports of violations can be made to{" "}
                  <a href={`mailto:${CONTACT_EMAIL}?subject=Code%20of%20Conduct%20report`} className="inline-link">{CONTACT_EMAIL}</a>.
                </p>
              </div>
              <div className="receipt">
                <h3 style={{ fontSize: "22px" }}>Event Links</h3>
                <div style={{ display: "grid", gap: "12px", marginTop: "20px" }}>
                  <a href="https://butwalhacks.com" target="_blank" rel="noopener noreferrer" className="event-link-card">
                    <Image src="/BHlogo.jpg" alt="" width={24} height={24} />
                    <div>
                      <strong>ButwalHacks</strong>
                      <span>Community &amp; Co-Organizer</span>
                    </div>
                  </a>
                  <a href="https://cyberutsav.com" target="_blank" rel="noopener noreferrer" className="event-link-card">
                    <Image src="/CUlogo.jpg" alt="" width={24} height={24} />
                    <div>
                      <strong>CyberUtsav</strong>
                      <span>Parent Event — National Series</span>
                    </div>
                  </a>
                  <a href="https://github.com/Prarambha369/CyberUtsavLumbini" target="_blank" rel="noopener noreferrer" className="event-link-card">
                    <Icon name="github" className="w-5 h-5" />
                    <div>
                      <strong>GitHub Repo</strong>
                      <span>Open source project code</span>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══ FAQ ═══ */}
        <section id="faq" className="section-pad" data-reveal>
          <div className="faq-new">
            <div className="section-label">
              <span>09</span>
              <p>Frequently Asked</p>
            </div>
            <h2 className="poster-title">FAQ</h2>
            <div className="faq-stack">
              {faqs.map((f) => (
                <details key={f.question}>
                  <summary>
                    <span>{f.question}</span>
                    <Icon name="chevDown" />
                  </summary>
                  <p>{f.answer}</p>
                </details>
              ))}
            </div>
            <p style={{ marginTop: "28px", textAlign: "center", color: "var(--muted)", fontWeight: 650 }}>
              Still have a question?{" "}
              <a href={`mailto:${CONTACT_EMAIL}`} className="inline-link">Email the organizers</a>
            </p>
          </div>
        </section>

        {/* ═══ REGISTER CTA ═══ */}
        <section id="register" className="register-poster" aria-labelledby="register-title">
          <Icon name="bolt" />
          <div>
            <span className="stamp">Limited to 150 participants</span>
            <h2 id="register-title" className="poster-title">Ready to Pick Your Track?</h2>
            <p>
              Form a team of 3 and secure your spot. Pre-registration is free and takes less than 2 minutes.
            </p>
          </div>
          <RegisterLink className="atlas-button paper">
            Pre-Register Free <Icon name="arrow" className="w-4 h-4" />
          </RegisterLink>
        </section>
      </main>

      {/* ═══ FOOTER ═══ */}
      <footer className="atlas-footer">
        <div>
          <div className="atlas-footer-brand">
            <Image src="/CUlogo.jpg" alt="CyberUtsav" width={48} height={48} />
          </div>
          <p>
            The Lumbini Provincial Chapter of Nepal&apos;s biggest student hackathon — hosted in Butwal, co-organized by ButwalHacks. Winners advance to the Kathmandu Grand Finale.
          </p>
        </div>
        <div>
          <h3>Organizers</h3>
          <p style={{ marginTop: "12px", fontWeight: 750 }}>Tech Gurkha Digital Services</p>
          <a href="https://butwalhacks.com" target="_blank" rel="noopener noreferrer">ButwalHacks (Co-Organizer)</a>
        </div>
        <div>
          <h3>Event</h3>
          <a href="#tracks">Tracks</a>
          <a href="#faq">FAQ</a>
          <a href="#coc">Code of Conduct</a>
          <a href={`mailto:${CONTACT_EMAIL}`}>Contact Us</a>
        </div>
        <div>
          <h3>National Series</h3>
          <a href="https://cyberutsav.com" target="_blank" rel="noopener noreferrer">CyberUtsav (Parent)</a>
          <a href="https://github.com/Prarambha369/CyberUtsavLumbini" target="_blank" rel="noopener noreferrer" className="footer-github" style={{ display: "inline-flex", alignItems: "center", gap: "8px", marginTop: "16px" }}>
            <Icon name="github" className="w-5 h-5" /> GitHub
          </a>
        </div>
        <div className="footer-rights">
          <p>
            &copy; 2026 CyberUtsav Lumbini &mdash; Provincial chapter of CyberUtsav. Organized by Tech Gurkha Digital Services. Co-organized by ButwalHacks.
          </p>
        </div>
      </footer>
    </>
  );
}
