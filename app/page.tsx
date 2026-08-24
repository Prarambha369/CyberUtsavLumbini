"use client";

import { useState, useEffect, type JSX } from "react";
import Nav from "@/components/Nav";
import PreRegistrationForm from "@/components/PreRegistrationForm";
import { tracks, cities, timeline, steps, prizes, faqs, team } from "@/lib/data";

/* ─── SVG Icon helper ─── */
function Icon({ name, className = "w-6 h-6" }: { name: string; className?: string }) {
  const icons: Record<string, JSX.Element> = {
    shield: <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>,
    terminal: <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>,
    globe: <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
    users: <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>,
    heart: <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>,
    sparkles: <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>,
    arrow: <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>,
    check: <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>,
    lock: <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>,
    chevDown: <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>,
    chevUp: <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" /></svg>,
    mapPin: <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>,
    trophy: <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
    github: <svg className={className} fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>,
  };
  return icons[name] || null;
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
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Site under construction notice"
    >
      <div className="bg-[#111] border-2 border-[#00D4FF] max-w-lg w-full p-8 neo-shadow-lg relative">
        <div className="flex items-center gap-2 mb-4">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#F59E0B] opacity-75" />
            <span className="relative inline-flex rounded-full h-3 w-3 bg-[#F59E0B]" />
          </span>
          <span className="text-xs font-black text-[#F59E0B] tracking-[0.15em]">
            SITE UNDER WORK &bull; SYSTEM IN INITIALIZATION
          </span>
        </div>
        <h2 className="text-xl font-black mb-3">
          CYBER UTSAV 3.0 &mdash; LUMBINI CHAPTER PORTAL
        </h2>
        <p className="text-sm text-[#A0A0A0] font-sans leading-relaxed mb-6">
          The official pre-registration portal for the Lumbini Provincial Chapter
          (Hosted in Butwal City, co-organized by ButwalHacks & Tech Gurkha Digital
          Services) is currently being finalized. Full schedule, venue map, and
          registration will open soon!
        </p>
        <ul className="space-y-2 text-xs text-[#A0A0A0] font-sans mb-6">
          <li className="flex items-center gap-2">
            <Icon name="mapPin" className="w-4 h-4 text-[#00D4FF] shrink-0" />
            Host Location: Butwal City, Lumbini Province
          </li>
          <li className="flex items-center gap-2">
            <Icon name="trophy" className="w-4 h-4 text-[#F59E0B] shrink-0" />
            Winners advance directly to Kathmandu Grand Finale
          </li>
          <li className="flex items-center gap-2">
            <Icon name="users" className="w-4 h-4 text-[#7542E5] shrink-0" />
            Co-Organized by ButwalHacks Ecosystem
          </li>
        </ul>
        <button
          onClick={() => setVisible(false)}
          className="w-full bg-[#00D4FF] text-black font-black text-sm py-3 border-2 border-black neo-shadow-sm neo-hover cursor-pointer"
        >
          CONTINUE TO PREVIEW SITE
        </button>
      </div>
    </div>
  );
}

/* ─── FAQ Accordion ─── */
function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-2 border-[#222] bg-[#111]">
      <button
        className="w-full px-6 py-4 flex justify-between items-center text-left font-bold text-sm"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        <span>{q}</span>
        <Icon name={open ? "chevUp" : "chevDown"} className="w-5 h-5 text-[#00D4FF] shrink-0" />
      </button>
      {open && (
        <div className="px-6 pb-4 text-sm text-[#A0A0A0] leading-relaxed font-sans">{a}</div>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════
   MAIN PAGE
   ═══════════════════════════════════════ */
export default function CyberUtsavLumbini() {
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#F5F5F5] font-mono selection:bg-[#00D4FF] selection:text-black">
      <Nav />

      {/* ═══ SITE UNDER WORK MODAL ═══ */}
      <SiteUnderWorkModal />

      {/* ═══ HERO ═══ */}
      <header className="relative overflow-hidden border-b-2 border-[#222] bg-[#0F0F0F]">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#00D4FF] opacity-5 blur-[100px] rounded-full pointer-events-none" aria-hidden="true" />
        <div className="max-w-6xl mx-auto px-4 py-20 md:py-32 relative z-10">
          <div className="inline-block bg-[#F59E0B] text-black font-black px-4 py-1.5 border-2 border-black neo-shadow-sm mb-8 text-xs tracking-[0.15em]">
            LUMBINI PROVINCIAL CHAPTER &bull; HOST CITY: BUTWAL
          </div>
          <h1 className="text-5xl md:text-7xl font-black leading-[0.9] mb-6 tracking-tight">
            CYBER UTSAV 3.0<br />
            <span className="text-[#00D4FF]">LUMBINI CHAPTER</span>
          </h1>
          <p className="text-xl md:text-2xl text-[#A0A0A0] max-w-2xl mb-6 leading-relaxed font-sans">
            Nepal&apos;s biggest student hackathon arrives in Lumbini Province.
            Regional winning teams secure direct entry to the Kathmandu Grand Finale.
            <span className="block mt-3 text-[#F59E0B] font-black text-lg font-mono">
              CO-ORGANIZED BY BUTWALHACKS.
            </span>
          </p>
          <div className="inline-block bg-[#00D4FF]/10 border-2 border-[#00D4FF] px-4 py-2 mb-10 text-xs font-bold text-[#00D4FF] font-mono">
            WINNERS ADVANCE DIRECTLY TO THE KATHMANDU GRAND FINALE
          </div>
          <div className="flex flex-col sm:flex-row gap-5">
            <a href="#register" className="group relative inline-flex items-center justify-center px-8 py-4 font-black text-black bg-[#00D4FF] border-2 border-black neo-shadow neo-hover">
              PRE-REGISTER NOW
              <Icon name="arrow" className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            <a href="#tracks" className="inline-flex items-center justify-center px-8 py-4 font-black text-[#F5F5F5] bg-transparent border-2 border-[#F5F5F5] hover:bg-[#F5F5F5] hover:text-black transition-all duration-200">
              EXPLORE TRACKS
            </a>
          </div>

          {/* Stats strip */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 pt-8 border-t-2 border-[#222]">
            {[
              { value: "5", label: "Countries" },
              { value: "1200+", label: "Estimated participation" },
              { value: "12", label: "Host cities" },
              { value: "₹0", label: "Registration cost" },
            ].map((stat) => (
              <div key={stat.label} className="text-center md:text-left">
                <div className="text-3xl md:text-4xl font-black text-[#00D4FF]">{stat.value}</div>
                <div className="text-xs text-[#555] mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </header>

      {/* ═══ ABOUT ═══ */}
      <section id="about" className="py-20 border-b-2 border-[#222]">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div>
              <div className="text-xs text-[#555] tracking-[0.15em] mb-3">01 &mdash; ABOUT THE EVENT</div>
              <h2 className="text-4xl font-black mb-6 flex items-center gap-3">
                <Icon name="mapPin" className="w-8 h-8 text-[#00D4FF]" />
                LUMBINI CHAPTER
              </h2>
              <p className="text-lg text-[#A0A0A0] mb-6 leading-relaxed font-sans">
                CyberUtsav is Nepal&apos;s largest student-focused hackathon series,
                organized by Tech Gurkha Digital Services for high school students,
                A-Levels students, and recent graduates.
              </p>
              <p className="text-sm text-[#A0A0A0] mb-6 leading-relaxed font-sans">
                The Lumbini provincial chapter marks a historic milestone as the event
                transitions to an international scale, connecting student builders
                across 5 countries and 12 host cities.
              </p>
              <ul className="space-y-3">
                {["1200+ Estimated Participants", "5 Countries, 12 Host Cities", "Grand Finale in Kathmandu", "Free Registration"].map((item) => (
                  <li key={item} className="flex items-center gap-3 font-bold text-[#00D4FF] text-sm font-sans">
                    <Icon name="check" className="w-5 h-5 shrink-0" /> {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-[#1A1A1A] border-2 border-[#00D4FF] p-8 neo-shadow">
              <h3 className="text-2xl font-black mb-6 text-[#F59E0B] flex items-center gap-2">
                <Icon name="lock" className="w-5 h-5" /> WHY PRE-REGISTER?
              </h3>
              <ul className="space-y-5 text-[#A0A0A0] font-sans text-sm">
                {["Early access to workshop schedules and mentor matching.", "Priority seating for limited-capacity technical sessions.", "Exclusive digital certificate of interest upon registration."].map((item, i) => (
                  <li key={i} className="flex gap-4">
                    <span className="text-[#00D4FF] font-black text-lg font-mono shrink-0">0{i + 1}.</span>
                    {item}
                  </li>
                ))}
              </ul>
              <a href="#register" className="mt-8 inline-flex items-center gap-2 px-6 py-3 bg-[#00D4FF] text-black font-black text-sm border-2 border-black neo-shadow-sm neo-hover">
                PRE-REGISTER <Icon name="arrow" className="w-4 h-4" />
              </a>
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-6 mt-16">
            {[
              { title: "Network", desc: "Regional rounds make innovation local before it becomes national." },
              { title: "Build", desc: "Teams move from idea to working prototype under real event pressure." },
              { title: "Pitch", desc: "Students learn to tell the story behind the solution, not just ship code." },
            ].map((f) => (
              <div key={f.title} className="bg-[#111] border-2 border-[#222] p-6 hover:border-[#00D4FF] transition-colors">
                <h3 className="text-lg font-black text-[#00D4FF] mb-2">{f.title}</h3>
                <p className="text-sm text-[#A0A0A0] font-sans leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ TRACKS ═══ */}
      <section id="tracks" className="py-20 border-b-2 border-[#222] bg-[#0A0A0A]">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-xs text-[#555] tracking-[0.15em] mb-3 text-center">02 &mdash; HACKATHON TRACKS</div>
          <h2 className="text-4xl font-black mb-4 text-center">
            COMPETITION <span className="text-[#00D4FF]">TRACKS</span>
          </h2>
          <p className="text-center text-[#A0A0A0] mb-12 font-sans max-w-xl mx-auto">
            Build in the track that fits your idea. CyberUtsav welcomes projects across software, hardware, AI, web, cybersecurity, and impact-driven innovation.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tracks.map((track) => (
              <div key={track.id} className="bg-[#111] border-2 border-[#333] p-6 hover:border-[#00D4FF] neo-hover group cursor-default">
                <div className="w-12 h-12 bg-[#1A1A1A] border-2 border-[#00D4FF] flex items-center justify-center text-[#00D4FF] mb-4 group-hover:bg-[#00D4FF] group-hover:text-black transition-colors">
                  <Icon name={track.icon} />
                </div>
                <h3 className="text-xl font-black mb-2">{track.title}</h3>
                <p className="text-sm text-[#A0A0A0] leading-relaxed font-sans mb-4">{track.description}</p>
                <ul className="space-y-1">
                  {track.examples.map((ex) => (
                    <li key={ex} className="text-xs text-[#555] flex items-center gap-2 font-sans">
                      <span className="w-1 h-1 bg-[#00D4FF] rounded-full shrink-0" /> {ex}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ PROCESS + TIMELINE ═══ */}
      <section id="schedule" className="py-20 border-b-2 border-[#222]">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-xs text-[#555] tracking-[0.15em] mb-3">03 &mdash; PROCESS + EVENT FORMAT</div>
          <h2 className="text-4xl font-black mb-12">
            HOW TO <span className="text-[#00D4FF]">PARTICIPATE</span>
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            {steps.map((s) => (
              <div key={s.step} className="text-center">
                <div className="w-14 h-14 bg-[#00D4FF] text-black font-black text-xl flex items-center justify-center mx-auto mb-4 border-2 border-black neo-shadow-sm">{s.step}</div>
                <h3 className="font-black text-sm mb-1">{s.title}</h3>
                <p className="text-xs text-[#A0A0A0] font-sans">{s.description}</p>
              </div>
            ))}
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {timeline.map((t, i) => (
              <div key={t.phase} className={`bg-[#111] border-2 p-6 ${i === timeline.length - 1 ? "border-[#00D4FF] neo-shadow" : "border-[#333]"}`}>
                <div className="text-xs text-[#555] tracking-widest mb-2">{t.phase}</div>
                <h3 className="text-lg font-black mb-2">{t.title}</h3>
                <p className="text-sm text-[#A0A0A0] font-sans leading-relaxed">{t.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ PRIZES ═══ */}
      <section className="py-20 border-b-2 border-[#222] bg-[#0A0A0A]">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-xs text-[#555] tracking-[0.15em] mb-3">04 &mdash; PRIZES</div>
          <h2 className="text-4xl font-black mb-4">
            REWARDS FOR <span className="text-[#F59E0B]">INNOVATION</span>
          </h2>
          <p className="text-[#A0A0A0] mb-12 font-sans max-w-xl">
            Cash prizes, professional mentorship, and career-boosting opportunities await the winning teams.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {prizes.map((p) => (
              <div key={p.title} className="bg-[#111] border-2 border-[#333] p-6 text-center hover:border-[#F59E0B] transition-colors">
                <Icon name="trophy" className="w-8 h-8 text-[#F59E0B] mx-auto mb-3" />
                <h3 className="font-black text-sm mb-1">{p.title}</h3>
                <div className="text-lg font-black text-[#00D4FF]">{p.value}</div>
                <div className="text-xs text-[#555] mt-1 font-sans">{p.note}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ HOST CITIES ═══ */}
      <section id="cities" className="py-20 border-b-2 border-[#222]">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-xs text-[#555] tracking-[0.15em] mb-3">05 &mdash; HOST CITIES</div>
          <h2 className="text-4xl font-black mb-4">
            12 CITIES, 5 COUNTRIES, <span className="text-[#00D4FF]">ONE MISSION</span>
          </h2>
          <p className="text-[#A0A0A0] mb-12 font-sans max-w-xl">
            Connecting student innovators with regional rounds in Nepal and four international city chapters.
          </p>
          <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {cities.map((c) => (
              <div key={c.name} className={`bg-[#111] border-2 p-4 text-center transition-colors ${c.highlight ? "border-[#00D4FF]" : "border-[#333] hover:border-[#555]"}`}>
                <div className="text-2xl mb-2">{c.flag}</div>
                <div className="font-black text-xs">{c.name}</div>
                <div className="text-[10px] text-[#555]">{c.country}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ FAQ ═══ */}
      <section className="py-20 border-b-2 border-[#222] bg-[#0A0A0A]">
        <div className="max-w-3xl mx-auto px-4">
          <div className="text-xs text-[#555] tracking-[0.15em] mb-3 text-center">07 &mdash; FAQ</div>
          <h2 className="text-4xl font-black mb-12 text-center">
            FREQUENTLY <span className="text-[#00D4FF]">ASKED</span>
          </h2>
          <div className="space-y-3">
            {faqs.map((f) => (
              <FAQItem key={f.question} q={f.question} a={f.answer} />
            ))}
          </div>
        </div>
      </section>

      {/* ═══ ORGANIZING TEAM ═══ */}
      <section id="team" className="py-20 border-b-2 border-[#222] bg-[#0F0F0F]">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-xs text-[#555] tracking-[0.15em] mb-3 text-center">06 &mdash; ORGANIZING TEAM</div>
          <h2 className="text-4xl font-black mb-4 text-center">
            THE PEOPLE <span className="text-[#00D4FF]">BEHIND IT</span>
          </h2>
          <p className="text-center text-[#A0A0A0] mb-12 font-sans max-w-lg mx-auto">
            A cross-organizational team of students, developers, and community builders making CyberUtsav Lumbini happen.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            {team.map((member) => (
              <div key={member.name} className="bg-[#111] border-2 border-[#222] p-6 text-center hover:border-[#00D4FF] transition-colors group">
                <div className="w-20 h-20 mx-auto mb-4 border-2 border-[#333] group-hover:border-[#00D4FF] transition-colors overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={member.photo}
                    alt={member.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      // Hide image, show initials fallback
                      const target = e.target as HTMLImageElement;
                      target.style.display = "none";
                      const fallback = target.nextElementSibling as HTMLElement;
                      if (fallback) fallback.style.display = "flex";
                    }}
                  />
                  <div
                    className="w-full h-full items-center justify-center text-lg font-black hidden"
                    style={{ backgroundColor: member.color + "15", color: member.color }}
                    aria-hidden="true"
                  >
                    {member.initials}
                  </div>
                </div>
                <h3 className="font-black text-sm mb-1">{member.name}</h3>
                <p className="text-xs text-[#00D4FF] font-bold mb-1">{member.role}</p>
                <p className="text-[10px] text-[#555] font-sans">{member.org}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ PRE-REGISTRATION FORM ═══ */}
      <section id="register" className="py-20 bg-[#0F0F0F]">
        <div className="max-w-3xl mx-auto px-4">
          <div className="text-center mb-12">
            <div className="text-xs text-[#555] tracking-[0.15em] mb-3">08 &mdash; PRE-REGISTRATION</div>
            <h2 className="text-4xl font-black mb-4">
              SECURE <span className="text-[#00D4FF]">YOUR SPOT</span>
            </h2>
            <p className="text-[#A0A0A0] font-sans max-w-lg mx-auto">
              Complete the 4-step form below. Pre-registration is free and takes less than 2 minutes.
            </p>
          </div>
          <PreRegistrationForm />
        </div>
      </section>

      {/* ═══ CTA BANNER ═══ */}
      <section className="py-16 bg-[#00D4FF]">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-black text-black mb-4">
            READY TO PICK YOUR TRACK?
          </h2>
          <p className="text-black/70 mb-8 font-sans max-w-lg mx-auto">
            Form a team of 3 members and start shaping your CyberUtsav project idea. Registration opens soon.
          </p>
          <a href="#register" className="inline-flex items-center gap-2 px-8 py-4 bg-black text-[#00D4FF] font-black text-sm border-2 border-black neo-shadow-sm neo-hover">
            REGISTER NOW <Icon name="arrow" className="w-4 h-4" />
          </a>
        </div>
      </section>

      {/* ═══ FOOTER ═══ */}
      <footer className="border-t-2 border-[#222] bg-[#050505] py-12" role="contentinfo">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-[#00D4FF] border border-black flex items-center justify-center font-black text-black text-xs">C3</div>
                <span className="font-black text-lg">CYBER UTSAV 3.0</span>
              </div>
              <p className="text-sm text-[#555] font-sans">
                Nepal&apos;s biggest multi-domain hackathon spanning all 7 provinces and 4 international cities. Organized by Tech Gurkha Digital Services.
              </p>
            </div>
            <div>
              <h4 className="font-black text-[#00D4FF] mb-4 text-sm">ORGANIZERS</h4>
              <ul className="space-y-2 text-sm text-[#A0A0A0] font-sans">
                <li>Tech Gurkha Digital Services</li>
                <li className="text-[#F59E0B] font-black">ButwalHacks (Co-Organizer)</li>
              </ul>
            </div>
            <div>
              <h4 className="font-black text-[#00D4FF] mb-4 text-sm">LINKS</h4>
              <ul className="space-y-2 text-sm text-[#A0A0A0] font-sans">
                <li><a href="#" className="hover:text-[#00D4FF] hover:underline transition-colors">Code of Conduct</a></li>
                <li><a href="#" className="hover:text-[#00D4FF] hover:underline transition-colors">Privacy Policy</a></li>
                <li><a href="mailto:prarambha@butwalhacks.com" className="hover:text-[#00D4FF] hover:underline transition-colors">Contact Us</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-[#222] pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-xs text-[#555] font-mono text-center md:text-left">
              &copy; 2026 CyberUtsav &mdash; Organized by Tech Gurkha Digital Services. Co-organized by ButwalHacks.
            </div>
            <div className="flex items-center gap-4">
              <a href="https://github.com/Prarambha369/CyberUtsavLumbini" target="_blank" rel="noopener noreferrer" className="text-[#555] hover:text-[#00D4FF] transition-colors" aria-label="GitHub">
                <Icon name="github" className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
