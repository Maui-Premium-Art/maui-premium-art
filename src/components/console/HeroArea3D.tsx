"use client";

import CTLineLabel from "@/components/console/CTLineLabel";

/**
 * HeroArea3D — REAL CT Display Screenshot
 * 
 * No more Three.js, no more SVG terrain, no more approximations.
 * This IS the Cybertruck display. Pixel-perfect. Native. Real.
 * Source: Toolbox 3 CID Screenshot, 2560x1440, March 29 2026.
 */

interface HeroArea3DProps {
  artImage?: string;
  startReveal?: boolean;
  artworkTitle?: string;
  artworkIndex?: number;
  artworkCount?: number;
  onPrevArt?: () => void;
  onNextArt?: () => void;
  onBrowseGallery?: () => void;
  onSeeEditions?: () => void;
  onTailgateArt?: () => void;
}

export default function HeroArea3D({
  artImage = "/images/mahalo-bird/electric-prr-hummingbird.jpg",
  startReveal = false,
  artworkTitle = "Mahalo Bird",
  artworkIndex = 0,
  artworkCount = 1,
  onPrevArt,
  onNextArt,
  onBrowseGallery,
  onSeeEditions,
  onTailgateArt,
}: HeroArea3DProps) {
  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
      {/* ── REAL CT Display Screenshot ── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: "url('/images/ct-display-real.png')",
          backgroundSize: "cover",
          backgroundPosition: "center center",
          backgroundRepeat: "no-repeat",
          opacity: startReveal ? 1 : 0,
          transition: "opacity 1.5s ease-out",
        }}
      />

      {/* Subtle vignette to blend edges with UI chrome */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `
            radial-gradient(ellipse at center, transparent 40%, rgba(10,12,16,0.3) 100%)
          `,
          pointerEvents: "none",
          zIndex: 1,
        }}
      />

      {/* CT-style line connector labels */}
      <div style={{ position: "absolute", inset: 0, zIndex: 3, pointerEvents: "none" }}>
        <div style={{ position: "absolute", left: "22%", top: "18%" }}>
          <CTLineLabel label="Browse Gallery" lineHeight={50} position="top" onClick={onBrowseGallery} />
        </div>
        <div style={{ position: "absolute", left: "52%", top: "14%" }}>
          <CTLineLabel label="Artist Sign-Up" lineHeight={60} position="top" onClick={onSeeEditions} />
        </div>
        <div style={{ position: "absolute", right: "18%", top: "16%" }}>
          <CTLineLabel label="Stay in the Loop" lineHeight={55} position="top" onClick={onTailgateArt} />
        </div>
        <div style={{ position: "absolute", left: "50%", bottom: "5%", transform: "translateX(-50%)" }}>
          <CTLineLabel label="Art Scale" sublabel="Medium" lineHeight={20} position="bottom" />
        </div>
      </div>

      {/* Art navigation arrows */}
      {onPrevArt && onNextArt && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 4,
            pointerEvents: "none",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 16px",
          }}
        >
          <button
            onClick={onPrevArt}
            aria-label="Previous artwork"
            style={{
              pointerEvents: "auto",
              width: 44, height: 44,
              display: "flex", alignItems: "center", justifyContent: "center",
              background: "none", border: "none", cursor: "pointer", padding: 0,
            }}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M12 4L6 10L12 16" stroke="rgba(255,255,255,0.35)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button
            onClick={onNextArt}
            aria-label="Next artwork"
            style={{
              pointerEvents: "auto",
              width: 44, height: 44,
              display: "flex", alignItems: "center", justifyContent: "center",
              background: "none", border: "none", cursor: "pointer", padding: 0,
            }}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M8 4L14 10L8 16" stroke="rgba(255,255,255,0.35)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      )}

      {/* Dynamic artwork caption */}
      <div
        style={{
          position: "absolute",
          bottom: 32, left: "50%",
          transform: "translateX(-50%)",
          display: "flex", flexDirection: "column", alignItems: "center",
          gap: 6, zIndex: 20, pointerEvents: "none", whiteSpace: "nowrap",
        }}
      >
        <span style={{
          fontSize: 13, color: "rgba(255,255,255,0.7)",
          letterSpacing: "0.22em", textTransform: "uppercase",
          fontFamily: "-apple-system, 'SF Pro Text', system-ui, sans-serif",
          fontWeight: 600,
        }} aria-live="polite">
          {artworkTitle} · Edition I
        </span>
        <div style={{ display: "flex", gap: 5, alignItems: "center" }} role="tablist">
          {Array.from({ length: artworkCount }, (_, i) => (
            <div key={i} role="tab" aria-selected={i === artworkIndex} aria-label={`Artwork ${i + 1}`}
              style={{
                width: i === artworkIndex ? 8 : 6, height: i === artworkIndex ? 8 : 6,
                borderRadius: "50%",
                background: i === artworkIndex ? "rgba(255,255,255,0.8)" : "rgba(255,255,255,0.2)",
                transition: "all 0.2s ease",
              }}
            />
          ))}
        </div>
        <span style={{
          fontSize: 11, color: "rgba(255,255,255,0.35)",
          letterSpacing: "0.08em",
          fontFamily: "-apple-system, 'SF Pro Text', system-ui, sans-serif",
        }}>
          {artworkIndex + 1} of {artworkCount} · @Maui_PremiumArt
        </span>
      </div>

      {/* Arrow hover styles */}
      <style>{`
        [aria-label="Previous artwork"]:hover svg path,
        [aria-label="Next artwork"]:hover svg path { stroke: rgba(255,255,255,0.6); }
        [aria-label="Previous artwork"] svg path,
        [aria-label="Next artwork"] svg path { transition: stroke 0.2s ease; }
      `}</style>

      {/* Attribution */}
      <div style={{
        position: "absolute", bottom: 6, right: 10,
        fontSize: 9, color: "rgba(255,255,255,0.15)",
        letterSpacing: "0.02em", zIndex: 20, pointerEvents: "none",
        fontFamily: "-apple-system, 'SF Pro Text', system-ui, sans-serif",
      }}>
        Art by <span style={{ color: "rgba(255,255,255,0.22)" }}>Hulali Lā</span> · mauipremiumart.com
      </div>
    </div>
  );
}
