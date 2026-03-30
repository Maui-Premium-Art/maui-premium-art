"use client";

import { useState, useEffect } from "react";
import { useHawaiianRadio } from "@/hooks/useHawaiianRadio";

/**
 * Maui Premium Art — Homepage
 * 
 * The website IS the Cybertruck display.
 * Real CID screenshot as full-bleed background.
 * 
 * Interactive elements are INVISIBLE hotspots placed over
 * the real CT UI pixels. No duplicate components. The CT
 * screenshot IS the UI — we just wire the clicks.
 * 
 * Text and art are overlaid in the exact pixel positions
 * of the CT's own text/art areas, replacing the content
 * while keeping the CT chrome intact.
 */

function getDeviceInfo(): string {
  if (typeof window === "undefined") return "";
  const ua = navigator.userAgent;
  const device = /iPad/.test(ua) ? "iPad" : /iPhone/.test(ua) ? "iPhone" : /Android/.test(ua) && /Mobile/.test(ua) ? "Android" : /Macintosh/.test(ua) ? "Mac" : /Windows/.test(ua) ? "Windows PC" : "Web";
  const browser = /CriOS/.test(ua) ? "Chrome" : /Safari/.test(ua) && !/Chrome/.test(ua) ? "Safari" : /Chrome/.test(ua) ? "Chrome" : /Firefox/.test(ua) ? "Firefox" : "";
  return browser ? `${browser} · ${device}` : device;
}

export default function Home() {
  const radio = useHawaiianRadio();
  const [deviceLabel, setDeviceLabel] = useState("");

  useEffect(() => {
    setDeviceLabel(getDeviceInfo());
  }, []);

  const trackTitle = radio.currentTrack?.title || "Maui Premium Art";
  const trackArtist = radio.currentTrack?.artist || "Fine Art Cybertruck Wraps";

  // Tailgate art images for album art rotation
  const artImages = [
    "/images/tailgate-art/mahalo-bird_tailgate.jpg",
    "/images/tailgate-art/island-vibes_tailgate.jpg",
    "/images/tailgate-art/neon-paradise_tailgate.jpg",
  ];
  const [artIndex, setArtIndex] = useState(0);

  return (
    <main style={{
      width: "100vw", height: "100dvh",
      position: "relative", overflow: "hidden", background: "#0a0c10",
    }}>
      {/* THE REAL CT DISPLAY — full bleed, untouched */}
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: "url('/images/ct-display-real.png')",
        backgroundSize: "cover",
        backgroundPosition: "center center",
        backgroundRepeat: "no-repeat",
      }} />

      {/* ═══════════════════════════════════════════════════════
           MEDIA PLAYER — invisible hotspots over real CT pixels
           No visible UI. Just clickable zones mapped to audio.
           Text and art overlaid in exact CT positions.
           ═══════════════════════════════════════════════════════ */}

      {/* Album art — replaces the music note square */}
      <div
        onClick={() => setArtIndex((i) => (i + 1) % artImages.length)}
        style={{
          position: "absolute",
          left: "19.5%", top: "74.3%",
          width: "6.5%", height: "9.4%",
          cursor: "pointer",
          zIndex: 10,
          overflow: "hidden",
          borderRadius: 4,
        }}
      >
        <img
          src={artImages[artIndex]}
          alt="Now playing art"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </div>

      {/* Title text — replaces "Khris's iPhone" source line */}
      <div style={{
        position: "absolute",
        left: "29.3%", top: "74.8%",
        width: "12%", height: "2.2%",
        zIndex: 10,
        display: "flex", alignItems: "center",
        fontSize: "clamp(10px, 1.1vw, 16px)",
        fontWeight: 500,
        color: "rgba(255,255,255,0.85)",
        fontFamily: "-apple-system, 'SF Pro Text', 'Helvetica Neue', sans-serif",
        letterSpacing: "0.01em",
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
        pointerEvents: "none",
      }}>
        {trackTitle}
      </div>

      {/* Source/device line — replaces BT icon + "Khris's iPhone" */}
      <div style={{
        position: "absolute",
        left: "29.3%", top: "76.8%",
        width: "12%", height: "1.8%",
        zIndex: 10,
        display: "flex", alignItems: "center", gap: 5,
        fontSize: "clamp(9px, 0.85vw, 13px)",
        color: "rgba(255,255,255,0.4)",
        fontFamily: "-apple-system, 'SF Pro Text', 'Helvetica Neue', sans-serif",
        pointerEvents: "none",
      }}>
        <span style={{
          display: "inline-flex", alignItems: "center", justifyContent: "center",
          width: 14, height: 14, background: "#3478f6",
          borderRadius: 3, fontSize: 9, fontWeight: 700, color: "#fff", flexShrink: 0,
        }}>B</span>
        {deviceLabel}
      </div>

      {/* ── Invisible playback control hotspots ── */}
      {/* These are positioned exactly over the CT's own control icons */}
      {/* No visible UI — the real CT icons ARE the buttons */}

      {/* Prev ⏮ */}
      <div onClick={radio.prevTrack} style={{
        position: "absolute", left: "29.5%", top: "83.3%",
        width: "3.5%", height: "3.5%",
        cursor: "pointer", zIndex: 10,
      }} title="Previous track" />

      {/* Play/Pause ▶⏸ */}
      <div onClick={radio.togglePlay} style={{
        position: "absolute", left: "33.5%", top: "83.3%",
        width: "3.5%", height: "3.5%",
        cursor: "pointer", zIndex: 10,
      }} title={radio.isPlaying ? "Pause" : "Play"} />

      {/* Next ⏭ */}
      <div onClick={radio.nextTrack} style={{
        position: "absolute", left: "37.5%", top: "83.3%",
        width: "3.5%", height: "3.5%",
        cursor: "pointer", zIndex: 10,
      }} title="Next track" />

      {/* EQ ⫶ — not wired yet */}
      <div style={{
        position: "absolute", left: "41.5%", top: "83.3%",
        width: "3.5%", height: "3.5%",
        cursor: "pointer", zIndex: 10,
      }} title="Equalizer" />

      {/* Search 🔍 — not wired yet */}
      <div style={{
        position: "absolute", left: "45.5%", top: "83.3%",
        width: "3.5%", height: "3.5%",
        cursor: "pointer", zIndex: 10,
      }} title="Search" />

    </main>
  );
}
