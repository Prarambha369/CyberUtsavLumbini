<div align="center">

# 🛡️ CyberUtsav Lumbini

### Pre-Registration Portal

**The International Provincial Chapter of Cyber Utsav 3.0**
Co-organized by [ButwalHacks](https://butwalhacks.com)

[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)](https://typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38bdf8?logo=tailwindcss)](https://tailwindcss.com)
[![Vercel](https://img.shields.io/badge/Deploy-Vercel-black?logo=vercel)](https://vercel.com)

</div>

---

## 📋 About

CyberUtsav Lumbini is the **Lumbini provincial chapter** of Nepal's largest student hackathon series. This portal handles pre-registration for the event happening **January–February 2027**.

- 🌍 **5 Countries** — Nepal, India, Bangladesh, UAE, USA
- 🏙️ **12 Host Cities** across 7 Nepalese provinces + 4 international
- 👥 **1200+** estimated participants
- 💰 **Free** registration

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
│   ├── globals.css          # Neo-Brutalist dark theme + Tailwind
│   ├── layout.tsx           # Root layout, fonts, SEO metadata
│   └── page.tsx             # Full landing page (all sections)
├── components/
│   ├── Nav.tsx              # Sticky nav with mobile hamburger
│   └── PreRegistrationForm.tsx  # 4-step multi-step form
├── lib/
│   └── data.ts              # Tracks, cities, timeline, FAQ, prizes
├── public/                  # Static assets (images, favicon)
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
| `#0A0A0A` | Black | Page background |
| `#111111` | Surface | Cards, panels |
| `#00D4FF` | Cyan | Primary accent, CTAs, borders |
| `#F59E0B` | Amber | Secondary accent, badges |
| `#E53E3E` | Red | Error states, required indicators |
| `#00FF41` | Green | Success states |

**Style:** Dark Neo-Brutalist — hard box-shadows, `border-2` borders, bold typography, sharp hover transitions.

## 📄 Sections

| # | Section | Description |
|---|---------|-------------|
| 01 | **Hero** | "Coming Soon • Jan–Feb 2027" badge, headline, stats strip |
| 02 | **About** | Event description, Why Pre-Register, Network/Build/Pitch |
| 03 | **Tracks** | 6 competition tracks with icons and examples |
| 04 | **Schedule** | 4-step process + 3-phase timeline |
| 05 | **Prizes** | 4 prize categories |
| 06 | **Cities** | 12 host cities with flags |
| 07 | **FAQ** | 5 expandable accordion items |
| 08 | **Registration** | 4-step form with validation |

## 📝 Pre-Registration Form

The form follows a **4-step wizard** pattern:

| Step | Fields | Validation |
|------|--------|-----------|
| 1. Personal | First name, last name, email, phone | Required fields, email regex |
| 2. Team | Team name, role, teammate names | Required team name + role |
| 3. Event | Country, affiliation, track, experience | Required country, affiliation, track |
| 4. Review | Summary, Code of Conduct, Privacy Policy | Must agree to both |

**Features:**
- Step indicator with progress
- Inline error messages
- Loading spinner on submit
- Success screen with summary
- Keyboard accessible (ARIA labels, focus states)

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

### Manual

```bash
npm run build
npx vercel
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feat/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feat/amazing-feature`)
5. Open a Pull Request

## 📄 License

© 2026 CyberUtsav — Organized by Tech Gurkha Digital Services.
Co-organized by ButwalHacks. All rights reserved.

---

<div align="center">

**Built with ❤️ by [ButwalHacks](https://butwalhacks.com)**

</div>
