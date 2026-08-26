<div align="center">

# 🛡️ CyberUtsav Lumbini

### Pre-Registration Portal

**Provincial Chapter of CyberUtsav — Nepal's Biggest Student Hackathon**
Co-organized by [ButwalHacks](https://butwalhacks.com)

[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)](https://typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38bdf8?logo=tailwindcss)](https://tailwindcss.com)
[![Vercel](https://img.shields.io/badge/Deploy-Vercel-black?logo=vercel)](https://vercel.com)

</div>

---

## 📋 About

CyberUtsav Lumbini is the **Lumbini Provincial Chapter** of Nepal's largest student hackathon series. This portal handles pre-registration for the selection round happening in **Butwal City, Lumbini Province**.

- 🎯 **150 Max Participants** — Limited capacity entry
- 🏙️ **Host City: Butwal** — Lumbini Province, Nepal
- 👥 **1200+** participants across all CyberUtsav editions
- 💰 **Free** registration
- 🏆 Winners advance to **Kathmandu Grand Finale**

## 🚀 Quick Start

```bash
# Clone the repo
git clone https://github.com/Prarambha369/CyberUtsavLumbini.git
cd CyberUtsavLumbini

# Install dependencies
npm install

# Start dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
CyberUtsavLumbini/
├── app/
│   ├── globals.css          # Design system + responsive + animations
│   ├── layout.tsx           # Root layout, fonts, SEO, JSON-LD
│   ├── page.tsx             # Full landing page (all sections)
│   ├── robots.ts            # AI-friendly robots.txt
│   ├── sitemap.ts           # Dynamic sitemap
│   ├── icon.tsx             # Dynamic favicon
│   └── opengraph-image.tsx  # Dynamic OG image
├── components/
│   ├── Nav.tsx              # Sticky nav with mobile hamburger
│   └── PreRegistrationForm.tsx  # 4-step multi-step form
├── lib/
│   └── data.ts              # Tracks, timeline, FAQ, prizes, team, past events
├── public/
│   ├── llms.txt             # AI crawler friendly site description
│   └── site.webmanifest     # PWA manifest
├── .gitignore
├── next.config.js
├── package.json
├── postcss.config.mjs
├── tsconfig.json
├── vercel.json              # Security headers + deployment config
└── README.md
```

## 🎨 Design System

| Token | Color | Usage |
|-------|-------|-------|
| `--ink` | `#101014` | Text, borders, shadows |
| `--paper` | `#f3ead8` | Page background |
| `--paper-2` | `#fff8e9` | Card backgrounds |
| `--red` | `#ec3f2b` | ButwalHacks accent, primary CTA |
| `--purple` | `#7c3aed` | CyberUtsav accent, focus states |
| `--mint` | `#3dd6a3` | Secondary accent |
| `--muted` | `#635f57` | Body text, descriptions |

**Style:** Poster-Brutalist — hard box-shadows, bold uppercase typography, stamp badges, ticket motifs, dashed borders.

## 📄 Sections

| # | Section | Description |
|---|---------|-------------|
| 01 | **About** | Event description, Why Pre-Register, Network/Build/Pitch |
| 02 | **Tracks** | 6 competition tracks with icons and examples |
| 03 | **Schedule** | 4-step process + 3-phase timeline |
| 04 | **Prizes** | 4 prize categories |
| 05 | **Butwal Round** | Host city details |
| 06 | **Team** | ButwalHacks spotlight + placeholder team grid |
| 07 | **Past Events** | ButwalHacks & CyberUtsav event history |
| 08 | **Sponsors** | Tiered sponsor placeholders |
| 09 | **Code of Conduct** | Commitment + event links |
| 10 | **FAQ** | 5 expandable accordion items |
| 11 | **Registration** | 4-step form with validation |

## 📝 Pre-Registration Form

The form follows a **4-step wizard** pattern:

| Step | Fields | Validation |
|------|--------|-----------|
| 1. Personal | First name, last name, email, phone | Required fields, email regex |
| 2. Team | Team name, role, teammate names | Required team name + role |
| 3. Event | Country, affiliation, track, experience | Required country, affiliation, track |
| 4. Review | Summary, Code of Conduct, Privacy Policy | Must agree to both |

## ✨ Features

- **Scroll-reveal animations** with Intersection Observer
- **Hero entrance animations** — staggered fade, slide, pop
- **Hover micro-animations** on all cards, buttons, and links
- **Staggered grid reveals** for track cards and past events
- **Gradient shimmer** on CTA buttons
- **Animated dashed borders** on format tickets
- **Glow pulse** on hero stat numbers
- **Typing cursor** on hero title
- **Full responsive** — mobile, tablet, desktop
- **Comprehensive SEO** — JSON-LD, OG images, sitemap, robots.txt, llms.txt
- **AI-friendly** — explicit GPTBot/ClaudeBot/PerplexityBot rules
- **Accessible** — ARIA labels, focus states, reduced motion support

## 🛠️ Development

```bash
npm run dev      # Start dev server
npm run build    # Production build
npm run start    # Start production server
npm run lint     # Run ESLint
```

## 🚢 Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Go to [vercel.com/new](https://vercel.com/new)
3. Import the repository
4. Deploy — zero config needed

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feat/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feat/amazing-feature`)
5. Open a Pull Request

## 📄 License

© 2026 CyberUtsav Lumbini — Provincial chapter of CyberUtsav.
Organized by Tech Gurkha Digital Services.
Co-organized by ButwalHacks. All rights reserved.

---

<div align="center">

**Built with ❤️ by [ButwalHacks](https://butwalhacks.com)**

</div>
