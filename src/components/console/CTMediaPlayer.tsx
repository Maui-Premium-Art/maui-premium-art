"use client";

import { useState } from "react";
import { useHawaiianRadio } from "@/hooks/useHawaiianRadio";

export default function CTMediaPlayer() {
  const { currentTrack, isPlaying, togglePlay, nextTrack, prevTrack } = useHawaiianRadio();
  const [artOpacity, setArtOpacity] = useState(1);
  const [prevArt, setPrevArt] = useState(currentTrack.artworkImage);

  // Crossfade album art on track change
  if (currentTrack.artworkImage !== prevArt) {
    setArtOpacity(0.3);
    setPrevArt(currentTrack.artworkImage);
    setTimeout(() => setArtOpacity(1), 50);
  }

  return (
    <div
      role="region"
      aria-label="Hawaiian Radio music player"
      style={{
        background: "rgba(12, 26, 46, 0.85)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        border: "1px solid rgba(255, 255, 255, 0.1)",
        borderRadius: 12,
        flex: 1.8,
        minWidth: 0,
        display: "flex",
        flexDirection: "row",
        overflow: "hidden",
        padding: 8,
        gap: 10,
        fontFamily: "-apple-system, 'SF Pro Text', system-ui, sans-serif",
      }}
    >
      {/* Album Art */}
      <img
        src={currentTrack.artworkImage}
        alt={`Album art for ${currentTrack.title}`}
        width={85}
        height={85}
        loading="eager"
        style={{
          width: 85,
          minWidth: 85,
          height: 85,
          objectFit: "cover",
          borderRadius: 8,
          flexShrink: 0,
          background: "linear-gradient(135deg, #1a2d4a 0%, #0f1d35 50%, #1a3050 100%)",
          opacity: artOpacity,
          transition: "opacity 300ms ease-in-out",
        }}
      />

      {/* Right column */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between", minWidth: 0, gap: 2 }}>
        {/* Track info */}
        <div aria-live="polite">
          <div style={{ fontSize: 15, fontWeight: 600, color: "#ffffff", lineHeight: 1.3, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
            {currentTrack.title}
          </div>
          <div style={{ fontSize: 12, color: "rgba(255, 255, 255, 0.45)", display: "flex", alignItems: "center", gap: 6, marginTop: 2 }}>
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#3b82f6", flexShrink: 0 }} />
            HAWAIIAN RADIO
          </div>
        </div>

        {/* Controls row */}
        <div role="toolbar" aria-label="Playback controls" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "auto" }}>
          <CtrlBtn aria-label="Previous track" onClick={prevTrack}>
            <svg width="18" height="16" viewBox="0 0 16 14" fill="currentColor">
              <rect x="1" y="2" width="2" height="10" rx="0.8" />
              <path d="M14 2L5 7L14 12V2Z" />
            </svg>
          </CtrlBtn>
          <CtrlBtn aria-label={isPlaying ? "Pause" : "Play"} onClick={togglePlay}>
            {isPlaying ? (
              <svg width="14" height="16" viewBox="0 0 12 14" fill="currentColor">
                <rect x="1" y="1" width="3.5" height="12" rx="0.8" />
                <rect x="7.5" y="1" width="3.5" height="12" rx="0.8" />
              </svg>
            ) : (
              <svg width="16" height="18" viewBox="0 0 14 16" fill="currentColor">
                <path d="M2 1L13 8L2 15V1Z" />
              </svg>
            )}
          </CtrlBtn>
          <CtrlBtn aria-label="Next track" onClick={nextTrack}>
            <svg width="18" height="16" viewBox="0 0 16 14" fill="currentColor">
              <rect x="13" y="2" width="2" height="10" rx="0.8" />
              <path d="M2 2L11 7L2 12V2Z" />
            </svg>
          </CtrlBtn>
          <CtrlBtn aria-label="Equalizer">
            <svg width="18" height="18" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="3" y1="2" x2="3" y2="14" />
              <line x1="8" y1="5" x2="8" y2="11" />
              <line x1="13" y1="1" x2="13" y2="15" />
            </svg>
          </CtrlBtn>
          <CtrlBtn aria-label="Search music">
            <svg width="16" height="16" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5">
              <circle cx="6" cy="6" r="4" />
              <line x1="9.5" y1="9.5" x2="13" y2="13" strokeLinecap="round" />
            </svg>
          </CtrlBtn>
        </div>

        {/* Dot pagination (decorative) */}
        <div aria-hidden="true" style={{ display: "flex", justifyContent: "center", gap: 5, marginTop: 3 }}>
          {[0, 1, 2, 3, 4].map((i) => (
            <span key={i} style={{ width: 4, height: 4, borderRadius: "50%", background: i === 2 ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.25)" }} />
          ))}
        </div>
      </div>

      {/* Mobile responsive */}
      <style>{`
        @media (max-width: 400px) {
          [aria-label="Hawaiian Radio music player"] img {
            width: 65px !important;
            min-width: 65px !important;
            height: 65px !important;
          }
          [aria-label="Hawaiian Radio music player"] {
            padding: 6px !important;
            gap: 6px !important;
          }
          [aria-label="Hawaiian Radio music player"] [aria-live="polite"] > div:first-child {
            font-size: 14px !important;
          }
        }
      `}</style>
    </div>
  );
}

function CtrlBtn({ children, onClick, ...props }: { children: React.ReactNode; onClick?: () => void } & Record<string, unknown>) {
  return (
    <button
      onClick={onClick}
      style={{
        background: "none",
        border: "none",
        color: "rgba(255, 255, 255, 0.6)",
        cursor: "pointer",
        padding: 6,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transition: "color 150ms ease, transform 100ms ease-out",
      }}
      onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.9)"; }}
      onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.6)"; }}
      onPointerDown={(e) => { (e.currentTarget as HTMLElement).style.transform = "scale(0.92)"; }}
      onPointerUp={(e) => { (e.currentTarget as HTMLElement).style.transform = "scale(1)"; }}
      onPointerLeave={(e) => { (e.currentTarget as HTMLElement).style.transform = "scale(1)"; }}
      {...props}
    >
      {children}
    </button>
  );
}
