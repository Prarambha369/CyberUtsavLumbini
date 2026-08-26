import type { Metadata } from "next";
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
    default: "CyberUtsav Lumbini | Provincial Hackathon Chapter — Butwal",
    template: "%s | CyberUtsav Lumbini",
  },
  description:
    "CyberUtsav Lumbini — the Lumbini Provincial Chapter of Nepal's biggest student hackathon. 150 max participants. A 3-day selection round in Butwal where winning teams advance to the Kathmandu Grand Finale. Free registration, 6 tracks.",
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
    "pre-registration hackathon",
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
    title: "CyberUtsav Lumbini — Provincial Hackathon Chapter",
    description:
      "The Lumbini Provincial Chapter of CyberUtsav. 3-day hackathon in Butwal. 6 tracks, free registration, winners advance to Kathmandu Grand Finale. Co-organized by ButwalHacks.",
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
    title: "CyberUtsav Lumbini — Provincial Hackathon Chapter",
    description:
      "The Lumbini Provincial Chapter of CyberUtsav — 3-day hackathon in Butwal. 6 tracks, free entry, winners advance to Kathmandu Grand Finale.",
    images: [`${baseUrl}/opengraph-image`],
    creator: "@butwalhacks",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
  other: {
    "theme-color": "#101014",
    "msapplication-TileColor": "#101014",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "black-translucent",
    "application-name": "CyberUtsav Lumbini",
    "og:latitude": "27.6967",
    "og:longitude": "83.4930",
    "og:street-address": "Butwal",
    "og:region": "Lumbini Province",
    "og:country-name": "Nepal",
  },
};

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
      "The Lumbini Provincial Chapter of CyberUtsav, Nepal's largest student hackathon. A 3-day selection round in Butwal where winning teams advance to the Kathmandu Grand Finale.",
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
      url: `${baseUrl}#register`,
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
      "Official pre-registration portal for CyberUtsav Lumbini — the Lumbini Provincial Chapter of Nepal's biggest student hackathon.",
    publisher: {
      "@type": "Organization",
      name: "ButwalHacks",
      url: "https://butwalhacks.com",
    },
    potentialAction: {
      "@type": "SearchAction",
      target: `${baseUrl}/?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: baseUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Pre-Register",
        item: `${baseUrl}#register`,
      },
    ],
  };

  return (
    <html
      lang="en"
      className={`${archivoBlack.variable} ${spaceGrotesk.variable} ${inter.variable}`}
    >
      <head>
        <link rel="canonical" href={baseUrl} />
        <meta name="theme-color" content="#101014" />
        <meta name="msapplication-TileColor" content="#101014" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="black-translucent"
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(breadcrumbJsonLd),
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
