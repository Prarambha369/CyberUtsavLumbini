import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "CyberUtsav Lumbini — Pre-Registration Portal",
  description:
    "Cyber Utsav Lumbini: The International Provincial Chapter of Cyber Utsav 3.0. Co-organized by ButwalHacks. 5 countries, 12 host cities, free registration.",
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
    title: "CyberUtsav Lumbini — Pre-Registration",
    description:
      "The International Provincial Chapter of Cyber Utsav 3.0. Co-organized by ButwalHacks.",
    url: "https://cyberutsav-lumbini.vercel.app",
    siteName: "CyberUtsav Lumbini",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "CyberUtsav Lumbini — Pre-Registration",
    description:
      "Nepal's biggest student hackathon — 5 countries, 12 host cities, free registration.",
  },
  robots: "index, follow",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body>{children}</body>
    </html>
  );
}
