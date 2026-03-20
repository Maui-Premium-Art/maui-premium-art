import type { Metadata } from "next";
import Link from "next/link";
import FeaturedArtistCard from "@/components/artists/FeaturedArtistCard";
import ArtistCard from "@/components/artists/ArtistCard";
import { residentArtists, upAndComingArtists, lastRefreshed } from "@/data/artists";
import ArtistSubmissionForm from "@/components/artists/ArtistSubmissionForm";

export const metadata: Metadata = {
  title: "Artists — Maui Premium Art",
  description:
    "Fine art by Hulali Lā — original Hawaiian artwork for the Cybertruck. Plus: emerging artists in the EV and creative space, featured monthly.",
  openGraph: {
    title: "Artists — Maui Premium Art",
    description:
      "Fine art by Hulali Lā. Plus: emerging artists in the EV and creative space, featured monthly.",
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
      {/* Header */}
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
          Artists
        </div>

        <div style={{ width: 60 }} />
      </div>

      {/* Content */}
      <div
        style={{
          maxWidth: 900,
          margin: "0 auto",
          padding: "36px 20px 72px",
        }}
      >

        {/* ── RESIDENT ARTISTS ─────────────────────────────── */}
        <div style={{ marginBottom: 56 }}>
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              justifyContent: "space-between",
              marginBottom: 20,
              paddingBottom: 12,
              borderBottom: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            <div>
              <h2
                style={{
                  fontSize: 16,
                  fontWeight: 400,
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  margin: "0 0 4px",
                  color: "rgba(255,255,255,0.8)",
                }}
              >
                Resident Artists
              </h2>
              <p
                style={{
                  fontSize: 12,
                  color: "rgba(255,255,255,0.3)",
                  margin: 0,
                }}
              >
                The creative force behind every Maui Premium Art wrap.
              </p>
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            {residentArtists.map((artist) => (
              <FeaturedArtistCard key={artist.id} artist={artist} />
            ))}
          </div>
        </div>

        {/* ── CTA — Commission / Inquiry ─────────────────── */}
        <div
          style={{
            background: "rgba(74,158,255,0.06)",
            border: "1px solid rgba(74,158,255,0.15)",
            borderRadius: 14,
            padding: "32px 28px",
            marginBottom: 56,
            textAlign: "center",
          }}
        >
          <div
            style={{
              fontSize: 10,
              fontWeight: 600,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "#4a9eff",
              marginBottom: 10,
            }}
          >
            Limited Editions
          </div>
          <h3
            style={{
              fontSize: 22,
              fontWeight: 300,
              margin: "0 0 8px",
              color: "#ffffff",
              letterSpacing: "0.02em",
            }}
          >
            Your Cybertruck deserves original art.
          </h3>
          <p
            style={{
              fontSize: 14,
              color: "rgba(255,255,255,0.5)",
              margin: "0 0 24px",
              lineHeight: 1.6,
              maxWidth: 480,
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            Every wrap is limited to 10 per design. Custom commissions start at $2,995.
            Reach out — we&apos;d love to hear your vision.
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <a
              href="https://x.com/Maui_PremiumArt"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                fontSize: 13,
                fontWeight: 500,
                color: "#ffffff",
                background: "rgba(74,158,255,0.15)",
                border: "1px solid rgba(74,158,255,0.3)",
                borderRadius: 8,
                padding: "10px 20px",
                textDecoration: "none",
                letterSpacing: "0.02em",
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
              Contact on X
            </a>
            <Link
              href="/"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                fontSize: 13,
                fontWeight: 500,
                color: "rgba(255,255,255,0.6)",
                border: "1px solid rgba(255,255,255,0.12)",
                borderRadius: 8,
                padding: "10px 20px",
                textDecoration: "none",
                letterSpacing: "0.02em",
              }}
            >
              ← Back to Console
            </Link>
          </div>
        </div>

        {/* ── UP AND COMING ────────────────────────────────── */}
        <div>
          {/* Section header */}
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              justifyContent: "space-between",
              marginBottom: 20,
              paddingBottom: 12,
              borderBottom: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            <div>
              <h2
                style={{
                  fontSize: 16,
                  fontWeight: 400,
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  margin: "0 0 4px",
                  color: "rgba(255,255,255,0.8)",
                }}
              >
                Up and Coming
              </h2>
              <p
                style={{
                  fontSize: 12,
                  color: "rgba(255,255,255,0.3)",
                  margin: 0,
                }}
              >
                Emerging voices in the EV and art space. Spotted early.
              </p>
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                flexShrink: 0,
              }}
            >
              <div
                style={{
                  width: 5,
                  height: 5,
                  borderRadius: "50%",
                  background: "#4a9eff",
                  opacity: 0.6,
                }}
              />
              <span
                style={{
                  fontSize: 10,
                  color: "rgba(255,255,255,0.2)",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                }}
              >
                {refreshDate} · {upAndComingArtists.length} artists
              </span>
            </div>
          </div>

          {/* Artist grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
              gap: 14,
            }}
          >
            {upAndComingArtists.map((artist) => (
              <ArtistCard key={artist.id} artist={artist} />
            ))}
          </div>
        </div>

        {/* Footer */}
        <div
          style={{
            marginTop: 52,
            paddingTop: 24,
            borderTop: "1px solid rgba(255,255,255,0.05)",
            fontSize: 12,
            color: "rgba(255,255,255,0.22)",
            lineHeight: 1.7,
          }}
        >
          <p style={{ margin: "0 0 6px" }}>
            Up and Coming refreshes monthly. We reach out before featuring anyone —
            if you&apos;d like to be included or removed, find us at{" "}
            <a
              href="https://x.com/Maui_PremiumArt"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "rgba(255,255,255,0.38)", textDecoration: "none" }}
            >
              @Maui_PremiumArt
            </a>
            .
          </p>
        </div>

        {/* ── ARTIST SUBMISSION ──────────────────────────────── */}
        <div style={{ marginTop: 48 }}>
          <ArtistSubmissionForm />
        </div>
      </div>
    </main>
  );
}
