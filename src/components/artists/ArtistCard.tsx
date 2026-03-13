"use client";

import type { SpotlightArtist } from "@/data/artists";
import Image from "next/image";

interface ArtistCardProps {
  artist: SpotlightArtist;
}

export default function ArtistCard({ artist }: ArtistCardProps) {
  return (
    <a
      href={artist.profileUrl}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        display: "flex",
        flexDirection: "column",
        background: "rgba(14, 14, 22, 0.85)",
        border: "1px solid rgba(255,255,255,0.07)",
        borderRadius: 10,
        overflow: "hidden",
        textDecoration: "none",
        transition: "border-color 0.2s ease, transform 0.2s ease",
        cursor: "pointer",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.18)";
        (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.07)";
        (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
      }}
    >
      {/* Artist image */}
      <div
        style={{
          width: "100%",
          aspectRatio: "1/1",
          position: "relative",
          background: "#0d0d18",
          overflow: "hidden",
        }}
      >
        <Image
          src={artist.imageUrl}
          alt={`${artist.name} — ${artist.medium ?? "Artist"}`}
          fill
          style={{ objectFit: "cover", objectPosition: "center top" }}
          unoptimized // external URLs (unavatar/X CDN)
        />

        {/* Medium badge */}
        {artist.medium && (
          <div
            style={{
              position: "absolute",
              top: 8,
              right: 8,
              background: "rgba(0,0,0,0.65)",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: 4,
              padding: "2px 7px",
              fontSize: 9,
              fontWeight: 500,
              color: "rgba(255,255,255,0.55)",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              backdropFilter: "blur(4px)",
            }}
          >
            {artist.medium}
          </div>
        )}
      </div>

      {/* Info */}
      <div style={{ padding: "12px 14px 14px" }}>
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            gap: 6,
            marginBottom: 6,
          }}
        >
          <span
            style={{
              fontSize: 13,
              fontWeight: 500,
              color: "#ffffff",
              letterSpacing: "0.01em",
            }}
          >
            {artist.name}
          </span>
          <span
            style={{
              fontSize: 11,
              color: "rgba(255,255,255,0.35)",
              letterSpacing: "0.01em",
            }}
          >
            @{artist.handle}
          </span>
        </div>

        <p
          style={{
            margin: 0,
            fontSize: 12,
            color: "rgba(255,255,255,0.55)",
            lineHeight: 1.5,
            letterSpacing: "0.01em",
          }}
        >
          {artist.bio}
        </p>

        {/* X link indicator */}
        <div
          style={{
            marginTop: 10,
            display: "flex",
            alignItems: "center",
            gap: 5,
            color: "rgba(255,255,255,0.25)",
            fontSize: 10,
            letterSpacing: "0.05em",
          }}
        >
          <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
          View on X
        </div>
      </div>
    </a>
  );
}
