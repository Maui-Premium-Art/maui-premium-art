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
  viewportFit: "cover",
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              name: "Maui Premium Art",
              description:
                "Original Hawaiian fine art vinyl wraps for the Cybertruck. Limited editions by Hulali Lā.",
              url: "https://mauipremiumart.com",
              image: "https://mauipremiumart.com/images/og-image.png",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Kihei",
                addressRegion: "HI",
                addressCountry: "US",
              },
              geo: {
                "@type": "GeoCoordinates",
                latitude: 20.76,
                longitude: -156.44,
              },
              sameAs: ["https://x.com/Maui_PremiumArt"],
              founder: {
                "@type": "Person",
                name: "Juan Linnon Ellis",
                alternateName: "Hulali Lā",
              },
              hasOfferCatalog: {
                "@type": "OfferCatalog",
                name: "Cybertruck Vinyl Wraps",
                itemListElement: [
                  {
                    "@type": "Product",
                    name: "Panel Wrap — Mahalo Bird Edition I",
                    description: "Single panel original fine art wrap for the Cybertruck.",
                    offers: {
                      "@type": "Offer",
                      price: "295",
                      priceCurrency: "USD",
                      availability: "https://schema.org/InStock",
                      itemCondition: "https://schema.org/NewCondition",
                    },
                    brand: { "@type": "Brand", name: "Maui Premium Art" },
                  },
                  {
                    "@type": "Product",
                    name: "Half Wrap — Mahalo Bird Edition I",
                    description: "Tailgate + side panels original fine art wrap for the Cybertruck.",
                    offers: {
                      "@type": "Offer",
                      price: "695",
                      priceCurrency: "USD",
                      availability: "https://schema.org/InStock",
                      itemCondition: "https://schema.org/NewCondition",
                    },
                    brand: { "@type": "Brand", name: "Maui Premium Art" },
                  },
                  {
                    "@type": "Product",
                    name: "Full Wrap — Mahalo Bird Edition I",
                    description: "All exterior panels original fine art wrap for the Cybertruck.",
                    offers: {
                      "@type": "Offer",
                      price: "1295",
                      priceCurrency: "USD",
                      availability: "https://schema.org/InStock",
                      itemCondition: "https://schema.org/NewCondition",
                    },
                    brand: { "@type": "Brand", name: "Maui Premium Art" },
                  },
                ],
              },
            }),
          }}
        />
      </head>
      <body style={{ background: "#0a0a0f", margin: 0, padding: 0, overflow: "hidden" }}>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
