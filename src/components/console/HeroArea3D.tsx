"use client";

/**
 * HeroArea3D — CT-style hero with static photo + optional 3D upgrade
 *
 * 3D model: Tesla Cybertruck by onurpearl (Sketchfab)
 * License: CC BY 4.0 — https://creativecommons.org/licenses/by/4.0/
 *
 * Strategy: Always show a great static photo. Never show a black hole.
 * 3D loads on top ONLY after the truck mesh is confirmed in the scene.
 */

// 3D disabled for v1 — static photo hero
// CybertruckScene re-enabled in Phase 1a

// ── Static hero — always visible ───────────────────────────────────────────

function StaticHero() {
  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
      {/* Sky gradient */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(180deg, #05050a 0%, #080810 40%, #0a0a0f 60%, #080810 100%)",
        }}
      />

      {/* Mountain silhouette */}
      <svg
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: "100%",
          height: "55%",
          pointerEvents: "none",
        }}
        viewBox="0 0 1200 350"
        preserveAspectRatio="xMidYMax slice"
      >
        <path
          d="M0 350 L0 200 L80 170 L160 190 L240 155 L320 178 L400 145 L480 168 L560 132 L640 155 L720 128 L800 150 L880 128 L960 148 L1040 135 L1120 158 L1200 142 L1200 350 Z"
          fill="#0f0f1a"
        />
        <path
          d="M0 350 L0 250 L100 225 L200 240 L300 215 L400 232 L500 205 L600 225 L700 200 L800 220 L900 198 L1000 218 L1100 205 L1200 222 L1200 350 Z"
          fill="#0c0c16"
        />
        <path
          d="M0 350 L0 295 L150 278 L300 288 L450 272 L600 285 L750 270 L900 283 L1050 270 L1200 282 L1200 350 Z"
          fill="#090912"
        />
      </svg>

      {/* Grid floor — perspective */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: "-30%",
          right: "-30%",
          height: "38%",
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)
          `,
          backgroundSize: "44px 44px",
          transform: "perspective(280px) rotateX(62deg)",
          transformOrigin: "bottom center",
          maskImage:
            "linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 100%)",
          pointerEvents: "none",
        }}
      />

      {/* Hero image — fills content zone */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 2,
          backgroundImage: "url('/images/mahalo-bird/electric-prr-hummingbird.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center 35%",
          filter: "brightness(0.85) contrast(1.05) saturate(1.05)",
        }}
      >
        {/* Edge vignette — blends into UI chrome */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to bottom, rgba(10,10,15,0.5) 0%, transparent 20%, transparent 60%, rgba(10,10,15,0.7) 100%), linear-gradient(to right, rgba(10,10,15,0.5) 0%, transparent 15%, transparent 85%, rgba(10,10,15,0.5) 100%)",
            pointerEvents: "none",
          }}
        />
      </div>
    </div>
  );
}

// ── Main export ────────────────────────────────────────────────────────────

export default function HeroArea3D() {
  const showWebGL = false;

  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
      <StaticHero />

      {/* FIX #5: Caption more prominent + FIX #6: larger dots */}
      <div
        style={{
          position: "absolute",
          bottom: 32,
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 6,
          zIndex: 20,
          pointerEvents: "none",
          whiteSpace: "nowrap",
        }}
      >
        {/* FIX #5: More prominent caption */}
        <span
          style={{
            fontSize: 13,
            color: "rgba(255,255,255,0.7)",
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            fontFamily: "-apple-system, 'SF Pro Text', system-ui, sans-serif",
            fontWeight: 600,
          }}
        >
          Mahalo Bird · Edition I
        </span>

        {/* FIX #6: Larger dot pagination */}
        <div style={{ display: "flex", gap: 7, alignItems: "center" }}>
          <div style={{ width: 8, height: 8, borderRadius: "50%", background: "rgba(255,255,255,0.8)" }} />
          <div style={{ width: 7, height: 7, borderRadius: "50%", background: "rgba(255,255,255,0.25)" }} />
          <div style={{ width: 7, height: 7, borderRadius: "50%", background: "rgba(255,255,255,0.25)" }} />
        </div>

        <span
          style={{
            fontSize: 11,
            color: "rgba(255,255,255,0.35)",
            letterSpacing: "0.08em",
            fontFamily: "-apple-system, 'SF Pro Text', system-ui, sans-serif",
          }}
        >
          3 of 10 · @Maui_PremiumArt
        </span>
      </div>

      {/* Attribution */}
      <div
        style={{
          position: "absolute",
          bottom: 6,
          right: 10,
          fontSize: 9,
          color: "rgba(255,255,255,0.15)",
          letterSpacing: "0.02em",
          zIndex: 20,
          pointerEvents: "none",
          fontFamily: "-apple-system, 'SF Pro Text', system-ui, sans-serif",
        }}
      >
        Art by{" "}
        <span style={{ color: "rgba(255,255,255,0.22)" }}>Hulali Lā</span>
        {" "}· mauipremiumart.com
      </div>
    </div>
  );
}
