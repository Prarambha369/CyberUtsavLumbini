import type { Metadata, Viewport } from "next";
import { Archivo_Black, Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";

const archivoBlack = Archivo_Black({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-archivo",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const baseUrl = "https://lumbini.cyberutsav.com";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "CyberUtsav Lumbini — Free Student Hackathon in Butwal, Nepal",
    template: "%s | CyberUtsav Lumbini",
  },
  description:
    "CyberUtsav Lumbini is a free 3-day student hackathon in Butwal, Nepal. Teams of 3 build across 6 tracks; winners advance to the Kathmandu Grand Finale. 150 seats — pre-register in 2 minutes.",
  keywords: [
    "CyberUtsav Lumbini",
    "CyberUtsav",
    "Lumbini hackathon",
    "hackathon Nepal",
    "Butwal hackathon",
    "ButwalHacks",
    "student hackathon Nepal",
    "cybersecurity competition Nepal",
    "Tech Gurkha Digital Services",
    "hackathon registration",
    "Lumbini Province",
    "Kathmandu Grand Finale",
    "free hackathon Nepal",
    "AI ML hackathon",
    "IoT hackathon",
    "web development hackathon",
    "social impact hackathon",
    "student innovation Nepal",
  ],
  authors: [{ name: "ButwalHacks" }, { name: "Tech Gurkha Digital Services" }],
  creator: "ButwalHacks",
  publisher: "Tech Gurkha Digital Services",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: baseUrl,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: baseUrl,
    siteName: "CyberUtsav Lumbini",
    title: "CyberUtsav Lumbini — Free Student Hackathon in Butwal",
    description:
      "Free 3-day student hackathon in Butwal, Nepal. Teams of 3, 6 tracks, 150 seats. Winners advance to the Kathmandu Grand Finale. Pre-register in 2 minutes.",
    images: [
      {
        url: `${baseUrl}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "CyberUtsav Lumbini — Provincial Hackathon Chapter in Butwal",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CyberUtsav Lumbini — Free Student Hackathon in Butwal",
    description:
      "Free 3-day student hackathon in Butwal, Nepal. Teams of 3, 6 tracks, 150 seats. Winners advance to the Kathmandu Grand Finale.",
    images: [`${baseUrl}/opengraph-image`],
    creator: "@butwalhacks",
  },
  manifest: "/site.webmanifest",
  appleWebApp: {
    capable: true,
    title: "CyberUtsav Lumbini",
    statusBarStyle: "black-translucent",
  },
  other: {
    "msapplication-TileColor": "#101014",
    "application-name": "CyberUtsav Lumbini",
    "og:latitude": "27.6967",
    "og:longitude": "83.4930",
    "og:street-address": "Butwal",
    "og:region": "Lumbini Province",
    "og:country-name": "Nepal",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f3ead8" },
    { media: "(prefers-color-scheme: dark)", color: "#0e0e12" },
  ],
  colorScheme: "light dark",
};

/** The root layout wrapping all pages with metadata, JSON-LD structured data, and font configuration. */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: "CyberUtsav Lumbini",
    alternateName: "CyberUtsav Lumbini Provincial Chapter",
    description:
      "A free 3-day student hackathon in Butwal, Nepal — the Lumbini Provincial Chapter of CyberUtsav, Nepal's largest student hackathon series. Teams of 3 compete across 6 tracks; winners advance to the Kathmandu Grand Finale.",
    isAccessibleForFree: true,
    inLanguage: "en",
    keywords: "student hackathon, Butwal, Lumbini Province, Nepal, cybersecurity, AI/ML, IoT, web development, social impact",
    superEvent: {
      "@type": "EventSeries",
      name: "CyberUtsav",
      url: "https://cyberutsav.com",
    },
    url: baseUrl,
    image: `${baseUrl}/opengraph-image`,
    organizer: [
      {
        "@type": "Organization",
        name: "ButwalHacks",
        url: "https://butwalhacks.com",
      },
      {
        "@type": "Organization",
        name: "Tech Gurkha Digital Services",
        url: "https://cyberutsav.com",
      },
    ],
    location: {
      "@type": "Place",
      name: "Butwal",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Butwal",
        addressRegion: "Lumbini Province",
        addressCountry: "NP",
      },
    },
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "NPR",
      availability: "https://schema.org/InStock",
      url: "https://registration.cyberutsav.com/butwal",
      validFrom: "2026-01-01",
    },
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    audience: {
      "@type": "EducationalAudience",
      educationalRole: "student",
    },
    maximumAttendeeCapacity: 150,
    performer: {
      "@type": "Organization",
      name: "CyberUtsav Lumbini Participants",
    },
  };

  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "CyberUtsav Lumbini",
    url: baseUrl,
    description:
      "Official registration hub for CyberUtsav Lumbini — the Lumbini Provincial Chapter of Nepal's biggest student hackathon. Free registration is open now.",
    publisher: {
      "@type": "Organization",
      name: "ButwalHacks",
      url: "https://butwalhacks.com",
    },
  };


  return (
    <html
      lang="en"
      className={`${archivoBlack.variable} ${spaceGrotesk.variable} ${inter.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                var d = document.documentElement, saved = null;
                d.classList.add('js');
                try { saved = localStorage.getItem('theme'); } catch (e) {}
                var dark = saved === 'dark' || (saved !== 'light' && window.matchMedia('(prefers-color-scheme: dark)').matches);
                d.setAttribute('data-theme', dark ? 'dark' : 'light');
              })();
            `,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteJsonLd),
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
