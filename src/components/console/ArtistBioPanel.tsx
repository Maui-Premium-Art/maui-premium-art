"use client";

import Panel from "@/components/ui/Panel";
import { featuredArtist } from "@/data/artists";

interface ArtistBioPanelProps {
  open: boolean;
  onClose: () => void;
}

export default function ArtistBioPanel({ open, onClose }: ArtistBioPanelProps) {
  const artist = featuredArtist;

  return (
    <Panel open={open} onClose={onClose} direction="right" width="380px" title="Artist">
      {/* Portrait placeholder */}
      {artist.portraitImageUrl && (
        <div
          style={{
            width: "100%",
            aspectRatio: "3/2",
            borderRadius: 10,
            overflow: "hidden",
            marginBottom: 16,
            background: "#0d0d18",
            backgroundImage: `url('${artist.portraitImageUrl}')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
      )}

      {/* Name */}
      <h2
        style={{
          fontSize: 24,
          fontWeight: 300,
          margin: "0 0 4px",
          color: "#ffffff",
          fontFamily: "-apple-system, 'SF Pro Display', system-ui, sans-serif",
        }}
      >
        {artist.publicName}
      </h2>
      <div
        style={{
          fontSize: 12,
          color: "rgba(255,255,255,0.35)",
          marginBottom: 16,
          fontFamily: "-apple-system, 'SF Pro Text', system-ui, sans-serif",
        }}
      >
        {artist.name} · @{artist.handle}
      </div>

      {/* Tagline */}
      <p
        style={{
          fontSize: 14,
          color: "rgba(255,255,255,0.7)",
          margin: "0 0 16px",
          lineHeight: 1.6,
          fontStyle: "italic",
          fontFamily: "-apple-system, 'SF Pro Text', system-ui, sans-serif",
        }}
      >
        &ldquo;{artist.tagline}&rdquo;
      </p>

      {/* Story */}
      <p
        style={{
          fontSize: 13,
          color: "rgba(255,255,255,0.5)",
          margin: "0 0 20px",
          lineHeight: 1.8,
          fontFamily: "-apple-system, 'SF Pro Text', system-ui, sans-serif",
        }}
      >
        {artist.story}
      </p>

      {/* Meta */}
      <div
        style={{
          display: "flex",
          gap: 20,
          marginBottom: 20,
          paddingTop: 16,
          borderTop: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <div>
          <div style={{ fontSize: 9, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.25)", marginBottom: 3, fontFamily: "-apple-system, 'SF Pro Text', system-ui, sans-serif" }}>
            Medium
          </div>
          <div style={{ fontSize: 12, color: "rgba(255,255,255,0.55)", fontFamily: "-apple-system, 'SF Pro Text', system-ui, sans-serif" }}>
            {artist.medium}
          </div>
        </div>
        <div>
          <div style={{ fontSize: 9, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.25)", marginBottom: 3, fontFamily: "-apple-system, 'SF Pro Text', system-ui, sans-serif" }}>
            Based in
          </div>
          <div style={{ fontSize: 12, color: "rgba(255,255,255,0.55)", fontFamily: "-apple-system, 'SF Pro Text', system-ui, sans-serif" }}>
            {artist.location}
          </div>
        </div>
      </div>

      {/* Links */}
      <div style={{ display: "flex", gap: 8 }}>
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
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: 8,
            padding: "8px 14px",
            fontFamily: "-apple-system, 'SF Pro Text', system-ui, sans-serif",
          }}
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
          Follow
        </a>
        <a
          href="/art/mahalo-bird"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            fontSize: 12,
            color: "#4a9eff",
            textDecoration: "none",
            border: "1px solid rgba(74,158,255,0.25)",
            background: "rgba(74,158,255,0.08)",
            borderRadius: 8,
            padding: "8px 14px",
            fontFamily: "-apple-system, 'SF Pro Text', system-ui, sans-serif",
          }}
        >
          View Art →
        </a>
      </div>
    </Panel>
  );
}
