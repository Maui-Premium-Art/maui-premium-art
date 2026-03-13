import type { FeaturedArtist } from "@/data/artists";
import Image from "next/image";
import Link from "next/link";

interface FeaturedArtistCardProps {
  artist: FeaturedArtist;
}

export default function FeaturedArtistCard({ artist }: FeaturedArtistCardProps) {
  return (
    <div
      style={{
        background: "rgba(14, 14, 22, 0.9)",
        border: "1px solid rgba(255,255,255,0.1)",
        borderRadius: 14,
        overflow: "hidden",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        minHeight: 280,
      }}
    >
      {/* Left — artwork hero image */}
      <div
        style={{
          position: "relative",
          minHeight: 280,
          background: "#0d0d18",
        }}
      >
        <Image
          src={artist.heroImageUrl}
          alt={`${artist.publicName} — ${artist.tagline}`}
          fill
          style={{ objectFit: "cover", objectPosition: "center" }}
          priority
        />
        {/* Gradient overlay right edge for bleed into text */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to right, transparent 60%, rgba(14,14,22,0.95) 100%)",
          }}
        />
      </div>

      {/* Right — artist info */}
      <div
        style={{
          padding: "28px 28px 24px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <div>
          {/* Label */}
          <div
            style={{
              fontSize: 10,
              fontWeight: 600,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "#4a9eff",
              marginBottom: 12,
            }}
          >
            Featured Artist
          </div>

          {/* Public name */}
          <h2
            style={{
              fontSize: 26,
              fontWeight: 300,
              letterSpacing: "0.04em",
              margin: "0 0 4px",
              color: "#ffffff",
              lineHeight: 1.2,
            }}
          >
            {artist.publicName}
          </h2>

          {/* Real name + handle */}
          <div
            style={{
              fontSize: 12,
              color: "rgba(255,255,255,0.35)",
              marginBottom: 16,
              letterSpacing: "0.02em",
            }}
          >
            {artist.name} · @{artist.handle}
          </div>

          {/* Tagline */}
          <p
            style={{
              fontSize: 14,
              color: "rgba(255,255,255,0.75)",
              margin: "0 0 14px",
              lineHeight: 1.6,
              fontStyle: "italic",
            }}
          >
            &ldquo;{artist.tagline}&rdquo;
          </p>

          {/* Story */}
          <p
            style={{
              fontSize: 13,
              color: "rgba(255,255,255,0.5)",
              margin: 0,
              lineHeight: 1.7,
            }}
          >
            {artist.story}
          </p>
        </div>

        {/* Footer — meta + CTA */}
        <div>
          {/* Meta row */}
          <div
            style={{
              display: "flex",
              gap: 16,
              marginBottom: 16,
              marginTop: 20,
            }}
          >
            <div>
              <div style={{ fontSize: 9, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.25)", marginBottom: 2 }}>
                Medium
              </div>
              <div style={{ fontSize: 12, color: "rgba(255,255,255,0.55)" }}>
                {artist.medium}
              </div>
            </div>
            <div>
              <div style={{ fontSize: 9, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.25)", marginBottom: 2 }}>
                Based in
              </div>
              <div style={{ fontSize: 12, color: "rgba(255,255,255,0.55)" }}>
                {artist.location}
              </div>
            </div>
          </div>

          {/* Links */}
          <div style={{ display: "flex", gap: 10 }}>
            <a
              href={artist.profileUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                fontSize: 12,
                color: "rgba(255,255,255,0.5)",
                textDecoration: "none",
                border: "1px solid rgba(255,255,255,0.12)",
                borderRadius: 6,
                padding: "6px 12px",
              }}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
              Follow
            </a>

            {artist.shopUrl && (
              <Link
                href="/"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  fontSize: 12,
                  color: "#4a9eff",
                  textDecoration: "none",
                  border: "1px solid rgba(74,158,255,0.3)",
                  background: "rgba(74,158,255,0.08)",
                  borderRadius: 6,
                  padding: "6px 12px",
                }}
              >
                View Wraps →
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
