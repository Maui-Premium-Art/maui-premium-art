import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Maui Premium Art — Fine Art Cybertruck Wraps",
  description:
    "Original Hawaiian fine art vinyl wraps for the Cybertruck. Limited editions by Hulali Lā. Each design created specifically for the CT — maximum 10 per design.",
  keywords: [
    "Cybertruck wrap",
    "Cybertruck art",
    "Hawaiian art",
    "vinyl wrap",
    "fine art",
    "Maui",
    "Hulali La",
    "limited edition",
  ],
  authors: [{ name: "Hulali Lā", url: "https://mauipremiumart.com" }],
  creator: "Maui Premium Art",
  publisher: "Maui Premium Art",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://mauipremiumart.com",
    siteName: "Maui Premium Art",
    title: "Maui Premium Art — Fine Art Cybertruck Wraps",
    description:
      "Original Hawaiian fine art vinyl wraps for the Cybertruck. Limited editions. Created specifically for the CT.",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "Maui Premium Art — Mahalo Bird Cybertruck Wrap",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Maui Premium Art — Fine Art Cybertruck Wraps",
    description:
      "Original Hawaiian fine art vinyl wraps for the Cybertruck. Limited editions by Hulali Lā.",
    images: ["/images/og-image.png"],
    creator: "@Maui_PremiumArt",
    site: "@Maui_PremiumArt",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  metadataBase: new URL("https://mauipremiumart.com"),
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#0a0a0f",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" style={{ background: "#0a0a0f" }}>
      <head>
        <link rel="preconnect" href="https://api.open-meteo.com" />
      </head>
      <body style={{ background: "#0a0a0f", margin: 0, padding: 0, overflow: "hidden" }}>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
