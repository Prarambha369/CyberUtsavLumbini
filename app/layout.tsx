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

export const metadata: Metadata = {
  title: "CyberUtsav 3.0 | Nepal's Biggest Student Hackathon",
  description:
    "CyberUtsav 3.0 - Nepal's largest student hackathon & innovation platform. Empowering high school, A-levels, and graduate builders across all 7 provinces.",
  keywords: [
    "CyberUtsav",
    "Cyber Utsav 3.0",
    "Lumbini",
    "hackathon Nepal",
    "ButwalHacks",
    "student hackathon",
    "cybersecurity competition",
    "Tech Gurkha",
    "pre-registration",
  ],
  openGraph: {
    title: "CyberUtsav 3.0 — Lumbini Chapter",
    description:
      "Nepal's biggest student hackathon. Co-organized by ButwalHacks. Winners advance to Kathmandu Grand Finale.",
    url: "https://lumbini.cyberutsav.com",
    siteName: "CyberUtsav Lumbini",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "CyberUtsav 3.0 — Lumbini Chapter",
    description:
      "Nepal's biggest student hackathon — Lumbini Provincial Chapter in Butwal.",
  },
  robots: "index, follow",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${archivoBlack.variable} ${spaceGrotesk.variable} ${inter.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
