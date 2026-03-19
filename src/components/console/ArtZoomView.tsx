"use client";

import { useState, useEffect } from "react";
import { artworks } from "@/data/artworks";
import type { ArtFormat } from "@/data/artworks";

function fmt(price: number): string {
  return price >= 1000
    ? `$${Math.floor(price / 1000)},${String(price % 1000).padStart(3, "0")}`
    : `$${price}`;
}

interface ArtZoomViewProps {
  slug: string | null;
  onClose: () => void;
}

export default function ArtZoomView({ slug, onClose }: ArtZoomViewProps) {
  const [visible, setVisible] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [selectedFormat, setSelectedFormat] = useState<ArtFormat | null>(null);

  const artwork = slug ? artworks.find((a) => a.slug === slug) : null;

  useEffect(() => {
    if (slug && artwork) {
      setMounted(true);
      setSelectedFormat(artwork.formats[0]);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setVisible(true));
      });
    } else {
      setVisible(false);
      const timer = setTimeout(() => {
        setMounted(false);
        setSelectedFormat(null);
      }, 400);
      return () => clearTimeout(timer);
    }
  }, [slug, artwork]);

  useEffect(() => {
    if (!slug) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [slug, onClose]);

  if (!mounted || !artwork) return null;

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 45,
        background: "rgba(5,5,10,0.95)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        opacity: visible ? 1 : 0,
        transition: "opacity 0.4s ease",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
      role="dialog"
      aria-label={artwork.title}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "10px 16px",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
          flexShrink: 0,
        }}
      >
        <button
          onClick={onClose}
          aria-label="Back to gallery"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            background: "none",
            border: "none",
            color: "rgba(255,255,255,0.5)",
            fontSize: 12,
            cursor: "pointer",
            padding: "4px 0",
            fontFamily: "-apple-system, 'SF Pro Text', system-ui, sans-serif",
          }}
        >
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
            <path d="M10 3L5 8L10 13" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
          </svg>
          Gallery
        </button>

        <div
          style={{
            fontSize: 10,
            fontWeight: 600,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.35)",
            fontFamily: "-apple-system, 'SF Pro Text', system-ui, sans-serif",
          }}
        >
          {artwork.category}
        </div>

        <div style={{ width: 50 }} />
      </div>

      {/* Content — scrollable */}
      <div
        style={{
          flex: 1,
          overflow: "auto",
          WebkitOverflowScrolling: "touch",
        }}
      >
        {/* Hero image — zoomed in */}
        <div
          style={{
            width: "100%",
            aspectRatio: "16/9",
            backgroundImage: `url('${artwork.heroImage}')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            transform: visible ? "scale(1)" : "scale(0.92)",
            transition: "transform 0.5s cubic-bezier(0.32, 0.72, 0, 1)",
          }}
        />

        {/* Info section */}
        <div style={{ padding: "20px 16px 24px" }}>
          {/* Title + artist */}
          <h2
            style={{
              fontSize: 24,
              fontWeight: 300,
              margin: "0 0 4px",
              color: "#ffffff",
              fontFamily: "-apple-system, 'SF Pro Display', system-ui, sans-serif",
            }}
          >
            {artwork.title}
          </h2>
          <div
            style={{
              fontSize: 12,
              color: "rgba(255,255,255,0.4)",
              marginBottom: 20,
              fontFamily: "-apple-system, 'SF Pro Text', system-ui, sans-serif",
            }}
          >
            by {artwork.artist}
            {artwork.artistAlias && <span style={{ color: "rgba(255,255,255,0.25)" }}> aka {artwork.artistAlias}</span>}
          </div>

          {/* Price */}
          <div
            style={{
              fontSize: 36,
              fontWeight: 300,
              color: "#ffffff",
              lineHeight: 1,
              letterSpacing: "-0.02em",
              marginBottom: 4,
              fontFamily: "-apple-system, 'SF Pro Display', system-ui, sans-serif",
            }}
          >
            {selectedFormat ? fmt(selectedFormat.price) : ""}
          </div>
          <div
            style={{
              fontSize: 12,
              color: "rgba(255,255,255,0.3)",
              marginBottom: 20,
              fontFamily: "-apple-system, 'SF Pro Text', system-ui, sans-serif",
            }}
          >
            {selectedFormat?.name}
          </div>

          {/* Format selector */}
          <div style={{ display: "flex", flexDirection: "column", gap: 5, marginBottom: 20 }}>
            {artwork.formats.map((f) => (
              <button
                key={f.name}
                onClick={() => setSelectedFormat(f)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "11px 14px",
                  background: selectedFormat?.name === f.name ? "rgba(74,158,255,0.08)" : "rgba(255,255,255,0.02)",
                  border: `1px solid ${selectedFormat?.name === f.name ? "rgba(74,158,255,0.3)" : "rgba(255,255,255,0.06)"}`,
                  borderRadius: 10,
                  cursor: "pointer",
                  transition: "all 0.15s ease",
                  textAlign: "left",
                }}
              >
                <span
                  style={{
                    fontSize: 13,
                    fontWeight: selectedFormat?.name === f.name ? 500 : 400,
                    color: selectedFormat?.name === f.name ? "#ffffff" : "rgba(255,255,255,0.55)",
                    fontFamily: "-apple-system, 'SF Pro Text', system-ui, sans-serif",
                  }}
                >
                  {f.name}
                </span>
                <span
                  style={{
                    fontSize: 14,
                    fontWeight: 500,
                    color: selectedFormat?.name === f.name ? "#ffffff" : "rgba(255,255,255,0.4)",
                    fontVariantNumeric: "tabular-nums",
                    fontFamily: "-apple-system, 'SF Pro Display', system-ui, sans-serif",
                  }}
                >
                  {fmt(f.price)}
                </span>
              </button>
            ))}
          </div>

          {/* Reserve CTA */}
          <a
            href="https://x.com/Maui_PremiumArt"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
              padding: "14px",
              background: "rgba(74,158,255,0.15)",
              border: "1px solid rgba(74,158,255,0.3)",
              borderRadius: 10,
              color: "#ffffff",
              fontSize: 14,
              fontWeight: 600,
              textDecoration: "none",
              fontFamily: "-apple-system, 'SF Pro Text', system-ui, sans-serif",
              letterSpacing: "0.02em",
              marginBottom: 8,
            }}
          >
            Reserve Your Edition
          </a>
          <p
            style={{
              fontSize: 11,
              color: "rgba(255,255,255,0.2)",
              textAlign: "center",
              margin: "0 0 24px",
              fontFamily: "-apple-system, 'SF Pro Text', system-ui, sans-serif",
            }}
          >
            Limited to 10 per design · Contact via X
          </p>

          {/* Description */}
          <div
            style={{
              paddingTop: 16,
              borderTop: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            <div
              style={{
                fontSize: 10,
                fontWeight: 600,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.35)",
                marginBottom: 10,
                fontFamily: "-apple-system, 'SF Pro Text', system-ui, sans-serif",
              }}
            >
              About This Piece
            </div>
            {artwork.description.split("\n\n").map((para, i) => (
              <p
                key={i}
                style={{
                  fontSize: 13,
                  color: "rgba(255,255,255,0.5)",
                  margin: "0 0 12px",
                  lineHeight: 1.8,
                  fontFamily: "-apple-system, 'SF Pro Text', system-ui, sans-serif",
                }}
              >
                {para}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
