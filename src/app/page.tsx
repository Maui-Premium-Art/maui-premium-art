"use client";

import { useState, useEffect } from "react";
import { useHawaiianRadio } from "@/hooks/useHawaiianRadio";

/**
 * Maui Premium Art — Homepage
 * 
 * The website IS the Cybertruck display.
 * Real CID screenshot background. Interactive elements layered
 * precisely on top of the real pixels. One at a time.
 * 
 * Phase 1: Media player wired to Hawaiian Radio.
 */

function getDeviceInfo(): string {
  if (typeof window === "undefined") return "Web Browser";
  const ua = navigator.userAgent;
  if (/iPad/.test(ua)) return "iPad";
  if (/iPhone/.test(ua)) return "iPhone";
  if (/Android/.test(ua) && /Mobile/.test(ua)) return "Android";
  if (/Android/.test(ua)) return "Android Tablet";
  if (/Macintosh/.test(ua)) return "Mac";
  if (/Windows/.test(ua)) return "Windows";
  if (/Linux/.test(ua)) return "Linux";
  return "Web Browser";
}

function getBrowserName(): string {
  if (typeof window === "undefined") return "";
  const ua = navigator.userAgent;
  if (/CriOS/.test(ua)) return "Chrome";
  if (/Safari/.test(ua) && !/Chrome/.test(ua)) return "Safari";
  if (/Chrome/.test(ua)) return "Chrome";
  if (/Firefox/.test(ua)) return "Firefox";
  if (/Edg/.test(ua)) return "Edge";
  return "";
}

export default function Home() {
  const radio = useHawaiianRadio();
  const [deviceInfo, setDeviceInfo] = useState("Web Browser");

  useEffect(() => {
    const browser = getBrowserName();
    const device = getDeviceInfo();
    setDeviceInfo(browser ? `${browser} · ${device}` : device);
  }, []);

  // Current artwork for album art square
  const artImages = [
    "/images/tailgate-art/mahalo-bird_tailgate.jpg",
    "/images/tailgate-art/island-vibes_tailgate.jpg",
    "/images/tailgate-art/neon-paradise_tailgate.jpg",
  ];
  const [artIndex, setArtIndex] = useState(0);
  const currentArt = artImages[artIndex] || artImages[0];

  return (
    <main
      style={{
        width: "100vw",
        height: "100dvh",
        position: "relative",
        overflow: "hidden",
        background: "#0a0c10",
      }}
    >
      {/* THE REAL CT DISPLAY — full bleed background */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: "url('/images/ct-display-real.png')",
          backgroundSize: "cover",
          backgroundPosition: "center center",
          backgroundRepeat: "no-repeat",
        }}
      />

      {/* ── MEDIA PLAYER — positioned over real CT media player pixels ── */}
      <div
        style={{
          position: "absolute",
          /* Position: matches CT media player location in 2560x1440 screenshot */
          /* CT media player: y=860-1060, x=270-870 at 2560x1440 */
          /* As percentages: left=10.5%, top=59.7%, width=23.4%, height=15.3% */
          left: "10.5%",
          top: "59.7%",
          width: "23.5%",
          height: "15.3%",
          /* Transparent — lets the real CT background show through */
          background: "transparent",
          zIndex: 10,
          display: "flex",
          flexDirection: "column",
          fontFamily: "-apple-system, 'SF Pro Text', system-ui, sans-serif",
        }}
      >
        {/* Top row: hamburger + content */}
        <div style={{ display: "flex", flex: 1 }}>
          {/* Album art square — LEFT */}
          <div
            style={{
              width: "22%",
              aspectRatio: "1",
              alignSelf: "center",
              borderRadius: 4,
              overflow: "hidden",
              cursor: "pointer",
              position: "relative",
            }}
            onClick={() => setArtIndex((i) => (i + 1) % artImages.length)}
          >
            {/* Our art replaces the music note */}
            <img
              src={currentArt}
              alt="Album art"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          </div>

          {/* Right: title + subtitle */}
          <div style={{ flex: 1, paddingLeft: "4%", display: "flex", flexDirection: "column", justifyContent: "center" }}>
            {/* Song = Business name */}
            <div style={{
              fontSize: "clamp(10px, 1.1vw, 16px)",
              fontWeight: 500,
              color: "rgba(255,255,255,0.85)",
              letterSpacing: "0.01em",
              lineHeight: 1.3,
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}>
              {radio.currentTrack?.title || "Maui Premium Art"}
            </div>
            {/* Artist = subtitle */}
            <div style={{
              fontSize: "clamp(9px, 0.85vw, 13px)",
              color: "rgba(255,255,255,0.4)",
              marginTop: 2,
              display: "flex",
              alignItems: "center",
              gap: 6,
            }}>
              {/* Bluetooth icon */}
              <span style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                width: 14, height: 14,
                background: "#3478f6",
                borderRadius: 3,
                fontSize: 9,
                fontWeight: 700,
                color: "#fff",
                flexShrink: 0,
              }}>B</span>
              {deviceInfo}
            </div>
          </div>
        </div>

        {/* Playback controls row */}
        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "clamp(16px, 2.5vw, 36px)",
          paddingTop: "2%",
          paddingBottom: "4%",
        }}>
          {/* Prev */}
          <button onClick={radio.prevTrack} aria-label="Previous track" style={{
            background: "none", border: "none", cursor: "pointer", padding: 4,
            color: "rgba(255,255,255,0.5)", fontSize: "clamp(14px, 1.3vw, 22px)",
            transition: "color 0.15s", fontFamily: "inherit", lineHeight: 1,
          }} onMouseEnter={e => e.currentTarget.style.color = "rgba(255,255,255,0.9)"}
             onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.5)"}>
            ⏮
          </button>

          {/* Play/Pause */}
          <button onClick={radio.togglePlay} aria-label={radio.isPlaying ? "Pause" : "Play"} style={{
            background: "none", border: "none", cursor: "pointer", padding: 4,
            color: "rgba(255,255,255,0.6)", fontSize: "clamp(16px, 1.5vw, 26px)",
            transition: "color 0.15s", fontFamily: "inherit", lineHeight: 1,
          }} onMouseEnter={e => e.currentTarget.style.color = "rgba(255,255,255,0.9)"}
             onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.6)"}>
            {radio.isPlaying ? "⏸" : "▶"}
          </button>

          {/* Next */}
          <button onClick={radio.nextTrack} aria-label="Next track" style={{
            background: "none", border: "none", cursor: "pointer", padding: 4,
            color: "rgba(255,255,255,0.5)", fontSize: "clamp(14px, 1.3vw, 22px)",
            transition: "color 0.15s", fontFamily: "inherit", lineHeight: 1,
          }} onMouseEnter={e => e.currentTarget.style.color = "rgba(255,255,255,0.9)"}
             onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.5)"}>
            ⏭
          </button>

          {/* EQ */}
          <button aria-label="Equalizer" style={{
            background: "none", border: "none", cursor: "pointer", padding: 4,
            color: "rgba(255,255,255,0.35)", fontSize: "clamp(14px, 1.3vw, 22px)",
            fontFamily: "inherit", lineHeight: 1,
          }}>
            ⫶
          </button>

          {/* Search */}
          <button aria-label="Search" style={{
            background: "none", border: "none", cursor: "pointer", padding: 4,
            color: "rgba(255,255,255,0.35)", fontSize: "clamp(14px, 1.3vw, 22px)",
            fontFamily: "inherit", lineHeight: 1,
          }}>
            🔍
          </button>
        </div>
      </div>

    </main>
  );
}
