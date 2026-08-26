"use client";

import { useState, useEffect, type JSX } from "react";
import Nav from "@/components/Nav";
import PreRegistrationForm from "@/components/PreRegistrationForm";
import { tracks, hostCityDetails, timeline, steps, prizes, faqs, team, pastEvents } from "@/lib/data";

/* ─── SVG Icon helper ─── */
function Icon({ name, className = "w-6 h-6", style }: { name: string; className?: string; style?: React.CSSProperties }) {
  const s = style || {};
  const icons: Record<string, JSX.Element> = {
    shield: <svg className={className} style={s} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>,
    terminal: <svg className={className} style={s} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>,
    globe: <svg className={className} style={s} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
    users: <svg className={className} style={s} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>,
    heart: <svg className={className} style={s} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>,
    sparkles: <svg className={className} style={s} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>,
    arrow: <svg className={className} style={s} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>,
    check: <svg className={className} style={s} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>,
    chevDown: <svg className={className} style={s} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>,
    mapPin: <svg className={className} style={s} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>,
    trophy: <svg className={className} style={s} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
    bolt: <svg className={className} style={s} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>,
    github: <svg className={className} style={s} fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>,
  };
  return icons[name] || null;
}

const trackAccents = ["var(--red)", "var(--mint)", "var(--purple)", "var(--red)", "var(--mint)", "var(--purple)"];

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
      { threshold: 0.08, rootMargin: "0px 0px -20px 0px" }
    );
    document.querySelectorAll("[data-reveal]").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

/* ─── Site Under Work Modal ─── */
function SiteUnderWorkModal() {
  const [visible, setVisible] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || !visible) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Site under construction notice"
    >
      <div className="card-brutalist max-w-lg w-full p-8">
        <div className="flex items-center gap-2 mb-4">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--red)] opacity-75" />
            <span className="relative inline-flex rounded-full h-3 w-3 bg-[var(--red)]" />
          </span>
          <span className="text-xs font-black text-[var(--red)] tracking-[0.15em] uppercase" style={{ fontFamily: "var(--font-space)" }}>
            Site Under Work &bull; System in Initialization
          </span>
        </div>
        <h2 className="poster-title text-xl mb-3">CyberUtsav Lumbini &mdash; Portal</h2>
        <p className="text-sm leading-relaxed mb-6" style={{ color: "var(--muted)" }}>
          The official pre-registration portal for the Lumbini Provincial Chapter
          (Hosted in Butwal City, co-organized by ButwalHacks &amp; Tech Gurkha Digital
          Services) is currently being finalized. Full schedule, venue map, and
          registration will open soon!
        </p>
        <ul className="space-y-2 text-sm mb-6" style={{ color: "var(--muted)" }}>
          <li className="flex items-center gap-2">
            <Icon name="mapPin" className="w-4 h-4 shrink-0" style={{ color: "var(--purple)" }} />
            Host Location: Butwal City, Lumbini Province
          </li>
          <li className="flex items-center gap-2">
            <Icon name="trophy" className="w-4 h-4 shrink-0" style={{ color: "var(--red)" }} />
            Winners advance directly to Kathmandu Grand Finale
          </li>
          <li className="flex items-center gap-2">
            <Icon name="users" className="w-4 h-4 shrink-0" style={{ color: "var(--red)" }} />
            Co-Organized by ButwalHacks Ecosystem
          </li>
        </ul>
        <button onClick={() => setVisible(false)} className="atlas-button dark w-full">
          Continue to Preview Site
        </button>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════
   MAIN PAGE
   ═══════════════════════════════════════ */
export default function CyberUtsavLumbini() {
  useScrollReveal();

  return (
    <>
      <Nav />

      {/* ═══ SITE UNDER WORK MODAL ═══ */}
      <SiteUnderWorkModal />

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
            <a href="#register" className="atlas-button dark">
              Pre-Register Now <Icon name="arrow" className="w-5 h-5" />
            </a>
            <a href="#tracks" className="atlas-button light">
              Explore Tracks
            </a>
          </div>
        </div>

        {/* Decorative event ticket */}
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
            { value: "1200+", label: "Estimated participation" },
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

      {/* ═══ ABOUT / MANIFESTO ═══ */}
      <section id="about" className="section-pad" style={{ background: "var(--paper-2)", scrollMarginTop: "96px" }} data-reveal>
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
              {["1200+ Estimated Participants", "Hosted in Butwal, Lumbini Province", "Grand Finale in Kathmandu", "Free Registration"].map((item) => (
                <li key={item}>
                  <Icon name="check" /> {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="receipt">
            <h3 style={{ fontSize: "26px" }}>Why Pre-Register?</h3>
            <div className="receipt-lines">
              {[
                { num: "01", text: "Early access to workshop schedules and mentor matching." },
                { num: "02", text: "Priority seating for limited-capacity technical sessions." },
                { num: "03", text: "Exclusive digital certificate of interest upon registration." },
              ].map((item) => (
                <article key={item.num}>
                  <em>{item.num}</em>
                  <span>Perk</span>
                  <strong>{item.text}</strong>
                </article>
              ))}
            </div>
            <a href="#register" className="atlas-button dark" style={{ marginTop: "30px" }}>
              Pre-Register <Icon name="arrow" className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Network / Build / Pitch panels */}
        <div className="manifesto-panels">
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
      <section id="tracks" className="track-wall section-pad" style={{ scrollMarginTop: "96px" }} data-reveal>
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
        <div className="track-posters">
          {tracks.map((track, i) => (
            <div key={track.id} className="track-poster" style={{ "--accent": trackAccents[i % trackAccents.length] } as React.CSSProperties}>
              <div className="track-number">{`0${i + 1}`}</div>
              <h3>{track.title}</h3>
              <p>{track.description}</p>
              <ul>
                {track.examples.map((ex) => (
                  <li key={ex}>{ex}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ PROCESS + TIMELINE ═══ */}
      <section id="schedule" className="route-section section-pad" style={{ scrollMarginTop: "96px" }} data-reveal>
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
              <span>{s.step}</span>
              <h3>{s.title}</h3>
              <p>{s.description}</p>
            </article>
          ))}
        </div>

        <div className="format-tickets">
          {timeline.map((t) => (
            <article key={t.phase}>
              <span>{t.phase}</span>
              <h3>{t.title}</h3>
              <p>{t.description}</p>
            </article>
          ))}
        </div>
      </section>

      {/* ═══ PRIZES ═══ */}
      <section id="prizes" className="section-pad" style={{ scrollMarginTop: "96px" }} data-reveal>
        <div className="section-label">
          <span>04</span>
          <p>Prizes</p>
        </div>
        <div className="rewards-grid">
          <div>
            <h2 className="poster-title">
              Rewards for<br />Innovation
            </h2>
            <p style={{ color: "var(--muted)", fontSize: "17px", fontWeight: 650, lineHeight: 1.7, maxWidth: "560px" }}>
              Cash prizes, professional mentorship, and career-boosting opportunities await the winning teams.
            </p>
          </div>
          <div className="receipt">
            <h3 style={{ fontSize: "26px" }}>Prize Ledger</h3>
            <div className="receipt-lines">
              {prizes.map((p) => (
                <article key={p.title}>
                  <Icon name="trophy" />
                  <span>{p.title}</span>
                  <strong>{p.value}</strong>
                  <em>{p.note}</em>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ HOST CITY (Butwal round) ═══ */}
      <section id="butwal" className="passport section-pad" style={{ scrollMarginTop: "96px" }} data-reveal>
        <div className="section-label">
          <span>05</span>
          <p>The Butwal Round</p>
        </div>
        <div className="passport-heading">
          <h2 className="poster-title">
            One Province.<br /><span style={{ color: "var(--red)" }}>One Host City.</span>
          </h2>
          <p>
            The entire Lumbini chapter converges in Butwal — a 3-day provincial qualifier where winning teams advance directly to the Kathmandu Grand Finale.
          </p>
        </div>
          <div className="city-details-grid">
            {hostCityDetails.map((detail) => (
              <article key={detail.label}>
                <span>{detail.label}</span>
                <strong>{detail.value}</strong>
              </article>
            ))}
          </div>
      </section>

      {/* ═══ ORGANIZING TEAM ═══ */}
      <section id="team" className="team-roster section-pad" style={{ scrollMarginTop: "96px" }} data-reveal>
        <div className="section-label">
          <span>06</span>
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
            <Icon name="bolt" className="w-8 h-8" />
          </div>
          <div>
            <span className="stamp stamp-blue" style={{ transform: "rotate(-1deg)" }}>Co-Organizer</span>
            <h3 className="poster-title" style={{ marginTop: "16px" }}>
              <span style={{ color: "var(--red)" }}>ButwalHacks</span>
            </h3>
            <p style={{ color: "rgba(243, 234, 216, 0.78)", fontWeight: 700, lineHeight: 1.7, marginTop: "12px" }}>
              The driving force behind the Lumbini Chapter. ButwalHacks is Butwal&apos;s
              student developer community — building, teaching, and organizing hackathons
              to put western Nepal on the innovation map.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", marginTop: "20px" }}>
              <a href="https://github.com/butwalhacks" target="_blank" rel="noopener noreferrer" className="team-socials-link">
                <Icon name="github" /> GitHub
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer" className="team-socials-link">
                <svg style={{ width: 14, height: 14 }} fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                LinkedIn
              </a>
            </div>
          </div>
        </div>

        {/* Placeholder team grid */}
        <div className="team-grid" style={{ marginTop: "42px" }}>
          {team.map((member) => (
            <article key={member.name}>
              <div style={{ display: "grid", placeItems: "center", height: "160px", borderBottom: "3px solid var(--ink)", background: "var(--paper-2)" }}>
                <span style={{ fontFamily: "var(--font-archivo), 'Archivo Black', Impact, sans-serif", fontSize: "52px", color: member.color }} aria-hidden="true">
                  {member.initials}
                </span>
              </div>
              <div style={{ padding: "22px" }}>
                <h3 style={{ fontFamily: "var(--font-archivo), 'Archivo Black', Impact, sans-serif", fontSize: "clamp(22px, 2vw, 28px)", lineHeight: 0.92, textTransform: "uppercase", letterSpacing: "-0.05em" }}>
                  {member.name}
                </h3>
                <p className="team-role">
                  <Icon name="mapPin" /> {member.role}
                </p>
                <span style={{ display: "inline-block", marginTop: "10px", color: "var(--muted)", fontFamily: "var(--font-space), 'Space Grotesk', Inter, sans-serif", fontSize: "12px", fontWeight: 900, textTransform: "uppercase", letterSpacing: "0.08em" }}>
                  {member.org}
                </span>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ═══ PAST EVENTS ═══ */}
      <section id="past-events" className="section-pad" style={{ scrollMarginTop: "96px" }} data-reveal>
        <div className="section-label">
          <span>07</span>
          <p>Past Events</p>
        </div>
        <div style={{ textAlign: "center", marginBottom: "48px" }}>
          <h2 className="poster-title" style={{ marginBottom: "16px" }}>
            What We&apos;ve <span style={{ color: "var(--red)" }}>Built Before</span>
          </h2>
          <p style={{ color: "var(--muted)", fontWeight: 700, lineHeight: 1.7, maxWidth: "640px", margin: "0 auto" }}>
            From national hackathon finals to local community workshops — a track record
            of empowering student builders across Nepal through CyberUtsav and ButwalHacks.
          </p>
        </div>
        <div className="past-events-grid">
          {pastEvents.map((event, i) => (
            <article key={i} className={`past-event-card past-event-${event.type}`}>
              <div className="past-event-head">
                <span className="past-event-year">{event.year}</span>
                <span className={`past-event-badge ${event.type === "butwalhacks" ? "badge-bwh" : "badge-cu"}`}>
                  {event.organizer}
                </span>
              </div>
              <h3 className="past-event-title">{event.title}</h3>
              <p className="past-event-subtitle">{event.subtitle}</p>
              <p className="past-event-desc">{event.description}</p>
              <ul className="past-event-highlights">
                {event.highlights.map((h) => (
                  <li key={h}>{h}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      {/* ═══ SPONSORS ═══ */}
      <section id="sponsors" className="section-pad" style={{ scrollMarginTop: "96px" }} data-reveal>
        <div className="section-label">
          <span>08</span>
          <p>Sponsors &amp; Partners</p>
        </div>
        <div style={{ textAlign: "center", marginBottom: "48px" }}>
          <h2 className="poster-title" style={{ marginBottom: "16px" }}>
            Backed By <span style={{ color: "var(--purple)" }}>The Best</span>
          </h2>
          <p style={{ color: "var(--muted)", fontWeight: 700, lineHeight: 1.7, maxWidth: "600px", margin: "0 auto" }}>
            CyberUtsav Lumbini is made possible by organizations and communities
            that believe in empowering Nepal&apos;s next generation of builders.
          </p>
        </div>
        <div className="sponsor-tiers">
          {/* Title Sponsor */}
          <div className="sponsor-tier">
            <span className="stamp stamp-red" style={{ transform: "rotate(-1deg)" }}>Title Sponsor</span>
            <div className="sponsor-placeholder-grid">
              {[1].map((i) => (
                <div key={i} className="sponsor-card sponsor-card-lg">
                  <span className="sponsor-card-label">Your Brand Here</span>
                </div>
              ))}
            </div>
          </div>
          {/* Gold Sponsors */}
          <div className="sponsor-tier">
            <span className="stamp stamp-blue" style={{ transform: "rotate(-1deg)" }}>Gold Partners</span>
            <div className="sponsor-placeholder-grid">
              {[1, 2, 3].map((i) => (
                <div key={i} className="sponsor-card">
                  <span className="sponsor-card-label">Partner {i}</span>
                </div>
              ))}
            </div>
          </div>
          {/* Community Partners */}
          <div className="sponsor-tier">
            <span className="stamp" style={{ transform: "rotate(-1deg)", color: "var(--mint)" }}>Community Partners</span>
            <div className="sponsor-placeholder-grid">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="sponsor-card sponsor-card-sm">
                  <span className="sponsor-card-label">Community {i}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div style={{ textAlign: "center", marginTop: "48px" }}>
          <p style={{ color: "var(--muted)", fontWeight: 700, marginBottom: "20px" }}>
            Interested in sponsoring CyberUtsav Lumbini?
          </p>
          <a href="mailto:prarambha@butwalhacks.com" className="atlas-button dark">
            Become a Sponsor <Icon name="arrow" className="w-4 h-4" />
          </a>
        </div>
      </section>

      {/* ═══ CODE OF CONDUCT ═══ */}
      <section id="coc" className="section-pad" style={{ background: "var(--paper-2)", scrollMarginTop: "96px" }} data-reveal>
        <div className="section-label">            <span>09</span>
            <p>Code of Conduct &amp; Links</p>
        </div>
        <div style={{ maxWidth: "960px", margin: "0 auto" }}>
          <h2 className="poster-title" style={{ marginBottom: "24px" }}>
            Code of <span style={{ color: "var(--red)" }}>Conduct</span>
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "24px" }}>
            <div className="receipt" style={{ boxShadow: "7px 7px 0 var(--ink)" }}>
              <h3 style={{ fontSize: "22px" }}>Our Commitment</h3>
              <p style={{ color: "var(--muted)", fontWeight: 700, lineHeight: 1.7, marginTop: "16px" }}>
                CyberUtsav Lumbini is dedicated to providing a harassment-free
                experience for everyone. We do not tolerate harassment of
                participants in any form.
              </p>
            </div>
            <div className="receipt" style={{ boxShadow: "7px 7px 0 var(--ink)" }}>
              <h3 style={{ fontSize: "22px" }}>Event Links</h3>
              <div style={{ display: "grid", gap: "12px", marginTop: "20px" }}>
                <a href="https://butwalhacks.com" target="_blank" rel="noopener noreferrer" className="event-link-card">
                  <Icon name="bolt" className="w-5 h-5" style={{ color: "var(--red)" }} />
                  <div>
                    <strong>ButwalHacks</strong>
                    <span>Community &amp; Co-Organizer</span>
                  </div>
                </a>
                <a href="https://cyberutsav.com" target="_blank" rel="noopener noreferrer" className="event-link-card">
                  <Icon name="shield" className="w-5 h-5" style={{ color: "var(--red)" }} />
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
          <p style={{ color: "var(--muted)", fontWeight: 650, lineHeight: 1.7, marginTop: "28px", fontSize: "15px" }}>
            CyberUtsav Lumbini is a provincial chapter selection round under the
            national CyberUtsav series organized by Tech Gurkha Digital Services.
            Winning teams from Butwal advance directly to the Kathmandu Grand Finale.
          </p>
        </div>
      </section>

      {/* ═══ FAQ ═══ */}
      <section className="section-pad" data-reveal>
        <div className="faq-new">
          <div className="section-label">
            <span>10</span>
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
        </div>
      </section>

      {/* ═══ PRE-REGISTRATION FORM ═══ */}
      <section id="register" className="form-section section-pad" style={{ scrollMarginTop: "96px" }}>
        <div className="form-section-inner">
          <div className="form-section-intro">
            <div style={{ display: "flex", justifyContent: "center", marginBottom: "28px" }}>
              <div className="section-label" style={{ display: "flex", marginBottom: 0 }}>
                <span>11</span>
                <p>Pre-Registration</p>
              </div>
            </div>
            <h2 className="poster-title">Secure Your Spot</h2>
            <p>
              Complete the 4-step form below. Pre-registration is free and takes less than 2 minutes.
            </p>
          </div>
          <PreRegistrationForm />
        </div>
      </section>

      {/* ═══ CTA BANNER ═══ */}
      <section className="register-poster" aria-label="Register call to action">
        <Icon name="bolt" />
        <div>
          <span className="stamp">Limited Capacity</span>
          <h2 className="poster-title">Ready to Pick Your Track?</h2>
          <p>
            Form a team of 3 members and start shaping your CyberUtsav project idea. Registration opens soon.
          </p>
        </div>
        <a href="#register" className="atlas-button paper">
          Register Now <Icon name="arrow" className="w-4 h-4" />
        </a>
      </section>

      {/* ═══ FOOTER ═══ */}
      <footer className="atlas-footer">
        <div>
          <div className="atlas-footer-brand">
            CYBER UTSAV <em>LUMBINI</em>
          </div>
          <p>
            The Lumbini Provincial Chapter of Nepal&apos;s biggest student hackathon — hosted in Butwal, co-organized by ButwalHacks. Winners advance to the Kathmandu Grand Finale.
          </p>
        </div>
        <div>
          <h3>Organizers</h3>
          <p style={{ marginTop: "12px", fontWeight: 750 }}>Tech Gurkha Digital Services</p>
          <p style={{ color: "var(--red)", marginTop: "8px", fontWeight: 900 }}>ButwalHacks (Co-Organizer)</p>
        </div>
        <div>
          <h3>Links</h3>
          <a href="#">Code of Conduct</a>
          <a href="#">Privacy Policy</a>
          <a href="mailto:prarambha@butwalhacks.com">Contact Us</a>
        </div>
        <div>
          <h3>National Series</h3>
          <a href="https://cyberutsav.com" target="_blank" rel="noopener noreferrer">CyberUtsav (Parent)</a>
          <a href="https://butwalhacks.com" target="_blank" rel="noopener noreferrer">ButwalHacks</a>
          <a href="https://github.com/Prarambha369/CyberUtsavLumbini" target="_blank" rel="noopener noreferrer" className="footer-github" aria-label="GitHub" style={{ display: "inline-flex", alignItems: "center", gap: "8px", marginTop: "16px" }}>
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
