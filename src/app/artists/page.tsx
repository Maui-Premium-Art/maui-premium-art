import type { Metadata } from "next";
import Link from "next/link";
import ArtistCard from "@/components/artists/ArtistCard";
import { spotlightArtists, lastRefreshed } from "@/data/artists";

export const metadata: Metadata = {
  title: "New Artists — Maui Premium Art",
  description:
    "Emerging artists in the EV and Cybertruck creative space, spotted and featured by Maui Premium Art. Monthly spotlight.",
  openGraph: {
    title: "New Artists — Maui Premium Art",
    description: "Emerging artists in the EV and Cybertruck creative space.",
    url: "https://mauipremiumart.com/artists",
  },
};

export default function ArtistsPage() {
  const refreshDate = new Date(lastRefreshed).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  return (
    <main
      style={{
        minHeight: "100dvh",
        background: "#0a0a0f",
        color: "#ffffff",
        fontFamily: "-apple-system, 'SF Pro Display', system-ui, sans-serif",
        WebkitFontSmoothing: "antialiased",
      }}
    >
      {/* Header — CT-style top bar */}
      <div
        style={{
          borderBottom: "1px solid rgba(255,255,255,0.06)",
          padding: "16px 20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          position: "sticky",
          top: 0,
          background: "rgba(10,10,15,0.95)",
          backdropFilter: "blur(12px)",
          zIndex: 10,
        }}
      >
        <Link
          href="/"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            textDecoration: "none",
            color: "rgba(255,255,255,0.55)",
            fontSize: 13,
            letterSpacing: "0.02em",
          }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M10 3L5 8L10 13" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
          </svg>
          Console
        </Link>

        <div
          style={{
            fontSize: 13,
            fontWeight: 500,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.6)",
          }}
        >
          New Artists
        </div>

        <div style={{ width: 60 }} />
      </div>

      {/* Content */}
      <div
        style={{
          maxWidth: 900,
          margin: "0 auto",
          padding: "32px 20px 60px",
        }}
      >
        {/* Section header */}
        <div style={{ marginBottom: 32 }}>
          <h1
            style={{
              fontSize: 24,
              fontWeight: 300,
              letterSpacing: "0.04em",
              margin: "0 0 8px",
              color: "#ffffff",
            }}
          >
            New Artists
          </h1>
          <p
            style={{
              fontSize: 13,
              color: "rgba(255,255,255,0.4)",
              margin: 0,
              lineHeight: 1.6,
              maxWidth: 480,
            }}
          >
            Emerging voices in the EV and Cybertruck creative space. Spotted early.
            Featured here because the work deserves to be seen.
          </p>

          <div
            style={{
              marginTop: 16,
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            <div
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: "#4a9eff",
                opacity: 0.7,
              }}
            />
            <span
              style={{
                fontSize: 11,
                color: "rgba(255,255,255,0.25)",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
              }}
            >
              {refreshDate} Spotlight · {spotlightArtists.length} artists
            </span>
          </div>
        </div>

        {/* Artist grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
            gap: 16,
          }}
        >
          {spotlightArtists.map((artist) => (
            <ArtistCard key={artist.id} artist={artist} />
          ))}
        </div>

        {/* Footer note */}
        <div
          style={{
            marginTop: 48,
            paddingTop: 24,
            borderTop: "1px solid rgba(255,255,255,0.05)",
            fontSize: 12,
            color: "rgba(255,255,255,0.25)",
            lineHeight: 1.7,
          }}
        >
          <p style={{ margin: "0 0 8px" }}>
            Updated monthly. We reach out before featuring — if you want to be included or removed, say the word.
          </p>
          <p style={{ margin: 0 }}>
            Find us at{" "}
            <a
              href="https://x.com/Maui_PremiumArt"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "rgba(255,255,255,0.4)", textDecoration: "none" }}
            >
              @Maui_PremiumArt
            </a>
          </p>
        </div>
      </div>
    </main>
  );
}
